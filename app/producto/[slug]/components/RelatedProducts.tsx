// app/producto/[slug]/components/RelatedProducts.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, TrendingUp, Heart, ShoppingCart, Sparkles } from 'lucide-react'

interface RelatedProductsProps {
  products: any[]
  title: string
}

interface ProductCardProps {
  product: any
  index: number
}

// Componente de card optimizado
function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  
  const discount = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const rating = product.rating || 4.5
  const reviewCount = product.reviews?.length || 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex-shrink-0 w-[280px] md:w-[320px]"
    >
      <Link 
        href={`/producto/${product.slug}`}
        className="group block"
      >
        <div className="relative rounded-2xl p-4 md:p-5 transition-all duration-300 bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-white/5 hover:border-white/20 hover:shadow-2xl hover:shadow-violet-500/10">
          
          {/* Imagen con overlay */}
          <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-zinc-900">
            <Image
              src={product.image || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 280px, 320px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Badges flotantes */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
              {discount > 0 && (
                <motion.div
                  initial={{ scale: 0, rotate: -12 }}
                  animate={{ scale: 1, rotate: -12 }}
                  transition={{ delay: index * 0.05 + 0.2, type: 'spring', stiffness: 300 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg shadow-lg"
                >
                  <p className="text-white font-black text-xs flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    -{discount}%
                  </p>
                </motion.div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault()
                  setIsFavorite(!isFavorite)
                }}
                className={`p-2 rounded-full backdrop-blur-xl border transition-all ${
                  isFavorite 
                    ? 'bg-red-500/30 border-red-500/50' 
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
                aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              >
                <Heart className={`w-4 h-4 transition-all ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </motion.button>
            </div>

            {/* Overlay de hover con CTA */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-4"
                >
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.preventDefault()}
                    className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Vista rápida
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info del producto */}
          <div className="space-y-2">
            <h3 className="text-base md:text-lg font-bold text-white line-clamp-2 leading-tight group-hover:text-violet-400 transition-colors min-h-[2.5rem]">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex" role="img" aria-label={`${rating} de 5 estrellas`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={`star-${product.id}-${i}`}
                    className={`w-3.5 h-3.5 transition-colors ${
                      i < Math.floor(rating) 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-zinc-400 font-medium">
                {rating.toFixed(1)}
              </span>
              {reviewCount > 0 && (
                <span className="text-xs text-zinc-500">
                  ({reviewCount})
                </span>
              )}
            </div>

            {/* Precio */}
            <div className="flex items-baseline gap-2 pt-1">
              <p className="text-2xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {product.price}€
              </p>
              {discount > 0 && (
                <span className="text-sm text-zinc-500 line-through">
                  {product.originalPrice}€
                </span>
              )}
            </div>

            {/* Badge de ahorro */}
            {discount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 + 0.3, type: 'spring' }}
                className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
              >
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-bold">
                  Ahorras {(product.originalPrice - product.price).toFixed(0)}€
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function RelatedProducts({ products, title }: RelatedProductsProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // ✅ Verificar si hay scroll disponible
  const checkScroll = () => {
    if (!scrollContainerRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  // ✅ TODOS LOS HOOKS ANTES DEL RETURN
  useEffect(() => {
    checkScroll()
    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)
    
    return () => {
      container.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [products])

  // ✅ EARLY RETURN DESPUÉS DE TODOS LOS HOOKS
  if (!products || products.length === 0) return null

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    
    const scrollAmount = 340 // Ancho de card + gap
    const targetScroll = direction === 'left' 
      ? scrollContainerRef.current.scrollLeft - scrollAmount
      : scrollContainerRef.current.scrollLeft + scrollAmount

    scrollContainerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
  }

  return (
    <section className="w-full" aria-labelledby="related-products-title">
      {/* Header con controles */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          id="related-products-title"
          className="text-2xl md:text-4xl font-black text-white flex items-center gap-3"
        >
          <span className="hidden sm:inline">✨</span>
          {title}
        </motion.h2>

        {/* Controles de navegación */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 md:p-3 rounded-xl backdrop-blur-xl border transition-all ${
              canScrollLeft
                ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
                : 'bg-white/5 border-white/5 text-zinc-700 cursor-not-allowed'
            }`}
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 md:p-3 rounded-xl backdrop-blur-xl border transition-all ${
              canScrollRight
                ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
                : 'bg-white/5 border-white/5 text-zinc-700 cursor-not-allowed'
            }`}
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Carrusel de productos */}
      <div className="relative">
        {/* Gradientes de fade en los bordes */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
        )}

        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Estilos para ocultar scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}