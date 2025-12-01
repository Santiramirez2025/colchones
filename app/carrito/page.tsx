// app/carrito/page.tsx - ARGENTINA 2025 CON SISTEMA DE CUOTAS
'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart-store'
import { formatARS } from '@/lib/utils/currency'
import { getMejorCuota, calcularTodasLasCuotas, getTextoPromocional } from '@/lib/utils/pricing'
import {
  ShippingProgress,
  TrustBadges,
  UrgencyBanner,
  Upsell,
  EmptyCart,
  CheckoutSteps
} from '@/components/cart/CartComponents'
import CheckoutForm from '@/components/cart/CheckoutForm'

// ✅ Iconos inline SVG optimizados
const Icons = {
  ShoppingBag: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  Trash2: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Plus: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Minus: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  ),
  ArrowRight: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  Tag: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  X: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Truck: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
  Shield: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Heart: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  CheckCircle2: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Package: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  Clock: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  TrendingUp: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  CreditCard: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  DollarSign: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  ChevronDown: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  Check: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Percent: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

export default function CarritoPage() {
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3 | 4>(1)
  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [selectedCuotas, setSelectedCuotas] = useState<number | null>(null) // ✅ NUEVO: null = contado
  const [showCuotasDropdown, setShowCuotasDropdown] = useState(false) // ✅ NUEVO
  
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
    console.log('🛒 [Carrito] Mounted')
  }, [])
  
  const subtotal = getSubtotal()
  const discount = getDiscount()
  const shipping = getShipping()
  const baseTotal = getTotal() // Total sin recargo de cuotas
  const itemCount = getItemCount()
  
  // ✅ CALCULAR CUOTAS DEL TOTAL
  const mejorCuota = useMemo(() => getMejorCuota(baseTotal), [baseTotal])
  const todasLasCuotas = useMemo(() => calcularTodasLasCuotas(baseTotal), [baseTotal])
  const cuotaSeleccionada = useMemo(() => {
    if (selectedCuotas === null) return null
    return todasLasCuotas.find(c => c.cuotas === selectedCuotas) || null
  }, [selectedCuotas, todasLasCuotas])
  
  // ✅ PRECIO FINAL (contado o con recargo de cuotas)
  const finalTotal = cuotaSeleccionada ? cuotaSeleccionada.precioTotal : baseTotal
  
  console.log('💰 [Carrito] Base total:', baseTotal, '→', formatARS(baseTotal))
  console.log('💳 [Carrito] Selected cuotas:', selectedCuotas)
  console.log('🏷️ [Carrito] Final total:', finalTotal, '→', formatARS(finalTotal))
  
  // Handle coupon application
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return
    
    setIsApplyingCoupon(true)
    setCouponError('')
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const validCoupons: Record<string, { discount: number; type: 'percentage' | 'fixed' }> = {
      'BIENVENIDO10': { discount: 10, type: 'percentage' },
      'VILLAMARIA': { discount: 15, type: 'percentage' },
      'HOTSALE40': { discount: 40, type: 'percentage' },
      'CYBER45': { discount: 45, type: 'percentage' }
    }
    
    const couponData = validCoupons[couponCode.toUpperCase()]
    
    if (couponData) {
      applyCoupon({
        code: couponCode.toUpperCase(),
        ...couponData
      })
      setCouponCode('')
      
      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'coupon_applied', {
          coupon_code: couponCode.toUpperCase(),
          discount_amount: couponData.discount
        })
      }
    } else {
      setCouponError('Cupón no válido o expirado')
    }
    
    setIsApplyingCoupon(false)
  }
  
  // ✅ HANDLER PARA CAMBIAR CUOTAS
  const handleCuotasChange = (cuotas: number | null) => {
    console.log('💳 [Carrito] Cuotas changed:', cuotas)
    setSelectedCuotas(cuotas)
    setShowCuotasDropdown(false)
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'select_promotion', {
        promotion_name: cuotas ? `${cuotas} cuotas` : 'Contado',
        creative_name: 'payment_plan_cart',
        creative_slot: 'cart_summary'
      })
    }
  }
  
  // Show checkout form
  if (checkoutStep >= 2) {
    return (
      <CheckoutForm
        step={checkoutStep}
        total={finalTotal} // ✅ Pasar total con cuotas
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
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative">
      {/* Background effects - Azul Colchones style */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" />

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
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-blue-500/30">
              <Icons.ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
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
          
          {/* Trust indicators - Argentina 🇦🇷 */}
          <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-emerald-400">
              <Icons.CheckCircle2 className="w-4 h-4" />
              <span className="font-semibold">Envío gratis Villa María</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Icons.Shield className="w-4 h-4" />
              <span className="font-semibold">Pago 100% seguro</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400">
              <Icons.CreditCard className="w-4 h-4" />
              <span className="font-semibold">Hasta 12 cuotas</span>
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
              <ShippingProgress current={subtotal} target={50000} /> {/* ✅ $50k para envío gratis */}
              
              {/* Items List */}
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => {
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
                      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 shadow-xl backdrop-blur-sm"
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
                            <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-[10px] sm:text-xs font-black px-2 py-1 rounded-lg shadow-lg">
                              -{discountPercent}%
                            </div>
                          )}
                          
                          {/* Stock badge */}
                          <div className="absolute bottom-2 left-2 bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Icons.Package className="w-2.5 h-2.5" />
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
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg font-semibold">
                                  <Icons.TrendingUp className="w-3 h-3" />
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
                              <Icons.Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.button>
                          </div>

                          <div className="flex items-end justify-between gap-4">
                            {/* Quantity */}
                            <div className="flex items-center gap-2 sm:gap-3">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-blue-500/20 rounded-lg flex items-center justify-center hover:border-blue-500 hover:bg-blue-500/20 transition-all text-white"
                                disabled={item.quantity <= 1}
                                aria-label="Disminuir cantidad"
                              >
                                <Icons.Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </motion.button>
                              
                              <span className="font-black text-white w-8 sm:w-10 text-center text-base sm:text-lg tabular-nums">
                                {item.quantity}
                              </span>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-blue-500/20 rounded-lg flex items-center justify-center hover:border-blue-500 hover:bg-blue-500/20 transition-all text-white"
                                aria-label="Aumentar cantidad"
                              >
                                <Icons.Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </motion.button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              {hasDiscount && (
                                <p className="text-xs sm:text-sm text-zinc-500 line-through mb-1">
                                  {formatARS(item.originalPrice! * item.quantity)}
                                </p>
                              )}
                              <p className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                                {formatARS(item.price * item.quantity)}
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
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-blue-500/20"
              >
                <h3 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-center gap-3">
                  <Icons.Heart className="w-6 h-6 text-cyan-400" />
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
                  className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-blue-500/20 shadow-2xl backdrop-blur-sm"
                >
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center gap-3">
                    <Icons.Package className="w-6 h-6 text-blue-400" />
                    Resumen
                  </h3>

                  {/* Coupon Input */}
                  <div className="mb-6 p-4 bg-white/5 rounded-xl border border-blue-500/20">
                    <label className="block text-sm font-bold text-white mb-3 flex items-center gap-2">
                      <Icons.Tag className="w-4 h-4 text-blue-400" />
                      ¿Tenés un cupón?
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
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-800 border-2 border-blue-500/20 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all uppercase font-mono text-sm text-white placeholder-zinc-500"
                          disabled={!!coupon}
                        />
                      </div>
                      
                      {!coupon ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleApplyCoupon}
                          disabled={isApplyingCoupon || !couponCode.trim()}
                          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-sm hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30 disabled:shadow-none"
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
                          <Icons.X className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                    
                    {couponError && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 mt-2 flex items-center gap-1"
                      >
                        <Icons.X className="w-3 h-3" />
                        {couponError}
                      </motion.p>
                    )}
                    
                    {coupon && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-3 inline-flex items-center gap-2 px-3 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-bold"
                      >
                        <Icons.CheckCircle2 className="w-4 h-4" />
                        Cupón {coupon.code} aplicado
                      </motion.div>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6 pb-6 border-b border-blue-500/20">
                    <div className="flex justify-between text-zinc-400">
                      <span className="text-sm sm:text-base">Subtotal</span>
                      <span className="font-bold text-white text-sm sm:text-base">
                        {formatARS(subtotal)}
                      </span>
                    </div>
                    
                    {discount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-between text-emerald-400"
                      >
                        <span className="text-sm sm:text-base flex items-center gap-2">
                          <Icons.Tag className="w-4 h-4" />
                          Descuento
                        </span>
                        <span className="font-bold text-sm sm:text-base">
                          -{formatARS(discount)}
                        </span>
                      </motion.div>
                    )}
                    
                    <div className="flex justify-between text-zinc-400">
                      <span className="text-sm sm:text-base flex items-center gap-2">
                        <Icons.Truck className="w-4 h-4" />
                        Envío
                      </span>
                      <span className="font-bold text-sm sm:text-base">
                        {shipping === 0 ? (
                          <span className="text-emerald-400 font-black">GRATIS</span>
                        ) : (
                          <span className="text-white">{formatARS(shipping)}</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* ============================================================================ */}
                  {/* SELECTOR DE CUOTAS - ✅ NUEVO */}
                  {/* ============================================================================ */}
                  <div className="mb-6 pb-6 border-b border-blue-500/20">
                    <button
                      onClick={() => setShowCuotasDropdown(!showCuotasDropdown)}
                      className="w-full flex items-center justify-between p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-xl transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Icons.CreditCard className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <div className="text-left flex-1 min-w-0">
                          {selectedCuotas === null ? (
                            <div>
                              <span className="text-blue-400 font-semibold block text-sm">
                                Pago de contado
                              </span>
                              <span className="text-xs text-zinc-400">
                                o elegí cuotas
                              </span>
                            </div>
                          ) : (
                            <div>
                              <span className="text-white font-bold block text-sm">
                                {cuotaSeleccionada?.cuotas} cuotas de {cuotaSeleccionada?.formatted.precioCuota}
                              </span>
                              <span className="text-xs text-zinc-400">
                                Total: {cuotaSeleccionada?.formatted.precioTotal}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: showCuotasDropdown ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <Icons.ChevronDown className="w-5 h-5 text-blue-400" />
                      </motion.div>
                    </button>

                    {/* Dropdown con opciones */}
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
                              onClick={() => handleCuotasChange(null)}
                              className={`w-full p-3 rounded-xl border transition-all duration-300 text-left ${
                                selectedCuotas === null
                                  ? 'bg-emerald-500/20 border-emerald-500/50 ring-2 ring-emerald-500/30'
                                  : 'bg-zinc-800/50 border-zinc-700 hover:border-emerald-500/30'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Icons.DollarSign className="w-4 h-4 text-emerald-400" />
                                    <span className="font-bold text-white text-sm">Contado</span>
                                  </div>
                                  <div className="text-xl font-black text-emerald-400">
                                    {formatARS(baseTotal)}
                                  </div>
                                </div>
                                {selectedCuotas === null && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0"
                                  >
                                    <Icons.Check className="w-3 h-3 text-white" />
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
                                onClick={() => handleCuotasChange(cuota.cuotas)}
                                className={`w-full p-3 rounded-xl border transition-all duration-300 text-left ${
                                  selectedCuotas === cuota.cuotas
                                    ? 'bg-blue-500/20 border-blue-500/50 ring-2 ring-blue-500/30'
                                    : 'bg-zinc-800/50 border-zinc-700 hover:border-blue-500/30'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="w-6 h-6 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold text-blue-400">
                                          {cuota.cuotas}
                                        </span>
                                      </div>
                                      <span className="text-lg font-black text-white">
                                        {cuota.formatted.precioCuota}
                                      </span>
                                      <span className="text-xs text-zinc-400">/ mes</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                      <span className="text-zinc-400">
                                        Total: {cuota.formatted.precioTotal}
                                      </span>
                                      <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold rounded-full">
                                        +{cuota.recargoPercentage}
                                      </span>
                                    </div>
                                  </div>
                                  {selectedCuotas === cuota.cuotas && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
                                    >
                                      <Icons.Check className="w-3 h-3 text-white" />
                                    </motion.div>
                                  )}
                                </div>
                              </motion.button>
                            ))}
                          </div>

                          {/* Info tip */}
                          {selectedCuotas !== null && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-3 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg"
                            >
                              <div className="flex items-start gap-2">
                                <Icons.Percent className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                <div className="text-xs text-zinc-400">
                                  <p className="font-semibold text-blue-400 mb-1">
                                    💡 Con pago de contado ahorrás
                                  </p>
                                  <p>
                                    {formatARS(finalTotal - baseTotal)} menos que en cuotas
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Total con recargo de cuotas si aplica */}
                  <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                    <div>
                      <span className="text-sm text-zinc-400 block mb-1">
                        {selectedCuotas ? `Total en ${selectedCuotas} cuotas` : 'Total a pagar'}
                      </span>
                      <span className="text-lg sm:text-xl font-bold text-white">Total</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                        {formatARS(finalTotal)}
                      </span>
                      {selectedCuotas && cuotaSeleccionada && (
                        <p className="text-xs text-zinc-400 mt-1">
                          {cuotaSeleccionada.cuotas}x {cuotaSeleccionada.formatted.precioCuota}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCheckoutStep(2)}
                    className="w-full py-4 sm:py-5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white rounded-xl sm:rounded-2xl font-black text-base sm:text-lg shadow-2xl shadow-blue-500/50 transition-all duration-500 flex items-center justify-center gap-3 mb-4"
                  >
                    <span>Finalizar compra</span>
                    <Icons.ArrowRight className="w-5 h-5" />
                  </motion.button>

                  <Link href="/catalogo">
                    <button className="w-full py-3 sm:py-4 bg-white/5 hover:bg-white/10 border border-blue-500/20 text-white rounded-xl sm:rounded-2xl font-bold transition-all">
                      Seguir comprando
                    </button>
                  </Link>

                  {/* Security badges - Argentina 🇦🇷 */}
                  <div className="mt-6 pt-6 border-t border-blue-500/20 space-y-3">
                    <div className="flex items-center gap-3 text-zinc-400 text-sm">
                      <Icons.Shield className="w-5 h-5 text-emerald-400" />
                      <span>Pago 100% seguro con MercadoPago</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400 text-sm">
                      <Icons.Clock className="w-5 h-5 text-blue-400" />
                      <span>Entrega en 3 a 6 días hábiles</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400 text-sm">
                      <Icons.Package className="w-5 h-5 text-cyan-400" />
                      <span>Devolución gratuita 100 noches</span>
                    </div>
                  </div>
                </motion.div>

                {/* Trust Badges */}
                <TrustBadges />
                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}