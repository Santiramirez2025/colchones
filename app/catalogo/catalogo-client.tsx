// app/catalogo/catalogo-client.tsx
'use client'

import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { 
  Search, Star, Truck, Shield, X, 
  Sparkles, Award, Heart, ArrowRight,
  Leaf, Globe, Users, BadgeCheck,
  Lock, Zap, AlertCircle, TrendingUp, 
  Package, Clock, CheckCircle2, SlidersHorizontal
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Tipos
type NormalizedProduct = {
  id: string
  name: string
  subtitle: string
  slug: string
  price: number
  originalPrice?: number | null
  discount?: number | null
  rating: number
  reviewCount: number
  firmness: string
  badge?: string | null
  story: string
  isNew?: boolean | null
  isBestSeller?: boolean | null
  images: string
  features: string
  techFeatures: string
  certifications: string
  tags?: string
  highlights?: string
  benefits?: string
  specifications?: string
}

interface CatalogoClientProps {
  initialProducts: NormalizedProduct[]
}

// Helper para parsear campos
const parseJsonField = (field: any): string[] => {
  if (Array.isArray(field)) return field
  if (typeof field === 'string') {
    if (field.includes('\n')) {
      return field.split('\n').filter(Boolean)
    }
    try {
      const parsed = JSON.parse(field)
      return Array.isArray(parsed) ? parsed : []
    } catch (e) {
      return field ? [field] : []
    }
  }
  return []
}

const filters = {
  firmness: ['Todas', 'Suave', 'Media-Suave', 'Media', 'Media-Firme', 'Firme'],
  price: ['Todos', 'Hasta 500€', '500-800€', '800-1200€', 'Más de 1200€'],
  rating: ['Todas', '4.5+', '4.7+', '4.9+']
}

export default function CatalogoClient({ initialProducts }: CatalogoClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFirmness, setSelectedFirmness] = useState('Todas')
  const [selectedPrice, setSelectedPrice] = useState('Todos')
  const [selectedRating, setSelectedRating] = useState('Todas')
  const [favorites, setFavorites] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('featured')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  const heroRef = useRef(null)
  const productsRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  // Filtrado optimizado
  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFirmness = selectedFirmness === 'Todas' || product.firmness === selectedFirmness
      
      let matchesPrice = true
      if (selectedPrice === 'Hasta 500€') matchesPrice = product.price <= 500
      else if (selectedPrice === '500-800€') matchesPrice = product.price > 500 && product.price <= 800
      else if (selectedPrice === '800-1200€') matchesPrice = product.price > 800 && product.price <= 1200
      else if (selectedPrice === 'Más de 1200€') matchesPrice = product.price > 1200

      let matchesRating = true
      if (selectedRating === '4.5+') matchesRating = product.rating >= 4.5
      else if (selectedRating === '4.7+') matchesRating = product.rating >= 4.7
      else if (selectedRating === '4.9+') matchesRating = product.rating >= 4.9

      return matchesSearch && matchesFirmness && matchesPrice && matchesRating
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      if (a.isBestSeller && !b.isBestSeller) return -1
      if (!a.isBestSeller && b.isBestSeller) return 1
      if (a.isNew && !b.isNew) return -1
      if (!a.isNew && b.isNew) return 1
      return b.rating - a.rating
    })
  }, [initialProducts, searchTerm, selectedFirmness, selectedPrice, selectedRating, sortBy])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedFirmness('Todas')
    setSelectedPrice('Todos')
    setSelectedRating('Todas')
    setSortBy('featured')
  }

  const activeFiltersCount = [
    selectedFirmness !== 'Todas',
    selectedPrice !== 'Todos',
    selectedRating !== 'Todas',
    searchTerm !== ''
  ].filter(Boolean).length

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const avgPrice = useMemo(() => {
    return initialProducts.reduce((acc, p) => acc + p.price, 0) / initialProducts.length
  }, [initialProducts])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Premium */}
      <section ref={heroRef} className="relative pt-24 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-50/40 to-purple-50/40 rounded-full blur-3xl" />
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-10"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 px-4 md:px-5 py-2 md:py-2.5 rounded-full mb-6 md:mb-8 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-xs md:text-sm font-bold text-gray-800">
                  Colección Premium 2025 · Envío Express Gratis
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 md:mb-6 leading-[1.1] tracking-tight px-4"
              >
                Tu mejor versión
                <br />
                <span className="relative inline-block mt-2">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    empieza al despertar
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                    className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-3 md:h-4 bg-gradient-to-r from-indigo-200/50 via-purple-200/50 to-indigo-200/50 -z-10 rounded-full"
                  />
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-2 md:space-y-3 mb-8 md:mb-10"
              >
                <p className="text-lg md:text-2xl text-gray-700 leading-relaxed font-medium px-4">
                  Colchones diseñados en España con tecnología europea
                </p>
                <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto px-4">
                  Garantía de 3 años · Materiales sostenibles certificados
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-10 md:mb-12 px-4"
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToProducts}
                  className="w-full sm:w-auto group px-6 md:px-8 py-3.5 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl md:rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2 md:gap-3"
                >
                  <span className="text-sm md:text-base">Ver colchones más vendidos</span>
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <Link href="/simulador" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 md:px-8 py-3.5 md:py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-xl md:rounded-2xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-indigo-600" />
                    <span className="text-sm md:text-base">Test personalizado</span>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Stats - Responsive */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12"
              >
                {[
                  { icon: Users, value: '+50.000', label: 'Clientes felices', sublabel: 'y contando' },
                  { icon: Star, value: '4.9/5', label: 'Valoración media', sublabel: 'en +12K reseñas' },
                  { icon: Award, value: '3 años', label: 'Garantía extendida', sublabel: 'sin letra pequeña' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-3 md:gap-4"
                  >
                    <div className="w-12 md:w-14 h-12 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50 flex items-center justify-center flex-shrink-0">
                      <stat.icon className="w-6 md:w-7 h-6 md:h-7 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-xl md:text-2xl font-black text-gray-900">{stat.value}</div>
                      <div className="text-xs md:text-sm font-semibold text-gray-700">{stat.label}</div>
                      <div className="text-[10px] md:text-xs text-gray-500">{stat.sublabel}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Barra sticky con botón filtrar (Mobile-First) */}
      <div ref={productsRef} className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center gap-3">
            {/* Mobile: Botón Filtrar */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex-shrink-0 relative px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-md"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filtrar</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-600 text-white text-xs font-black rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Barra de búsqueda */}
            <div className="relative flex-1">
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
                className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-sm md:text-base text-gray-900 placeholder:text-gray-400 font-medium"
              />
            </div>

            {/* Desktop: Ordenar inline */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="hidden lg:block px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm text-gray-700 bg-white cursor-pointer font-medium"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: ↑</option>
              <option value="price-desc">Precio: ↓</option>
              <option value="rating">Mejor valorados</option>
            </select>
          </div>

          {/* Contador de resultados */}
          <div className="flex items-center justify-between mt-3 text-sm">
            <span className="text-gray-600">
              <span className="font-bold text-gray-900">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'colchón' : 'colchones'}
            </span>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Drawer de filtros (Mobile) */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedFirmness={selectedFirmness}
        setSelectedFirmness={setSelectedFirmness}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        sortBy={sortBy}
        setSortBy={setSortBy}
        activeFiltersCount={activeFiltersCount}
        clearFilters={clearFilters}
        resultsCount={filteredProducts.length}
      />

      {/* Grid de productos - Optimizado Mobile */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                  avgPrice={avgPrice}
                />
              ))}
            </motion.div>
          ) : (
            <EmptyState onClearFilters={clearFilters} />
          )}
        </AnimatePresence>
      </div>

      {/* Secciones adicionales */}
      <TrustSection />
      <BrandCommitment />
      <CTASection />
    </div>
  )
}

// 🔥 COMPONENTE: FilterDrawer (Mobile)
function FilterDrawer({
  isOpen,
  onClose,
  selectedFirmness,
  setSelectedFirmness,
  selectedPrice,
  setSelectedPrice,
  selectedRating,
  setSelectedRating,
  sortBy,
  setSortBy,
  activeFiltersCount,
  clearFilters,
  resultsCount
}: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-50 shadow-2xl overflow-y-auto lg:hidden"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                    <SlidersHorizontal className="w-6 h-6 text-indigo-600" />
                    Filtros
                  </h2>
                  {activeFiltersCount > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      {activeFiltersCount} {activeFiltersCount === 1 ? 'filtro activo' : 'filtros activos'}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Ordenar */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Ordenar por
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-gray-700 bg-white font-medium"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                  <option value="rating">Mejor valorados</option>
                </select>
              </div>

              {/* Firmeza */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Firmeza
                </label>
                <div className="space-y-2">
                  {filters.firmness.map(f => (
                    <button
                      key={f}
                      onClick={() => setSelectedFirmness(f)}
                      className={`w-full px-4 py-3 rounded-xl font-semibold transition-all text-left ${
                        selectedFirmness === f
                          ? 'bg-indigo-600 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Precio */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Rango de precio
                </label>
                <div className="space-y-2">
                  {filters.price.map(p => (
                    <button
                      key={p}
                      onClick={() => setSelectedPrice(p)}
                      className={`w-full px-4 py-3 rounded-xl font-semibold transition-all text-left ${
                        selectedPrice === p
                          ? 'bg-indigo-600 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Valoración */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Valoración mínima
                </label>
                <div className="space-y-2">
                  {filters.rating.map(r => (
                    <button
                      key={r}
                      onClick={() => setSelectedRating(r)}
                      className={`w-full px-4 py-3 rounded-xl font-semibold transition-all text-left flex items-center gap-2 ${
                        selectedRating === r
                          ? 'bg-indigo-600 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {r !== 'Todas' && <Star className="w-4 h-4 fill-current" />}
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer fijo */}
            <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3">
              <div className="text-center text-sm font-semibold text-gray-600">
                {resultsCount} {resultsCount === 1 ? 'resultado' : 'resultados'}
              </div>
              
              <div className="flex gap-3">
                {activeFiltersCount > 0 && (
                  <button
                    onClick={() => {
                      clearFilters()
                      onClose()
                    }}
                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-bold transition-all"
                  >
                    Limpiar
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Ver resultados
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// 🔥 COMPONENTE: ProductCard (Optimizado Mobile)
function ProductCard({ product, index, isFavorite, onToggleFavorite, avgPrice }: any) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const techFeatures = parseJsonField(product.techFeatures)
  const certifications = parseJsonField(product.certifications)

  const savings = product.originalPrice ? product.originalPrice - product.price : 0
  const isGoodValue = product.rating >= 4.7 && product.price < avgPrice

  const firmnessLevels = ['Suave', 'Media-Suave', 'Media', 'Media-Firme', 'Firme']
  const firmnessLevel = firmnessLevels.indexOf(product.firmness) + 1

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white border-2 border-gray-100 rounded-2xl md:rounded-3xl overflow-hidden hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500"
      >
        {/* Badges */}
        <div className="absolute top-3 md:top-4 left-3 md:left-4 z-20 flex flex-col gap-1.5 md:gap-2">
          {product.isBestSeller && (
            <div className="px-2.5 md:px-3 py-1 md:py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-[10px] md:text-xs font-black shadow-lg flex items-center gap-1">
              <TrendingUp className="w-2.5 md:w-3 h-2.5 md:h-3" />
              MÁS VENDIDO
            </div>
          )}
          {product.isNew && (
            <div className="px-2.5 md:px-3 py-1 md:py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-[10px] md:text-xs font-black shadow-lg">
              NOVEDAD 2025
            </div>
          )}
          {product.discount && product.discount > 0 && (
            <div className="px-2.5 md:px-3 py-1 md:py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-[10px] md:text-xs font-black shadow-lg">
              -{product.discount}%
            </div>
          )}
          {isGoodValue && (
            <div className="px-2.5 md:px-3 py-1 md:py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-[10px] md:text-xs font-black shadow-lg flex items-center gap-1">
              <Star className="w-2.5 md:w-3 h-2.5 md:h-3 fill-white" />
              TOP
            </div>
          )}
        </div>

        {/* Botón favorito */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleFavorite}
          className="absolute top-3 md:top-4 right-3 md:right-4 z-20 w-9 md:w-11 h-9 md:h-11 rounded-full bg-white/95 backdrop-blur-md border-2 border-gray-100 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        >
          <Heart 
            className={`w-4 md:w-5 h-4 md:h-5 transition-all ${
              isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-400'
            }`} 
          />
        </motion.button>

        {/* Imagen del producto */}
        <div className="relative h-64 md:h-80 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            </div>
          )}
          
          {product.images ? (
            <img
              src={product.images}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-6xl md:text-8xl">
              🛏️
            </div>
          )}

          {/* Overlay con features (solo desktop) */}
          <AnimatePresence>
            {isHovered && techFeatures.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent items-end p-6"
              >
                <div className="text-white space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Destacados</span>
                  </div>
                  {techFeatures.slice(0, 3).map((feature: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Efecto shimmer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '200%' } : { x: '-100%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
          />
        </div>

        {/* Contenido - Optimizado Mobile */}
        <div className="p-4 md:p-6 space-y-3 md:space-y-4">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 md:w-4 h-3.5 md:h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-200'
                }`}
              />
            ))}
            <span className="ml-1.5 text-sm font-bold text-gray-900">
              {product.rating}
            </span>
            <span className="text-xs md:text-sm text-gray-500">
              ({(product.reviewCount / 1000).toFixed(1)}K)
            </span>
          </div>

          {/* Nombre */}
          <div>
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-snug line-clamp-2">
              {product.subtitle}
            </p>
          </div>

          {/* Firmness */}
          <div className="inline-flex items-center gap-2 px-2.5 md:px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 md:w-1.5 h-3 md:h-4 rounded-sm ${
                    i < firmnessLevel
                      ? 'bg-indigo-600'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] md:text-xs font-bold text-gray-700">{product.firmness}</span>
          </div>

          {/* Precio */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2 md:gap-3">
              <div className="text-3xl md:text-4xl font-black text-gray-900">
                {product.price}€
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-lg md:text-xl text-gray-400 line-through">
                  {product.originalPrice}€
                </div>
              )}
            </div>
            
            {savings > 0 && (
              <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                <TrendingUp className="w-3 md:w-4 h-3 md:h-4 text-emerald-600" />
                <span className="text-xs md:text-sm font-bold text-emerald-700">
                  Ahorras {savings}€
                </span>
              </div>
            )}
          </div>

          {/* Beneficios */}
          <div className="space-y-1.5 md:space-y-2 py-3 border-y border-gray-100">
            {[
              { icon: Package, text: 'Envío 24-72h' },
              { icon: Shield, text: '3 años garantía' },
              { icon: Clock, text: '100 noches prueba' }
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <benefit.icon className="w-3.5 md:w-4 h-3.5 md:h-4 text-indigo-600 flex-shrink-0" />
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link href={`/producto/${product.slug}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 md:py-4 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group/btn text-sm md:text-base"
            >
              Ver detalles
              <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
          </Link>

          {/* Certificaciones (solo en desktop) */}
          {certifications.length > 0 && (
            <div className="hidden md:flex items-center flex-wrap gap-2 pt-2">
              {certifications.slice(0, 3).map((cert: string, i: number) => (
                <div
                  key={i}
                  className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold rounded-md uppercase tracking-wide"
                >
                  {cert}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// 🔥 COMPONENTE: EmptyState
function EmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 md:py-20"
    >
      <div className="max-w-lg mx-auto bg-white border-2 border-gray-100 rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-sm">
        <div className="w-20 md:w-24 h-20 md:h-24 mx-auto mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-10 md:w-12 h-10 md:h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
          Sin resultados
        </h3>
        <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed px-4">
          No encontramos colchones con estos filtros.
          <br />
          Intenta ajustar tu búsqueda.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearFilters}
          className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-indigo-500/30 transition-all text-sm md:text-base"
        >
          Ver todos los colchones
        </motion.button>
      </div>
    </motion.div>
  )
}

// 🔥 COMPONENTE: TrustSection
function TrustSection() {
  const features = [
    { icon: Truck, title: 'Envío Express Gratis', desc: 'Recíbelo en 24-72h en toda España', color: 'from-blue-500 to-cyan-500' },
    { icon: Shield, title: 'Garantía Extendida', desc: '3 años de cobertura total', color: 'from-indigo-500 to-purple-500' },
    { icon: BadgeCheck, title: '+300 Opiniones', desc: '4.9/5 estrellas verificadas', color: 'from-amber-500 to-orange-500' },
    { icon: Lock, title: 'Pago 100% Seguro', desc: 'Encriptación SSL certificada', color: 'from-emerald-500 to-teal-500' },
    { icon: Globe, title: 'Certificado EU', desc: 'Normativas europeas CE', color: 'from-violet-500 to-purple-500' },
    { icon: Leaf, title: 'Eco-Friendly', desc: 'Materiales sostenibles', color: 'from-green-500 to-emerald-500' }
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 md:mb-4 px-4">
            Tu tranquilidad es nuestra misión
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Cada detalle está pensado para que tu compra sea perfecta
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-white border-2 border-gray-100 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
            >
              <div className={`w-12 md:w-14 h-12 md:h-14 bg-gradient-to-br ${f.color} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                <f.icon className="w-6 md:w-7 h-6 md:h-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 🔥 COMPONENTE: BrandCommitment
function BrandCommitment() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 md:px-5 py-2 rounded-full mb-6 md:mb-8">
            <Leaf className="w-3.5 md:w-4 h-3.5 md:h-4 text-emerald-400" />
            <span className="text-xs md:text-sm font-bold">Compromiso real con el planeta</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight px-4">
            Más que colchones,
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              un futuro sostenible
            </span>
          </h2>
          
          <p className="text-base md:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            Materiales certificados, producción responsable y compromiso con la economía circular.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16">
            {[
              { value: '100%', label: 'Materiales reciclables', icon: Leaf },
              { value: '-40%', label: 'Emisiones CO₂', icon: Globe },
              { value: '0', label: 'Residuos al océano', icon: Shield }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-14 md:w-16 h-14 md:h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 md:w-8 h-7 md:h-8 text-emerald-400" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// 🔥 COMPONENTE: CTASection
function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-16 md:w-20 h-16 md:h-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8"
            >
              <Sparkles className="w-8 md:w-10 h-8 md:h-10" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 leading-tight px-4">
              ¿Aún no sabes cuál elegir?
            </h2>
            
            <p className="text-lg md:text-xl lg:text-2xl mb-3 md:mb-4 max-w-2xl mx-auto leading-relaxed opacity-95 px-4">
              Nuestro test inteligente te recomienda tu colchón ideal
            </p>
            
            <p className="text-sm md:text-base lg:text-lg mb-8 md:mb-12 opacity-80 max-w-xl mx-auto px-4">
              Responde 5 preguntas y descubre qué colchón se adapta perfectamente a ti
            </p>

            <Link href="/simulador">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 md:gap-3 bg-white text-indigo-600 font-black px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl shadow-2xl hover:shadow-white/50 transition-all text-base md:text-lg"
              >
                <Zap className="w-5 md:w-6 h-5 md:h-6" />
                Hacer el test ahora
                <ArrowRight className="w-5 md:w-6 h-5 md:h-6" />
              </motion.button>
            </Link>

            <p className="mt-4 md:mt-6 text-xs md:text-sm opacity-75">
              ⚡ Solo 2 minutos · 100% gratis · Sin compromiso
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}