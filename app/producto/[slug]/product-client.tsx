// app/producto/[slug]/product-client.tsx
'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, ShoppingCart, AlertCircle, TrendingUp, Clock } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import type { ProductWithRelations, StockInfo, Breadcrumb } from '@/lib/types/product'
import type { ProductVariant, Review } from '@prisma/client'

// Component imports
import Breadcrumbs from './components/Breadcrumbs'
import StickyBar from './components/StickyBar'
import ImageGallery from './components/ImageGallery'
import ProductInfo from './components/ProductInfo'
import TabsSection from './components/TabsSection'
import RelatedProducts from './components/RelatedProducts'
import ImageModal from './components/ImageModal'
import UrgencyTimer from './components/UrgencyTimer'
import SocialProof from './components/SocialProof'

// Helper imports
import { calculateRatings, generateFaqs } from '@/lib/helpers/product-utils'
import { throttle } from '@/lib/utils/performance'

// ============================================================================
// CONSTANTS
// ============================================================================

const TOAST_DURATION = 3000
const MAX_QUANTITY = 10
const PLACEHOLDER_IMAGE = '/images/placeholder.jpg'
const SCROLL_THROTTLE_MS = 100
const LOW_STOCK_THRESHOLD = 5
const RECENT_VIEWS_KEY = 'recent_product_views'

// ============================================================================
// TYPES
// ============================================================================

type TabType = 'description' | 'specs' | 'reviews' | 'faq'

interface ToastState {
  show: boolean
  type: 'success' | 'error' | 'info'
  message: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

interface ProductClientProps {
  product: ProductWithRelations
  relatedProducts: any[]
  similarProducts: any[]
  reviews: Review[]
  stockInfo: StockInfo
  breadcrumbs: Breadcrumb[]
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ProductClient({ 
  product, 
  relatedProducts = [],
  similarProducts = [],
  reviews = [],
  stockInfo,
  breadcrumbs = []
}: ProductClientProps) {
  const router = useRouter()
  const addItem = useCartStore(state => state.addItem)
  
  // Refs
  const productRef = useRef<HTMLDivElement>(null)
  const toastTimeoutRef = useRef<NodeJS.Timeout>()
  const impressionTracked = useRef(false)
  
  // ✅ FIX 1: Envolver en useMemo
  const images = useMemo(() => 
    Array.isArray(product.images) ? product.images : [],
    [product.images]
  )
  
  const features = useMemo(() => 
    Array.isArray(product.features) ? product.features : [],
    [product.features]
  )
  
  const variants = useMemo(() =>
    Array.isArray(product.variants) ? product.variants : [],
    [product.variants]
  )
  
  // ============================================================================
  // STATE
  // ============================================================================
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variants[0] || null
  )
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<TabType>('description')
  const [imageIndex, setImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [recentViewers, setRecentViewers] = useState(0)
  const [showLowStockWarning, setShowLowStockWarning] = useState(false)
  
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: 'success',
    message: '',
  })
  
  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================
  
  const averageRatings = useMemo(
    () => calculateRatings(reviews, product.rating), 
    [reviews, product.rating]
  )
  
  const faqs = useMemo(() => generateFaqs(product), [product])
  
  const currentPrice = selectedVariant?.price || product.price
  const originalPrice = selectedVariant?.originalPrice || product.originalPrice || undefined
  const savings = originalPrice ? originalPrice - currentPrice : 0
  const discountPercent = originalPrice 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0
  
  const currentStock = selectedVariant?.stock ?? stockInfo.quantity ?? 0
  const isOutOfStock = !product.inStock || currentStock === 0
  const isLowStock = currentStock > 0 && currentStock <= LOW_STOCK_THRESHOLD
  
  const currentImage = images.length > 0 
    ? images[imageIndex] 
    : product.image || PLACEHOLDER_IMAGE

  // Trust indicators
  const hasCertifications = product.certifications && product.certifications.length > 0
  const hasWarranty = product.warranty && product.warranty > 0
  const hasFreeShipping = product.freeShipping || currentPrice >= 50
  const hasReviews = reviews.length > 0
  const isHighRated = product.rating >= 4.5

  // Enhanced product data with features
  const enhancedProduct = useMemo(() => ({
    ...product,
    features: features
  }), [product, features])

  // ============================================================================
  // HANDLERS (defined before effects that use them)
  // ============================================================================
  
  const showToast = useCallback((
    type: 'success' | 'error' | 'info', 
    message: string, 
    description?: string,
    action?: { label: string; onClick: () => void }
  ) => {
    // Clear existing timeout
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
    }
    
    setToast({ show: true, type, message, description, action })
    
    toastTimeoutRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }))
    }, TOAST_DURATION)
  }, [])

  const handleViewCart = useCallback(() => {
    router.push('/carrito')
  }, [router])

  // ============================================================================
  // EFFECTS
  // ============================================================================
  
  // Track product view & impression
  useEffect(() => {
    if (!impressionTracked.current) {
      // Track analytics impression
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'view_item', {
          currency: 'EUR',
          value: currentPrice,
          items: [{
            item_id: product.id,
            item_name: product.name,
            item_category: product.category?.name,
            price: currentPrice,
            discount: savings
          }]
        })
      }
      
      // Store recent view
      try {
        const recentViews = JSON.parse(localStorage.getItem(RECENT_VIEWS_KEY) || '[]')
        const updatedViews = [
          { id: product.id, slug: product.slug, timestamp: Date.now() },
          ...recentViews.filter((v: any) => v.id !== product.id)
        ].slice(0, 10)
        localStorage.setItem(RECENT_VIEWS_KEY, JSON.stringify(updatedViews))
      } catch (e) {
        console.error('Error storing recent view:', e)
      }
      
      impressionTracked.current = true
    }
    
    // Simulate recent viewers (would come from real-time API)
    setRecentViewers(Math.floor(Math.random() * 15) + 5)
  }, [product.id, product.slug, product.name, product.category?.name, currentPrice, savings])
  
  // Sticky bar scroll detection (throttled)
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (productRef.current) {
        const rect = productRef.current.getBoundingClientRect()
        setShowStickyBar(rect.bottom < 0)
      }
    }, SCROLL_THROTTLE_MS)
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // ✅ FIX 2: Low stock warning with proper dependencies
  useEffect(() => {
    if (isLowStock && !showLowStockWarning) {
      const timer = setTimeout(() => {
        setShowLowStockWarning(true)
        showToast(
          'info',
          '⚡ Stock limitado',
          `Solo quedan ${currentStock} unidades disponibles`
        )
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isLowStock, showLowStockWarning, currentStock, showToast])
  
  // Cleanup toast timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }
    }
  }, [])

  // ============================================================================
  // MORE HANDLERS
  // ============================================================================
  
  // ✅ FIX 3: handleAddToCart with all dependencies
  const handleAddToCart = useCallback(async () => {
    if (isAddingToCart || isOutOfStock) return
    
    setIsAddingToCart(true)
    
    try {
      addItem({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: currentPrice,
        originalPrice: originalPrice || undefined,
        quantity: quantity,
        image: currentImage,
        images: images.length > 0 ? images : (product.image ? [product.image] : []),
        size: selectedVariant?.size || 'Estándar',
        variant: selectedVariant?.dimensions || undefined,
        sku: selectedVariant?.sku || product.sku || undefined,
        maxQuantity: MAX_QUANTITY,
        inStock: product.inStock,
        category: product.category?.name,
        rating: product.rating,
        isBestSeller: product.isBestSeller
      })
      
      showToast(
        'success',
        '¡Añadido al carrito!',
        `${quantity} ${quantity === 1 ? 'unidad' : 'unidades'} de ${product.name}`,
        {
          label: 'Ver carrito',
          onClick: handleViewCart
        }
      )
      
      // Track analytics (non-blocking)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'add_to_cart', {
          currency: 'EUR',
          value: currentPrice * quantity,
          items: [{
            item_id: product.id,
            item_name: product.name,
            price: currentPrice,
            quantity: quantity
          }]
        })
      }
      
      // Show related products suggestion after 2 seconds
      setTimeout(() => {
        if (relatedProducts.length > 0) {
          const scrollToRelated = () => {
            document.querySelector('[data-related-products]')?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
          showToast(
            'info',
            '💡 Completa tu pedido',
            'Descubre productos complementarios',
            { label: 'Ver más', onClick: scrollToRelated }
          )
        }
      }, 2000)
      
    } catch (error) {
      console.error('[AddToCart] Error:', error)
      showToast(
        'error',
        'Error al añadir al carrito',
        'Por favor, inténtalo de nuevo'
      )
    } finally {
      setIsAddingToCart(false)
    }
  }, [
    isAddingToCart,
    isOutOfStock,
    product,
    currentPrice,
    originalPrice,
    quantity,
    currentImage,
    images,
    selectedVariant,
    addItem,
    showToast,
    relatedProducts.length,
    handleViewCart
  ])

  const handleShare = useCallback(async (platform?: string) => {
    const url = window.location.href
    const text = `${product.name} - ${product.subtitle || ''}`
    
    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(url)
        showToast('success', '¡Link copiado!', 'URL copiada al portapapeles')
        setShowShareMenu(false)
        
        // Track share event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'share', {
            method: 'copy_link',
            content_type: 'product',
            item_id: product.id
          })
        }
      } catch (error) {
        showToast('error', 'Error al copiar', 'No se pudo copiar el enlace')
      }
      return
    }
    
    // Native share API
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({ title: product.name, text, url })
        setShowShareMenu(false)
        
        // Track share
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'share', {
            method: 'native',
            content_type: 'product',
            item_id: product.id
          })
        }
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('[Share] Error:', error)
        }
      }
      return
    }
    
    // Social sharing URLs
    const shareUrls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    }
    
    if (platform && shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer')
      setShowShareMenu(false)
      
      // Track share
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'share', {
          method: platform,
          content_type: 'product',
          item_id: product.id
        })
      }
    } else {
      setShowShareMenu(!showShareMenu)
    }
  }, [product, showToast, showShareMenu])

  const handleVariantChange = useCallback((variant: ProductVariant) => {
    setSelectedVariant(variant)
    
    // Track variant selection
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'select_item', {
        item_list_name: 'Product Variants',
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_variant: variant.size
        }]
      })
    }
  }, [product.id, product.name])
  // Antes del return, después de handleVariantChange (línea ~460)
const handleTabChange = useCallback((tab: string) => {
  setActiveTab(tab as TabType)
}, [])

  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden scroll-smooth antialiased">
      {/* Enhanced Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl border ${
              toast.type === 'success'
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 border-emerald-400/20'
                : toast.type === 'info'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400/20'
                : 'bg-gradient-to-r from-red-600 to-rose-600 border-red-400/20'
            } text-white max-w-md w-[calc(100vw-2rem)] sm:w-full backdrop-blur-sm`}
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
              ) : toast.type === 'info' ? (
                <TrendingUp className="w-6 h-6 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base">{toast.message}</p>
                {toast.description && (
                  <p className="text-sm opacity-90 mt-0.5">{toast.description}</p>
                )}
                {toast.action && (
                  <button
                    onClick={toast.action.onClick}
                    className="mt-2 text-sm font-semibold underline hover:no-underline inline-flex items-center gap-1 transition-transform hover:translate-x-1"
                  >
                    {toast.action.label} →
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessibility: Skip to content */}
      <a 
        href="#product-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        Saltar al contenido principal
      </a>

      {/* ✅ FIX 4: Breadcrumbs with correct prop */}
      <Breadcrumbs productName={product.name} />

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

      <div 
        id="product-content"
        className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" 
        ref={productRef}
      >
        {/* Social Proof Banner */}
        {(recentViewers > 0 || isLowStock) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-wrap gap-3 justify-center"
          >
            {recentViewers > 0 && (
              <div className="bg-blue-600/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>{recentViewers} personas viendo este producto</span>
              </div>
            )}
            {isLowStock && (
              <div className="bg-orange-600/10 border border-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm flex items-center gap-2 animate-pulse">
                <Clock className="w-4 h-4" />
                <span>¡Solo quedan {currentStock} unidades!</span>
              </div>
            )}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 md:mb-24">
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

          <ProductInfo
            product={product}
            averageRatings={averageRatings}
            currentPrice={currentPrice}
            originalPrice={originalPrice}
            savings={savings}
            stockInfo={stockInfo}
            variants={variants}
            selectedVariant={selectedVariant}
            setSelectedVariant={handleVariantChange}
            quantity={quantity}
            setQuantity={setQuantity}
            isOutOfStock={isOutOfStock}
            handleAddToCart={handleAddToCart}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            handleShare={handleShare}
            showShareMenu={showShareMenu}
            features={features}
            setActiveTab={handleTabChange}
          />
        </div>

        {/* Tabs Section */}
        <section className="border-t border-white/10 py-16 md:py-24">
          <TabsSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            product={enhancedProduct}
            reviews={reviews}
            averageRatings={averageRatings}
            faqs={faqs}
            expandedFaq={expandedFaq}
            setExpandedFaq={setExpandedFaq}
          />
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section 
            className="border-t border-white/10 py-16 md:py-24"
            data-related-products
          >
            <RelatedProducts 
              products={relatedProducts}
              title="También te puede interesar"
            />
          </section>
        )}

        {/* Final CTA Section */}
        {!isOutOfStock && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-white/10 py-16 md:py-24"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Listo para mejorar tu descanso?
              </h2>
              <p className="text-zinc-400 text-lg mb-8">
                {hasFreeShipping && "Envío gratis incluido. "}
                {hasWarranty && `${product.warranty} años de garantía. `}
                Compra segura y protegida.
              </p>
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-blue-500/25"
              >
                <ShoppingCart className="w-5 h-5 inline-block mr-2" />
                Añadir al carrito
              </button>
            </div>
          </motion.section>
        )}
      </div>

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