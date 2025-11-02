'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  X,
  ShoppingBag,
  Truck,
  Shield,
  Heart,
  Star,
  CheckCircle2,
  Package,
  Clock,
  TrendingUp
} from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import {
  ShippingProgress,
  TrustBadges,
  MiniTestimonial,
  UrgencyBanner,
  Upsell,
  EmptyCart,
  CheckoutSteps
} from '@/components/cart/CartComponents'
import CheckoutForm from '@/components/cart/CheckoutForm'

export default function CarritoPage() {
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3 | 4>(1)
  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const {
    items,
    coupon,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscount,
    getShipping,
    getTotal,
    getItemCount
  } = useCartStore()
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const subtotal = getSubtotal()
  const discount = getDiscount()
  const shipping = getShipping()
  const total = getTotal()
  const itemCount = getItemCount()
  
  // Handle coupon application
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return
    
    setIsApplyingCoupon(true)
    setCouponError('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Mock coupon validation
    const validCoupons: Record<string, { discount: number; type: 'percentage' | 'fixed' }> = {
      'BIENVENIDO10': { discount: 10, type: 'percentage' },
      'VERANO20': { discount: 20, type: 'percentage' },
      'DESCUENTO50': { discount: 50, type: 'fixed' },
      'PROMO15': { discount: 15, type: 'percentage' }
    }
    
    const couponData = validCoupons[couponCode.toUpperCase()]
    
    if (couponData) {
      applyCoupon({
        code: couponCode.toUpperCase(),
        ...couponData
      })
      setCouponCode('')
    } else {
      setCouponError('Cupón no válido o expirado')
    }
    
    setIsApplyingCoupon(false)
  }
  
  // Show checkout form
  if (checkoutStep >= 2) {
    return (
      <CheckoutForm
        step={checkoutStep}
        total={total}
        onBack={() => setCheckoutStep(1)}
        onNext={() => setCheckoutStep((prev) => Math.min(4, prev + 1) as 1 | 2 | 3 | 4)}
      />
    )
  }

  // Prevent hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-zinc-950 flex items-center justify-center">
        <div className="text-white text-lg">Cargando carrito...</div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-zinc-950 relative">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(139,92,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(139,92,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Checkout Steps */}
        <CheckoutSteps currentStep={checkoutStep} />
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-xl">
              <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                Tu carrito
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 mt-1">
                {itemCount} {itemCount === 1 ? 'producto' : 'productos'} seleccionado{itemCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-semibold">Envío gratis desde 500€</span>
            </div>
            <div className="flex items-center gap-2 text-violet-400">
              <Shield className="w-4 h-4" />
              <span className="font-semibold">Pago 100% seguro</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400">
              <Truck className="w-4 h-4" />
              <span className="font-semibold">Entrega 24-48h</span>
            </div>
          </div>
        </motion.div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Urgency Banner */}
              <UrgencyBanner type="stock" />
              
              {/* Shipping Progress */}
              <ShippingProgress current={subtotal} target={500} />
              
              {/* Items List */}
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => {
                  // Get first valid image
                  const productImage = item.image || '/images/placeholder.jpg'
                  const hasDiscount = item.originalPrice && item.originalPrice > item.price
                  const discountPercent = hasDiscount 
                    ? Math.round(((item.originalPrice! - item.price) / item.originalPrice!) * 100)
                    : 0

                  return (
                    <motion.article
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10 hover:border-violet-500/30 transition-all duration-300 shadow-xl"
                    >
                      <div className="flex gap-4 sm:gap-6">
                        {/* Image */}
                        <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-zinc-800 rounded-xl sm:rounded-2xl flex-shrink-0 overflow-hidden">
                          <Image
                            src={productImage}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 128px"
                          />
                          
                          {/* Discount badge */}
                          {hasDiscount && (
                            <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] sm:text-xs font-black px-2 py-1 rounded-lg shadow-lg">
                              -{discountPercent}%
                            </div>
                          )}
                          
                          {/* Stock badge */}
                          <div className="absolute bottom-2 left-2 bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Package className="w-2.5 h-2.5" />
                            En stock
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3 sm:mb-4">
                            <div className="flex-1 min-w-0 pr-2">
                              <h3 className="text-base sm:text-lg md:text-xl font-black text-white mb-1 sm:mb-2 line-clamp-2">
                                {item.name}
                              </h3>
                              <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-violet-500/20 text-violet-300 rounded-lg font-semibold">
                                  <TrendingUp className="w-3 h-3" />
                                  {item.size}
                                </span>
                                {item.variant && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg font-semibold">
                                    {item.variant}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0"
                              aria-label="Eliminar producto"
                            >
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.button>
                          </div>

                          <div className="flex items-end justify-between gap-4">
                            {/* Quantity */}
                            <div className="flex items-center gap-2 sm:gap-3">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white/10 rounded-lg flex items-center justify-center hover:border-violet-500 hover:bg-violet-500/20 transition-all text-white"
                                disabled={item.quantity <= 1}
                                aria-label="Disminuir cantidad"
                              >
                                <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </motion.button>
                              
                              <span className="font-black text-white w-8 sm:w-10 text-center text-base sm:text-lg tabular-nums">
                                {item.quantity}
                              </span>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white/10 rounded-lg flex items-center justify-center hover:border-violet-500 hover:bg-violet-500/20 transition-all text-white"
                                aria-label="Aumentar cantidad"
                              >
                                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </motion.button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              {hasDiscount && (
                                <p className="text-xs sm:text-sm text-zinc-500 line-through mb-1">
                                  {(item.originalPrice! * item.quantity).toFixed(2)}€
                                </p>
                              )}
                              <p className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                                {(item.price * item.quantity).toFixed(2)}€
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </AnimatePresence>

              {/* Recommended products */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10"
              >
                <h3 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-fuchsia-400" />
                  También te puede interesar
                </h3>
                <Upsell onAdd={() => console.log('Add upsell')} />
              </motion.div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4 sm:space-y-6">
                {/* Order Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl"
                >
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center gap-3">
                    <Package className="w-6 h-6 text-violet-400" />
                    Resumen
                  </h3>

                  {/* Coupon Input */}
                  <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                    <label className="block text-sm font-bold text-white mb-3 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-violet-400" />
                      ¿Tienes un cupón?
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value.toUpperCase())
                            setCouponError('')
                          }}
                          onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                          placeholder="CÓDIGO"
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-800 border-2 border-white/10 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all uppercase font-mono text-sm text-white placeholder-zinc-500"
                          disabled={!!coupon}
                        />
                      </div>
                      
                      {!coupon ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleApplyCoupon}
                          disabled={isApplyingCoupon || !couponCode.trim()}
                          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold text-sm hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg disabled:shadow-none"
                        >
                          {isApplyingCoupon ? '...' : 'OK'}
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={removeCoupon}
                          className="px-3 sm:px-4 py-2.5 sm:py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all flex items-center shadow-lg"
                          aria-label="Eliminar cupón"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                    
                    {couponError && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 mt-2 flex items-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        {couponError}
                      </motion.p>
                    )}
                    
                    {coupon && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-3 inline-flex items-center gap-2 px-3 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-bold"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Cupón {coupon.code} aplicado
                      </motion.div>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                    <div className="flex justify-between text-zinc-400">
                      <span className="text-sm sm:text-base">Subtotal</span>
                      <span className="font-bold text-white text-sm sm:text-base">
                        {subtotal.toFixed(2)}€
                      </span>
                    </div>
                    
                    {discount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-between text-emerald-400"
                      >
                        <span className="text-sm sm:text-base flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Descuento
                        </span>
                        <span className="font-bold text-sm sm:text-base">
                          -{discount.toFixed(2)}€
                        </span>
                      </motion.div>
                    )}
                    
                    <div className="flex justify-between text-zinc-400">
                      <span className="text-sm sm:text-base flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        Envío
                      </span>
                      <span className="font-bold text-sm sm:text-base">
                        {shipping === 0 ? (
                          <span className="text-emerald-400 font-black">GRATIS</span>
                        ) : (
                          <span className="text-white">{shipping.toFixed(2)}€</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-xl border border-violet-500/20">
                    <span className="text-lg sm:text-xl font-bold text-white">Total</span>
                    <span className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                      {total.toFixed(2)}€
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCheckoutStep(2)}
                    className="w-full py-4 sm:py-5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white rounded-xl sm:rounded-2xl font-black text-base sm:text-lg shadow-2xl shadow-violet-500/50 transition-all duration-500 flex items-center justify-center gap-3 mb-4"
                  >
                    <span>Finalizar compra</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  <Link href="/catalogo">
                    <button className="w-full py-3 sm:py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl sm:rounded-2xl font-bold transition-all">
                      Seguir comprando
                    </button>
                  </Link>

                  {/* Security badges */}
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                    <div className="flex items-center gap-3 text-zinc-400 text-sm">
                      <Shield className="w-5 h-5 text-emerald-400" />
                      <span>Pago 100% seguro</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400 text-sm">
                      <Clock className="w-5 h-5 text-violet-400" />
                      <span>Entrega en 24-48h</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400 text-sm">
                      <Package className="w-5 h-5 text-cyan-400" />
                      <span>Devolución gratuita</span>
                    </div>
                  </div>
                </motion.div>

                {/* Trust Badges */}
                <TrustBadges />
                
                {/* Testimonial */}
                <MiniTestimonial />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}