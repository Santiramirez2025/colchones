'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useDebounce } from '@/lib/hooks/use-debounce'
import type { ProductWithCategory } from '@/lib/api/products'
import { usePathname } from 'next/navigation'

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
  Tag: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  Clock: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Moon: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1014 11.69 1 1 0 00-.36-1.05z" />
    </svg>
  ),
  Search: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  TrendingUp: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Loader: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  Star: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  Fire: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 23a7.5 7.5 0 01-5.138-12.963C8.204 8.774 11.5 6.5 11 1.5c6 4 9 8 3 14 1 0 2.5 0 5-2.47.27.773.5 1.604.5 2.47A7.5 7.5 0 0112 23z" />
    </svg>
  ),
  Gift: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  ),
  Truck: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
}

// 🎯 Sistema de Campañas Inteligente
const getCurrentCampaign = () => {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()
  
  // Black Friday / Cyber Week (20-30 Nov)
  if (month === 11 && day >= 20) {
    return {
      tagline: 'BLACK WEEK -50%',
      code: 'BLACK50',
      endDate: new Date(now.getFullYear(), 10, 30, 23, 59, 59),
      showCountdown: true,
      theme: 'cyber'
    }
  }
  
  // Rebajas de Enero (1-31 Ene)
  if (month === 1) {
    return {
      tagline: 'REBAJAS -45%',
      code: 'ENERO45',
      endDate: new Date(now.getFullYear(), 0, 31, 23, 59, 59),
      showCountdown: true,
      theme: 'sale'
    }
  }
  
  // Navidad (1-31 Dic)
  if (month === 12) {
    return {
      tagline: 'NAVIDAD -40%',
      code: 'NAVIDAD40',
      endDate: new Date(now.getFullYear(), 11, 31, 23, 59, 59),
      showCountdown: true,
      theme: 'christmas'
    }
  }
  
  // Campaña permanente (resto del año)
  return {
    tagline: 'ENVÍO EXPRESS GRATIS',
    code: 'ENVIOGRATIS',
    endDate: null,
    showCountdown: false,
    theme: 'default'
  }
}

const campaign = getCurrentCampaign()

const SITE_CONFIG = {
  phone: '+34981123456',
  phoneDisplay: '981 12 34 56',
  brandName: 'Tienda Colchon',
  tagline: campaign.tagline,
  promoCode: campaign.code,
  showCountdown: campaign.showCountdown,
  endDate: campaign.endDate,
  theme: campaign.theme,
}

const POPULAR_SEARCHES = [
  'Ofertas del mes', 
  'Mejor valorados', 
  'Viscoelástico', 
  'Muelles ensacados', 
  'Memory foam premium'
]

export default function Header() {
  const pathname = usePathname()
  
  // ✅ TODOS los hooks PRIMERO (antes del return condicional)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<ProductWithCategory[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [countdown, setCountdown] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    if (!SITE_CONFIG.showCountdown || !SITE_CONFIG.endDate) return
    
    const calculateCountdown = () => {
      const now = new Date()
      const endDate = SITE_CONFIG.endDate as Date
      
      const diff = endDate.getTime() - now.getTime()
      
      if (diff <= 0) {
        setCountdown('00:00:00')
        return
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }

    calculateCountdown()
    const interval = setInterval(calculateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 20
    if (isScrolled !== scrolled) setScrolled(isScrolled)
  }, [scrolled])

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), [])
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  useEffect(() => {
    const performSearch = async () => {
      const trimmedQuery = debouncedSearchQuery.trim()
      
      if (trimmedQuery.length === 0) {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      if (trimmedQuery.length < 2) {
        setIsSearching(false)
        return
      }

      try {
        setIsSearching(true)
        const response = await fetch(`/api/products/search?q=${encodeURIComponent(trimmedQuery)}&limit=10`)
        if (!response.ok) throw new Error('Search failed')
        
        const results = await response.json()
        setSearchResults(results)
      } catch (error) {
        console.error('Error en búsqueda:', error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }

    performSearch()
  }, [debouncedSearchQuery])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false)
      }
    }
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen])

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

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
    { href: '/catalogo', label: 'Ver Ofertas', icon: 'catalog', featured: true },
    { href: '/simulador', label: 'Test IA', icon: 'ai', special: true },
    { href: '/comparador', label: 'Comparar', icon: 'compare' },
    { href: '/blog', label: 'Guía', icon: 'blog' },
  ], [])

  const handleSearchClick = (slug: string) => {
    window.location.href = `/producto/${slug}`
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term)
    setIsSearchOpen(true)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const renderProductBadges = (product: ProductWithCategory) => {
    const badges = []
    
    if (product.isBestSeller) {
      badges.push(
        <span key="bestseller" className="px-1.5 py-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-[9px] font-black rounded uppercase flex-shrink-0">
          Hot
        </span>
      )
    }
    if (product.isNew) {
      badges.push(
        <span key="new" className="px-1.5 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[9px] font-black rounded uppercase flex-shrink-0">
          Oferta
        </span>
      )
    }
    if (product.isEco) {
      badges.push(
        <span key="eco" className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[9px] font-black rounded uppercase flex-shrink-0">
          Eco
        </span>
      )
    }
    
    return badges
  }

  // 🚫 Return condicional AL FINAL (después de TODOS los hooks)
  if (pathname?.startsWith('/admin')) {
    return null
  }

  // ✅ Renderizar Header normal
  return (
    <>
      {/* TOP BAR - SISTEMA INTELIGENTE */}
      <div className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shimmer" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              {SITE_CONFIG.showCountdown && countdown ? (
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Icons.Fire className="w-4 h-4 text-yellow-300 animate-pulse" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-yellow-300 uppercase hidden sm:inline">Termina en</span>
                    <span className="text-sm font-black text-white tabular-nums">{countdown}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Icons.Truck className="w-4 h-4 text-cyan-300" />
                  <span className="text-sm font-black text-white">Envío Express Gratis</span>
                </div>
              )}
              
              <div className="hidden md:flex items-center gap-2">
                <Icons.Tag className="w-4 h-4 text-yellow-300" />
                <span className="text-xs font-bold text-white">
                  Código: <span className="text-yellow-300">{SITE_CONFIG.promoCode}</span> 
                  {SITE_CONFIG.showCountdown ? ' -10% extra' : ''}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-white">
                <Icons.Zap className="w-4 h-4 text-yellow-300" />
                <span>Entrega <span className="text-yellow-300">24-48h</span></span>
              </div>
              
              <a 
                href={`tel:${SITE_CONFIG.phone}`} 
                className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-white transition-all"
              >
                <Icons.Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{SITE_CONFIG.phoneDisplay}</span>
                <span className="sm:hidden">Llamar</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER PRINCIPAL */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled 
          ? 'bg-zinc-950/95 border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/10' 
          : 'bg-zinc-950/90 border-b border-cyan-500/10'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

        <nav className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="group relative flex-shrink-0 z-50">
              <div className="flex items-center gap-2.5 md:gap-3 transition-transform group-hover:scale-[1.02]">
                <div className="relative">
                  <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                    <Icons.Moon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-cyan-400/30 blur-md -z-10 animate-pulse-glow" />
                </div>
                
                <div className="flex flex-col">
                  <div className="text-lg md:text-xl font-black leading-none tracking-tight">
                    <span className="text-white">Tienda</span>
                    <span className="text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">Colchon</span>
                  </div>
                  <div className="text-[9px] md:text-[10px] font-black tracking-wider uppercase mt-0.5">
                    <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text animate-pulse">
                      {SITE_CONFIG.tagline}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* BUSCADOR CENTRAL - DESKTOP */}
            <div ref={searchContainerRef} className="hidden lg:flex flex-1 max-w-2xl mx-8 relative">
              <div className="relative w-full">
                <div className="relative">
                  <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    placeholder="🔥 Buscar colchones y ofertas..."
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-cyan-500/20 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  />
                  {isSearching && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Icons.Loader className="w-5 h-5 text-cyan-400 animate-spin" />
                    </div>
                  )}
                  {searchQuery && !isSearching && (
                    <button
                      onClick={() => { setSearchQuery(''); setSearchResults([]) }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Icons.X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {isSearchOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900/98 backdrop-blur-xl border border-cyan-500/20 rounded-xl shadow-2xl shadow-black/50 max-h-[500px] overflow-y-auto animate-slide-down">
                    {searchQuery.trim().length === 0 ? (
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
                          <Icons.TrendingUp className="w-3.5 h-3.5" />
                          <span>Búsquedas Populares</span>
                        </div>
                        <div className="space-y-1">
                          {POPULAR_SEARCHES.map((term, idx) => (
                            <button
                              key={idx}
                              onClick={() => handlePopularSearch(term)}
                              className="w-full text-left px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-all flex items-center gap-2 group"
                            >
                              <Icons.Search className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
                              <span className="font-medium">{term}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="p-2">
                        <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider px-3 py-2">
                          {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
                        </div>
                        {searchResults.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleSearchClick(product.slug)}
                            className="w-full text-left p-3 hover:bg-cyan-500/10 rounded-lg transition-all group"
                          >
                            <div className="flex items-start gap-3">
                              {product.images && product.images.length > 0 && (
                                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
                                  <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                  />
                                </div>
                              )}
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3 mb-1">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                                      {product.name}
                                    </h4>
                                    {product.subtitle && (
                                      <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                                        {product.subtitle}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex-shrink-0 text-right">
                                    <div className="text-lg font-bold text-cyan-400">
                                      {formatPrice(product.price)}
                                    </div>
                                    {product.originalPrice && product.originalPrice > product.price && (
                                      <div className="text-xs text-zinc-500 line-through">
                                        {formatPrice(product.originalPrice)}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2 flex-wrap">
                                  {product.category && (
                                    <span className="text-xs text-zinc-500 font-medium">
                                      {product.category.name}
                                    </span>
                                  )}
                                  {product.rating > 0 && (
                                    <>
                                      <span className="text-zinc-700">•</span>
                                      <div className="flex items-center gap-1">
                                        <Icons.Star className="w-3 h-3 text-amber-400" />
                                        <span className="text-xs text-zinc-400 font-medium">
                                          {product.rating.toFixed(1)}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                  {renderProductBadges(product)}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : isSearching ? (
                      <div className="p-8 text-center">
                        <Icons.Loader className="w-8 h-8 mx-auto mb-4 text-cyan-400 animate-spin" />
                        <p className="text-zinc-400 font-medium">Buscando ofertas...</p>
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                          <Icons.Search className="w-8 h-8 text-zinc-600" />
                        </div>
                        <p className="text-zinc-400 font-medium mb-1">No encontramos resultados</p>
                        <p className="text-sm text-zinc-600">
                          Intenta con otras palabras clave
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* DESKTOP NAV */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={`relative group px-4 py-2.5 rounded-lg transition-all ${
                      link.featured
                        ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30' 
                        : link.special 
                        ? 'bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 border border-violet-500/20' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <span className={`font-semibold text-sm transition-colors ${
                      link.featured
                        ? 'text-cyan-300 group-hover:text-cyan-200'
                        : link.special 
                        ? 'text-violet-300 group-hover:text-violet-200' 
                        : 'text-zinc-300 group-hover:text-white'
                    }`}>
                      {link.label}
                    </span>
                    {link.featured && (
                      <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[8px] font-black rounded uppercase tracking-wider shadow-lg animate-pulse">
                        HOT
                      </span>
                    )}
                    {link.special && (
                      <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[8px] font-black rounded uppercase tracking-wider shadow-lg">
                        IA
                      </span>
                    )}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full ${
                      link.featured ? 'bg-gradient-to-r from-cyan-400 to-blue-400' : 'bg-gradient-to-r from-violet-400 to-fuchsia-400'
                    }`} />
                  </Link>
                </li>
              ))}
            </ul>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-cyan-500/20 transition-all"
              >
                <Icons.Search className="w-5 h-5 text-cyan-300" />
              </button>

              <Link 
                href="/mi-cuenta" 
                className="hidden md:flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
              >
                <Icons.User className="w-4 h-4 md:w-5 md:h-5 text-zinc-300 group-hover:text-white transition-colors" />
              </Link>

              <Link 
                href="/carrito" 
                className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
              >
                <Icons.ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-zinc-300 group-hover:text-white transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-cyan-500/50 animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link 
                href="/simulador" 
                className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <Icons.Sparkles className="w-4 h-4" />
                <span>Ver Ofertas</span>
              </Link>

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

      {/* BUSCADOR MÓVIL - FULLSCREEN */}
      {isSearchOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-zinc-950/98 backdrop-blur-xl animate-fade-in">
          <div className="container mx-auto px-4 py-4 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1">
                <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔥 Buscar colchones y ofertas..."
                  autoFocus
                  className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-cyan-500/20 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                />
                {isSearching && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Icons.Loader className="w-5 h-5 text-cyan-400 animate-spin" />
                  </div>
                )}
                {searchQuery && !isSearching && (
                  <button
                    onClick={() => { setSearchQuery(''); setSearchResults([]) }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Icons.X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); setSearchResults([]) }}
                className="flex-shrink-0 px-4 py-3.5 text-zinc-300 hover:text-white font-semibold text-sm transition-colors"
              >
                Cancelar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto -mx-4 px-4">
              {searchQuery.trim().length === 0 ? (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
                    <Icons.TrendingUp className="w-4 h-4" />
                    <span>Búsquedas Populares</span>
                  </div>
                  <div className="space-y-2">
                    {POPULAR_SEARCHES.map((term, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePopularSearch(term)}
                        className="w-full text-left px-4 py-3.5 bg-white/5 hover:bg-cyan-500/10 rounded-xl transition-all flex items-center gap-3 group border border-cyan-500/20"
                      >
                        <Icons.Search className="w-5 h-5 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
                        <span className="font-semibold text-zinc-300 group-hover:text-white transition-colors">{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  <div className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">
                    {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
                  </div>
                  <div className="space-y-3">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSearchClick(product.slug)}
                        className="w-full text-left p-4 bg-white/5 hover:bg-cyan-500/10 rounded-xl transition-all border border-cyan-500/20"
                      >
                        <div className="flex items-start gap-3">
                          {product.images && product.images.length > 0 && (
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h4 className="font-bold text-white text-base line-clamp-2">
                                {product.name}
                              </h4>
                              <div className="flex-shrink-0 text-right">
                                <div className="text-xl font-black text-cyan-400">
                                  {formatPrice(product.price)}
                                </div>
                                {product.originalPrice && product.originalPrice > product.price && (
                                  <div className="text-xs text-zinc-500 line-through">
                                    {formatPrice(product.originalPrice)}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {renderProductBadges(product)}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : isSearching ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Icons.Loader className="w-12 h-12 mx-auto mb-6 text-cyan-400 animate-spin" />
                  <p className="text-lg text-zinc-300 font-bold">Buscando ofertas...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                    <Icons.Search className="w-10 h-10 text-zinc-600" />
                  </div>
                  <p className="text-lg text-zinc-300 font-bold mb-2">No encontramos resultados</p>
                  <p className="text-sm text-zinc-600">Intenta con otras palabras</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU - EDICIÓN INTELIGENTE */}
      {isMenuOpen && (
        <>
          <div 
            onClick={closeMenu} 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm lg:hidden animate-fade-in"
            style={{ zIndex: 9998 }}
          />

          <div 
            className="fixed inset-0 lg:hidden flex flex-col animate-slide-up"
            style={{ zIndex: 9999 }}
          >
            <div className="flex-shrink-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
              <div className="container mx-auto px-4 relative z-10">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      {SITE_CONFIG.showCountdown ? (
                        <Icons.Fire className="w-5 h-5 text-yellow-300" />
                      ) : (
                        <Icons.Gift className="w-5 h-5 text-cyan-300" />
                      )}
                    </div>
                    <div>
                      <div className="text-base font-black text-white">{SITE_CONFIG.tagline}</div>
                      {SITE_CONFIG.showCountdown && countdown && (
                        <div className="text-[9px] text-cyan-100 uppercase tracking-wider font-bold">Termina en {countdown}</div>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={closeMenu} 
                    className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition"
                    aria-label="Cerrar menú"
                  >
                    <Icons.X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-950 to-zinc-900">
              <div className="container mx-auto px-4 py-6 pb-safe">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Link 
                    href="/catalogo" 
                    onClick={closeMenu} 
                    className="relative overflow-hidden rounded-2xl active:scale-95 transition-transform shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600" />
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%)] bg-[length:200%_200%] animate-shimmer" />
                    <div className="relative flex flex-col items-center justify-center p-6 text-white">
                      <Icons.Fire className="w-8 h-8 mb-2 drop-shadow-lg animate-pulse" />
                      <span className="text-base font-black mb-1">Ver Ofertas</span>
                      <span className="text-xs text-cyan-100 font-bold">
                        {SITE_CONFIG.showCountdown ? 'Hasta -50%' : 'Mejores precios'}
                      </span>
                    </div>
                  </Link>
                  
                  <a 
                    href={`tel:${SITE_CONFIG.phone}`} 
                    className="relative overflow-hidden rounded-2xl active:scale-95 transition-transform shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-600" />
                    <div className="relative flex flex-col items-center justify-center p-6 text-white">
                      <Icons.Phone className="w-8 h-8 mb-2 drop-shadow-lg" />
                      <span className="text-base font-black mb-1">Llamar</span>
                      <span className="text-xs text-emerald-100 font-medium">Asesoría</span>
                    </div>
                  </a>
                </div>

                <div className="mb-6 p-4 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 rounded-2xl border-2 border-yellow-500/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_50%,transparent_75%)] bg-[length:200%_200%] animate-shimmer" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-yellow-300 uppercase mb-1">Código exclusivo</div>
                      <div className="text-2xl font-black text-white tracking-wider">{SITE_CONFIG.promoCode}</div>
                      <div className="text-xs text-zinc-400 mt-1">
                        {SITE_CONFIG.showCountdown ? '-10% adicional' : 'Beneficio especial'}
                      </div>
                    </div>
                    <Icons.Tag className="w-12 h-12 text-yellow-400/30" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6 p-4 bg-gradient-to-br from-cyan-950/30 to-blue-950/30 rounded-2xl border border-cyan-500/20">
                  <div className="flex flex-col items-center text-center">
                    <Icons.Truck className="w-5 h-5 text-cyan-400 mb-2" />
                    <div className="text-xs font-bold text-white">Express</div>
                    <div className="text-[10px] text-cyan-400 mt-0.5">Gratis</div>
                  </div>
                  <div className="flex flex-col items-center text-center border-x border-cyan-500/20">
                    <Icons.Clock className="w-5 h-5 text-cyan-400 mb-2" />
                    <div className="text-xs font-bold text-white">24-48h</div>
                    <div className="text-[10px] text-cyan-400 mt-0.5">Entrega</div>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Icons.Sparkles className="w-5 h-5 text-purple-400 mb-2" />
                    <div className="text-xs font-bold text-white">Premium</div>
                    <div className="text-[10px] text-cyan-400 mt-0.5">Calidad</div>
                  </div>
                </div>

                <nav className="mb-6">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 px-1">Navegación</div>
                  <ul className="space-y-2">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link 
                          href={link.href} 
                          onClick={closeMenu} 
                          className={`flex items-center justify-between p-4 rounded-xl font-bold text-base transition-all active:scale-98 ${
                            link.featured
                              ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-white border border-cyan-500/30 shadow-lg' 
                              : link.special 
                              ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30' 
                              : 'text-zinc-300 bg-white/5 border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <span>{link.label}</span>
                          {link.featured && (
                            <span className="px-2.5 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[9px] font-black rounded-full uppercase shadow-lg animate-pulse">
                              Hot
                            </span>
                          )}
                          {link.special && (
                            <span className="px-2.5 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[9px] font-black rounded-full uppercase shadow-lg">
                              IA
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="border-t border-cyan-500/20 pt-6">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 px-1">Mi cuenta</div>
                  <Link 
                    href="/mi-cuenta" 
                    onClick={closeMenu} 
                    className="flex items-center gap-3 p-4 text-zinc-300 bg-white/5 border border-cyan-500/20 rounded-xl transition-all active:scale-98 hover:bg-cyan-500/10"
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
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-slide-down { animation: slide-down 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-shimmer { animation: shimmer 3s linear infinite; }
        
        .active\\:scale-98:active { transform: scale(0.98); }
        .active\\:scale-95:active { transform: scale(0.95); }
        
        .pb-safe { padding-bottom: max(1.5rem, env(safe-area-inset-bottom)); }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-glow,
          .animate-scale-in,
          .animate-fade-in,
          .animate-slide-up,
          .animate-slide-down,
          .animate-shimmer { animation: none !important; }
        }

        @supports (scrollbar-width: thin) {
          * {
            scrollbar-width: thin;
            scrollbar-color: rgba(34, 211, 238, 0.3) transparent;
          }
        }
      `}</style>
    </>
  )
}