'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Home, Search, Phone, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export default function NotFound() {
  const prefersReducedMotion = useReducedMotion()

  // Links útiles para el usuario
  const quickLinks = [
    { 
      href: '/', 
      label: 'Volver al inicio', 
      icon: Home,
      variant: 'primary' as const,
      ariaLabel: 'Volver a la página de inicio'
    },
    { 
      href: '/catalogo', 
      label: 'Ver colchones', 
      icon: Search,
      variant: 'secondary' as const,
      ariaLabel: 'Explorar catálogo de colchones'
    },
  ]

  const helpLinks = [
    { href: '/simulador', label: 'Test personalizado', emoji: '🧠' },
    { href: '/comparador', label: 'Comparar modelos', emoji: '⚖️' },
    { href: '/blog', label: 'Guía del sueño', emoji: '📚' },
    { href: '/contacto', label: 'Contactar', emoji: '💬' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(139,92,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          >
            {/* Emoji grande */}
            <motion.div 
              className="text-9xl mb-8"
              animate={prefersReducedMotion ? {} : { 
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 3 
              }}
              role="img" 
              aria-label="Emoji durmiendo"
            >
              😴
            </motion.div>
            
            {/* Código 404 */}
            <h1 className="text-8xl md:text-9xl font-black mb-6">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                404
              </span>
            </h1>
            
            {/* Título */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              ¡Ups! Esta página está durmiendo
            </h2>
            
            {/* Descripción */}
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Parece que la página que buscas no existe o ha sido movida. 
              Pero no te preocupes, ¡podemos ayudarte a encontrar lo que necesitas!
            </p>

            {/* Botones principales */}
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              role="navigation"
              aria-label="Acciones principales"
            >
              {quickLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  aria-label={link.ariaLabel}
                >
                  <motion.button
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                    className={
                      link.variant === 'primary'
                        ? 'group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-violet-500/50 transition-all duration-300 hover:shadow-violet-500/75'
                        : 'group inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-xl border-2 border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300'
                    }
                  >
                    <link.icon className="w-5 h-5" aria-hidden="true" />
                    <span>{link.label}</span>
                  </motion.button>
                </Link>
              ))}
            </div>

            {/* Enlaces útiles */}
            <div className="border-t border-white/10 pt-12">
              <h3 className="text-white font-bold text-lg mb-6">
                ¿Buscabas algo específico?
              </h3>
              <div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
                role="list"
                aria-label="Enlaces útiles"
              >
                {helpLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : i * 0.1 }}
                    role="listitem"
                  >
                    <Link
                      href={link.href}
                      className="group block p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300"
                    >
                      <div className="text-3xl mb-3" role="img" aria-label={link.label}>
                        {link.emoji}
                      </div>
                      <div className="text-white text-sm font-semibold group-hover:text-violet-400 transition-colors">
                        {link.label}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contacto de ayuda */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.8 }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <p className="text-zinc-400 mb-4">
                ¿Necesitas ayuda adicional?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={`tel:${SITE_CONFIG.phone.number}`}
                  className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors font-semibold"
                  aria-label={`Llamar al ${SITE_CONFIG.phone.display}`}
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>{SITE_CONFIG.phone.display}</span>
                </a>
                <span className="hidden sm:block text-zinc-700">•</span>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors font-semibold"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Enviar mensaje</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}