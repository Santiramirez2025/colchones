// app/producto/[slug]/components/ProductInfo.tsx - VERSIÓN OPTIMIZADA
'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Check,
  Truck,
  Shield,
  RotateCcw,
  CreditCard,
  DollarSign,
  ChevronDown,
  Percent,
  Package // ✅ Nuevo icono para "Incluye Base"
} from 'lucide-react'
import { formatARS } from '@/lib/utils/currency'
import type { ProductWithRelations, StockInfo } from '@/lib/types/product'
import type { ProductVariant } from '@prisma/client'

interface ProductInfoProps {
  product: ProductWithRelations
  averageRatings: any
  currentPrice: number
  basePrice: number
  originalPrice?: number
  savings: number
  stockInfo: StockInfo
  variants: ProductVariant[]
  selectedVariant: ProductVariant | null
  setSelectedVariant: (variant: ProductVariant) => void
  quantity: number
  setQuantity: (quantity: number) => void
  isOutOfStock: boolean
  handleAddToCart: () => void
  isFavorite: boolean
  setIsFavorite: (favorite: boolean) => void
  handleShare: (platform?: string) => void
  showShareMenu: boolean
  features: string[]
  setActiveTab: (tab: string) => void
  todasLasCuotas: Array<{
    cuotas: number
    precioTotal: number
    precioCuota: number
    recargo: number
    recargoPercentage: number 
    formatted: {
      precioTotal: string
      precioCuota: string
      recargo: string
    }
  }>
  selectedCuotas: number | null
  onCuotasChange: (cuotas: number | null) => void
}

export default function ProductInfo({
  product,
  averageRatings,
  currentPrice,
  basePrice,
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
  features,
  setActiveTab,
  todasLasCuotas,
  selectedCuotas,
  onCuotasChange
}: ProductInfoProps) {
  
  const [showAllFeatures, setShowAllFeatures] = useState(false)
  const [showCuotasDropdown, setShowCuotasDropdown] = useState(false)
  
  const currentStock = selectedVariant?.stock ?? stockInfo.quantity ?? 0
  const isLowStock = currentStock > 0 && currentStock <= 5
  
  // ✅ Cuota seleccionada actual
  const cuotaSeleccionada = useMemo(() => {
    if (selectedCuotas === null) return null
    return todasLasCuotas.find(c => c.cuotas === selectedCuotas) || null
  }, [selectedCuotas, todasLasCuotas])

  // ✅ NUEVO: Mejor cuota destacada (3 cuotas sin recargo)
  const mejorCuotaSinRecargo = useMemo(() => {
    return todasLasCuotas.find(c => c.cuotas === 3) || todasLasCuotas[0]
  }, [todasLasCuotas])

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="space-y-4">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {product.isBestSeller && (
            <span className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold rounded-full">
              ⭐ MÁS VENDIDO
            </span>
          )}
          {product.isNew && (
            <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold rounded-full">
              🆕 NUEVO
            </span>
          )}
          {savings > 0 && (
            <span className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full">
              💰 AHORRÁS {formatARS(savings)}
            </span>
          )}
          {/* ✅ NUEVO: Badge si incluye base */}
          {product.includesBase && (
            <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 text-xs font-bold rounded-full">
              📦 INCLUYE BASE
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
          {product.name}
        </h1>

        {/* Subtitle */}
        {product.subtitle && (
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
            {product.subtitle}
          </p>
        )}

        {/* Rating & Reviews */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-zinc-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-zinc-300">
              {product.rating.toFixed(1)}
            </span>
          </div>
          
          {product.reviews && product.reviews.length > 0 && (
            <button
              onClick={() => setActiveTab('reviews')}
              className="text-sm text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              ({product.reviews.length} opiniones)
            </button>
          )}
        </div>
      </div>

      {/* ============================================================================ */}
      {/* SECCIÓN DE PRECIOS CON CUOTAS */}
      {/* ============================================================================ */}
      <div className="space-y-4 p-6 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-blue-500/5 border border-blue-500/20 rounded-2xl">
        {/* Precio Original Tachado */}
        {originalPrice && originalPrice > basePrice && (
          <div className="flex items-center gap-3">
            <span className="text-2xl text-zinc-500 line-through">
              {formatARS(originalPrice)}
            </span>
            <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-bold rounded-full">
              -{Math.round(((originalPrice - basePrice) / originalPrice) * 100)}%
            </span>
          </div>
        )}

        {/* ✅ PRECIO DE CONTADO (siempre visible) */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {formatARS(basePrice)}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-bold rounded-lg">
              CONTADO • Transferencia • Débito
            </span>
            {/* ✅ NUEVO: Badge destacando 3 cuotas sin recargo */}
            {mejorCuotaSinRecargo && (
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-bold rounded-lg">
                o {mejorCuotaSinRecargo.cuotas}x {mejorCuotaSinRecargo.formatted.precioCuota} SIN RECARGO
              </span>
            )}
          </div>
        </div>

        {/* ✅ SELECTOR DE CUOTAS EXPANDIBLE */}
        <div className="pt-4 border-t border-blue-500/20">
          <button
            onClick={() => setShowCuotasDropdown(!showCuotasDropdown)}
            className="w-full flex items-center justify-between p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-blue-400" />
              <div className="text-left">
                {selectedCuotas === null ? (
                  <span className="text-blue-400 font-semibold">
                    Ver opciones de financiación
                  </span>
                ) : (
                  <>
                    <span className="text-white font-bold block">
                      {cuotaSeleccionada?.cuotas} cuotas de {cuotaSeleccionada?.formatted.precioCuota}
                    </span>
                    <span className="text-xs text-zinc-400">
                      Total: {cuotaSeleccionada?.formatted.precioTotal} (+{cuotaSeleccionada?.recargoPercentage})
                    </span>
                  </>
                )}
              </div>
            </div>
            <motion.div
              animate={{ rotate: showCuotasDropdown ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-blue-400" />
            </motion.div>
          </button>

          {/* ✅ DROPDOWN CON TODAS LAS OPCIONES */}
          <AnimatePresence>
            {showCuotasDropdown && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 mt-3">
                  {/* Opción CONTADO */}
                  <button
                    onClick={() => {
                      onCuotasChange(null)
                      setShowCuotasDropdown(false)
                    }}
                    className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                      selectedCuotas === null
                        ? 'bg-emerald-500/20 border-emerald-500/50 ring-2 ring-emerald-500/30'
                        : 'bg-zinc-900/50 border-zinc-800 hover:border-emerald-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="w-4 h-4 text-emerald-400" />
                          <span className="font-bold text-white">Precio de Contado</span>
                        </div>
                        <div className="text-2xl font-black text-emerald-400">
                          {formatARS(basePrice)}
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Transferencia • Débito • Efectivo
                        </p>
                      </div>
                      {selectedCuotas === null && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </button>

                  {/* Opciones de CUOTAS */}
                  {todasLasCuotas.map((cuota, index) => (
                    <motion.button
                      key={cuota.cuotas}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        onCuotasChange(cuota.cuotas)
                        setShowCuotasDropdown(false)
                      }}
                      className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                        selectedCuotas === cuota.cuotas
                          ? 'bg-blue-500/20 border-blue-500/50 ring-2 ring-blue-500/30'
                          : 'bg-zinc-900/50 border-zinc-800 hover:border-blue-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-blue-400">
                                {cuota.cuotas}
                              </span>
                            </div>
                            <span className="text-2xl font-black text-white">
                              {cuota.formatted.precioCuota}
                            </span>
                            <span className="text-sm text-zinc-400">/ mes</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm flex-wrap">
                            <span className="text-zinc-400">
                              Total: {cuota.formatted.precioTotal}
                            </span>
                            {/* ✅ MEJORADO: Mostrar "SIN RECARGO" en vez del porcentaje si es 0% */}
                            {cuota.recargo === 0 ? (
                              <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full">
                                SIN RECARGO
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold rounded-full">
                                +{cuota.recargoPercentage}
                              </span>
                            )}
                          </div>
                        </div>
                        {selectedCuotas === cuota.cuotas && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center ml-3"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Info adicional */}
                <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Percent className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-zinc-400">
                      <p className="font-semibold text-blue-400 mb-1">
                        💡 Ahorrá eligiendo pago de contado
                      </p>
                      <p>
                        La diferencia entre contado y 12 cuotas es de{' '}
                        <span className="text-white font-bold">
                          {formatARS(todasLasCuotas[todasLasCuotas.length - 1].precioTotal - basePrice)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ✅ BADGE CON TEXTO PROMOCIONAL */}
        <div className="flex items-center gap-2 pt-2">
          <CreditCard className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-400 font-semibold">
            Hasta 12 cuotas • MercadoPago
          </span>
        </div>
      </div>

      {/* Stock Status */}
      {!isOutOfStock && isLowStock && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-3 bg-orange-500/10 border border-orange-500/20 rounded-xl"
        >
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-orange-400">
            ¡Solo quedan {currentStock} unidades!
          </span>
        </motion.div>
      )}

      {/* Variants (Tamaños) */}
      {variants && variants.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
            Tamaño
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                disabled={!variant.stock || variant.stock === 0}
                className={`px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedVariant?.id === variant.id
                    ? 'border-blue-500 bg-blue-500/20 text-blue-400 ring-2 ring-blue-500/30'
                    : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-blue-500/50'
                }`}
              >
                <div>{variant.size}</div>
                {variant.dimensions && (
                  <div className="text-xs text-zinc-500 mt-1">
                    {variant.dimensions}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
          Cantidad
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="w-12 h-12 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:border-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-5 h-5 text-zinc-400" />
          </button>
          
          <input
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1
              setQuantity(Math.max(1, Math.min(10, val)))
            }}
            className="w-20 h-12 text-center bg-zinc-900 border border-zinc-800 rounded-xl text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          
          <button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            disabled={quantity >= 10 || quantity >= currentStock}
            className="w-12 h-12 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:border-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5 text-zinc-400" />
          </button>
          
          <span className="text-sm text-zinc-400 ml-2">
            (Máx. 10 por pedido)
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-4">
        {/* Add to Cart - Main CTA */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-blue-500/25 flex items-center justify-center gap-3"
        >
          <ShoppingCart className="w-6 h-6" />
          <span>{isOutOfStock ? 'Agotado' : 'Agregar al Carrito'}</span>
        </button>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`px-6 py-4 rounded-xl border-2 font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              isFavorite
                ? 'border-red-500 bg-red-500/20 text-red-400'
                : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-red-500/50'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            <span>Favorito</span>
          </button>

          <button
            onClick={() => handleShare()}
            className="px-6 py-4 rounded-xl border-2 border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-blue-500/50 font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            <span>Compartir</span>
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <Truck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">Envío Gratis</p>
            <p className="text-xs text-zinc-400 mt-0.5">Villa María y zona</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">
              {product.warranty || 5} Años Garantía
            </p>
            <p className="text-xs text-zinc-400 mt-0.5">
              {/* ✅ MEJORADO: Mostrar marca según categoría */}
              {product.category === 'Sommiers' || product.category === 'Bases' 
                ? 'Calidad garantizada' 
                : 'Piero Argentina'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-violet-500/20 border border-violet-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <RotateCcw className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">
              {product.trialNights || 100} Noches
            </p>
            <p className="text-xs text-zinc-400 mt-0.5">De prueba gratis</p>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      {features && features.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
            Características principales
          </h3>
          <div className="space-y-2">
            {features.slice(0, showAllFeatures ? undefined : 5).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-2 text-sm text-zinc-400"
              >
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
          {features.length > 5 && (
            <button
              onClick={() => setShowAllFeatures(!showAllFeatures)}
              className="text-sm text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              {showAllFeatures ? 'Ver menos' : `Ver ${features.length - 5} más características`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}