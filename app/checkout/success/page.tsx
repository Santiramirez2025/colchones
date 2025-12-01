// app/checkout/success/page.tsx - ARGENTINA 2025 OPTIMIZADO
'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  CheckCircle, Package, Truck, Mail, ArrowRight, Loader2, 
  Shield, Award, CreditCard, MapPin, Phone, Clock
} from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import confetti from 'canvas-confetti'

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const paymentId = searchParams.get('payment_id')
  const externalReference = searchParams.get('external_reference')
  const { clearCart } = useCartStore()
  
  const [orderData, setOrderData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  console.log('🎉 [CheckoutSuccess] Page loaded')
  console.log('📋 [CheckoutSuccess] Params:', { sessionId, paymentId, externalReference })

  useEffect(() => {
    // Clear cart on success
    clearCart()
    console.log('🛒 [CheckoutSuccess] Cart cleared')

    // Trigger confetti celebration
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    console.log('🎊 [CheckoutSuccess] Confetti started')

    return () => {
      clearInterval(interval)
      console.log('🎊 [CheckoutSuccess] Confetti stopped')
    }
  }, [clearCart])

  useEffect(() => {
    const id = sessionId || paymentId
    
    if (id) {
      // Fetch order details
      fetchOrderDetails(id)
    } else {
      // Try to get order from sessionStorage
      const lastOrder = sessionStorage.getItem('lastOrder')
      if (lastOrder) {
        try {
          const order = JSON.parse(lastOrder)
          setOrderData(order)
          console.log('✅ [CheckoutSuccess] Order loaded from session:', order)
        } catch (error) {
          console.error('❌ [CheckoutSuccess] Error parsing order:', error)
        }
      }
      setLoading(false)
    }
  }, [sessionId, paymentId])

  const fetchOrderDetails = async (id: string) => {
    try {
      console.log('🔄 [CheckoutSuccess] Fetching order details...')
      
      // TODO: Implement API endpoint to fetch order from DB
      // const response = await fetch(`/api/orders/${id}`)
      // const data = await response.json()
      // setOrderData(data)
      
      // For now, try session storage
      const lastOrder = sessionStorage.getItem('lastOrder')
      if (lastOrder) {
        const order = JSON.parse(lastOrder)
        setOrderData(order)
        console.log('✅ [CheckoutSuccess] Order loaded:', order)
      }
      
      setLoading(false)
    } catch (error) {
      console.error('❌ [CheckoutSuccess] Error fetching order:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg font-semibold">Verificando tu pedido...</p>
          <p className="text-zinc-400 text-sm mt-2">Esto solo tomará un momento</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(16,185,129,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(16,185,129,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2 
            }}
            className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full shadow-2xl shadow-emerald-500/50"
          >
            <CheckCircle className="w-14 h-14 text-white" />
          </motion.div>

          {/* Main Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight"
          >
            ¡Pedido confirmado!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Gracias por tu compra. Tu pedido fue procesado correctamente y pronto vas a recibir un email de confirmación.
          </motion.p>

          {/* MercadoPago Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-full mb-12"
          >
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">
              Pago procesado por MercadoPago
            </span>
          </motion.div>

          {/* Order Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-3 gap-4 md:gap-6 mb-12"
          >
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 border border-blue-500/20 backdrop-blur-sm shadow-xl">
              <Mail className="w-10 h-10 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-lg font-bold text-white mb-2">Email de confirmación</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Vas a recibir los detalles de tu pedido por email
              </p>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 border border-cyan-500/20 backdrop-blur-sm shadow-xl">
              <Package className="w-10 h-10 text-cyan-400 mb-4 mx-auto" />
              <h3 className="text-lg font-bold text-white mb-2">Procesando pedido</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Estamos preparando tu pedido para el envío
              </p>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 border border-emerald-500/20 backdrop-blur-sm shadow-xl">
              <Truck className="w-10 h-10 text-emerald-400 mb-4 mx-auto" />
              <h3 className="text-lg font-bold text-white mb-2">Entrega Villa María</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Envío gratis • 2-3 días hábiles
              </p>
            </div>
          </motion.div>

          {/* Order Details Card */}
          {orderData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8 p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-blue-500/20 shadow-xl"
            >
              <h3 className="text-lg font-bold text-white mb-4">Detalles del pedido</h3>
              
              <div className="space-y-3 text-left">
                {orderData.orderId && (
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-sm text-zinc-400">Número de orden:</span>
                    <span className="text-sm font-mono font-semibold text-white">{orderData.orderId}</span>
                  </div>
                )}
                
                {orderData.paymentMethod && (
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-sm text-zinc-400">Método de pago:</span>
                    <span className="text-sm font-semibold text-white capitalize">{orderData.paymentMethod}</span>
                  </div>
                )}
                
                {orderData.amount && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-zinc-400">Total:</span>
                    <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      ${orderData.amount.toLocaleString('es-AR')}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Transaction ID */}
          {(sessionId || paymentId || externalReference) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10 inline-block"
            >
              <p className="text-xs text-zinc-500 mb-1">ID de transacción</p>
              <p className="text-sm font-mono text-zinc-400">
                {sessionId || paymentId || externalReference}
              </p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/cuenta/pedidos">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl font-bold shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Package className="w-5 h-5" />
                Ver mis pedidos
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>

            <Link href="/catalogo">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all"
              >
                Seguir comprando
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12"
          >
            {[
              { icon: Shield, text: '5 años garantía', color: 'blue' },
              { icon: Award, text: '100 noches prueba', color: 'emerald' },
              { icon: Truck, text: 'Envío gratis', color: 'cyan' },
              { icon: CreditCard, text: '12 cuotas', color: 'violet' }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-4 text-center"
              >
                <item.icon className={`w-6 h-6 mx-auto mb-2 text-${item.color}-400`} />
                <p className="text-xs font-semibold text-white">{item.text}</p>
              </div>
            ))}
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="p-6 md:p-8 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-blue-500/20 text-left max-w-2xl mx-auto shadow-xl mb-8"
          >
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-400" />
              ¿Qué sigue ahora?
            </h3>
            
            <ul className="space-y-4 text-sm text-zinc-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Vas a recibir un email de confirmación con todos los detalles de tu pedido</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Te vamos a enviar el número de seguimiento cuando tu pedido sea despachado</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Podés hacer el seguimiento de tu pedido desde tu cuenta</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Si tenés alguna duda, contactanos por WhatsApp al 353-123-4567</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl max-w-2xl mx-auto"
          >
            <h3 className="text-lg font-bold text-white mb-4">¿Necesitás ayuda?</h3>
            
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white mb-1">WhatsApp</p>
                  <p className="text-sm text-zinc-400">353-123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Email</p>
                  <p className="text-sm text-zinc-400">hola@azulcolchones.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-full text-sm text-zinc-400"
          >
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>Villa María, Córdoba • <span className="text-white font-semibold">Argentina</span></span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-4" />
          <p className="text-white text-lg font-semibold">Cargando...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}