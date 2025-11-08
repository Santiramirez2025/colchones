// app/producto/[slug]/components/StickyBar.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { 
  ShoppingCart, Minus, Plus, Star, TrendingUp, 
  Check, Heart, Zap, Package, AlertCircle 
} from 'lucide-react'

interface StickyBarProps {
  show: boolean
  product: any
  currentPrice: number
  originalPrice?: number
  quantity: number
  setQuantity: (qty: number) => void
  isOutOfStock: boolean
  handleAddToCart: () => void
  currentImage?: string
  rating?: number
  stockQuantity?: number
}

export default function StickyBar({ 
  show, 
  product, 
  currentPrice, 
  originalPrice, 
  quantity, 
  setQuantity, 
  isOutOfStock, 
  handleAddToCart,
  currentImage,
  rating = 4.5,
  stockQuantity = 0
}: StickyBarProps) {
  const [addedToCart, setAddedToCart] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { scrollY } = useScroll()
  
  // Parallax effect sutil en el background
  const backgroundY = useTransform(scrollY, [0, 300], [0, -50])
  
  const discount = originalPrice && originalPrice > currentPrice 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0

  const lowStock = stockQuantity > 0 && stockQuantity < 5

  const handleAddWithFeedback = () => {
    handleAddToCart()
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const incrementQuantity = () => setQuantity(Math.min(10, quantity + 1))
  const decrementQuantity = () => setQuantity(Math.max(1, quantity - 1))

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[60] backdrop-blur-2xl"
        >
          {/* Background con gradiente animado */}
          <motion.div 
            style={{ y: backgroundY }}
            className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 opacity-95"
          />
          
          {/* Border glow effect */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent"
          />

          {/* Container principal */}
          <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
            <div className="flex items-center justify-between gap-3 md:gap-6">
              
              {/* Info del producto con imagen */}
              <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                {/* Imagen con border animado */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-14 h-14 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 border-white/10 shadow-lg group"
                >
                  {currentImage ? (
                    <>
                      <Image
                        src={currentImage}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 56px, 80px"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Overlay hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl md:text-3xl bg-zinc-800">
                      🛏️
                    </div>
                  )}
                  
                  {/* Badge de descuento */}
                  {discount > 0 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: -12 }}
                      className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-md shadow-lg"
                    >
                      <span className="text-white font-black text-[10px]">-{discount}%</span>
                    </motion.div>
                  )}
                </motion.div>

                {/* Texto info */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-white line-clamp-1 text-sm md:text-base mb-1">
                    {product.name}
                  </h3>
                  
                  {/* Rating inline */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex" role="img" aria-label={`${rating} de 5 estrellas`}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={`sticky-star-${i}`}
                          className={`w-3 h-3 ${
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
                  </div>

                  {/* Precio con savings */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                      {currentPrice}€
                    </span>
                    {originalPrice && (
                      <span className="text-xs md:text-sm text-zinc-500 line-through">
                        {originalPrice}€
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-md text-[10px] text-emerald-400 font-bold">
                        <TrendingUp className="w-3 h-3" />
                        Ahorras {(originalPrice! - currentPrice).toFixed(0)}€
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Controles de acción */}
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                
                {/* Selector de cantidad (desktop) */}
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="hidden md:flex items-center border-2 border-white/10 rounded-xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm"
                >
                  <motion.button
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </motion.button>
                  
                  <span className="text-white font-black w-12 text-center text-lg">
                    {quantity}
                  </span>
                  
                  <motion.button
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={incrementQuantity}
                    disabled={quantity >= 10}
                    className="w-10 h-10 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </motion.button>
                </motion.div>

                {/* Botón favorito (desktop) */}
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`hidden lg:flex items-center justify-center w-12 h-12 rounded-xl border-2 transition-all ${
                    isFavorite 
                      ? 'border-red-500 bg-red-500/20' 
                      : 'border-white/10 bg-zinc-900/50 hover:border-red-500/50'
                  }`}
                  aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                >
                  <Heart className={`w-5 h-5 transition-all ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </motion.button>

                {/* Stock warning badge (mobile) */}
                {lowStock && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="lg:hidden flex items-center gap-1 px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded-lg"
                  >
                    <AlertCircle className="w-3 h-3 text-amber-400" />
                    <span className="text-amber-400 font-bold text-[10px]">{stockQuantity}</span>
                  </motion.div>
                )}

                {/* CTA Principal */}
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                  whileHover={{ scale: isOutOfStock ? 1 : 1.02 }}
                  whileTap={{ scale: isOutOfStock ? 1 : 0.98 }}
                  onClick={handleAddWithFeedback}
                  disabled={isOutOfStock}
                  className="relative overflow-hidden group"
                  aria-label={isOutOfStock ? 'Producto agotado' : `Añadir ${quantity} al carrito`}
                >
                  {/* Background gradiente animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] animate-gradient" />
                  
                  {/* Success overlay */}
                  <AnimatePresence>
                    {addedToCart && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute inset-0 bg-emerald-500 flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Content */}
                  <div className={`relative px-4 md:px-8 py-3 md:py-4 flex items-center gap-2 transition-all ${
                    isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''
                  }`}>
                    {isOutOfStock ? (
                      <>
                        <Package className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        <span className="hidden sm:inline text-white font-bold text-sm md:text-base">
                          Agotado
                        </span>
                      </>
                    ) : addedToCart ? (
                      <>
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        <span className="hidden sm:inline text-white font-bold text-sm md:text-base">
                          ¡Añadido!
                        </span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        <span className="hidden sm:inline text-white font-bold text-sm md:text-base">
                          Añadir
                        </span>
                        <span className="sm:hidden text-white font-bold text-sm">
                          {(currentPrice * quantity).toFixed(0)}€
                        </span>
                      </>
                    )}
                  </div>

                  {/* Shine effect on hover */}
                  {!isOutOfStock && (
                    <motion.div
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Info adicional (desktop only) */}
            <AnimatePresence>
              {lowStock && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="hidden lg:flex items-center justify-center gap-2 mt-3 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl"
                >
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400 text-sm font-bold">
                    ⚠️ Solo quedan {stockQuantity} unidades disponibles
                  </span>
                  <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Shadow inferior para profundidad */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}