'use client'

import Link from 'next/link'
import { useState } from 'react'

// ============================================================================
// ICONS - Expandidos y optimizados
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
  Star: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  Clock: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  // Redes sociales
  Instagram: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Facebook: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Twitter: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Youtube: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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
  socialMedia: [
    { name: 'Instagram', href: 'https://instagram.com/tiendacolchon', icon: Icons.Instagram },
    { name: 'Facebook', href: 'https://facebook.com/tiendacolchon', icon: Icons.Facebook },
    { name: 'Twitter', href: 'https://twitter.com/tiendacolchon', icon: Icons.Twitter },
    { name: 'Youtube', href: 'https://youtube.com/tiendacolchon', icon: Icons.Youtube },
  ]
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
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/guia-compra', label: 'Cómo comprar' },
    { href: '/envios', label: 'Envíos y entregas' },
    { href: '/garantia', label: 'Garantía' },
    { href: '/opiniones', label: 'Opiniones' },
  ]

  const helpLinks = [
    { href: '/contacto', label: 'Contacto' },
    { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
    { href: '/guia-compra', label: 'Guía de compra' },
    { href: '/cuidado-colchon', label: 'Cuidado del colchón' },
  ]

  const legalLinks = [
    { href: '/aviso-legal', label: 'Aviso legal' },
    { href: '/privacidad', label: 'Política de privacidad' },
    { href: '/cookies', label: 'Política de cookies' },
    { href: '/condiciones-compra', label: 'Condiciones de compra' },
  ]

  const trustBadges = [
    {
      icon: Icons.Shield,
      title: 'Garantía 10 años',
      description: 'En todos los productos'
    },
    {
      icon: Icons.Truck,
      title: 'Envío gratis',
      description: 'Península en 24-48h'
    },
    {
      icon: Icons.Return,
      title: '100 noches de prueba',
      description: 'Devolución sin coste'
    },
    {
      icon: Icons.CreditCard,
      title: 'Pago seguro',
      description: 'Protección total'
    }
  ]

  return (
    <footer className="bg-gradient-to-b from-zinc-950 to-black text-gray-400 border-t border-gray-800/50">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* ============================================================ */}
        {/* 1. BADGES DE CONFIANZA - Nueva sección destacada */}
        {/* ============================================================ */}
        <section className="py-10 md:py-14 border-b border-gray-800/40">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="relative group bg-gradient-to-br from-gray-900/40 to-gray-900/20 rounded-xl p-5 border border-gray-800/40 hover:border-violet-500/40 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-500/0 group-hover:from-violet-500/5 group-hover:to-violet-500/10 rounded-xl transition-all duration-300" />
                
                <div className="relative">
                  <div className="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center text-white shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300">
                    <badge.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{badge.title}</h4>
                  <p className="text-xs text-gray-500">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. NEWSLETTER CTA - Mejorado y más destacado */}
        {/* ============================================================ */}
        <section className="py-10 md:py-14 border-b border-gray-800/40">
          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-600/10 via-violet-500/5 to-transparent rounded-2xl p-8 md:p-10 border border-violet-500/20">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-600/5 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-500/30">
                    <Icons.Mail className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      Suscríbete y ahorra un 10%
                    </h3>
                    <p className="text-sm md:text-base text-gray-400">
                      Recibe ofertas exclusivas, consejos para un mejor descanso y promociones especiales. 
                      <span className="text-violet-400 font-medium"> Sin spam, solo contenido de valor.</span>
                    </p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full px-5 py-3.5 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <Icons.Mail className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || submitted || !email}
                    className="px-8 py-3.5 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white text-sm font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.02] whitespace-nowrap"
                  >
                    {submitted ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        ¡Suscrito!
                      </span>
                    ) : isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      'Suscribirme'
                    )}
                  </button>
                </form>
                
                <p className="text-xs text-gray-500 mt-4">
                  🔒 Tus datos están seguros. Puedes darte de baja en cualquier momento.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. CONTACTO DIRECTO - Rediseñado */}
        {/* ============================================================ */}
        <section className="py-10 md:py-14 border-b border-gray-800/40">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Teléfono */}
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="group relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-900/30 rounded-2xl p-6 border border-gray-800/40 hover:border-violet-500/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-500/0 group-hover:from-violet-500/5 group-hover:to-violet-500/10 transition-all duration-300" />
              
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300 group-hover:scale-110">
                  <Icons.Phone className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-violet-400 mb-1 uppercase tracking-wide">Llámanos ahora</div>
                  <div className="text-xl font-bold text-white mb-1">{SITE_CONFIG.phoneDisplay}</div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Icons.Clock className="w-3.5 h-3.5" />
                    <span>{SITE_CONFIG.schedule}</span>
                  </div>
                </div>
                <Icons.ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="group relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-900/30 rounded-2xl p-6 border border-gray-800/40 hover:border-violet-500/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-500/0 group-hover:from-violet-500/5 group-hover:to-violet-500/10 transition-all duration-300" />
              
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300 group-hover:scale-110">
                  <Icons.Mail className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-violet-400 mb-1 uppercase tracking-wide">Escríbenos</div>
                  <div className="text-sm font-semibold text-white mb-1 truncate">{SITE_CONFIG.email}</div>
                  <div className="text-xs text-gray-500">Respuesta en menos de 24h</div>
                </div>
                <Icons.ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </a>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. ENLACES ÚTILES - Rediseñado con mejor espaciado */}
        {/* ============================================================ */}
        <section className="py-10 md:py-14 border-b border-gray-800/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            
            {/* Sobre nosotros */}
            <div>
              <h3 className="text-xs font-bold text-violet-400 mb-4 uppercase tracking-wider">Empresa</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/nosotros" className="text-sm hover:text-white transition-colors inline-flex items-center group">
                    <Icons.ChevronRight className="w-3.5 h-3.5 mr-1.5 text-gray-700 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/tiendas" className="text-sm hover:text-white transition-colors inline-flex items-center group">
                    <Icons.ChevronRight className="w-3.5 h-3.5 mr-1.5 text-gray-700 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
                    Nuestras tiendas
                  </Link>
                </li>
                <li>
                  <Link href="/sostenibilidad" className="text-sm hover:text-white transition-colors inline-flex items-center group">
                    <Icons.ChevronRight className="w-3.5 h-3.5 mr-1.5 text-gray-700 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
                    Sostenibilidad
                  </Link>
                </li>
              </ul>
            </div>

            {/* Comprar */}
            <div>
              <h3 className="text-xs font-bold text-violet-400 mb-4 uppercase tracking-wider">Comprar</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors inline-flex items-center group"
                    >
                      <Icons.ChevronRight className="w-3.5 h-3.5 mr-1.5 text-gray-700 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ayuda */}
            <div>
              <h3 className="text-xs font-bold text-violet-400 mb-4 uppercase tracking-wider">Ayuda</h3>
              <ul className="space-y-3">
                {helpLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors inline-flex items-center group"
                    >
                      <Icons.ChevronRight className="w-3.5 h-3.5 mr-1.5 text-gray-700 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-bold text-violet-400 mb-4 uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors inline-flex items-center group"
                    >
                      <Icons.ChevronRight className="w-3.5 h-3.5 mr-1.5 text-gray-700 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. FOOTER FINAL - Marca, redes y pago */}
        {/* ============================================================ */}
        <section className="py-8 md:py-10">
          <div className="flex flex-col gap-6">
            
            {/* Logo + Descripción */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1 max-w-md">
                <Link href="/" className="inline-flex items-center gap-3 group mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-violet-500/30">
                    <span className="text-white text-base font-bold">TC</span>
                  </div>
                  <span className="text-white font-bold text-lg">TiendaColchon</span>
                </Link>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  Tu tienda especializada en colchones de calidad. Fabricados en España con los mejores materiales para garantizar tu mejor descanso.
                </p>
                
                {/* Redes sociales */}
                <div className="flex items-center gap-3">
                  {SITE_CONFIG.socialMedia.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-gray-900/50 border border-gray-800/40 flex items-center justify-center text-gray-500 hover:text-violet-400 hover:border-violet-500/40 hover:bg-gray-900/70 transition-all hover:scale-110"
                      aria-label={social.name}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Métodos de pago y confianza */}
              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Métodos de pago</div>
                  <div className="flex flex-wrap items-center gap-2">
                    {['Visa', 'Mastercard', 'PayPal', 'Bizum'].map((method) => (
                      <div
                        key={method}
                        className="px-3 py-1.5 bg-gray-900/50 border border-gray-800/40 rounded-lg text-xs text-gray-400 font-medium hover:border-gray-700/50 transition-colors"
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900/30 rounded-lg border border-gray-800/30">
                    <Icons.Shield className="w-3.5 h-3.5 text-green-500" />
                    <span>Pago 100% seguro</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900/30 rounded-lg border border-gray-800/30">
                    <span className="text-base">🇪🇸</span>
                    <span>Hecho en España</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright y reviews */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-gray-800/40">
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span>© {new Date().getFullYear()} TiendaColchon</span>
                <span className="hidden md:inline">·</span>
                <span className="hidden md:inline">Todos los derechos reservados</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Icons.Star key={i} className="w-4 h-4 text-yellow-500" />
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  4.8/5 · 2,847 opiniones
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}