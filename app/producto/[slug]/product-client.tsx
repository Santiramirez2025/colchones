// app/producto/[slug]/product-client.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Shield,
  Truck,
  Moon,
  Zap,
  Heart,
  Share2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Package,
  Award,
  TrendingUp,
  Layers,
  Clock,
  Users,
  Lock,
  ArrowRight,
  Minus,
  Plus,
  ShoppingCart,
  Info,
  RotateCcw,
  Sparkles,
  ThumbsUp,
  MessageCircle,
  ExternalLink,
  X,
  Play,
  ZoomIn,
  Check,
  BadgeCheck,
  Ruler,
  ChevronDown,
  ChevronUp,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Bed  // ✅ ASEGÚRATE QUE ESTÉ AQUÍ
} from 'lucide-react'
import { Product, ProductVariant, Review, Category } from '@prisma/client'
import { useCartStore } from '@/lib/store/cart-store'


// Helper para parsear JSON
const parseJsonField = (field: any): any[] => {
  if (Array.isArray(field)) return field
  if (typeof field === 'string') {
    try {
      return JSON.parse(field)
    } catch {
      return []
    }
  }
  return []
}

interface ProductClientProps {
  product: Product & {
    category: Category | null
    variants: ProductVariant[]
    reviews: Review[]
  }
  relatedProducts: Product[]
  similarProducts: Product[]
  averageRatings: {
    comfort: number
    quality: number
    value: number
  }
  stockInfo: {
    available: boolean
    quantity: number
    lowStock: boolean
  }
}

export default function ProductClient({ 
  product, 
  relatedProducts,
  similarProducts,
  averageRatings,
  stockInfo
}: ProductClientProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews' | 'faq'>('description')
  const [imageIndex, setImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  
  const addItem = useCartStore(state => state.addItem)
  const productRef = useRef<HTMLDivElement>(null)
  
  const images = parseJsonField(product.images)
  const features = parseJsonField(product.features)
  const techFeatures = parseJsonField(product.techFeatures)
  const certifications = parseJsonField(product.certifications)
  const tags = parseJsonField(product.tags)

  const currentPrice = selectedVariant?.price || product.price
  const monthlyPayment = Math.round(currentPrice / 12)
  const savings = product.originalPrice ? product.originalPrice - currentPrice : 0
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)
    : 0

  // Sticky bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (productRef.current) {
        const rect = productRef.current.getBoundingClientRect()
        setShowStickyBar(rect.bottom < 0)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAddToCart = () => {
    addItem({
      id: selectedVariant?.id || product.id,
      name: product.name,
      price: currentPrice,
      quantity: quantity,
      image: product.image,
      size: selectedVariant?.size || 'Estándar',
      sku: selectedVariant?.sku || product.sku || undefined
    })
    
    // TODO: Show toast notification
    console.log('Added to cart')
  }

  const handleShare = async (platform?: string) => {
    const url = window.location.href
    const text = `${product.name} - ${product.subtitle}`

    if (platform === 'copy') {
      navigator.clipboard.writeText(url)
      setShowShareMenu(false)
      return
    }

    const shareUrls = {
      facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`
    }

    if (platform && shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank')
      setShowShareMenu(false)
    } else if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text, url })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      setShowShareMenu(!showShareMenu)
    }
  }

  const faqs = [
    {
      q: '¿Cuánto tarda en llegar el colchón?',
      a: `El colchón se entrega en ${product.deliveryDays} días laborables. El envío es gratuito y con seguimiento.`
    },
    {
      q: '¿Qué incluye la garantía de 10 años?',
      a: 'La garantía cubre defectos de fabricación y hundimiento superior a 2,5cm. No cubre desgaste normal ni manchas.'
    },
    {
      q: '¿Cómo funciona el período de prueba?',
      a: `Tienes ${product.trialNights} noches para probar el colchón. Si no estás satisfecho, lo recogemos gratis y te devolvemos el dinero.`
    },
    {
      q: '¿Necesito una base especial?',
      a: 'Funciona con cualquier base firme: somier de láminas, base tapizada o canapé. No recomendado para bases blandas.'
    },
    {
      q: '¿El colchón viene comprimido?',
      a: 'Sí, viene enrollado en caja para facilitar el transporte. Se expande en 24-48h tras desembalarlo.'
    },
    {
      q: '¿Puedo financiar la compra?',
      a: `Sí, ofrecemos financiación en 12 meses sin intereses. Pagarías ${monthlyPayment}€/mes.`
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Breadcrumbs Premium */}
      <div className="border-b border-white/10 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/catalogo" className="hover:text-white transition-colors">Catálogo</Link>
            {product.category && (
              <>
                <ChevronRight className="w-4 h-4" />
                <Link 
                  href={`/catalogo?category=${product.category.slug}`} 
                  className="hover:text-white transition-colors"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-semibold">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-zinc-900 to-zinc-950 border-b border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-zinc-800 overflow-hidden flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                      🛏️
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-white">{currentPrice}€</span>
                      {product.originalPrice && (
                        <span className="text-sm text-zinc-400 line-through">{product.originalPrice}€</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Quantity selector compacto */}
                  <div className="hidden md:flex items-center border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 hover:bg-white/5 transition-colors flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4 text-white" />
                    </button>
                    <span className="text-white font-bold w-10 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-10 h-10 hover:bg-white/5 transition-colors flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-violet-500/30"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="hidden md:inline">Añadir al carrito</span>
                    <span className="md:hidden">Añadir</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-12" ref={productRef}>
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery Premium */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="relative">
              {/* Badges flotantes */}
              <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  {product.badge && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-orange-600 text-white px-4 py-2 rounded-xl text-sm font-black shadow-xl">
                      <Sparkles className="w-4 h-4" />
                      {product.badge}
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-xl text-sm font-black shadow-xl">
                      <TrendingUp className="w-4 h-4" />
                      MÁS VENDIDO
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white px-4 py-2 rounded-xl text-sm font-black shadow-xl">
                      -{discountPercent}% OFF
                    </span>
                  )}
                </div>
                
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-xl transition-all border border-white/10"
                >
                  <Heart 
                    className={`w-6 h-6 transition-all ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
                    }`} 
                  />
                </button>
              </div>

              {/* Main image */}
              <div className="relative aspect-square bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl overflow-hidden group cursor-pointer mb-4 border border-white/10">
                <motion.div 
                  key={imageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center text-[15rem]"
                  onClick={() => setShowImageModal(true)}
                >
                  🛏️
                </motion.div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setImageIndex((imageIndex - 1 + images.length) % images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={() => setImageIndex((imageIndex + 1) % images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}

                {/* Video badge */}
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl transition-all font-semibold"
                >
                  <Play className="w-4 h-4" />
                  Ver video
                </button>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.slice(0, 4).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setImageIndex(index)}
                      className={`aspect-square bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl overflow-hidden transition-all border-2 ${
                        imageIndex === index
                          ? 'border-violet-500 ring-2 ring-violet-500/30'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🛏️
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Trust badges compactos */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="text-center p-4 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl">
                  <Truck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">Envío {product.deliveryDays}h</p>
                  <p className="text-[10px] text-zinc-400">Gratis</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl">
                  <Shield className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">{product.trialNights} noches</p>
                  <p className="text-[10px] text-zinc-400">Prueba</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20 rounded-xl">
                  <Award className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">{product.warranty} años</p>
                  <p className="text-[10px] text-zinc-400">Garantía</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Info Premium */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
                {product.name}
              </h1>
              
              <p className="text-xl text-zinc-400 mb-6">{product.subtitle}</p>

              {/* Rating & Social Proof */}
              <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-white">{product.rating.toFixed(1)}</span>
                  <span className="text-zinc-500">({product.reviewCount})</span>
                </div>

                {product.reviewCount > 50 && (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <BadgeCheck className="w-5 h-5" />
                    <span className="text-sm font-semibold">Verificado por compradores</span>
                  </div>
                )}

                <button 
                  onClick={() => setActiveTab('reviews')}
                  className="text-violet-400 hover:text-violet-300 font-semibold text-sm flex items-center gap-1 transition-colors"
                >
                  Leer opiniones
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Precio destacado */}
            <div className="mb-8 p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-6xl font-black text-white">
                      {currentPrice}€
                    </span>
                    {product.originalPrice && product.originalPrice > currentPrice && (
                      <span className="text-3xl text-zinc-500 line-through">
                        {product.originalPrice}€
                      </span>
                    )}
                  </div>
                  {savings > 0 && (
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-xl">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-bold">Ahorras {savings}€</span>
                    </div>
                  )}
                </div>

                {stockInfo.lowStock && (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-xl animate-pulse">
                    <AlertCircle className="w-5 h-5" />
                    <div className="text-right">
                      <p className="font-black text-sm">¡Stock limitado!</p>
                      <p className="text-xs">Solo {stockInfo.quantity} unidades</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-zinc-400 text-sm mb-1">Financiación 0%</p>
                  <p className="text-2xl font-black text-white">{monthlyPayment}€<span className="text-lg font-normal text-zinc-400">/mes</span></p>
                  <p className="text-xs text-zinc-500 mt-1">12 meses sin intereses</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-xl">
                  <p className="text-zinc-400 text-sm mb-1">Por solo</p>
                  <p className="text-2xl font-black text-white">{Math.round(currentPrice / 365)}€<span className="text-lg font-normal text-zinc-400">/día</span></p>
                  <p className="text-xs text-zinc-500 mt-1">Durante 1 año</p>
                </div>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 rounded-2xl border border-white/10">
              <div className="text-center">
                <TrendingUp className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                <p className="text-xs text-zinc-500 mb-1">Firmeza</p>
                <p className="font-black text-white text-xl">{product.firmnessValue}%</p>
                <p className="text-[10px] text-zinc-600">{product.firmness}</p>
              </div>
              <div className="text-center">
                <Layers className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-xs text-zinc-500 mb-1">Altura</p>
                <p className="font-black text-white text-xl">{product.height}cm</p>
                <p className="text-[10px] text-zinc-600">Grosor total</p>
              </div>
              <div className="text-center">
                <Zap className="w-6 h-6 text-fuchsia-400 mx-auto mb-2" />
                <p className="text-xs text-zinc-500 mb-1">Transpirabilidad</p>
                <p className="font-black text-white text-xl">{product.transpirability}%</p>
                <p className="text-[10px] text-zinc-600">Ventilación</p>
              </div>
            </div>

            {/* Variant Selector */}
            {product.variants.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="block font-bold text-white flex items-center gap-2">
                    <Bed className="w-5 h-5 text-violet-400" />
                    Selecciona tu medida
                  </label>
                  <button className="text-sm text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1 transition-colors">
                    <Ruler className="w-4 h-4" />
                    Guía de tallas
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {product.variants.map((variant) => (
                    <motion.button
                      key={variant.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedVariant(variant)}
                      className={`relative p-4 rounded-xl border-2 transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'border-violet-500 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10'
                          : 'border-white/10 hover:border-white/20 bg-zinc-900/50'
                      }`}
                    >
                      <p className="font-bold text-white">{variant.size}</p>
                      <p className="text-sm text-zinc-400">{variant.price}€</p>
                      {variant.stock < 5 && variant.stock > 0 && (
                        <span className="absolute top-2 right-2 flex items-center gap-1 bg-amber-500/20 text-amber-400 px-2 py-1 rounded-lg text-[10px] font-bold">
                          <AlertCircle className="w-3 h-3" />
                          {variant.stock}
                        </span>
                      )}
                      {variant.stock === 0 && (
                        <span className="absolute inset-0 bg-zinc-900/80 rounded-xl flex items-center justify-center text-xs font-semibold text-zinc-500 backdrop-blur-sm">
                          Agotado
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="block font-bold text-white mb-4">Cantidad</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-white/10 rounded-xl overflow-hidden bg-zinc-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-14 h-14 hover:bg-white/5 transition-colors flex items-center justify-center"
                  >
                    <Minus className="w-5 h-5 text-white" />
                  </button>
                  <span className="text-2xl font-black w-20 text-center text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-14 h-14 hover:bg-white/5 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                </div>
                <p className="text-sm text-zinc-400">
                  Máximo 10 unidades · Total: <span className="font-bold text-white">{(currentPrice * quantity).toFixed(0)}€</span>
                </p>
              </div>
            </div>

            {/* CTAs Premium */}
            <div className="space-y-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleAddToCart}
                disabled={!product.inStock || (selectedVariant && selectedVariant.stock === 0)}
                className="relative w-full group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] animate-gradient" />
                <div className="relative py-5 px-8 flex items-center justify-center gap-3 text-white font-black text-lg">
                  <ShoppingCart className="w-6 h-6" />
                  {product.inStock ? 'Añadir al carrito' : 'Agotado'}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="py-4 border-2 border-white/10 hover:border-red-500/50 bg-zinc-900 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-white"
                >
                  <Heart 
                    className={`w-5 h-5 transition-all ${
                      isFavorite ? 'fill-red-500 text-red-500' : ''
                    }`} 
                  />
                  <span>Guardar</span>
                </motion.button>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleShare()}
                    className="w-full py-4 border-2 border-white/10 hover:border-white/20 bg-zinc-900 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-white"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Compartir</span>
                  </motion.button>

                  {/* Share menu */}
                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 right-0 bg-zinc-900 border border-white/10 rounded-xl p-3 shadow-2xl z-10 min-w-[200px]"
                      >
                        {[
                          { icon: Facebook, label: 'Facebook', platform: 'facebook' },
                          { icon: Twitter, label: 'Twitter', platform: 'twitter' },
                          { icon: Linkedin, label: 'LinkedIn', platform: 'linkedin' },
                          { icon: Mail, label: 'Email', platform: 'email' },
                          { icon: Copy, label: 'Copiar enlace', platform: 'copy' }
                        ].map((item) => (
                          <button
                            key={item.platform}
                            onClick={() => handleShare(item.platform)}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-white text-sm font-semibold"
                          >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Key Features destacadas */}
            <div className="mb-8 p-6 bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 rounded-2xl border border-white/10">
              <h3 className="font-black text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-400" />
                Características principales
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {features.slice(0, 8).map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock & Delivery Info Premium */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white flex items-center gap-2">
                    En stock - Envío inmediato
                    {stockInfo.quantity > 5 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </p>
                  <p className="text-sm text-zinc-400">
                    Recíbelo en {product.deliveryDays} días laborables
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white">Devolución gratuita</p>
                  <p className="text-sm text-zinc-400">
                    Pruébalo {product.trialNights} noches sin compromiso
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mb-8">
                <span className="text-sm font-bold text-zinc-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Certificaciones:
                </span>
                {certifications.map((cert, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1.5 bg-zinc-900 border border-white/10 text-xs font-bold text-zinc-300 rounded-lg"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            )}

            {/* Garantías destacadas */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-4 bg-zinc-900 rounded-xl border border-white/10">
                <Lock className="w-5 h-5 text-violet-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">Pago seguro</p>
                  <p className="text-zinc-500 text-xs">SSL encriptado</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-zinc-900 rounded-xl border border-white/10">
                <Users className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">+12.000 clientes</p>
                  <p className="text-zinc-500 text-xs">Satisfechos</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section Premium */}
        <div className="mb-16">
          <div className="border-b border-white/10 mb-8 overflow-x-auto">
            <div className="flex gap-8">
              {[
                { id: 'description', label: 'Descripción', icon: Info },
                { id: 'specs', label: 'Especificaciones', icon: Package },
                { id: 'reviews', label: `Opiniones (${product.reviews.length})`, icon: Star },
                { id: 'faq', label: 'Preguntas', icon: MessageCircle }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 border-b-2 font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-violet-500 text-white'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'description' && (
              <DescriptionTab key="description" product={product} features={features} />
            )}
            {activeTab === 'specs' && (
              <SpecificationsTab key="specs" product={product} techFeatures={techFeatures} />
            )}
            {activeTab === 'reviews' && (
              <ReviewsTab
                key="reviews"
                reviews={product.reviews}
                averageRatings={averageRatings}
                productId={product.id}
              />
            )}
            {activeTab === 'faq' && (
              <FaqTab 
                key="faq" 
                faqs={faqs}
                expandedFaq={expandedFaq}
                setExpandedFaq={setExpandedFaq}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts 
            products={relatedProducts}
            title="También te puede interesar"
          />
        )}

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <RelatedProducts 
            products={similarProducts}
            title="Colchones con firmeza similar"
          />
        )}
      </div>

      {/* Modals */}
      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        images={images.length > 0 ? images : [product.image]}
        currentIndex={imageIndex}
        productName={product.name}
      />

      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        productName={product.name}
      />

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}

// COMPONENTS AUXILIARES

function DescriptionTab({ product, features }: { product: Product; features: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl border border-white/10 p-8"
    >
      <h3 className="text-3xl font-black text-white mb-6">Sobre este producto</h3>
      
      <div className="prose prose-invert max-w-none mb-8">
        <p className="text-zinc-300 leading-relaxed text-lg">
          {product.description || 'El ' + product.name + ' combina tecnología avanzada con materiales premium para ofrecerte un descanso excepcional. Diseñado con ' + product.height + 'cm de altura y una firmeza del ' + product.firmnessValue + '%, este colchón se adapta perfectamente a tu cuerpo mientras proporciona el soporte necesario para tu columna vertebral.'}
        </p>
      </div>

      <h4 className="text-xl font-black text-white mb-4">Beneficios principales</h4>
      <div className="grid md:grid-cols-2 gap-4">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0 mt-1" />
            <span className="text-zinc-300">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function SpecificationsTab({ product, techFeatures }: { product: Product; techFeatures: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl border border-white/10 p-8"
    >
      <h3 className="text-3xl font-black text-white mb-8">Especificaciones técnicas</h3>
      
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
        {[
          { label: 'Firmeza', value: `${product.firmnessValue}% - ${product.firmness}`, icon: TrendingUp },
          { label: 'Transpirabilidad', value: `${product.transpirability}%`, icon: Zap },
          { label: 'Altura total', value: `${product.height}cm`, icon: Layers },
          { label: 'Peso aproximado', value: product.weight ? `${product.weight}kg` : 'N/A', icon: Package },
          { label: 'Garantía', value: `${product.warranty} años`, icon: Shield },
          { label: 'Período de prueba', value: `${product.trialNights} noches`, icon: Moon },
          { label: 'Stock disponible', value: product.stock > 0 ? `${product.stock} unidades` : 'Agotado', icon: Package },
          { label: 'SKU', value: product.sku || 'N/A', icon: Info }
        ].map((spec, index) => (
          <div key={index} className="flex items-center justify-between py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <spec.icon className="w-5 h-5 text-violet-400" />
              </div>
              <span className="text-zinc-400 font-semibold">{spec.label}</span>
            </div>
            <span className="font-black text-white">{spec.value}</span>
          </div>
        ))}
      </div>

      {techFeatures.length > 0 && (
        <>
          <h4 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-violet-400" />
            Características técnicas
          </h4>
          <div className="grid gap-4">
            {techFeatures.map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-zinc-300 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}

function ReviewsTab({ reviews, averageRatings, productId }: {
  reviews: Review[]
  averageRatings: { comfort: number; quality: number; value: number }
  productId: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {reviews.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Rating Summary Premium */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl border border-white/10 p-8">
            <h3 className="text-2xl font-black text-white mb-6">Valoración general</h3>
            
            <div className="text-center mb-8">
              <div className="text-7xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">
                {averageRatings.comfort.toFixed(1)}
              </div>
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(averageRatings.comfort)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-zinc-400">
                Basado en <span className="font-bold text-white">{reviews.length}</span> opiniones verificadas
              </p>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Confort', value: averageRatings.comfort, color: 'from-violet-500 to-fuchsia-500' },
                { label: 'Calidad', value: averageRatings.quality, color: 'from-cyan-500 to-blue-500' },
                { label: 'Relación calidad-precio', value: averageRatings.value, color: 'from-emerald-500 to-green-500' }
              ].map((rating) => (
                <div key={rating.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400 font-semibold">{rating.label}</span>
                    <span className="font-black text-white">{rating.value.toFixed(1)}/5</span>
                  </div>
                  <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${rating.color}`}
                      style={{ width: `${(rating.value / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List Premium */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.map((review) => (
              <div 
                key={review.id}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-zinc-700'
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg">
                          <BadgeCheck className="w-4 h-4" />
                          <span className="text-xs font-bold">Verificado</span>
                        </div>
                      )}
                    </div>
                    <h4 className="font-black text-white text-lg">{review.title}</h4>
                  </div>
                  <span className="text-sm text-zinc-500">
                    {new Date(review.createdAt).toLocaleDateString('es-ES', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>

                <p className="text-zinc-300 leading-relaxed mb-6">{review.comment}</p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-black">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{review.userName}</p>
                      <p className="text-xs text-zinc-500">{review.userLocation}</p>
                    </div>
                  </div>

                  {review.wouldRecommend && (
                    <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs font-bold">Recomienda</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl border border-white/10 p-16 text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Star className="w-10 h-10 text-zinc-600" />
          </div>
          <h3 className="text-2xl font-black text-white mb-3">
            Aún no hay opiniones
          </h3>
          <p className="text-zinc-400 mb-6">
            Sé el primero en valorar este producto
          </p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
            <MessageCircle className="w-5 h-5" />
            Escribir opinión
          </button>
        </div>
      )}
    </motion.div>
  )
}

function FaqTab({ faqs, expandedFaq, setExpandedFaq }: {
  faqs: Array<{ q: string; a: string }>
  expandedFaq: number | null
  setExpandedFaq: (index: number | null) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      {faqs.map((faq, index) => (
        <div key={index} className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-white/10 overflow-hidden">
          <button
            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-all"
          >
            <span className="font-bold text-white pr-4">{faq.q}</span>
            <div className="flex-shrink-0">
              {expandedFaq === index ? (
                <ChevronUp className="w-6 h-6 text-violet-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-zinc-500" />
              )}
            </div>
          </button>
          <AnimatePresence>
            {expandedFaq === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-zinc-300 leading-relaxed">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl p-6 text-center">
        <MessageCircle className="w-12 h-12 text-violet-400 mx-auto mb-4" />
        <h4 className="text-xl font-black text-white mb-2">
          ¿Tienes más preguntas?
        </h4>
        <p className="text-zinc-400 mb-4">
          Nuestro equipo está disponible para ayudarte
        </p>
        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
          Contactar soporte
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

function RelatedProducts({ products, title }: { products: Product[]; title: string }) {
  return (
    <div>
      <h2 className="text-4xl font-black text-white mb-8 flex items-center gap-3">
        <Sparkles className="w-8 h-8 text-violet-400" />
        {title}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/producto/${product.slug}`} key={product.id}>
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-white/10 overflow-hidden hover:border-violet-500/30 transition-all group"
            >
              <div className="aspect-square bg-zinc-800 flex items-center justify-center relative overflow-hidden">
                <span className="text-7xl">🛏️</span>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white mb-2 line-clamp-1 group-hover:text-violet-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{product.subtitle}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-white">{product.price}€</span>
                    {product.originalPrice && (
                      <span className="text-sm text-zinc-500 line-through ml-2">{product.originalPrice}€</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-white">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function ImageModal({ isOpen, onClose, images, currentIndex, productName }: {
  isOpen: boolean
  onClose: () => void
  images: string[]
  currentIndex: number
  productName: string
}) {
  const [index, setIndex] = useState(currentIndex)

  useEffect(() => {
    setIndex(currentIndex)
  }, [currentIndex])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
        >
          <X className="w-7 h-7" />
        </button>

        <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
          <div className="aspect-square bg-zinc-900 rounded-3xl flex items-center justify-center mb-6 overflow-hidden">
            <span className="text-[25rem]">🛏️</span>
          </div>
          
          {images.length > 1 && (
            <div className="flex justify-center gap-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'bg-white w-12' : 'bg-white/30 w-2 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function VideoModal({ isOpen, onClose, videoUrl, productName }: {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  productName: string
}) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
        >
          <X className="w-7 h-7" />
        </button>

        <div className="max-w-5xl w-full aspect-video" onClick={(e) => e.stopPropagation()}>
          <iframe
            src={videoUrl}
            title={`Video de ${productName}`}
            className="w-full h-full rounded-3xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}