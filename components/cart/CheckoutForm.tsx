// components/cart/CheckoutForm.tsx - ARGENTINA 2025 COMPLETO CON CUOTAS
'use client'

import { useState, useEffect, useMemo } from 'react'
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
  Shield,
  Wallet,
  Building2,
  Check,
  ChevronDown,
  DollarSign,
  Percent,
  MapPin,
  Phone,
  Mail,
  User
} from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart-store'
import { useAuth } from '@/lib/firebase/context/AuthContext'
import { formatARS } from '@/lib/utils/currency'
import { getMejorCuota, calcularTodasLasCuotas } from '@/lib/utils/pricing'
import { CheckoutSteps, TrustBadges } from './CartComponents'

interface CheckoutFormProps {
  step: 1 | 2 | 3 | 4
  total: number
  onBack: () => void
  onNext: () => void
}

type PaymentMethodType = 'mercadopago' | 'transferencia' | 'efectivo'

export default function CheckoutForm({ step, total, onBack, onNext }: CheckoutFormProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>('mercadopago')

  console.log('💳 [CheckoutForm] Step:', step, 'Total:', total, '→', formatARS(total))

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
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
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Volver al carrito</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            {step === 2 && 'Información de envío'}
            {step === 3 && 'Método de pago'}
            {step === 4 && '¡Pedido confirmado!'}
          </h1>
          <p className="text-lg text-zinc-400">
            {step === 2 && 'Completá tus datos para continuar'}
            {step === 3 && 'Elegí cómo querés pagar'}
            {step === 4 && 'Tu pedido fue procesado correctamente'}
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

                {/* MercadoPago Payment */}
                {selectedPaymentMethod === 'mercadopago' && (
                  <MercadoPagoPaymentForm total={total} onNext={onNext} />
                )}

                {/* Transferencia Payment */}
                {selectedPaymentMethod === 'transferencia' && (
                  <TransferenciaPaymentForm total={total} onNext={onNext} />
                )}

                {/* Efectivo Payment */}
                {selectedPaymentMethod === 'efectivo' && (
                  <EfectivoPaymentForm total={total} onNext={onNext} />
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

// ============================================================================
// PAYMENT METHOD SELECTOR
// ============================================================================

function PaymentMethodSelector({ 
  selected, 
  onSelect 
}: { 
  selected: PaymentMethodType
  onSelect: (method: PaymentMethodType) => void 
}) {
  const methods = [
    {
      id: 'mercadopago' as PaymentMethodType,
      name: 'Mercado Pago',
      description: 'Hasta 12 cuotas sin recargo',
      icon: CreditCard,
      color: 'from-blue-500 to-cyan-600',
      popular: true,
      badge: 'Más elegido'
    },
    {
      id: 'transferencia' as PaymentMethodType,
      name: 'Transferencia',
      description: '10% descuento adicional',
      icon: Building2,
      color: 'from-emerald-500 to-teal-600',
      popular: false,
      badge: 'Más ahorro'
    },
    {
      id: 'efectivo' as PaymentMethodType,
      name: 'Efectivo',
      description: '15% descuento adicional',
      icon: Wallet,
      color: 'from-amber-500 to-orange-600',
      popular: false,
      badge: 'Mejor precio'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 md:p-8 shadow-2xl border border-blue-500/20 backdrop-blur-sm"
    >
      <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
        <Shield className="w-6 h-6 text-blue-400" />
        Seleccioná tu método de pago
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
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
                  ? 'border-blue-500 bg-blue-500/20 ring-2 ring-blue-500/30'
                  : 'border-zinc-800 bg-zinc-900/50 hover:border-blue-500/50'
              }`}
            >
              {/* Badge */}
              {method.badge && (
                <div className={`absolute -top-2 -right-2 ${
                  method.popular ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'
                } text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                  {method.badge}
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4`}>
                <Icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h4 className="text-lg font-bold text-white mb-1">{method.name}</h4>
              <p className="text-sm text-zinc-400">{method.description}</p>

              {/* Selected Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="text-sm text-emerald-300">
            <strong>Pago 100% seguro</strong> • Todos los métodos protegidos con encriptación SSL
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// MERCADOPAGO PAYMENT FORM
// ============================================================================

function MercadoPagoPaymentForm({ total, onNext }: { total: number; onNext: () => void }) {
  const { clearCart, items } = useCartStore()
  const { user } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [selectedCuotas, setSelectedCuotas] = useState<number | null>(null)
  const [showCuotasDropdown, setShowCuotasDropdown] = useState(false)

  const todasLasCuotas = useMemo(() => calcularTodasLasCuotas(total), [total])
  const cuotaSeleccionada = useMemo(() => {
    if (selectedCuotas === null) return null
    return todasLasCuotas.find(c => c.cuotas === selectedCuotas) || null
  }, [selectedCuotas, todasLasCuotas])

  const finalTotal = cuotaSeleccionada ? cuotaSeleccionada.precioTotal : total

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!acceptedTerms) {
      setErrorMessage('Debés aceptar los términos y condiciones')
      return
    }

    setIsProcessing(true)

    try {
      const shippingData = sessionStorage.getItem('shippingData')
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          userId: user?.id,
          userEmail: user?.email || JSON.parse(shippingData || '{}').email,
          shippingAddress: shippingData ? JSON.parse(shippingData) : null,
          paymentPlan: selectedCuotas ? `${selectedCuotas} cuotas` : 'Contado',
          totalAmount: finalTotal
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la preferencia de pago')
      }

      if (data.initPoint) {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'begin_checkout', {
            currency: 'ARS',
            value: finalTotal,
            payment_type: selectedCuotas ? `${selectedCuotas}_cuotas` : 'contado'
          })
        }
        
        window.location.href = data.initPoint
      } else {
        throw new Error('No se pudo obtener el link de pago')
      }

    } catch (err) {
      console.error('[MercadoPago] Error:', err)
      setErrorMessage(err instanceof Error ? err.message : 'Error al procesar el pago. Intentá de nuevo.')
      setIsProcessing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 md:p-8 shadow-2xl border border-blue-500/20 backdrop-blur-sm"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center pb-6 border-b border-blue-500/20">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
            <CreditCard className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-black text-white mb-2">Pago con Mercado Pago</h3>
          <p className="text-zinc-400">Pagá seguro con tarjeta o efectivo</p>
        </div>

        {/* Selector de Cuotas */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-white flex items-center gap-2">
            <Percent className="w-4 h-4 text-blue-400" />
            Elegí tu plan de pago
          </label>
          
          <button
            type="button"
            onClick={() => setShowCuotasDropdown(!showCuotasDropdown)}
            className="w-full flex items-center justify-between p-4 bg-zinc-800/50 hover:bg-zinc-800 border border-blue-500/30 rounded-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0 text-left">
              <CreditCard className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                {selectedCuotas === null ? (
                  <div>
                    <span className="text-white font-bold block text-sm">Pago de contado</span>
                    <span className="text-xs text-zinc-400">Sin recargo</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-white font-bold block text-sm">
                      {cuotaSeleccionada?.cuotas} cuotas de {cuotaSeleccionada?.formatted.precioCuota}
                    </span>
                    <span className="text-xs text-zinc-400">
                      Total: {cuotaSeleccionada?.formatted.precioTotal} (+{cuotaSeleccionada?.recargoPercentage})
                    </span>
                  </div>
                )}
              </div>
            </div>
            <motion.div
              animate={{ rotate: showCuotasDropdown ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-blue-400" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showCuotasDropdown && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 mt-3">
                  {/* Contado */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCuotas(null)
                      setShowCuotasDropdown(false)
                    }}
                    className={`w-full p-3 rounded-xl border transition-all duration-300 text-left ${
                      selectedCuotas === null
                        ? 'bg-emerald-500/20 border-emerald-500/50 ring-2 ring-emerald-500/30'
                        : 'bg-zinc-800/50 border-zinc-700 hover:border-emerald-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="w-4 h-4 text-emerald-400" />
                          <span className="font-bold text-white text-sm">Pago de Contado</span>
                        </div>
                        <div className="text-xl font-black text-emerald-400">
                          {formatARS(total)}
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">Sin recargo</p>
                      </div>
                      {selectedCuotas === null && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </button>

                  {/* Cuotas */}
                  {todasLasCuotas.map((cuota, index) => (
                    <motion.button
                      key={cuota.cuotas}
                      type="button"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setSelectedCuotas(cuota.cuotas)
                        setShowCuotasDropdown(false)
                      }}
                      className={`w-full p-3 rounded-xl border transition-all duration-300 text-left ${
                        selectedCuotas === cuota.cuotas
                          ? 'bg-blue-500/20 border-blue-500/50 ring-2 ring-blue-500/30'
                          : 'bg-zinc-800/50 border-zinc-700 hover:border-blue-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-6 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-blue-400">
                                {cuota.cuotas}
                              </span>
                            </div>
                            <span className="text-lg font-black text-white">
                              {cuota.formatted.precioCuota}
                            </span>
                            <span className="text-xs text-zinc-400">/ mes</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-zinc-400">
                              Total: {cuota.formatted.precioTotal}
                            </span>
                            <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold rounded-full">
                              +{cuota.recargoPercentage}
                            </span>
                          </div>
                        </div>
                        {selectedCuotas === cuota.cuotas && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Info tip */}
                {selectedCuotas !== null && cuotaSeleccionada && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg"
                  >
                    <div className="flex items-start gap-2">
                      <Percent className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-zinc-400">
                        <p className="font-semibold text-blue-400 mb-1">
                          💡 Ahorrás con pago de contado
                        </p>
                        <p>
                          La diferencia es de {formatARS(cuotaSeleccionada.precioTotal - total)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <span>Tarjeta de crédito y débito (Visa, Mastercard, Amex)</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <span>Pago en efectivo (Rapipago, Pago Fácil)</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <span>Compra protegida por Mercado Pago</span>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 w-5 h-5 text-blue-600 border-zinc-700 bg-zinc-800 rounded focus:ring-blue-500"
            disabled={isProcessing}
          />
          <label htmlFor="terms" className="text-sm text-zinc-400">
            Acepto los{' '}
            <Link href="/terminos" className="text-blue-400 hover:underline font-semibold">
              términos y condiciones
            </Link>{' '}
            y la{' '}
            <Link href="/privacidad" className="text-blue-400 hover:underline font-semibold">
              política de privacidad
            </Link>
          </label>
        </div>

        {/* Error */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Info */}
        <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-zinc-300">Total a pagar</span>
            <span className="text-2xl font-black text-white">{formatARS(finalTotal)}</span>
          </div>
          {cuotaSeleccionada && (
            <p className="text-xs text-zinc-400">
              {cuotaSeleccionada.cuotas} cuotas de {cuotaSeleccionada.formatted.precioCuota}
            </p>
          )}
          <p className="text-xs text-zinc-400 mt-2">
            El pago se procesará de forma segura a través de Mercado Pago
          </p>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isProcessing}
          whileHover={{ scale: isProcessing ? 1 : 1.01 }}
          whileTap={{ scale: isProcessing ? 1 : 0.99 }}
          className="w-full py-5 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl font-bold text-lg shadow-2xl shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Redirigiendo a Mercado Pago...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Pagar con Mercado Pago</span>
            </>
          )}
        </motion.button>

        {/* Security */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-sm text-zinc-500">
            <Lock className="w-4 h-4" />
            <span>Conexión segura SSL 256 bits</span>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

// ============================================================================
// TRANSFERENCIA PAYMENT
// ============================================================================

function TransferenciaPaymentForm({ total, onNext }: { total: number; onNext: () => void }) {
  const { clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const discount = total * 0.10
  const finalTotal = total - discount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!acceptedTerms) {
      setErrorMessage('Debés aceptar los términos y condiciones')
      return
    }

    setIsProcessing(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      const shippingData = sessionStorage.getItem('shippingData')
      const mockOrderId = `TRANS-${Date.now()}`
      
      sessionStorage.setItem('lastOrder', JSON.stringify({
        orderId: mockOrderId,
        paymentMethod: 'transferencia',
        amount: finalTotal,
        discount: discount,
        shipping: shippingData ? JSON.parse(shippingData) : null,
        date: new Date().toISOString()
      }))

      clearCart()
      sessionStorage.removeItem('shippingData')
      onNext()

    } catch (err) {
      console.error('[Transferencia] Error:', err)
      setErrorMessage('Error al procesar. Intentá de nuevo.')
      setIsProcessing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 md:p-8 shadow-2xl border border-emerald-500/20 backdrop-blur-sm"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center pb-6 border-b border-emerald-500/20">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-black text-white mb-2">Pago por Transferencia</h3>
          <p className="text-zinc-400">10% de descuento adicional</p>
        </div>

        {/* Bank Details */}
        <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-4">
          <h4 className="font-bold text-white mb-3">Datos bancarios:</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Banco:</span>
              <span className="font-semibold text-white">Banco Macro</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">CBU:</span>
              <span className="font-mono font-semibold text-white">2850590940090418135201</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Alias:</span>
              <span className="font-semibold text-white">AZUL.COLCHONES</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Titular:</span>
              <span className="font-semibold text-white">Azul Colchones SRL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">CUIT:</span>
              <span className="font-mono font-semibold text-white">30-12345678-9</span>
            </div>
          </div>
        </div>

        {/* Discount */}
        <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-zinc-300">Total original:</span>
            <span className="text-lg font-bold text-zinc-500 line-through">{formatARS(total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-emerald-400">Total con descuento (10% OFF):</span>
            <span className="text-2xl font-black text-emerald-400">{formatARS(finalTotal)}</span>
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            ¡Ahorrás {formatARS(discount)}!
          </p>
        </div>

        {/* Instructions */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-sm text-blue-300 font-semibold mb-2">📋 Instrucciones:</p>
          <ol className="text-sm text-zinc-300 space-y-1 list-decimal list-inside">
            <li>Realizá la transferencia por el monto indicado</li>
            <li>Envianos el comprobante por WhatsApp al 353-123-4567</li>
            <li>Confirmamos tu pedido en menos de 2 horas</li>
          </ol>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms-trans"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 w-5 h-5 text-emerald-600 border-zinc-700 bg-zinc-800 rounded focus:ring-emerald-500"
            disabled={isProcessing}
          />
          <label htmlFor="terms-trans" className="text-sm text-zinc-400">
            Acepto enviar el comprobante y esperar la confirmación
          </label>
        </div>

        {/* Error */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isProcessing}
          whileHover={{ scale: isProcessing ? 1 : 1.01 }}
          whileTap={{ scale: isProcessing ? 1 : 0.99 }}
          className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold text-lg shadow-2xl shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Confirmando...</span>
            </>
          ) : (
            <>
              <Building2 className="w-5 h-5" />
              <span>Confirmar pedido</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}

// ============================================================================
// EFECTIVO PAYMENT
// ============================================================================

function EfectivoPaymentForm({ total, onNext }: { total: number; onNext: () => void }) {
  const { clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const discount = total * 0.15
  const finalTotal = total - discount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!acceptedTerms) {
      setErrorMessage('Debés aceptar los términos y condiciones')
      return
    }

    setIsProcessing(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      const shippingData = sessionStorage.getItem('shippingData')
      const mockOrderId = `EFEC-${Date.now()}`
      
      sessionStorage.setItem('lastOrder', JSON.stringify({
        orderId: mockOrderId,
        paymentMethod: 'efectivo',
        amount: finalTotal,
        discount: discount,
        shipping: shippingData ? JSON.parse(shippingData) : null,
        date: new Date().toISOString()
      }))

      clearCart()
      sessionStorage.removeItem('shippingData')
      onNext()

    } catch (err) {
      console.error('[Efectivo] Error:', err)
      setErrorMessage('Error al procesar. Intentá de nuevo.')
      setIsProcessing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 md:p-8 shadow-2xl border border-amber-500/20 backdrop-blur-sm"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center pb-6 border-b border-amber-500/20">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-black text-white mb-2">Pago en Efectivo</h3>
          <p className="text-zinc-400">15% de descuento - Mejor precio</p>
        </div>

        {/* Discount */}
        <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-zinc-300">Total original:</span>
            <span className="text-lg font-bold text-zinc-500 line-through">{formatARS(total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-amber-400">Total en efectivo (15% OFF):</span>
            <span className="text-3xl font-black text-amber-400">{formatARS(finalTotal)}</span>
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            ¡Ahorrás {formatARS(discount)}! 🎉
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <div className="p-4 bg-zinc-800/50 border-2 border-zinc-700 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span className="text-xl">🏪</span>
              </div>
              <div>
                <h4 className="font-bold text-white">En nuestro showroom</h4>
                <p className="text-sm text-zinc-400">Calle Principal 123, Villa María</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-zinc-800/50 border-2 border-zinc-700 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <span className="text-xl">🚚</span>
              </div>
              <div>
                <h4 className="font-bold text-white">Al recibir tu pedido</h4>
                <p className="text-sm text-zinc-400">Pagás cuando te lo entregamos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms-efec"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 w-5 h-5 text-amber-600 border-zinc-700 bg-zinc-800 rounded focus:ring-amber-500"
            disabled={isProcessing}
          />
          <label htmlFor="terms-efec" className="text-sm text-zinc-400">
            Acepto los términos de pago en efectivo
          </label>
        </div>

        {/* Error */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isProcessing}
          whileHover={{ scale: isProcessing ? 1 : 1.01 }}
          whileTap={{ scale: isProcessing ? 1 : 0.99 }}
          className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg shadow-2xl shadow-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Confirmando...</span>
            </>
          ) : (
            <>
              <Wallet className="w-5 h-5" />
              <span>Confirmar pedido</span>
            </>
          )}
        </motion.button>

        <p className="text-center text-xs text-zinc-500">
          Te contactaremos para coordinar la entrega
        </p>
      </form>
    </motion.div>
  )
}

// ============================================================================
// SHIPPING FORM
// ============================================================================

function ShippingForm({ onNext }: { onNext: () => void }) {
  const { user } = useAuth()
  
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    addressNumber: '',
    city: user?.city || 'Villa María',
    postalCode: user?.postalCode || '',
    province: user?.province || 'Córdoba',
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
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = 'Teléfono inválido (mín. 10 dígitos)'
    }
    if (!formData.address.trim()) newErrors.address = 'Calle requerida'
    if (!formData.addressNumber.trim()) newErrors.addressNumber = 'Número requerido'
    if (!formData.city.trim()) newErrors.city = 'Ciudad requerida'
    if (!formData.postalCode.trim() || formData.postalCode.length < 4) {
      newErrors.postalCode = 'Código postal inválido'
    }

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
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 md:p-8 shadow-2xl border border-blue-500/20 backdrop-blur-sm"
    >
      {/* Contact Information */}
      <div className="mb-8">
        <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center text-sm font-bold">
            1
          </span>
          Datos de contacto
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Nombre *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 bg-zinc-800 border-2 rounded-xl focus:outline-none transition-colors text-white ${
                errors.firstName ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
              }`}
              placeholder="Juan"
            />
            {errors.firstName && (
              <p className="text-xs text-red-400 mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Apellido *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 bg-zinc-800 border-2 rounded-xl focus:outline-none transition-colors text-white ${
                errors.lastName ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
              }`}
              placeholder="Pérez"
            />
            {errors.lastName && (
              <p className="text-xs text-red-400 mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 bg-zinc-800 border-2 rounded-xl focus:outline-none transition-colors text-white ${
                errors.email ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
              }`}
              placeholder="juan@ejemplo.com"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Teléfono *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-4 py-3 bg-zinc-800 border-2 rounded-xl focus:outline-none transition-colors text-white ${
                errors.phone ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
              }`}
              placeholder="353 123 4567"
            />
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mb-8">
        <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center text-sm font-bold">
            2
          </span>
          Dirección de envío
        </h3>

        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-white mb-2">
                Calle *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={`w-full px-4 py-3 bg-zinc-800 border-2 rounded-xl focus:outline-none transition-colors text-white ${
                  errors.address ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
                }`}
                placeholder="Av. Libertador"
              />
              {errors.address && (
                <p className="text-xs text-red-400 mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Número *
              </label>
              <input
                type="text"
                value={formData.addressNumber}
                onChange={(e) => handleInputChange('addressNumber', e.target.value)}
                className={`w-full px-4 py-3 bg-zinc-800 border-2 rounded-xl focus:outline-none transition-colors text-white ${
                  errors.addressNumber ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
                }`}
                placeholder="1234"
              />
              {errors.addressNumber && (
                <p className="text-xs text-red-400 mt-1">{errors.addressNumber}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Código Postal *
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                className={`w-full px-4 py-3 bg-zinc-800 border-2 rounded-xl focus:outline-none transition-colors text-white ${
                  errors.postalCode ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
                }`}
                placeholder="5900"
              />
              {errors.postalCode && (
                <p className="text-xs text-red-400 mt-1">{errors.postalCode}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Ciudad *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={`w-full px-4 py-3 bg-zinc-800 border-2 rounded-xl focus:outline-none transition-colors text-white ${
                  errors.city ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'
                }`}
                placeholder="Villa María"
              />
              {errors.city && (
                <p className="text-xs text-red-400 mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Provincia *
              </label>
              <select
                value={formData.province}
                onChange={(e) => handleInputChange('province', e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-700 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-white"
              >
                <option value="Córdoba">Córdoba</option>
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="Santa Fe">Santa Fe</option>
                <option value="Mendoza">Mendoza</option>
                <option value="Tucumán">Tucumán</option>
                <option value="Otra">Otra</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Notas adicionales (opcional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-700 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none text-white placeholder-zinc-500"
              placeholder="Piso, departamento, referencias..."
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold text-lg shadow-2xl shadow-blue-500/30 transition-all"
      >
        Continuar al pago
      </motion.button>

      <p className="text-xs text-zinc-500 text-center mt-4">
        Al continuar, aceptás nuestros{' '}
        <Link href="/terminos" className="underline hover:text-zinc-300">
          Términos y Condiciones
        </Link>
      </p>
    </motion.form>
  )
}

// ============================================================================
// CONFIRMATION VIEW
// ============================================================================

function ConfirmationView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-12 shadow-2xl border border-emerald-500/30 text-center backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center"
      >
        <CheckCircle2 className="w-12 h-12 text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-black text-white mb-4">¡Pedido confirmado!</h2>

        <p className="text-lg text-zinc-300 mb-2">
          Tu pedido fue procesado correctamente.
        </p>
        <p className="text-base text-zinc-400 mb-8">
          Vas a recibir un email de confirmación con todos los detalles.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/cuenta/pedidos">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold shadow-2xl shadow-blue-500/30 transition-all"
            >
              Ver mi pedido
            </motion.button>
          </Link>

          <Link href="/">
            <button className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-colors">
              Volver al inicio
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// ORDER SUMMARY
// ============================================================================

function OrderSummary({ total }: { total: number }) {
  const { items, getSubtotal, getDiscount, getShipping } = useCartStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-24 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 shadow-2xl border border-blue-500/20 backdrop-blur-sm"
    >
      <h3 className="text-xl font-black text-white mb-6">Resumen del pedido</h3>

      {/* Items */}
      <div className="space-y-4 mb-6 pb-6 border-b border-blue-500/20 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden border border-blue-500/20">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl">🛏️</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-white truncate">{item.name}</h4>
              <p className="text-xs text-zinc-400">
                Cantidad: {item.quantity}
                {item.size && ` • ${item.size}`}
              </p>
              <p className="text-sm font-bold text-white mt-1">
                {formatARS(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6 pb-6 border-b border-blue-500/20">
        <div className="flex justify-between text-zinc-400 text-sm">
          <span>Subtotal</span>
          <span className="font-semibold text-white">{formatARS(getSubtotal())}</span>
        </div>

        {getDiscount() > 0 && (
          <div className="flex justify-between text-emerald-400 text-sm">
            <span>Descuento</span>
            <span className="font-semibold">-{formatARS(getDiscount())}</span>
          </div>
        )}

        <div className="flex justify-between text-zinc-400 text-sm">
          <span>Envío</span>
          <span className="font-semibold">
            {getShipping() === 0 ? (
              <span className="text-emerald-400">GRATIS</span>
            ) : (
              <span className="text-white">{formatARS(getShipping())}</span>
            )}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-white">Total</span>
        <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {formatARS(total)}
        </span>
      </div>

      {/* Trust Badges */}
      <TrustBadges />
    </motion.div>
  )
}