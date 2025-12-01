'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, Shield, Star, Sparkles, CreditCard, MapPin } from 'lucide-react'
import Link from 'next/link'

/**
 * TrustBar Component - Azul Colchones Edition
 * 
 * Barra de confianza con beneficios locales:
 * - Propuesta de valor Villa María
 * - Trust signals argentinos
 * - Animaciones sutiles pero efectivas
 * - CTA directo al catálogo
 */

interface TrustItem {
  icon: React.ElementType
  text: string
  ariaLabel: string
  highlight?: string
}

const TRUST_ITEMS: TrustItem[] = [
  {
    icon: Truck,
    text: 'Envío Gratis',
    highlight: 'Villa María 24-48hs',
    ariaLabel: 'Envío gratis en Villa María en 24 a 48 horas'
  },
  {
    icon: CreditCard,
    text: '12 Cuotas',
    highlight: 'Sin Interés',
    ariaLabel: '12 cuotas sin interés con Mercado Pago'
  },
  {
    icon: Shield,
    text: 'Garantía Extendida',
    highlight: 'Asegurada',
    ariaLabel: 'Garantía extendida asegurada'
  },
  {
    icon: MapPin,
    text: 'Villa María',
    highlight: '8+ años',
    ariaLabel: 'Más de 8 años en Villa María, Córdoba'
  }
]

export function TrustBar() {
  const [showTrustBar, setShowTrustBar] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const lastScrollRef = useRef(0)
  const ticking = useRef(false)

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
      {/* JSON-LD para SEO - Información de confianza Argentina */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Azul Colchones Villa María',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Villa María',
              addressRegion: 'Córdoba',
              postalCode: '5900',
              addressCountry: 'AR'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '850',
              bestRating: '5'
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'ARS',
              shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                  '@type': 'MonetaryAmount',
                  value: '0',
                  currency: 'ARS'
                },
                shippingDestination: {
                  '@type': 'DefinedRegion',
                  addressCountry: 'AR',
                  addressRegion: 'Córdoba'
                },
                deliveryTime: {
                  '@type': 'ShippingDeliveryTime',
                  transitTime: {
                    '@type': 'QuantitativeValue',
                    minValue: '1',
                    maxValue: '2',
                    unitCode: 'DAY'
                  }
                }
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
            aria-label="Beneficios y garantías"
          >
            {/* Background premium con gradiente azul argentino */}
            <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-2xl overflow-hidden">
              {/* Efecto de brillo sutil */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                aria-hidden="true"
              />

              {/* Pattern sutil de fondo */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '32px 32px'
                }}
                aria-hidden="true"
              />

              <div className="container mx-auto px-4 py-4 relative z-10">
                <div className="flex items-center justify-between gap-4">
                  {/* Badge destacado - Azul Colchones */}
                  <motion.div 
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                    animate={{ 
                      boxShadow: [
                        '0 0 15px rgba(59, 130, 246, 0.4)',
                        '0 0 25px rgba(59, 130, 246, 0.6)',
                        '0 0 15px rgba(59, 130, 246, 0.4)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Star className="w-5 h-5 text-cyan-200" aria-hidden="true" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-cyan-200 uppercase tracking-wider">
                        Tu Colchonería
                      </span>
                      <span className="text-sm font-bold">
                        en Villa María
                      </span>
                    </div>
                  </motion.div>

                  {/* Items de confianza */}
                  <nav 
                    className="flex items-center justify-center gap-6 flex-1"
                    aria-label="Beneficios de compra"
                  >
                    {TRUST_ITEMS.map((item, index) => {
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
                            className="flex items-center gap-2 group cursor-default"
                            role="listitem"
                          >
                            <motion.div
                              animate={{ 
                                y: [0, -3, 0]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.3,
                                ease: 'easeInOut'
                              }}
                            >
                              <Icon 
                                className="w-5 h-5 flex-shrink-0 text-cyan-200 drop-shadow-[0_0_6px_rgba(165,243,252,0.6)]" 
                                aria-hidden="true"
                              />
                            </motion.div>
                            <div className="flex flex-col leading-tight">
                              <span className="text-xs font-semibold uppercase tracking-wide">
                                {item.text}
                              </span>
                              {item.highlight && (
                                <span className="text-sm font-bold text-cyan-200">
                                  {item.highlight}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {index < TRUST_ITEMS.length - 1 && (
                            <div 
                              className="h-8 w-px bg-white/20" 
                              aria-hidden="true"
                            />
                          )}
                        </motion.div>
                      )
                    })}
                  </nav>

                  {/* CTA Button - Link al catálogo */}
                  <Link href="/catalogo">
                    <motion.div
                      className="bg-gradient-to-r from-cyan-400 to-blue-400 text-zinc-900 font-bold px-6 py-2.5 rounded-full uppercase text-sm tracking-wide shadow-lg hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Ver catálogo de colchones"
                      role="button"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                      <span className="relative z-10 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                        Ver Ofertas
                      </span>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sombra superior mejorada - azul */}
            <div 
              className="absolute inset-x-0 bottom-full h-8 bg-gradient-to-t from-blue-600/20 via-blue-500/10 to-transparent pointer-events-none blur-sm"
              aria-hidden="true"
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}