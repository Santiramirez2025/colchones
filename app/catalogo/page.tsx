'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { 
  Filter, Search, Star, Truck, Shield, X, ChevronDown, 
  Sparkles, Award, Heart, ArrowRight, Check, Info,
  Play, Leaf, Globe, Users, BadgeCheck, TrendingUp,
  Package, Lock, Clock, Zap, AlertCircle
} from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  subtitle: string
  price: number
  originalPrice?: number
  firmness: string
  rating: number
  reviews: number
  badge?: string
  features: string[]
  techFeatures: string[]
  discount?: number
  isNew?: boolean
  isBestSeller?: boolean
  gradient: string
  story: string
  image: string
  certifications: string[]
}

const products: Product[] = [
  {
    id: 1,
    name: 'Cloud Comfort',
    subtitle: 'El equilibrio perfecto entre suavidad y soporte',
    price: 449,
    originalPrice: 599,
    firmness: 'Media-Suave',
    rating: 4.9,
    reviews: 2847,
    badge: 'Más vendido',
    features: ['100 noches prueba', 'Envío gratis 24h', '10 años garantía'],
    techFeatures: ['Espuma viscoelástica premium', '7 zonas de confort', 'Tejido termorregulador'],
    discount: 25,
    isBestSeller: true,
    gradient: 'from-blue-500 to-cyan-500',
    story: 'Diseñado con tecnología de la NASA para distribuir tu peso de forma óptima',
    image: '/products/cloud-comfort.jpg',
    certifications: ['Oeko-Tex', 'CertiPUR-US', 'ISO 9001']
  },
  {
    id: 2,
    name: 'Premium Dream',
    subtitle: 'Tecnología avanzada para el descanso profesional',
    price: 699,
    firmness: 'Media',
    rating: 4.8,
    reviews: 1923,
    badge: 'Mejor valorado',
    features: ['Memoria viscoelástica', 'Sistema anti-ácaros', 'Certificado europeo'],
    techFeatures: ['Gel refrigerante activo', 'Micromuelles ensacados', 'Capa adaptativa'],
    gradient: 'from-purple-500 to-indigo-500',
    story: 'Desarrollado con médicos especialistas en columna vertebral',
    image: '/products/premium-dream.jpg',
    certifications: ['CE', 'Oeko-Tex', 'GOTS']
  },
  {
    id: 3,
    name: 'Luxury Cloud',
    subtitle: 'La experiencia definitiva del descanso de lujo',
    price: 1299,
    firmness: 'Suave',
    rating: 5.0,
    reviews: 1456,
    badge: 'Premium',
    features: ['Tecnología gel adaptativo', 'Máximo confort', 'Garantía lifetime'],
    techFeatures: ['Látex natural orgánico', 'Grafeno termorregulador', 'Sistema anti-gravedad'],
    gradient: 'from-amber-500 to-orange-500',
    story: 'Inspirado en los hoteles de 5 estrellas más exclusivos del mundo',
    image: '/products/luxury-cloud.jpg',
    certifications: ['Oeko-Tex', 'GOLS', 'FSC']
  },
  {
    id: 4,
    name: 'Equilibrio Total',
    subtitle: 'Diseño ergonómico para tu salud postural',
    price: 599,
    firmness: 'Media-Firme',
    rating: 4.7,
    reviews: 3421,
    features: ['Soporte lumbar avanzado', '7 zonas diferenciadas', 'Hipoalergénico'],
    techFeatures: ['Espuma HR alta densidad', 'Canales de ventilación', 'Tratamiento antibacterial'],
    isNew: true,
    gradient: 'from-emerald-500 to-teal-500',
    story: 'Recomendado por fisioterapeutas para una columna saludable',
    image: '/products/equilibrio-total.jpg',
    certifications: ['Oeko-Tex', 'CertiPUR', 'Made in Spain']
  },
  {
    id: 5,
    name: 'Sport Recovery',
    subtitle: 'Optimiza tu recuperación muscular nocturna',
    price: 899,
    firmness: 'Firme',
    rating: 4.9,
    reviews: 1987,
    badge: 'Deportistas',
    features: ['Recuperación activa', 'Extra firme progresivo', 'Tecnología deportiva'],
    techFeatures: ['Espuma reactiva Pro', 'Sistema de presión negativa', 'Fibras de carbono'],
    gradient: 'from-red-500 to-pink-500',
    story: 'Usado por atletas olímpicos para maximizar el descanso',
    image: '/products/sport-recovery.jpg',
    certifications: ['CertiPUR-US', 'Oeko-Tex', 'ISO 9001']
  },
  {
    id: 6,
    name: 'Natural Organic',
    subtitle: 'Sostenibilidad y confort en perfecta armonía',
    price: 1099,
    firmness: 'Media',
    rating: 4.8,
    reviews: 1543,
    badge: 'Eco',
    features: ['100% materiales orgánicos', 'Látex natural', 'Carbono neutral'],
    techFeatures: ['Algodón orgánico certificado', 'Látex Talalay', 'Fibras de bambú'],
    gradient: 'from-lime-500 to-green-500',
    story: 'Cada compra planta 10 árboles. Compromiso con el planeta',
    image: '/products/natural-organic.jpg',
    certifications: ['GOTS', 'GOLS', 'FSC', 'Carbon Neutral']
  }
]

const filters = {
  firmness: ['Todas', 'Suave', 'Media-Suave', 'Media', 'Media-Firme', 'Firme'],
  price: ['Todos', 'Hasta 500€', '500-800€', '800-1200€', 'Más de 1200€'],
  rating: ['Todas', '4.5+', '4.7+', '4.9+']
}

export default function CatalogoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFirmness, setSelectedFirmness] = useState('Todas')
  const [selectedPrice, setSelectedPrice] = useState('Todos')
  const [selectedRating, setSelectedRating] = useState('Todas')
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [sortBy, setSortBy] = useState('featured')
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    return 0
  })

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Hero Section - Clean & Minimal */}
      <section ref={heroRef} className="relative pt-32 pb-16 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 via-transparent to-transparent pointer-events-none" />
        
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full mb-8 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-gray-700">
                  Colección Premium 2025
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                El catálogo del
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    descanso perfecto
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-indigo-200/40 to-purple-200/40 -z-10"
                  />
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto"
              >
                Diseñados en España con tecnología europea.
                <br />
                <span className="text-gray-500">Cada detalle pensado para tu bienestar.</span>
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-8 mb-12"
              >
                {[
                  { icon: Users, value: '+50K', label: 'Clientes felices' },
                  { icon: Star, value: '4.9/5', label: 'Valoración media' },
                  { icon: Award, value: '10 años', label: 'Garantía' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Filters & Search - Floating Design */}
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-gray-900"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {/* Firmness */}
              <select
                value={selectedFirmness}
                onChange={(e) => setSelectedFirmness(e.target.value)}
                className="px-4 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-gray-700 bg-white cursor-pointer"
              >
                <option value="Todas">Firmeza</option>
                {filters.firmness.slice(1).map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>

              {/* Price */}
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="px-4 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-gray-700 bg-white cursor-pointer"
              >
                <option value="Todos">Precio</option>
                {filters.price.slice(1).map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-gray-700 bg-white cursor-pointer"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="rating">Mejor valorados</option>
              </select>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={clearFilters}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Limpiar ({activeFiltersCount})
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-gray-600"
        >
          Mostrando <span className="font-semibold text-gray-900">{filteredProducts.length}</span> colchones
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                  isHovered={hoveredProduct === product.id}
                  onHover={() => setHoveredProduct(product.id)}
                  onLeave={() => setHoveredProduct(null)}
                />
              ))}
            </motion.div>
          ) : (
            <EmptyState onClearFilters={clearFilters} />
          )}
        </AnimatePresence>
      </div>

      {/* Trust Section - Expanded */}
      <TrustSection />

      {/* Brand Commitment Section */}
      <BrandCommitment />

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}

// Product Card Component with 3D Effects
function ProductCard({ 
  product, 
  index, 
  isFavorite, 
  onToggleFavorite,
  isHovered,
  onHover,
  onLeave
}: { 
  product: Product
  index: number
  isFavorite: boolean
  onToggleFavorite: () => void
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full text-xs font-bold text-gray-900 shadow-sm">
              {product.badge}
            </div>
          </div>
        )}

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleFavorite}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm border border-gray-200 flex items-center justify-center shadow-sm transition-colors"
        >
          <Heart 
            className={`w-5 h-5 transition-all ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`} 
          />
        </motion.button>

        {/* Image Container with 3D Effect */}
        <div className="relative h-80 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {/* Placeholder Image */}
          <div className="absolute inset-0 flex items-center justify-center text-8xl">
            🛏️
          </div>

          {/* Hover Story Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end p-6"
              >
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Play className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide">La historia</span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    {product.story}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Shine effect on hover */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={isHovered ? { x: '100%', opacity: 0.3 } : {}}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Rating */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
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
              <span className="ml-2 text-sm font-semibold text-gray-900">
                {product.rating}
              </span>
              <span className="text-sm text-gray-400">
                ({product.reviews.toLocaleString()})
              </span>
            </div>

            {product.isNew && (
              <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full uppercase tracking-wide">
                Nuevo
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {product.subtitle}
          </p>

          {/* Firmness Tag */}
          <div className="inline-block px-3 py-1 bg-gray-100 rounded-lg text-xs font-semibold text-gray-700 mb-4">
            {product.firmness}
          </div>

          {/* Tech Features */}
          <div className="space-y-2 mb-6">
            {product.techFeatures.slice(0, 3).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <div className="text-4xl font-black text-gray-900">
              {product.price}€
            </div>
            {product.originalPrice && (
              <>
                <div className="text-lg text-gray-400 line-through">
                  {product.originalPrice}€
                </div>
                <div className="px-2 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-md">
                  -{product.discount}%
                </div>
              </>
            )}
          </div>

          {/* CTA */}
          <Link href={`/producto/${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              Ver detalles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>

          {/* Certifications */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            {product.certifications.slice(0, 3).map((cert, i) => (
              <div
                key={i}
                className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded"
              >
                {cert}
              </div>
            ))}
          </div>
        </div>

        {/* 3D Shadow Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none" />
      </motion.div>
    </motion.div>
  )
}

// Empty State
function EmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-20"
    >
      <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-3xl p-12 shadow-sm">
        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          No encontramos resultados
        </h3>
        <p className="text-gray-600 mb-8">
          Prueba ajustando los filtros o explora todo nuestro catálogo
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearFilters}
          className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
        >
          Limpiar filtros
        </motion.button>
      </div>
    </motion.div>
  )
}

// Trust Section - Expanded
function TrustSection() {
  const trustFeatures = [
    {
      icon: Truck,
      title: 'Envío Gratis Express',
      description: 'Recíbelo en 24-48h en toda España',
      detail: 'Sin costos ocultos'
    },
    {
      icon: Shield,
      title: 'Garantía 10 Años',
      description: 'Calidad premium certificada',
      detail: 'Servicio postventa excepcional'
    },
    {
      icon: Package,
      title: '100 Noches de Prueba',
      description: 'Devolución gratuita sin preguntas',
      detail: 'Política de satisfacción total'
    },
    {
      icon: BadgeCheck,
      title: 'Opiniones Verificadas',
      description: '+50,000 clientes satisfechos',
      detail: '4.9/5 estrellas reales'
    },
    {
      icon: Lock,
      title: 'Pago 100% Seguro',
      description: 'Encriptación SSL de 256 bits',
      detail: 'Certificado PCI-DSS'
    },
    {
      icon: Globe,
      title: 'Certificado Europeo',
      description: 'Cumple normativas CE',
      detail: 'Oeko-Tex Standard 100'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">
              Compromiso de confianza
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Tu tranquilidad,
            <br />
            nuestra prioridad
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cada detalle diseñado para brindarte seguridad y confianza total
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-2">
                {feature.description}
              </p>
              <p className="text-sm text-gray-500">
                {feature.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white border border-gray-200 rounded-2xl p-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Certificaciones internacionales
            </h3>
            <p className="text-gray-600">
              Cumplimos con los más altos estándares de calidad y sostenibilidad
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['Oeko-Tex Standard 100', 'CertiPUR-US', 'GOTS', 'ISO 9001', 'CE', 'FSC'].map((cert) => (
              <div
                key={cert}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700"
              >
                {cert}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Brand Commitment Section
function BrandCommitment() {
  const commitments = [
    {
      icon: Leaf,
      title: 'Sostenibilidad',
      description: 'Materiales reciclables y procesos eco-responsables',
      details: [
        'Carbono neutral en toda la producción',
        'Algodón orgánico certificado GOTS',
        'Packaging 100% reciclable',
        'Plantamos 10 árboles por cada compra'
      ]
    },
    {
      icon: Users,
      title: 'Ética laboral',
      description: 'Condiciones justas y dignas en toda nuestra cadena',
      details: [
        'Salarios justos certificados',
        'Cero trabajo infantil',
        'Fábricas auditadas anualmente',
        'Comunidades locales beneficiadas'
      ]
    },
    {
      icon: Sparkles,
      title: 'Innovación',
      description: 'Tecnología del sueño desarrollada con expertos',
      details: [
        'I+D con universidades europeas',
        'Colaboración con médicos especialistas',
        'Materiales de última generación',
        'Pruebas clínicas validadas'
      ]
    }
  ]

  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-semibold">
              Nuestros valores
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Compromiso con el futuro
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Más que colchones, construimos un legado de responsabilidad y excelencia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {commitments.map((commitment, index) => (
            <motion.div
              key={commitment.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <commitment.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {commitment.title}
              </h3>
              <p className="text-gray-400 mb-6">
                {commitment.description}
              </p>
              <ul className="space-y-3">
                {commitment.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden"
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </div>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              ¿No sabes cuál elegir?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90">
              Nuestro simulador inteligente analiza tu perfil de sueño y te recomienda el colchón perfecto en 2 minutos
            </p>
            <Link href="/simulador">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-white text-indigo-600 font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-white/20 transition-all"
              >
                <Sparkles className="w-6 h-6" />
                Usar simulador inteligente
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}