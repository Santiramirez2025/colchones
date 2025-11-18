// app/producto/[slug]/components/SocialProof.tsx
'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, ShoppingBag, Users, TrendingUp, MapPin, Clock, 
  Flame, Star, Package, Zap, AlertCircle, CheckCircle2
} from 'lucide-react'

interface SocialProofProps {
  productId: string
  productName: string
  viewCount?: number
  recentPurchases?: number
  stockQuantity?: number
  className?: string
}

interface Notification {
  id: string
  type: 'view' | 'purchase' | 'trending' | 'stock' | 'delivery'
  message: string
  location?: string
  timestamp: Date
  priority: 'low' | 'medium' | 'high'
}

// Componente de badge de stats optimizado
const StatBadge = memo(({ 
  icon: Icon, 
  count, 
  label, 
  gradient,
  pulseColor 
}: { 
  icon: any
  count: number
  label: string
  gradient: string
  pulseColor: string
}) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.05, y: -2 }}
    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r ${gradient} backdrop-blur-xl border shadow-lg group overflow-hidden`}
  >
    {/* Animated background pulse */}
    <motion.div
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute inset-0 bg-gradient-to-r ${pulseColor}`}
    />
    
    <div className="relative z-10 flex items-center gap-2">
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="text-sm font-bold whitespace-nowrap">
        {count} <span className="font-medium opacity-90">{label}</span>
      </span>
    </div>
  </motion.div>
))
StatBadge.displayName = 'StatBadge'

// Componente de notificación flotante
const FloatingNotification = memo(({ 
  notification, 
  onClose 
}: { 
  notification: Notification
  onClose: () => void
}) => {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - 2))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'view': return Eye
      case 'purchase': return ShoppingBag
      case 'trending': return Flame
      case 'stock': return Package
      case 'delivery': return Zap
      default: return Users
    }
  }

  const getGradient = (type: Notification['type']) => {
    switch (type) {
      case 'view': return 'from-blue-500 to-cyan-500'
      case 'purchase': return 'from-emerald-500 to-green-500'
      case 'trending': return 'from-orange-500 to-red-500'
      case 'stock': return 'from-amber-500 to-yellow-500'
      case 'delivery': return 'from-violet-500 to-fuchsia-500'
      default: return 'from-purple-500 to-pink-500'
    }
  }

  const getBgGradient = (type: Notification['type']) => {
    switch (type) {
      case 'view': return 'from-blue-600/20 to-cyan-600/10'
      case 'purchase': return 'from-emerald-600/20 to-green-600/10'
      case 'trending': return 'from-orange-600/20 to-red-600/10'
      case 'stock': return 'from-amber-600/20 to-yellow-600/10'
      case 'delivery': return 'from-violet-600/20 to-fuchsia-600/10'
      default: return 'from-purple-600/20 to-pink-600/10'
    }
  }

  const Icon = getIcon(notification.type)
  const gradient = getGradient(notification.type)
  const bgGradient = getBgGradient(notification.type)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="relative group"
    >
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${bgGradient} backdrop-blur-2xl border border-white/20 shadow-2xl`}>
        {/* Shimmer effect */}
        <motion.div
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <div className="relative z-10 p-4 flex items-start gap-3">
          {/* Icon con animación */}
          <motion.div
            animate={{
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} p-2.5 shadow-xl`}
          >
            <Icon className="w-full h-full text-white" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm leading-tight mb-1.5">
              {notification.message}
            </p>
            
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {notification.location && (
                <div className="flex items-center gap-1 text-zinc-300">
                  <MapPin className="w-3 h-3" />
                  <span>{notification.location}</span>
                </div>
              )}

              <div className="flex items-center gap-1 text-zinc-400">
                <Clock className="w-3 h-3" />
                <span>Ahora mismo</span>
              </div>
            </div>

            {/* Priority badge */}
            {notification.priority === 'high' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-lg"
              >
                <AlertCircle className="w-3 h-3 text-red-400" />
                <span className="text-red-400 font-bold text-[10px]">URGENTE</span>
              </motion.div>
            )}
          </div>

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="flex-shrink-0 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Cerrar notificación"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        {/* Progress bar */}
        <motion.div
          style={{ width: `${progress}%` }}
          className={`h-1 bg-gradient-to-r ${gradient}`}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.div>
  )
})
FloatingNotification.displayName = 'FloatingNotification'

export default function SocialProof({
  productId,
  productName,
  viewCount = 0,
  recentPurchases = 0,
  stockQuantity = 0,
  className = ''
}: SocialProofProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showStats, setShowStats] = useState(true)

  const locations = [
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao',
    'Málaga', 'Zaragoza', 'Murcia', 'Palma', 'Las Palmas',
    'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón'
  ]

  const generateNotification = useCallback((): Notification => {
    const types: Notification['type'][] = ['view', 'purchase', 'trending', 'stock', 'delivery']
    const type = types[Math.floor(Math.random() * types.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    
    const messageTemplates = {
      view: [
        `${Math.floor(Math.random() * 3) + 1} personas de ${location} viendo esto`,
        `👀 Alguien de ${location} acaba de ver este producto`,
        `+${Math.floor(Math.random() * 8) + 3} vistas en los últimos 5 minutos`
      ],
      purchase: [
        `✅ Compra confirmada en ${location}`,
        `🛍️ Alguien de ${location} acaba de comprar este producto`,
        `Nueva venta - Solo quedan ${stockQuantity} unidades`,
        `${Math.floor(Math.random() * 2) + 1} personas compraron esto en la última hora`
      ],
      trending: [
        `🔥 Tendencia #1 en ${location}`,
        `📈 +${Math.floor(Math.random() * 40) + 30}% más ventas esta semana`,
        `⭐ Producto más popular en tu zona`,
        `🏆 Top ventas del mes`
      ],
      stock: [
        `⚠️ Solo quedan ${stockQuantity} unidades disponibles`,
        `📦 Stock limitado - ${stockQuantity} unidades restantes`,
        `Última reposición hace ${Math.floor(Math.random() * 24) + 1} horas`,
        `Alta demanda - Stock bajo`
      ],
      delivery: [
        `⚡ Envío disponible para ${location}`,
        `🚚 Entrega en 24-48h para tu zona`,
        `Última entrega en ${location} hace ${Math.floor(Math.random() * 60) + 10} minutos`,
        `✨ Envío gratis disponible`
      ]
    }

    const typeMessages = messageTemplates[type]
    const message = typeMessages[Math.floor(Math.random() * typeMessages.length)]
    
    // Determinar prioridad basada en tipo y stock
    let priority: 'low' | 'medium' | 'high' = 'low'
    if (type === 'stock' && stockQuantity < 5) priority = 'high'
    else if (type === 'purchase' || type === 'trending') priority = 'medium'

    return {
      id: `${Date.now()}-${Math.random()}`,
      type,
      message,
      location: type !== 'trending' && type !== 'stock' ? location : undefined,
      timestamp: new Date(),
      priority
    }
  }, [stockQuantity, locations])

  useEffect(() => {
    const showNotification = () => {
      const notification = generateNotification()
      
      setNotifications(prev => {
        // Máximo 3 notificaciones simultáneas
        const updated = [notification, ...prev].slice(0, 3)
        return updated
      })

      // Auto-remove después de 6 segundos
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id))
      }, 6000)
    }

    // Primera notificación después de 2 segundos
    const initialTimer = setTimeout(showNotification, 2000)

    // Notificaciones recurrentes cada 6-12 segundos
    const recurringTimer = setInterval(() => {
      showNotification()
    }, Math.random() * 6000 + 6000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(recurringTimer)
    }
  }, [productId, generateNotification])

  const handleCloseNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  return (
    <>
      {/* Stats Bar Superior */}
      <AnimatePresence>
        {showStats && (viewCount > 0 || recentPurchases > 0 || stockQuantity > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-6 ${className}`}
          >
            {viewCount > 0 && (
              <StatBadge
                icon={Eye}
                count={viewCount}
                label="viendo ahora"
                gradient="from-blue-500/20 to-cyan-500/10"
                pulseColor="from-blue-500/30 to-cyan-500/20"
              />
            )}

            {recentPurchases > 0 && (
              <StatBadge
                icon={ShoppingBag}
                count={recentPurchases}
                label="vendidos hoy"
                gradient="from-emerald-500/20 to-green-500/10"
                pulseColor="from-emerald-500/30 to-green-500/20"
              />
            )}

            {stockQuantity > 0 && stockQuantity < 10 && (
              <StatBadge
                icon={Package}
                count={stockQuantity}
                label="quedan"
                gradient="from-amber-500/20 to-yellow-500/10"
                pulseColor="from-amber-500/30 to-yellow-500/20"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notificaciones Flotantes Stack */}
      <div className="fixed bottom-4 left-4 z-50 max-w-[calc(100vw-2rem)] sm:max-w-sm space-y-3">
        <AnimatePresence mode="popLayout">
          {notifications.map((notification) => (
            <FloatingNotification
              key={notification.id}
              notification={notification}
              onClose={() => handleCloseNotification(notification.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Live Activity Indicator (Desktop) */}
      {viewCount > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed top-24 right-4 z-40 hidden lg:block"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(34, 197, 94, 0.2)',
                '0 0 30px rgba(34, 197, 94, 0.4)',
                '0 0 20px rgba(34, 197, 94, 0.2)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600/20 to-green-600/10 border border-emerald-500/30 backdrop-blur-xl"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-lg shadow-emerald-500/50" />
            </span>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-bold">{viewCount}</span>
              <span className="text-emerald-300 text-xs font-medium">en vivo</span>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Trust Badge Flotante (Mobile) */}
      {recentPurchases > 5 && (
        <motion.div
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 1, type: 'spring' }}
          className="fixed bottom-20 right-4 z-40 lg:hidden"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-violet-600/30 to-fuchsia-600/20 border border-violet-500/40 backdrop-blur-xl shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-violet-400" />
            <span className="text-violet-300 text-xs font-bold">Popular</span>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}