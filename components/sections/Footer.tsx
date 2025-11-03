'use client'

import Link from 'next/link'
import { useState } from 'react'

// ============================================================================
// ICONS - Minimalistas y ligeros
// ============================================================================
const Icons = {
  Shield: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  Truck: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  Return: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
    </svg>
  ),
  CreditCard: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  ),
  Phone: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  Mail: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  ChevronRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
}

// ============================================================================
// CONFIG
// ============================================================================
const SITE_CONFIG = {
  phone: '+34900123456',
  phoneDisplay: '900 123 456',
  email: 'info@tiendacolchon.es',
  schedule: 'L-V: 9:00-19:00h',
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting || submitted) return
    
    setIsSubmitting(true)
    setTimeout(() => {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => {
        setSubmitted(false)
        setIsSubmitting(false)
      }, 2500)
    }, 1000)
  }

  const quickLinks = [
    { href: '/productos', label: 'Catálogo' },
    { href: '/como-comprar', label: 'Cómo comprar' },
    { href: '/envios', label: 'Envíos y entregas' },
    { href: '/garantia', label: 'Garantía' },
    { href: '/opiniones', label: 'Opiniones' },
  ]

  const helpLinks = [
    { href: '/contacto', label: 'Contacto' },
    { href: '/faq', label: 'Preguntas frecuentes' },
    { href: '/guia-compra', label: 'Guía de compra' },
    { href: '/cuidado-colchon', label: 'Cuidado del colchón' },
  ]

  const legalLinks = [
    { href: '/aviso-legal', label: 'Aviso legal' },
    { href: '/privacidad', label: 'Política de privacidad' },
    { href: '/cookies', label: 'Política de cookies' },
    { href: '/condiciones-compra', label: 'Condiciones de compra' },
  ]

  return (
    <footer className="bg-zinc-950 text-gray-400 border-t border-gray-800/50">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* ============================================================ */}
        {/* 1. CONTACTO DIRECTO - Prioridad alta */}
        {/* ============================================================ */}
        <section className="py-8 md:py-12 border-b border-gray-800/40">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-white mb-1">¿Necesitas ayuda?</h3>
              <p className="text-sm text-gray-500">Estamos aquí para resolver tus dudas</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-3 p-4 bg-gray-900/30 rounded-lg border border-gray-800/40 hover:border-violet-500/40 hover:bg-gray-900/50 transition-all group"
              >
                <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20">
                  <Icons.Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 mb-0.5">Llámanos</div>
                  <div className="text-sm font-semibold text-white">{SITE_CONFIG.phoneDisplay}</div>
                  <div className="text-xs text-gray-500">{SITE_CONFIG.schedule}</div>
                </div>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-3 p-4 bg-gray-900/30 rounded-lg border border-gray-800/40 hover:border-violet-500/40 hover:bg-gray-900/50 transition-all group"
              >
                <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20">
                  <Icons.Mail className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 mb-0.5">Escríbenos</div>
                  <div className="text-sm font-medium text-white break-all">{SITE_CONFIG.email}</div>
                  <div className="text-xs text-gray-500">Respuesta en 24h</div>
                </div>
              </a>
            </div>

            {/* Newsletter simplificado */}
            <div className="bg-gray-900/20 rounded-lg p-6 border border-gray-800/40">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Icons.Mail className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Ofertas y consejos</h4>
                  <p className="text-xs text-gray-500">Recibe promociones y guías de descanso. Sin spam.</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-2.5 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent"
                />
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || submitted || !email}
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {submitted ? '✓ Listo' : isSubmitting ? '...' : 'Suscribir'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. ENLACES ÚTILES - Grid limpio */}
        {/* ============================================================ */}
        <section className="py-8 md:py-12 border-b border-gray-800/40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Comprar */}
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">Comprar</h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors inline-flex items-center group"
                    >
                      <Icons.ChevronRight className="w-3.5 h-3.5 mr-1 text-gray-600 group-hover:text-violet-400 transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ayuda */}
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">Ayuda</h3>
              <ul className="space-y-2.5">
                {helpLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors inline-flex items-center group"
                    >
                      <Icons.ChevronRight className="w-3.5 h-3.5 mr-1 text-gray-600 group-hover:text-violet-400 transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">Legal</h3>
              <ul className="space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors inline-flex items-center group"
                    >
                      <Icons.ChevronRight className="w-3.5 h-3.5 mr-1 text-gray-600 group-hover:text-violet-400 transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. MARCA - Minimalista al final */}
        {/* ============================================================ */}
        <section className="py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Logo + Copyright */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center group-hover:bg-violet-500 transition-colors">
                  <span className="text-white text-sm font-bold">TC</span>
                </div>
                <span className="text-white font-semibold text-sm">TiendaColchon</span>
              </Link>
              <span className="text-gray-600 text-xs">
                © {new Date().getFullYear()}
              </span>
            </div>

            {/* Métodos de pago */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Aceptamos:</span>
              <div className="flex items-center gap-1.5">
                {['Visa', 'MC', 'PayPal'].map((method) => (
                  <div
                    key={method}
                    className="px-2 py-1 bg-gray-900/40 border border-gray-800/40 rounded text-[10px] text-gray-500 font-medium"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>

            {/* Made in Spain */}
            <div className="text-xs text-gray-600 flex items-center gap-1.5">
              <span>🇪🇸</span>
              <span>Diseñado en España</span>
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}