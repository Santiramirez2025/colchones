'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Brain, ArrowRight } from 'lucide-react'
import { CTA_FEATURES } from '@/lib/product-data'

export function CTASection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section 
      className="relative py-32 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-600" />
      
      {!prefersReducedMotion && (
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{ 
              scale: [1, 1.4, 1],
              x: [0, 150, 0],
              y: [0, -80, 0],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-[900px] h-[900px] bg-gradient-to-br from-cyan-400/40 to-blue-500/40 rounded-full mix-blend-screen filter blur-[100px]"
          />
        </div>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,.05)_1.5px,transparent_1.5px)] bg-[size:64px_64px]" />

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 id="cta-heading" className="text-5xl md:text-7xl font-black text-white leading-tight">
            ¿Listo para dormir
            <br />
            como nunca antes?
          </h2>
          
          <p className="text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-semibold">
            Descubre en 2 minutos qué colchón se adapta perfectamente a ti
          </p>

          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Link
              href="/simulador"
              className="group relative inline-flex items-center gap-4 bg-white text-violet-600 px-12 py-7 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-white/40 transition-all duration-300 hover:scale-[1.05]"
              aria-label="Hacer test de colchón personalizado ahora"
            >
              <Brain className="w-7 h-7" aria-hidden="true" />
              <span>Hacer test ahora</span>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
            </Link>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-white/90">
            {CTA_FEATURES.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <item.icon className="w-6 h-6" aria-hidden="true" />
                <span className="font-bold text-lg">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}