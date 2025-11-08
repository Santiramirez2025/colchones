// app/producto/[slug]/components/TabsSection.tsx
'use client'

import { memo, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MessageCircle, Info, Layers, Check, ChevronDown, 
    Star, Award, BadgeCheck, TrendingUp, Calendar, User, Sparkles, AlertCircle
  } from 'lucide-react'
  

// ============================================================================
// TYPES
// ============================================================================

interface Feature {
  name: string
  value: string
  icon?: string
}

interface TabsSectionProps {
  activeTab: 'description' | 'specs' | 'reviews' | 'faq'
  setActiveTab: (tab: 'description' | 'specs' | 'reviews' | 'faq') => void
  product: any
  reviews: any[]
  averageRatings: { average: number; count: number; distribution: Record<number, number> }
  faqs: Array<{ q: string; a: string }>
  expandedFaq: number | null
  setExpandedFaq: (index: number | null) => void
}

// ============================================================================
// SUB COMPONENTS
// ============================================================================

// Componente de barra de progreso optimizado
const RatingProgress = memo(({ 
  score, 
  label, 
  totalReviews, 
  stars 
}: { 
  score: number
  label: string
  totalReviews: number
  stars: number
}) => {
  const percentage = totalReviews > 0 ? (score / totalReviews) * 100 : 0
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: stars * 0.05 }}
      className="flex items-center gap-3 group"
    >
      <span className="text-sm font-bold text-white w-24 flex-shrink-0 flex items-center gap-1">
        {label}
        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
      </span>
      
      <div className="relative w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: stars * 0.05 + 0.2, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
        />
        {/* Shine effect */}
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>
      
      <span className="text-sm text-zinc-400 w-12 text-right flex-shrink-0 font-bold group-hover:text-white transition-colors">
        {score}
      </span>
    </motion.div>
  )
})
RatingProgress.displayName = 'RatingProgress'

// Componente de review card
const ReviewCard = memo(({ review, index }: { review: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="group relative p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-white/5 hover:border-white/10 transition-all hover:shadow-lg hover:shadow-violet-500/5"
  >
    {/* Verified badge */}
    {review.verified && (
      <div className="absolute top-4 right-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
          className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
        >
          <BadgeCheck className="w-3 h-3 text-emerald-400" />
          <span className="text-emerald-400 text-[10px] font-bold">Verificado</span>
        </motion.div>
      </div>
    )}

    {/* Header */}
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
        <User className="w-5 h-5 text-white" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-white truncate">
            {review.userName || 'Cliente verificado'}
          </span>
          {review.isPremium && (
            <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
          )}
        </div>
        
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Calendar className="w-3 h-3" />
          <span>{review.date || 'Hace poco'}</span>
        </div>
      </div>
    </div>

    {/* Rating */}
    <div className="flex items-center gap-2 mb-3">
      <div className="flex" role="img" aria-label={`${review.rating} de 5 estrellas`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={`review-star-${index}-${i}`}
            className={`w-4 h-4 transition-all ${
              i < review.rating 
                ? 'fill-amber-400 text-amber-400' 
                : 'text-zinc-700'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-bold text-amber-400">{review.rating}.0</span>
    </div>

    {/* Comment */}
    <p className="text-zinc-300 leading-relaxed mb-4">
      {review.comment}
    </p>

    {/* Footer - Helpful */}
    {review.helpful && (
      <div className="flex items-center gap-2 text-xs text-zinc-500 pt-3 border-t border-white/5">
        <TrendingUp className="w-3 h-3" />
        <span>{review.helpful} personas encontraron esto útil</span>
      </div>
    )}
  </motion.div>
))
ReviewCard.displayName = 'ReviewCard'

// Componente de FAQ item
const FAQItem = memo(({ 
  faq, 
  index, 
  isExpanded, 
  onToggle 
}: { 
  faq: { q: string; a: string }
  index: number
  isExpanded: boolean
  onToggle: () => void
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="group"
  >
    <div className={`border-2 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 transition-all ${
      isExpanded 
        ? 'border-violet-500/30 shadow-lg shadow-violet-500/10' 
        : 'border-white/5 hover:border-white/10'
    }`}>
      <motion.button
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
        whileTap={{ scale: 0.99 }}
        onClick={onToggle}
        className="flex justify-between items-center w-full p-5 md:p-6 text-left rounded-2xl"
        aria-expanded={isExpanded}
      >
        <span className="font-bold text-white pr-4 leading-tight">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 ${isExpanded ? 'text-violet-400' : 'text-zinc-400'}`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 md:px-6 md:pb-6">
              <div className="pt-3 border-t border-white/10">
                <p className="text-zinc-300 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
))
FAQItem.displayName = 'FAQItem'

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function TabsSection({ 
  activeTab, 
  setActiveTab, 
  product, 
  reviews, 
  averageRatings, 
  faqs, 
  expandedFaq, 
  setExpandedFaq 
}: TabsSectionProps) {
  
  // ✅ Extraer features de forma segura
  const features = useMemo<Feature[]>(() => {
    if (!product?.features) return []
    if (!Array.isArray(product.features)) return []
    return product.features
  }, [product?.features])

  // 🔍 DEBUG - Ver qué datos tenemos (eliminar en producción)
  if (typeof window !== 'undefined' && activeTab === 'description') {
    console.group('🔍 TabsSection Debug')
    console.log('Product:', product?.name)
    console.log('Has features property:', 'features' in (product || {}))
    console.log('Features is array:', Array.isArray(product?.features))
    console.log('Features length:', features.length)
    console.log('Features data:', features)
    console.groupEnd()
  }

  const tabs = useMemo(() => [
    { id: 'description' as const, name: 'Descripción', icon: Info },
    { id: 'specs' as const, name: 'Especificaciones', icon: Layers },
    { id: 'reviews' as const, name: `Opiniones (${averageRatings.count})`, icon: Star },
    { id: 'faq' as const, name: 'Preguntas', icon: MessageCircle },
  ], [averageRatings.count])

  const totalReviews = averageRatings.count

  const renderContent = () => {
    const contentVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
      }
    }

    switch (activeTab) {
      case 'description':
        return (
          <motion.div
            key="description"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-violet-400" />
              <h2 className="text-3xl md:text-4xl font-black text-white">
                {product.name}
              </h2>
            </div>

            <div className="space-y-6 text-zinc-300 leading-relaxed text-base md:text-lg">
              <p className="text-lg md:text-xl text-zinc-200 font-medium">
                {product.description}
              </p>
              
              {product.longDescription && (
                <div 
                  dangerouslySetInnerHTML={{ __html: product.longDescription }} 
                  className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-zinc-300 prose-strong:text-white prose-a:text-violet-400"
                />
              )}

              {/* ✅ CARACTERÍSTICAS DESTACADAS - VERSIÓN MEJORADA */}
              {features.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-10 p-6 md:p-8 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 rounded-2xl border border-violet-500/20"
                >
                  <h3 className="text-2xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                    <Award className="w-6 h-6 text-violet-400" />
                    Características Destacadas
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature: Feature, index: number) => (
                      <motion.li
                        key={`feature-${feature.name}-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all group"
                      >
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-white block mb-1">
                            {feature.name}
                          </span>
                          <span className="text-zinc-400 text-sm">
                            {feature.value}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                /* ⚠️ MENSAJE DE DEBUG - Eliminar en producción */
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-10 p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-amber-400 font-bold mb-1">
                        ⚠️ Debug: No se encontraron características
                      </p>
                      <p className="text-amber-400/80 text-sm">
                        Verifica en la consola del navegador (F12) si <code className="bg-black/30 px-1 rounded">product.features</code> contiene datos.
                        Si está vacío, el problema está en la API o base de datos.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )

      case 'specs':
        return (
          <motion.div
            key="specs"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 md:mb-8 flex items-center gap-3">
              <Layers className="w-8 h-8 text-violet-400" />
              Especificaciones Técnicas
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { label: 'Marca', value: product.brand || 'Tienda Colchón', icon: Award },
                { label: 'Altura total', value: `${product.height} cm`, icon: TrendingUp },
                { label: 'Firmeza', value: `${product.firmness} (${product.firmnessValue}%)`, icon: TrendingUp },
                { label: 'Material principal', value: product.material || 'Viscoelástica y Muelles', icon: Layers },
                { label: 'Transpirabilidad', value: `${product.transpirability}%`, icon: Sparkles },
                ...(product.isEco ? [{ label: 'Ecológico', value: 'Certificado', icon: BadgeCheck }] : [])
              ].map((spec, index) => (
                <motion.div
                  key={`spec-${spec.label}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-white/5 hover:border-white/10 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <dt className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
                        <spec.icon className="w-4 h-4 text-violet-400" />
                        {spec.label}
                      </dt>
                      <dd className="text-xl font-black text-white group-hover:text-violet-400 transition-colors">
                        {spec.value}
                      </dd>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )

      case 'reviews':
        return (
          <motion.div
            key="reviews"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8 flex items-center gap-3">
              <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
              Opiniones de Clientes
              <span className="text-zinc-500">({totalReviews})</span>
            </h2>
            
            {/* Resumen de ratings */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              {/* Score principal */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-8 border border-amber-500/20 flex flex-col items-center justify-center text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="text-7xl font-black bg-gradient-to-br from-amber-400 to-orange-400 bg-clip-text text-transparent"
                >
                  {averageRatings.average.toFixed(1)}
                </motion.span>
                
                <div className="flex my-3">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={`summary-star-${i}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          i < Math.floor(averageRatings.average) 
                            ? 'fill-amber-400 text-amber-400' 
                            : 'text-zinc-700'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-sm text-zinc-400 font-medium">
                  Basado en <span className="text-white font-bold">{totalReviews}</span> opiniones
                </p>
              </motion.div>

              {/* Distribución */}
              <div className="lg:col-span-2 bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 rounded-2xl p-6 md:p-8 border border-white/5 space-y-4">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <RatingProgress
                    key={`rating-${stars}`}
                    score={averageRatings.distribution[stars] || 0}
                    label={`${stars} ${stars === 1 ? 'Estrella' : 'Estrellas'}`}
                    totalReviews={totalReviews}
                    stars={6 - stars}
                  />
                ))}
              </div>
            </div>

            {/* Reviews list */}
            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <ReviewCard key={`review-${review.id || index}`} review={review} index={index} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 px-4 bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 rounded-2xl border border-white/5"
                >
                  <MessageCircle className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-400 text-lg">
                    Sé el primero en dejar una opinión sobre este producto
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )

      case 'faq':
        return (
          <motion.div
            key="faq"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8 flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-violet-400" />
              Preguntas Frecuentes
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={`faq-${index}`}
                  faq={faq}
                  index={index}
                  isExpanded={expandedFaq === index}
                  onToggle={() => setExpandedFaq(expandedFaq === index ? null : index)}
                />
              ))}
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <section className="w-full" aria-labelledby="product-tabs">
      {/* Tabs navigation */}
      <div className="relative mb-10 md:mb-14">
        <div className="flex flex-wrap border-b-2 border-white/10">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-4 md:px-8 py-4 md:py-5 font-bold transition-all ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              <tab.icon className={`w-4 h-4 md:w-5 md:h-5 ${
                activeTab === tab.id ? 'text-violet-400' : ''
              }`} />
              <span className="text-sm md:text-base">{tab.name}</span>
              
              {/* Animated underline */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-t-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </section>
  )
}