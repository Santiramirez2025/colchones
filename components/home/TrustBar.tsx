'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Truck, Shield, Moon } from 'lucide-react'

export function TrustBar() {
  const [showTrustBar, setShowTrustBar] = useState(true)
  const [lastScroll, setLastScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      
      // Mostrar si scrolleamos hacia arriba o estamos cerca del top
      if (currentScroll < lastScroll || currentScroll < 100) {
        setShowTrustBar(true)
      } else if (currentScroll > lastScroll && currentScroll > 100) {
        // Ocultar si scrolleamos hacia abajo
        setShowTrustBar(false)
      }
      
      setLastScroll(currentScroll)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScroll])

  return (
    <motion.div
      initial={false}
      animate={{ y: showTrustBar ? 0 : 100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white py-3 shadow-2xl"
      role="complementary"
      aria-label="Beneficios de compra"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-6 text-sm font-semibold flex-wrap">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" aria-hidden="true" />
            <span>Envío gratis 24-48h</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-white/30" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" aria-hidden="true" />
            <span>Garantía 10 años</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-white/30" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4" aria-hidden="true" />
            <span>100 noches de prueba</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}