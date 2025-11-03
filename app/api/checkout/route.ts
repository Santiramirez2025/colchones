// app/api/checkout/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items, userId, userEmail, coupon, shippingAddress } = body

    console.log('🛒 Creating checkout session:', { 
      itemCount: items.length, 
      userId, 
      userEmail 
    })

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    if (!userEmail) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Calculate totals
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

    const shipping = subtotal >= 500 ? 0 : 29.99
    const total = subtotal - discount + shipping

    // Create Stripe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: `Tamaño: ${item.size}${item.variant ? ` - ${item.variant}` : ''}`,
          images: item.image ? [item.image.startsWith('http') ? item.image : `${process.env.NEXT_PUBLIC_APP_URL}${item.image}`] : [],
          metadata: {
            productId: item.productId || item.id,
            size: item.size,
            variant: item.variant || '',
          }
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }))

    // Add shipping as line item if applicable
    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Gastos de envío',
            description: 'Envío estándar (3-6 días laborables)',
          },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      })
    }

    // Add discount as line item if applicable
    if (discount > 0 && coupon) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Descuento - ${coupon.code}`,
            description: coupon.type === 'percentage' 
              ? `${coupon.discount}% de descuento` 
              : `${coupon.discount}€ de descuento`,
          },
          unit_amount: -Math.round(discount * 100), // Negative amount for discount
        },
        quantity: 1,
      })
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/carrito`,
      customer_email: userEmail,
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
      shipping_address_collection: {
        allowed_countries: ['ES', 'PT', 'FR', 'IT', 'DE'], // European countries
      },
      phone_number_collection: {
        enabled: true,
      },
      billing_address_collection: 'required',
      locale: 'es',
      allow_promotion_codes: true,
    })

    console.log('✅ Checkout session created:', session.id)

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    })

  } catch (error) {
    console.error('❌ Checkout error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: errorMessage 
      },
      { status: 500 }
    )
  }
}