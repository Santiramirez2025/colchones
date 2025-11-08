// app/producto/[slug]/components/TrustBadges.tsx
'use client'

import { memo } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Shield, Truck, Award, Star, CheckCircle2, Clock, 
  ThumbsUp, Lock, Package, Zap, Heart, BadgeCheck,
  TrendingUp, Globe
} from 'lucide-react'

interface TrustBadgesProps {
  hasCertifications?: boolean
  hasWarranty?: boolean
  hasFreeShipping?: boolean
  hasReviews?: boolean
  isHighRated?: boolean
  warranty?: number
  reviewCount?: number
  rating?: number
}

// Badge individual optimizado con memo
const TrustBadge = memo(({ 
  badge, 
  index 
}: { 
  badge: any
  index: number
}) => {
  const Icon = badge.icon
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.5,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1]
        }
      } : {}}
      whileHover={{ 
        scale: 1.05,
        y: -8,
        transition: { 
          type: 'spring', 
          stiffness: 400, 
          damping: 15 
        }
      }}
      className="group relative"
    >
      {/* Card container */}
      <div className="relative bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl rounded-2xl p-5 md:p-6 border-2 border-white/5 group-hover:border-white/20 transition-all duration-300 overflow-hidden h-full">
        
        {/* Animated gradient background */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${badge.gradient} opacity-0 group-hover:opacity-[0.15]`}
          transition={{ duration: 0.4 }}
        />
        
        {/* Glow effect on hover */}
        <motion.div
          className={`absolute -inset-[1px] bg-gradient-to-br ${badge.gradient} opacity-0 group-hover:opacity-20 blur-xl -z-10 rounded-2xl`}
          transition={{ duration: 0.4 }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-3">
          {/* Icon container con pulse */}
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${badge.gradient} p-3 shadow-lg group-hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden`}>
              <Icon className="w-full h-full text-white relative z-10" />
              
              {/* Pulse ring animation */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1.5],
                  opacity: [0.5, 0, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${badge.gradient}`}
              />
            </div>

            {/* Badge indicator (opcional para destacados) */}
            {badge.featured && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.08 + 0.3, type: 'spring' }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Zap className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.div>
          
          {/* Text content */}
          <div className="space-y-1.5">
            <h3 className="font-black text-white text-sm md:text-base leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-zinc-300 transition-all duration-300">
              {badge.title}
            </h3>
            <p className="text-zinc-400 text-xs md:text-sm leading-tight font-medium group-hover:text-zinc-300 transition-colors">
              {badge.description}
            </p>
          </div>

          {/* Extra info badge (si existe) */}
          {badge.extraInfo && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.08 + 0.4 }}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full"
            >
              <span className="text-[10px] font-bold text-zinc-400">
                {badge.extraInfo}
              </span>
            </motion.div>
          )}
        </div>

        {/* Shine effect diagonal */}
        <motion.div
          initial={{ x: '-100%', y: '-100%' }}
          whileHover={{ x: '100%', y: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent pointer-events-none"
          style={{ width: '50%', height: '200%' }}
        />
      </div>
    </motion.div>
  )
})
TrustBadge.displayName = 'TrustBadge'

export default function TrustBadges({
  hasCertifications = false,
  hasWarranty = false,
  hasFreeShipping = true,
  hasReviews = false,
  isHighRated = false,
  warranty = 0,
  reviewCount = 0,
  rating = 0
}: TrustBadgesProps) {
  
  const badges = [
    {
      show: hasFreeShipping,
      icon: Truck,
      title: 'Envío Gratis',
      description: 'En pedidos +50€',
      gradient: 'from-blue-500 to-cyan-500',
      featured: true,
      extraInfo: '24-48h'
    },
    {
      show: hasWarranty && warranty > 0,
      icon: Shield,
      title: `${warranty} Años Garantía`,
      description: 'Protección total',
      gradient: 'from-emerald-500 to-green-500',
      featured: true
    },
    {
      show: hasCertifications,
      icon: Award,
      title: 'Certificado Premium',
      description: 'Calidad garantizada',
      gradient: 'from-violet-500 to-purple-500',
      extraInfo: 'ISO 9001'
    },
    {
      show: hasReviews && reviewCount > 0,
      icon: ThumbsUp,
      title: `${reviewCount}+ Opiniones`,
      description: isHighRated ? '⭐ Altamente valorado' : 'Verificadas',
      gradient: 'from-amber-500 to-orange-500',
      featured: isHighRated
    },
    {
      show: isHighRated && rating >= 4.5,
      icon: Star,
      title: `${rating}/5 Estrellas`,
      description: 'Excelente calidad',
      gradient: 'from-yellow-500 to-amber-500',
      featured: true
    },
    {
      show: true,
      icon: Lock,
      title: 'Pago 100% Seguro',
      description: 'SSL Encriptado',
      gradient: 'from-indigo-500 to-blue-500',
      extraInfo: 'Stripe'
    },
    {
      show: true,
      icon: Clock,
      title: '100 Noches Prueba',
      description: 'Devolución fácil',
      gradient: 'from-teal-500 to-emerald-500',
      featured: true
    },
    {
      show: true,
      icon: Package,
      title: 'Entrega Cuidada',
      description: 'Tracking en tiempo real',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      show: true,
      icon: BadgeCheck,
      title: 'Producto Original',
      description: '100% Auténtico',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      show: true,
      icon: Heart,
      title: 'Atención Premium',
      description: 'Soporte 24/7',
      gradient: 'from-red-500 to-pink-500'
    }
  ].filter(badge => badge.show)

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section 
      ref={sectionRef}
      className="relative border-y border-white/10 py-16 md:py-24 overflow-hidden"
      aria-label="Insignias de confianza y garantías"
    >
      {/* Background gradient animado */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent pointer-events-none" />
      
      {/* Decorative elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.06, 0.03]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-full"
          >
            <CheckCircle2 className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-bold text-violet-400">Compra Protegida</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Compra con Total
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
              Confianza
            </span>
          </h2>

          <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Protección total en cada compra. Calidad garantizada y servicio premium.
          </p>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {badges.map((badge, index) => (
            <TrustBadge key={index} badge={badge} index={index} />
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '50K+', label: 'Clientes Felices', icon: ThumbsUp },
            { value: '98%', label: 'Satisfacción', icon: TrendingUp },
            { value: '24/7', label: 'Soporte', icon: Clock },
            { value: '100%', label: 'Seguro', icon: Shield }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all text-center overflow-hidden">
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 space-y-2">
                  <stat.icon className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                  <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-zinc-400 font-semibold">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-full">
            <Globe className="w-4 h-4 text-violet-400" />
            <p className="text-zinc-400 text-sm font-medium">
              Certificaciones internacionales • Cumplimiento normativo EU
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}