'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback, useMemo } from 'react'

// ✅ Iconos inline SVG (0KB extra)
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
  Star: ({ className = "w-4 h-4", filled = false }: { className?: string; filled?: boolean }) => (
    <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  Shield: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Clock: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Sparkles: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Moon: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1014 11.69 1 1 0 00-.36-1.05z" />
    </svg>
  ),
}

const SITE_CONFIG = {
  phone: '+34900123456',
  phoneDisplay: '900 123 456',
  rating: '4.9',
  reviewCount: '3247',
  warrantyYears: '10',
  shippingTime: '24-48h',
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
    { href: '/catalogo', label: 'Colchones', featured: false },
    { href: '/simulador', label: 'Test Personalizado', featured: true },
    { href: '/comparador', label: 'Comparador', featured: false },
    { href: '/blog', label: 'Guía del Sueño', featured: false },
  ], [])

  return (
    <>
      {/* Top bar */}
      <div className="relative bg-gradient-to-r from-purple-950 via-zinc-950 to-purple-950 border-b border-purple-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.08),transparent_50%)] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between py-2.5 text-xs">
            <div className="hidden md:flex items-center gap-5">
              <div className="flex items-center gap-2 text-gray-300">
                <Icons.Star className="w-3.5 h-3.5 text-amber-400" filled />
                <span className="font-medium">
                  <strong className="text-white">{SITE_CONFIG.rating}/5</strong> · {SITE_CONFIG.reviewCount} opiniones
                </span>
              </div>
              <div className="w-px h-4 bg-gray-700/50" />
              <div className="flex items-center gap-2 text-gray-300">
                <Icons.Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-medium"><strong className="text-white">Garantía</strong> {SITE_CONFIG.warrantyYears} años</span>
              </div>
              <div className="w-px h-4 bg-gray-700/50" />
              <div className="flex items-center gap-2 text-gray-300">
                <Icons.Clock className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-medium"><strong className="text-white">Envío gratis</strong> {SITE_CONFIG.shippingTime}</span>
              </div>
            </div>

            <div className="flex md:hidden items-center gap-3 text-gray-300">
              <div className="flex items-center gap-1.5">
                <Icons.Star className="w-3.5 h-3.5 text-amber-400" filled />
                <span className="font-semibold text-white">{SITE_CONFIG.rating}/5</span>
              </div>
              <div className="w-px h-3 bg-gray-700/50" />
              <div className="flex items-center gap-1.5">
                <Icons.Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-white">{SITE_CONFIG.warrantyYears} años</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 ml-auto">
              <Link href="/prueba-100-noches" className="text-gray-400 hover:text-purple-300 transition-colors font-medium text-xs hidden lg:block rounded px-2 py-1">
                Tu descanso asegurado
              </Link>
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-1.5 text-gray-300 hover:text-purple-300 transition-colors font-semibold rounded px-2 py-1">
                <Icons.Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{SITE_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? 'bg-zinc-950/95 border-b border-purple-900/20 shadow-lg' : 'bg-zinc-950/90 border-b border-transparent'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 to-transparent pointer-events-none" />

        <nav className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="group relative flex-shrink-0 z-50 rounded-xl">
              <div className="flex items-center gap-3 transition-transform hover:scale-[1.02]">
                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Icons.Moon className="w-6 h-6 text-white" />
                  <div className="absolute inset-0 rounded-xl bg-purple-400/20 blur-md -z-10 animate-pulse-glow" />
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

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="relative group px-5 py-2.5 block rounded-lg">
                    <span className={`font-medium transition-colors ${
                      link.featured ? 'text-purple-300 group-hover:text-purple-200' : 'text-gray-300 group-hover:text-white'
                    }`}>
                      {link.label}
                    </span>
                    {link.featured && (
                      <span className="absolute -top-1 right-0 px-1.5 py-0.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[9px] font-bold rounded uppercase">IA</span>
                    )}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              <a href={`tel:${SITE_CONFIG.phone}`} className="hidden xl:flex items-center gap-2 px-4 py-2.5 bg-gray-900/50 hover:bg-gray-900 border border-gray-800/50 text-gray-300 hover:text-white rounded-xl font-semibold text-sm transition-all">
                <Icons.Phone className="w-4 h-4" />
                <span>Asesor experto</span>
              </a>

              <Link href="/mi-cuenta" className="hidden md:flex items-center justify-center w-11 h-11 rounded-xl bg-gray-900/50 hover:bg-gray-900 border border-gray-800/50 transition-all">
                <Icons.User className="w-5 h-5 text-gray-300" />
              </Link>

              <Link href="/carrito" className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gray-900/50 hover:bg-gray-900 border border-gray-800/50 transition-all">
                <Icons.ShoppingCart className="w-5 h-5 text-gray-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link href="/simulador" className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-purple-500/25 transition-all">
                <Icons.Sparkles className="w-4 h-4" />
                <span>Test Gratis</span>
              </Link>

              <button 
                onClick={toggleMenu} 
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-gray-900/50 border border-gray-800/50 transition-all relative z-[60]" 
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMenuOpen ? <Icons.X className="w-5 h-5 text-gray-300" /> : <Icons.Menu className="w-5 h-5 text-gray-300" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ============================================================ */}
      {/* MOBILE MENU - Z-INDEX CORREGIDO */}
      {/* ============================================================ */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            onClick={closeMenu} 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm lg:hidden animate-fade-in"
            style={{ zIndex: 9998 }}
          />

          {/* Menu Panel */}
          <div 
            className="fixed inset-0 lg:hidden flex flex-col animate-slide-up"
            style={{ zIndex: 9999 }}
          >
            {/* Menu header */}
            <div className="flex-shrink-0 bg-zinc-950/98 backdrop-blur-xl border-b border-purple-900/20">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                      <Icons.Moon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">TiendaColchon</div>
                      <div className="text-[9px] text-gray-500 uppercase tracking-wider">Menú</div>
                    </div>
                  </div>
                  <button 
                    onClick={closeMenu} 
                    className="w-10 h-10 rounded-xl bg-gray-900/50 border border-gray-800/50 flex items-center justify-center"
                    aria-label="Cerrar menú"
                  >
                    <Icons.X className="w-5 h-5 text-gray-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto bg-zinc-950">
              <div className="container mx-auto px-4 py-6 pb-safe">
                {/* Quick CTAs */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Link 
                    href="/simulador" 
                    onClick={closeMenu} 
                    className="relative overflow-hidden rounded-2xl active:scale-95 transition-transform"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600" />
                    <div className="relative flex flex-col items-center justify-center p-6 text-white">
                      <Icons.Sparkles className="w-8 h-8 mb-3" />
                      <span className="text-base font-bold">Test Gratis</span>
                      <span className="text-xs text-purple-100 mt-1">Con IA</span>
                    </div>
                  </Link>
                  
                  <a 
                    href={`tel:${SITE_CONFIG.phone}`} 
                    className="relative overflow-hidden rounded-2xl active:scale-95 transition-transform"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600" />
                    <div className="relative flex flex-col items-center justify-center p-6 text-white">
                      <Icons.Phone className="w-8 h-8 mb-3" />
                      <span className="text-base font-bold">Llamar</span>
                      <span className="text-xs text-emerald-100 mt-1">Gratis</span>
                    </div>
                  </a>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-2 mb-6 p-4 bg-gradient-to-br from-purple-950/40 to-pink-950/40 rounded-2xl border border-purple-900/30">
                  <div className="flex flex-col items-center text-center">
                    <Icons.Star className="w-5 h-5 text-amber-400 mb-2" filled />
                    <div className="text-sm font-bold text-white">{SITE_CONFIG.rating}/5</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">+{SITE_CONFIG.reviewCount}</div>
                  </div>
                  <div className="flex flex-col items-center text-center border-x border-purple-900/30">
                    <Icons.Shield className="w-5 h-5 text-emerald-400 mb-2" />
                    <div className="text-sm font-bold text-white">{SITE_CONFIG.warrantyYears} años</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Garantía</div>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Icons.Clock className="w-5 h-5 text-blue-400 mb-2" />
                    <div className="text-sm font-bold text-white">{SITE_CONFIG.shippingTime}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Envío</div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="mb-6">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">Navegación</div>
                  <ul className="space-y-2">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link 
                          href={link.href} 
                          onClick={closeMenu} 
                          className={`flex items-center justify-between p-4 rounded-xl font-semibold transition-all active:scale-98 ${
                            link.featured 
                              ? 'bg-gradient-to-r from-purple-950/60 to-pink-950/60 text-white border border-purple-500/30' 
                              : 'text-gray-300 bg-gray-900/30 border border-gray-800/50'
                          }`}
                        >
                          <span className="text-base">{link.label}</span>
                          {link.featured && (
                            <span className="px-2.5 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[9px] font-bold rounded-full uppercase">Popular</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Account links */}
                <div className="border-t border-gray-800/50 pt-6">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">Mi cuenta</div>
                  <div className="space-y-2">
                    <Link 
                      href="/mi-cuenta" 
                      onClick={closeMenu} 
                      className="flex items-center gap-3 p-4 text-gray-300 bg-gray-900/30 border border-gray-800/50 rounded-xl transition-all active:scale-98"
                    >
                      <Icons.User className="w-5 h-5" />
                      <span>Mi cuenta</span>
                    </Link>
                    <Link 
                      href="/prueba-100-noches" 
                      onClick={closeMenu} 
                      className="flex items-center gap-3 p-4 text-gray-300 bg-gray-900/30 border border-gray-800/50 rounded-xl transition-all active:scale-98"
                    >
                      <Icons.Shield className="w-5 h-5" />
                      <span>Certificados de calidad</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
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
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
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
      `}</style>
    </>
  )
}