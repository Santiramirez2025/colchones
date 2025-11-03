'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, Shield, Moon } from 'lucide-react'

/**
 * TrustBar Component - Barra de confianza sticky optimizada
 * 
 * Mejoras implementadas:
 * - Throttle optimizado con requestAnimationFrame para mejor performance
 * - Oculto en mobile (<640px) para mejor UX móvil
 * - SEO mejorado con microdata y estructura semántica
 * - Accesibilidad completa con ARIA labels y roles
 * - Animaciones suaves sin jitter usando AnimatePresence
 * - Diseño responsive y moderno
 */

interface TrustItem {
  icon: React.ElementType
  text: string
  ariaLabel: string
}

const TRUST_ITEMS: TrustItem[] = [
  {
    icon: Truck,
    text: 'Envío gratis 3 a 6 dias',
    ariaLabel: 'Envío gratuito en 24 a 48 horas'
  },
  {
    icon: Shield,
    text: 'Garantía 3 años',
    ariaLabel: 'Garantía extendida de 3 años'
  },
  {
    icon: Moon,
    text: 'Tu descanso asegurado',
    ariaLabel: 'Compromiso con tu descanso de calidad'
  }
]

export function TrustBar() {
  const [showTrustBar, setShowTrustBar] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const lastScrollRef = useRef(0)
  const ticking = useRef(false)

  // Detectar si es mobile una sola vez al montar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640) // sm breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll handler optimizado con throttle usando RAF
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScroll = window.scrollY
        const lastScroll = lastScrollRef.current

        // Mostrar cuando scroll up o cerca del top
        if (currentScroll < lastScroll || currentScroll < 100) {
          setShowTrustBar(true)
        } 
        // Ocultar cuando scroll down después de 100px
        else if (currentScroll > lastScroll && currentScroll > 100) {
          setShowTrustBar(false)
        }

        lastScrollRef.current = currentScroll
        ticking.current = false
      })

      ticking.current = true
    }
  }, [])

  useEffect(() => {
    // Solo agregar listener si no es mobile
    if (isMobile) return

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll, isMobile])

  // No renderizar nada en mobile
  if (isMobile) return null

  return (
    <>
      {/* JSON-LD para SEO - Información de la tienda */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Store',
            name: 'Descanso Premium',
            offers: {
              '@type': 'Offer',
              shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                  '@type': 'MonetaryAmount',
                  value: '0',
                  currency: 'EUR'
                },
                deliveryTime: {
                  '@type': 'ShippingDeliveryTime',
                  handlingTime: {
                    '@type': 'QuantitativeValue',
                    minValue: 24,
                    maxValue: 48,
                    unitCode: 'HUR'
                  }
                }
              }
            },
            warranty: {
              '@type': 'WarrantyPromise',
              durationOfWarranty: {
                '@type': 'QuantitativeValue',
                value: 3,
                unitCode: 'ANN'
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
              ease: [0.4, 0, 0.2, 1] // easeInOut personalizado
            }}
            className="fixed bottom-0 left-0 right-0 z-40 hidden sm:block"
            role="complementary"
            aria-label="Beneficios de compra"
          >
            {/* Barra de confianza */}
            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-2xl">
              <div className="container mx-auto px-4 py-3">
                <nav 
                  className="flex items-center justify-center gap-8 text-sm font-semibold"
                  aria-label="Características de la tienda"
                >
                  {TRUST_ITEMS.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div key={index} className="flex items-center gap-8">
                        <div 
                          className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
                          role="listitem"
                        >
                          <Icon 
                            className="w-5 h-5 flex-shrink-0 group-hover:rotate-12 transition-transform duration-200" 
                            aria-hidden="true"
                          />
                          <span 
                            className="whitespace-nowrap"
                            aria-label={item.ariaLabel}
                          >
                            {item.text}
                          </span>
                        </div>
                        
                        {/* Separador - solo entre items, no después del último */}
                        {index < TRUST_ITEMS.length - 1 && (
                          <div 
                            className="h-5 w-px bg-white/30" 
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* Sombra superior para mejor separación visual */}
            <div 
              className="absolute inset-x-0 bottom-full h-4 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}