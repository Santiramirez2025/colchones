import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, TrendingUp, Heart, ShoppingCart, Sparkles, Eye, Zap, Award } from 'lucide-react'

interface RelatedProductsProps {
  products: any[]
  title: string
}

interface ProductCardProps {
  product: any
  index: number
}

// Product Card Premium
function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  
  const discount = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const rating = product.rating || 4.5
  const reviewCount = product.reviews?.length || 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.08, 
        duration: 0.5,
        type: 'spring',
        stiffness: 100
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex-shrink-0 w-[280px] md:w-[320px]"
    >
      <Link 
        href={`/producto/${product.slug}`}
        className="group block"
      >
        <motion.div 
          whileHover={{ y: -8 }}
          className="relative rounded-2xl p-5 transition-all duration-500 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/10 hover:border-violet-500/50 backdrop-blur-xl overflow-hidden"
        >
          {/* Glow effect de fondo */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-fuchsia-500/0 to-violet-500/0 group-hover:from-violet-500/10 group-hover:via-fuchsia-500/5 group-hover:to-violet-500/10 transition-all duration-500" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Imagen con overlay */}
          <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-zinc-900 shadow-2xl">
            <Image
              src={product.images[0] || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 280px, 320px"
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badges flotantes */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-20">
              {discount > 0 && (
                <motion.div
                  initial={{ scale: 0, rotate: -12 }}
                  animate={{ scale: 1, rotate: -12 }}
                  transition={{ delay: index * 0.08 + 0.2, type: 'spring', stiffness: 300 }}
                  className="relative overflow-hidden px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg shadow-xl"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  <p className="relative text-white font-black text-xs flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-white" />
                    -{discount}%
                  </p>
                </motion.div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault()
                  setIsFavorite(!isFavorite)
                }}
                className={`relative p-2 rounded-full backdrop-blur-xl border-2 transition-all shadow-lg ${
                  isFavorite 
                    ? 'bg-red-500/40 border-red-400/60 shadow-red-500/50' 
                    : 'bg-white/10 border-white/30 hover:bg-white/20 shadow-white/20'
                }`}
              >
                {isFavorite && (
                  <motion.div
                    layoutId={`heart-glow-${product.id}`}
                    className="absolute inset-0 bg-red-500/30 rounded-full blur-lg"
                  />
                )}
                <Heart className={`relative w-4 h-4 transition-all ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-white'}`} />
              </motion.button>
            </div>

            {/* Best Seller Badge */}
            {product.isBestSeller && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.08 + 0.3 }}
                className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg shadow-xl"
              >
                <Award className="w-3.5 h-3.5 text-white" />
                <span className="text-white font-bold text-[10px]">MÁS VENDIDO</span>
              </motion.div>
            )}

            {/* Quick View Overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col items-center justify-end p-4 gap-2 z-10"
                >
                  <motion.button
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(139, 92, 246, 0.6)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault()
                      // Aquí iría la lógica de quick view
                      console.log('Quick view:', product.slug)
                    }}
                    className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 animate-[shimmer_2s_infinite]" />
                    <Eye className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Vista rápida</span>
                  </motion.button>

                  <motion.button
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                    transition={{ delay: 0.15 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault()
                      // Aquí iría la lógica de añadir al carrito
                      console.log('Add to cart:', product.slug)
                    }}
                    className="w-full py-2.5 bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Añadir al carrito
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info del producto */}
          <div className="relative z-10 space-y-3">
            <h3 className="text-base md:text-lg font-bold text-white line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400 group-hover:bg-clip-text transition-all duration-300 min-h-[2.5rem]">
              {product.name}
            </h3>
            
            {/* Rating Interactivo */}
            <div className="flex items-center gap-2">
              <div 
                className="flex gap-0.5" 
                role="img" 
                aria-label={`${rating} de 5 estrellas`}
                onMouseLeave={() => setHoveredStar(null)}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`star-${product.id}-${i}`}
                    whileHover={{ scale: 1.2, rotate: 20 }}
                    onHoverStart={() => setHoveredStar(i)}
                  >
                    <Star
                      className={`w-4 h-4 transition-all duration-200 ${
                        i < Math.floor(rating) 
                          ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.8)]' 
                          : hoveredStar !== null && i <= hoveredStar
                            ? 'fill-amber-400/50 text-amber-400/50'
                            : 'text-zinc-700'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <span className="text-xs text-zinc-300 font-semibold">
                {rating.toFixed(1)}
              </span>
              {reviewCount > 0 && (
                <span className="text-xs text-zinc-500">
                  ({reviewCount})
                </span>
              )}
            </div>

            {/* Precio con gradiente */}
            <div className="flex items-baseline gap-2 pt-1">
              <motion.p 
                whileHover={{ scale: 1.05 }}
                className="text-2xl md:text-3xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent drop-shadow-2xl"
              >
                {product.price}€
              </motion.p>
              {discount > 0 && (
                <span className="text-sm text-zinc-500 line-through">
                  {product.originalPrice}€
                </span>
              )}
            </div>

            {/* Badge de ahorro premium */}
            {discount > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.08 + 0.3, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 rounded-lg backdrop-blur-xl"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs text-emerald-300 font-bold">
                  Ahorras {(product.originalPrice - product.price).toFixed(0)}€
                </span>
              </motion.div>
            )}
          </div>

          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-[shimmer_3s_infinite]" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default function RelatedProducts({ products, title }: RelatedProductsProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    
    // Calcular progreso del scroll
    const progress = scrollWidth > clientWidth 
      ? (scrollLeft / (scrollWidth - clientWidth)) * 100 
      : 0
    setScrollProgress(progress)
  }

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

  if (!products || products.length === 0) return null

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    
    const scrollAmount = 340
    const targetScroll = direction === 'left' 
      ? scrollContainerRef.current.scrollLeft - scrollAmount
      : scrollContainerRef.current.scrollLeft + scrollAmount

    scrollContainerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
  }

  return (
    <section className="w-full relative" aria-labelledby="related-products-title">
      {/* Header Premium */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            id="related-products-title"
            className="text-2xl md:text-4xl font-black text-white flex items-center gap-3"
          >
            <span className="inline-flex p-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600">
              <Sparkles className="w-6 h-6 text-white" />
            </span>
            <span className="bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-sm text-zinc-400 mt-2 ml-14">
            {products.length} productos seleccionados para ti
          </p>
        </motion.div>

        {/* Controles de navegación premium */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`relative p-3 rounded-xl backdrop-blur-xl border-2 transition-all shadow-lg ${
              canScrollLeft
                ? 'bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border-violet-500/50 hover:border-violet-400 text-white shadow-violet-500/20'
                : 'bg-white/5 border-white/10 text-zinc-700 cursor-not-allowed'
            }`}
          >
            {canScrollLeft && (
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 blur-lg rounded-xl" />
            )}
            <ChevronLeft className="w-5 h-5 relative z-10" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`relative p-3 rounded-xl backdrop-blur-xl border-2 transition-all shadow-lg ${
              canScrollRight
                ? 'bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border-violet-500/50 hover:border-violet-400 text-white shadow-violet-500/20'
                : 'bg-white/5 border-white/10 text-zinc-700 cursor-not-allowed'
            }`}
          >
            {canScrollRight && (
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 blur-lg rounded-xl" />
            )}
            <ChevronRight className="w-5 h-5 relative z-10" />
          </motion.button>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 h-1 bg-zinc-900 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 rounded-full"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Carrusel Premium */}
      <div className="relative">
        {/* Gradientes de fade mejorados */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-0 bottom-0 w-32 md:w-40 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-20 pointer-events-none"
            />
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {canScrollRight && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 top-0 bottom-0 w-32 md:w-40 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent z-20 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
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

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </section>
  )
}