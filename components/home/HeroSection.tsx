'use client'

import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star, ChevronLeft, ChevronRight, CheckCircle2, Truck, ShieldCheck } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

// 🎯 IMÁGENES CAROUSEL
const CAROUSEL_IMAGES = [
  {
    url: '/images/piero-spring-1.jpg',
    alt: 'Colchón Piero Spring',
    title: 'Piero Spring',
    subtitle: 'Resortes Pocket'
  },
  {
    url: '/images/piero-foam-1.jpg',
    alt: 'Colchón Piero Foam',
    title: 'Piero Foam',
    subtitle: 'Alta Densidad'
  },
  {
    url: '/images/piero-bahia-1.jpg',
    alt: 'Colchón Piero Bahía',
    title: 'Piero Bahía',
    subtitle: 'Euro Pillow'
  },
  {
    url: '/images/piero-mattina-1.jpg',
    alt: 'Colchón Piero Mattina',
    title: 'Piero Mattina',
    subtitle: '30cm Premium'
  }
]

// 📊 SEO ESTRUCTURADO
const productStructuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Colchones Piero Premium",
  "description": "Colchones Piero en Villa María. Marca líder argentina. Envío gratis.",
  "brand": { "@type": "Brand", "name": "Piero" },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "ARS",
    "lowPrice": "359000",
    "highPrice": "991000"
  }
}

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Navegación
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
    <>
      <Head>
        <title>Colchones Piero Villa María | Hasta 40% OFF 🇦🇷</title>
        <meta name="description" content="Colchones Piero en Villa María. Spring, Foam, Bahía. Envío GRATIS. 6 cuotas sin interés." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
        />
      </Head>

      <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
        
        {/* 🌌 BACKGROUND MINIMALISTA */}
        <div className="absolute inset-0">
          {/* Gradiente suave */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          
          {/* Acento azul sutil */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
          
          {/* Grid ultra sutil */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-50" />
        </div>

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
              
              {/* 👈 CONTENIDO - MOBILE PRIMERO */}
              <div className="text-center lg:text-left space-y-6 sm:space-y-8 order-2 lg:order-1">
                
                {/* Logo + Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4"
                >
                  {/* Logo PIERO limpio */}
                  <div className="inline-flex items-center gap-3 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 px-5 py-3 rounded-xl">
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">PIERO</span>
                    <div className="h-6 w-px bg-slate-600" />
                    <span className="text-blue-400 font-semibold text-sm">🇦🇷 Marca Argentina</span>
                  </div>

                  {/* Trust badge compacto */}
                  <div className="inline-flex items-center gap-2 text-sm text-slate-300">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>40+ años · +100K clientes</span>
                  </div>
                </motion.div>

                {/* Título LIMPIO */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                >
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
                    <span className="block text-white">
                      
Ofertas fin de año
                    </span>
                    <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Hasta 50% OFF
                    </span>
                  </h1>
                </motion.div>

                {/* Subtítulo SIMPLE */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6 }}
                  className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0"
                >
                  Los mejores colchones de Argentina<br className="hidden sm:block" />
                  <span className="text-white font-semibold">AL MEJOR PRECIO</span>
                </motion.p>

                {/* PRECIO ELEGANTE */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="inline-block"
                >
                  <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8">
                    <div className="flex items-center gap-4 sm:gap-6 justify-center lg:justify-start">
                      <div>
                        <div className="text-sm text-blue-400 font-semibold mb-1">Renová tu colchón desde</div>
                        <div className="text-5xl sm:text-6xl font-black text-white">$220.000</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl text-slate-500 line-through">$552K</div>
                        <div className="mt-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-lg">
                          -35% OFF
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-green-400 font-semibold text-center lg:text-left">
                      💳 6 cuotas de $59.855 sin interés
                    </div>
                  </div>
                </motion.div>

                {/* CTA BUTTONS */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Link 
                    href="/catalogo"
                    className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                  >
                    <span>Ver Colección</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="https://wa.me/5493531234567?text=Hola!%20Quiero%20info%20sobre%20colchones%20Piero"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
                  >
                    <span>WhatsApp</span>
                  </Link>
                </motion.div>

                {/* Trust indicators SIMPLE */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 text-sm"
                >
                  <div className="flex items-center gap-2 text-slate-300">
                    <Truck className="w-4 h-4 text-blue-400" />
                    <span>Envío Gratis</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Garantía</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>Pago Seguro</span>
                  </div>
                </motion.div>
              </div>

              {/* 👉 CAROUSEL LIMPIO */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative order-1 lg:order-2"
              >
                {/* Glow sutil */}
                <div className="absolute -inset-8 bg-blue-500/20 rounded-[3rem] blur-[100px] opacity-60" />
                
                {/* Container */}
                <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden p-3 shadow-2xl">
                  
                  {/* Carousel */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950">
                    
                    {/* Imágenes */}
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

                    {/* Overlay sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Controles */}
                    {!isMobile && (
                      <>
                        <button
                          onClick={goToPrev}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl transition-all z-20"
                          aria-label="Anterior"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={goToNext}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-xl transition-all z-20"
                          aria-label="Siguiente"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}

                    {/* Info overlay */}
                    <div className="absolute top-4 left-4 right-4 z-20">
                      <div className="flex items-center justify-between">
                        <div className="bg-black/60 backdrop-blur-xl px-4 py-2 rounded-lg">
                          <div className="text-white text-sm font-bold">
                            {CAROUSEL_IMAGES[currentImage].title}
                          </div>
                          <div className="text-slate-300 text-xs">
                            {CAROUSEL_IMAGES[currentImage].subtitle}
                          </div>
                        </div>
                        <div className="bg-black/60 backdrop-blur-xl px-3 py-2 rounded-lg text-white text-sm font-semibold">
                          {currentImage + 1}/{CAROUSEL_IMAGES.length}
                        </div>
                      </div>
                    </div>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                      {CAROUSEL_IMAGES.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`transition-all ${
                            currentImage === index
                              ? 'w-8 h-2 bg-white rounded-full'
                              : 'w-2 h-2 bg-white/40 hover:bg-white/60 rounded-full'
                          }`}
                          aria-label={`Ir a imagen ${index + 1}`}
                        />
                      ))}
                    </div>

                    {/* Badge descuento */}
                    <div className="absolute top-4 right-4 bg-gradient-to-br from-amber-400 to-orange-500 px-4 py-3 rounded-xl shadow-lg z-20">
                      <div className="text-white text-xs font-bold uppercase">Hasta</div>
                      <div className="text-white text-2xl font-black">40%</div>
                    </div>
                  </div>

                  {/* Specs minimalistas */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-3 rounded-xl text-center">
                      <div className="text-blue-400 text-xs font-semibold">Resortes</div>
                      <div className="text-white text-sm font-bold mt-1">Pocket</div>
                    </div>
                    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-3 rounded-xl text-center">
                      <div className="text-blue-400 text-xs font-semibold">Memory</div>
                      <div className="text-white text-sm font-bold mt-1">Foam</div>
                    </div>
                    <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-3 rounded-xl text-center">
                      <div className="text-blue-400 text-xs font-semibold">Garantía</div>
                      <div className="text-white text-sm font-bold mt-1">5 años</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}