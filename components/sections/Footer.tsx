'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

// ============================================================================
// ICONS - Inline SVG (0KB bundle)
// ============================================================================
const Icons = {
  Mail: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  ),
  Phone: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
  ),
  MapPin: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  ),
  Facebook: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  ),
  Instagram: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
  ),
  Twitter: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  ),
  Youtube: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  ),
  Sparkles: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  ),
  Shield: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  ),
  Star: ({ className = "w-4 h-4", filled = false }: { className?: string; filled?: boolean }) => (
    <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
  ),
  Moon: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1014 11.69 1 1 0 00-.36-1.05z" /></svg>
  ),
  Leaf: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  ),
  Heart: ({ className = "w-3 h-3" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
  ),
  Send: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
  ),
  Check: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  ),
  ChevronDown: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
  ),
  ArrowRight: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
  ),
  Truck: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
  ),
}

// ============================================================================
// CONFIG - Copy estratégico optimizado
// ============================================================================
const SITE_CONFIG = {
  phone: '+34900123456',
  phoneDisplay: '900 123 456',
  email: 'hola@tiendacolchon.es',
  address: {
    street: 'Calle del Descanso 123',
    city: 'Madrid',
    postalCode: '28001',
  },
  social: {
    facebook: 'https://facebook.com/tiendacolchon',
    instagram: 'https://instagram.com/tiendacolchon',
    twitter: 'https://twitter.com/tiendacolchon',
    youtube: 'https://youtube.com/@tiendacolchon',
  },
  rating: '4.9',
  reviewCount: '3,247',
}

// ============================================================================
// CUSTOM HOOKS
// ============================================================================
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
      }
    }, { threshold: 0.1, ...options })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isInView }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  
  const { ref: ctaRef, isInView: ctaInView } = useInView()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
    setIsSubmitting(false)
  }

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  // Copy psicológico optimizado - Menos es más
  const footerSections = [
    {
      id: 'products',
      title: 'Productos',
      icon: Icons.Moon,
      links: [
        { href: '/colchones', label: 'Todos los Colchones' },
        { href: '/viscoelasticos', label: 'Viscoelásticos' },
        { href: '/muelles-ensacados', label: 'Muelles Ensacados' },
        { href: '/almohadas', label: 'Almohadas' },
        { href: '/ofertas', label: 'Ofertas' },
      ]
    },
    {
      id: 'help',
      title: 'Ayuda',
      icon: Icons.Shield,
      links: [
        { href: '/garantia', label: 'Garantía 3 Años' },
        { href: '/envios', label: 'Envíos y Entregas' },
        { href: '/devoluciones', label: 'Devoluciones' },
        { href: '/financiacion', label: 'Financiación' },
        { href: '/contacto', label: 'Contacto' },
      ]
    },
    {
      id: 'company',
      title: 'Empresa',
      icon: Icons.Sparkles,
      links: [
        { href: '/nosotros', label: 'Sobre Nosotros' },
        { href: '/blog', label: 'Blog del Sueño' },
        { href: '/opiniones', label: 'Opiniones' },
        { href: '/showroom', label: 'Showroom' },
      ]
    },
  ]

  const trustBadges = [
    { 
      icon: Icons.Truck, 
      text: 'Envío 24-48h', 
      subtext: 'Gratis',
      color: 'text-blue-400',
    },
    { 
      icon: Icons.Shield, 
      text: 'Garantía 3 años', 
      subtext: 'Sin letra pequeña',
      color: 'text-emerald-400',
    },
    { 
      icon: Icons.Leaf, 
      text: 'Fabricado en España', 
      subtext: 'Calidad europea',
      color: 'text-purple-400',
    },
    { 
      icon: Icons.Star, 
      text: `${SITE_CONFIG.reviewCount} opiniones`, 
      subtext: '4.9/5 estrellas',
      color: 'text-amber-400',
    },
  ]

  const socialLinks = [
    { icon: Icons.Facebook, href: SITE_CONFIG.social.facebook, label: 'Facebook' },
    { icon: Icons.Instagram, href: SITE_CONFIG.social.instagram, label: 'Instagram' },
    { icon: Icons.Twitter, href: SITE_CONFIG.social.twitter, label: 'Twitter' },
    { icon: Icons.Youtube, href: SITE_CONFIG.social.youtube, label: 'YouTube' },
  ]

  return (
    <footer className="relative bg-zinc-950 text-gray-300 overflow-hidden">
      {/* Gradiente sutil de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/3 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ============================================================ */}
        {/* NEWSLETTER - Copy optimizado, sin saturar */}
        {/* ============================================================ */}
        <section className="py-16 lg:py-20 border-b border-gray-800/30">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6">
              <Icons.Sparkles className="w-4 h-4" />
              <span>5% descuento exclusivo</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
              Duerme mejor cada noche
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Guías de descanso y ofertas que solo recibirás aquí
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <Icons.Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-[1.02]"
                >
                  {submitted ? (
                    <>
                      <Icons.Check className="w-5 h-5" />
                      <span className="hidden sm:inline">¡Listo!</span>
                    </>
                  ) : isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Icons.Send className="w-5 h-5" />
                      <span className="hidden sm:inline">Suscribir</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-left">
                Sin spam. Cancela cuando quieras.
              </p>
            </form>
          </div>
        </section>

        {/* ============================================================ */}
        {/* MAIN CONTENT - Espaciado generoso */}
        {/* ============================================================ */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* BRAND COLUMN */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block group mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all group-hover:scale-105">
                    <Icons.Moon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold leading-none text-white">
                      TiendaColchon
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium tracking-wider uppercase mt-1">
                      Descanso premium
                    </div>
                  </div>
                </div>
              </Link>

              <p className="text-gray-400 leading-relaxed mb-8">
                Colchones premium diseñados en España con tecnología europea. 
                Más de 15 años mejorando el descanso de miles de familias.
              </p>

              {/* Social */}
              <div className="flex items-center gap-2 mb-10">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-900/50 border border-gray-800/50 flex items-center justify-center transition-all hover:bg-purple-500/10 hover:border-purple-500/30 hover:scale-110 hover:-rotate-6 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    aria-label={social.label}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>

              {/* Contact Info - Sin saturar */}
              <div className="space-y-4">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 text-sm hover:text-purple-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <Icons.Phone className="text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Llámanos</div>
                    <div className="font-semibold text-white">{SITE_CONFIG.phoneDisplay}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-sm hover:text-purple-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Icons.Mail className="text-blue-400 w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Escríbenos</div>
                    <div className="font-medium">{SITE_CONFIG.email}</div>
                  </div>
                </a>
              </div>
            </div>

            {/* LINKS COLUMNS - Desktop */}
            <nav className="hidden lg:grid lg:col-span-8 grid-cols-3 gap-12">
              {footerSections.map((section) => (
                <div key={section.id}>
                  <div className="flex items-center gap-2 mb-6">
                    <section.icon className="w-5 h-5 text-purple-400" />
                    <h3 className="text-white font-bold">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors text-sm inline-block relative group"
                        >
                          {link.label}
                          <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-transparent group-hover:w-full transition-all duration-300" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* ACCORDION - Mobile */}
            <div className="lg:hidden space-y-3">
              {footerSections.map((section) => (
                <div
                  key={section.id}
                  className="border border-gray-800/30 rounded-xl overflow-hidden bg-gray-900/20"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-900/40 transition-colors"
                    aria-expanded={openSection === section.id}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="w-5 h-5 text-purple-400" />
                      <span className="text-white font-bold">{section.title}</span>
                    </div>
                    <Icons.ChevronDown 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        openSection === section.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection === section.id ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <ul className="p-4 pt-0 space-y-3">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TRUST BADGES - Espaciado aumentado */}
        {/* ============================================================ */}
        <section className="py-10 border-y border-gray-800/30">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div
                key={badge.text}
                className="flex flex-col items-center gap-3 p-5 bg-gray-900/20 border border-gray-800/30 rounded-xl hover:border-gray-700/50 transition-all hover:scale-105 hover:-translate-y-1 cursor-default"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0
                }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center ${badge.color}`}>
                  <badge.icon />
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-white mb-0.5">
                    {badge.text}
                  </div>
                  <div className="text-xs text-gray-500">
                    {badge.subtext}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* CTA - Psicología de urgencia sin saturar */}
        {/* ============================================================ */}
        <section className="py-12" ref={ctaRef}>
          <Link href="/test-colchon" className="block group">
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600/10 via-purple-500/10 to-purple-600/10 border border-purple-500/20 hover:border-purple-500/40 transition-all p-8 lg:p-10 ${ctaInView ? 'animate-fadeInScale' : 'opacity-0'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all group-hover:scale-110 group-hover:rotate-6">
                    <Icons.Sparkles className="w-8 h-8 text-white animate-pulse-slow" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-xl mb-1">
                      ¿Cuál es tu colchón ideal?
                    </h2>
                    <p className="text-gray-400">
                      Test personalizado · 2 minutos
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all group-hover:scale-105">
                  <span>Hacer el test</span>
                  <Icons.ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* ============================================================ */}
        {/* BOTTOM BAR - Limpio y espacioso */}
        {/* ============================================================ */}
        <div className="py-10 border-t border-gray-800/30">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
            <div className="text-sm text-gray-500 text-center lg:text-left">
              <p className="mb-1">
                © {new Date().getFullYear()} <span className="text-gray-400 font-semibold">TiendaColchon.es</span>
              </p>
              <p className="text-xs flex items-center justify-center lg:justify-start gap-1.5">
                Hecho con <Icons.Heart className="text-red-500 inline animate-pulse-slow" /> en España
              </p>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/privacidad" className="text-gray-500 hover:text-purple-400 transition-colors">
                Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-500 hover:text-purple-400 transition-colors">
                Términos
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-purple-400 transition-colors">
                Cookies
              </Link>
              <Link href="/sitemap.xml" className="text-gray-500 hover:text-purple-400 transition-colors">
                Sitemap
              </Link>
            </nav>
          </div>

          {/* Rating con microdata */}
          <div className="flex items-center justify-center gap-2 text-sm">
            <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
  <span
    key={i}
    style={{
      animation: `starFill 0.3s ease-out ${i * 0.1}s forwards`,
      opacity: 0
    }}
  >
    <Icons.Star className="w-4 h-4 text-amber-400" filled />
  </span>
))}
            </div>
            <span className="text-gray-400">
              <strong className="text-white">{SITE_CONFIG.rating}/5</strong> · {SITE_CONFIG.reviewCount} opiniones
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CSS ANIMATIONS - Sutiles y profesionales */}
      {/* ============================================================ */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes starFill {
          from {
            opacity: 0;
            transform: scale(0.8) rotate(-30deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Mejoras de accesibilidad */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Focus visible mejorado */
        :focus-visible {
          outline: 2px solid rgb(168 85 247);
          outline-offset: 3px;
          border-radius: 0.5rem;
        }

        /* Smooth hover en links */
        a {
          -webkit-tap-highlight-color: transparent;
        }

        /* Optimización de rendering */
        .container {
          contain: layout style paint;
        }
      `}</style>
    </footer>
  )
}