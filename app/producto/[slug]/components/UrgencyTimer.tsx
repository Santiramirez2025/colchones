// app/producto/[slug]/components/UrgencyTimer.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Flame, Zap } from 'lucide-react'

interface UrgencyTimerProps {
  type?: 'flash-sale' | 'limited-time' | 'low-stock'
  endTime?: Date
  stockCount?: number
  className?: string
}

export default function UrgencyTimer({
  type = 'limited-time',
  endTime,
  stockCount,
  className = ''
}: UrgencyTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (!endTime && type !== 'low-stock') {
      // Default: 6 hours from now if no endTime provided
      const defaultEnd = new Date()
      defaultEnd.setHours(defaultEnd.getHours() + 6)
      endTime = defaultEnd
    }

    const calculateTimeLeft = () => {
      if (!endTime || type === 'low-stock') return

      const now = new Date().getTime()
      const end = new Date(endTime).getTime()
      const difference = end - now

      if (difference <= 0) {
        setIsExpired(true)
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ hours, minutes, seconds })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endTime, type])

  if (isExpired && type !== 'low-stock') return null

  const config = {
    'flash-sale': {
      icon: Flame,
      gradient: 'from-red-600 to-orange-600',
      borderColor: 'border-red-500/30',
      bgColor: 'bg-red-600/10',
      title: '⚡ Oferta Flash',
      subtitle: 'Termina en:'
    },
    'limited-time': {
      icon: Clock,
      gradient: 'from-orange-600 to-amber-600',
      borderColor: 'border-orange-500/30',
      bgColor: 'bg-orange-600/10',
      title: '⏰ Oferta por tiempo limitado',
      subtitle: 'Termina en:'
    },
    'low-stock': {
      icon: Zap,
      gradient: 'from-yellow-600 to-orange-600',
      borderColor: 'border-yellow-500/30',
      bgColor: 'bg-yellow-600/10',
      title: '🔥 ¡Últimas unidades!',
      subtitle: stockCount ? `Solo ${stockCount} disponibles` : 'Stock limitado'
    }
  }

  const { icon: Icon, gradient, borderColor, bgColor, title, subtitle } = config[type]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        className={`relative overflow-hidden rounded-2xl border ${borderColor} ${bgColor} backdrop-blur-sm ${className}`}
      >
        {/* Animated background pulse */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-20 blur-xl`}
        />

        <div className="relative z-10 px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Icon with pulse animation */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${gradient} p-2 md:p-2.5 shadow-lg flex items-center justify-center`}
            >
              <Icon className="w-full h-full text-white" />
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-sm md:text-base leading-tight">
                {title}
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm mt-0.5">
                {subtitle}
              </p>
            </div>

            {/* Timer (only for time-based types) */}
            {type !== 'low-stock' && !isExpired && (
              <div className="flex items-center gap-1.5 md:gap-2">
                <TimeUnit value={timeLeft.hours} label="h" />
                <span className="text-white font-bold text-xs md:text-sm">:</span>
                <TimeUnit value={timeLeft.minutes} label="m" />
                <span className="text-white font-bold text-xs md:text-sm">:</span>
                <TimeUnit value={timeLeft.seconds} label="s" />
              </div>
            )}
          </div>
        </div>

        {/* Animated border shimmer */}
        <motion.div
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
      </motion.div>
    </AnimatePresence>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center bg-zinc-900/80 rounded-lg px-2 py-1 md:px-2.5 md:py-1.5 min-w-[2.5rem] md:min-w-[3rem] border border-white/10">
      <motion.span
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-bold text-white text-sm md:text-base leading-none"
      >
        {String(value).padStart(2, '0')}
      </motion.span>
      <span className="text-[10px] text-zinc-500 uppercase leading-none mt-0.5">
        {label}
      </span>
    </div>
  )
}