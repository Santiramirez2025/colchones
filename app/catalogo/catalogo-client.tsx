'use client'

import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { 
  Search, Star, Truck, Shield, X, 
  Sparkles, Award, Heart, ArrowRight,
  Leaf, Globe, Users, BadgeCheck,
  Lock, Zap, AlertCircle, TrendingUp, 
  Package, Clock, CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// ⚡ Tipo extendido para productos normalizados
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
  images: string // Primera imagen como string
  features: string // String con \n
  techFeatures: string // String con \n
  certifications: string // String con \n
  tags?: string // String con \n
  highlights?: string // String con \n
  benefits?: string // String con \n
  specifications?: string // String con \n
}

// ⚡ Helper para parsear campos normalizados (string con \n o JSON)
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

interface CatalogoClientProps {
  initialProducts: NormalizedProduct[]
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

  // Filtrado optimizado con useMemo
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

  // Calcular precio medio para badge inteligente
  const avgPrice = useMemo(() => {
    return initialProducts.reduce((acc, p) => acc + p.price, 0) / initialProducts.length
  }, [initialProducts])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Premium */}
      <section ref={heroRef} className="relative pt-24 pb-20 overflow-hidden">
        {/* Fondo abstracto suave */}
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
              {/* Badge superior */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 px-5 py-2.5 rounded-full mb-8 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-bold text-gray-800">
                  Colección Premium 2025 · Envío Express Gratis
                </span>
              </motion.div>

              {/* Headline emocional */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight"
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
                    className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-indigo-200/50 via-purple-200/50 to-indigo-200/50 -z-10 rounded-full"
                  />
                </span>
              </motion.h1>

              {/* Subheadline con beneficios */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-3 mb-10"
              >
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                  Colchones diseñados en España con tecnología europea
                </p>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                  Garantía de 3 años · Materiales sostenibles certificados
                </p>
              </motion.div>

              {/* CTA Principal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToProducts}
                  className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all flex items-center gap-3"
                >
                  Ver colchones más vendidos
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <Link href="/simulador">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-2xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    Test personalizado
                  </motion.button>
                </Link>
              </motion.div>

              {/* Stats mejoradas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-8 lg:gap-12"
              >
                {[
                  { icon: Users, value: '+50.000', label: 'Clientes felices', sublabel: 'y contando' },
                  { icon: Star, value: '4.9/5', label: 'Valoración media', sublabel: 'en +12K reseñas' },
                  { icon: Award, value: '10 años', label: 'Garantía extendida', sublabel: 'sin letra pequeña' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50 flex items-center justify-center flex-shrink-0">
                      <stat.icon className="w-7 h-7 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                      <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
                      <div className="text-xs text-gray-500">{stat.sublabel}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Barra de filtros premium */}
      <div ref={productsRef} className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <FilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedFirmness={selectedFirmness}
            setSelectedFirmness={setSelectedFirmness}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            sortBy={sortBy}
            setSortBy={setSortBy}
            activeFiltersCount={activeFiltersCount}
            clearFilters={clearFilters}
            resultsCount={filteredProducts.length}
          />
        </div>
      </div>

      {/* Grid de productos */}
      <div className="container mx-auto px-4 py-16">
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <ProductGrid
              products={filteredProducts}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              avgPrice={avgPrice}
            />
          ) : (
            <EmptyState onClearFilters={clearFilters} />
          )}
        </AnimatePresence>
      </div>

      {/* Trust & CTA Sections */}
      <TrustSection />
      <BrandCommitment />
      <CTASection />
    </div>
  )
}

// 🔥 COMPONENTE: FilterBar
function FilterBar({
  searchTerm,
  setSearchTerm,
  selectedFirmness,
  setSelectedFirmness,
  selectedPrice,
  setSelectedPrice,
  sortBy,
  setSortBy,
  activeFiltersCount,
  clearFilters,
  resultsCount
}: any) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Búsqueda */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Busca tu colchón ideal..."
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-900 placeholder:text-gray-400 font-medium"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedFirmness}
            onChange={(e) => setSelectedFirmness(e.target.value)}
            className="px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-700 bg-white cursor-pointer font-medium hover:border-gray-300"
          >
            {filters.firmness.map(f => (
              <option key={f} value={f}>{f === 'Todas' ? 'Todas las firmezas' : f}</option>
            ))}
          </select>

          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-700 bg-white cursor-pointer font-medium hover:border-gray-300"
          >
            {filters.price.map(p => (
              <option key={p} value={p}>{p === 'Todos' ? 'Todos los precios' : p}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-700 bg-white cursor-pointer font-medium hover:border-gray-300"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="rating">Mejor valorados</option>
          </select>

          {activeFiltersCount > 0 && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="px-5 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Limpiar ({activeFiltersCount})
            </motion.button>
          )}
        </div>
      </div>

      {/* Contador de resultados */}
      <motion.div
        layout
        className="flex items-center justify-between text-sm"
      >
        <span className="text-gray-600">
          Mostrando <span className="font-bold text-gray-900">{resultsCount}</span> {resultsCount === 1 ? 'colchón' : 'colchones'}
        </span>
      </motion.div>
    </div>
  )
}

// 🔥 COMPONENTE: ProductGrid
function ProductGrid({ products, favorites, onToggleFavorite, avgPrice }: any) {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {products.map((product: NormalizedProduct, index: number) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={() => onToggleFavorite(product.id)}
          avgPrice={avgPrice}
        />
      ))}
    </motion.div>
  )
}

// 🔥 COMPONENTE: ProductCard (Premium)
function ProductCard({ product, index, isFavorite, onToggleFavorite, avgPrice }: any) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const techFeatures = parseJsonField(product.techFeatures)
  const certifications = parseJsonField(product.certifications)

  const savings = product.originalPrice ? product.originalPrice - product.price : 0
  const isGoodValue = product.rating >= 4.7 && product.price < avgPrice

  // Determinar firmness level para visualización
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
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative bg-white border-2 border-gray-100 rounded-3xl overflow-hidden hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
      >
        {/* Badges superiores */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.isBestSeller && (
            <div className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs font-black shadow-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              MÁS VENDIDO
            </div>
          )}
          {product.isNew && (
            <div className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-xs font-black shadow-lg">
              NOVEDAD 2025
            </div>
          )}
          {product.discount && product.discount > 0 && (
            <div className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs font-black shadow-lg">
              -{product.discount}% OFERTA
            </div>
          )}
          {isGoodValue && (
            <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs font-black shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" />
              CALIDAD/PRECIO
            </div>
          )}
        </div>

        {/* Botón favorito */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleFavorite}
          className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border-2 border-gray-100 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        >
          <Heart 
            className={`w-5 h-5 transition-all ${
              isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-400'
            }`} 
          />
        </motion.button>

        {/* Imagen del producto */}
        <div className="relative h-80 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
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
            <div className="absolute inset-0 flex items-center justify-center text-8xl">
              🛏️
            </div>
          )}

          {/* Overlay con features en hover */}
          <AnimatePresence>
            {isHovered && techFeatures.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-end p-6"
              >
                <div className="text-white space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Características destacadas</span>
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

          {/* Efecto shimmer en hover */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '200%' } : { x: '-100%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
          />
        </div>

        {/* Contenido de la card */}
        <div className="p-6 space-y-4">
          {/* Rating & Reviews */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-bold text-gray-900">
                {product.rating}
              </span>
              <span className="text-sm text-gray-500">
                ({(product.reviewCount / 1000).toFixed(1)}K)
              </span>
            </div>
          </div>

          {/* Nombre & Subtitle */}
          <div>
            <h3 className="text-2xl font-black text-gray-900 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 leading-snug">
              {product.subtitle}
            </p>
          </div>

          {/* Firmness visual */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-4 rounded-sm ${
                    i < firmnessLevel
                      ? 'bg-indigo-600'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-700">{product.firmness}</span>
          </div>

          {/* Precio con psicología */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <div className="text-4xl font-black text-gray-900">
                {product.price}€
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <div className="text-xl text-gray-400 line-through">
                    {product.originalPrice}€
                  </div>
                </>
              )}
            </div>
            
            {savings > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg"
              >
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-700">
                  Ahorras {savings}€ hoy
                </span>
              </motion.div>
            )}
          </div>

          {/* Beneficios rápidos */}
          <div className="space-y-2 py-3 border-y border-gray-100">
            {[
              { icon: Package, text: 'Envío express 24-72h' },
              { icon: Shield, text: '10 años de garantía' },
              { icon: Clock, text: '100 noches de prueba' }
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
                <benefit.icon className="w-4 h-4 text-indigo-600" />
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Principal */}
          <Link href={`/producto/${product.slug}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group/btn"
            >
              Descubre más detalles
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
          </Link>

          {/* Certificaciones */}
          {certifications.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 pt-2">
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
      className="text-center py-20"
    >
      <div className="max-w-lg mx-auto bg-white border-2 border-gray-100 rounded-3xl p-12 shadow-sm">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-3xl font-black text-gray-900 mb-3">
          Sin resultados
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          No encontramos colchones con estos filtros.
          <br />
          Intenta ajustar tu búsqueda o explora todo el catálogo.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearFilters}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-indigo-500/30 transition-all"
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
    { icon: Shield, title: 'Garantía Extendida', desc: '10 años de cobertura total', color: 'from-indigo-500 to-purple-500' },
    { icon: BadgeCheck, title: '+50K Opiniones', desc: '4.9/5 estrellas verificadas', color: 'from-amber-500 to-orange-500' },
    { icon: Lock, title: 'Pago 100% Seguro', desc: 'Encriptación SSL certificada', color: 'from-emerald-500 to-teal-500' },
    { icon: Globe, title: 'Certificado EU', desc: 'Normativas europeas CE', color: 'from-violet-500 to-purple-500' },
    { icon: Leaf, title: 'Eco-Friendly', desc: 'Materiales sostenibles', color: 'from-green-500 to-emerald-500' }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Tu tranquilidad es nuestra misión
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cada detalle está pensado para que tu compra sea perfecta
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                <f.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
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
    <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Elementos decorativos */}
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
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-full mb-8">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold">Compromiso real con el planeta</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Más que colchones,
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              un futuro sostenible
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
            Materiales certificados, producción responsable y compromiso con la economía circular.
            Porque descansar bien también significa cuidar del mañana.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
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
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden shadow-2xl"
        >
          {/* Elementos decorativos */}
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
              className="w-20 h-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-3xl flex items-center justify-center mx-auto mb-8"
            >
              <Sparkles className="w-10 h-10" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              ¿Aún no sabes cuál elegir?
            </h2>
            
            <p className="text-xl md:text-2xl mb-4 max-w-2xl mx-auto leading-relaxed opacity-95">
              Nuestro test inteligente te recomienda tu colchón ideal
            </p>
            
            <p className="text-lg mb-12 opacity-80 max-w-xl mx-auto">
              Responde 5 preguntas y descubre qué colchón se adapta perfectamente a ti
            </p>

            <Link href="/simulador">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-white text-indigo-600 font-black px-10 py-5 rounded-2xl shadow-2xl hover:shadow-white/50 transition-all text-lg"
              >
                <Zap className="w-6 h-6" />
                Hacer el test ahora
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>

            <p className="mt-6 text-sm opacity-75">
              ⚡ Solo 2 minutos · 100% gratis · Sin compromiso
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}