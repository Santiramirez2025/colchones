'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, Shield, Truck, Heart, Share2, ChevronRight, ChevronLeft,
  CheckCircle2, AlertCircle, Package, Award, TrendingUp, Layers,
  Users, Lock, Minus, Plus, ShoppingCart, Info, Sparkles, 
  MessageCircle, X, ZoomIn, Check, BadgeCheck, ChevronDown, 
  ChevronUp, Facebook, Twitter, Linkedin, Mail, Copy, Bed, Wind, Moon
} from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import type { 
  ProductWithRelations, 
  StockInfo,
  Breadcrumb 
} from '@/lib/types/product'

interface ProductClientProps {
  product: ProductWithRelations
  relatedProducts: any[]
  similarProducts: any[]
  reviews: any[]
  stockInfo: StockInfo
  breadcrumbs: Breadcrumb[]
}

export default function ProductClient({ 
  product, 
  relatedProducts = [],
  similarProducts = [],
  reviews = [],
  stockInfo,
  breadcrumbs = []
}: ProductClientProps) {
  const router = useRouter()
  
  // SAFE ARRAY PARSING
  const images = Array.isArray(product.images) ? product.images : []
  const features = Array.isArray(product.features) ? product.features : []
  const variants = Array.isArray(product.variants) ? product.variants : []

  // RATINGS
  const averageRatings = calculateRatings(reviews, product.rating)

  // STATE
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews' | 'faq'>('description')
  const [imageIndex, setImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showAddedToast, setShowAddedToast] = useState(false)
  
  const addItem = useCartStore(state => state.addItem)
  const productRef = useRef<HTMLDivElement>(null)
  
  // COMPUTED
  const currentPrice = selectedVariant?.price || product.price
  const originalPrice = selectedVariant?.originalPrice || product.originalPrice
  const savings = originalPrice ? originalPrice - currentPrice : 0
  const discountPercent = originalPrice 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0
  const isOutOfStock = !product.inStock || (selectedVariant && selectedVariant.stock === 0)
  const currentImage = images.length > 0 ? images[imageIndex] : product.image

  // STICKY BAR EFFECT
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

  // ADD TO CART - CON NAVEGACIÓN AL CARRITO
  const handleAddToCart = () => {
    if (isOutOfStock) return
  
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: currentPrice,
      originalPrice: originalPrice || undefined,
      quantity: quantity,
      image: currentImage || product.image || '/images/placeholder.jpg',
      images: images.length > 0 ? images : (product.image ? [product.image] : []),
      size: selectedVariant?.size || 'Estándar',
      variant: selectedVariant?.dimensions || undefined,
      sku: selectedVariant?.sku || product.sku || undefined,
      maxQuantity: 10,
      inStock: product.inStock,
      category: product.category?.name,
      rating: product.rating,
      isBestSeller: product.isBestSeller
    })

    setShowAddedToast(true)
    setTimeout(() => setShowAddedToast(false), 3000)
    setTimeout(() => router.push('/carrito'), 1000)
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

  const faqs = generateFaqs(product)
  
  return (
    <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden scroll-smooth antialiased">
      {/* Toast de confirmación */}
      <AnimatePresence>
        {showAddedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-6 h-6" />
            <div>
              <p className="font-bold">¡Añadido al carrito!</p>
              <p className="text-sm opacity-90">Redirigiendo...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumbs */}
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      {/* Sticky Bar */}
      <StickyBar 
        show={showStickyBar}
        product={product}
        currentPrice={currentPrice}
        originalPrice={originalPrice}
        quantity={quantity}
        setQuantity={setQuantity}
        isOutOfStock={isOutOfStock}
        handleAddToCart={handleAddToCart}
        currentImage={currentImage}
      />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" ref={productRef}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 md:mb-24">
          {/* Image Gallery */}
          <ImageGallery
            images={images}
            currentImage={currentImage}
            imageIndex={imageIndex}
            setImageIndex={setImageIndex}
            setShowImageModal={setShowImageModal}
            product={product}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            discountPercent={discountPercent}
          />

          {/* Product Info */}
          <ProductInfo
            product={product}
            averageRatings={averageRatings}
            currentPrice={currentPrice}
            originalPrice={originalPrice}
            savings={savings}
            stockInfo={stockInfo}
            variants={variants}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            quantity={quantity}
            setQuantity={setQuantity}
            isOutOfStock={isOutOfStock}
            handleAddToCart={handleAddToCart}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            handleShare={handleShare}
            showShareMenu={showShareMenu}
            features={features}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Tabs Section */}
        <section className="border-t border-white/10 py-16 md:py-24">
          <TabsSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            product={product}
            reviews={reviews}
            averageRatings={averageRatings}
            faqs={faqs}
            expandedFaq={expandedFaq}
            setExpandedFaq={setExpandedFaq}
          />
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-white/10 py-16 md:py-24">
            <RelatedProducts 
              products={relatedProducts}
              title="También te puede interesar"
            />
          </section>
        )}

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="border-t border-white/10 py-16 md:py-24">
            <RelatedProducts 
              products={similarProducts}
              title="Colchones con firmeza similar"
            />
          </section>
        )}
      </div>

      {/* Modals */}
      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        images={images}
        currentIndex={imageIndex}
        productName={product.name}
      />
    </div>
  )
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function calculateRatings(reviews: any[], productRating?: number) {
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : productRating || 4.8

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) {
      distribution[r.rating as keyof typeof distribution]++
    }
  })

  return {
    average: averageRating,
    count: reviews.length,
    comfort: reviews.length > 0 
      ? reviews.reduce((acc, r) => acc + (r.comfortRating || 0), 0) / reviews.length 
      : 4.5,
    quality: reviews.length > 0 
      ? reviews.reduce((acc, r) => acc + (r.qualityRating || 0), 0) / reviews.length 
      : 4.7,
    value: reviews.length > 0 
      ? reviews.reduce((acc, r) => acc + (r.valueRating || 0), 0) / reviews.length 
      : 4.6,
    delivery: reviews.length > 0 
      ? reviews.reduce((acc, r) => acc + (r.deliveryRating || 0), 0) / reviews.length 
      : 4.8,
    distribution
  }
}

function generateFaqs(product: any) {
  return [
    {
      q: '¿Cuánto tarda en llegar el colchón?',
      a: `El colchón se entrega en ${product.deliveryDays} días laborables. El envío es ${product.freeShipping ? 'gratuito' : `${product.shippingCost}€`} y con seguimiento.`
    },
    {
      q: `¿Qué incluye la garantía de ${product.warranty} años?`,
      a: `La garantía cubre defectos de fabricación y hundimiento superior a 2,5cm. Tienes ${product.trialNights} noches de prueba para asegurarte de que es el colchón perfecto para ti.`
    },
    {
      q: '¿Necesito una base especial?',
      a: 'Funciona con cualquier base firme: somier de láminas, base tapizada o canapé. No recomendado para bases blandas.'
    },
    {
      q: '¿El colchón viene comprimido?',
      a: 'Sí, viene enrollado en caja para facilitar el transporte. Se expande en 24-48h tras desembalarlo.'
    }
  ]
}

// ============================================================================
// COMPONENTS
// ============================================================================

function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  return (
    <div className="border-b border-white/10 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-400 overflow-x-auto">
          {breadcrumbs.map((crumb: Breadcrumb, index: number) => (
            <div key={crumb.href} className="flex items-center gap-2 flex-shrink-0">
              {index > 0 && <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />}
              {crumb.current ? (
                <span className="text-white font-semibold">{crumb.name}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StickyBar({ 
  show, 
  product, 
  currentPrice, 
  originalPrice, 
  quantity, 
  setQuantity, 
  isOutOfStock, 
  handleAddToCart,
  currentImage 
}: any) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-zinc-900 to-zinc-950 border-b border-white/10 backdrop-blur-xl shadow-2xl"
        >
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-3">
              {/* Producto info */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-zinc-800 overflow-hidden flex-shrink-0 relative">
                  {currentImage ? (
                    <Image
                      src={currentImage}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl md:text-3xl">🛏️</div>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-white line-clamp-1 text-sm md:text-base">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl font-black text-white">{currentPrice}€</span>
                    {originalPrice && (
                      <span className="text-xs md:text-sm text-zinc-400 line-through">{originalPrice}€</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Controles */}
              <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
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
                  disabled={isOutOfStock}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-4 md:px-8 py-3 md:py-4 rounded-xl font-bold transition-all shadow-lg shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">{isOutOfStock ? 'Agotado' : 'Añadir'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ImageGallery({ 
  images, 
  currentImage, 
  imageIndex, 
  setImageIndex, 
  setShowImageModal, 
  product, 
  isFavorite, 
  setIsFavorite,
  discountPercent 
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:sticky lg:top-32 lg:self-start"
    >
      <div className="relative">
        {/* Badges y favorito */}
        <div className="absolute top-3 md:top-4 left-3 md:left-4 right-3 md:right-4 z-10 flex items-start justify-between">
          <div className="flex flex-col gap-2">
            {product.badge && (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-orange-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-black shadow-xl">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                {product.badge}
              </span>
            )}
            {product.isBestSeller && (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-black shadow-xl">
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                BEST SELLER
              </span>
            )}
            {discountPercent > 0 && (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-black shadow-xl">
                -{discountPercent}% OFF
              </span>
            )}
          </div>
          
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 md:p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-lg md:rounded-xl transition-all border border-white/10"
          >
            <Heart 
              className={`w-5 h-5 md:w-6 md:h-6 transition-all ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
              }`} 
            />
          </button>
        </div>

        {/* Imagen principal */}
        <div className="relative aspect-square bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer mb-3 md:mb-4 border border-white/10">
          <motion.div 
            key={imageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
            onClick={() => setShowImageModal(true)}
          >
            {currentImage ? (
              <Image
                src={currentImage}
                alt={`${product.name} - Imagen ${imageIndex + 1}`}
                fill
                className="object-cover"
                priority={imageIndex === 0}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl md:text-[15rem]">
                🛏️
              </div>
            )}
          </motion.div>
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <ZoomIn className="w-12 h-12 md:w-16 md:h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Controles de navegación */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setImageIndex((imageIndex - 1 + images.length) % images.length)
                }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setImageIndex((imageIndex + 1) % images.length)
                }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
            </>
          )}
        </div>

        {/* Miniaturas */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6">
            {images.slice(0, 4).map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setImageIndex(index)}
                className={`aspect-square bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-lg md:rounded-xl overflow-hidden transition-all border-2 relative ${
                  imageIndex === index
                    ? 'border-violet-500 ring-2 ring-violet-500/30'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Info rápida */}
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <div className="text-center p-3 md:p-4 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl">
            <Truck className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-white">Envío {product.deliveryDays}h</p>
            <p className="text-[10px] text-zinc-400">Gratis</p>
          </div>

          <div className="text-center p-3 md:p-4 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20 rounded-xl">
            <Award className="w-5 h-5 md:w-6 md:h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-white">{product.warranty} años</p>
            <p className="text-[10px] text-zinc-400">Garantía</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProductInfo({ 
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
  features,
  setActiveTab
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {/* Título y rating */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-4 leading-tight">
          {product.name}
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 mb-4 md:mb-6">{product.subtitle}</p>

        <div className="flex flex-wrap items-center gap-4 md:gap-6 pb-4 md:pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 md:w-5 md:h-5 ${
                    i < Math.floor(averageRatings.average)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-zinc-700'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-white text-sm md:text-base">{averageRatings.average.toFixed(1)}</span>
            <span className="text-zinc-500 text-sm md:text-base">({averageRatings.count})</span>
          </div>

          <button 
            onClick={() => setActiveTab('reviews')}
            className="text-violet-400 hover:text-violet-300 font-semibold text-sm flex items-center gap-1 transition-colors"
          >
            Leer opiniones
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Precio - SIN financiación */}
      <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl md:rounded-3xl border border-white/10">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-baseline gap-3 md:gap-4 mb-2">
              <span className="text-4xl md:text-6xl font-black text-white">{currentPrice}€</span>
              {originalPrice && originalPrice > currentPrice && (
                <span className="text-2xl md:text-3xl text-zinc-500 line-through">{originalPrice}€</span>
              )}
            </div>
            {savings > 0 && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400 px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-sm md:text-base">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-bold">Ahorras {savings}€</span>
              </div>
            )}
          </div>

          {stockInfo.lowStock && (
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 px-3 md:px-4 py-2 rounded-xl animate-pulse">
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
              <div className="text-right">
                <p className="font-black text-xs md:text-sm">¡Stock limitado!</p>
                <p className="text-[10px] md:text-xs">Solo {stockInfo.quantity}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Specs */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 p-4 md:p-6 bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 rounded-xl md:rounded-2xl border border-white/10">
        <div className="text-center">
          <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-violet-400 mx-auto mb-2" />
          <p className="text-[10px] md:text-xs text-zinc-500 mb-1">Firmeza</p>
          <p className="font-black text-white text-lg md:text-xl">{product.firmnessValue}%</p>
          <p className="text-[9px] md:text-[10px] text-zinc-600">{product.firmness}</p>
        </div>
        <div className="text-center">
          <Layers className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 mx-auto mb-2" />
          <p className="text-[10px] md:text-xs text-zinc-500 mb-1">Altura</p>
          <p className="font-black text-white text-lg md:text-xl">{product.height}cm</p>
          <p className="text-[9px] md:text-[10px] text-zinc-600">Grosor total</p>
        </div>
        <div className="text-center">
          <Wind className="w-5 h-5 md:w-6 md:h-6 text-fuchsia-400 mx-auto mb-2" />
          <p className="text-[10px] md:text-xs text-zinc-500 mb-1">Transpirabilidad</p>
          <p className="font-black text-white text-lg md:text-xl">{product.transpirability}%</p>
          <p className="text-[9px] md:text-[10px] text-zinc-600">Ventilación</p>
        </div>
      </div>

      {/* Variant Selector */}
      {variants.length > 0 && (
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <label className="block font-bold text-white flex items-center gap-2 text-sm md:text-base">
              <Bed className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
              Selecciona tu medida
            </label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
            {variants.map((variant: any) => (
              <motion.button
                key={variant.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedVariant(variant)}
                disabled={variant.stock === 0}
                className={`relative p-3 md:p-4 rounded-xl border-2 transition-all ${
                  selectedVariant?.id === variant.id
                    ? 'border-violet-500 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10'
                    : 'border-white/10 hover:border-white/20 bg-zinc-900/50'
                } ${variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <p className="font-bold text-white text-sm md:text-base">{variant.size}</p>
                <p className="text-xs md:text-sm text-zinc-400">{variant.price}€</p>
                {variant.stock < 5 && variant.stock > 0 && (
                  <span className="absolute top-2 right-2 flex items-center gap-1 bg-amber-500/20 text-amber-400 px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg text-[9px] md:text-[10px] font-bold">
                    <AlertCircle className="w-2.5 h-2.5 md:w-3 md:h-3" />
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
      <div className="mb-6 md:mb-8">
        <label className="block font-bold text-white mb-3 md:mb-4 text-sm md:text-base">Cantidad</label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
          <div className="flex items-center border-2 border-white/10 rounded-xl overflow-hidden bg-zinc-900">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 md:w-14 md:h-14 hover:bg-white/5 transition-colors flex items-center justify-center"
            >
              <Minus className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </button>
            <span className="text-xl md:text-2xl font-black w-16 md:w-20 text-center text-white">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="w-12 h-12 md:w-14 md:h-14 hover:bg-white/5 transition-colors flex items-center justify-center"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </button>
          </div>
          <p className="text-xs md:text-sm text-zinc-400">
            Máximo 10 unidades · Total: <span className="font-bold text-white">{(currentPrice * quantity).toFixed(0)}€</span>
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
        <motion.button
          whileTap={{ scale: 0.99 }}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="relative w-full group overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] animate-gradient" />
          <div className="relative py-4 md:py-5 px-6 md:px-8 flex items-center justify-center gap-2 md:gap-3 text-white font-black text-base md:text-lg">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            {isOutOfStock ? 'Agotado' : 'Añadir al carrito'}
          </div>
        </motion.button>

        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className="py-3 md:py-4 border-2 border-white/10 hover:border-red-500/50 bg-zinc-900 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-white text-sm md:text-base"
          >
            <Heart 
              className={`w-4 h-4 md:w-5 md:h-5 transition-all ${
                isFavorite ? 'fill-red-500 text-red-500' : ''
              }`} 
            />
            <span>Guardar</span>
          </motion.button>

          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.99 }}
              onClick={() => handleShare()}
              className="w-full py-3 md:py-4 border-2 border-white/10 hover:border-white/20 bg-zinc-900 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-white text-sm md:text-base"
            >
              <Share2 className="w-4 h-4 md:w-5 md:h-5" />
              <span>Compartir</span>
            </motion.button>

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
                  ].map((item: any) => (
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

      {/* Key Features */}
      <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 rounded-xl md:rounded-2xl border border-white/10">
        <h3 className="font-black text-white mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
          Características principales
        </h3>
        <div className="grid gap-2 md:gap-3">
          {features.slice(0, 6).map((feature: string, i: number) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs md:text-sm text-zinc-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-zinc-900 rounded-xl border border-white/10">
          <Lock className="w-4 h-4 md:w-5 md:h-5 text-violet-400 flex-shrink-0" />
          <div>
            <p className="text-white font-bold text-xs md:text-sm">Pago seguro</p>
            <p className="text-zinc-500 text-[10px] md:text-xs">SSL encriptado</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-zinc-900 rounded-xl border border-white/10">
          <Users className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 flex-shrink-0" />
          <div>
            <p className="text-white font-bold text-xs md:text-sm">+12.000 clientes</p>
            <p className="text-zinc-500 text-[10px] md:text-xs">Satisfechos</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TabsSection({ activeTab, setActiveTab, product, reviews, averageRatings, faqs, expandedFaq, setExpandedFaq }: any) {
  const features = Array.isArray(product.features) ? product.features : []
  const techFeatures = Array.isArray(product.techFeatures) ? product.techFeatures : []
  const materials = Array.isArray(product.materials) ? product.materials : []
  const layers = Array.isArray(product.layers) ? product.layers : []
  const highlights = Array.isArray(product.highlights) ? product.highlights : []

  return (
    <div>
      {/* Tabs - Scrollable en móvil */}
      <div className="border-b border-white/10 mb-8 md:mb-12 overflow-x-auto">
        <div className="flex gap-4 md:gap-8 min-w-max">
          {[
            { id: 'description', label: 'Descripción', icon: Info },
            { id: 'specs', label: 'Especificaciones', icon: Package },
            { id: 'reviews', label: `Opiniones (${reviews.length})`, icon: Star },
            { id: 'faq', label: 'Preguntas', icon: MessageCircle }
          ].map((tab: any) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 md:pb-4 border-b-2 font-bold whitespace-nowrap transition-all flex items-center gap-2 text-sm md:text-base ${
                activeTab === tab.id
                  ? 'border-violet-500 text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <tab.icon className="w-4 h-4 md:w-5 md:h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'description' && (
          <DescriptionTab key="description" product={{ ...product, features, highlights }} />
        )}
        {activeTab === 'specs' && (
          <SpecificationsTab key="specs" product={{ ...product, techFeatures, materials, layers }} />
        )}
        {activeTab === 'reviews' && (
          <ReviewsTab
            key="reviews"
            reviews={reviews}
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
  )
}

// ============================================================================
// TAB COMPONENTS
// ============================================================================

function DescriptionTab({ product }: { product: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl md:rounded-3xl border border-white/10 p-6 md:p-8"
    >
      <h3 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6">Sobre este producto</h3>
      
      <div className="prose prose-invert max-w-none mb-6 md:mb-8">
        <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
          {product.description}
        </p>
      </div>

      <h4 className="text-lg md:text-xl font-black text-white mb-3 md:mb-4">Beneficios principales</h4>
      <div className="grid md:grid-cols-2 gap-3 md:gap-4">
        {product.features.map((feature: string, i: number) => (
          <div key={i} className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-white/5 rounded-xl">
            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-violet-400 flex-shrink-0 mt-1" />
            <span className="text-zinc-300 text-sm md:text-base">{feature}</span>
          </div>
        ))}
      </div>

      {product.highlights?.length > 0 && (
        <div className="mt-6 md:mt-8">
          <h4 className="text-lg md:text-xl font-black text-white mb-3 md:mb-4">Destacados</h4>
          <div className="grid md:grid-cols-2 gap-2 md:gap-3">
            {product.highlights.map((highlight: string, i: number) => (
              <div key={i} className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-xl">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
                <span className="text-white font-semibold text-sm md:text-base">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

function SpecificationsTab({ product }: { product: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl md:rounded-3xl border border-white/10 p-6 md:p-8"
    >
      <h3 className="text-2xl md:text-3xl font-black text-white mb-6 md:mb-8">Especificaciones técnicas</h3>
      
      <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
        {[
          { label: 'Firmeza', value: `${product.firmnessValue}% - ${product.firmness}`, icon: TrendingUp },
          { label: 'Adaptabilidad', value: `${product.adaptability}%`, icon: Sparkles },
          { label: 'Transpirabilidad', value: `${product.transpirability}%`, icon: Wind },
          { label: 'Altura total', value: `${product.height}cm`, icon: Layers },
          { label: 'Garantía', value: `${product.warranty} años`, icon: Shield },
          { label: 'Noches de prueba', value: `${product.trialNights} noches`, icon: Moon }
        ].map((spec: any, index: number) => (
          <div key={index} className="flex items-center justify-between py-3 md:py-4 border-b border-white/10">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <spec.icon className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
              </div>
              <span className="text-zinc-400 font-semibold text-sm md:text-base">{spec.label}</span>
            </div>
            <span className="font-black text-white text-sm md:text-base">{spec.value}</span>
          </div>
        ))}
      </div>

      {product.techFeatures?.length > 0 && (
        <>
          <h4 className="text-xl md:text-2xl font-black text-white mb-4 md:mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-violet-400" />
            Características técnicas
          </h4>
          <div className="grid gap-3 md:gap-4">
            {product.techFeatures.map((feature: string, i: number) => (
              <div key={i} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/5 rounded-xl">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <span className="text-zinc-300 leading-relaxed text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}

function ReviewsTab({ reviews, averageRatings, productId }: {
  reviews: any[]
  averageRatings: any
  productId: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {reviews.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Rating Summary */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl md:rounded-3xl border border-white/10 p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-black text-white mb-4 md:mb-6">Valoración general</h3>
            
            <div className="text-center mb-6 md:mb-8">
              <div className="text-5xl md:text-7xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">
                {averageRatings.average.toFixed(1)}
              </div>
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      i < Math.floor(averageRatings.average)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs md:text-sm text-zinc-400">
                Basado en <span className="font-bold text-white">{averageRatings.count}</span> opiniones
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              {[
                { label: 'Confort', value: averageRatings.comfort, color: 'from-violet-500 to-fuchsia-500' },
                { label: 'Calidad', value: averageRatings.quality, color: 'from-cyan-500 to-blue-500' },
                { label: 'Relación calidad-precio', value: averageRatings.value, color: 'from-emerald-500 to-green-500' },
                { label: 'Entrega', value: averageRatings.delivery, color: 'from-amber-500 to-orange-500' }
              ].map((rating: any) => (
                <div key={rating.label}>
                  <div className="flex justify-between text-xs md:text-sm mb-2">
                    <span className="text-zinc-400 font-semibold">{rating.label}</span>
                    <span className="font-black text-white">{rating.value.toFixed(1)}/5</span>
                  </div>
                  <div className="h-2 md:h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${rating.color}`}
                      style={{ width: `${(rating.value / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {reviews.map((review: any) => (
              <div 
                key={review.id}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl md:rounded-2xl border border-white/10 p-4 md:p-6"
              >
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 md:w-5 md:h-5 ${
                              i < review.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-zinc-700'
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg">
                          <BadgeCheck className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="text-[10px] md:text-xs font-bold">Verificado</span>
                        </div>
                      )}
                    </div>
                    <h4 className="font-black text-white text-base md:text-lg">{review.title}</h4>
                  </div>
                </div>

                <p className="text-zinc-300 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">{review.comment}</p>

                <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-black text-sm md:text-base">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-bold text-white">{review.userName}</p>
                      {review.userLocation && (
                        <p className="text-[10px] md:text-xs text-zinc-500">{review.userLocation}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl md:rounded-3xl border border-white/10 p-12 md:p-16 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Star className="w-8 h-8 md:w-10 md:h-10 text-zinc-600" />
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white mb-3">
            Aún no hay opiniones
          </h3>
          <p className="text-zinc-400 mb-4 md:mb-6 text-sm md:text-base">
            Sé el primero en valorar este producto
          </p>
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
      className="space-y-3 md:space-y-4"
    >
      {faqs.map((faq: { q: string; a: string }, index: number) => (
        <div key={index} className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl md:rounded-2xl border border-white/10 overflow-hidden">
          <button
            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
            className="w-full px-4 md:px-6 py-4 md:py-5 flex items-center justify-between text-left hover:bg-white/5 transition-all"
          >
            <span className="font-bold text-white pr-4 text-sm md:text-base">{faq.q}</span>
            <div className="flex-shrink-0">
              {expandedFaq === index ? (
                <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-violet-400" />
              ) : (
                <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-zinc-500" />
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
                <div className="px-4 md:px-6 pb-4 md:pb-5 text-zinc-300 leading-relaxed text-sm md:text-base">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-xl md:rounded-2xl p-6 text-center">
        <MessageCircle className="w-10 h-10 md:w-12 md:h-12 text-violet-400 mx-auto mb-4" />
        <h4 className="text-lg md:text-xl font-black text-white mb-2">
          ¿Tienes más preguntas?
        </h4>
        <p className="text-zinc-400 mb-4 text-sm md:text-base">
          Nuestro equipo está disponible para ayudarte
        </p>
      </div>
    </motion.div>
  )
}

function RelatedProducts({ products, title }: { products: any[]; title: string }) {
  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-black text-white mb-6 md:mb-8 flex items-center gap-2 md:gap-3">
        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-violet-400" />
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product: any) => {
          const productImages = Array.isArray(product.images) ? product.images : []
          const productImage = productImages.length > 0 ? productImages[0] : product.image
          
          return (
            <Link href={`/producto/${product.slug}`} key={product.id}>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl md:rounded-2xl border border-white/10 overflow-hidden hover:border-violet-500/30 transition-all group"
              >
                <div className="aspect-square bg-zinc-800 relative overflow-hidden">
                  {productImage ? (
                    <Image
                      src={productImage}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl md:text-7xl">🛏️</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-3 md:p-5">
                  <h3 className="font-bold text-white mb-2 line-clamp-1 group-hover:text-violet-400 transition-colors text-sm md:text-base">
                    {product.name}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-400 mb-3 md:mb-4 line-clamp-2">{product.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg md:text-2xl font-black text-white">{product.price}€</span>
                      {product.originalPrice && (
                        <span className="text-xs md:text-sm text-zinc-500 line-through ml-2">{product.originalPrice}€</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 md:w-4 md:h-4 fill-amber-400 text-amber-400" />
                      <span className="text-xs md:text-sm font-bold text-white">{product.rating?.toFixed(1) || '4.8'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================================
// MODAL COMPONENTS
// ============================================================================

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

  const currentImage = images.length > 0 ? images[index] : null

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
          className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm z-10"
        >
          <X className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
          <div className="aspect-square bg-zinc-900 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6 overflow-hidden relative">
            {currentImage ? (
              <Image
                src={currentImage}
                alt={`${productName} - Imagen ${index + 1}`}
                fill
                className="object-contain"
              />
            ) : (
              <span className="text-[15rem] md:text-[25rem]">🛏️</span>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="flex justify-center gap-3 md:gap-4">
              {images.map((_: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 md:h-2 rounded-full transition-all ${
                    i === index ? 'bg-white w-8 md:w-12' : 'bg-white/30 w-1.5 md:w-2 hover:bg-white/50'
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

// Estilos para animación de gradiente
const styles = `
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .animate-gradient {
    animation: gradient 3s ease infinite;
  }
`

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}