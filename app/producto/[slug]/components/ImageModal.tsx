// app/producto/[slug]/components/ImageModal.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, Maximize2, Grid3x3 } from 'lucide-react'
import ImageZoomer from './ImageZoomer'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  currentIndex: number
  productName: string
}

export default function ImageModal({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  productName 
}: ImageModalProps) {
  const [currentSlide, setCurrentSlide] = useState(currentIndex)
  const [showThumbnails, setShowThumbnails] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  const currentImage = images[currentSlide] || ''
  const totalImages = images.length

  // Callbacks de navegación
  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalImages)
    setIsZoomed(false)
  }, [totalImages])

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalImages) % totalImages)
    setIsZoomed(false)
  }, [totalImages])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    setShowThumbnails(false)
    setIsZoomed(false)
  }, [])

  // Effect para sincronizar con el index externo
  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(currentIndex)
      setIsZoomed(false)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, currentIndex])

  // Navegación con teclado
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'ArrowLeft') goToPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, goToNext, goToPrev])

  // ✅ FIXED: Move early return AFTER all hooks
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && ( // ✅ Additional safety check
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Galería de imágenes del producto"
        >
          {/* Backdrop con blur */}
          <motion.div 
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(20px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 bg-black/95"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Contenedor principal */}
          <div className="relative w-full h-full max-w-7xl mx-auto p-4 md:p-6 lg:p-10 flex flex-col">
            
            {/* Header con controles */}
            <motion.header 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative z-20 flex items-center justify-between mb-4 md:mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
                  <p className="text-white font-bold text-sm md:text-base">
                    {currentSlide + 1} <span className="text-zinc-400 font-normal">/ {totalImages}</span>
                  </p>
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="hidden md:block px-4 py-2 bg-violet-500/20 backdrop-blur-xl rounded-xl border border-violet-500/30"
                >
                  <p className="text-violet-300 font-semibold text-sm">
                    {productName}
                  </p>
                </motion.div>
              </div>

              <div className="flex items-center gap-2">
                {/* Botón de thumbnails */}
                {totalImages > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowThumbnails(!showThumbnails)}
                    className={`p-3 rounded-xl backdrop-blur-xl border transition-all ${
                      showThumbnails 
                        ? 'bg-violet-500/30 border-violet-500/50' 
                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }`}
                    aria-label={showThumbnails ? 'Ocultar miniaturas' : 'Mostrar miniaturas'}
                  >
                    <Grid3x3 className="w-5 h-5 text-white" />
                  </motion.button>
                )}

                {/* Indicador de zoom */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: isZoomed ? 1 : 0 }}
                  className="hidden md:flex items-center gap-2 px-3 py-2 bg-emerald-500/20 backdrop-blur-xl rounded-xl border border-emerald-500/30"
                >
                  <ZoomIn className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold text-sm">Zoom activo</span>
                </motion.div>

                {/* Botón de cerrar */}
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl backdrop-blur-xl border border-red-500/30 transition-all"
                  aria-label="Cerrar galería"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </motion.button>
              </div>
            </motion.header>

            {/* Área principal de imagen */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="relative flex-1 bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-full h-full"
                >
                  <ImageZoomer 
  src={currentImage} 
  alt={`${productName} - Vista ${currentSlide + 1} de ${totalImages}`}
/>
                </motion.div>
              </AnimatePresence>

              {/* Controles de navegación flotantes */}
              {totalImages > 1 && (
                <>
                  <motion.button
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-xl border border-white/20 transition-all group z-10"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-violet-400 transition-colors" />
                  </motion.button>

                  <motion.button
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-xl border border-white/20 transition-all group z-10"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-violet-400 transition-colors" />
                  </motion.button>
                </>
              )}

              {/* Hint de navegación por teclado */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-xl rounded-full border border-white/10"
              >
                <p className="text-zinc-400 text-xs font-medium">
                  Usa ← → para navegar • ESC para cerrar
                </p>
              </motion.div>
            </motion.div>

            {/* Panel de thumbnails */}
            <AnimatePresence>
              {showThumbnails && totalImages > 1 && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="relative z-20 mt-4 p-4 bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-white/10"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Maximize2 className="w-4 h-4 text-violet-400" />
                    <p className="text-white font-bold text-sm">Todas las imágenes</p>
                  </div>
                  
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3 max-h-32 overflow-y-auto custom-scrollbar">
                    {images.map((img, index) => (
                      <motion.button
                        key={`thumbnail-${index}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => goToSlide(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          currentSlide === index
                            ? 'border-violet-500 ring-2 ring-violet-500/50'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                        aria-label={`Ver imagen ${index + 1}`}
                        aria-current={currentSlide === index ? 'true' : 'false'}
                      >
                        <img
                          src={img}
                          alt={`Miniatura ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {currentSlide === index && (
                          <motion.div
                            layoutId="thumbnail-highlight"
                            className="absolute inset-0 bg-violet-500/20"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Estilos para scrollbar personalizado */}
          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
              height: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.05);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(139, 92, 246, 0.5);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(139, 92, 246, 0.7);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}