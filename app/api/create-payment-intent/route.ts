// app/api/create-payment-intent/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// ✅ Validar que existe la clave antes de inicializar
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️ STRIPE_SECRET_KEY no configurado - Endpoint deshabilitado')
}

// ✅ Inicialización condicional
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover', // ✅ Versión correcta
    })
  : null

export async function POST(request: NextRequest) {
  try {
    // ✅ Verificar que Stripe esté configurado
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe no está configurado. Usá MercadoPago en /api/checkout' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { amount, currency = 'eur', metadata } = body

    console.log('💳 Creating payment intent:', { amount, currency, metadata })

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: metadata || {},
    })

    console.log('✅ Payment intent created:', paymentIntent.id)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('❌ Payment intent error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json(
      { 
        error: 'Failed to create payment intent',
        details: errorMessage 
      },
      { status: 500 }
    )
  }
}