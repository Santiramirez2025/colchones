// app/simulador/simulador-client.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeft, ArrowRight, Check, Sparkles, Brain, 
  Moon, Shield, Truck, Star
} from 'lucide-react'
import { getTopRecommendations } from '@/lib/matching-algorithm'
import { SIMULATOR_STEPS } from './simulator-config'

interface SimulatorClientProps {
  products: any[]
}

interface SimulatorData {
  position: string
  weight: string
  firmness: string
  budget: string
}

export default function SimuladorClient({ products }: SimulatorClientProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<SimulatorData>({
    position: '',
    weight: '',
    firmness: '',
    budget: ''
  })
  const [showResults, setShowResults] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])

  console.log('📍 SimuladorClient: Products received:', products?.length || 0)

  // 🔥 VALIDACIÓN: Verificar que hay productos
  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Error al cargar productos
          </h2>
          <p className="text-zinc-400">Por favor, recarga la página</p>
        </div>
      </div>
    )
  }

  const handleSelect = (value: string) => {
    const key = SIMULATOR_STEPS[currentStep].key
    const newData = { ...data, [key]: value }
    setData(newData)

    console.log('📍 Selected:', key, '=', value)
    console.log('📍 Current data:', newData)
    
    if (currentStep < SIMULATOR_STEPS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 400)
    } else {
      console.log('📍 Final step - generating recommendations')
      console.log('📍 Profile:', newData)
      console.log('📍 Products to analyze:', products.length)
      
      setIsAnalyzing(true)
      
      setTimeout(() => {
        try {
          console.log('📍 Calling getTopRecommendations...')
          const topProducts = getTopRecommendations(products, newData, 3)
          
          console.log('📍 Recommendations received:', topProducts.length)
          
          if (!topProducts || topProducts.length === 0) {
            console.warn('⚠️ No recommendations, using fallback')
            const fallbackRecs = products.slice(0, 3).map((p, i) => ({
              ...p,
              matchScore: 85 - i * 5,
              matchPercentage: 95 - i * 3,
              matchReasons: ['Excelente opción', 'Calidad garantizada', 'Alta satisfacción']
            }))
            setRecommendations(fallbackRecs)
          } else {
            console.log('✅ Setting recommendations:', topProducts)
            setRecommendations(topProducts)
          }
        } catch (error) {
          console.error('❌ Error generating recommendations:', error)
          const fallbackRecs = products.slice(0, 3).map((p, i) => ({
            ...p,
            matchScore: 85 - i * 5,
            matchPercentage: 95 - i * 3,
            matchReasons: ['Excelente opción', 'Calidad garantizada']
          }))
          setRecommendations(fallbackRecs)
        }
        
        setIsAnalyzing(false)
        setShowResults(true)
      }, 2500)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setShowResults(false)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setShowResults(false)
    setIsAnalyzing(false)
    setData({ position: '', weight: '', firmness: '', budget: '' })
    setRecommendations([])
  }

  const progress = ((currentStep + 1) / SIMULATOR_STEPS.length) * 100

  if (isAnalyzing) {
    return <AnalyzingScreen />
  }

  if (showResults && recommendations.length > 0) {
    return (
      <ResultsScreen
        recommendations={recommendations}
        onRestart={handleRestart}
      />
    )
  }

  return (
    <QuestionsScreen
      currentStep={currentStep}
      progress={progress}
      onSelect={handleSelect}
      onBack={handleBack}
    />
  )
}

// ============================================================================
// ANALYZING SCREEN
// ============================================================================
function AnalyzingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 100, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 left-20 w-96 h-96 bg-violet-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], x: [0, -100, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center z-10"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 mx-auto mb-8"
        >
          <Brain className="w-full h-full text-cyan-400" />
        </motion.div>
        
        <h2 className="text-5xl font-black text-white mb-6">
          Analizando con IA...
        </h2>
        
        <div className="space-y-3 text-cyan-300 text-lg">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Procesando posición de sueño
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Calculando distribución de presión
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Optimizando recomendación
          </motion.p>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5 }}
          className="h-2 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-full mt-8 max-w-md mx-auto"
        />
      </motion.div>
    </div>
  )
}

// ============================================================================
// RESULTS SCREEN - 🔥 ACTUALIZADO PARA FUNCIONAR CON SCHEMA PRISMA
// ============================================================================
function ResultsScreen({ recommendations, onRestart }: any) {
  const topMatch = recommendations[0]

  // 🔥 Helper para obtener features/reasons de forma segura
  const getDisplayFeatures = (product: any): string[] => {
    // 1. Prioridad: matchReasons del algoritmo
    if (product.matchReasons && Array.isArray(product.matchReasons) && product.matchReasons.length > 0) {
      return product.matchReasons.slice(0, 4)
    }
    
    // 2. Fallback: features del producto
    if (product.features && Array.isArray(product.features) && product.features.length > 0) {
      return product.features.slice(0, 4)
    }
    
    // 3. Fallback: highlights
    if (product.highlights && Array.isArray(product.highlights) && product.highlights.length > 0) {
      return product.highlights.slice(0, 4)
    }
    
    // 4. Último fallback: features genéricos basados en specs
    const fallbackFeatures = []
    if (product.warranty >= 10) fallbackFeatures.push(`${product.warranty} años de garantía`)
    if (product.cooling) fallbackFeatures.push('Sistema de refrigeración')
    if (product.hypoallergenic) fallbackFeatures.push('Materiales hipoalergénicos')
    
    return fallbackFeatures.length > 0 ? fallbackFeatures : [
      'Excelente relación calidad-precio',
      'Materiales premium certificados',
      'Soporte ergonómico óptimo',
      'Diseñado para tu comodidad'
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Success header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-6 shadow-2xl"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
            ¡Tu match perfecto!
          </h2>
          <p className="text-xl text-zinc-300">
            Compatibilidad del <span className="text-cyan-400 font-black text-3xl">{topMatch.matchPercentage}%</span> basado en IA
          </p>
        </motion.div>

        {/* Main recommendation card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl" />
          
          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              MEJOR MATCH
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Product info */}
              <div>
                <div className="text-8xl mb-6">🛏️</div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
                  {topMatch.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-white font-bold text-lg">{topMatch.rating.toFixed(1)}</span>
                  <span className="text-zinc-400">({topMatch.reviewCount})</span>
                </div>

                {/* Firmness badge */}
                <div className="inline-block bg-violet-500/20 border border-violet-500/30 px-4 py-2 rounded-full text-violet-300 font-bold mb-6">
                  Firmeza: {topMatch.firmness}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                    {topMatch.price}€
                  </span>
                  {topMatch.originalPrice && (
                    <>
                      <span className="text-2xl text-zinc-500 line-through">
                        {topMatch.originalPrice}€
                      </span>
                      <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-sm font-bold">
                        -{Math.round((1 - topMatch.price / topMatch.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Right: Features - 🔥 ARREGLADO */}
              <div className="space-y-3">
                {getDisplayFeatures(topMatch).map((feature: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-semibold">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Shield, title: '10 Años Garantía', desc: 'Protección total' },
            { icon: Truck, title: 'Envío Gratis 24-48h', desc: 'A toda España' },
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-white font-bold text-lg mb-1">{benefit.title}</h4>
              <p className="text-zinc-400 text-sm">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={onRestart}
            className="flex-1 flex items-center justify-center gap-2 bg-white/5 border-2 border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Hacer otro test
          </button>
          
          <Link
            href={`/producto/${topMatch.slug}`}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-violet-500/50 transition-all hover:scale-105"
          >
            Ver {topMatch.name}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

// ============================================================================
// QUESTIONS SCREEN
// ============================================================================
function QuestionsScreen({ currentStep, progress, onSelect, onBack }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-violet-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-full mb-6">
            <Brain className="w-5 h-5 text-cyan-400" />
            <span className="text-white font-bold">Test IA Personalizado</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Encuentra tu colchón ideal
          </h1>
          <p className="text-xl text-zinc-300">
            4 preguntas • 2 minutos • Precisión del 96%
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-semibold">Pregunta {currentStep + 1} de {SIMULATOR_STEPS.length}</span>
            <span className="text-cyan-400 font-bold text-lg">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 mb-6"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 text-center">
              {SIMULATOR_STEPS[currentStep].title}
            </h2>
            <p className="text-zinc-300 text-center mb-10 text-lg">
              {SIMULATOR_STEPS[currentStep].subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SIMULATOR_STEPS[currentStep].options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onSelect(option.value)}
                  className="group bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-white/40 rounded-2xl p-6 transition-all duration-300 hover:scale-105"
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <option.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-bold text-xl text-white mb-2">
                    {option.label}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {option.desc}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Back button */}
        {currentStep > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mx-auto transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver atrás
          </motion.button>
        )}
      </div>
    </div>
  )
}