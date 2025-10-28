'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ArrowRight, Tag, X } from 'lucide-react'
import Link from 'next/link'
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
    
    // Simulate API call to validate coupon
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Mock coupon validation
    const validCoupons: Record<string, { discount: number; type: 'percentage' | 'fixed' }> = {
      'BIENVENIDO10': { discount: 10, type: 'percentage' },
      'VERANO20': { discount: 20, type: 'percentage' },
      'DESCUENTO50': { discount: 50, type: 'fixed' }
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
  
  // Add upsell item
  const handleAddUpsell = () => {
    // This would integrate with your actual product system
    console.log('Adding upsell item...')
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
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#fafafa]">
      <div className="container mx-auto px-4">
        {/* Checkout Steps */}
        <CheckoutSteps currentStep={checkoutStep} />
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Tu carrito
          </h1>
          <p className="text-lg text-gray-600">
            {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
          </p>
        </motion.div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Urgency Banner */}
              <UrgencyBanner type="stock" />
              
              {/* Shipping Progress */}
              <ShippingProgress current={subtotal} target={500} />
              
              {/* Items List */}
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-6">
                      {/* Image */}
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                        <span className="text-4xl md:text-5xl">🛏️</span>
                        {item.originalPrice && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            OFERTA
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                              Tamaño: {item.size}
                            </p>
                            {item.variant && (
                              <p className="text-sm text-gray-600">
                                Variante: {item.variant}
                              </p>
                            )}
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>

                        <div className="flex items-end justify-between mt-4">
                          {/* Quantity */}
                          <div className="flex items-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-9 h-9 border-2 border-gray-200 rounded-lg flex items-center justify-center hover:border-indigo-600 hover:text-indigo-600 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            
                            <span className="font-bold text-gray-900 w-8 text-center tabular-nums">
                              {item.quantity}
                            </span>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-9 h-9 border-2 border-gray-200 rounded-lg flex items-center justify-center hover:border-indigo-600 hover:text-indigo-600 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            {item.originalPrice && (
                              <p className="text-sm text-gray-400 line-through">
                                {(item.originalPrice * item.quantity).toFixed(2)}€
                              </p>
                            )}
                            <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                              {(item.price * item.quantity).toFixed(2)}€
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Upsell */}
                <Upsell onAdd={handleAddUpsell} />
                
                {/* Order Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Resumen del pedido
                  </h3>

                  {/* Coupon Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Tienes un cupón?
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value.toUpperCase())
                            setCouponError('')
                          }}
                          onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                          placeholder="CÓDIGO"
                          className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-600 transition-colors uppercase font-mono text-sm"
                          disabled={!!coupon}
                        />
                      </div>
                      
                      {!coupon ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleApplyCoupon}
                          disabled={isApplyingCoupon || !couponCode.trim()}
                          className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {isApplyingCoupon ? '...' : 'Aplicar'}
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={removeCoupon}
                          className="px-4 py-2.5 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                    
                    {couponError && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 mt-2"
                      >
                        {couponError}
                      </motion.p>
                    )}
                    
                    {coupon && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs font-semibold"
                      >
                        <Tag className="w-3 h-3" />
                        Cupón {coupon.code} aplicado
                      </motion.div>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-900">
                        {subtotal.toFixed(2)}€
                      </span>
                    </div>
                    
                    {discount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-between text-emerald-600"
                      >
                        <span>Descuento</span>
                        <span className="font-semibold">
                          -{discount.toFixed(2)}€
                        </span>
                      </motion.div>
                    )}
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Envío</span>
                      <span className="font-semibold text-gray-900">
                        {shipping === 0 ? (
                          <span className="text-emerald-600 font-bold">GRATIS</span>
                        ) : (
                          `${shipping.toFixed(2)}€`
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {total.toFixed(2)}€
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCheckoutStep(2)}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mb-4"
                  >
                    <span>Ir al pago</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  <Link href="/catalogo">
                    <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors">
                      Seguir comprando
                    </button>
                  </Link>
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