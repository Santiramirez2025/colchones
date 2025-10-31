  'use client'

  import Link from 'next/link'
  import Image from 'next/image'
  import { motion, useTransform, AnimatePresence } from 'framer-motion'
  import { ArrowRight, Brain, Sparkles, Star, ChevronLeft, ChevronRight } from 'lucide-react'
  import { useRef, useState, useEffect } from 'react'
  import { FloatingParticles } from './FloatingParticles'
  import { HERO_PRODUCT } from '@/lib/product-data'
  import { useMousePosition } from '@/lib/hooks/useMousePosition'
  import { useScrollProgress } from '@/lib/hooks/useScrollProgress'

  // Imágenes del carousel con contexto profesional
  const CAROUSEL_IMAGES = [
    {
      url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      alt: 'Colchón Premium Multisac® en dormitorio moderno',
      label: 'En tu dormitorio',
      description: 'Diseñado para tu espacio',
      category: 'lifestyle'
    },
    {
      url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
      alt: 'Detalle de tela premium del colchón Multisac®',
      label: 'Materiales premium',
      description: '7 capas certificadas',
      category: 'detail'
    },
    {
      url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80',
      alt: 'Colchón Premium Multisac® en suite elegante',
      label: 'Confort superior',
      description: 'Calidad que se ve y se siente',
      category: 'lifestyle'
    }
  ]

  export function HeroSection() {
    const heroRef = useRef(null)
    const [showScrollIndicator, setShowScrollIndicator] = useState(true)
    const [currentImage, setCurrentImage] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    
    const mousePosition = useMousePosition(true)
    const { scrollYProgress, prefersReducedMotion } = useScrollProgress()
    
    const heroY = useTransform(scrollYProgress, [0, 0.3], ['0%', '30%'])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

    // Auto-play del carousel cada 2 segundos
    useEffect(() => {
      if (!isAutoPlaying) return

      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
      }, 2000)

      return () => clearInterval(interval)
    }, [isAutoPlaying])

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setShowScrollIndicator(false)
        }
      }
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const goToNext = () => {
      setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
      setIsAutoPlaying(false)
    }

    const goToPrev = () => {
      setCurrentImage((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length)
      setIsAutoPlaying(false)
    }

    const goToSlide = (index: number) => {
      setCurrentImage(index)
      setIsAutoPlaying(false)
    }

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
              
              {/* Social proof badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-xl border border-amber-500/20 px-4 py-2.5 rounded-full"
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
                <span className="text-white/90 font-bold text-sm">
                  +15.000 personas duermen mejor
                </span>
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
                      despierta invencible
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

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-6"
              >
                <p className="text-2xl md:text-3xl text-zinc-300 leading-relaxed font-light">
                  Tu cuerpo se adapta al colchón.<br />
                  <span className="text-white font-medium">Nosotros lo hacemos al revés.</span>
                </p>

                {/* Precio */}
                <div className="flex items-center gap-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-6xl md:text-7xl font-black text-white tracking-tight">449€</span>
                    <div className="flex flex-col">
                      <span className="text-xl text-zinc-500 line-through">799€</span>
                      <span className="text-sm font-bold text-amber-400">-44% HOY</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <Link 
                  href="/simulador"
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white px-10 py-6 rounded-2xl font-bold text-xl shadow-2xl shadow-violet-500/50 transition-all duration-500 hover:scale-[1.02]"
                  aria-label="Hacer test gratuito personalizado en 2 minutos"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <Brain className="w-6 h-6 relative z-10" aria-hidden="true" />
                  <span className="relative z-10">Test gratuito · 2 min</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>

                <Link
                  href="/catalogo"
                  className="group inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-xl border-2 border-white/10 text-white px-10 py-6 rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  aria-label="Ver colección premium de colchones"
                >
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                  Ver colección
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-6 pt-4 text-sm text-zinc-400 border-t border-white/5"
              >
                <span className="text-zinc-300">✓ Muelles Entresacados</span>
                <span className="text-zinc-300">✓ Envío gratis</span>
                <span className="text-zinc-300">✓ Hecho en España</span>
              </motion.div>
            </div>

            {/* Right Column - Product Image Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="relative"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-8 bg-gradient-to-r from-violet-600/30 via-fuchsia-600/30 to-cyan-600/30 rounded-[3rem] blur-[80px] opacity-60" aria-hidden="true" />
                
                {/* Rim light effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 via-transparent to-violet-500/20 rounded-[3rem] blur-2xl" aria-hidden="true" />
                
                <div className="relative bg-gradient-to-br from-zinc-900/95 to-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />
                  
                  {/* Light strips effect */}
                  <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-violet-400/20 to-transparent" aria-hidden="true" />
                  <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" aria-hidden="true" />
                  
                  {/* Product Image Carousel */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
                    {/* Carousel Images with AnimatePresence */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image 
                          src={CAROUSEL_IMAGES[currentImage].url}
                          alt={CAROUSEL_IMAGES[currentImage].alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={currentImage === 0}
                          quality={90}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-900/20 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-cyan-900/10 pointer-events-none" />

                    {/* Navigation Arrows - Desktop only */}
                    <button
                      onClick={goToPrev}
                      className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-zinc-900/90 hover:bg-zinc-800/90 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hover:scale-110 z-20"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-zinc-900/90 hover:bg-zinc-800/90 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hover:scale-110 z-20"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dots Navigation */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                      {CAROUSEL_IMAGES.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            currentImage === index
                              ? 'bg-white w-8'
                              : 'bg-white/40 hover:bg-white/60 w-1.5'
                          }`}
                          aria-label={`Ir a imagen ${index + 1}`}
                        />
                      ))}
                    </div>

                    {/* Floating spec badges */}
                    <motion.div
                      animate={{ y: prefersReducedMotion ? 0 : [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-4 right-4 bg-gradient-to-r from-violet-600/95 to-fuchsia-600/95 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-2xl border border-white/10 z-10"
                    >
                      <span className="text-white text-sm font-bold">32cm · 7 capas</span>
                    </motion.div>

                    <motion.div
                      animate={{ y: prefersReducedMotion ? 0 : [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      className="absolute bottom-16 left-4 bg-gradient-to-r from-cyan-600/95 to-blue-600/95 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-2xl border border-white/10 z-10"
                    >
                      <span className="text-white text-sm font-bold">1.800 muelles</span>
                    </motion.div>

                    {/* Discount badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 1.2, type: "spring", bounce: 0.5 }}
                      className="absolute top-4 left-4 bg-gradient-to-br from-amber-500 to-orange-600 px-4 py-2.5 rounded-xl shadow-2xl border-2 border-amber-300/30 z-10"
                    >
                      <div className="text-center">
                        <div className="text-white text-xs font-bold uppercase tracking-wide">Oferta</div>
                        <div className="text-white text-xl font-black leading-tight">-44%</div>
                      </div>
                    </motion.div>

                    {/* Particle effect overlay */}
                    {!prefersReducedMotion && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                              opacity: [0, 0.6, 0],
                              y: [20, -100],
                              x: [0, Math.random() * 40 - 20]
                            }}
                            transition={{
                              duration: 3 + Math.random() * 2,
                              repeat: Infinity,
                              delay: i * 0.8,
                              ease: "easeOut"
                            }}
                            className="absolute bottom-0 left-1/2 w-1 h-1 bg-white/40 rounded-full blur-sm"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Specifications Grid */}
                  <div className="mt-6 grid grid-cols-4 gap-2">
                    {HERO_PRODUCT.specifications.map((spec, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.05 }}
                        className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300"
                      >
                        <spec.icon className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors" aria-hidden="true" />
                        <span className="text-white font-bold text-xs">{spec.value}</span>
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
              <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5 bg-white/5 backdrop-blur-sm">
                <motion.div 
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-gradient-to-b from-violet-400 to-fuchsia-400 rounded-full shadow-lg shadow-violet-500/50"
                />
              </div>
            </div>
          </motion.div>
        )}
      </section>
    )
  }