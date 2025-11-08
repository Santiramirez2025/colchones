'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Tag, Clock, Sparkles } from 'lucide-react'

/**
 * TrustBar Component - Cyber Monday Edition
 * 
 * Diseño especial para Cyber Monday con:
 * - Temática tech/cyber con colores neón
 * - Animaciones energéticas y llamativas
 * - Contador de tiempo limitado
 * - Ofertas destacadas del Cyber Monday
 * - Efectos visuales modernos (glitch, glow)
 */

interface TrustItem {
  icon: React.ElementType
  text: string
  ariaLabel: string
  highlight?: string
}

const CYBER_ITEMS: TrustItem[] = [
  {
    icon: Zap,
    text: 'CYBER MONDAY',
    highlight: 'Hasta -50%',
    ariaLabel: 'Cyber Monday con descuentos hasta 50%'
  },
  {
    icon: Tag,
    text: 'Código: CYBER24',
    highlight: '-10% EXTRA',
    ariaLabel: 'Código CYBER24 para 10% adicional'
  },
  {
    icon: Clock,
    text: 'Envío Express GRATIS',
    highlight: 'Solo HOY',
    ariaLabel: 'Envío express gratuito solo hoy'
  },
  {
    icon: Sparkles,
    text: 'Stock Limitado',
    highlight: '¡Últimas unidades!',
    ariaLabel: 'Stock limitado, últimas unidades disponibles'
  }
]

export function TrustBar() {
  const [showTrustBar, setShowTrustBar] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [countdown, setCountdown] = useState('')
  const lastScrollRef = useRef(0)
  const ticking = useRef(false)

  // Countdown timer para Cyber Monday
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date()
      const endOfDay = new Date(now)
      endOfDay.setHours(23, 59, 59, 999)
      
      const diff = endOfDay.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }

    calculateCountdown()
    const interval = setInterval(calculateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll handler optimizado
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScroll = window.scrollY
        const lastScroll = lastScrollRef.current

        if (currentScroll < lastScroll || currentScroll < 100) {
          setShowTrustBar(true)
        } else if (currentScroll > lastScroll && currentScroll > 100) {
          setShowTrustBar(false)
        }

        lastScrollRef.current = currentScroll
        ticking.current = false
      })

      ticking.current = true
    }
  }, [])

  useEffect(() => {
    if (isMobile) return
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll, isMobile])

  if (isMobile) return null

  return (
    <>
      {/* JSON-LD para SEO - Oferta especial Cyber Monday */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Offer',
            name: 'Cyber Monday Sale',
            description: 'Cyber Monday con descuentos hasta 50% y envío express gratis',
            priceValidUntil: new Date().toISOString().split('T')[0],
            availability: 'https://schema.org/LimitedAvailability',
            eligibleRegion: {
              '@type': 'Country',
              name: 'ES'
            },
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingRate: {
                '@type': 'MonetaryAmount',
                value: '0',
                currency: 'EUR'
              }
            }
          })
        }}
      />

      <AnimatePresence mode="wait">
        {showTrustBar && (
          <motion.aside
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.4, 0, 0.2, 1]
            }}
            className="fixed bottom-0 left-0 right-0 z-40 hidden sm:block"
            role="complementary"
            aria-label="Ofertas Cyber Monday"
          >
            {/* Background con efecto neón cyber */}
            <div className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-2xl overflow-hidden">
              {/* Efecto de brillo animado */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                aria-hidden="true"
              />

              {/* Grid pattern cyber */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
                aria-hidden="true"
              />

              <div className="container mx-auto px-4 py-4 relative z-10">
                <div className="flex items-center justify-between gap-4">
                  {/* Contador urgente */}
                  <motion.div 
                    className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(59, 130, 246, 0.5)',
                        '0 0 40px rgba(59, 130, 246, 0.8)',
                        '0 0 20px rgba(59, 130, 246, 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Clock className="w-5 h-5 text-yellow-300" aria-hidden="true" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-yellow-300 uppercase tracking-wider">Termina en</span>
                      <span className="text-lg font-black tabular-nums tracking-tight" aria-label={`Termina en ${countdown}`}>
                        {countdown}
                      </span>
                    </div>
                  </motion.div>

                  {/* Items de confianza */}
                  <nav 
                    className="flex items-center justify-center gap-6 flex-1"
                    aria-label="Ofertas Cyber Monday"
                  >
                    {CYBER_ITEMS.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={index}
                          className="flex items-center gap-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div 
                            className="flex items-center gap-2 group cursor-pointer"
                            role="listitem"
                          >
                            <motion.div
                              animate={{ 
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.2
                              }}
                            >
                              <Icon 
                                className="w-5 h-5 flex-shrink-0 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" 
                                aria-hidden="true"
                              />
                            </motion.div>
                            <div className="flex flex-col leading-tight">
                              <span className="text-xs font-bold uppercase tracking-wide">
                                {item.text}
                              </span>
                              {item.highlight && (
                                <motion.span 
                                  className="text-sm font-black text-yellow-300"
                                  animate={{ 
                                    textShadow: [
                                      '0 0 10px rgba(253, 224, 71, 0.8)',
                                      '0 0 20px rgba(253, 224, 71, 1)',
                                      '0 0 10px rgba(253, 224, 71, 0.8)'
                                    ]
                                  }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  {item.highlight}
                                </motion.span>
                              )}
                            </div>
                          </div>
                          
                          {index < CYBER_ITEMS.length - 1 && (
                            <div 
                              className="h-8 w-px bg-white/30" 
                              aria-hidden="true"
                            />
                          )}
                        </motion.div>
                      )
                    })}
                  </nav>

                  {/* CTA Button */}
                  <motion.button
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black px-6 py-2 rounded-full uppercase text-sm tracking-wide shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Ver ofertas Cyber Monday"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/30"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                      Ver Ofertas
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Sombra superior mejorada */}
            <div 
              className="absolute inset-x-0 bottom-full h-8 bg-gradient-to-t from-cyan-500/20 via-blue-600/10 to-transparent pointer-events-none blur-sm"
              aria-hidden="true"
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}