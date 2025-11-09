'use client'

import { useState } from 'react'
import { Star, Heart, TrendingUp, Sparkles, Zap, Award, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'

// Tipos
interface ProductCardProps {
  product: {
    id: string
    name: string
    subtitle: string
    price: number
    originalPrice?: number | null
    rating: number
    reviewCount: number
    firmness: string
    images?: string
    slug: string
    isBestSeller?: boolean | null  // ✅ Permitir null
    isNew?: boolean | null  // ✅ Permitir null
    techFeatures?: string | string[]
  }
  index?: number
  isFavorite?: boolean
  onToggleFavorite?: () => void
  avgPrice?: number
}

// Helper para parsear campos que pueden venir como JSON string o array
function parseArrayField(field: string | string[] | undefined): string[] {
  if (!field) return []
  if (Array.isArray(field)) return field
  
  // Si es string, intentar parsearlo como JSON
  if (typeof field === 'string') {
    // Si tiene saltos de línea, dividirlo
    if (field.includes('\n')) {
      return field.split('\n').filter(Boolean)
    }
    // Intentar parsear JSON
    try {
      const parsed = JSON.parse(field)
      return Array.isArray(parsed) ? parsed : [field]
    } catch {
      return [field]
    }
  }
  
  return []
}

export default function ProductCard({ 
  product, 
  index = 0,
  isFavorite = false,
  onToggleFavorite = () => {},
  avgPrice = 1000
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Parsear features de forma segura
  const techFeatures = parseArrayField(product.techFeatures)

  // Cálculos seguros - manejar null correctamente
  const discountPercentage = product.originalPrice && product.originalPrice > 0 && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const firmnessLevels = ['Suave', 'Media-Suave', 'Media', 'Media-Firme', 'Firme']
  const firmnessLevel = Math.max(1, firmnessLevels.indexOf(product.firmness) + 1)

  const isGoodValue = product.rating >= 4.7 && product.price < avgPrice

  // Formateo seguro de números
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  const formatReviews = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative cursor-pointer"
      >
        {/* Main Card Container */}
        <div className={`
          relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800
          rounded-3xl overflow-hidden
          border border-zinc-800
          shadow-2xl
          transition-all duration-700 ease-out
          ${isHovered ? 'scale-[1.02] shadow-violet-500/20 border-violet-500/30' : ''}
        `}>
          
          {/* Animated Background Gradient */}
          <div className={`
            absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-fuchsia-600/10
            opacity-0 transition-opacity duration-700
            ${isHovered ? 'opacity-100' : ''}
          `} />

          {/* Premium Badges Container */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {product.isBestSeller && (
              <div className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-[10px] font-black tracking-wider shadow-lg shadow-amber-500/50 flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3" />
                <span>TOP VENTAS</span>
              </div>
            )}
            {product.isNew && (
              <div className="px-3 py-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full text-white text-[10px] font-black tracking-wider shadow-lg shadow-violet-500/50 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>NUEVO 2025</span>
              </div>
            )}
            {discountPercentage > 0 && (
              <div className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-full text-white text-[10px] font-black tracking-wider shadow-lg shadow-red-500/50">
                <span>-{discountPercentage}%</span>
              </div>
            )}
          </div>

          {/* Floating Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onToggleFavorite()
            }}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            className={`
              absolute top-4 right-4 z-20
              w-11 h-11 rounded-2xl
              backdrop-blur-xl
              border-2 
              flex items-center justify-center
              shadow-lg
              transition-all duration-300
              ${isFavorite 
                ? 'bg-red-500/90 border-red-400 scale-110' 
                : 'bg-white/10 border-white/20 hover:bg-white/20'
              }
            `}
          >
            <Heart 
              className={`w-5 h-5 transition-all duration-300 ${
                isFavorite 
                  ? 'fill-white text-white scale-110' 
                  : 'text-white'
              }`} 
            />
          </button>

          {/* Product Image Container */}
          <div className="relative h-80 bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
              </div>
            )}
            
            {product.images && !imageError ? (
              <img
                src={product.images}
                alt={product.name}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true)
                  setImageLoaded(true)
                }}
                className={`
                  w-full h-full object-cover
                  transition-all duration-700 ease-out
                  ${imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}
                  ${isHovered ? 'scale-110' : 'scale-100'}
                `}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-8xl">
                🛏️
              </div>
            )}

            {/* Tech Features Overlay */}
            {techFeatures.length > 0 && (
              <div className={`
                absolute inset-0 
                bg-gradient-to-t from-black via-black/40 to-transparent
                flex items-end p-6
                transition-opacity duration-500
                ${isHovered ? 'opacity-100' : 'opacity-0'}
              `}>
                <div className="text-white space-y-3 w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-violet-400" />
                    <span className="text-xs font-black uppercase tracking-widest text-violet-400">Características</span>
                  </div>
                  {techFeatures.slice(0, 3).map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 transform transition-all duration-500"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateX(0)' : 'translateX(-20px)',
                        transitionDelay: `${i * 100}ms`
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                      <span className="text-sm font-medium leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shimmer Effect */}
            <div className={`
              absolute inset-0
              bg-gradient-to-r from-transparent via-white/20 to-transparent
              transform skew-x-12
              transition-transform duration-1000
              ${isHovered ? 'translate-x-full' : '-translate-x-full'}
            `} />

            {/* Good Value Badge */}
            {isGoodValue && (
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-emerald-500 rounded-xl text-white text-xs font-black shadow-lg shadow-emerald-500/50 flex items-center gap-1.5">
                <Award className="w-3 h-3" />
                <span>MEJOR PRECIO</span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="relative p-6 space-y-4 bg-gradient-to-br from-zinc-900 to-zinc-800">
            
            {/* Rating Stars */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 transition-all duration-300 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                        : 'text-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-white">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs text-zinc-500">
                ({formatReviews(product.reviewCount)})
              </span>
            </div>

            {/* Product Name */}
            <div>
              <h3 className={`
                text-2xl font-black text-white mb-2 leading-tight
                transition-colors duration-300
                ${isHovered ? 'text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text' : ''}
              `}>
                {product.name}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                {product.subtitle}
              </p>
            </div>

            {/* Firmness Indicator */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`
                      w-1.5 h-5 rounded-sm transition-all duration-300
                      ${i < firmnessLevel
                        ? 'bg-gradient-to-t from-violet-600 to-violet-400 shadow-lg shadow-violet-500/50'
                        : 'bg-zinc-700'
                      }
                    `}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-zinc-300">{product.firmness}</span>
            </div>

            {/* Price Section */}
            <div className="space-y-2 pt-2">
              {/* ✅ Verificar que originalPrice existe, no es null y es mayor que price */}
              {product.originalPrice && product.originalPrice > 0 && product.originalPrice > product.price && (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-zinc-600 line-through">
                    €{formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-bold rounded">
                    AHORRA €{formatPrice(product.originalPrice - product.price)}
                  </span>
                </div>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                  €{formatPrice(product.price)}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={`/producto/${product.slug}`}
              className={`
                block w-full mt-4 py-4 rounded-2xl
                font-black text-white text-sm tracking-wide text-center
                bg-gradient-to-r from-violet-600 to-fuchsia-600
                shadow-lg shadow-violet-500/50
                transition-all duration-300
                hover:shadow-2xl hover:shadow-violet-500/60
                hover:scale-[1.02]
                active:scale-95
              `}
            >
              <span className="flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <span>VER PRODUCTO</span>
              </span>
            </a>
          </div>
        </div>

        {/* Glow Effect on Hover */}
        <div className={`
          absolute inset-0 -z-10 
          bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600
          rounded-3xl blur-2xl
          transition-opacity duration-700
          ${isHovered ? 'opacity-30' : 'opacity-0'}
        `} />
      </div>
    </motion.div>
  )
}