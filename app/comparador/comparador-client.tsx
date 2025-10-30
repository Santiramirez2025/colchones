// app/comparador/comparador-client.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Clock,
  ThumbsUp,
  CheckCircle2,
  ArrowRight,
  Brain,
  Heart,
  Moon,
  Layers,
  Package,
  ChevronDown,
  ChevronUp,
  Truck,
  RotateCcw,
  AlertCircle,
  ExternalLink
} from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  subtitle: string
  firmnessValue: number
  firmness: string
  height: number
  warranty: number
  trialNights: number
  rating: number
  reviewCount: number
  image: string
  images: string[]
  features: string[]
  inStock: boolean
  isBestSeller?: boolean
  isNew?: boolean
  badge?: string
  slug: string
}

interface ComparadorClientProps {
  products: Product[]
}

export default function ComparadorClient({ products }: ComparadorClientProps) {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>('comparison')
  const [userProfile, setUserProfile] = useState({
    position: 'side',
    weight: 'medium',
    temperature: 'warm',
  })
  const [showRecommendation, setShowRecommendation] = useState(false)

  // Inicializar con los primeros 3 productos
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

  const getAIRecommendation = () => {
    const scores = products.map(product => {
      let score = 0
      if (userProfile.position === 'side' && product.firmnessValue >= 40 && product.firmnessValue <= 60) score += 3
      if (userProfile.position === 'back' && product.firmnessValue >= 60 && product.firmnessValue <= 80) score += 3
      if (userProfile.position === 'stomach' && product.firmnessValue >= 70) score += 3
      if (userProfile.weight === 'heavy' && product.firmnessValue >= 70) score += 2
      if (userProfile.weight === 'light' && product.firmnessValue <= 60) score += 2
      if (product.isBestSeller) score += 1
      return score
    })
    const bestIndex = scores.indexOf(Math.max(...scores))
    return products[bestIndex]
  }

  const calculateCompatibility = (product: Product) => {
    let compatibility = 85
    if (userProfile.position === 'side' && product.firmnessValue >= 40 && product.firmnessValue <= 60) compatibility += 10
    if (userProfile.position === 'back' && product.firmnessValue >= 60 && product.firmnessValue <= 80) compatibility += 10
    if (userProfile.weight === 'heavy' && product.firmnessValue >= 70) compatibility += 5
    return Math.min(compatibility, 99)
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-zinc-950 to-zinc-950" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(139,92,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(139,92,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px]" />

      <div className="relative pt-32 pb-20 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 backdrop-blur-xl border border-violet-500/20 px-6 py-3 rounded-full mb-8"
          >
            <Shield className="w-5 h-5 text-violet-400" />
            <span className="text-violet-300 font-bold text-sm">Comparación verificada por expertos</span>
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
            Compara y decide
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              con confianza
            </span>
          </h1>
          
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-8">
            Análisis profesional lado a lado de hasta 4 colchones premium. 
            Encuentra el tuyo en minutos.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-violet-400" />
              <span className="text-zinc-300 font-semibold">+12.000 comparaciones este mes</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-zinc-300 font-semibold">4.9/5 valoración media</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-zinc-300 font-semibold">100% opiniones verificadas</span>
            </div>
          </div>
        </motion.div>

        {/* AI Profile Setup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl border border-white/10 p-8 mb-12 shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">Asistente inteligente</h3>
              <p className="text-zinc-400">Personaliza tu comparación en 30 segundos</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-white mb-3">¿Cómo duermes?</label>
              <select
                value={userProfile.position}
                onChange={(e) => setUserProfile({...userProfile, position: e.target.value})}
                className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              >
                <option value="side">🛌 De lado</option>
                <option value="back">⬆️ Boca arriba</option>
                <option value="stomach">⬇️ Boca abajo</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-white mb-3">Temperatura corporal</label>
              <select
                value={userProfile.temperature}
                onChange={(e) => setUserProfile({...userProfile, temperature: e.target.value})}
                className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              >
                <option value="warm">🔥 Caluroso</option>
                <option value="cold">❄️ Friolero</option>
                <option value="neutral">🌡️ Neutral</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-white mb-3">Peso aproximado</label>
              <select
                value={userProfile.weight}
                onChange={(e) => setUserProfile({...userProfile, weight: e.target.value})}
                className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
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
            className="w-full py-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white font-black text-lg rounded-xl transition-all duration-500 shadow-2xl shadow-violet-500/30 flex items-center justify-center gap-3"
          >
            <Sparkles className="w-6 h-6" />
            Obtener recomendación IA
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* AI Recommendation */}
        <AnimatePresence>
          {showRecommendation && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 48 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30 rounded-3xl p-8 overflow-hidden backdrop-blur-xl"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-black text-white text-2xl">Tu match perfecto</h3>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-sm font-black rounded-full">
                      Verificado por IA
                    </span>
                  </div>
                  <p className="text-zinc-300 mb-6 leading-relaxed">
                    Basándonos en tu perfil de descanso (postura {userProfile.position === 'side' ? 'lateral' : userProfile.position === 'back' ? 'supina' : 'prona'}, 
                    peso {userProfile.weight === 'light' ? 'ligero' : userProfile.weight === 'heavy' ? 'alto' : 'medio'}, 
                    temperatura {userProfile.temperature}), este es el colchón más compatible:
                  </p>
                  <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between flex-wrap gap-6">
                      <div className="flex-1">
                        <h4 className="font-black text-white text-2xl mb-2">{getAIRecommendation().name}</h4>
                        <p className="text-zinc-400 mb-4">{getAIRecommendation().subtitle}</p>
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl">
                            <ThumbsUp className="w-5 h-5" />
                            <span className="font-black">{calculateCompatibility(getAIRecommendation())}% compatibilidad</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                            ))}
                            <span className="text-zinc-400 ml-2 font-semibold">({getAIRecommendation().reviewCount})</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-5xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-3">
                          {getAIRecommendation().price}€
                        </div>
                        <Link href={`/producto/${getAIRecommendation().slug}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl transition-all shadow-xl flex items-center gap-2"
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
        <div className={`grid ${selectedProducts.length === 2 ? 'md:grid-cols-2' : selectedProducts.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-8 mb-12`}>
          <AnimatePresence mode="popLayout">
            {selectedProducts.map((productIndex) => {
              const product = products[productIndex]
              if (!product) return null

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
                      className="absolute -top-3 -right-3 z-20 w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}

                  <div className="relative h-full bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl border border-white/10 p-6 hover:border-violet-500/30 transition-all duration-500 shadow-xl">
                    {/* Badges */}
                    <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-10">
                      <div className="flex flex-col gap-2">
                        {product.isBestSeller && (
                          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-xl">
                            <TrendingUp className="w-3 h-3" />
                            MÁS VENDIDO
                          </span>
                        )}
                        {product.badge && (
                          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-xl">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center" title="Certificado">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-56 rounded-2xl bg-zinc-800 mb-6 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-8xl">
                        🛏️
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'}`} />
                      ))}
                      <span className="text-sm text-zinc-400 font-semibold">({product.reviewCount})</span>
                    </div>

                    {/* Info */}
                    <h3 className="text-2xl font-black text-white mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{product.subtitle}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-4xl font-black text-white">{product.price}€</span>
                        {product.originalPrice && (
                          <span className="text-xl text-zinc-500 line-through">{product.originalPrice}€</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        Envío gratuito 24-48h
                      </div>
                    </div>

                    {/* Quick specs */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className="p-3 bg-white/5 rounded-xl text-center border border-white/10">
                        <TrendingUp className="w-4 h-4 text-violet-400 mx-auto mb-1" />
                        <div className="text-xs text-zinc-500">Firmeza</div>
                        <div className="text-sm font-bold text-white">{product.firmnessValue}%</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl text-center border border-white/10">
                        <Layers className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                        <div className="text-xs text-zinc-500">Altura</div>
                        <div className="text-sm font-bold text-white">{product.height}cm</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl text-center border border-white/10">
                        <Shield className="w-4 h-4 text-fuchsia-400 mx-auto mb-1" />
                        <div className="text-xs text-zinc-500">Garantía</div>
                        <div className="text-sm font-bold text-white">{product.warranty}a</div>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link href={`/producto/${product.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold rounded-xl transition-all shadow-lg mb-4 flex items-center justify-center gap-2"
                      >
                        Ver detalles completos
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>

                    {/* Selector */}
                    <select
                      value={productIndex}
                      onChange={(e) => replaceProduct(productIndex, Number(e.target.value))}
                      className="w-full py-3 px-4 bg-zinc-800 border border-white/10 rounded-xl text-sm text-white font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
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
                className="relative h-full min-h-[600px] bg-zinc-900/50 border-2 border-dashed border-white/10 hover:border-violet-500/50 hover:bg-zinc-900 rounded-3xl p-6 transition-all duration-300 group"
              >
                <div className="h-full flex flex-col items-center justify-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-10 h-10 text-violet-400" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-white mb-2">Añadir producto</div>
                    <div className="text-zinc-400">Compara hasta 4 colchones</div>
                  </div>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto p-8">
  <table className="w-full">
    <thead>
      <tr className="border-b border-white/10">
        <th className="sticky left-0 z-10 bg-zinc-900 p-4 text-left">
          <span className="text-sm font-black text-white">Características</span>
        </th>
        {selectedProducts.map((productIndex) => (
          <th key={productIndex} className="p-4 min-w-[200px]">
            <div className="text-center">
              <div className="text-sm font-bold text-white">
                {products[productIndex].name}
              </div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {comparisonFeatures.map((feature, index) => (
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
          <td className="sticky left-0 z-10 bg-zinc-900 p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">{feature.name}</div>
                <button
                  onMouseEnter={() => setShowTooltip(feature.key)}
                  onMouseLeave={() => setShowTooltip(null)}
                  className="text-xs text-zinc-500 hover:text-violet-400 transition-colors flex items-center gap-1 relative"
                >
                  <Info className="w-3 h-3" />
                  Info
                  {showTooltip === feature.key && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-full ml-4 w-64 p-4 bg-zinc-800 border border-white/10 text-zinc-300 rounded-xl text-xs shadow-2xl z-20 whitespace-normal"
                    >
                      {feature.description}
                    </motion.div>
                  )}
                </button>
              </div>
            </div>
          </td>
          {selectedProducts.map((productIndex) => (
            <td key={productIndex} className="p-4 text-center">
              {renderFeatureValue(
                products[productIndex],
                feature.key
              )}
            </td>
          ))}
        </motion.tr>
      ))}
    </tbody>
  </table>
</div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              icon: Shield,
              title: 'Garantía extendida',
              description: 'Hasta 10 años de garantía verificada contra defectos de fabricación',
              gradient: 'from-emerald-500 to-green-600'
            },
            {
              icon: Moon,
              title: '100 noches de prueba',
              description: 'Prueba tu colchón sin compromiso. Devolución gratuita si no estás satisfecho',
              gradient: 'from-blue-500 to-indigo-600'
            },
            {
              icon: Heart,
              title: '98% satisfacción',
              description: 'Miles de clientes recomiendan nuestros productos a familiares y amigos',
              gradient: 'from-fuchsia-500 to-pink-600'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-black text-white text-xl mb-3">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              ¿Necesitas ayuda personalizada?
            </h2>
            
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Nuestro equipo de expertos en descanso está disponible para asesorarte 
              de forma personalizada y sin compromiso
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/simulador">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white text-violet-600 font-black text-lg rounded-2xl shadow-2xl hover:shadow-white/40 transition-all flex items-center justify-center gap-3"
                >
                  <Zap className="w-6 h-6" />
                  Test personalizado 2 min
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-white/80 flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">100% gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">Resultado inmediato</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function renderFeatureValue(product: Product, featureKey: string) {
  const value = product[featureKey as keyof Product]

  if (typeof value === 'boolean') {
    return value ? (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg"
      >
        <Check className="w-6 h-6 text-white" />
      </motion.div>
    ) : (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800"
      >
        <X className="w-6 h-6 text-zinc-600" />
      </motion.div>
    )
  }
  
  if (featureKey === 'rating') {
    return (
      <div className="flex items-center justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < (value as number) ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'
            }`}
          />
        ))}
      </div>
    )
  }
  
  return <span className="text-white font-bold text-sm">{String(value)}</span>
}

const comparisonFeatures = [
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
    description: 'La firmeza afecta al soporte de la columna. Escala 1-10, donde 1 es blando y 10 es firme'
  },
  { 
    name: 'Altura total', 
    key: 'height',
    icon: Layers,
    gradient: 'from-orange-500 to-red-500',
    description: 'Mayor altura indica más capas de confort. Recomendado 25-32cm para uso premium'
  },
  { 
    name: 'Garantía', 
    key: 'warranty',
    icon: Shield,
    gradient: 'from-emerald-500 to-green-600',
    description: 'Años de cobertura contra defectos de fabricación'
  },
  { 
    name: 'Noches de prueba', 
    key: 'trialNights',
    icon: Moon,
    gradient: 'from-indigo-500 to-purple-600',
    description: 'Número de noches para probar sin compromiso con devolución gratuita'
  },
  { 
    name: 'Valoración', 
    key: 'rating',
    icon: Star,
    gradient: 'from-amber-400 to-orange-500',
    description: 'Puntuación media basada en opiniones verificadas de clientes reales'
  },
  { 
    name: 'En stock', 
    key: 'inStock',
    icon: Package,
    gradient: 'from-green-500 to-emerald-600',
    description: 'Disponibilidad inmediata para envío'
  },
]