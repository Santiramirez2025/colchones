// app/api/checkout/route.ts - MERCADO PAGO ARGENTINA
import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

// Validación de credenciales MercadoPago
if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
  console.warn('⚠️ MERCADOPAGO_ACCESS_TOKEN no configurado - Checkout deshabilitado')
}

// Inicializar cliente MercadoPago
const client = process.env.MERCADOPAGO_ACCESS_TOKEN 
  ? new MercadoPagoConfig({ 
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
      options: { timeout: 5000 }
    })
  : null

const preference = client ? new Preference(client) : null

export async function POST(request: Request) {
  try {
    // Verificar que MercadoPago esté configurado
    if (!preference) {
      return NextResponse.json(
        { error: 'Sistema de pago no configurado. Contactá a soporte.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { items, userId, userEmail, coupon, shippingAddress } = body

    console.log('🛒 Creando preferencia MercadoPago:', { 
      itemCount: items.length, 
      userId, 
      userEmail 
    })

    // Validar campos requeridos
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'El carrito está vacío' },
        { status: 400 }
      )
    }

    if (!userEmail) {
      return NextResponse.json(
        { error: 'El email es requerido' },
        { status: 400 }
      )
    }

    // Calcular totales en ARS
    const subtotal = items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0
    )
    
    let discount = 0
    if (coupon) {
      if (coupon.type === 'percentage') {
        discount = (subtotal * coupon.discount) / 100
      } else if (coupon.type === 'fixed') {
        discount = coupon.discount
      }
    }

    // Envío gratis en Villa María, sino $5000 ARS
    const shipping = subtotal >= 500000 ? 0 : 5000 // 500k ARS para envío gratis
    const total = subtotal - discount + shipping

    // Crear items para MercadoPago
    const mpItems = items.map((item: any) => ({
      id: item.productId || item.id,
      title: item.name,
      description: `${item.size}${item.variant ? ` - ${item.variant}` : ''}`,
      picture_url: item.image?.startsWith('http') 
        ? item.image 
        : `${process.env.NEXT_PUBLIC_APP_URL}${item.image}`,
      category_id: 'home',
      quantity: item.quantity,
      unit_price: item.price, // Ya en ARS
      currency_id: 'ARS',
    }))

    // Agregar envío como item si aplica
    if (shipping > 0) {
      mpItems.push({
        id: 'shipping',
        title: 'Envío a domicilio',
        description: 'Entrega en 3-6 días hábiles',
        quantity: 1,
        unit_price: shipping,
        currency_id: 'ARS',
      })
    }

    // Aplicar descuento si existe
    if (discount > 0 && coupon) {
      mpItems.push({
        id: 'discount',
        title: `Descuento - ${coupon.code}`,
        description: coupon.type === 'percentage' 
          ? `${coupon.discount}% OFF` 
          : `$${coupon.discount} ARS OFF`,
        quantity: 1,
        unit_price: -discount, // Negativo para descuento
        currency_id: 'ARS',
      })
    }

    // Crear preferencia de pago
    const preferenceData = {
      items: mpItems,
      payer: {
        email: userEmail,
        name: shippingAddress?.name || '',
        surname: shippingAddress?.lastName || '',
        phone: {
          area_code: shippingAddress?.phone?.substring(0, 4) || '353',
          number: shippingAddress?.phone || '',
        },
        address: shippingAddress ? {
          street_name: shippingAddress.address || '',
          street_number: shippingAddress.addressNumber || '0', // ✅ String en lugar de parseInt
          zip_code: shippingAddress.postalCode || '',
        } : undefined,
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/carrito`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/pending`,
      },
      auto_return: 'approved' as const,
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12, // Hasta 12 cuotas
      },
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
      external_reference: `ORDER-${Date.now()}`,
      metadata: {
        userId: userId || 'guest',
        couponCode: coupon?.code || '',
        orderItems: JSON.stringify(items.map((item: any) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          variant: item.variant,
        }))),
        shippingAddress: shippingAddress ? JSON.stringify(shippingAddress) : '',
      },
      statement_descriptor: 'AZUL COLCHONES',
      binary_mode: false, // Permitir pagos pendientes
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
    }

    // Crear preferencia en MercadoPago
    const response = await preference.create({ body: preferenceData })

    console.log('✅ Preferencia MercadoPago creada:', response.id)

    return NextResponse.json({ 
      preferenceId: response.id,
      initPoint: response.init_point, // URL de pago web
      sandboxInitPoint: response.sandbox_init_point, // URL de pago test
    })

  } catch (error) {
    console.error('❌ Error en checkout MercadoPago:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    
    return NextResponse.json(
      { 
        error: 'No se pudo crear la sesión de pago',
        details: errorMessage 
      },
      { status: 500 }
    )
  }
}

// Endpoint GET para verificar estado del pago
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const preferenceId = searchParams.get('preference_id')

  if (!preferenceId) {
    return NextResponse.json({ error: 'preference_id requerido' }, { status: 400 })
  }

  try {
    if (!preference) {
      return NextResponse.json(
        { error: 'Sistema de pago no configurado' },
        { status: 503 }
      )
    }

    const response = await preference.get({ preferenceId })
    
    return NextResponse.json({
      id: response.id,
      items: response.items,
    })
  } catch (error) {
    console.error('❌ Error obteniendo preferencia:', error)
    return NextResponse.json(
      { error: 'No se pudo obtener la preferencia' },
      { status: 500 }
    )
  }
}