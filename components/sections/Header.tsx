'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback, useMemo } from 'react'

// ✅ Iconos inline SVG optimizados
const Icons = {
  ShoppingCart: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Menu: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  X: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Phone: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  User: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Shield: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Truck: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
  Sparkles: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Brain: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Zap: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Moon: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1014 11.69 1 1 0 00-.36-1.05z" />
    </svg>
  ),
}

// ✅ CONFIGURACIÓN HONESTA - Sin datos falsos
const SITE_CONFIG = {
  phone: '+34981123456', // Cambiar por tu número real
  phoneDisplay: '981 12 34 56',
  brandName: 'Descanso Premium',
  tagline: 'Calidad certificada',
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 20
    if (isScrolled !== scrolled) setScrolled(isScrolled)
  }, [scrolled])

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), [])
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isMenuOpen])

  const navLinks = useMemo(() => [
    { href: '/catalogo', label: 'Colchones', icon: 'catalog' },
    { href: '/simulador', label: 'Test IA', icon: 'ai', featured: true },
    { href: '/comparador', label: 'Comparar', icon: 'compare' },
    { href: '/blog', label: 'Guía', icon: 'blog' },
  ], [])

  return (
    <>
      {/* ============================================================ */}
      {/* TOP BAR - HONESTO Y PREMIUM */}
      {/* ============================================================ */}
      <div className="relative bg-gradient-to-r from-zinc-950 via-purple-950/50 to-zinc-950 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.1),transparent_60%)] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between py-2.5 text-xs">
            {/* Desktop badges - HONESTOS */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <Icons.Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-medium">
                  <strong className="text-white">Envío gratuito</strong> península
                </span>
              </div>
              <div className="w-px h-3.5 bg-white/10" />
              <div className="flex items-center gap-2 text-zinc-400">
                <Icons.Truck className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-medium">
                  <strong className="text-white">Entrega</strong> 24-48h
                </span>
              </div>
              <div className="w-px h-3.5 bg-white/10" />
              <div className="flex items-center gap-2 text-zinc-400">
                <Icons.Zap className="w-3.5 h-3.5 text-violet-400" />
                <span className="font-medium">
                  <strong className="text-white">Asesoramiento</strong> personalizado
                </span>
              </div>
            </div>

            {/* Mobile badges - COMPACTOS */}
            <div className="flex md:hidden items-center gap-3 text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Icons.Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-white text-xs">Envío gratis</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Icons.Truck className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-white text-xs">24-48h</span>
              </div>
            </div>
            
            {/* Phone CTA */}
            <div className="flex items-center gap-3 ml-auto">
              <a 
                href={`tel:${SITE_CONFIG.phone}`} 
                className="flex items-center gap-1.5 text-zinc-300 hover:text-violet-300 transition-colors font-semibold group"
              >
                <Icons.Phone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">{SITE_CONFIG.phoneDisplay}</span>
                <span className="sm:hidden">Llamar</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* HEADER PRINCIPAL - PREMIUM DESIGN */}
      {/* ============================================================ */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled 
          ? 'bg-zinc-950/95 border-b border-white/10 shadow-2xl shadow-violet-500/5' 
          : 'bg-zinc-950/90 border-b border-white/5'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />

        <nav className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* ============================================================ */}
            {/* LOGO PREMIUM */}
            {/* ============================================================ */}
            <Link href="/" className="group relative flex-shrink-0 z-50">
              <div className="flex items-center gap-2.5 md:gap-3 transition-transform group-hover:scale-[1.02]">
                {/* Icon */}
                <div className="relative">
                  <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                    <Icons.Moon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-violet-400/30 blur-md -z-10 animate-pulse-glow" />
                </div>
                
                {/* Brand text */}
                <div className="flex flex-col">
                  <div className="text-lg md:text-xl font-black leading-none tracking-tight">
                    <span className="text-white">Descanso</span>
                    <span className="text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text">Premium</span>
                  </div>
                  <div className="text-[9px] md:text-[10px] text-zinc-500 font-semibold tracking-wider uppercase mt-0.5">
                    {SITE_CONFIG.tagline}
                  </div>
                </div>
              </div>
            </Link>

            {/* ============================================================ */}
            {/* DESKTOP NAV - CLEAN & MINIMAL */}
            {/* ============================================================ */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={`relative group px-4 py-2.5 rounded-lg transition-all ${
                      link.featured 
                        ? 'bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 border border-violet-500/20' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <span className={`font-semibold text-sm transition-colors ${
                      link.featured 
                        ? 'text-violet-300 group-hover:text-violet-200' 
                        : 'text-zinc-300 group-hover:text-white'
                    }`}>
                      {link.label}
                    </span>
                    {link.featured && (
                      <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[8px] font-black rounded uppercase tracking-wider shadow-lg">
                        IA
                      </span>
                    )}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* ============================================================ */}
            {/* ACTIONS - PREMIUM CTAs */}
            {/* ============================================================ */}
            <div className="flex items-center gap-2">
              {/* Phone CTA - Desktop only */}
              <a 
                href={`tel:${SITE_CONFIG.phone}`} 
                className="hidden xl:flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white rounded-xl font-semibold text-sm transition-all group"
              >
                <Icons.Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Asesor experto</span>
              </a>

              {/* Account - Hidden mobile */}
              <Link 
                href="/mi-cuenta" 
                className="hidden md:flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
              >
                <Icons.User className="w-4 h-4 md:w-5 md:h-5 text-zinc-300 group-hover:text-white transition-colors" />
              </Link>

              {/* Cart */}
              <Link 
                href="/carrito" 
                className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
              >
                <Icons.ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-zinc-300 group-hover:text-white transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-violet-500/50 animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Test CTA - Premium */}
              <Link 
                href="/simulador" 
                className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-violet-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <Icons.Brain className="w-4 h-4" />
                <span>Test Gratis</span>
              </Link>

              {/* Mobile menu toggle */}
              <button 
                onClick={toggleMenu} 
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 transition-all relative z-[60] hover:bg-white/10" 
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMenuOpen ? (
                  <Icons.X className="w-5 h-5 text-zinc-300" />
                ) : (
                  <Icons.Menu className="w-5 h-5 text-zinc-300" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ============================================================ */}
      {/* MOBILE MENU - PREMIUM FULLSCREEN */}
      {/* ============================================================ */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            onClick={closeMenu} 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm lg:hidden animate-fade-in"
            style={{ zIndex: 9998 }}
          />

          {/* Menu Panel */}
          <div 
            className="fixed inset-0 lg:hidden flex flex-col animate-slide-up"
            style={{ zIndex: 9999 }}
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-zinc-950/98 backdrop-blur-xl border-b border-white/10">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg">
                      <Icons.Moon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-base font-black text-white">Menú</div>
                      <div className="text-[9px] text-zinc-500 uppercase tracking-wider">Navegación</div>
                    </div>
                  </div>
                  <button 
                    onClick={closeMenu} 
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
                    aria-label="Cerrar menú"
                  >
                    <Icons.X className="w-5 h-5 text-zinc-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-950 to-zinc-900">
              <div className="container mx-auto px-4 py-6 pb-safe">
                {/* Quick Actions - HONESTAS */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Link 
                    href="/simulador" 
                    onClick={closeMenu} 
                    className="relative overflow-hidden rounded-2xl active:scale-95 transition-transform shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-600" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
                    <div className="relative flex flex-col items-center justify-center p-6 text-white">
                      <Icons.Brain className="w-8 h-8 mb-2 drop-shadow-lg" />
                      <span className="text-base font-black mb-1">Test Gratis</span>
                      <span className="text-xs text-violet-100 font-medium">Con IA</span>
                    </div>
                  </Link>
                  
                  <a 
                    href={`tel:${SITE_CONFIG.phone}`} 
                    className="relative overflow-hidden rounded-2xl active:scale-95 transition-transform shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-600" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
                    <div className="relative flex flex-col items-center justify-center p-6 text-white">
                      <Icons.Phone className="w-8 h-8 mb-2 drop-shadow-lg" />
                      <span className="text-base font-black mb-1">Llamar</span>
                      <span className="text-xs text-emerald-100 font-medium">Asesoría</span>
                    </div>
                  </a>
                </div>

                {/* Trust badges - HONESTOS */}
                <div className="grid grid-cols-3 gap-2 mb-6 p-4 bg-gradient-to-br from-violet-950/30 to-fuchsia-950/30 rounded-2xl border border-white/10">
                  <div className="flex flex-col items-center text-center">
                    <Icons.Shield className="w-5 h-5 text-emerald-400 mb-2" />
                    <div className="text-xs font-bold text-white">Envío</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">Gratis</div>
                  </div>
                  <div className="flex flex-col items-center text-center border-x border-white/10">
                    <Icons.Truck className="w-5 h-5 text-cyan-400 mb-2" />
                    <div className="text-xs font-bold text-white">24-48h</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">Entrega</div>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Icons.Sparkles className="w-5 h-5 text-violet-400 mb-2" />
                    <div className="text-xs font-bold text-white">Premium</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">Calidad</div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="mb-6">
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 px-1">Navegación</div>
                  <ul className="space-y-2">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link 
                          href={link.href} 
                          onClick={closeMenu} 
                          className={`flex items-center justify-between p-4 rounded-xl font-bold text-base transition-all active:scale-98 ${
                            link.featured 
                              ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30 shadow-lg' 
                              : 'text-zinc-300 bg-white/5 border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <span>{link.label}</span>
                          {link.featured && (
                            <span className="px-2.5 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[9px] font-black rounded-full uppercase shadow-lg">
                              Nuevo
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Account section */}
                <div className="border-t border-white/10 pt-6">
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 px-1">Mi cuenta</div>
                  <Link 
                    href="/mi-cuenta" 
                    onClick={closeMenu} 
                    className="flex items-center gap-3 p-4 text-zinc-300 bg-white/5 border border-white/10 rounded-xl transition-all active:scale-98 hover:bg-white/10"
                  >
                    <Icons.User className="w-5 h-5" />
                    <span className="font-semibold">Acceder a mi cuenta</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ============================================================ */}
      {/* CSS ANIMATIONS - OPTIMIZADAS */}
      {/* ============================================================ */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes scale-in {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        
        .active\\:scale-98:active { transform: scale(0.98); }
        .active\\:scale-95:active { transform: scale(0.95); }
        
        .pb-safe { padding-bottom: max(1.5rem, env(safe-area-inset-bottom)); }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-glow,
          .animate-scale-in,
          .animate-fade-in,
          .animate-slide-up { animation: none !important; }
        }

        /* Custom scrollbar for mobile menu */
        @supports (scrollbar-width: thin) {
          * {
            scrollbar-width: thin;
            scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
          }
        }
      `}</style>
    </>
  )
}