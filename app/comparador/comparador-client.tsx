'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Check,
  X,
  Plus,
  Shield,
  Leaf,
  Wind,
  TrendingUp,
  Award,
  Sparkles,
  Star,
  Info,
  Zap,
  Users,
  ThumbsUp,
  CheckCircle2,
  ArrowRight,
  Brain,
  Heart,
  Moon,
  Layers,
  Package,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import type { ProductWithCategory } from '@/lib/api/products'

interface ComparadorClientProps {
  products: ProductWithCategory[]
}

// Características de comparación
const COMPARISON_FEATURES = [
  { 
    name: 'Tipo de colchón', 
    key: 'subtitle',
    icon: Sparkles,
    gradient: 'from-violet-500 to-fuchsia-600',
    description: 'El tipo de material determina el comportamiento, durabilidad y sensación del colchón'
  },
  { 
    name: 'Nivel de firmeza', 
    key: 'firmness',
    icon: TrendingUp,
    gradient: 'from-cyan-500 to-blue-600',
    description: 'La firmeza afecta al soporte de la columna'
  },
  { 
    name: 'Firmeza numérica', 
    key: 'firmnessValue',
    icon: TrendingUp,
    gradient: 'from-blue-500 to-indigo-600',
    description: 'Valor exacto de firmeza en escala 0-100'
  },
  { 
    name: 'Altura total', 
    key: 'height',
    icon: Layers,
    gradient: 'from-orange-500 to-red-500',
    description: 'Mayor altura indica más capas de confort'
  },
  { 
    name: 'Garantía', 
    key: 'warranty',
    icon: Shield,
    gradient: 'from-emerald-500 to-green-600',
    description: 'Años de cobertura contra defectos'
  },
  { 
    name: 'Período de prueba', 
    key: 'trialNights',
    icon: Moon,
    gradient: 'from-indigo-500 to-purple-600',
    description: 'Noches de prueba sin compromiso'
  },
  { 
    name: 'Valoración', 
    key: 'rating',
    icon: Star,
    gradient: 'from-amber-400 to-orange-500',
    description: 'Puntuación media de clientes'
  },
  { 
    name: 'Opiniones', 
    key: 'reviewCount',
    icon: Users,
    gradient: 'from-pink-500 to-rose-600',
    description: 'Número total de reseñas'
  },
  { 
    name: 'En stock', 
    key: 'inStock',
    icon: Package,
    gradient: 'from-green-500 to-emerald-600',
    description: 'Disponibilidad inmediata'
  },
  { 
    name: 'Bestseller', 
    key: 'isBestSeller',
    icon: Award,
    gradient: 'from-amber-500 to-yellow-600',
    description: 'Producto más vendido'
  },
  { 
    name: 'Transpirable', 
    key: 'cooling',
    icon: Wind,
    gradient: 'from-cyan-400 to-teal-500',
    description: 'Tecnología de ventilación'
  },
  { 
    name: 'Ecológico', 
    key: 'isEco',
    icon: Leaf,
    gradient: 'from-green-400 to-emerald-500',
    description: 'Materiales sostenibles'
  },
]

export default function ComparadorClient({ products }: ComparadorClientProps) {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState({
    position: 'side',
    weight: 'medium',
    temperature: 'warm',
  })
  const [showRecommendation, setShowRecommendation] = useState(false)

  useEffect(() => {
    if (products.length >= 3) {
      setSelectedProducts([0, 1, 2])
    } else if (products.length > 0) {
      setSelectedProducts(products.map((_, i) => i))
    }
  }, [products])

  const addProduct = () => {
    if (selectedProducts.length < 4) {
      const nextProduct = products.findIndex((_, i) => !selectedProducts.includes(i))
      if (nextProduct !== -1) {
        setSelectedProducts([...selectedProducts, nextProduct])
      }
    }
  }

  const removeProduct = (index: number) => {
    if (selectedProducts.length > 2) {
      setSelectedProducts(selectedProducts.filter(id => id !== index))
    }
  }

  const replaceProduct = (oldIndex: number, newIndex: number) => {
    const newSelection = [...selectedProducts]
    const position = newSelection.indexOf(oldIndex)
    newSelection[position] = newIndex
    setSelectedProducts(newSelection)
  }

  const getAIRecommendation = useMemo(() => {
    const scores = products.map(product => {
      let score = 0
      
      if (userProfile.position === 'side' && product.firmnessValue >= 40 && product.firmnessValue <= 60) score += 3
      if (userProfile.position === 'back' && product.firmnessValue >= 60 && product.firmnessValue <= 80) score += 3
      if (userProfile.position === 'stomach' && product.firmnessValue >= 70) score += 3
      
      if (userProfile.weight === 'heavy' && product.firmnessValue >= 70) score += 2
      if (userProfile.weight === 'light' && product.firmnessValue <= 60) score += 2
      
      if (userProfile.temperature === 'warm' && product.cooling) score += 2
      
      if (product.isBestSeller) score += 1
      if (product.rating >= 4.5) score += 1
      
      return score
    })
    
    const bestIndex = scores.indexOf(Math.max(...scores))
    return products[bestIndex]
  }, [products, userProfile])

  const calculateCompatibility = (product: ProductWithCategory) => {
    let compatibility = 75
    
    if (userProfile.position === 'side' && product.firmnessValue >= 40 && product.firmnessValue <= 60) compatibility += 15
    if (userProfile.position === 'back' && product.firmnessValue >= 60 && product.firmnessValue <= 80) compatibility += 15
    if (userProfile.position === 'stomach' && product.firmnessValue >= 70) compatibility += 15
    if (userProfile.weight === 'heavy' && product.firmnessValue >= 70) compatibility += 5
    if (userProfile.weight === 'light' && product.firmnessValue <= 60) compatibility += 5
    if (userProfile.temperature === 'warm' && product.cooling) compatibility += 5
    
    return Math.min(compatibility, 99)
  }

  // ✅ FIX: Función con tipos corregidos
  const renderFeatureValue = (product: ProductWithCategory, featureKey: string) => {
    const value = product[featureKey as keyof ProductWithCategory]

    // Manejar null/undefined
    if (value === null || value === undefined) {
      return <span className="text-zinc-600 text-sm">N/A</span>
    }

    // Booleanos
    if (typeof value === 'boolean') {
      return value ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg"
        >
          <Check className="w-5 h-5 text-white" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800/50"
        >
          <X className="w-5 h-5 text-zinc-600" />
        </motion.div>
      )
    }
    
    // Rating especial
    if (featureKey === 'rating' && typeof value === 'number') {
      return (
        <div className="flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < value ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'
              }`}
            />
          ))}
          <span className="text-white font-bold text-sm ml-2">{value.toFixed(1)}</span>
        </div>
      )
    }

    // Números con unidades
    if (typeof value === 'number') {
      if (featureKey === 'warranty') {
        return <span className="text-white font-bold text-base">{value} años</span>
      }
      if (featureKey === 'trialNights') {
        return <span className="text-white font-bold text-base">{value} noches</span>
      }
      if (featureKey === 'height') {
        return <span className="text-white font-bold text-base">{value} cm</span>
      }
      if (featureKey === 'firmnessValue') {
        return (
          <div className="flex flex-col items-center gap-1">
            <span className="text-white font-bold text-base">{value}%</span>
            <div className="w-20 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-violet-400"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        )
      }
      // Otros números
      return <span className="text-white font-bold text-base">{value}</span>
    }

    // Strings
    if (typeof value === 'string') {
      return <span className="text-white font-semibold text-sm">{value}</span>
    }

    // Arrays (no deberían renderizarse directamente, pero por seguridad)
    if (Array.isArray(value)) {
      return <span className="text-zinc-600 text-sm">{value.length} items</span>
    }

    // Objetos y otros tipos
    return <span className="text-zinc-600 text-sm">-</span>
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-zinc-950 to-zinc-950" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(139,92,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(139,92,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px]" />

      <div className="relative pt-24 sm:pt-32 pb-20 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 backdrop-blur-xl border border-violet-500/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8"
          >
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
            <span className="text-violet-300 font-bold text-xs sm:text-sm">Comparación verificada por expertos</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight">
            Compara y decide
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              con confianza
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Análisis profesional lado a lado de hasta 4 colchones premium
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
              <span className="text-zinc-300 font-semibold">+12.000 comparaciones</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" />
              <span className="text-zinc-300 font-semibold">4.9/5 valoración</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              <span className="text-zinc-300 font-semibold">Verificadas</span>
            </div>
          </div>
        </motion.div>

        {/* AI Profile Setup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 mb-8 sm:mb-12 shadow-2xl"
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">Asistente inteligente</h3>
              <p className="text-sm sm:text-base text-zinc-400">Personaliza en 30 segundos</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-white mb-2 sm:mb-3">¿Cómo duermes?</label>
              <select
                value={userProfile.position}
                onChange={(e) => setUserProfile({...userProfile, position: e.target.value})}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-zinc-800 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="side">🛌 De lado</option>
                <option value="back">⬆️ Boca arriba</option>
                <option value="stomach">⬇️ Boca abajo</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-white mb-2 sm:mb-3">Temperatura</label>
              <select
                value={userProfile.temperature}
                onChange={(e) => setUserProfile({...userProfile, temperature: e.target.value})}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-zinc-800 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="warm">🔥 Caluroso</option>
                <option value="cold">❄️ Friolero</option>
                <option value="neutral">🌡️ Neutral</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-white mb-2 sm:mb-3">Peso</label>
              <select
                value={userProfile.weight}
                onChange={(e) => setUserProfile({...userProfile, weight: e.target.value})}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-zinc-800 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="light">Menos de 60kg</option>
                <option value="medium">60-90kg</option>
                <option value="heavy">Más de 90kg</option>
              </select>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setShowRecommendation(true)}
            className="w-full py-3 sm:py-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white font-black text-base sm:text-lg rounded-xl transition-all duration-500 shadow-2xl flex items-center justify-center gap-2 sm:gap-3"
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            Obtener recomendación IA
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </motion.div>

        {/* AI Recommendation */}
        <AnimatePresence>
          {showRecommendation && getAIRecommendation && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden backdrop-blur-xl"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-xl">
                  <Award className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                    <h3 className="font-black text-white text-xl sm:text-2xl">Tu match perfecto</h3>
                    <span className="px-2 sm:px-3 py-1 bg-amber-500/20 text-amber-300 text-xs sm:text-sm font-black rounded-full">
                      IA
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-300 mb-4 sm:mb-6">
                    El colchón más compatible según tu perfil
                  </p>
                  <div className="bg-zinc-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
                      <div className="flex-1">
                        <h4 className="font-black text-white text-xl sm:text-2xl mb-2">{getAIRecommendation.name}</h4>
                        <p className="text-sm sm:text-base text-zinc-400 mb-4">{getAIRecommendation.subtitle}</p>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                          <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
                            <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="font-black text-sm sm:text-base">{calculateCompatibility(getAIRecommendation)}% match</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-left lg:text-right w-full lg:w-auto">
                        <div className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-3">
                          {getAIRecommendation.price}€
                        </div>
                        <Link href={`/producto/${getAIRecommendation.slug}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-lg sm:rounded-xl shadow-xl flex items-center gap-2 w-full lg:w-auto justify-center"
                          >
                            Ver detalles
                            <ExternalLink className="w-4 h-4" />
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Cards Grid */}
        <div className={`grid ${selectedProducts.length === 2 ? 'md:grid-cols-2' : selectedProducts.length === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12`}>
          <AnimatePresence mode="popLayout">
            {selectedProducts.map((productIndex) => {
              const product = products[productIndex]
              if (!product) return null

              const productImage = product.images && product.images.length > 0 
                ? product.images[0] 
                : product.image || '/images/placeholder.jpg'

              return (
                <motion.div
                  key={productIndex}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  {selectedProducts.length > 2 && (
                    <button
                      onClick={() => removeProduct(productIndex)}
                      className="absolute -top-2 -right-2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}

                  <div className="relative h-full bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 hover:border-violet-500/30 transition-all duration-500 shadow-xl">
                    {/* Badges */}
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-start justify-between z-10">
                      <div className="flex flex-col gap-2">
                        {product.isBestSeller && (
                          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-black shadow-xl">
                            <TrendingUp className="w-3 h-3" />
                            BEST
                          </span>
                        )}
                        {product.isNew && (
                          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-black shadow-xl">
                            <Sparkles className="w-3 h-3" />
                            NUEVO
                          </span>
                        )}
                      </div>
                      
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-40 sm:h-48 md:h-56 rounded-xl sm:rounded-2xl bg-zinc-800 mb-4 sm:mb-6 overflow-hidden">
                      <Image
                        src={productImage}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'}`} />
                      ))}
                      <span className="text-xs sm:text-sm text-zinc-400 font-semibold">({product.reviewCount})</span>
                    </div>

                    {/* Info */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mb-3 sm:mb-4 line-clamp-2">{product.subtitle}</p>

                    {/* Price */}
                    <div className="mb-4 sm:mb-6">
                      <div className="flex items-baseline gap-2 sm:gap-3 mb-1">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white">{product.price}€</span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <span className="text-base sm:text-lg text-zinc-500 line-through">{product.compareAtPrice}€</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        Envío gratis 24-48h
                      </div>
                    </div>

                    {/* Quick specs */}
                    <div className="grid grid-cols-3 gap-2 mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 bg-white/5 rounded-lg text-center border border-white/10">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-violet-400 mx-auto mb-1" />
                        <div className="text-[10px] sm:text-xs text-zinc-500">Firmeza</div>
                        <div className="text-xs sm:text-sm font-bold text-white">{product.firmnessValue}%</div>
                      </div>
                      <div className="p-2 sm:p-3 bg-white/5 rounded-lg text-center border border-white/10">
                        <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 mx-auto mb-1" />
                        <div className="text-[10px] sm:text-xs text-zinc-500">Altura</div>
                        <div className="text-xs sm:text-sm font-bold text-white">{product.height}cm</div>
                      </div>
                      <div className="p-2 sm:p-3 bg-white/5 rounded-lg text-center border border-white/10">
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-fuchsia-400 mx-auto mb-1" />
                        <div className="text-[10px] sm:text-xs text-zinc-500">Garantía</div>
                        <div className="text-xs sm:text-sm font-bold text-white">{product.warranty}a</div>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link href={`/producto/${product.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-sm sm:text-base rounded-lg sm:rounded-xl shadow-lg mb-3 sm:mb-4 flex items-center justify-center gap-2"
                      >
                        Ver detalles
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>

                    {/* Selector */}
                    <select
                      value={productIndex}
                      onChange={(e) => replaceProduct(productIndex, Number(e.target.value))}
                      className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-zinc-800 border border-white/10 rounded-lg text-xs sm:text-sm text-white font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      {products.map((p, i) => (
                        <option key={i} value={i}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )
            })}

            {/* Add product button */}
            {selectedProducts.length < 4 && (
              <motion.button
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={addProduct}
                className="relative h-full min-h-[500px] sm:min-h-[600px] bg-zinc-900/50 border-2 border-dashed border-white/10 hover:border-violet-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 group"
              >
                <div className="h-full flex flex-col items-center justify-center gap-4 sm:gap-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 sm:w-10 sm:h-10 text-violet-400" />
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-black text-white mb-2">Añadir producto</div>
                    <div className="text-sm sm:text-base text-zinc-400">Hasta 4 colchones</div>
                  </div>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Comparison Table */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-8 mb-8 sm:mb-16 overflow-hidden shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 flex items-center gap-3">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-violet-400" />
            Comparación detallada
          </h2>
          
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="sticky left-0 z-10 bg-zinc-900 p-3 sm:p-4 text-left">
                    <span className="text-xs sm:text-sm font-black text-white">Características</span>
                  </th>
                  {selectedProducts.map((productIndex) => (
                    <th key={productIndex} className="p-3 sm:p-4 min-w-[150px] sm:min-w-[200px]">
                      <div className="text-center">
                        <div className="text-xs sm:text-sm font-bold text-white line-clamp-2">
                          {products[productIndex].name}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((feature, index) => (
                  <motion.tr
                    key={feature.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onMouseEnter={() => setHoveredFeature(feature.key)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className={`border-b border-white/5 transition-colors ${
                      hoveredFeature === feature.key ? 'bg-violet-500/10' : ''
                    }`}
                  >
                    <td className="sticky left-0 z-10 bg-zinc-900 p-3 sm:p-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                          <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white text-xs sm:text-sm truncate">{feature.name}</div>
                          <button
                            onMouseEnter={() => setShowTooltip(feature.key)}
                            onMouseLeave={() => setShowTooltip(null)}
                            className="text-[10px] sm:text-xs text-zinc-500 hover:text-violet-400 flex items-center gap-1 relative"
                          >
                            <Info className="w-3 h-3" />
                            <span className="hidden sm:inline">Info</span>
                            {showTooltip === feature.key && (
                              <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute left-full ml-4 w-48 sm:w-64 p-3 sm:p-4 bg-zinc-800 border border-white/10 text-zinc-300 rounded-xl text-xs shadow-2xl z-20 whitespace-normal"
                              >
                                {feature.description}
                              </motion.div>
                            )}
                          </button>
                        </div>
                      </div>
                    </td>
                    {selectedProducts.map((productIndex) => (
                      <td key={productIndex} className="p-3 sm:p-4 text-center">
                        {renderFeatureValue(products[productIndex], feature.key)}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
        >
          {[
            { icon: Shield, title: 'Garantía extendida', description: 'Hasta 10 años verificada', gradient: 'from-emerald-500 to-green-600' },
            { icon: Moon, title: 'Confort garantizado', description: 'Materiales certificados', gradient: 'from-blue-500 to-indigo-600' },
            { icon: Heart, title: '98% satisfacción', description: 'Miles de clientes felices', gradient: 'from-fuchsia-500 to-pink-600' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl sm:rounded-2xl border border-white/10 p-6 sm:p-8"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 sm:mb-6`}>
                <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="font-black text-white text-lg sm:text-xl mb-2 sm:mb-3">{item.title}</h3>
              <p className="text-sm sm:text-base text-zinc-400">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-600 rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">
              ¿Necesitas ayuda personalizada?
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Test inteligente de 2 minutos
            </p>
            
            <Link href="/simulador">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-10 py-4 sm:py-5 bg-white text-violet-600 font-black text-base sm:text-lg rounded-xl shadow-2xl flex items-center justify-center gap-2 sm:gap-3 mx-auto"
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                Test personalizado
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </Link>
            
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold">100% gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold">Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold">Inmediato</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}