'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Plus, Shield, Leaf, Droplets, Wind, TrendingUp, Award, ChevronDown, Sparkles, Star, Info, Zap, Users, Clock, ThumbsUp, CheckCircle2, ArrowRight, Brain, Heart, Moon, Sun } from 'lucide-react'

export default function ComparadorPremium() {
  const [selectedProducts, setSelectedProducts] = useState([0, 1, 2])
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState({
    position: 'side',
    weight: 'medium',
    temperature: 'warm',
    hasCurrentMattress: false
  })
  const [showRecommendation, setShowRecommendation] = useState(false)
  const [catalogProducts, setCatalogProducts] = useState(initialProducts)

  useEffect(() => {
    // Simular carga del catálogo - aquí conectarías con tu API real
    const loadCatalog = async () => {
      // const response = await fetch('/api/products')
      // const data = await response.json()
      // setCatalogProducts(data)
      setCatalogProducts(initialProducts)
    }
    loadCatalog()
  }, [])

  const addProduct = () => {
    if (selectedProducts.length < 4) {
      const nextProduct = catalogProducts.findIndex((_, i) => !selectedProducts.includes(i))
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
    // Lógica de recomendación basada en perfil
    const scores = catalogProducts.map(product => {
      let score = 0
      if (userProfile.position === 'side' && product.firmness.includes('Media')) score += 3
      if (userProfile.position === 'back' && product.firmness.includes('Firme')) score += 3
      if (userProfile.temperature === 'warm' && product.cooling) score += 2
      if (product.eco) score += 1
      return score
    })
    const bestIndex = scores.indexOf(Math.max(...scores))
    return catalogProducts[bestIndex]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(100,100,100,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(100,100,100,.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="relative pt-24 pb-20 px-4 max-w-7xl mx-auto">
        {/* Trust Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-blue-200/50 px-4 py-2 rounded-full mb-6 shadow-sm"
          >
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">Certificado por expertos en descanso</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">
            Compara con confianza
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Análisis profesional y transparente para ayudarte a encontrar tu descanso perfecto
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>+50.000 clientes satisfechos</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>4.9/5 valoración media</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Garantía de satisfacción</span>
            </div>
          </div>
        </motion.div>

        {/* AI Profile Quick Setup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Asistente inteligente de descanso</h3>
              <p className="text-sm text-slate-600">Personaliza tu comparación en segundos</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">¿Cómo duermes?</label>
              <select
                value={userProfile.position}
                onChange={(e) => setUserProfile({...userProfile, position: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="side">De lado</option>
                <option value="back">Boca arriba</option>
                <option value="stomach">Boca abajo</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Temperatura corporal</label>
              <select
                value={userProfile.temperature}
                onChange={(e) => setUserProfile({...userProfile, temperature: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="warm">Caluroso</option>
                <option value="cold">Friolero</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Peso aproximado</label>
              <select
                value={userProfile.weight}
                onChange={(e) => setUserProfile({...userProfile, weight: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="light">Menos de 60kg</option>
                <option value="medium">60-90kg</option>
                <option value="heavy">Más de 90kg</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-3">
            <input
              type="checkbox"
              id="currentMattress"
              checked={userProfile.hasCurrentMattress}
              onChange={(e) => setUserProfile({...userProfile, hasCurrentMattress: e.target.checked})}
              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="currentMattress" className="text-sm text-slate-700">
              Quiero comparar con mi colchón actual
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowRecommendation(true)}
            className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Obtener recomendación personalizada
          </motion.button>
        </motion.div>

        {/* AI Recommendation Banner */}
        <AnimatePresence>
          {showRecommendation && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 48 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg border-2 border-amber-200 p-6 overflow-hidden"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-lg">Recomendación verificada por IA</h3>
                    <span className="px-2 py-0.5 bg-amber-200 text-amber-900 text-xs font-semibold rounded-full">Basado en tu perfil</span>
                  </div>
                  <p className="text-slate-700 mb-3">
                    Según tu postura al dormir, temperatura corporal y peso, hemos identificado el colchón que mejor se adapta a tus necesidades:
                  </p>
                  <div className="bg-white rounded-xl p-4 border border-amber-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{getAIRecommendation().name}</h4>
                        <p className="text-sm text-slate-600">{getAIRecommendation().type}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-semibold text-green-700">97% compatibilidad</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                            <span className="text-sm text-slate-600 ml-1">(4.9)</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">{getAIRecommendation().price}€</div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                        >
                          Ver detalles
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {selectedProducts.map((productIndex, position) => {
              const product = catalogProducts[productIndex]
              return (
                <motion.div
                  key={productIndex}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  {selectedProducts.length > 2 && (
                    <button
                      onClick={() => removeProduct(productIndex)}
                      className="absolute -top-2 -right-2 z-20 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  <div className="relative h-full bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300">
                    {product.bestValue && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg">
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3 text-white" />
                          <span className="text-xs font-bold text-white">MEJOR RELACIÓN</span>
                        </div>
                      </div>
                    )}

                    {/* Trust Badge */}
                    <div className="absolute top-4 right-4 flex gap-1">
                      {product.verified && (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center" title="Verificado">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        </div>
                      )}
                      {product.eco && (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center" title="Ecológico">
                          <Leaf className="w-4 h-4 text-green-600" />
                        </div>
                      )}
                    </div>

                    <div className="relative w-full h-40 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 mb-4 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">🛏️</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                      ))}
                      <span className="text-sm text-slate-600 ml-1">({product.reviews})</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-slate-600 mb-4">{product.type}</p>

                    <div className="mb-4">
                      <div className="text-3xl font-bold text-blue-600">{product.price}€</div>
                      <div className="text-sm text-green-600 font-medium">✓ Envío gratuito</div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {product.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {highlight}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 mb-3">
                      {product.cooling && (
                        <div className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md flex items-center gap-1">
                          <Wind className="w-3 h-3" />
                          Cooling
                        </div>
                      )}
                      {product.hypoallergenic && (
                        <div className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-md flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          Hipoalergénico
                        </div>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg mb-3"
                    >
                      Ver detalles completos
                    </motion.button>

                    <select
                      value={productIndex}
                      onChange={(e) => replaceProduct(productIndex, Number(e.target.value))}
                      className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {catalogProducts.map((p, i) => (
                        <option key={i} value={i}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )
            })}

            {selectedProducts.length < 4 && (
              <motion.button
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={addProduct}
                className="relative h-full min-h-[500px] bg-slate-50 border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/50 rounded-2xl p-6 transition-all duration-300 group"
              >
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-slate-900 mb-2">Añadir producto</div>
                    <div className="text-sm text-slate-600">Compara hasta 4 colchones</div>
                  </div>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-12"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Comparación técnica detallada</h2>
              <p className="text-sm text-slate-600 mt-1">Información verificada y actualizada</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="sticky left-0 z-10 bg-slate-50 p-4 text-left">
                      <span className="text-sm font-bold text-slate-900">Características</span>
                    </th>
                    {selectedProducts.map((productIndex) => (
                      <th key={productIndex} className="p-4 min-w-[180px]">
                        <div className="text-center">
                          <div className="text-sm font-semibold text-slate-700">
                            {catalogProducts[productIndex].name}
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
                      transition={{ delay: 0.3 + index * 0.03 }}
                      onMouseEnter={() => setHoveredFeature(feature.key)}
                      onMouseLeave={() => setHoveredFeature(null)}
                      className={`border-b border-slate-100 transition-colors ${
                        hoveredFeature === feature.key ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <td className="sticky left-0 z-10 bg-white p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                            <feature.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 text-sm">{feature.name}</div>
                            <button
                              onMouseEnter={() => setShowTooltip(feature.key)}
                              onMouseLeave={() => setShowTooltip(null)}
                              className="text-xs text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                            >
                              <Info className="w-3 h-3" />
                              Info
                            </button>
                            {showTooltip === feature.key && (
                              <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute left-full ml-4 w-64 p-3 bg-slate-900 text-white rounded-xl text-xs shadow-xl z-20"
                              >
                                {feature.description}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </td>
                      {selectedProducts.map((productIndex) => (
                        <td key={productIndex} className="p-4 text-center">
                          {renderFeatureValue(
                            catalogProducts[productIndex][feature.key as keyof typeof catalogProducts[0]],
                            feature.key
                          )}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Trust Signals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Garantía extendida</h3>
            <p className="text-sm text-slate-600">Todos nuestros colchones incluyen hasta 15 años de garantía verificada contra defectos.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Moon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Período de prueba</h3>
            <p className="text-sm text-slate-600">Prueba tu colchón hasta 120 noches. Si no estás satisfecho, devolución gratuita.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Satisfacción garantizada</h3>
            <p className="text-sm text-slate-600">97% de nuestros clientes recomiendan nuestros productos a familiares y amigos.</p>
          </div>
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 md:p-12 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Necesitas ayuda para decidir?
            </h2>
            
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Nuestro equipo de expertos en descanso está disponible para asesorarte de forma personalizada y sin compromiso
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Hablar con un experto
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Simulador IA en 2 min
              </motion.button>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Respuesta inmediata</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% confidencial</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Confianza verificada</h2>
            <p className="text-slate-600">Miles de personas ya descansan mejor gracias a nuestra asesoría</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-xl shadow-md border border-slate-200 p-6"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-xs text-slate-500">Cliente verificado</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function renderFeatureValue(value: any, featureKey: string) {
  if (typeof value === 'boolean') {
    return value ? (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-md"
      >
        <Check className="w-5 h-5 text-white" />
      </motion.div>
    ) : (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100"
      >
        <X className="w-5 h-5 text-slate-400" />
      </motion.div>
    )
  }
  
  if (featureKey === 'rating') {
    return (
      <div className="flex items-center justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < value ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
            }`}
          />
        ))}
      </div>
    )
  }
  
  return <span className="text-slate-900 font-medium">{value}</span>
}

const initialProducts = [
  {
    id: 1,
    name: 'Premium Cloud',
    price: 799,
    type: 'Memory Foam Avanzado',
    firmness: 'Media (6/10)',
    height: '25cm',
    warranty: '10 años',
    trial: '100 noches',
    cooling: true,
    hypoallergenic: true,
    eco: false,
    washable: true,
    rating: 5,
    reviews: 2847,
    bestValue: false,
    verified: true,
    satisfaction: 96,
    highlights: ['Adaptación perfecta al cuerpo', 'Tecnología Gel-Infused', 'Ideal para durmientes laterales']
  },
  {
    id: 2,
    name: 'Ergo Max',
    price: 1099,
    type: 'Muelles Ensacados Premium',
    firmness: 'Firme (8/10)',
    height: '28cm',
    warranty: '10 años',
    trial: '100 noches',
    cooling: true,
    hypoallergenic: true,
    eco: true,
    washable: true,
    rating: 5,
    reviews: 3921,
    bestValue: true,
    verified: true,
    satisfaction: 98,
    highlights: ['Máximo soporte ergonómico', '7 zonas diferenciadas', 'Certificado ecológico CertiPUR']
  },
  {
    id: 3,
    name: 'Comfort Plus',
    price: 649,
    type: 'Látex Natural',
    firmness: 'Media-Blanda (4/10)',
    height: '22cm',
    warranty: '10 años',
    trial: '100 noches',
    cooling: false,
    hypoallergenic: true,
    eco: true,
    washable: false,
    rating: 5,
    reviews: 1654,
    bestValue: false,
    verified: true,
    satisfaction: 94,
    highlights: ['100% látex natural', 'Máxima transpirabilidad', 'Hipoalergénico certificado']
  },
  {
    id: 4,
    name: 'Luxury Dream',
    price: 1499,
    type: 'Híbrido Premium',
    firmness: 'Ajustable (4-9/10)',
    height: '30cm',
    warranty: '15 años',
    trial: '120 noches',
    cooling: true,
    hypoallergenic: true,
    eco: true,
    washable: true,
    rating: 5,
    reviews: 4156,
    bestValue: false,
    verified: true,
    satisfaction: 99,
    highlights: ['Tecnología dual adaptable', 'Control personalizado de firmeza', 'Materiales de lujo certificados']
  },
  {
    id: 5,
    name: 'Essentials Rest',
    price: 499,
    type: 'Espuma de Alta Densidad',
    firmness: 'Media (5/10)',
    height: '20cm',
    warranty: '5 años',
    trial: '60 noches',
    cooling: false,
    hypoallergenic: true,
    eco: false,
    washable: true,
    rating: 4,
    reviews: 987,
    bestValue: false,
    verified: true,
    satisfaction: 91,
    highlights: ['Excelente relación calidad-precio', 'Perfecto para habitaciones infantiles', 'Fácil mantenimiento']
  },
]

const comparisonFeatures = [
  { 
    name: 'Tipo de colchón', 
    key: 'type',
    icon: Sparkles,
    gradient: 'from-blue-500 to-indigo-600',
    description: 'El tipo de material principal determina el comportamiento, durabilidad y sensación del colchón. Cada tecnología ofrece beneficios únicos.'
  },
  { 
    name: 'Nivel de firmeza', 
    key: 'firmness',
    icon: TrendingUp,
    gradient: 'from-cyan-500 to-blue-600',
    description: 'La firmeza afecta al soporte de la columna vertebral y la comodidad. Se mide en escala 1-10, donde 1 es muy blando y 10 es muy firme.'
  },
  { 
    name: 'Altura total', 
    key: 'height',
    icon: Award,
    gradient: 'from-orange-500 to-red-500',
    description: 'Mayor altura suele indicar más capas de confort y materiales premium. El estándar recomendado es 20-30cm para uso doméstico.'
  },
  { 
    name: 'Garantía', 
    key: 'warranty',
    icon: Shield,
    gradient: 'from-green-500 to-emerald-600',
    description: 'Período de cobertura contra defectos de fabricación y hundimientos superiores a 2.5cm. Indica la confianza del fabricante en su producto.'
  },
  { 
    name: 'Periodo de prueba', 
    key: 'trial',
    icon: Clock,
    gradient: 'from-purple-500 to-pink-500',
    description: 'Número de noches para probar el colchón en tu hogar. Si no estás satisfecho, devolución gratuita sin compromisos.'
  },
  { 
    name: 'Sistema Cooling', 
    key: 'cooling',
    icon: Wind,
    gradient: 'from-cyan-400 to-blue-500',
    description: 'Tecnología de regulación térmica que disipa el calor corporal. Esencial para personas que duermen con calor o en climas cálidos.'
  },
  { 
    name: 'Hipoalergénico', 
    key: 'hypoallergenic',
    icon: Shield,
    gradient: 'from-indigo-500 to-purple-600',
    description: 'Tratamiento certificado contra ácaros, bacterias y alérgenos. Recomendado para personas con alergias o problemas respiratorios.'
  },
  { 
    name: 'Certificación ECO', 
    key: 'eco',
    icon: Leaf,
    gradient: 'from-green-500 to-emerald-600',
    description: 'Fabricado con materiales sostenibles y certificados CertiPUR-US® o OEKO-TEX®. Sin químicos nocivos ni sustancias tóxicas.'
  },
  { 
    name: 'Funda lavable', 
    key: 'washable',
    icon: Droplets,
    gradient: 'from-blue-400 to-cyan-500',
    description: 'Funda extraíble y lavable a máquina. Facilita el mantenimiento higiénico y prolonga la vida útil del colchón.'
  },
  { 
    name: 'Valoración', 
    key: 'rating',
    icon: Star,
    gradient: 'from-amber-400 to-orange-500',
    description: 'Puntuación media basada en miles de opiniones verificadas de clientes reales. Indicador fiable de satisfacción general.'
  },
  { 
    name: 'Satisfacción', 
    key: 'satisfaction',
    icon: ThumbsUp,
    gradient: 'from-green-400 to-emerald-500',
    description: 'Porcentaje de clientes que recomendarían este producto a familiares y amigos después de usarlo durante 3+ meses.'
  },
]

const testimonials = [
  {
    name: 'María González',
    text: 'Después de comparar 4 colchones con esta herramienta, encontré el perfecto para mis problemas de espalda. El asesoramiento fue excepcional.',
  },
  {
    name: 'Carlos Ruiz',
    text: 'La transparencia en las características y la comparación lado a lado me dio total confianza. Compré el Ergo Max y no puedo estar más satisfecho.',
  },
  {
    name: 'Laura Martín',
    text: 'La recomendación de IA fue acertadísima. Tenía dudas entre dos modelos y el sistema me ayudó a elegir según mi forma de dormir.',
  },
]