'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

// ============================================================================
// ICONS - Optimizados
// ============================================================================
const Icons = {
  Shield: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  Truck: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  Return: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
    </svg>
  ),
  CreditCard: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  ),
  Phone: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  WhatsApp: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  ),
  Mail: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  ChevronRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Star: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  Clock: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Fire: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 23a7.5 7.5 0 01-5.138-12.963C8.204 8.774 11.5 6.5 11 1.5c6 4 9 8 3 14 1 0 2.5 0 5-2.47.27.773.5 1.604.5 2.47A7.5 7.5 0 0112 23z" />
    </svg>
  ),
  Tag: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  Moon: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1014 11.69 1 1 0 00-.36-1.05z" />
    </svg>
  ),
  MapPin: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
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
  Youtube: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
}

// ============================================================================
// 🇦🇷 SISTEMA DE CAMPAÑAS ARGENTINA
// ============================================================================
const getCurrentCampaign = () => {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()
  
  // Hot Sale Argentina (Mayo)
  if (month === 5 && day >= 20 && day <= 31) {
    return {
      tagline: 'HOT SALE -40%',
      code: 'HOTSALE40',
      description: 'Descuentos especiales Hot Sale Argentina',
      endDate: new Date(now.getFullYear(), 4, 31, 23, 59, 59),
      showCountdown: true,
      theme: 'hotsale'
    }
  }
  
  // Cyber Monday Argentina (Noviembre)
  if (month === 11 && day >= 1 && day <= 10) {
    return {
      tagline: 'CYBER -45%',
      code: 'CYBER45',
      description: 'Ofertas exclusivas Cyber Monday',
      endDate: new Date(now.getFullYear(), 10, 10, 23, 59, 59),
      showCountdown: true,
      theme: 'cyber'
    }
  }
  
  // Campaña permanente
  return {
    tagline: 'Ofertas fin de año Hasta 50% OFF',
    code: 'VILLAMARIA',
    description: 'Financiación especial',
    endDate: null,
    showCountdown: false,
    theme: 'default'
  }
}

// ============================================================================
// CONFIG ARGENTINA 🇦🇷
// ============================================================================
const campaign = getCurrentCampaign()

const SITE_CONFIG = {
  phone: '+5493531234567',
  phoneDisplay: '353 123-4567',
  whatsappNumber: '5493531234567',
  email: 'info@azulcolchones.com.ar',
  brandName: 'Azul Colchones',
  location: 'Villa María, Córdoba',
  schedule: 'Lun-Vie: 9:00-19:00hs | Sáb: 9:00-13:00hs',
  tagline: campaign.tagline,
  promoCode: campaign.code,
  campaignDescription: campaign.description,
  showCountdown: campaign.showCountdown,
  endDate: campaign.endDate,
  theme: campaign.theme,
  socialMedia: [
    { name: 'Instagram', href: 'https://instagram.com/azulcolchones', icon: Icons.Instagram },
    { name: 'Facebook', href: 'https://facebook.com/azulcolchones', icon: Icons.Facebook },
    { name: 'Youtube', href: 'https://youtube.com/@azulcolchones', icon: Icons.Youtube },
  ]
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function Footer() {
  const pathname = usePathname()
  
  // ✅ TODOS los hooks PRIMERO
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting || submitted) return
    
    setIsSubmitting(true)
    
    // Simulación de envío (reemplazar con tu API)
    setTimeout(() => {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => {
        setSubmitted(false)
        setIsSubmitting(false)
      }, 3000)
    }, 1000)
  }

  const quickLinks = [
    { href: '/catalogo', label: 'Ver Ofertas', hot: true },
    { href: '/guia-compra', label: 'Guía de compra' },
    { href: '/envios', label: 'Envíos y entregas' },
    { href: '/garantia', label: 'Garantía extendida' },
    { href: '/opiniones', label: 'Opiniones' },
  ]

  const helpLinks = [
    { href: '/contacto', label: 'Contacto' },
    { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
    { href: '/simulador', label: 'Test IA Colchones', featured: true },
    { href: '/cuidado-colchon', label: 'Cuidado del Colchon' },
    { href: '/blog', label: 'Blog y consejos' },
  ]

  const legalLinks = [
    { href: '/terminos', label: 'Términos y condiciones' },
    { href: '/privacidad', label: 'Política de privacidad' },
    { href: '/condiciones-compra', label: 'Condiciones de Compra' },
    { href: '/cookies', label: 'Cookies' },
  ]

  const trustBadges = [
    {
      icon: Icons.Shield,
      title: 'Garantía Extendida',
      description: 'Hasta 10 años',
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      icon: Icons.Truck,
      title: 'Envío GRATIS',
      description: 'Villa María y zona',
      gradient: 'from-cyan-600 to-blue-600'
    },
    {
      icon: Icons.CreditCard,
      title: '12 Cuotas Sin Interés',
      description: 'Todas las tarjetas',
      gradient: 'from-purple-600 to-pink-600'
    }
  ]

  // 🚫 Return condicional AL FINAL
  if (pathname?.startsWith('/admin')) {
    return null
  }

  // ✅ Renderizar Footer
  return (
    <footer className="relative bg-zinc-950 text-zinc-400 border-t border-blue-500/20 overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}} />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* BANNER DE CAMPAÑA ARGENTINA 🇦🇷 */}
        <section className="py-8 md:py-10 border-b border-blue-500/10">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-blue-600/20 rounded-2xl p-6 md:p-8 border border-blue-500/30">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,.15)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <Icons.Fire className="w-7 h-7 text-white animate-pulse" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-black text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text mb-1">
                    {SITE_CONFIG.tagline} 🇦🇷
                  </div>
                  <div className="text-sm text-blue-300 font-bold">
                    {SITE_CONFIG.campaignDescription} · Código: <span className="px-2 py-0.5 bg-yellow-500 text-black rounded font-black">{SITE_CONFIG.promoCode}</span>
                  </div>
                </div>
              </div>
              
              <Link 
                href="/catalogo"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                <Icons.Tag className="w-5 h-5" />
                <span>Ver Catálogo</span>
                <Icons.ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* BADGES DE CONFIANZA */}
        <section className="py-10 md:py-14 border-b border-blue-500/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="group relative bg-zinc-900/40 backdrop-blur-sm rounded-xl p-5 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-300" />
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 mb-3 rounded-xl bg-gradient-to-br ${badge.gradient} flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 group-hover:scale-110 transition-all duration-300`}>
                    <badge.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{badge.title}</h4>
                  <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="py-10 md:py-14 border-b border-blue-500/10">
          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-950/30 via-cyan-950/20 to-transparent rounded-2xl p-8 md:p-10 border border-blue-500/30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-600/10 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,.05)_50%,transparent_75%)] bg-[length:200%_200%] animate-shimmer" />
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Icons.Mail className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl md:text-2xl font-black text-white">
                        Newsletter Exclusivo
                      </h3>
                      <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[10px] font-black rounded uppercase animate-pulse">
                        -10%
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-zinc-400">
                      Suscribite y recibí <span className="text-blue-400 font-bold">ofertas exclusivas</span>, consejos para tu mejor descanso y promociones especiales 🇦🇷
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
                      required
                      className="w-full px-5 py-3.5 bg-zinc-900/60 backdrop-blur-sm border border-blue-500/30 rounded-xl text-white text-sm placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <Icons.Mail className="w-4 h-4 text-zinc-700" />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || submitted || !email}
                    className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 whitespace-nowrap"
                  >
                    {submitted ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        ¡Suscripto!
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
                      'Suscribirme Gratis'
                    )}
                  </button>
                </form>
                
                <p className="text-xs text-zinc-600 mt-4 flex items-center gap-1.5">
                  <Icons.Shield className="w-3.5 h-3.5 text-blue-500" />
                  <span>Tus datos están protegidos. Cancelá tu suscripción cuando quieras.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTO DIRECTO ARGENTINA 🇦🇷 */}
        <section className="py-10 md:py-14 border-b border-blue-500/10">
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('¡Hola! Me interesa conocer más sobre los colchones')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-300" />
              
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110">
                  <Icons.WhatsApp className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-emerald-400 mb-1 uppercase tracking-wide">Consultá por WhatsApp</div>
                  <div className="text-xl font-black text-white mb-1 group-hover:text-emerald-300 transition-colors">{SITE_CONFIG.phoneDisplay}</div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Icons.Clock className="w-3.5 h-3.5" />
                    <span>{SITE_CONFIG.schedule}</span>
                  </div>
                </div>
                <Icons.ChevronRight className="w-5 h-5 text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>
            </a>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="group relative overflow-hidden bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-300" />
              
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                  <Icons.Phone className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-blue-400 mb-1 uppercase tracking-wide">Llamanos Ahora</div>
                  <div className="text-xl font-black text-white mb-1 truncate group-hover:text-blue-300 transition-colors">{SITE_CONFIG.phoneDisplay}</div>
                  <div className="text-xs text-zinc-500">Atención personalizada</div>
                </div>
                <Icons.ChevronRight className="w-5 h-5 text-zinc-700 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </a>

          </div>
        </section>

        {/* ENLACES ÚTILES */}
        <section className="py-10 md:py-14 border-b border-blue-500/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            <div>
              <h3 className="text-xs font-black text-blue-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
                Empresa
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/nosotros" className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center group">
                    <Icons.ChevronRight className="w-3.5 h-3.5 mr-1.5 text-zinc-800 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    <span>Sobre nosotros</span>
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center group">
                    <Icons.ChevronRight className="w-3.5 h-3.5 mr-1.5 text-zinc-800 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    <span>Login</span>
                  </Link>
                </li>
                <li>
                  <Link href="/aviso-legal" className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center group">
                    <Icons.ChevronRight className="w-3.5 h-3.5 mr-1.5 text-zinc-800 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    <span>Aviso Legal</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-black text-blue-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
                Comprar
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center group"
                    >
                      <Icons.ChevronRight className="w-3.5 h-3.5 mr-1.5 text-zinc-800 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                      <span>{link.label}</span>
                      {link.hot && (
                        <span className="ml-1.5 px-1.5 py-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-[8px] font-black rounded uppercase">
                          HOT
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-black text-blue-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
                Ayuda
              </h3>
              <ul className="space-y-3">
                {helpLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center group"
                    >
                      <Icons.ChevronRight className="w-3.5 h-3.5 mr-1.5 text-zinc-800 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                      <span>{link.label}</span>
                      {link.featured && (
                        <span className="ml-1.5 px-1.5 py-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[8px] font-black rounded uppercase">
                          IA
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-black text-blue-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
                Legal
              </h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center group"
                    >
                      <Icons.ChevronRight className="w-3.5 h-3.5 mr-1.5 text-zinc-800 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FOOTER FINAL 🇦🇷 */}
        <section className="py-8 md:py-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1 max-w-md">
                <Link href="/" className="inline-flex items-center gap-3 group mb-4">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/50">
                      <Icons.Moon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-blue-400/30 blur-md -z-10 animate-pulse-glow" />
                  </div>
                  <div>
                    <div className="text-lg font-black leading-none tracking-tight">
                      <span className="text-white">Azul</span>
                      <span className="text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text">Colchones</span>
                    </div>
                    <div className="text-[9px] font-black text-blue-400 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                      <Icons.MapPin className="w-2.5 h-2.5" />
                      <span>{SITE_CONFIG.location}</span>
                    </div>
                  </div>
                </Link>
                <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                  Tu tienda de colchones premium en Villa María, Córdoba. Más de 35 años de experiencia ofreciendo calidad y confort para tu mejor descanso 🇦🇷
                </p>
                
                <div className="flex items-center gap-3 mb-4">
                  {SITE_CONFIG.socialMedia.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-zinc-900/50 border border-blue-500/20 flex items-center justify-center text-zinc-600 hover:text-blue-400 hover:border-blue-500/50 hover:bg-zinc-900/70 transition-all hover:scale-110 shadow-lg hover:shadow-blue-500/20"
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>

                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1.5"
                >
                  <Icons.Mail className="w-3.5 h-3.5" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-xs font-bold text-blue-400 mb-3 uppercase tracking-wide">Métodos de pago 🇦🇷</div>
                  <div className="flex flex-wrap items-center gap-2">
                    {['Mercado Pago', 'Transferencia', 'Visa', 'Mastercard', 'Efectivo'].map((method) => (
                      <div
                        key={method}
                        className="px-3 py-2 bg-zinc-900/50 border border-blue-500/20 rounded-lg text-xs text-zinc-400 font-semibold hover:border-blue-500/40 hover:text-blue-300 transition-all"
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                    <Icons.Shield className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 font-bold">Compra 100% segura</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 rounded-xl border border-blue-500/30">
                    <span className="text-lg">🇦🇷</span>
                    <span className="text-blue-300 font-bold">Hecho en Argentina</span>
                  </div>
                  <a
                    href="https://www.argentina.gob.ar/produccion/defensadelconsumidor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-zinc-900/50 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all"
                  >
                    <span className="text-blue-300 font-bold text-[10px]">Defensa del Consumidor</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-blue-500/10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-zinc-600">
                <span className="font-medium">© {new Date().getFullYear()} Azul Colchones</span>
                <span className="hidden sm:inline text-zinc-800">·</span>
                <span>Villa María, Córdoba, Argentina</span>
                <span className="hidden sm:inline text-zinc-800">·</span>
                <span className="text-blue-500 font-medium">{SITE_CONFIG.tagline}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Icons.Star key={i} className="w-4 h-4 text-yellow-500" />
                  ))}
                </div>
                <span className="text-xs text-zinc-500 font-medium">
                  <span className="text-white font-bold">4.9</span>/5 · 1,234 opiniones
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s linear infinite; }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-slow,
          .animate-pulse-glow,
          .animate-shimmer { animation: none !important; }
        }

        @supports (scrollbar-width: thin) {
          * {
            scrollbar-width: thin;
            scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
          }
        }
      `}</style>
    </footer>
  )
}