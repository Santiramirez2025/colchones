// app/producto/[slug]/components/ProductInfo.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, memo } from 'react'
import {
  Star, Heart, Share2, ChevronRight, AlertCircle, TrendingUp, Layers, Wind,
  Bed, Minus, Plus, ShoppingCart, CheckCircle2, Lock, Facebook, Twitter, Mail, Copy, Check
} from 'lucide-react'

interface ProductInfoProps {
  product: any
  averageRatings: { average: number; count: number }
  currentPrice: number
  originalPrice?: number
  savings: number
  stockInfo: { lowStock: boolean; quantity: number }
  variants: any[]
  selectedVariant: any
  setSelectedVariant: (variant: any) => void
  quantity: number
  setQuantity: (qty: number) => void
  isOutOfStock: boolean
  handleAddToCart: () => void
  isFavorite: boolean
  setIsFavorite: (fav: boolean) => void
  handleShare: (platform?: string) => void
  showShareMenu: boolean
  features?: any[]
  setActiveTab: (tab: string) => void
}

// Componente de Rating optimizado
const RatingStars = memo(({ rating }: { rating: number }) => (
  <div className="flex" role="img" aria-label={`${rating} de 5 estrellas`}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
          i < Math.floor(rating)
            ? 'fill-amber-400 text-amber-400'
            : 'text-zinc-700'
        }`}
        aria-hidden="true"
      />
    ))}
  </div>
))
RatingStars.displayName = 'RatingStars'

// Componente de Badge de Stock
const StockBadge = memo(({ quantity }: { quantity: number }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 px-3 md:px-4 py-2 rounded-xl"
    role="status"
    aria-live="polite"
  >
    <AlertCircle className="w-4 h-4 md:w-5 md:h-5 animate-pulse" aria-hidden="true" />
    <div className="text-right">
      <p className="font-black text-xs md:text-sm">¡Stock limitado!</p>
      <p className="text-[10px] md:text-xs">Solo quedan {quantity}</p>
    </div>
  </motion.div>
))
StockBadge.displayName = 'StockBadge'

// Componente de menú de compartir
const ShareMenu = memo(({ onShare }: { onShare: (platform: string) => void }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    onShare('copy')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [onShare])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.15 }}
      className="absolute right-0 mt-2 w-56 p-2 bg-zinc-900 rounded-xl shadow-2xl border border-white/20 z-50 origin-top-right backdrop-blur-xl"
      role="menu"
      aria-label="Opciones para compartir"
    >
      <button 
        onClick={handleCopy} 
        className="flex items-center gap-3 w-full p-3 text-sm text-white hover:bg-white/5 rounded-lg transition-all group"
        role="menuitem"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
        ) : (
          <Copy className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" aria-hidden="true" />
        )}
        <span className="font-medium">{copied ? '¡Copiado!' : 'Copiar enlace'}</span>
      </button>
      <button 
        onClick={() => onShare('twitter')} 
        className="flex items-center gap-3 w-full p-3 text-sm text-white hover:bg-white/5 rounded-lg transition-all group"
        role="menuitem"
      >
        <Twitter className="w-4 h-4 text-blue-400" aria-hidden="true" />
        <span className="font-medium">Compartir en Twitter</span>
      </button>
      <button 
        onClick={() => onShare('facebook')} 
        className="flex items-center gap-3 w-full p-3 text-sm text-white hover:bg-white/5 rounded-lg transition-all group"
        role="menuitem"
      >
        <Facebook className="w-4 h-4 text-blue-600" aria-hidden="true" />
        <span className="font-medium">Compartir en Facebook</span>
      </button>
      <button 
        onClick={() => onShare('mail')} 
        className="flex items-center gap-3 w-full p-3 text-sm text-white hover:bg-white/5 rounded-lg transition-all group"
        role="menuitem"
      >
        <Mail className="w-4 h-4 text-red-400" aria-hidden="true" />
        <span className="font-medium">Enviar por email</span>
      </button>
    </motion.div>
  )
})
ShareMenu.displayName = 'ShareMenu'

export default function ProductInfo({ 
  product, 
  averageRatings, 
  currentPrice, 
  originalPrice, 
  savings,
  stockInfo,
  variants,
  selectedVariant,
  setSelectedVariant,
  quantity,
  setQuantity,
  isOutOfStock,
  handleAddToCart,
  isFavorite,
  setIsFavorite,
  handleShare,
  showShareMenu,
  setActiveTab
}: ProductInfoProps) {
  const [addedToCart, setAddedToCart] = useState(false)
  const hasDiscount = originalPrice && originalPrice > currentPrice

  const handleAddToCartWithFeedback = useCallback(() => {
    handleAddToCart()
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }, [handleAddToCart])

  const incrementQuantity = useCallback(() => {
    setQuantity(Math.min(10, quantity + 1))
  }, [quantity, setQuantity])

  const decrementQuantity = useCallback(() => {
    setQuantity(Math.max(1, quantity - 1))
  }, [quantity, setQuantity])

  return (
    <motion.article
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-6 md:space-y-8"
    >
      {/* Header: Título y Rating */}
      <header className="space-y-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
          {product.name}
        </h1>
        
        {product.subtitle && (
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
            {product.subtitle}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 md:gap-6 pb-4 md:pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <RatingStars rating={averageRatings.average} />
            <span className="font-bold text-white text-sm md:text-base" aria-label={`Calificación promedio`}>
              {averageRatings.average.toFixed(1)}
            </span>
            <span className="text-zinc-500 text-sm md:text-base" aria-label={`${averageRatings.count} opiniones`}>
              ({averageRatings.count})
            </span>
          </div>

          <button 
            onClick={() => setActiveTab('reviews')}
            className="text-violet-400 hover:text-violet-300 font-semibold text-sm flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded-lg px-2 py-1"
            aria-label="Ver todas las opiniones de clientes"
          >
            Leer opiniones
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Precio con énfasis en conversión */}
      <section 
        className="p-4 md:p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl"
        aria-labelledby="price-section"
      >
        <h2 id="price-section" className="sr-only">Información de precio</h2>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-baseline gap-3 md:gap-4 mb-2 flex-wrap">
              <span 
                className="text-4xl md:text-6xl font-black text-white"
                aria-label={`Precio actual ${currentPrice} euros`}
              >
                {currentPrice}€
              </span>
              {hasDiscount && (
                <span 
                  className="text-2xl md:text-3xl text-zinc-500 line-through"
                  aria-label={`Precio anterior ${originalPrice} euros`}
                >
                  {originalPrice}€
                </span>
              )}
            </div>
            
            <AnimatePresence mode="wait">
              {savings > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400 px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-sm md:text-base"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span className="font-bold">Ahorras {savings}€ ({Math.round((savings / originalPrice!) * 100)}%)</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {stockInfo.lowStock && <StockBadge quantity={stockInfo.quantity} />}
        </div>
      </section>

      {/* Especificaciones rápidas con iconos semánticos */}
      <section 
        className="grid grid-cols-3 gap-3 md:gap-4 p-4 md:p-6 bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 rounded-xl md:rounded-2xl border border-white/10"
        aria-labelledby="specs-section"
      >
        <h2 id="specs-section" className="sr-only">Especificaciones principales</h2>
        
        <div className="text-center" role="group" aria-label="Nivel de firmeza">
          <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-violet-400 mx-auto mb-2" aria-hidden="true" />
          <p className="text-[10px] md:text-xs text-zinc-500 mb-1">Firmeza</p>
          <p className="font-black text-white text-lg md:text-xl">{product.firmnessValue}%</p>
          <p className="text-[9px] md:text-[10px] text-zinc-600">{product.firmness}</p>
        </div>

        <div className="text-center" role="group" aria-label="Altura del colchón">
          <Layers className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" aria-hidden="true" />
          <p className="text-[10px] md:text-xs text-zinc-500 mb-1">Altura</p>
          <p className="font-black text-white text-lg md:text-xl">{product.height}cm</p>
          <p className="text-[9px] md:text-[10px] text-zinc-600">Grosor total</p>
        </div>

        <div className="text-center" role="group" aria-label="Nivel de transpirabilidad">
          <Wind className="w-5 h-5 md:w-6 md:h-6 text-fuchsia-400 mx-auto mb-2" aria-hidden="true" />
          <p className="text-[10px] md:text-xs text-zinc-500 mb-1">Transpirabilidad</p>
          <p className="font-black text-white text-lg md:text-xl">{product.transpirability}%</p>
          <p className="text-[9px] md:text-[10px] text-zinc-600">Ventilación</p>
        </div>
      </section>

      {/* Selector de variantes mejorado */}
      {variants.length > 0 && (
        <section aria-labelledby="variant-section">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <label 
              id="variant-section"
              className="block font-bold text-white flex items-center gap-2 text-sm md:text-base"
            >
              <Bed className="w-4 h-4 md:w-5 md:h-5 text-violet-400" aria-hidden="true" />
              Selecciona tu medida
            </label>
            {selectedVariant && (
              <span className="text-xs text-zinc-400">
                Seleccionado: <span className="text-white font-semibold">{selectedVariant.size}</span>
              </span>
            )}
          </div>

          <div 
            className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3"
            role="radiogroup"
            aria-label="Tamaños disponibles"
          >
            {variants.map((variant: any) => (
              <motion.button
                key={variant.id}
                whileHover={{ scale: variant.stock > 0 ? 1.02 : 1 }}
                whileTap={{ scale: variant.stock > 0 ? 0.98 : 1 }}
                onClick={() => variant.stock > 0 && setSelectedVariant(variant)}
                disabled={variant.stock === 0}
                role="radio"
                aria-checked={selectedVariant?.id === variant.id}
                aria-label={`Tamaño ${variant.size}, precio ${variant.price} euros, ${variant.stock === 0 ? 'agotado' : variant.stock < 5 ? `solo ${variant.stock} disponibles` : 'disponible'}`}
                className={`relative p-3 md:p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-950 ${
                  selectedVariant?.id === variant.id
                    ? 'border-violet-500 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 shadow-lg shadow-violet-500/20'
                    : 'border-white/10 hover:border-white/20 bg-zinc-900/50'
                } ${variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <p className="font-bold text-white text-sm md:text-base">{variant.size}</p>
                <p className="text-xs md:text-sm text-zinc-400">{variant.price}€</p>
                
                {variant.stock < 5 && variant.stock > 0 && (
                  <span className="absolute top-2 right-2 flex items-center gap-1 bg-amber-500/20 text-amber-400 px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg text-[9px] md:text-[10px] font-bold">
                    <AlertCircle className="w-2.5 h-2.5 md:w-3 md:h-3" aria-hidden="true" />
                    {variant.stock}
                  </span>
                )}

                {variant.stock === 0 && (
                  <span className="absolute inset-0 bg-zinc-900/90 rounded-xl flex items-center justify-center text-xs font-semibold text-zinc-500 backdrop-blur-sm">
                    Agotado
                  </span>
                )}

                {selectedVariant?.id === variant.id && (
                  <motion.div
                    layoutId="selected-variant"
                    className="absolute inset-0 border-2 border-violet-500 rounded-xl pointer-events-none"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {/* Selector de cantidad con feedback */}
      <section aria-labelledby="quantity-section">
        <label 
          id="quantity-section"
          className="block font-bold text-white mb-3 md:mb-4 text-sm md:text-base"
        >
          Cantidad
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
          <div 
            className="flex items-center border-2 border-white/10 rounded-xl overflow-hidden bg-zinc-900"
            role="group"
            aria-label="Selector de cantidad"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              aria-label="Disminuir cantidad"
              className="w-12 h-12 md:w-14 md:h-14 hover:bg-white/5 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:bg-white/10"
            >
              <Minus className="w-4 h-4 md:w-5 md:h-5 text-white" aria-hidden="true" />
            </motion.button>

            <span 
              className="text-xl md:text-2xl font-black w-16 md:w-20 text-center text-white"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {quantity}
            </span>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={incrementQuantity}
              disabled={quantity >= 10}
              aria-label="Aumentar cantidad"
              className="w-12 h-12 md:w-14 md:h-14 hover:bg-white/5 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:bg-white/10"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5 text-white" aria-hidden="true" />
            </motion.button>
          </div>

          <p className="text-xs md:text-sm text-zinc-400">
            Máximo 10 unidades · Total: <span className="font-bold text-white text-base">{(currentPrice * quantity).toFixed(0)}€</span>
          </p>
        </div>
      </section>

      {/* CTAs optimizados para conversión */}
      <section className="space-y-3 md:space-y-4" aria-label="Acciones de compra">
        {/* CTA Principal con feedback visual */}
        <motion.button
          whileHover={{ scale: isOutOfStock ? 1 : 1.02 }}
          whileTap={{ scale: isOutOfStock ? 1 : 0.98 }}
          onClick={handleAddToCartWithFeedback}
          disabled={isOutOfStock}
          aria-label={isOutOfStock ? 'Producto agotado' : `Añadir ${quantity} ${quantity === 1 ? 'unidad' : 'unidades'} al carrito por ${(currentPrice * quantity).toFixed(0)} euros`}
          className="relative w-full group overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-violet-500/20 hover:shadow-violet-500/40 transition-shadow focus:outline-none focus:ring-4 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] animate-gradient" />
          
          {addedToCart && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 bg-emerald-500 flex items-center justify-center"
            >
              <Check className="w-8 h-8 text-white" />
            </motion.div>
          )}

          <div className="relative py-4 md:py-5 px-6 md:px-8 flex items-center justify-center gap-2 md:gap-3 text-white font-black text-base md:text-lg">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
            {isOutOfStock ? 'Producto agotado' : addedToCart ? '¡Añadido!' : 'Añadir al carrito'}
          </div>
        </motion.button>

        {/* CTAs Secundarios */}
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            aria-pressed={isFavorite}
            className={`py-3 md:py-4 border-2 rounded-xl transition-all font-semibold flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 ${
              isFavorite 
                ? 'border-red-500 text-red-500 focus:ring-red-500 bg-red-500/10' 
                : 'border-white/10 text-white/80 hover:border-red-500 hover:text-red-500 focus:ring-red-500'
            }`}
          >
            <Heart className={`w-5 h-5 transition-all ${isFavorite ? 'fill-red-500 scale-110' : ''}`} aria-hidden="true" />
            <span className="hidden sm:inline">Guardar</span>
          </motion.button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleShare()}
              aria-label="Compartir producto"
              aria-expanded={showShareMenu}
              aria-haspopup="menu"
              className="py-3 md:py-4 border-2 border-white/10 hover:border-blue-500 hover:text-blue-500 rounded-xl transition-all font-semibold text-white/80 flex items-center justify-center gap-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              <Share2 className="w-5 h-5" aria-hidden="true" />
              <span className="hidden sm:inline">Compartir</span>
            </motion.button>

            <AnimatePresence>
              {showShareMenu && <ShareMenu onShare={handleShare} />}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Garantías y Trust Badges */}
      <section className="space-y-3 md:space-y-4" aria-labelledby="trust-section">
        <h2 id="trust-section" className="sr-only">Garantías y beneficios</h2>
        
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-colors"
        >
          <Lock className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-bold text-white text-sm md:text-base mb-1">100 Noches de Prueba</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Devolución gratuita si no es perfecto para ti. Sin complicaciones.
            </p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors"
        >
          <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-purple-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-bold text-white text-sm md:text-base mb-1">Financiación sin intereses</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Paga en 3 o 12 meses sin coste adicional. 0% TAE.
            </p>
          </div>
        </motion.div>
      </section>
    </motion.article>
  )
}