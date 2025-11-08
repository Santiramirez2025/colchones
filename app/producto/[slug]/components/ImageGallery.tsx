// app/producto/[slug]/components/ImageGallery.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useCallback, useEffect, memo } from 'react'
import {
  Heart, ChevronRight, ChevronLeft, Sparkles, TrendingUp, ZoomIn, 
  Truck, Award, Maximize2, X, ChevronUp, ChevronDown
} from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  currentImage: string
  imageIndex: number
  setImageIndex: (index: number) => void
  setShowImageModal: (show: boolean) => void
  product: any
  isFavorite: boolean
  setIsFavorite: (fav: boolean) => void
  discountPercent: number
}

// Badge Component optimizado
const Badge = memo(({ icon: Icon, children, gradient }: any) => (
  <motion.span
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className={`inline-flex items-center gap-1.5 ${gradient} text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-black shadow-2xl backdrop-blur-sm`}
  >
    <Icon className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
    {children}
  </motion.span>
))
Badge.displayName = 'Badge'

// Thumbnail Component con lazy loading
const Thumbnail = memo(({ 
  src, 
  index, 
  isActive, 
  onClick, 
  alt 
}: { 
  src: string
  index: number
  isActive: boolean
  onClick: () => void
  alt: string
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    aria-label={`Ver imagen ${index + 1}`}
    aria-pressed={isActive}
    className={`aspect-square bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-lg md:rounded-xl overflow-hidden transition-all border-2 relative focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-950 ${
      isActive
        ? 'border-violet-500 ring-2 ring-violet-500/50 shadow-lg shadow-violet-500/30'
        : 'border-white/10 hover:border-white/30'
    }`}
  >
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 20vw, 10vw"
      className="object-cover"
      loading="lazy"
    />
    {isActive && (
      <motion.div
        layoutId="active-thumbnail"
        className="absolute inset-0 border-2 border-violet-500 rounded-lg pointer-events-none"
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    )}
  </motion.button>
))
Thumbnail.displayName = 'Thumbnail'

// ✅ FIXED: Modal de zoom fullscreen con hooks en orden correcto
const ImageModal = memo(({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  onNavigate,
  productName 
}: any) => {
  // ✅ ALL HOOKS MUST BE AT THE TOP
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate(-1)
      if (e.key === 'ArrowRight') onNavigate(1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNavigate])

  // ✅ EARLY RETURN AFTER ALL HOOKS
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada de la imagen del producto"
    >
      {/* Header con contador */}
      <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex items-center justify-between z-10">
        <div className="text-white font-semibold text-sm md:text-base">
          Imagen {currentIndex + 1} de {images.length}
        </div>
        <button
          onClick={onClose}
          className="p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Cerrar vista ampliada"
        >
          <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      </div>

      {/* Imagen principal */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative w-full h-full max-w-6xl max-h-[90vh] p-4 md:p-16"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`${productName} - Vista ampliada ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Controles de navegación */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNavigate(-1)
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNavigate(1)
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </button>
        </>
      )}

      {/* Miniaturas en la parte inferior */}
      {images.length > 1 && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-md p-2 rounded-xl">
          {images.map((img: string, idx: number) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation()
                onNavigate(idx - currentIndex)
              }}
              className={`w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex 
                  ? 'border-violet-500 ring-2 ring-violet-500/50' 
                  : 'border-white/20 hover:border-white/50'
              }`}
              aria-label={`Ver imagen ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`Miniatura ${idx + 1}`}
                width={64}
                height={64}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
})
ImageModal.displayName = 'ImageModal'

// Componente principal
export default function ImageGallery({ 
  images, 
  currentImage, 
  imageIndex, 
  setImageIndex, 
  setShowImageModal, 
  product, 
  isFavorite, 
  setIsFavorite,
  discountPercent 
}: ImageGalleryProps) {
  const [showModal, setShowModal] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && images.length > 1) {
        setImageIndex((imageIndex - 1 + images.length) % images.length)
      }
      if (e.key === 'ArrowRight' && images.length > 1) {
        setImageIndex((imageIndex + 1) % images.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [imageIndex, images.length, setImageIndex])

  // Swipe gestures en móvil
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && images.length > 1) {
      setImageIndex((imageIndex + 1) % images.length)
    }
    if (isRightSwipe && images.length > 1) {
      setImageIndex((imageIndex - 1 + images.length) % images.length)
    }

    setTouchStart(0)
    setTouchEnd(0)
  }, [touchStart, touchEnd, images.length, imageIndex, setImageIndex])

  const handlePrevImage = useCallback(() => {
    setImageIndex((imageIndex - 1 + images.length) % images.length)
  }, [imageIndex, images.length, setImageIndex])

  const handleNextImage = useCallback(() => {
    setImageIndex((imageIndex + 1) % images.length)
  }, [imageIndex, images.length, setImageIndex])

  const handleModalNavigate = useCallback((direction: number) => {
    const newIndex = (imageIndex + direction + images.length) % images.length
    setImageIndex(newIndex)
  }, [imageIndex, images.length, setImageIndex])

  const openModal = useCallback(() => {
    setShowModal(true)
    setShowImageModal(true)
  }, [setShowImageModal])

  const closeModal = useCallback(() => {
    setShowModal(false)
    setShowImageModal(false)
  }, [setShowImageModal])

  return (
    <>
      <motion.article
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="lg:sticky lg:top-32 lg:self-start"
        aria-label="Galería de imágenes del producto"
      >
        <div className="relative">
          {/* Badges flotantes y botón de favorito */}
          <div className="absolute top-3 md:top-4 left-3 md:left-4 right-3 md:right-4 z-20 flex items-start justify-between pointer-events-none">
            <div className="flex flex-col gap-2 pointer-events-auto">
              <AnimatePresence>
                {product.badge && (
                  <Badge 
                    icon={Sparkles} 
                    gradient="bg-gradient-to-r from-red-500 to-orange-600"
                  >
                    {product.badge}
                  </Badge>
                )}
                
                {product.isBestSeller && (
                  <Badge 
                    icon={TrendingUp} 
                    gradient="bg-gradient-to-r from-amber-500 to-orange-600"
                  >
                    BEST SELLER
                  </Badge>
                )}
                
                {discountPercent > 0 && (
                  <Badge 
                    icon={Sparkles} 
                    gradient="bg-gradient-to-r from-violet-500 to-fuchsia-600"
                  >
                    -{discountPercent}% OFF
                  </Badge>
                )}
              </AnimatePresence>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 md:p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-xl transition-all border border-white/20 shadow-lg pointer-events-auto focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              aria-pressed={isFavorite}
            >
              <Heart 
                className={`w-5 h-5 md:w-6 md:h-6 transition-all ${
                  isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-white'
                }`}
                aria-hidden="true"
              />
            </motion.button>
          </div>

          {/* Imagen principal con gestos táctiles */}
          <div 
            className="relative aspect-square bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl md:rounded-3xl overflow-hidden group cursor-zoom-in mb-3 md:mb-4 border border-white/10 shadow-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div 
              key={imageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
              onClick={openModal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openModal()
                }
              }}
              aria-label={`Ver imagen en tamaño completo. Imagen ${imageIndex + 1} de ${images.length}`}
            >
              {currentImage ? (
                <>
                  <Image
                    src={currentImage}
                    alt={`${product.name} - Imagen ${imageIndex + 1} de ${images.length}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={imageIndex === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onLoad={() => setIsImageLoaded(true)}
                  />
                  {!isImageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                      <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl md:text-[15rem]" role="img" aria-label="Imagen placeholder">
                  🛏️
                </div>
              )}
            </motion.div>
            
            {/* Overlay con icono de zoom */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 flex items-center justify-center pointer-events-none"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-full">
                  <Maximize2 className="w-8 h-8 md:w-12 md:h-12 text-white" aria-hidden="true" />
                </div>
                <span className="text-white font-semibold text-sm md:text-base bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                  Click para ampliar
                </span>
              </motion.div>
            </motion.div>

            {/* Controles de navegación con mejor accesibilidad */}
            {images.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  whileHover={{ opacity: 1, x: 0, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevImage()
                  }}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  whileHover={{ opacity: 1, x: 0, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNextImage()
                  }}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                </motion.button>

                {/* Indicador de posición */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-md px-3 py-2 rounded-full">
                  {images.slice(0, 5).map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation()
                        setImageIndex(idx)
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === imageIndex 
                          ? 'bg-white w-6' 
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Ir a imagen ${idx + 1}`}
                      aria-current={idx === imageIndex}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Miniaturas mejoradas */}
          {images.length > 1 && (
            <nav 
              className="grid grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6"
              aria-label="Miniaturas de imágenes del producto"
            >
              {images.slice(0, 4).map((img: string, index: number) => (
                <Thumbnail
                  key={index}
                  src={img}
                  index={index}
                  isActive={imageIndex === index}
                  onClick={() => setImageIndex(index)}
                  alt={`${product.name} - Miniatura ${index + 1}`}
                />
              ))}
            </nav>
          )}

          {/* Trust badges con animación */}
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <motion.div 
              whileHover={{ scale: 1.03, y: -2 }}
              className="text-center p-3 md:p-4 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition-all cursor-default"
            >
              <Truck className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mx-auto mb-2" aria-hidden="true" />
              <p className="text-xs md:text-sm font-bold text-white">Envío en {product.deliveryDays}h</p>
              <p className="text-[10px] md:text-xs text-zinc-400">Totalmente gratis</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.03, y: -2 }}
              className="text-center p-3 md:p-4 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-all cursor-default"
            >
              <Award className="w-5 h-5 md:w-6 md:h-6 text-purple-400 mx-auto mb-2" aria-hidden="true" />
              <p className="text-xs md:text-sm font-bold text-white">{product.warranty} años garantía</p>
              <p className="text-[10px] md:text-xs text-zinc-400">Sin complicaciones</p>
            </motion.div>
          </div>
        </div>
      </motion.article>

      {/* Modal fullscreen */}
      <AnimatePresence>
        {showModal && (
          <ImageModal
            isOpen={showModal}
            onClose={closeModal}
            images={images}
            currentIndex={imageIndex}
            onNavigate={handleModalNavigate}
            productName={product.name}
          />
        )}
      </AnimatePresence>
    </>
  )
}