'use client'

import Link from 'next/link'
import { useState } from 'react'

// ✅ MEJORA: Iconos SVG inline (0KB extra vs 20KB Lucide)
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
  Clock: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
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
}

// ✅ SEO: Configuración centralizada
const SITE_CONFIG = {
  phone: '+34900123456',
  phoneDisplay: '900 123 456',
  email: 'hola@tiendacolchon.es',
  address: {
    street: 'Calle del Descanso 123',
    city: 'Madrid',
    postalCode: '28001',
    country: 'España'
  },
  social: {
    facebook: 'https://facebook.com/tiendacolchon',
    instagram: 'https://instagram.com/tiendacolchon',
    twitter: 'https://twitter.com/tiendacolchon',
    youtube: 'https://youtube.com/@tiendacolchon',
  },
  rating: '4.9',
  reviewCount: '3247',
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // ✅ INTEGRACIÓN REAL: Enviar a tu backend o servicio de email marketing
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        setSubmitted(true)
        setEmail('')
        
        // ✅ ANALYTICS: Track conversion
        if (typeof window !== 'undefined' && 'gtag' in window) {
          (window as any).gtag('event', 'newsletter_subscription', {
            event_category: 'engagement',
            event_label: email,
          })
        }
        
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch (error) {
      console.error('Newsletter error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  // ✅ SEO: Enlaces con keywords descriptivas y URLs optimizadas
  const footerSections = [
    {
      id: 'mattresses',
      title: 'Colchones',
      icon: Icons.Moon,
      links: [
        { href: '/colchones', label: 'Todos los Colchones', seo: 'Ver catálogo completo de colchones premium' },
        { href: '/colchones-viscoelasticos', label: 'Colchones Viscoelásticos', seo: 'Colchones viscoelásticos de alta densidad' },
        { href: '/colchones-muelles-ensacados', label: 'Muelles Ensacados', seo: 'Colchones con muelles ensacados independientes' },
        { href: '/colchones-firmeza-media', label: 'Firmeza Media', seo: 'Colchones de firmeza media adaptable' },
        { href: '/colchones-firmeza-alta', label: 'Firmeza Alta', seo: 'Colchones firmes para soporte lumbar' },
        { href: '/colchones-ortopedicos', label: 'Ortopédicos', seo: 'Colchones ortopédicos terapéuticos' },
        { href: '/comparador-colchones', label: 'Comparador', seo: 'Comparar modelos de colchones' },
      ]
    },
    {
      id: 'support',
      title: 'Garantías y Servicios',
      icon: Icons.Shield,
      links: [
        { href: '/garantia-10-anos', label: 'Garantía 10 Años', seo: 'Garantía extendida sin coste adicional' },
        { href: '/prueba-100-noches', label: 'Prueba 100 Noches', seo: '100 noches de prueba sin riesgo' },
        { href: '/envio-gratis-24h', label: 'Envío Gratis 24-48h', seo: 'Envío gratuito península' },
        { href: '/financiacion-sin-intereses', label: 'Financiación 0%', seo: 'Financia tu colchón sin intereses' },
        { href: '/devolucion-gratuita', label: 'Devolución Gratuita', seo: 'Devolución 100% del dinero' },
        { href: '/contacto', label: 'Asesoramiento Experto', seo: 'Contacta con nuestros expertos' },
      ]
    },
    {
      id: 'company',
      title: 'Empresa',
      icon: Icons.Sparkles,
      links: [
        { href: '/sobre-nosotros', label: 'Sobre Nosotros', seo: 'Conoce TiendaColchon' },
        { href: '/guia-del-sueno', label: 'Blog y Guías', seo: 'Artículos sobre descanso saludable' },
        { href: '/tecnologia-colchones', label: 'Nuestra Tecnología', seo: 'Innovación en materiales' },
        { href: '/showroom-madrid', label: 'Showroom Madrid', seo: 'Visita nuestro showroom' },
        { href: '/opiniones-clientes', label: 'Opiniones Verificadas', seo: 'Lee opiniones reales' },
        { href: '/trabaja-con-nosotros', label: 'Trabaja con Nosotros', seo: 'Únete al equipo' },
      ]
    },
  ]

  const trustBadges = [
    { 
      icon: Icons.Leaf, 
      text: 'Fabricación Española', 
      color: 'text-emerald-400',
    },
    { 
      icon: Icons.Shield, 
      text: 'Garantía 10 Años', 
      color: 'text-blue-400',
    },
    { 
      icon: Icons.Moon, 
      text: 'Prueba 100 Noches', 
      color: 'text-purple-400',
    },
    { 
      icon: Icons.Star, 
      text: `${SITE_CONFIG.reviewCount}+ Clientes Felices`, 
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
    <footer className="relative bg-zinc-950 text-gray-300 overflow-hidden" role="contentinfo">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" aria-hidden="true" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* ✅ SEO: Newsletter con heading descriptivo */}
        <section
          className="py-12 lg:py-16 border-b border-gray-800/50"
          aria-labelledby="newsletter-heading"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-4">
                  <Icons.Sparkles className="w-4 h-4" />
                  <span>Exclusivo Suscriptores</span>
                </div>
                <h2 id="newsletter-heading" className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  Mejora tu descanso con nuestra guía experta
                </h2>
                <p className="text-gray-400 text-sm lg:text-base">
                  Consejos de salud postural, ciencia del sueño y ofertas exclusivas cada semana
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="relative"
                aria-label="Formulario de suscripción al newsletter"
              >
                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <Icons.Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      aria-label="Tu dirección de correo electrónico"
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    aria-label={submitted ? 'Suscrito correctamente' : isSubmitting ? 'Enviando' : 'Suscribirse'}
                    className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                  >
                    {submitted ? (
                      <>
                        <Icons.Check />
                        <span className="hidden sm:inline">¡Listo!</span>
                      </>
                    ) : isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Icons.Send />
                        <span className="hidden sm:inline">Suscribir</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  🔒 Tus datos están seguros. Cancela cuando quieras.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-6" aria-label="TiendaColchon - Ir a inicio">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Icons.Moon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold leading-none">
                      <span className="text-white">Tienda</span>
                      <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Colchon</span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium tracking-wider uppercase mt-0.5">
                      Descanso premium
                    </div>
                  </div>
                </div>
              </Link>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Especialistas en colchones viscoelásticos premium fabricados en España. Tecnología avanzada y materiales certificados para revolucionar tu descanso.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-2 mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-900/50 border border-gray-800/50 flex items-center justify-center transition-all hover:bg-purple-500/10 hover:border-purple-500/30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    aria-label={`Síguenos en ${social.label}`}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>

              {/* ✅ SEO: Contact info con schema markup */}
              <div className="space-y-3" itemScope itemType="https://schema.org/LocalBusiness">
                <meta itemProp="name" content="TiendaColchon" />
                <meta itemProp="image" content="https://tiendacolchon.es/logo.png" />
                
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 text-sm hover:text-purple-400 transition-colors group"
                  aria-label={`Llamar al ${SITE_CONFIG.phoneDisplay}`}
                  itemProp="telephone"
                >
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <Icons.Phone className="text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Asesoramiento gratuito</div>
                    <div className="font-semibold text-white">{SITE_CONFIG.phoneDisplay}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-sm hover:text-purple-400 transition-colors group"
                  aria-label={`Enviar email a ${SITE_CONFIG.email}`}
                  itemProp="email"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Icons.Mail className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Email directo</div>
                    <div className="font-medium">{SITE_CONFIG.email}</div>
                  </div>
                </a>

                <div className="flex items-start gap-3 text-sm" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Icons.MapPin className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Showroom & Taller</div>
                    <address className="text-gray-300 leading-relaxed not-italic">
                      <span itemProp="streetAddress">{SITE_CONFIG.address.street}</span><br />
                      <span itemProp="postalCode">{SITE_CONFIG.address.postalCode}</span> <span itemProp="addressLocality">{SITE_CONFIG.address.city}</span>, <span itemProp="addressCountry">{SITE_CONFIG.address.country}</span>
                    </address>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Columns - Desktop */}
            <nav className="hidden lg:grid lg:col-span-8 grid-cols-3 gap-8" aria-label="Enlaces del sitio">
              {footerSections.map((section) => (
                <div key={section.id}>
                  <div className="flex items-center gap-2 mb-6">
                    <section.icon className="w-5 h-5 text-purple-400" aria-hidden="true" />
                    <h3 className="text-white font-bold text-lg">{section.title}</h3>
                  </div>
                  <ul className="space-y-3" role="list">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors text-sm inline-block relative group"
                          title={link.seo}
                        >
                          {link.label}
                          <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Mobile Accordion */}
            <div className="lg:hidden space-y-2">
              {footerSections.map((section) => (
                <div
                  key={section.id}
                  className="border border-gray-800/50 rounded-xl overflow-hidden bg-gray-900/30"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-900/50 transition-colors"
                    aria-expanded={openSection === section.id}
                    aria-controls={`footer-section-${section.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="w-5 h-5 text-purple-400" aria-hidden="true" />
                      <span className="text-white font-bold">{section.title}</span>
                    </div>
                    <Icons.ChevronDown 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        openSection === section.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <div
                    id={`footer-section-${section.id}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection === section.id ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <ul className="p-4 pt-0 space-y-3" role="list">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                            title={link.seo}
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

        {/* Trust Badges */}
        <section
          className="py-8 border-y border-gray-800/50"
          aria-label="Garantías y beneficios"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {trustBadges.map((badge) => (
              <div
                key={badge.text}
                className="flex flex-col sm:flex-row items-center gap-3 p-4 bg-gray-900/30 border border-gray-800/50 rounded-xl hover:border-gray-700/50 transition-all hover:scale-105"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center flex-shrink-0">
                  <badge.icon className={badge.color} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center sm:text-left">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ SEO: CTA con keywords */}
        <section className="py-10" aria-labelledby="cta-heading">
          <Link 
            href="/test-colchon-personalizado" 
            className="block"
            title="Descubre tu colchón ideal con nuestro test personalizado con IA"
          >
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 border border-purple-500/20 hover:border-purple-500/40 transition-all p-6 lg:p-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Icons.Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 id="cta-heading" className="text-white font-bold text-lg mb-1">
                      ¿No sabes qué colchón elegir?
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Test personalizado con IA · Resultados en 2 minutos
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all">
                  <span>Encontrar Mi Colchón</span>
                  <Icons.ArrowRight />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-800/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 text-center lg:text-left">
              <p>
                © {new Date().getFullYear()} <span className="text-gray-400 font-semibold">TiendaColchon</span>. Todos los derechos reservados.
              </p>
              <p className="text-xs mt-1">
                Diseñado y fabricado con <Icons.Heart className="w-3 h-3 text-red-500" /> en España
              </p>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-sm" aria-label="Enlaces legales">
              <Link
                href="/politica-privacidad"
                className="text-gray-500 hover:text-purple-400 transition-colors"
              >
                Privacidad
              </Link>
              <span className="text-gray-800" aria-hidden="true">•</span>
              <Link
                href="/terminos-condiciones"
                className="text-gray-500 hover:text-purple-400 transition-colors"
              >
                Términos
              </Link>
              <span className="text-gray-800" aria-hidden="true">•</span>
              <Link
                href="/politica-cookies"
                className="text-gray-500 hover:text-purple-400 transition-colors"
              >
                Cookies
              </Link>
              <span className="text-gray-800" aria-hidden="true">•</span>
              <Link
                href="/accesibilidad"
                className="text-gray-500 hover:text-purple-400 transition-colors"
              >
                Accesibilidad
              </Link>
              <span className="text-gray-800" aria-hidden="true">•</span>
              <Link
                href="/sitemap.xml"
                className="text-gray-500 hover:text-purple-400 transition-colors"
              >
                Sitemap
              </Link>
            </nav>
          </div>

          {/* ✅ SEO: Rating with microdata */}
          <div
            className="mt-6 flex items-center justify-center gap-2 text-sm"
            itemScope
            itemType="https://schema.org/AggregateRating"
          >
            <div className="flex items-center gap-1" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Icons.Star
                  key={i}
                  className="w-4 h-4 text-amber-400"
                  filled
                />
              ))}
            </div>
            <span className="text-gray-400">
              <strong className="text-white font-semibold">
                <span itemProp="ratingValue">{SITE_CONFIG.rating}</span>/<span itemProp="bestRating">5</span>
              </strong> basado en{' '}
              <strong className="text-white font-semibold">
                <span itemProp="reviewCount">{SITE_CONFIG.reviewCount}</span> opiniones
              </strong> verificadas
            </span>
          </div>

          {/* ✅ SEO: Certificaciones y badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 opacity-60">
            <img 
              src="/badges/ssl-secure.svg" 
              alt="Certificado SSL - Conexión segura" 
              width="80" 
              height="30"
              className="h-8 w-auto"
            />
            <img 
              src="/badges/fabricado-espana.svg" 
              alt="Fabricado en España - Producto nacional" 
              width="80" 
              height="30"
              className="h-8 w-auto"
            />
            <img 
              src="/badges/pago-seguro.svg" 
              alt="Pagos seguros - Certificado PCI DSS" 
              width="80" 
              height="30"
              className="h-8 w-auto"
            />
            <img 
              src="/badges/eco-friendly.svg" 
              alt="Materiales ecológicos certificados" 
              width="80" 
              height="30"
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>

      {/* ✅ CSS Animations - Pure CSS (no Framer Motion) */}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Accessibility: Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-spin,
          .transition-all,
          .transition-transform,
          .transition-colors {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Focus visible for accessibility */
        :focus-visible {
          outline: 2px solid rgb(168 85 247);
          outline-offset: 2px;
        }
      `}</style>
    </footer>
  )
}