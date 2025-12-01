// components/cart/CartComponents.tsx - ARGENTINA 2025
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Truck, Award, Star, ChevronRight, Lock, Package, Heart, BadgeCheck, Plus, Check, Sparkles, ChevronDown, CreditCard, RotateCcw, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/store/cart-store'
import { formatARS } from '@/lib/utils/currency'
import type { Product, ProductVariant } from '@prisma/client'

type ProductWithVariants = Product & {
  variants: ProductVariant[]
}

// ============================================================================
// SHIPPING PROGRESS - ARGENTINA
// ============================================================================

interface ShippingProgressProps {
  current: number
  target: number
}

export function ShippingProgress({ current, target }: ShippingProgressProps) {
  const percentage = Math.min((current / target) * 100, 100)
  const remaining = Math.max(target - current, 0)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-blue-500/10 border border-blue-500/20 rounded-2xl p-4 sm:p-5 mb-6 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
            <Truck className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <span className="font-bold text-white text-sm sm:text-base block">
              {percentage === 100 ? (
                '¡Envío gratis desbloqueado! 🎉'
              ) : (
                'Envío gratis en Villa María'
              )}
            </span>
            {percentage < 100 && (
              <span className="text-xs text-zinc-400">
                Te faltan {formatARS(remaining)} para envío gratis
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="relative h-2.5 bg-zinc-800 rounded-full overflow-hidden border border-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400 rounded-full shadow-lg shadow-blue-500/50"
        />
      </div>
      
      {percentage === 100 && (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-sm text-emerald-400 font-semibold mt-3 flex items-center gap-2"
        >
          <BadgeCheck className="w-4 h-4" />
          ¡Conseguiste el envío gratuito!
        </motion.p>
      )}
    </motion.div>
  )
}

// ============================================================================
// TRUST BADGES - ARGENTINA
// ============================================================================

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: '5 Años Garantía',
      description: 'Piero Argentina',
      color: 'text-blue-400',
      bg: 'from-blue-500/10 to-blue-600/5',
      border: 'border-blue-500/20'
    },
    {
      icon: RotateCcw,
      title: '100 Noches',
      description: 'De prueba gratis',
      color: 'text-emerald-400',
      bg: 'from-emerald-500/10 to-emerald-600/5',
      border: 'border-emerald-500/20'
    },
    {
      icon: CreditCard,
      title: 'MercadoPago',
      description: 'Pago 100% seguro',
      color: 'text-cyan-400',
      bg: 'from-cyan-500/10 to-cyan-600/5',
      border: 'border-cyan-500/20'
    },
    {
      icon: Truck,
      title: 'Envío Gratis',
      description: 'Villa María y zona',
      color: 'text-violet-400',
      bg: 'from-violet-500/10 to-violet-600/5',
      border: 'border-violet-500/20'
    }
  ]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-5 border border-blue-500/20 mb-6 backdrop-blur-sm"
    >
      <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-blue-400" />
        Comprá con confianza
      </h4>
      <div className="grid grid-cols-2 gap-3">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`bg-gradient-to-br ${badge.bg} rounded-xl p-3 border ${badge.border} transition-all duration-300`}
          >
            <badge.icon className={`w-5 h-5 ${badge.color} mb-2`} />
            <div className="text-xs font-bold text-white">{badge.title}</div>
            <div className="text-[10px] text-zinc-400">{badge.description}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ============================================================================
// URGENCY BANNER - ARGENTINA
// ============================================================================

interface UrgencyBannerProps {
  message?: string
  type?: 'stock' | 'time' | 'discount'
}

export function UrgencyBanner({ message, type = 'stock' }: UrgencyBannerProps) {
  const config = {
    stock: {
      icon: '📦',
      color: 'from-orange-500 via-red-500 to-orange-600',
      text: message || '¡Stock limitado! Solo quedan pocas unidades',
      textColor: 'text-white'
    },
    time: {
      icon: '⏰',
      color: 'from-violet-500 via-purple-500 to-violet-600',
      text: message || 'Oferta válida solo por hoy',
      textColor: 'text-white'
    },
    discount: {
      icon: '🎁',
      color: 'from-emerald-500 via-teal-500 to-emerald-600',
      text: message || '15% OFF en tu primera compra con VILLAMARIA',
      textColor: 'text-white'
    }
  }
  
  const current = config[type]
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gradient-to-r ${current.color} ${current.textColor} rounded-xl p-3.5 mb-4 text-center shadow-xl border border-white/20`}
    >
      <span className="text-sm font-bold flex items-center justify-center gap-2">
        <span className="text-lg">{current.icon}</span>
        {current.text}
      </span>
    </motion.div>
  )
}

// ============================================================================
// UPSELL COMPONENT - ARGENTINA
// ============================================================================

interface UpsellProps {
  onAdd?: () => void
}

export function Upsell({ onAdd }: UpsellProps) {
  const [topper, setTopper] = useState<ProductWithVariants | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [addedToCart, setAddedToCart] = useState(false)
  const [showVariants, setShowVariants] = useState(false)
  
  const { addItem, items } = useCartStore()

  useEffect(() => {
    const fetchTopper = async () => {
      try {
        const response = await fetch('/api/products/upsell/topper')
        const data = await response.json()
        
        if (data.success && data.product) {
          setTopper(data.product)
          // ✅ CORREGIDO: usar isDefault en lugar de isPopular
          const defaultVariant = data.product.variants.find((v: ProductVariant) => v.isDefault) 
            || data.product.variants[0]
          setSelectedVariant(defaultVariant)
        }
      } catch (error) {
        console.error('[Upsell] Error loading topper:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopper()
  }, [])

  const handleAddToCart = () => {
    if (!topper || !selectedVariant) return

    // Verificar si ya está en el carrito
    const isInCart = items.some(item => 
      item.productId === topper.id && item.size === selectedVariant.size
    )

    if (isInCart) {
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
      return
    }

    addItem({
      productId: topper.id,
      name: topper.name,
      size: selectedVariant.size,
      price: selectedVariant.price,
      originalPrice: selectedVariant.originalPrice || undefined,
      quantity: 1,
      image: topper.images[0] || '/placeholder.jpg',
      slug: topper.slug,
      variant: selectedVariant.size
    })

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
    onAdd?.()
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'add_to_cart', {
        currency: 'ARS',
        value: selectedVariant.price,
        items: [{
          item_id: topper.id,
          item_name: topper.name,
          price: selectedVariant.price,
          quantity: 1
        }]
      })
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-xl p-4 border border-blue-500/20">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-zinc-700/50 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-zinc-700/50 rounded w-2/3" />
            <div className="h-3 bg-zinc-700/50 rounded w-1/2" />
          </div>
          <div className="w-20 h-10 bg-zinc-700/50 rounded-lg" />
        </div>
      </div>
    )
  }

  if (!topper || !selectedVariant) return null

  const hasDiscount = selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price
  const discountPercent = hasDiscount 
    ? Math.round(((selectedVariant.originalPrice! - selectedVariant.price) / selectedVariant.originalPrice!) * 100)
    : 0

  const isInCart = items.some(item => 
    item.productId === topper.id && item.size === selectedVariant.size
  )

  const productImage = Array.isArray(topper.images) && topper.images.length > 0 
    ? topper.images[0] 
    : '/placeholder.jpg'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-blue-500/10 border border-blue-500/30 rounded-2xl p-4 overflow-hidden backdrop-blur-sm"
    >
      {/* Badge recomendado */}
      <div className="absolute -top-1 -right-1">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[10px] font-black px-2.5 py-1 rounded-bl-xl rounded-tr-xl shadow-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          RECOMENDADO
        </div>
      </div>

      {/* Badge descuento */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-black px-2 py-1 rounded-lg shadow-lg">
            -{discountPercent}%
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        {/* Image */}
        <div className="relative w-20 h-20 bg-zinc-800 rounded-xl flex-shrink-0 overflow-hidden border border-blue-500/20">
          <Image
            src={productImage}
            alt={topper.name}
            fill
            className="object-cover"
            sizes="80px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-black text-white text-sm mb-1 flex items-center gap-2">
            {topper.name}
            {topper.rating && topper.rating >= 4.5 && (
              <div className="flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-[10px] text-amber-400 font-bold">{topper.rating}</span>
              </div>
            )}
          </h4>
          
          {/* Selector de variantes */}
          <div className="relative mb-2">
            <button
              onClick={() => setShowVariants(!showVariants)}
              className="w-full text-left px-2 py-1 bg-zinc-800/80 border border-blue-500/20 rounded-lg text-xs text-white font-semibold flex items-center justify-between hover:border-blue-500/40 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Package className="w-3 h-3 text-blue-400" />
                {selectedVariant.size}
              </span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showVariants ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showVariants && (
                <motion.div
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-20 w-full mt-1 bg-zinc-900 border border-blue-500/30 rounded-lg shadow-2xl max-h-48 overflow-y-auto"
                >
                  {topper.variants.map((variant) => {
                    const variantDiscount = variant.originalPrice && variant.originalPrice > variant.price
                    const isSelected = variant.id === selectedVariant.id
                    
                    return (
                      <button
                        key={variant.id}
                        onClick={() => {
                          setSelectedVariant(variant)
                          setShowVariants(false)
                        }}
                        className={`w-full px-3 py-2 text-left hover:bg-blue-500/10 transition-colors flex items-center justify-between ${
                          isSelected ? 'bg-blue-500/20' : ''
                        }`}
                      >
                        <span className="text-xs font-semibold text-white flex items-center gap-2">
                          {variant.size}
                          {variant.isDefault && (
                            <span className="text-[9px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded">
                              Popular
                            </span>
                          )}
                        </span>
                        <div className="flex items-center gap-2">
                          {variantDiscount && (
                            <span className="text-[10px] text-zinc-500 line-through">
                              {formatARS(variant.originalPrice!)}
                            </span>
                          )}
                          <span className="text-xs font-black text-blue-400">
                            {formatARS(variant.price)}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            {hasDiscount && (
              <span className="text-zinc-500 line-through text-xs">
                {formatARS(selectedVariant.originalPrice!)}
              </span>
            )}
            <span className="text-blue-400 font-black text-base">
              {formatARS(selectedVariant.price)}
            </span>
          </div>
        </div>

        {/* Add button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={addedToCart || isInCart}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center gap-2 flex-shrink-0 ${
            addedToCart || isInCart
              ? 'bg-emerald-500 text-white border border-emerald-400/30'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 border border-blue-400/30'
          }`}
        >
          {addedToCart || isInCart ? (
            <>
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Añadido</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Añadir</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Highlights */}
      {topper.highlights && Array.isArray(topper.highlights) && topper.highlights.length > 0 && (
  <div className="mt-3 pt-3 border-t border-blue-500/20">
    <div className="flex flex-wrap gap-1.5">
      {topper.highlights.slice(0, 3).map((feature: string, index: number) => (
        <span
          key={index}
          className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-300 rounded-full font-semibold border border-blue-500/20"
        >
          {feature}
        </span>
      ))}
    </div>
  </div>
)}
    </motion.div>
  )
}

// ============================================================================
// CHECKOUT STEPS - ARGENTINA
// ============================================================================

interface CheckoutStepsProps {
  currentStep: number
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { number: 1, label: 'Carrito' },
    { number: 2, label: 'Datos' },
    { number: 3, label: 'Pago' },
    { number: 4, label: 'Confirmación' }
  ]
  
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-all ${
                  step.number <= currentStep
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-zinc-800 border border-zinc-700 text-zinc-500'
                }`}
              >
                {step.number <= currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </motion.div>
              <span className={`text-xs font-medium ${
                step.number <= currentStep ? 'text-white' : 'text-zinc-500'
              }`}>
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 relative">
                <div className="absolute inset-0 bg-zinc-800" />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: step.number < currentStep ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 origin-left"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// EMPTY CART - ARGENTINA
// ============================================================================

export function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-12 text-center shadow-2xl border border-blue-500/20 backdrop-blur-sm"
    >
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
        <span className="text-5xl">🛒</span>
      </div>
      <h3 className="text-2xl font-black text-white mb-3">
        Tu carrito está vacío
      </h3>
      <p className="text-zinc-400 mb-8 max-w-md mx-auto">
        Explorá nuestro catálogo y encontrá tu colchón perfecto para un mejor descanso
      </p>
      <Link href="/catalogo">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold inline-flex items-center gap-2 shadow-2xl shadow-blue-500/30"
        >
          <span>Explorar productos</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </Link>
    </motion.div>
  )
}

// ============================================================================
// PAYMENT METHODS - ARGENTINA
// ============================================================================

export function PaymentMethods({ selected, onSelect }: { selected: string; onSelect: (method: string) => void }) {
  const methods = [
    {
      id: 'mercadopago',
      name: 'MercadoPago',
      icon: '💳',
      description: 'Tarjetas de crédito y débito',
      badges: ['Visa', 'Mastercard', 'Amex', 'Cabal']
    },
    {
      id: 'transfer',
      name: 'Transferencia Bancaria',
      icon: '🏦',
      description: '5% de descuento adicional',
      badge: 'Más económico'
    },
    {
      id: 'efectivo',
      name: 'Efectivo',
      icon: '💵',
      description: 'Pago al recibir',
      badge: 'Solo Villa María'
    }
  ]
  
  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <motion.button
          key={method.id}
          type="button"
          onClick={() => onSelect(method.id)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`w-full p-4 rounded-xl border-2 transition-all ${
            selected === method.id
              ? 'border-blue-500 bg-blue-500/20 ring-2 ring-blue-500/30'
              : 'border-zinc-800 hover:border-blue-500/50 bg-zinc-900/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{method.icon}</span>
              <div className="text-left">
                <div className="font-bold text-white text-sm">{method.name}</div>
                <div className="text-xs text-zinc-400">{method.description}</div>
                {method.badges && (
                  <div className="flex gap-1.5 mt-1">
                    {method.badges.map(badge => (
                      <span key={badge} className="text-[10px] px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded">
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {selected === method.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </div>
        </motion.button>
      ))}
    </div>
  )
}