// app/catalogo/components/ProductCard.tsx - ✅ REVISADO Y CORREGIDO
'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Star, Heart, TrendingUp, Sparkles, Zap, Award, ShoppingBag, Info, X, CreditCard } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { formatARS } from '@/lib/utils/currency'
import { getMejorCuota, calcularTodasLasCuotas } from '@/lib/utils/pricing'

// ============================================================================
// TYPES
// ============================================================================
interface ProductCardProps {
  product: {
    id: string
    name: string
    subtitle?: string | null
    price: number // Ya en pesos (no centavos)
    originalPrice?: number | null
    compareAtPrice?: number | null
    discount?: number | null
    rating: number
    reviewCount: number
    firmness?: string | null
    images?: string | string[] | null
    slug: string
    isBestSeller?: boolean | null
    isNew?: boolean | null
    isPremium?: boolean | null
    isEco?: boolean | null
    antiMite?: boolean | null
    pillowTop?: boolean | null
    includesBase?: boolean | null
    techFeatures?: string | string[] | null
    mainColor?: string | null
    category?: string | null
  }
  index?: number
  isFavorite?: boolean
  onToggleFavorite?: (id: string) => void
  avgPrice?: number
}

// ============================================================================
// HELPERS
// ============================================================================
function parseArrayField(field: string | string[] | null | undefined): string[] {
  if (!field) return []
  if (Array.isArray(field)) return field.filter(Boolean)
  
  if (typeof field === 'string') {
    if (field.includes('\n')) {
      return field.split('\n').filter(Boolean)
    }
    try {
      const parsed = JSON.parse(field)
      return Array.isArray(parsed) ? parsed : [field]
    } catch {
      return [field]
    }
  }
  
  return []
}

// Hook para persistencia de favoritos
function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  
  useEffect(() => {
    try {
      const stored = localStorage.getItem('product-favorites')
      if (stored) {
        setFavorites(new Set(JSON.parse(stored)))
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
  }, [])
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      try {
        localStorage.setItem('product-favorites', JSON.stringify([...next]))
      } catch (error) {
        console.error('Error saving favorites:', error)
      }
      return next
    })
  }
  
  return { favorites, toggleFavorite }
}

// Hook para detección de tema
function useTheme() {
  const [isDark, setIsDark] = useState(false)
  
  useEffect(() => {
    // ✅ Forzar modo claro para el catálogo
    setIsDark(false)
  }, [])
  
  return isDark
}

// Generar descripción con IA (mock)
function generateAIDescription(product: any): string {
  const descriptions = [
    `Diseñado con tecnología de vanguardia para el descanso perfecto`,
    `La elección inteligente para quienes buscan confort premium`,
    `Innovación y calidad unidas en cada detalle`,
    `Experiencia de descanso de nivel superior`,
    `Tecnología adaptativa para tu mejor descanso`
  ]
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

// Formatear cantidad de reviews
function formatReviews(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return count.toString()
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ProductCard({ 
  product, 
  index = 0,
  onToggleFavorite,
  avgPrice = 30000
}: ProductCardProps) {
  const isDark = useTheme()
  const { favorites, toggleFavorite: localToggleFavorite } = useFavorites()
  const isFavorite = favorites.has(product.id)
  
  // Estado local
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)
  const [showCuotasDetail, setShowCuotasDetail] = useState(false)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([])
  
  // Refs
  const cardRef = useRef<HTMLDivElement>(null)
  const particleIdRef = useRef(0)
  
  // Motion values para efecto 3D
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring suave para rotación 3D
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 150,
    damping: 20
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 150,
    damping: 20
  })
  
  // ✅ Calcular cuotas
  const mejorCuota = useMemo(() => getMejorCuota(product.price), [product.price])
  const todasLasCuotas = useMemo(() => calcularTodasLasCuotas(product.price), [product.price])
  
  // ✅ Manejar imagen (puede ser string o array)
  const productImage = useMemo(() => {
    if (!product.images) return '/images/placeholder-colchon.jpg'
    if (typeof product.images === 'string') return product.images
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0]
    }
    return '/images/placeholder-colchon.jpg'
  }, [product.images])
  
  // Parsear features
  const techFeatures = useMemo(() => {
    const features = parseArrayField(product.techFeatures)
    return features.length > 0 ? features : ['Confort garantizado', 'Calidad premium', 'Fabricación nacional']
  }, [product.techFeatures])
  
  // Cálculos
  const discountPercentage = useMemo(() => {
    if (product.originalPrice && product.originalPrice > 0 && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    }
    return product.discount || 0
  }, [product.originalPrice, product.price, product.discount])
  
  const firmnessLevels = ['EXTRA_BLANDO', 'BLANDO', 'MEDIO', 'FIRME', 'MEDIO_FIRME', 'EXTRA_FIRME']
  const firmnessIndex = product.firmness ? firmnessLevels.indexOf(product.firmness.toUpperCase()) : 2
  const firmnessLevel = Math.max(1, Math.min(5, firmnessIndex >= 0 ? firmnessIndex + 1 : 3))
  const isGoodValue = product.rating >= 4.7 && product.price < avgPrice
  
  // AI Description
  const aiDescription = useMemo(() => generateAIDescription(product), [product.id])
  
  // Color principal
  const mainColor = product.mainColor || '#3b82f6' // blue-500 por defecto
  
  // Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    
    mouseX.set(x)
    mouseY.set(y)
  }
  
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Crear partículas
    const rect = cardRef.current?.getBoundingClientRect()
    if (rect) {
      const newParticles = Array.from({ length: 8 }, () => ({
        id: particleIdRef.current++,
        x: rect.right - 50,
        y: rect.top + 30
      }))
      setParticles(prev => [...prev, ...newParticles])
      
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)))
      }, 1000)
    }
    
    if (onToggleFavorite) {
      onToggleFavorite(product.id)
    } else {
      localToggleFavorite(product.id)
    }
  }
  
  // ✅ MODO CLARO FORZADO
  const bgClass = 'bg-white'
  const textClass = 'text-gray-900'
  const textSecondaryClass = 'text-gray-600'
  const borderClass = 'border-gray-200'
  
  return (
    <>
      {/* Partículas de favorito */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 1, scale: 0, x: particle.x, y: particle.y }}
            animate={{
              opacity: 0,
              scale: 1.5,
              x: particle.x + (Math.random() - 0.5) * 100,
              y: particle.y - 100 - Math.random() * 50,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed pointer-events-none z-50"
            style={{ left: 0, top: 0 }}
          >
            <Heart className="w-6 h-6 fill-red-500 text-red-500" />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQuickView(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white max-w-2xl w-full rounded-3xl p-8 border border-gray-200 shadow-2xl relative"
            >
              <button
                onClick={() => setShowQuickView(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-500 flex items-center justify-center transition-colors"
                aria-label="Cerrar vista rápida"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-2xl font-black text-gray-900 mb-4">
                Especificaciones Técnicas
              </h3>
              
              <div className="space-y-3">
                {techFeatures.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-gray-50"
                  >
                    <Zap className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-900">{feature}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Recomendación IA
                  </span>
                </div>
                <p className="text-sm text-gray-900">{aiDescription}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.05,
          type: 'spring',
          stiffness: 100
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full group"
      >
        <div className="relative">
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 -z-10 rounded-3xl blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle at center, ${mainColor}, transparent 70%)`
            }}
          />
          
          {/* Card Container */}
          <div className="relative bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/10">
            
            {/* Badges Container */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
              {product.isBestSeller && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-[10px] font-black tracking-wider flex items-center gap-1.5 shadow-lg"
                >
                  <TrendingUp className="w-3 h-3" />
                  <span>TOP VENTAS</span>
                </motion.div>
              )}
              
              {product.isNew && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white text-[10px] font-black tracking-wider flex items-center gap-1.5 shadow-lg"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>NUEVO 2025</span>
                </motion.div>
              )}
              
              {discountPercentage > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-full text-white text-[10px] font-black tracking-wider shadow-lg"
                >
                  <span>-{discountPercentage}%</span>
                </motion.div>
              )}
            </div>
            
            {/* Favorite Button */}
            <motion.button
              onClick={handleFavoriteClick}
              whileTap={{ scale: 0.9 }}
              className={`absolute top-4 right-4 z-20 w-11 h-11 rounded-xl backdrop-blur-md border flex items-center justify-center shadow-lg transition-all ${
                isFavorite 
                  ? 'bg-red-500 border-red-400' 
                  : 'bg-white/90 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Heart 
                className={`w-5 h-5 transition-all ${
                  isFavorite ? 'fill-white text-white' : 'text-gray-700'
                }`} 
              />
            </motion.button>
            
            {/* Quick View Button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault()
                setShowQuickView(true)
              }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-16 right-4 z-20 opacity-0 group-hover:opacity-100 w-11 h-11 rounded-xl backdrop-blur-md bg-white/90 border border-gray-200 flex items-center justify-center shadow-lg transition-all hover:bg-gray-50"
            >
              <Info className="w-5 h-5 text-gray-700" />
            </motion.button>
            
            {/* Image Container */}
            <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 animate-pulse bg-gray-200" />
              )}
              
              <motion.img
                src={productImage}
                alt={product.name}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true)
                  setImageLoaded(true)
                }}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={imageLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Good Value Badge */}
              {isGoodValue && (
                <div className="absolute bottom-4 left-4">
                  <div className="px-3 py-1.5 bg-emerald-500 rounded-xl text-white text-xs font-black shadow-lg flex items-center gap-1.5">
                    <Award className="w-3 h-3" />
                    <span>MEJOR PRECIO</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Content Section */}
            <div className="p-6 space-y-4 bg-white">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500">
                  ({formatReviews(product.reviewCount)})
                </span>
              </div>
              
              {/* Product Name */}
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.subtitle || 'Confort y calidad garantizados'}
                </p>
              </div>
              
              {/* Firmness */}
              {product.firmness && (
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-5 rounded-sm ${
                          i < firmnessLevel
                            ? 'bg-gradient-to-t from-blue-600 to-blue-400'
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-700">
                    {product.firmness}
                  </span>
                </div>
              )}
              
              {/* ✅ PRECIO CON CUOTAS */}
              <div className="space-y-3 pt-2">
                {/* Precio original */}
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">
                      {formatARS(product.originalPrice)}
                    </span>
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded">
                      AHORRÁS {formatARS(product.originalPrice - product.price)}
                    </span>
                  </div>
                )}
                
                {/* Precio de contado */}
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-black text-gray-900">
                      {formatARS(product.price)}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-600 font-bold">
                    CONTADO • Transferencia • Débito
                  </span>
                </div>
                
                {/* Mejor cuota */}
                <motion.button
                  onClick={(e) => {
                    e.preventDefault()
                    setShowCuotasDetail(!showCuotasDetail)
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <div className="text-left">
                      <div className="text-xs text-blue-600 font-semibold">
                        Hasta {mejorCuota.cuotas} cuotas
                      </div>
                      <div className="text-sm font-black text-gray-900">
                        {mejorCuota.formatted.precioCuota}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: showCuotasDetail ? 180 : 0 }}
                    className="text-blue-600"
                  >
                    ▼
                  </motion.div>
                </motion.button>
                
                {/* Dropdown cuotas */}
                <AnimatePresence>
                  {showCuotasDetail && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                        {todasLasCuotas.map((cuota) => (
                          <div
                            key={cuota.cuotas}
                            className="flex items-center justify-between p-2 rounded-lg bg-white"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-xs font-bold text-blue-600">
                                  {cuota.cuotas}
                                </span>
                              </div>
                              <span className="text-xs font-semibold text-gray-900">
                                {cuota.formatted.precioCuota}
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-500">
                              {cuota.formatted.precioTotal}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* CTA Button */}
              <motion.a
                href={`/producto/${product.slug}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full py-4 rounded-2xl font-black text-white text-sm tracking-wide text-center bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg hover:shadow-xl transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>VER PRODUCTO</span>
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}