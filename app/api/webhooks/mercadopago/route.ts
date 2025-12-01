// app/api/webhooks/mercadopago/route.ts
import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'

const client = process.env.MERCADOPAGO_ACCESS_TOKEN 
  ? new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN })
  : null

const payment = client ? new Payment(client) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('📥 Webhook MercadoPago recibido:', body)

    // MercadoPago envía notificaciones de tipo "payment"
    if (body.type === 'payment') {
      const paymentId = body.data.id

      if (!payment) {
        console.error('❌ MercadoPago no configurado')
        return NextResponse.json({ error: 'Not configured' }, { status: 503 })
      }

      // Obtener información del pago
      const paymentInfo = await payment.get({ id: paymentId })

      console.log('💳 Pago actualizado:', {
        id: paymentInfo.id,
        status: paymentInfo.status,
        external_reference: paymentInfo.external_reference,
      })

      // Aquí procesar el pago según su estado
      switch (paymentInfo.status) {
        case 'approved':
          console.log('✅ Pago aprobado')
          // Crear orden en base de datos
          // Enviar email de confirmación
          break
        case 'pending':
          console.log('⏳ Pago pendiente')
          break
        case 'rejected':
          console.log('❌ Pago rechazado')
          break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('❌ Error procesando webhook:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}