'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'

// ============================================================================
// ICONS
// ============================================================================
const Icons = {
  Search: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  X: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  TrendingUp: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Clock: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Star: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Tag: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  Sparkles: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
}

// ============================================================================
// TIPOS
// ============================================================================
type SearchProduct = {
  id: string
  slug: string
  name: string
  subtitle: string | null
  price: number
  discountPrice: number | null
  rating: number
  reviewCount: number
  images: string[]
  category: {
    name: string
    slug: string
  } | null
  isBestSeller: boolean
  isNew: boolean
}

type SearchResult = {
  products: SearchProduct[]
  total: number
}

// ============================================================================
// MOCK DATA (Reemplazar con API real)
// ============================================================================
const MOCK_PRODUCTS: SearchProduct[] = [
  {
    id: '1',
    slug: 'colchon-viscoelastico-premium',
    name: 'Colchón Viscoelástico Premium',
    subtitle: 'Máxima adaptabilidad y confort',
    price: 899,
    discountPrice: 749,
    rating: 4.8,
    reviewCount: 234,
    images: ['/placeholder-mattress-1.jpg'],
    category: { name: 'Viscoelásticos', slug: 'viscoelasticos' },
    isBestSeller: true,
    isNew: false
  },
  {
    id: '2',
    slug: 'colchon-muelles-ensacados',
    name: 'Colchón Muelles Ensacados',
    subtitle: 'Independencia de lechos superior',
    price: 1099,
    discountPrice: null,
    rating: 4.6,
    reviewCount: 189,
    images: ['/placeholder-mattress-2.jpg'],
    category: { name: 'Muelles', slug: 'muelles' },
    isBestSeller: false,
    isNew: true
  },
  {
    id: '3',
    slug: 'colchon-latex-natural',
    name: 'Colchón Látex Natural',
    subtitle: 'Ecológico y transpirable',
    price: 1299,
    discountPrice: 1099,
    rating: 4.9,
    reviewCount: 156,
    images: ['/placeholder-mattress-3.jpg'],
    category: { name: 'Látex', slug: 'latex' },
    isBestSeller: true,
    isNew: false
  }
]

const TRENDING_SEARCHES = [
  'Colchón viscoelástico',
  'Colchón firme',
  'Colchón 150x190',
  'Colchón ortopédico'
]

// ============================================================================
// SEARCH COMPONENT
// ============================================================================
export default function ModernSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult>({ products: [], total: 0 })
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // ============================================================================
  // SEARCH LOGIC
  // ============================================================================
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults({ products: [], total: 0 })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}&limit=8`)
      
      if (!response.ok) throw new Error('Search failed')
      
      const data = await response.json()
      
      setResults({ 
        products: data.products || [], 
        total: data.total || 0 
      })
    } catch (error) {
      console.error('Search error:', error)
      setResults({ products: [], total: 0 })
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        performSearch(query)
      } else {
        setResults({ products: [], total: 0 })
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, performSearch])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // Save recent searches
  const saveRecentSearch = (searchTerm: string) => {
    const trimmed = searchTerm.trim()
    if (!trimmed) return

    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== trimmed)
      return [trimmed, ...filtered].slice(0, 5)
    })
  }

  const handleSelectProduct = (product: SearchProduct) => {
    saveRecentSearch(query)
    setIsOpen(false)
    setQuery('')
  }

  const handleTrendingClick = (term: string) => {
    setQuery(term)
    inputRef.current?.focus()
  }

  const handleRecentClick = (term: string) => {
    setQuery(term)
    inputRef.current?.focus()
  }

  const clearSearch = () => {
    setQuery('')
    setResults({ products: [], total: 0 })
    inputRef.current?.focus()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <>
      {/* ============================================================ */}
      {/* DESKTOP SEARCH BAR */}
      {/* ============================================================ */}
      <div className="hidden lg:block relative" ref={searchRef}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder="Buscar colchones, almohadas..."
            className="w-80 xl:w-96 h-11 pl-11 pr-11 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
          />
          
          {/* Search icon */}
          <Icons.Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          
          {/* Clear button */}
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
            >
              <Icons.X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* DROPDOWN RESULTS */}
        {isOpen && (
          <div className="absolute top-full mt-2 w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-slide-in">
            <div className="max-h-[70vh] overflow-y-auto">
              {/* Loading state */}
              {isLoading && (
                <div className="p-6 text-center">
                  <div className="inline-block w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-zinc-400 mt-2">Buscando...</p>
                </div>
              )}

              {/* Empty state - show trending */}
              {!isLoading && !query && (
                <div className="p-4">
                  {/* Trending searches */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 px-2 mb-3">
                      <Icons.TrendingUp className="text-violet-400" />
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Búsquedas populares</span>
                    </div>
                    <div className="space-y-1">
                      {TRENDING_SEARCHES.map((term, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleTrendingClick(term)}
                          className="w-full px-3 py-2.5 text-left text-sm text-zinc-300 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 px-2 mb-3">
                        <Icons.Clock className="text-cyan-400" />
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Búsquedas recientes</span>
                      </div>
                      <div className="space-y-1">
                        {recentSearches.map((term, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleRecentClick(term)}
                            className="w-full px-3 py-2.5 text-left text-sm text-zinc-300 hover:bg-white/5 rounded-lg transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Results */}
              {!isLoading && query && results.products.length > 0 && (
                <div className="p-2">
                  <div className="px-2 py-2 mb-2">
                    <span className="text-xs text-zinc-400">
                      {results.total} {results.total === 1 ? 'resultado' : 'resultados'}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {results.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/productos/${product.slug}`}
                        onClick={() => handleSelectProduct(product)}
                        className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group"
                      >
                        {/* Image */}
                        <div className="flex-shrink-0 w-16 h-16 bg-zinc-800 rounded-lg overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center text-zinc-600">
                            <span className="text-xs font-bold">IMG</span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-1">
                            <h4 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                              {product.name}
                            </h4>
                            {product.isBestSeller && (
                              <span className="flex-shrink-0 px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black rounded uppercase">
                                Best
                              </span>
                            )}
                            {product.isNew && (
                              <span className="flex-shrink-0 px-1.5 py-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[9px] font-black rounded uppercase">
                                Nuevo
                              </span>
                            )}
                          </div>
                          
                          {product.subtitle && (
                            <p className="text-xs text-zinc-400 mb-1 line-clamp-1">
                              {product.subtitle}
                            </p>
                          )}

                          <div className="flex items-center gap-3">
                            {/* Price */}
                            <div className="flex items-center gap-2">
                              {product.discountPrice ? (
                                <>
                                  <span className="text-sm font-bold text-violet-400">
                                    {formatPrice(product.discountPrice)}
                                  </span>
                                  <span className="text-xs text-zinc-500 line-through">
                                    {formatPrice(product.price)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-sm font-bold text-white">
                                  {formatPrice(product.price)}
                                </span>
                              )}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1">
                              <Icons.Star className="w-3 h-3 text-amber-400" />
                              <span className="text-xs font-semibold text-white">
                                {product.rating}
                              </span>
                              <span className="text-xs text-zinc-500">
                                ({product.reviewCount})
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* View all results */}
                  {results.total > 3 && (
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <Link
                        href={`/buscar?q=${encodeURIComponent(query)}`}
                        onClick={() => setIsOpen(false)}
                        className="block w-full py-2.5 text-center text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        Ver todos los resultados ({results.total})
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* No results */}
              {!isLoading && query && results.products.length === 0 && (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-zinc-800 rounded-full flex items-center justify-center">
                    <Icons.Search className="w-8 h-8 text-zinc-600" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    No encontramos resultados
                  </h3>
                  <p className="text-sm text-zinc-400 mb-4">
                    Intenta con otros términos de búsqueda
                  </p>
                  <Link
                    href="/catalogo"
                    onClick={() => setIsOpen(false)}
                    className="inline-block px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold rounded-lg transition-colors"
                  >
                    Ver catálogo completo
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* MOBILE SEARCH BUTTON */}
      {/* ============================================================ */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
      >
        <Icons.Search className="w-5 h-5 text-zinc-300" />
      </button>

      {/* ============================================================ */}
      {/* MOBILE SEARCH MODAL */}
      {/* ============================================================ */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm animate-fade-in">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 bg-zinc-950 border-b border-white/10 p-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full h-12 pl-11 pr-11 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50"
                    autoFocus
                  />
                  <Icons.Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  {query && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    >
                      <Icons.X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-zinc-300"
                >
                  <Icons.X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Same content as desktop dropdown */}
              {isLoading && (
                <div className="p-8 text-center">
                  <div className="inline-block w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {!isLoading && !query && (
                <div className="p-4">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Icons.TrendingUp className="text-violet-400" />
                      <span className="text-sm font-bold text-zinc-300">Búsquedas populares</span>
                    </div>
                    <div className="space-y-2">
                      {TRENDING_SEARCHES.map((term, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleTrendingClick(term)}
                          className="w-full px-4 py-3 text-left bg-white/5 border border-white/10 rounded-xl text-zinc-300 hover:bg-white/10 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Icons.Clock className="text-cyan-400" />
                        <span className="text-sm font-bold text-zinc-300">Recientes</span>
                      </div>
                      <div className="space-y-2">
                        {recentSearches.map((term, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleRecentClick(term)}
                            className="w-full px-4 py-3 text-left bg-white/5 border border-white/10 rounded-xl text-zinc-300 hover:bg-white/10 transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!isLoading && query && results.products.length > 0 && (
                <div className="p-4">
                  <div className="mb-3">
                    <span className="text-sm text-zinc-400">
                      {results.total} {results.total === 1 ? 'resultado' : 'resultados'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {results.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/productos/${product.slug}`}
                        onClick={() => handleSelectProduct(product)}
                        className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <div className="flex-shrink-0 w-20 h-20 bg-zinc-800 rounded-lg overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-zinc-600">IMG</span>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-1">
                            <h4 className="text-sm font-bold text-white line-clamp-2">
                              {product.name}
                            </h4>
                            {product.isBestSeller && (
                              <span className="flex-shrink-0 px-1.5 py-0.5 bg-amber-500 text-white text-[8px] font-black rounded uppercase">
                                Best
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1.5">
                              {product.discountPrice ? (
                                <>
                                  <span className="text-base font-bold text-violet-400">
                                    {formatPrice(product.discountPrice)}
                                  </span>
                                  <span className="text-xs text-zinc-500 line-through">
                                    {formatPrice(product.price)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-base font-bold text-white">
                                  {formatPrice(product.price)}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1">
                              <Icons.Star className="w-3.5 h-3.5 text-amber-400" />
                              <span className="text-sm font-semibold text-white">
                                {product.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {!isLoading && query && results.products.length === 0 && (
                <div className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-zinc-800 rounded-full flex items-center justify-center">
                    <Icons.Search className="w-10 h-10 text-zinc-600" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Sin resultados
                  </h3>
                  <p className="text-sm text-zinc-400 mb-6">
                    Prueba con otros términos
                  </p>
                  <Link
                    href="/catalogo"
                    onClick={() => setIsOpen(false)}
                    className="inline-block px-6 py-3 bg-violet-600 text-white font-bold rounded-xl"
                  >
                    Ver catálogo
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.2s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  )
}