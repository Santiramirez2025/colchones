'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Truck, Mail } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams?.get('session_id')
  const [orderNumber] = useState(() => 
    `DP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  )

  useEffect(() => {
    // Track purchase event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: sessionId,
        value: 799,
        currency: 'EUR',
      })
    }
  }, [sessionId])

  return (
    <div className="min-h-screen pt-24 pb-12 bg-warm-50">
      <div className="container-custom max-w-4xl">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block mb-6"
          >
            <CheckCircle className="w-24 h-24 text-green-500" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ¡Pedido confirmado!
          </h1>
          <p className="text-xl text-gray-600">
            Gracias por tu compra. Tu nuevo descanso está en camino
          </p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-8"
        >
          <div className="border-b pb-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Número de pedido</p>
                <p className="text-2xl font-bold text-primary-600">
                  {orderNumber}
                </p>
              </div>
              {sessionId && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">ID de sesión</p>
                  <p className="text-xs text-gray-500 font-mono">
                    {sessionId.substring(0, 20)}...
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold">Próximos pasos</h3>

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card text-center"
          >
            <Package className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Envío gratis</h3>
            <p className="text-sm text-gray-600">
              Entrega en 24-48h sin coste adicional
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="card text-center"
          >
            <Truck className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Seguimiento</h3>
            <p className="text-sm text-gray-600">
              Recibirás el tracking por email
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="card text-center"
          >
            <Mail className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Confirmación</h3>
            <p className="text-sm text-gray-600">
              Revisa tu email para más detalles
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center space-y-4"
        >
          <p className="text-gray-600">
            ¿Tienes alguna pregunta sobre tu pedido?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto">
              <button className="btn-secondary">
                Contactar soporte
              </button>
            </Link>
            <Link href="/catalogo">
              <button className="btn-primary">
                Seguir comprando
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const steps = [
  {
    icon: Mail,
    title: 'Confirmación enviada',
    description: 'Hemos enviado todos los detalles de tu pedido a tu email.',
  },
  {
    icon: Package,
    title: 'Preparando tu pedido',
    description: 'Nuestro equipo está preparando tu colchón para el envío.',
  },
  {
    icon: Truck,
    title: 'En camino',
    description: 'Recibirás tu pedido en 24-48 horas laborables.',
  },
]
