'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  ArrowLeft, ArrowRight, Check, Sparkles, Brain, Zap, 
  Moon, Bed, Weight, Activity, Euro, Shield, Truck, 
  Award, Star, ChevronRight, Heart, TrendingUp, Package
} from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'

interface SimulatorData {
  position: string
  weight: string
  firmness: string
  budget: string
}

const steps = [
  {
    id: 1,
    title: '¿Cuál es tu posición preferida para dormir?',
    subtitle: 'Esto determina la distribución de presión ideal',
    options: [
      { value: 'side', label: 'De lado', icon: Moon, desc: 'Necesitas soporte lumbar', gradient: 'from-blue-500 to-cyan-500' },
      { value: 'back', label: 'Boca arriba', icon: Bed, desc: 'Balance perfecto', gradient: 'from-purple-500 to-pink-500' },
      { value: 'stomach', label: 'Boca abajo', icon: Activity, desc: 'Firmeza extra', gradient: 'from-orange-500 to-red-500' },
      { value: 'mixed', label: 'Varía', icon: TrendingUp, desc: 'Adaptabilidad máxima', gradient: 'from-green-500 to-emerald-500' }
    ],
    key: 'position' as keyof SimulatorData
  },
  {
    id: 2,
    title: '¿Cuál es tu peso aproximado?',
    subtitle: 'Para calcular el soporte óptimo de tu colchón',
    options: [
      { value: 'light', label: 'Menos de 60kg', icon: Weight, desc: 'Suavidad ideal', gradient: 'from-cyan-500 to-blue-500' },
      { value: 'medium', label: '60-90kg', icon: Activity, desc: 'Balance perfecto', gradient: 'from-purple-500 to-pink-500' },
      { value: 'heavy', label: 'Más de 90kg', icon: Zap, desc: 'Soporte reforzado', gradient: 'from-orange-500 to-red-500' }
    ],
    key: 'weight' as keyof SimulatorData
  },
  {
    id: 3,
    title: '¿Qué firmeza prefieres?',
    subtitle: 'Tu confort personal es clave',
    options: [
      { value: 'soft', label: 'Suave', icon: Moon, desc: 'Sensación nube', gradient: 'from-blue-400 to-cyan-400' },
      { value: 'medium', label: 'Media', icon: Award, desc: 'Lo más popular', gradient: 'from-purple-500 to-pink-500' },
      { value: 'firm', label: 'Firme', icon: Shield, desc: 'Máximo soporte', gradient: 'from-gray-600 to-gray-800' }
    ],
    key: 'firmness' as keyof SimulatorData
  },
  {
    id: 4,
    title: '¿Cuál es tu presupuesto?',
    subtitle: 'Tenemos opciones premium en todos los rangos',
    options: [
      { value: 'economic', label: 'Hasta 500€', icon: Euro, desc: 'Calidad accesible', gradient: 'from-green-500 to-emerald-500' },
      { value: 'standard', label: '500-1000€', icon: Package, desc: 'Mejor relación', gradient: 'from-purple-500 to-pink-500' },
      { value: 'premium', label: 'Más de 1000€', icon: Sparkles, desc: 'Tecnología top', gradient: 'from-yellow-500 to-orange-500' }
    ],
    key: 'budget' as keyof SimulatorData
  }
]

const recommendations: Record<string, any> = {
  'side-light-soft-economic': { 
    name: 'Confort Plus', 
    price: 449, 
    oldPrice: 599,
    firmness: 'Media-Suave',
    rating: 4.7,
    reviews: 234,
    features: ['Memory Foam 5 capas', 'Termorregulador', 'Hipoalergénico', 'Garantía 10 años'],
    emoji: '☁️'
  },
  'side-light-soft-standard': { 
    name: 'Premium Dream', 
    price: 699,
    oldPrice: 899, 
    firmness: 'Suave',
    rating: 4.9,
    reviews: 567,
    features: ['Memory Foam 7 capas', 'Gel refrigerante', 'Anti-ácaros', 'Bordes reforzados'],
    emoji: '✨'
  },
  'default': { 
    name: 'Equilibrio Total', 
    price: 599,
    oldPrice: 749,
    firmness: 'Media',
    rating: 4.8,
    reviews: 892,
    features: ['Núcleo híbrido', 'Transpirable', 'Adaptable', 'Certificado ISO'],
    emoji: '🎯'
  }
}

export default function SimuladorPage() {
  const containerRef = useRef(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<SimulatorData>({
    position: '',
    weight: '',
    firmness: '',
    budget: ''
  })
  const [showResults, setShowResults] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleSelect = (value: string) => {
    const key = steps[currentStep].key
    setData({ ...data, [key]: value })
    
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 400)
    } else {
      setIsAnalyzing(true)
      setTimeout(() => {
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

  const getRecommendation = () => {
    const key = `${data.position}-${data.weight}-${data.firmness}-${data.budget}`
    return recommendations[key] || recommendations.default
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  // LOADING SCREEN - AI ANALYZING
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, 100, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
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
          
          <h2 className="text-4xl font-black text-white mb-4">
            Analizando tu perfil con IA...
          </h2>
          
          <div className="space-y-2 text-cyan-300 text-lg">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              ✓ Procesando posición de sueño
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              ✓ Calculando distribución de presión
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              ✓ Optimizando recomendación
            </motion.p>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5 }}
            className="h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full mt-8 max-w-md mx-auto"
          />
        </motion.div>
      </div>
    )
  }

  // RESULTS SCREEN
  if (showResults) {
    const recommendation = getRecommendation()
    
    return (
      <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 relative overflow-hidden">
        {/* Animated background */}
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        </motion.div>

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
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 shadow-2xl"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
              ¡Tu colchón perfecto!
            </h2>
            <p className="text-xl text-gray-300">
              Basado en IA y análisis de <span className="text-cyan-400 font-bold">miles de datos</span>
            </p>
          </motion.div>

          {/* Main recommendation card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden"
          >
            {/* Gradient overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
            
            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Sparkles className="w-4 h-4" />
                <span>RECOMENDACIÓN IA</span>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left: Product info */}
                <div>
                  <div className="text-7xl mb-4">{recommendation.emoji}</div>
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-3">
                    {recommendation.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-white font-bold">{recommendation.rating}</span>
                    <span className="text-gray-400">({recommendation.reviews} reseñas)</span>
                  </div>

                  <div className="inline-block bg-purple-500/30 backdrop-blur-sm border border-purple-400/50 px-4 py-2 rounded-full text-purple-200 font-semibold mb-6">
                    Firmeza: {recommendation.firmness}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {recommendation.price}€
                    </span>
                    {recommendation.oldPrice && (
                      <>
                        <span className="text-2xl text-gray-400 line-through">
                          {recommendation.oldPrice}€
                        </span>
                        <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-bold">
                          -{Math.round((1 - recommendation.price / recommendation.oldPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right: Features */}
                <div className="space-y-3">
                  {recommendation.features.map((feature: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-semibold">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Shield, title: '10 Años Garantía', desc: 'Protección total' },
              { icon: Truck, title: 'Envío Gratis 24-48h', desc: 'A toda España' },
              { icon: Moon, title: '100 Noches Prueba', desc: 'Devolución gratis' }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-white font-bold text-lg mb-1">{benefit.title}</h4>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
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
              onClick={() => {
                setCurrentStep(0)
                setShowResults(false)
                setData({ position: '', weight: '', firmness: '', budget: '' })
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Volver a empezar</span>
            </button>
            
            <Link
              href="/catalogo"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 group"
            >
              <span>Ver en catálogo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -50px) scale(1.1); }
            50% { transform: translate(-20px, 20px) scale(0.9); }
            75% { transform: translate(50px, 50px) scale(1.05); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    )
  }

  // QUESTIONS SCREEN
  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2.5 rounded-full mb-6">
            <Brain className="w-5 h-5 text-cyan-400" />
            <span className="text-white font-bold">Test IA Personalizado</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            Encuentra tu colchón ideal
          </h1>
          <p className="text-xl text-gray-300">
            4 preguntas científicas • 2 minutos • Precisión del 96%
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-semibold">Pregunta {currentStep + 1} de {steps.length}</span>
            <span className="text-cyan-400 font-bold text-lg">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 mb-6"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 text-center">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-300 text-center mb-10 text-lg">
              {steps[currentStep].subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps[currentStep].options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSelect(option.value)}
                  className="group relative bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-white/40 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <option.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-bold text-xl text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
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
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mx-auto transition group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Volver atrás</span>
          </motion.button>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}