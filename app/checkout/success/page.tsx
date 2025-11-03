// app/checkout/success/page.tsx
'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Package, Truck, Mail, ArrowRight, Loader2 } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import confetti from 'canvas-confetti'

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clearCart } = useCartStore()
  
  const [orderData, setOrderData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Clear cart on success
    clearCart()

    // Trigger confetti
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

    return () => clearInterval(interval)
  }, [clearCart])

  useEffect(() => {
    if (sessionId) {
      // Fetch order details from Stripe session
      fetchOrderDetails(sessionId)
    } else {
      setLoading(false)
    }
  }, [sessionId])

  const fetchOrderDetails = async (sessionId: string) => {
    try {
      // You can create an API endpoint to fetch order details
      // For now, we'll just set loading to false
      setLoading(false)
    } catch (error) {
      console.error('Error fetching order:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-violet-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Verificando tu pedido...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-zinc-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />
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
            className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full shadow-2xl shadow-emerald-500/50"
          >
            <CheckCircle className="w-14 h-14 text-white" />
          </motion.div>

          {/* Main Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4"
          >
            ¡Pedido confirmado!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto"
          >
            Gracias por tu compra. Tu pedido ha sido procesado correctamente y pronto recibirás un email de confirmación.
          </motion.p>

          {/* Order Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 border border-white/10">
              <Mail className="w-10 h-10 text-violet-400 mb-4 mx-auto" />
              <h3 className="text-lg font-bold text-white mb-2">Email de confirmación</h3>
              <p className="text-sm text-zinc-400">
                Recibirás los detalles de tu pedido por correo electrónico
              </p>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 border border-white/10">
              <Package className="w-10 h-10 text-fuchsia-400 mb-4 mx-auto" />
              <h3 className="text-lg font-bold text-white mb-2">Procesando pedido</h3>
              <p className="text-sm text-zinc-400">
                Estamos preparando tu pedido para el envío
              </p>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 border border-white/10">
              <Truck className="w-10 h-10 text-cyan-400 mb-4 mx-auto" />
              <h3 className="text-lg font-bold text-white mb-2">Entrega 3-6 días</h3>
              <p className="text-sm text-zinc-400">
                Recibirás tu pedido en 3 a 6 días laborables
              </p>
            </div>
          </motion.div>

          {/* Session ID (for reference) */}
          {sessionId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10 inline-block"
            >
              <p className="text-xs text-zinc-500 mb-1">ID de transacción</p>
              <p className="text-sm font-mono text-zinc-400">{sessionId}</p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/mi-cuenta/pedidos">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/40 transition-all flex items-center justify-center gap-2"
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

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-white/10 text-left max-w-2xl mx-auto"
          >
            <h3 className="text-lg font-bold text-white mb-4">¿Qué sigue ahora?</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Recibirás un email de confirmación con todos los detalles de tu pedido</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Te enviaremos el número de seguimiento cuando tu pedido sea enviado</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Puedes hacer el seguimiento de tu pedido desde tu cuenta</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Si tienes alguna duda, contáctanos en soporte@descansopremium.com</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-violet-500 animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}