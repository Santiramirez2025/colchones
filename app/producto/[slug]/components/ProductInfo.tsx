import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, memo, useEffect } from 'react'
import {
  Star, Heart, Share2, ChevronRight, AlertCircle, TrendingUp, Layers, Wind,
  Bed, Minus, Plus, ShoppingCart, CheckCircle2, Lock, Facebook, Twitter, Mail, Copy, Check,
  Zap, Package, Shield, Clock, Sparkles, Gift
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

// Rating Stars con animación
const RatingStars = memo(({ rating }: { rating: number }) => (
  <div className="flex gap-0.5" role="img" aria-label={`${rating} de 5 estrellas`}>
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
      >
        <Star
          className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${
            i < Math.floor(rating)
              ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
              : 'text-zinc-700'
          }`}
          aria-hidden="true"
        />
      </motion.div>
    ))}
  </div>
))
RatingStars.displayName = 'RatingStars'

// Stock Badge Premium
const StockBadge = memo(({ quantity }: { quantity: number }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-red-500/20 border-2 border-amber-500/50 text-amber-400 px-4 py-2.5 rounded-xl backdrop-blur-xl"
    role="status"
    aria-live="polite"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-red-500/10 animate-pulse" />
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <AlertCircle className="w-5 h-5 relative z-10" aria-hidden="true" />
    </motion.div>
    <div className="relative z-10">
      <p className="font-black text-sm">¡Solo quedan {quantity}!</p>
      <p className="text-xs opacity-80">Stock limitado</p>
    </div>
  </motion.div>
))
StockBadge.displayName = 'StockBadge'

// Countdown Timer
const CountdownTimer = memo(() => {
  const [time, setTime] = useState({ hours: 2, minutes: 34, seconds: 12 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev
        if (seconds > 0) seconds--
        else if (minutes > 0) { minutes--; seconds = 59 }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59 }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-amber-400">
      <Clock className="w-4 h-4 animate-pulse" />
      <span className="font-mono font-bold text-sm">
        {String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
      </span>
    </div>
  )
})
CountdownTimer.displayName = 'CountdownTimer'

// Share Menu Mejorado
const ShareMenu = memo(({ onShare }: { onShare: (platform: string) => void }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    onShare('copy')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [onShare])

  const platforms = [
    { id: 'copy', icon: copied ? Check : Copy, label: copied ? '¡Copiado!' : 'Copiar enlace', color: 'emerald' },
    { id: 'twitter', icon: Twitter, label: 'Twitter', color: 'blue' },
    { id: 'facebook', icon: Facebook, label: 'Facebook', color: 'blue' },
    { id: 'mail', icon: Mail, label: 'Email', color: 'red' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      className="absolute right-0 top-full mt-2 w-64 p-2 bg-zinc-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 z-50 origin-top-right"
      role="menu"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-2xl" />
      <div className="relative space-y-1">
        {platforms.map((platform) => (
          <motion.button
            key={platform.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={platform.id === 'copy' ? handleCopy : () => onShare(platform.id)}
            className="flex items-center gap-3 w-full p-3 text-sm text-white hover:bg-white/10 rounded-xl transition-all group"
            role="menuitem"
          >
            <div className={`p-2 rounded-lg bg-${platform.color}-500/20 group-hover:bg-${platform.color}-500/30 transition-colors`}>
              <platform.icon className={`w-4 h-4 text-${platform.color}-400`} />
            </div>
            <span className="font-medium">{platform.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
})
ShareMenu.displayName = 'ShareMenu'

// Confetti Effect
const ConfettiEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '100%', x: `${Math.random() * 100}%`, opacity: 1 }}
          animate={{ 
            y: '-100%', 
            x: `${Math.random() * 100}%`,
            rotate: Math.random() * 360,
            opacity: 0 
          }}
          transition={{ duration: 1.5, delay: i * 0.05 }}
          className={`absolute w-2 h-2 rounded-full ${
            ['bg-violet-500', 'bg-fuchsia-500', 'bg-amber-500', 'bg-emerald-500'][i % 4]
          }`}
        />
      ))}
    </div>
  )
}

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
  const [showConfetti, setShowConfetti] = useState(false)
  const hasDiscount = originalPrice && originalPrice > currentPrice

  const handleAddToCartWithFeedback = useCallback(() => {
    handleAddToCart()
    setAddedToCart(true)
    setShowConfetti(true)
    setTimeout(() => {
      setAddedToCart(false)
      setShowConfetti(false)
    }, 2000)
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
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6 md:space-y-8"
    >
      {/* Header Premium */}
      <header className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight bg-gradient-to-br from-white via-white to-zinc-400 bg-clip-text">
            {product.name}
          </h1>
        </motion.div>
        
        {product.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 leading-relaxed"
          >
            {product.subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 md:gap-6 pb-4 md:pb-6 border-b border-white/10"
        >
          <div className="flex items-center gap-2">
            <RatingStars rating={averageRatings.average} />
            <span className="font-bold text-white text-sm md:text-base">
              {averageRatings.average.toFixed(1)}
            </span>
            <span className="text-zinc-500 text-sm md:text-base">
              ({averageRatings.count})
            </span>
          </div>

          <button 
            onClick={() => setActiveTab('reviews')}
            className="group flex items-center gap-1 text-violet-400 hover:text-violet-300 font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-lg px-2 py-1"
          >
            Leer opiniones
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </header>

      {/* Trust Badges Flotantes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-3 gap-2"
      >
        {[
          { icon: Package, text: 'Envío 24-48h', color: 'violet' },
          { icon: Shield, text: '3 años garantía', color: 'emerald' },
          { icon: Gift, text: '100 noches prueba', color: 'amber' }
        ].map((badge, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all"
          >
            <badge.icon className={`w-4 h-4 text-${badge.color}-400`} />
            <span className="text-[10px] text-zinc-400 font-medium text-center leading-tight">{badge.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Precio con efecto holográfico */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="relative group"
        aria-labelledby="price-section"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-violet-500/20 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
        <div className="relative overflow-hidden p-6 md:p-8 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 rounded-2xl md:rounded-3xl border-2 border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent" />
          
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-baseline gap-3 md:gap-4 mb-3 flex-wrap">
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-5xl md:text-7xl font-black bg-gradient-to-br from-white via-white to-violet-300 bg-clip-text text-transparent drop-shadow-2xl"
                >
                  {currentPrice}€
                </motion.span>
                {hasDiscount && (
                  <span className="text-2xl md:text-3xl text-zinc-600 line-through">
                    {originalPrice}€
                  </span>
                )}
              </div>
              
              <AnimatePresence mode="wait">
                {savings > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-wrap items-center gap-3"
                  >
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border-2 border-emerald-500/50 text-emerald-400 px-4 py-2 rounded-xl backdrop-blur-xl">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-bold text-sm">
                        Ahorras {savings}€ ({Math.round((savings / originalPrice!) * 100)}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-400 text-sm">
                      <Zap className="w-4 h-4" />
                      <span className="font-medium">Oferta termina en:</span>
                      <CountdownTimer />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {stockInfo.lowStock && <StockBadge quantity={stockInfo.quantity} />}
          </div>
        </div>
      </motion.section>

      {/* Especificaciones con Stagger Animation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-3 gap-3 md:gap-4"
        aria-labelledby="specs-section"
      >
        {[
          { icon: TrendingUp, label: 'Firmeza', value: `${product.firmnessValue}%`, subtitle: product.firmness, color: 'violet', delay: 0 },
          { icon: Layers, label: 'Altura', value: `${product.height}cm`, subtitle: 'Grosor total', color: 'cyan', delay: 0.1 },
          { icon: Wind, label: 'Transpirabilidad', value: `${product.transpirability}%`, subtitle: 'Ventilación', color: 'fuchsia', delay: 0.2 },
        ].map((spec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + spec.delay }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative overflow-hidden p-4 md:p-5 bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-white/5 hover:border-white/20 transition-all"
            role="group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-${spec.color}-500/0 to-${spec.color}-500/0 group-hover:from-${spec.color}-500/10 group-hover:to-${spec.color}-500/5 transition-all duration-500`} />
            <div className="relative text-center space-y-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`inline-flex p-2.5 rounded-xl bg-${spec.color}-500/20 mb-1`}
              >
                <spec.icon className={`w-5 h-5 md:w-6 md:h-6 text-${spec.color}-400`} />
              </motion.div>
              <p className="text-[10px] md:text-xs text-zinc-500 font-medium">{spec.label}</p>
              <p className="font-black text-white text-xl md:text-2xl">{spec.value}</p>
              <p className="text-[9px] md:text-[10px] text-zinc-600">{spec.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Selector de Variantes con Glow Effect */}
      {variants.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          aria-labelledby="variant-section"
        >
          <div className="flex items-center justify-between mb-4">
            <label 
              id="variant-section"
              className="flex items-center gap-2 font-bold text-white text-sm md:text-base"
            >
              <Bed className="w-5 h-5 text-violet-400" />
              Selecciona tu medida
            </label>
            {selectedVariant && (
              <span className="text-xs text-zinc-400">
                <span className="text-violet-400 font-semibold">{selectedVariant.size}</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="radiogroup">
            {variants.map((variant: any, index: number) => {
              const isSelected = selectedVariant?.id === variant.id
              return (
                <motion.button
                  key={variant.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: variant.stock > 0 ? 1.05 : 1 }}
                  whileTap={{ scale: variant.stock > 0 ? 0.95 : 1 }}
                  onClick={() => variant.stock > 0 && setSelectedVariant(variant)}
                  disabled={variant.stock === 0}
                  className={`relative p-4 md:p-5 rounded-2xl border-2 transition-all group ${
                    isSelected
                      ? 'border-violet-500 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20'
                      : 'border-white/10 hover:border-white/20 bg-zinc-900/50'
                  } ${variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSelected && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 blur-xl opacity-50" />
                      <motion.div
                        layoutId="glow"
                        className="absolute inset-0 rounded-2xl border-2 border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    </>
                  )}
                  
                  <div className="relative">
                    <p className={`font-bold text-base md:text-lg mb-1 ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                      {variant.size}
                    </p>
                    <p className={`text-sm md:text-base ${isSelected ? 'text-violet-300' : 'text-zinc-500'}`}>
                      {variant.price}€
                    </p>
                    
                    {variant.stock < 5 && variant.stock > 0 && (
                      <span className="absolute top-2 right-2 flex items-center gap-1 bg-amber-500/30 text-amber-300 px-2 py-1 rounded-lg text-[10px] font-bold backdrop-blur-xl">
                        <AlertCircle className="w-3 h-3" />
                        {variant.stock}
                      </span>
                    )}

                    {variant.stock === 0 && (
                      <span className="absolute inset-0 bg-zinc-900/90 rounded-2xl flex items-center justify-center text-xs font-semibold text-zinc-500 backdrop-blur-sm">
                        Agotado
                      </span>
                    )}

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.section>
      )}

      {/* Selector de Cantidad Premium */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        aria-labelledby="quantity-section"
      >
        <label 
          id="quantity-section"
          className="block font-bold text-white mb-3 text-sm md:text-base"
        >
          Cantidad
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center border-2 border-white/10 rounded-xl overflow-hidden bg-zinc-900 backdrop-blur-xl">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="w-14 h-14 hover:bg-white/10 transition-colors flex items-center justify-center disabled:opacity-30"
            >
              <Minus className="w-5 h-5 text-white" />
            </motion.button>

            <motion.span
              key={quantity}
              initial={{ scale: 1.2, color: '#a78bfa' }}
              animate={{ scale: 1, color: '#ffffff' }}
              className="text-2xl font-black w-20 text-center"
            >
              {quantity}
            </motion.span>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={incrementQuantity}
              disabled={quantity >= 10}
              className="w-14 h-14 hover:bg-white/10 transition-colors flex items-center justify-center disabled:opacity-30"
            >
              <Plus className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          <div className="flex-1">
            <p className="text-xs text-zinc-500">Máximo 10 unidades</p>
            <p className="text-lg font-bold text-white">
              Total: <span className="text-violet-400">{(currentPrice * quantity).toFixed(0)}€</span>
            </p>
          </div>
        </div>
      </motion.section>

      {/* CTA con Urgencia y Confetti */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="space-y-3"
      >
        <motion.button
          whileHover={{ scale: isOutOfStock ? 1 : 1.02 }}
          whileTap={{ scale: isOutOfStock ? 1 : 0.97 }}
          onClick={handleAddToCartWithFeedback}
          disabled={isOutOfStock}
          className="relative w-full group overflow-hidden rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
        >
          {showConfetti && <ConfettiEffect />}
          
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] animate-gradient" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <AnimatePresence mode="wait">
            {addedToCart ? (
              <motion.div
                key="success"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute inset-0 bg-emerald-500 flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="relative py-5 px-8 flex items-center justify-center gap-3 text-white font-black text-lg">
            <ShoppingCart className="w-6 h-6" />
            {isOutOfStock ? 'Producto agotado' : addedToCart ? '¡Añadido al carrito!' : 'Añadir al carrito'}
          </div>
        </motion.button>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className={`relative overflow-hidden py-4 border-2 rounded-xl transition-all font-semibold flex items-center justify-center gap-2 ${
              isFavorite 
                ? 'border-red-500 text-red-400 bg-red-500/10' 
                : 'border-white/10 text-white/80 hover:border-red-500/50 hover:text-red-400'
            }`}
          >
            {isFavorite && (
              <motion.div
                layoutId="heart-glow"
                className="absolute inset-0 bg-red-500/20 blur-xl"
              />
            )}
            <motion.div
              animate={isFavorite ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart className={`w-5 h-5 transition-all ${isFavorite ? 'fill-red-500' : ''}`} />
            </motion.div>
            <span className="hidden sm:inline">Guardar</span>
          </motion.button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleShare()}
              className="py-4 border-2 border-white/10 hover:border-blue-500/50 hover:text-blue-400 rounded-xl transition-all font-semibold text-white/80 flex items-center justify-center gap-2 w-full"
            >
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:inline">Compartir</span>
            </motion.button>

            <AnimatePresence>
              {showShareMenu && <ShareMenu onShare={handleShare} />}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* Trust Badges Premium */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="space-y-3"
      >
        <motion.div 
          whileHover={{ scale: 1.02, x: 4 }}
          className="group relative overflow-hidden flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative p-3 rounded-xl bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
            <Lock className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="relative flex-1">
            <p className="font-bold text-white text-base mb-1 flex items-center gap-2">
              100 Noches de Prueba
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-black">GRATIS</span>
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Devolución gratuita si no es perfecto para ti. Sin complicaciones.
            </p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02, x: 4 }}
          className="group relative overflow-hidden flex items-start gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative p-3 rounded-xl bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
            <CheckCircle2 className="w-6 h-6 text-purple-400" />
          </div>
          <div className="relative flex-1">
            <p className="font-bold text-white text-base mb-1 flex items-center gap-2">
              Financiación sin intereses
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-black">0% TAE</span>
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Paga en 3 o 12 meses sin coste adicional. Aprobación inmediata.
            </p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02, x: 4 }}
          className="group relative overflow-hidden flex items-start gap-4 p-4 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-2xl border border-violet-500/20 hover:border-violet-500/40 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative p-3 rounded-xl bg-violet-500/20 group-hover:bg-violet-500/30 transition-colors">
            <Shield className="w-6 h-6 text-violet-400" />
          </div>
          <div className="relative flex-1">
            <p className="font-bold text-white text-base mb-1 flex items-center gap-2">
              Garantía Premium 3 Años
              <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 font-black">INCLUIDA</span>
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Protección completa contra defectos de fabricación. Tranquilidad total.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Urgency Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1 }}
        className="relative overflow-hidden p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border-2 border-amber-500/30"
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(251,191,36,0.1),transparent)] animate-[shimmer_2s_infinite]" />
        <div className="relative flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Zap className="w-6 h-6 text-amber-400" />
          </motion.div>
          <div className="flex-1">
            <p className="font-bold text-white text-sm mb-0.5">¡Última oportunidad!</p>
            <p className="text-xs text-amber-300">
              <span className="font-semibold">{stockInfo.quantity}</span> personas están viendo este producto ahora
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full bg-amber-400"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}