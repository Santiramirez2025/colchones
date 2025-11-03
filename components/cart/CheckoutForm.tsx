'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, Lock, CheckCircle2, Loader2, Sparkles } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart-store'
import { useAuth } from '@/lib/firebase/context/AuthContext'
import { CheckoutSteps, PaymentMethods, TrustBadges } from './CartComponents'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutFormProps {
  step: 1 | 2 | 3 | 4
  total: number
  onBack: () => void
  onNext: () => void
}

export default function CheckoutForm({ step, total, onBack, onNext }: CheckoutFormProps) {
  const [clientSecret, setClientSecret] = useState<string>('')

  // Create payment intent when entering payment step
  useState(() => {
    if (step === 3 && !clientSecret) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(total * 100) })
      })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret))
        .catch(err => console.error('Error creating payment intent:', err))
    }
  })

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#6366f1',
      colorBackground: '#ffffff',
      colorText: '#1a1a1a',
      colorDanger: '#ef4444',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '12px',
    },
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#fafafa]">
      <div className="container mx-auto px-4">
        {/* Checkout Steps */}
        <CheckoutSteps currentStep={step} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Volver al carrito</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            {step === 2 && 'Información de envío'}
            {step === 3 && 'Método de pago'}
            {step === 4 && '¡Pedido confirmado!'}
          </h1>
          <p className="text-lg text-gray-600">
            {step === 2 && 'Completa tus datos para continuar'}
            {step === 3 && 'Selecciona cómo quieres pagar'}
            {step === 4 && 'Tu pedido ha sido procesado correctamente'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 2 && <ShippingForm onNext={onNext} />}
            {step === 3 && clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <PaymentForm total={total} onNext={onNext} />
              </Elements>
            )}
            {step === 4 && <ConfirmationView />}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary total={total} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Shipping Form Component
function ShippingForm({ onNext }: { onNext: () => void }) {
  const { user } = useAuth()
  
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
    province: user?.province || '',
    country: user?.country || 'España',
    notes: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'Requerido'
    if (!formData.lastName.trim()) newErrors.lastName = 'Requerido'
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      newErrors.phone = 'Teléfono inválido'
    }
    if (!formData.address.trim() || formData.address.length < 5) {
      newErrors.address = 'Dirección completa requerida'
    }
    if (!formData.city.trim()) newErrors.city = 'Ciudad requerida'
    if (!formData.postalCode.trim() || formData.postalCode.length < 4) {
      newErrors.postalCode = 'Código postal inválido'
    }
    if (!formData.province.trim()) newErrors.province = 'Provincia requerida'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Save shipping data
      sessionStorage.setItem('shippingData', JSON.stringify(formData))
      onNext()
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
    >
      {/* Contact Information */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
            1
          </span>
          Datos de contacto
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                errors.firstName ? 'border-red-500' : 'border-gray-200 focus:border-indigo-600'
              }`}
              placeholder="Juan"
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Apellidos *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                errors.lastName ? 'border-red-500' : 'border-gray-200 focus:border-indigo-600'
              }`}
              placeholder="García"
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-200 focus:border-indigo-600'
              }`}
              placeholder="juan@ejemplo.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Teléfono *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-indigo-600'
              }`}
              placeholder="+34 600 000 000"
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
            2
          </span>
          Dirección de envío
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dirección completa *
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                errors.address ? 'border-red-500' : 'border-gray-200 focus:border-indigo-600'
              }`}
              placeholder="Calle Principal 123, Piso 4B"
            />
            {errors.address && (
              <p className="text-xs text-red-500 mt-1">{errors.address}</p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Código Postal *
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.postalCode ? 'border-red-500' : 'border-gray-200 focus:border-indigo-600'
                }`}
                placeholder="28001"
              />
              {errors.postalCode && (
                <p className="text-xs text-red-500 mt-1">{errors.postalCode}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ciudad *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.city ? 'border-red-500' : 'border-gray-200 focus:border-indigo-600'
                }`}
                placeholder="Madrid"
              />
              {errors.city && (
                <p className="text-xs text-red-500 mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Provincia *
              </label>
              <input
                type="text"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.province ? 'border-red-500' : 'border-gray-200 focus:border-indigo-600'
                }`}
                placeholder="Madrid"
              />
              {errors.province && (
                <p className="text-xs text-red-500 mt-1">{errors.province}</p>
              )}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notas adicionales (opcional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-600 transition-colors resize-none"
              placeholder="Instrucciones de entrega, preferencias horarias..."
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
      >
        Continuar al pago
      </motion.button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Al continuar, aceptas nuestros{' '}
        <Link href="/terminos" className="underline hover:text-gray-700">
          Términos y Condiciones
        </Link>
      </p>
    </motion.form>
  )
}

// Payment Form Component with Stripe
function PaymentForm({ total, onNext }: { total: number; onNext: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const { clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage('')

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/pedido-confirmado`,
        },
        redirect: 'if_required'
      })

      if (error) {
        setErrorMessage(error.message || 'Error al procesar el pago')
        setIsProcessing(false)
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Clear cart and proceed
        clearCart()
        onNext()
      }
    } catch (err) {
      setErrorMessage('Error inesperado al procesar el pago')
      setIsProcessing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
    >
      <form onSubmit={handleSubmit}>
        {/* Payment Method Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-indigo-600" />
            Método de pago
          </h3>

          <PaymentMethods selected={paymentMethod} onSelect={setPaymentMethod} />
        </div>

        {/* Stripe Payment Element */}
        {paymentMethod === 'card' && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Detalles de la tarjeta</h3>
            <div className="p-4 border-2 border-gray-200 rounded-xl">
              <PaymentElement />
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm"
          >
            {errorMessage}
          </motion.div>
        )}

        {/* Security Notice */}
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="text-sm text-emerald-800">
              <strong>Pago 100% seguro</strong> • Tus datos están protegidos con encriptación SSL
              de 256 bits
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!stripe || isProcessing}
          whileHover={{ scale: isProcessing ? 1 : 1.01 }}
          whileTap={{ scale: isProcessing ? 1 : 0.99 }}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              <span>Pagar {total.toFixed(2)}€</span>
            </>
          )}
        </motion.button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Pago seguro procesado por Stripe. Tus datos están protegidos.
        </p>
      </form>
    </motion.div>
  )
}

// Confirmation View
function ConfirmationView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center"
      >
        <CheckCircle2 className="w-12 h-12 text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-black text-gray-900 mb-4">¡Pedido confirmado!</h2>

        <p className="text-lg text-gray-600 mb-8">
          Tu pedido ha sido procesado correctamente.
          <br />
          Recibirás un email de confirmación en breve.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/cuenta/pedidos">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Ver mi pedido
            </motion.button>
          </Link>

          <Link href="/">
            <button className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors">
              Volver al inicio
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Order Summary Sidebar
function OrderSummary({ total }: { total: number }) {
  const { items, getSubtotal, getDiscount, getShipping } = useCartStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-24 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6">Resumen del pedido</h3>

      {/* Items */}
      <div className="space-y-4 mb-6 pb-6 border-b border-gray-100 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl">🛏️</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-gray-900 truncate">{item.name}</h4>
              <p className="text-xs text-gray-500">
                Cantidad: {item.quantity}
                {item.size && ` • Talla: ${item.size}`}
              </p>
              <p className="text-sm font-bold text-gray-900 mt-1">
                {(item.price * item.quantity).toFixed(2)}€
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
        <div className="flex justify-between text-gray-600 text-sm">
          <span>Subtotal</span>
          <span className="font-semibold">{getSubtotal().toFixed(2)}€</span>
        </div>

        {getDiscount() > 0 && (
          <div className="flex justify-between text-emerald-600 text-sm">
            <span>Descuento</span>
            <span className="font-semibold">-{getDiscount().toFixed(2)}€</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600 text-sm">
          <span>Envío</span>
          <span className="font-semibold">
            {getShipping() === 0 ? (
              <span className="text-emerald-600">GRATIS</span>
            ) : (
              `${getShipping().toFixed(2)}€`
            )}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {total.toFixed(2)}€
        </span>
      </div>

      {/* Trust Badges */}
      <TrustBadges />
    </motion.div>
  )
}