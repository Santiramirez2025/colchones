// app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('Stripe keys are not defined')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-10-29.clover',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      console.error('❌ Missing stripe-signature header')
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    console.log('🔔 Webhook event:', event.type)

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('✅ Payment succeeded:', paymentIntent.id)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error('❌ Payment failed:', paymentIntent.id)
        break
      }

      case 'charge.succeeded': {
        const charge = event.data.object as Stripe.Charge
        console.log('💳 Charge succeeded:', charge.id)
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        console.log('💰 Charge refunded:', charge.id)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('❌ Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log('🎉 Checkout completed:', session.id)

    const metadata = session.metadata || {}
    const userId = metadata.userId && metadata.userId !== 'guest' ? metadata.userId : null
    const orderItems = JSON.parse(metadata.orderItems || '[]')
    const shippingAddress = metadata.shippingAddress 
      ? JSON.parse(metadata.shippingAddress) 
      : null
    const couponCode = metadata.couponCode || null

    // Get customer details from session
    const customerDetails = session.customer_details
    
    // Calculate totals
    const subtotal = orderItems.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0
    )
    
    const amountTotal = (session.amount_total || 0) / 100 // Convert from cents
    const amountSubtotal = (session.amount_subtotal || 0) / 100
    const shipping_cost = Math.max(0, amountTotal - amountSubtotal)
    const discount = Math.max(0, subtotal - amountSubtotal)

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Si no hay userId, necesitamos crear un usuario temporal o manejar el pedido sin usuario
    // Opción 1: Crear usuario temporal
    let finalUserId = userId
    
    if (!finalUserId && customerDetails?.email) {
      // Buscar si existe un usuario con ese email
      const existingUser = await prisma.user.findUnique({
        where: { email: customerDetails.email }
      })
      
      if (existingUser) {
        finalUserId = existingUser.id
      } else {
        // Crear usuario temporal para el pedido
        const tempUser = await prisma.user.create({
          data: {
            firebaseUid: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            email: customerDetails.email,
            name: customerDetails.name || 'Cliente Invitado',
            phone: customerDetails.phone || undefined,
          }
        })
        finalUserId = tempUser.id
        console.log('✅ Temporary user created:', tempUser.id)
      }
    }

    // Si aún no hay userId, algo salió mal
    if (!finalUserId) {
      throw new Error('No se pudo obtener o crear un userId para el pedido')
    }

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: finalUserId,
        status: 'PROCESSING',
        items: JSON.stringify(orderItems),
        
        subtotal,
        shipping: shipping_cost,
        discount: discount,
        tax: 0,
        total: amountTotal,

        shippingName: customerDetails?.name || '',
        shippingEmail: customerDetails?.email || '',
        shippingPhone: customerDetails?.phone || '',
        shippingAddress: customerDetails?.address?.line1 || shippingAddress?.address || '',
        shippingCity: customerDetails?.address?.city || shippingAddress?.city || '',
        shippingPostal: customerDetails?.address?.postal_code || shippingAddress?.postalCode || '',
        shippingProvince: customerDetails?.address?.state || shippingAddress?.province || '',
        shippingCountry: customerDetails?.address?.country || shippingAddress?.country || 'España',

        paymentMethod: 'stripe',
        paymentId: session.payment_intent as string || '',
        stripeSessionId: session.id,
        paidAt: new Date(),

        // Additional fields
        customerNotes: shippingAddress?.notes || undefined,
      },
    })

    console.log('✅ Order created:', order.orderNumber)

    // Update user stats
    try {
      await prisma.user.update({
        where: { id: finalUserId },
        data: {
          totalOrders: { increment: 1 },
          totalSpent: { increment: amountTotal },
        },
      })
      console.log('✅ User stats updated for:', finalUserId)
    } catch (error) {
      console.error('⚠️ Error updating user stats:', error)
      // Don't throw - order was created successfully
    }

    // Update product stock
    try {
      for (const item of orderItems) {
        const productId = item.productId || item.id
        if (productId) {
          await prisma.product.update({
            where: { id: productId },
            data: {
              stock: { decrement: item.quantity },
              salesCount: { increment: item.quantity },
            },
          })
        }
      }
      console.log('✅ Product stock updated')
    } catch (error) {
      console.error('⚠️ Error updating product stock:', error)
      // Don't throw - order was created successfully
    }

    // TODO: Send confirmation email
    // await sendOrderConfirmationEmail(order)

    // TODO: Trigger analytics event
    // await trackOrderCompleted(order)

    // TODO: Send notification to admin
    // await notifyAdminNewOrder(order)

    return order

  } catch (error) {
    console.error('❌ Error handling checkout completed:', error)
    
    // Log detailed error for debugging
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        sessionId: session.id,
      })
    }
    
    throw error
  }
}

// Helper function to send order confirmation email
async function sendOrderConfirmationEmail(order: any) {
  try {
    // TODO: Implement email sending logic
    // Using services like SendGrid, Resend, or Nodemailer
    console.log('📧 Sending order confirmation email to:', order.shippingEmail)
    
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'pedidos@tutienda.com',
    //   to: order.shippingEmail,
    //   subject: `Confirmación de pedido ${order.orderNumber}`,
    //   html: generateOrderEmailHTML(order)
    // })
    
  } catch (error) {
    console.error('⚠️ Error sending confirmation email:', error)
  }
}

// Helper function to track analytics
async function trackOrderCompleted(order: any) {
  try {
    // TODO: Implement analytics tracking
    // Using services like Google Analytics, Mixpanel, or Segment
    console.log('📊 Tracking order completed:', order.orderNumber)
    
  } catch (error) {
    console.error('⚠️ Error tracking analytics:', error)
  }
}