'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  Smartphone,
  Shield
} from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/store/cart-store'
import { useAuth } from '@/lib/firebase/context/AuthContext'
import { CheckoutSteps, TrustBadges } from './CartComponents'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutFormProps {
  step: 1 | 2 | 3 | 4
  total: number
  onBack: () => void
  onNext: () => void
}

type PaymentMethodType = 'bizum' | 'stripe'

export default function CheckoutForm({ step, total, onBack, onNext }: CheckoutFormProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>('bizum')
  const [clientSecret, setClientSecret] = useState<string>('')
  const [isLoadingIntent, setIsLoadingIntent] = useState(false)
  const [paymentIntentError, setPaymentIntentError] = useState<string>('')

  // Create payment intent only when Stripe is selected
  useEffect(() => {
    if (step === 3 && selectedPaymentMethod === 'stripe' && !clientSecret && total > 0) {
      setIsLoadingIntent(true)
      setPaymentIntentError('')
      
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(total * 100) })
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Error al crear la intención de pago')
          }
          return res.json()
        })
        .then(data => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret)
          } else {
            throw new Error('No se recibió el client secret')
          }
        })
        .catch(err => {
          console.error('Error creating payment intent:', err)
          setPaymentIntentError(err.message || 'Error al preparar el pago. Por favor, intenta de nuevo.')
        })
        .finally(() => setIsLoadingIntent(false))
    }
  }, [step, selectedPaymentMethod, clientSecret, total])

  // Cleanup client secret when leaving payment step or changing method
  useEffect(() => {
    if ((step !== 3 || selectedPaymentMethod !== 'stripe') && clientSecret) {
      setClientSecret('')
      setPaymentIntentError('')
    }
  }, [step, selectedPaymentMethod])

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
            {step === 3 && 'Elige cómo quieres pagar'}
            {step === 4 && 'Tu pedido ha sido procesado correctamente'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 2 && <ShippingForm onNext={onNext} />}
            
            {step === 3 && (
              <div className="space-y-6">
                {/* Payment Method Selection */}
                <PaymentMethodSelector 
                  selected={selectedPaymentMethod}
                  onSelect={setSelectedPaymentMethod}
                />

                {/* Bizum Payment Form */}
                {selectedPaymentMethod === 'bizum' && (
                  <BizumPaymentForm total={total} onNext={onNext} />
                )}

                {/* Stripe Payment Form */}
                {selectedPaymentMethod === 'stripe' && (
                  <>
                    {isLoadingIntent ? (
                      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-indigo-600" />
                          <p className="text-gray-600 font-semibold">Preparando el pago seguro...</p>
                          <p className="text-sm text-gray-500 mt-2">Esto solo tomará un momento</p>
                        </div>
                      </div>
                    ) : paymentIntentError ? (
                      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="text-center py-8">
                          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Error al preparar el pago</h3>
                          <p className="text-gray-600 mb-6">{paymentIntentError}</p>
                          <button
                            onClick={() => {
                              setClientSecret('')
                              setPaymentIntentError('')
                            }}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
                          >
                            Intentar de nuevo
                          </button>
                        </div>
                      </div>
                    ) : clientSecret ? (
                      <Elements options={options} stripe={stripePromise}>
                        <StripePaymentForm total={total} onNext={onNext} />
                      </Elements>
                    ) : null}
                  </>
                )}
              </div>
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

// Payment Method Selector Component
function PaymentMethodSelector({ 
  selected, 
  onSelect 
}: { 
  selected: PaymentMethodType
  onSelect: (method: PaymentMethodType) => void 
}) {
  const methods = [
    {
      id: 'bizum' as PaymentMethodType,
      name: 'Bizum',
      description: 'Pago instantáneo con tu móvil',
      icon: Smartphone,
      color: 'from-cyan-500 to-blue-600',
      popular: true
    },
    {
      id: 'stripe' as PaymentMethodType,
      name: 'Tarjeta',
      description: 'Tarjeta de crédito o débito',
      icon: CreditCard,
      color: 'from-indigo-500 to-purple-600',
      popular: false
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Shield className="w-6 h-6 text-indigo-600" />
        Selecciona tu método de pago
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {methods.map((method) => {
          const Icon = method.icon
          const isSelected = selected === method.id

          return (
            <motion.button
              key={method.id}
              onClick={() => onSelect(method.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-500/20'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {/* Popular Badge */}
              {method.popular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  Popular
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4`}>
                <Icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h4 className="text-lg font-bold text-gray-900 mb-1">{method.name}</h4>
              <p className="text-sm text-gray-600">{method.description}</p>

              {/* Selected Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div className="text-sm text-emerald-800">
            <strong>Pago 100% seguro</strong> • Todos los métodos están protegidos con encriptación SSL
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Bizum Payment Form Component
function BizumPaymentForm({ total, onNext }: { total: number; onNext: () => void }) {
  const { clearCart } = useCartStore()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const validatePhone = (phone: string) => {
    // Spanish phone validation (9 digits, starts with 6, 7, or 9)
    const regex = /^[679]\d{8}$/
    return regex.test(phone.replace(/\s/g, ''))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    // Validations
    if (!phoneNumber.trim()) {
      setErrorMessage('Por favor, introduce tu número de teléfono')
      return
    }

    const cleanPhone = phoneNumber.replace(/\s/g, '')
    if (!validatePhone(cleanPhone)) {
      setErrorMessage('Número de teléfono inválido. Debe ser un número español válido.')
      return
    }

    if (!acceptedTerms) {
      setErrorMessage('Debes aceptar los términos y condiciones')
      return
    }

    setIsProcessing(true)

    try {
      // Simulate Bizum payment process
      // In production, this would call your Bizum payment API
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate successful payment
      const mockPaymentId = `BZM-${Date.now()}`
      
      // Save order data
      const shippingData = sessionStorage.getItem('shippingData')
      if (shippingData) {
        sessionStorage.setItem('lastOrder', JSON.stringify({
          paymentId: mockPaymentId,
          paymentMethod: 'bizum',
          amount: total,
          phoneNumber: cleanPhone,
          shipping: JSON.parse(shippingData),
          date: new Date().toISOString()
        }))
      }

      // Clear cart and proceed
      clearCart()
      sessionStorage.removeItem('shippingData')
      onNext()

    } catch (err) {
      console.error('Bizum payment error:', err)
      setErrorMessage('Error al procesar el pago con Bizum. Por favor, intenta de nuevo.')
      setIsProcessing(false)
    }
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    // Format as XXX XXX XXX
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bizum Logo/Header */}
        <div className="text-center pb-6 border-b border-gray-100">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
            <Smartphone className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Pago con Bizum</h3>
          <p className="text-gray-600">Introduce tu número de móvil para realizar el pago</p>
        </div>

        {/* Phone Number Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Número de teléfono *
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-500">
              <span className="text-sm font-semibold">🇪🇸 +34</span>
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
              placeholder="600 000 000"
              maxLength={11}
              className="w-full pl-20 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              disabled={isProcessing}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Recibirás una notificación en tu app de Bizum para autorizar el pago
          </p>
        </div>

        {/* Terms Acceptance */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            disabled={isProcessing}
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            Acepto los{' '}
            <Link href="/terminos" className="text-indigo-600 hover:underline font-semibold">
              términos y condiciones
            </Link>{' '}
            y la{' '}
            <Link href="/privacidad" className="text-indigo-600 hover:underline font-semibold">
              política de privacidad
            </Link>
          </label>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Info */}
        <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Total a pagar</span>
            <span className="text-2xl font-black text-gray-900">{total.toFixed(2)}€</span>
          </div>
          <p className="text-xs text-gray-600">
            El pago se realizará de forma segura a través de Bizum
          </p>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isProcessing}
          whileHover={{ scale: isProcessing ? 1 : 1.01 }}
          whileTap={{ scale: isProcessing ? 1 : 0.99 }}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Procesando pago con Bizum...</span>
            </>
          ) : (
            <>
              <Smartphone className="w-5 h-5" />
              <span>Pagar con Bizum</span>
            </>
          )}
        </motion.button>

        {/* Security Notice */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <Lock className="w-4 h-4" />
            <span>Conexión segura SSL 256 bits</span>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

// Stripe Payment Form Component
function StripePaymentForm({ total, onNext }: { total: number; onNext: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const { clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
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
        // Save order data
        const shippingData = sessionStorage.getItem('shippingData')
        if (shippingData) {
          sessionStorage.setItem('lastOrder', JSON.stringify({
            paymentIntentId: paymentIntent.id,
            paymentMethod: 'stripe',
            amount: paymentIntent.amount / 100,
            shipping: JSON.parse(shippingData),
            date: new Date().toISOString()
          }))
        }
        
        // Clear cart and proceed
        clearCart()
        sessionStorage.removeItem('shippingData')
        onNext()
      }
    } catch (err) {
      console.error('Payment error:', err)
      setErrorMessage('Error inesperado al procesar el pago')
      setIsProcessing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center pb-6 border-b border-gray-100">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <CreditCard className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Pago con tarjeta</h3>
          <p className="text-gray-600">Introduce los datos de tu tarjeta</p>
        </div>

        {/* Stripe Payment Element */}
        <div className="p-4 border-2 border-gray-200 rounded-xl">
          <PaymentElement />
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Error en el pago</p>
                <p>{errorMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Security Notice */}
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="text-sm text-emerald-800">
              <strong>Pago 100% seguro</strong> • Procesado por Stripe con encriptación SSL de 256 bits
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!stripe || isProcessing}
          whileHover={{ scale: isProcessing ? 1 : 1.01 }}
          whileTap={{ scale: isProcessing ? 1 : 0.99 }}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Procesando pago...</span>
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              <span>Pagar {total.toFixed(2)}€</span>
            </>
          )}
        </motion.button>

        <p className="text-center text-xs text-gray-500">
          Pago seguro procesado por Stripe
        </p>
      </form>
    </motion.div>
  )
}

// Shipping Form Component (sin cambios significativos)
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
      sessionStorage.setItem('shippingData', JSON.stringify(formData))
      onNext()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
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
              onChange={(e) => handleInputChange('firstName', e.target.value)}
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
              onChange={(e) => handleInputChange('lastName', e.target.value)}
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
              onChange={(e) => handleInputChange('email', e.target.value)}
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
              onChange={(e) => handleInputChange('phone', e.target.value)}
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
              onChange={(e) => handleInputChange('address', e.target.value)}
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
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
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
                onChange={(e) => handleInputChange('city', e.target.value)}
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
                onChange={(e) => handleInputChange('province', e.target.value)}
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

// Confirmation View
function ConfirmationView() {
  const router = useRouter()
  
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

        <p className="text-lg text-gray-600 mb-2">
          Tu pedido ha sido procesado correctamente.
        </p>
        <p className="text-base text-gray-500 mb-8">
          Recibirás un email de confirmación en breve con todos los detalles.
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