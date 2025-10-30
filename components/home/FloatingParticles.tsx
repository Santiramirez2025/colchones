'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ANIMATION_CONFIG } from '@/lib/constants'

export function FloatingParticles() {
  const prefersReducedMotion = useReducedMotion()
  
  // No mostrar partículas si el usuario prefiere movimiento reducido
  if (prefersReducedMotion) return null
  
  // Reducido de 12 a 6 partículas
  const particles = Array.from({ length: ANIMATION_CONFIG.particles.count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: ANIMATION_CONFIG.particles.minDuration + Math.random() * ANIMATION_CONFIG.particles.maxDuration
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-white/10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}