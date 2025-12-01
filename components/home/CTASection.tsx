'use client'

import Link from 'next/link'
import { motion, useTransform, useMotionValue } from 'framer-motion'
import { Brain, ArrowRight } from 'lucide-react'
import { CTA_FEATURES } from '@/lib/product-data'
import { useState, useEffect, useMemo, memo } from 'react'
import { useMousePosition } from '@/lib/hooks/useMousePosition'
import { useScrollProgress } from '@/lib/hooks/useScrollProgress'

// Componente de feature optimizado con memo
const CTAFeature = memo(({ item, index }: { item: any, index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
    className="flex items-center gap-2.5 sm:gap-3 bg-white/10 backdrop-blur-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300"
  >
    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" aria-hidden="true" />
    <span className="font-bold text-base sm:text-lg whitespace-nowrap">{item.text}</span>
  </motion.div>
))
CTAFeature.displayName = 'CTAFeature'

export function CTASection() {
  const [isMobile, setIsMobile] = useState(false)
  const mousePosition = useMousePosition(!isMobile)
  const { prefersReducedMotion } = useScrollProgress()

  // Detectar móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Simplificar efectos en móvil
  const shouldAnimate = !prefersReducedMotion && !isMobile

  // Memoizar features
  const ctaFeatures = useMemo(() => 
    CTA_FEATURES.map((item, i) => (
      <CTAFeature key={i} item={item} index={i} />
    )),
    []
  )

  return (
    <section 
      className="relative py-20 sm:py-32 lg:py-40 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background base - colores Azul Colchones */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600" />
      
      {/* Orbes animados - simplificados en móvil */}
      {shouldAnimate && (
        <motion.div 
          style={{ 
            x: mousePosition.x * 0.015,
            y: mousePosition.y * 0.015,
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 opacity-40">
            <motion.div
              animate={{ 
                scale: [1, 1.4, 1],
                x: [0, 150, 0],
                y: [0, -80, 0],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-gradient-to-br from-blue-400/40 to-cyan-500/40 rounded-full mix-blend-screen filter blur-[80px] sm:blur-[120px]"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, -100, 0],
                y: [0, 100, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 right-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-gradient-to-br from-indigo-400/40 to-purple-500/40 rounded-full mix-blend-screen filter blur-[80px] sm:blur-[120px]"
            />
          </div>
        </motion.div>
      )}

      {/* Grid pattern - más sutil en móvil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,.03)_1.5px,transparent_1.5px)] sm:bg-[linear-gradient(rgba(255,255,255,.05)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,.05)_1.5px,transparent_1.5px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />

      <div className="relative container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 sm:space-y-8 lg:space-y-10"
        >
          {/* Título principal */}
          <div className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h2 id="cta-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                Creamos un Test
                <br />
                <span className="relative inline-block">
                Para elegir tu colchón. 
                  {shouldAnimate && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="absolute bottom-1 sm:bottom-2 left-0 right-0 h-2 sm:h-3 bg-white/30 blur-xl"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </h2>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 max-w-3xl mx-auto leading-relaxed font-semibold px-4"
            >
              Descubrí en 2 minutos qué colchón se adapta perfectamente a vos
            </motion.p>

            {/* Badge Villa María */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30">
                <span className="text-2xl" role="img" aria-label="Argentina">🇦🇷</span>
                <span className="text-white font-bold text-sm sm:text-base">
                  Envío GRATIS en Villa María · 35+ años de experiencia
                </span>
              </div>
            </motion.div>
          </div>

          {/* CTA Button principal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6, type: "spring", bounce: 0.4 }}
            className="pt-2 sm:pt-4"
          >
            <Link
              href="/simulador"
              prefetch={true}
              className="group relative inline-flex items-center gap-3 sm:gap-4 bg-white text-blue-600 px-8 sm:px-10 lg:px-12 py-5 sm:py-6 lg:py-7 rounded-2xl sm:rounded-3xl font-black text-lg sm:text-xl lg:text-2xl shadow-2xl hover:shadow-white/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Hacer test de colchón personalizado ahora"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl" />
              <Brain className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="relative z-10">Hacer test ahora</span>
              <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* WhatsApp alternativo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex justify-center"
          >
            <Link
              href="https://wa.me/5493531234567?text=Hola!%20Quiero%20saber%20más%20sobre%20colchones"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold text-sm sm:text-base transition-all"
            >
              <span>O hablá con nosotros por WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Features list - mejor responsive */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-6 pt-6 sm:pt-8 text-white/95 px-4">
            {ctaFeatures}
          </div>
        </motion.div>
      </div>

      {/* Efectos de brillo en las esquinas */}
      <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-tl from-blue-400/20 to-transparent rounded-full blur-[100px] pointer-events-none" />
    </section>
  )
}