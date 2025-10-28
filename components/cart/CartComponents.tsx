// components/cart/CartComponents.tsx
'use client'

import { motion } from 'framer-motion'
import { Shield, Truck, Award, Star, ChevronRight, Lock, Package, Heart, BadgeCheck } from 'lucide-react'
import Link from 'next/link'

// Progress Bar for Free Shipping
interface ShippingProgressProps {
  current: number
  target: number
}

export function ShippingProgress({ current, target }: ShippingProgressProps) {
  const percentage = Math.min((current / target) * 100, 100)
  const remaining = Math.max(target - current, 0)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 mb-6"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-indigo-600" />
          <span className="font-semibold text-gray-900">
            {percentage === 100 ? (
              '¡Envío gratis desbloqueado! 🎉'
            ) : (
              `Te faltan ${remaining.toFixed(0)}€ para envío gratis`
            )}
          </span>
        </div>
      </div>
      
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
        />
      </div>
      
      {percentage === 100 && (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-sm text-emerald-600 font-medium mt-2 flex items-center gap-1"
        >
          <BadgeCheck className="w-4 h-4" />
          ¡Has conseguido el envío gratuito!
        </motion.p>
      )}
    </motion.div>
  )
}

// Trust Badges
export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: 'Garantía 10 años',
      description: 'Respaldo total',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Package,
      title: 'Devolución gratis',
      description: '100 noches prueba',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      icon: Award,
      title: 'Hecho en España',
      description: 'Calidad certificada',
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      icon: Lock,
      title: 'Pago seguro',
      description: 'Encriptación SSL',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ]
  
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className={`${badge.bg} rounded-xl p-3 border border-gray-100`}
        >
          <badge.icon className={`w-5 h-5 ${badge.color} mb-2`} />
          <div className="text-xs font-bold text-gray-900">{badge.title}</div>
          <div className="text-[10px] text-gray-600">{badge.description}</div>
        </motion.div>
      ))}
    </div>
  )
}

// Mini Testimonial
export function MiniTestimonial() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white border border-gray-100 rounded-xl p-4 mb-6"
    >
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-sm text-gray-700 mb-2 italic">
        "El mejor colchón que he tenido. La compra fue muy fácil y llegó en 24h."
      </p>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-sm font-bold">
          M
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-900">María G.</div>
          <div className="text-[10px] text-gray-500">Cliente verificado</div>
        </div>
      </div>
    </motion.div>
  )
}

// Urgency Banner
interface UrgencyBannerProps {
  message?: string
  type?: 'stock' | 'time' | 'discount'
}

export function UrgencyBanner({ message, type = 'stock' }: UrgencyBannerProps) {
  const config = {
    stock: {
      icon: '📦',
      color: 'from-orange-500 to-red-500',
      text: message || 'Quedan pocas unidades en stock'
    },
    time: {
      icon: '⏰',
      color: 'from-purple-500 to-pink-500',
      text: message || 'Oferta válida solo hoy'
    },
    discount: {
      icon: '🎁',
      color: 'from-emerald-500 to-teal-500',
      text: message || '10% de descuento en tu primera compra'
    }
  }
  
  const current = config[type]
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gradient-to-r ${current.color} text-white rounded-xl p-3 mb-4 text-center`}
    >
      <span className="text-sm font-semibold">
        {current.icon} {current.text}
      </span>
    </motion.div>
  )
}

// Upsell Component
interface UpsellProps {
  onAdd?: () => void
}

export function Upsell({ onAdd }: UpsellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 mb-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
          -10%
        </div>
        <span className="text-sm font-bold text-gray-900">Completa tu descanso</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">🛏️</span>
        </div>
        
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm mb-1">
            Almohada Premium Ergonómica
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-xs">89€</span>
            <span className="text-indigo-600 font-bold text-sm">80€</span>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAdd}
          className="px-4 py-2 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold text-sm hover:bg-indigo-50 transition-colors"
        >
          Añadir
        </motion.button>
      </div>
    </motion.div>
  )
}

// Checkout Steps Progress
interface CheckoutStepsProps {
  currentStep: number
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { number: 1, label: 'Carrito' },
    { number: 2, label: 'Datos' },
    { number: 3, label: 'Pago' },
    { number: 4, label: 'Confirmación' }
  ]
  
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-all ${
                  step.number <= currentStep
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.number}
              </motion.div>
              <span className={`text-xs font-medium ${
                step.number <= currentStep ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 relative">
                <div className="absolute inset-0 bg-gray-200" />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: step.number < currentStep ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 origin-left"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Empty Cart
export function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
    >
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
        <span className="text-5xl">🛒</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Tu carrito está vacío
      </h3>
      <p className="text-gray-600 mb-8">
        Explora nuestro catálogo y encuentra tu colchón perfecto
      </p>
      <Link href="/catalogo">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg"
        >
          <span>Explorar productos</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </Link>
    </motion.div>
  )
}

// Payment Methods
export function PaymentMethods({ selected, onSelect }: { selected: string; onSelect: (method: string) => void }) {
  const methods = [
    {
      id: 'card',
      name: 'Tarjeta de crédito/débito',
      icon: '💳',
      badges: ['Visa', 'Mastercard', 'Amex']
    },
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      icon: '🍎',
      badge: 'Rápido y seguro'
    },
    {
      id: 'google_pay',
      name: 'Google Pay',
      icon: 'G',
      badge: 'Pago en 1 clic'
    }
  ]
  
  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <motion.button
          key={method.id}
          type="button"
          onClick={() => onSelect(method.id)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`w-full p-4 rounded-xl border-2 transition-all ${
            selected === method.id
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{method.icon}</span>
              <div className="text-left">
                <div className="font-semibold text-gray-900">{method.name}</div>
                {method.badge && (
                  <div className="text-xs text-gray-500">{method.badge}</div>
                )}
              </div>
            </div>
            
            {selected === method.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center"
              >
                <BadgeCheck className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </div>
        </motion.button>
      ))}
    </div>
  )
}