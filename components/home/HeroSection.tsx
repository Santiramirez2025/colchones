'use client'

import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { motion, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Brain, Sparkles, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect, useMemo, memo } from 'react'
import { FloatingParticles } from './FloatingParticles'
import { HERO_PRODUCT } from '@/lib/product-data'
import { useMousePosition } from '@/lib/hooks/useMousePosition'
import { useScrollProgress } from '@/lib/hooks/useScrollProgress'

// Imágenes del carousel optimizadas con placeholders
const CAROUSEL_IMAGES = [
  {
    url: '/images/colchon1.jpg',
    alt: 'Colchón Multisac® Premium - Vista detallada del acabado de alta calidad con tela transpirable',
    label: 'Acabado Premium',
    description: 'Tela transpirable de alta calidad',
    category: 'detail',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
  },
  {
    url: '/images/colchon2.jpg',
    alt: 'Tecnología de muelles ensacados independientes del colchón Multisac® - 275 muelles por metro cuadrado',
    label: 'Muelles Ensacados',
    description: '275 muelles/m² independientes',
    category: 'technology',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
  },
  {
    url: '/images/colchon3.jpg',
    alt: 'Colchón Multisac® en dormitorio moderno - Confort total diseñado para tu mejor descanso',
    label: 'Confort Total',
    description: 'Diseñado para tu descanso',
    category: 'lifestyle',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
  }
]
// Datos estructurados JSON-LD para SEO
const productStructuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Colchón Multisac® Premium",
  "image": CAROUSEL_IMAGES.map(img => img.url),
  "description": "Colchón premium con 1800 muelles ensacados independientes, 32cm de altura y 7 capas de confort. Fabricado en España con la mejor tecnología de descanso.",
  "brand": {
    "@type": "Brand",
    "name": "Multisac"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://tudominio.com/producto/colchon-multisac",
    "priceCurrency": "EUR",
    "price": "449",
    "priceValidUntil": "2025-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Multisac"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "15000"
  }
}

// Componente de badge optimizado con memo
const SpecBadge = memo(({ spec, index }: { spec: any, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1 + index * 0.05 }}
    className="group relative flex flex-col items-center gap-1.5 md:gap-2 p-3 md:p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:from-violet-500/20 hover:to-fuchsia-500/20 hover:border-violet-400/50 transition-all duration-300 backdrop-blur-sm hover:scale-105"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-fuchsia-600/0 group-hover:from-violet-600/10 group-hover:to-fuchsia-600/10 rounded-xl transition-all duration-300" />
    <spec.icon className="w-5 h-5 md:w-6 md:h-6 text-violet-400 group-hover:text-violet-300 transition-all duration-300 group-hover:scale-110 relative z-10" aria-hidden="true" />
    <span className="text-white font-bold text-xs md:text-xs text-center relative z-10">{spec.value}</span>
  </motion.div>
))
SpecBadge.displayName = 'SpecBadge'

// Componente de partículas flotantes optimizado
const FloatingBadge = memo(({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <motion.div
      animate={{ y: prefersReducedMotion ? 0 : [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
})
FloatingBadge.displayName = 'FloatingBadge'

export function HeroSection() {
  const heroRef = useRef(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([false, false, false])
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  
  const mousePosition = useMousePosition(!isMobile)
  const { scrollYProgress, prefersReducedMotion } = useScrollProgress()
  
  const heroY = useTransform(scrollYProgress, [0, 0.3], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Detectar móvil y reducir animaciones
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-play optimizado: 4 segundos con transición más suave
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Precargar siguiente imagen
  useEffect(() => {
    const nextIndex = (currentImage + 1) % CAROUSEL_IMAGES.length
    const img = new window.Image()
    img.src = CAROUSEL_IMAGES[nextIndex].url
  }, [currentImage])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prefetch de rutas críticas
  useEffect(() => {
    const prefetchLinks = () => {
      const links = ['/simulador', '/catalogo']
      links.forEach(href => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = href
        document.head.appendChild(link)
      })
    }
    
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(prefetchLinks)
    } else {
      setTimeout(prefetchLinks, 2000)
    }
  }, [])

  // Manejo de swipe táctil
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    }
    if (isRightSwipe) {
      goToPrev()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

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

  // Simplificar efectos en móvil
  const shouldAnimate = !prefersReducedMotion && !isMobile

  // Memoizar especificaciones
  const specBadges = useMemo(() => 
    HERO_PRODUCT.specifications.map((spec, i) => (
      <SpecBadge key={i} spec={spec} index={i} />
    )),
    []
  )

  return (
    <>
      <Head>
        <title>Colchón Multisac® Premium - Dormir bien es vivir mejor | -44% HOY</title>
        <meta name="description" content="Colchón premium con 1800 muelles ensacados independientes. Envío gratis, fabricado en España. Test gratuito en 2 minutos. Ahorra 44% hoy: 449€ (antes 799€)." />
        <meta name="keywords" content="colchón premium, muelles ensacados, colchón España, descanso, Multisac" />
        <link rel="canonical" href="https://tudominio.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Colchón Multisac® Premium - Dormir bien es vivir mejor" />
        <meta property="og:description" content="1800 muelles ensacados, 32cm de altura, 7 capas. -44% HOY: 449€" />
        <meta property="og:image" content={CAROUSEL_IMAGES[0].url} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://tudominio.com/" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Colchón Multisac® Premium - -44% HOY" />
        <meta name="twitter:description" content="1800 muelles ensacados, envío gratis, fabricado en España" />
        <meta name="twitter:image" content={CAROUSEL_IMAGES[0].url} />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
        />
      </Head>

      <section 
        ref={heroRef} 
        className="relative min-h-screen flex items-center overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Background optimizado para móvil */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-zinc-950 to-zinc-950" />
        
        {/* Orbes animados - simplificados en móvil */}
        {shouldAnimate && (
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
                className="absolute top-0 left-0 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-gradient-to-br from-violet-600/20 sm:from-violet-600/30 to-fuchsia-600/20 sm:to-fuchsia-600/30 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[100px]"
              />
              <motion.div 
                animate={{ 
                  x: [0, -120, 80, 0],
                  y: [0, 120, -60, 0],
                  scale: [1, 0.8, 1.4, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-0 w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-gradient-to-br from-cyan-500/20 sm:from-cyan-500/30 to-blue-600/20 sm:to-blue-600/30 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[100px]"
              />
            </div>
          </motion.div>
        )}

        {/* Partículas flotantes - solo en desktop */}
        {!isMobile && <FloatingParticles />}

        {/* Grid pattern - más sutil en móvil */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(139,92,246,.02)_1.5px,transparent_1.5px)] sm:bg-[linear-gradient(rgba(139,92,246,.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(139,92,246,.03)_1.5px,transparent_1.5px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

        <div className="relative z-10 container mx-auto px-0 sm:px-4 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            {/* Left Column */}
            <article className="text-left space-y-6 sm:space-y-8 px-4 sm:px-0">
              
              {/* Badge de prueba social */}
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

              {/* Título principal */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="space-y-4"
              >
                <h1 id="hero-heading" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter">
                  <span className="block text-white">
                    Dormir bien,
                  </span>
                  <span className="block relative">
                    <span className="relative z-10 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                      es vivir mejor
                    </span>
                    {shouldAnimate && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
                        className="absolute bottom-2 left-0 right-0 h-3 sm:h-4 bg-gradient-to-r from-violet-500/30 via-fuchsia-500/30 to-cyan-500/30 blur-xl"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </h1>
              </motion.div>

              {/* Subtítulo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-4 sm:space-y-6"
              >
                <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 leading-relaxed font-light">
                  Tu cuerpo se adapta al colchón.<br />
                  <span className="text-white font-medium">Nosotros lo hacemos al revés.</span>
                </p>

                {/* Precio */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="flex items-baseline gap-2 sm:gap-3">
                    <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight">449€</span>
                    <div className="flex flex-col">
                      <span className="text-lg sm:text-xl text-zinc-500 line-through">799€</span>
                      <span className="text-xs sm:text-sm font-bold text-amber-400">-44% HOY</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.nav
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-6"
                aria-label="Acciones principales"
              >
                <Link 
                  href="/simulador"
                  prefetch={true}
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white px-8 sm:px-10 py-5 sm:py-6 rounded-2xl font-bold text-lg sm:text-xl shadow-2xl shadow-violet-500/50 transition-all duration-500 hover:scale-[1.02]"
                  aria-label="Hacer test gratuito personalizado en 2 minutos"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" aria-hidden="true" />
                  <span className="relative z-10">Test gratuito · 2 min</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>

                <Link
                  href="/catalogo"
                  prefetch={true}
                  className="group inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-xl border-2 border-white/10 text-white px-8 sm:px-10 py-5 sm:py-6 rounded-2xl font-bold text-lg sm:text-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  aria-label="Ver colección premium de colchones"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  Ver colección
                </Link>
              </motion.nav>

              {/* Indicadores de confianza */}
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-xs sm:text-sm text-zinc-400 border-t border-white/5"
                aria-label="Beneficios del producto"
              >
                <li className="text-zinc-300">✓ Muelles Ensacados</li>
                <li className="text-zinc-300">✓ Envío gratis</li>
                <li className="text-zinc-300">✓ Hecho en España</li>
              </motion.ul>
            </article>

            {/* Right Column - Product Carousel optimizado */}
            <motion.figure
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="relative -mx-4 sm:mx-0"
              aria-label="Galería de imágenes del colchón Multisac®"
            >
              <div className="relative">
                {/* Efectos de brillo - reducidos en móvil */}
                <div className="absolute -inset-2 sm:-inset-6 md:-inset-12 bg-gradient-to-r from-violet-600/15 sm:from-violet-600/40 via-fuchsia-600/15 sm:via-fuchsia-600/40 to-cyan-600/15 sm:to-cyan-600/40 rounded-xl sm:rounded-[3rem] md:rounded-[4rem] blur-[40px] sm:blur-[60px] md:blur-[100px] opacity-50 sm:opacity-70 animate-pulse" aria-hidden="true" />
                
                <div className="absolute -inset-1 sm:-inset-4 md:-inset-6 bg-gradient-to-br from-cyan-500/15 sm:from-cyan-500/30 via-violet-500/15 sm:via-violet-500/30 to-fuchsia-500/15 sm:to-fuchsia-500/30 rounded-lg sm:rounded-[2.5rem] md:rounded-[3.5rem] blur-xl sm:blur-2xl md:blur-3xl" aria-hidden="true" />
                
                <div className="relative bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 backdrop-blur-3xl border-2 border-white/20 rounded-none sm:rounded-[2rem] md:rounded-[3rem] p-0 sm:p-2 md:p-3 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-fuchsia-500/30 to-cyan-500/30 blur-xl animate-pulse" />
                  
                  {/* Carousel de producto con swipe */}
                  <div 
                    ref={carouselRef}
                    className="relative aspect-[3/4] sm:aspect-[4/3] rounded-none sm:rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-black shadow-inner min-h-[520px] sm:min-h-0"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    {/* Imágenes del carousel con lazy loading y zoom */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                        className="absolute inset-0"
                      >
                        <Image 
                          src={CAROUSEL_IMAGES[currentImage].url}
                          alt={CAROUSEL_IMAGES[currentImage].alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                          priority={currentImage === 0}
                          loading={currentImage === 0 ? 'eager' : 'lazy'}
                          quality={85}
                          placeholder="blur"
                          blurDataURL={CAROUSEL_IMAGES[currentImage].blurDataURL}
                          onLoadingComplete={() => {
                            setImagesLoaded(prev => {
                              const newState = [...prev]
                              newState[currentImage] = true
                              return newState
                            })
                          }}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Overlays de gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-600/20 mix-blend-overlay pointer-events-none" />

                    {/* Controles de navegación - solo desktop */}
                    <button
                      onClick={goToPrev}
                      className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-md border-2 border-white/20 hover:border-white/40 hover:scale-110 shadow-xl z-20 group"
                      aria-label="Imagen anterior del colchón"
                    >
                      <ChevronLeft className="w-7 h-7 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-md border-2 border-white/20 hover:border-white/40 hover:scale-110 shadow-xl z-20 group"
                      aria-label="Siguiente imagen del colchón"
                    >
                      <ChevronRight className="w-7 h-7 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Indicadores de navegación - más grandes en móvil */}
                    <nav 
                      className="absolute bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 bg-black/50 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 z-20"
                      aria-label="Indicadores de imagen"
                    >
                      {CAROUSEL_IMAGES.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            currentImage === index
                              ? 'bg-white w-10 shadow-lg shadow-white/50'
                              : 'bg-white/40 hover:bg-white/70 w-2.5'
                          }`}
                          aria-label={`Ver ${img.label}`}
                          aria-current={currentImage === index ? 'true' : 'false'}
                        />
                      ))}
                    </nav>

                    {/* Badges flotantes con especificaciones - más grandes en móvil */}
                    <FloatingBadge 
                      className="absolute top-4 md:top-4 right-4 md:right-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 backdrop-blur-sm px-4 md:px-5 py-2.5 md:py-3 rounded-xl md:rounded-2xl shadow-2xl border-2 border-white/20 z-10"
                    >
                      <span className="text-white text-sm md:text-sm font-black">32cm · 7 capas</span>
                    </FloatingBadge>

                    <FloatingBadge 
                      delay={1}
                      className="absolute bottom-20 md:bottom-20 left-4 md:left-4 bg-gradient-to-r from-cyan-600 to-blue-600 backdrop-blur-sm px-4 md:px-5 py-2.5 md:py-3 rounded-xl md:rounded-2xl shadow-2xl border-2 border-white/20 z-10"
                    >
                      <span className="text-white text-sm md:text-sm font-black">275 m2 muelles</span>
                    </FloatingBadge>

                    {/* Badge de descuento - más grande */}
                    <motion.div
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: -6 }}
                      transition={{ delay: 1.2, type: "spring", bounce: 0.5 }}
                      className="absolute top-4 md:top-4 left-4 md:left-4 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 px-4 md:px-5 py-2.5 md:py-3 rounded-xl md:rounded-2xl shadow-2xl border-2 border-yellow-300/50 z-10"
                      aria-label="Descuento del 44%"
                    >
                      <div className="text-center">
                        <div className="text-white text-xs md:text-xs font-black uppercase tracking-wider">Oferta</div>
                        <div className="text-white text-2xl md:text-2xl font-black leading-none">-44%</div>
                      </div>
                    </motion.div>

                    {/* Efecto de partículas - solo desktop */}
                    {shouldAnimate && (
                      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
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

                  {/* Grid de especificaciones técnicas */}
                  <div className="mt-3 md:mt-6 grid grid-cols-4 gap-2 md:gap-3 px-2 sm:px-0">
                    {specBadges}
                  </div>
                </div>
              </div>
            </motion.figure>
          </div>
        </div>

        {/* Indicador de scroll */}
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            aria-label="Desplázate para ver más contenido"
            role="img"
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
    </>
  )
}