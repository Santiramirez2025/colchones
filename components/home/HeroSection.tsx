'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, Brain, Sparkles } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { FloatingParticles } from './FloatingParticles'
import { PriceDisplay } from '../PriceDisplay'
import { HERO_PRODUCT, SOCIAL_PROOF } from '@/lib/product-data'
import { useMousePosition } from '@/lib/hooks/useMousePosition'
import { useScrollProgress } from '@/lib/hooks/useScrollProgress'

export function HeroSection() {
  const heroRef = useRef(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const mousePosition = useMousePosition(true)
  const { scrollYProgress, prefersReducedMotion } = useScrollProgress()
  
  const heroY = useTransform(scrollYProgress, [0, 0.3], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Advanced gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-zinc-950 to-zinc-950" />
      
      {/* Animated gradient orbs */}
      {!prefersReducedMotion && (
        <motion.div 
          style={{ 
            y: heroY, 
            opacity: heroOpacity,
            x: mousePosition.x * 0.02,
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <motion.div 
              animate={{ 
                x: [0, 100, -50, 0],
                y: [0, -100, 50, 0],
                scale: [1, 1.3, 0.9, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 rounded-full mix-blend-screen filter blur-[100px]"
            />
            <motion.div 
              animate={{ 
                x: [0, -120, 80, 0],
                y: [0, 120, -60, 0],
                scale: [1, 0.8, 1.4, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-0 w-[700px] h-[700px] bg-gradient-to-br from-cyan-500/30 to-blue-600/30 rounded-full mix-blend-screen filter blur-[100px]"
            />
          </div>
        </motion.div>
      )}

      {/* Floating particles */}
      <FloatingParticles />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(139,92,246,.03)_1.5px,transparent_1.5px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="text-left space-y-8">
            {/* Social proof badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3"
            >
              {SOCIAL_PROOF.badges.map((badge, i) => (
                <div 
                  key={i}
                  className={`inline-flex items-center gap-3 bg-gradient-to-r ${badge.gradient} backdrop-blur-xl border ${badge.border} px-5 py-3 rounded-2xl`}
                >
                  <badge.icon className={`w-5 h-5 ${badge.iconColor} ${badge.label.includes('4.8') ? 'fill-current' : ''}`} />
                  <span className="text-white/90 font-bold text-sm">
                    {badge.label} {badge.sublabel && `· ${badge.sublabel}`}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="space-y-4"
            >
              <h1 id="hero-heading" className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter">
                <span className="block text-white">
                  Duerme como nunca,
                </span>
                <span className="block relative">
                  <span className="relative z-10 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                    despierta renovado
                  </span>
                  {!prefersReducedMotion && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
                      className="absolute bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-violet-500/30 via-fuchsia-500/30 to-cyan-500/30 blur-xl"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </h1>
            </motion.div>

            {/* Subtitle with price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-4"
            >
              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed">
                {HERO_PRODUCT.description}
              </p>

              <PriceDisplay {...HERO_PRODUCT.price} />
              
              {/* Quick specs */}
              <div className="flex flex-wrap gap-3 pt-2">
                {HERO_PRODUCT.quickSpecs.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-xl"
                  >
                    <item.icon className="w-4 h-4 text-violet-400" aria-hidden="true" />
                    <span className="text-zinc-300 text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link 
                href="/simulador"
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-violet-500/50 transition-all duration-500 hover:scale-[1.02]"
                aria-label="Hacer test gratuito personalizado en 2 minutos"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <Brain className="w-5 h-5 relative z-10" aria-hidden="true" />
                <span className="relative z-10">Test gratuito 2 min</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>

              <Link
                href="/colchones"
                className="group inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-xl border-2 border-white/10 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                aria-label="Ver todas las ofertas de colchones"
              >
                <Sparkles className="w-5 h-5" aria-hidden="true" />
                Ver ofertas
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap items-center gap-6 pt-4 text-sm text-zinc-400"
              role="list"
              aria-label="Garantías y beneficios"
            >
              {HERO_PRODUCT.trustIndicators.map((item, i) => (
                <div key={i} className="flex items-center gap-2" role="listitem">
                  <item.icon className={`w-4 h-4 ${item.color}`} aria-hidden="true" />
                  <span className="text-zinc-300 font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-cyan-600/20 rounded-[3rem] blur-3xl" aria-hidden="true" />
              
              <div className="relative bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />
                
                {/* Product Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                  <Image 
                    src={HERO_PRODUCT.images.hero}
                    alt={`${HERO_PRODUCT.name} - Vista del colchón premium`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    quality={80}
                    placeholder="blur"
                    blurDataURL={HERO_PRODUCT.images.blurDataURL}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-zinc-900/40" />

                  {/* Floating spec badges */}
                  <motion.div
                    animate={{ y: prefersReducedMotion ? 0 : [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-4 right-4 bg-violet-500/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg"
                  >
                    <div className="flex items-center gap-2">
                      {(() => {
                        const LayersIcon = HERO_PRODUCT.specifications[0].icon
                        return <LayersIcon className="w-4 h-4 text-white" aria-hidden="true" />
                      })()}
                      <span className="text-white text-xs font-bold">32cm Premium</span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: prefersReducedMotion ? 0 : [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-4 left-4 bg-cyan-500/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg"
                  >
                    <div className="flex items-center gap-2">
                      {(() => {
                        const ZapIcon = HERO_PRODUCT.specifications[1].icon
                        return <ZapIcon className="w-4 h-4 text-white" aria-hidden="true" />
                      })()}
                      <span className="text-white text-xs font-bold">1.800 muelles</span>
                    </div>
                  </motion.div>

                  {/* Discount badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, type: "spring" }}
                    className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 rounded-xl shadow-2xl"
                  >
                    <div className="text-center">
                      <div className="text-white text-xs font-bold">OFERTA</div>
                      <div className="text-white text-lg font-black leading-tight">-{HERO_PRODUCT.price.discount}%</div>
                    </div>
                  </motion.div>
                </div>

                {/* Specifications Grid */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {HERO_PRODUCT.specifications.map((spec, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                    >
                      <spec.icon className="w-5 h-5 text-violet-400" aria-hidden="true" />
                      <span className="text-white font-bold text-sm">{spec.value}</span>
                      <span className="text-white/60 text-xs">{spec.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          aria-label="Desplázate para ver más"
        >
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-xs font-bold uppercase tracking-widest">Descubre más</span>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white/40 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}