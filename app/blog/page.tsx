'use client'

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Calendar, Clock, ArrowRight, BookOpen, 
  Check, Moon, Wind, ThermometerSun, BookMarked,
  Play, Pause, ChevronRight, Trophy,
  Lightbulb, CheckCircle2
} from 'lucide-react'

// Tipos
interface RitualStep {
  id: number
  title: string
  description: string
  icon: any
  type: 'info' | 'timer' | 'interactive' | 'journal'
  completed: boolean
  relatedArticles: number[]
}

interface DailyProgress {
  date: string
  stepsCompleted: number[]
  journalEntry: string
  breathingCycles?: number
}

export default function BlogPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [ritualSteps, setRitualSteps] = useState<RitualStep[]>([])
  const [breathingActive, setBreathingActive] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [breathingCycles, setBreathingCycles] = useState(0)
  const [journalText, setJournalText] = useState('')
  const [dailyTip, setDailyTip] = useState('')
  const [isClient, setIsClient] = useState(false)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const initialSteps: RitualStep[] = [
      {
        id: 1,
        title: 'Apaga las pantallas',
        description: 'La luz azul de los dispositivos interfiere con la producción de melatonina. Apaga tus pantallas 1 hora antes de dormir.',
        icon: Moon,
        type: 'info',
        completed: false,
        relatedArticles: [1]
      },
      {
        id: 2,
        title: 'Respira profundo',
        description: 'La respiración 4-7-8 ayuda a activar el sistema nervioso parasimpático. Inhala 4 seg, mantén 7 seg, exhala 8 seg.',
        icon: Wind,
        type: 'timer',
        completed: false,
        relatedArticles: [2]
      },
      {
        id: 3,
        title: 'Ajusta la temperatura',
        description: 'La temperatura ideal para dormir es entre 15-19°C. Un ambiente fresco mejora la calidad del sueño profundo.',
        icon: ThermometerSun,
        type: 'interactive',
        completed: false,
        relatedArticles: [3]
      },
      {
        id: 4,
        title: 'Diario del sueño',
        description: 'Registrar tus patrones de sueño te ayuda a identificar qué funciona mejor para ti. Sé consciente de tu descanso.',
        icon: BookMarked,
        type: 'journal',
        completed: false,
        relatedArticles: [1]
      }
    ]

    try {
      const savedProgress = localStorage.getItem('sleepRitualProgress')
      if (savedProgress) {
        const progress: DailyProgress = JSON.parse(savedProgress)
        const today = new Date().toDateString()
        
        if (progress.date === today) {
          setRitualSteps(initialSteps.map(step => ({
            ...step,
            completed: progress.stepsCompleted.includes(step.id)
          })))
          setJournalText(progress.journalEntry || '')
          setBreathingCycles(progress.breathingCycles || 0)
        } else {
          setRitualSteps(initialSteps)
        }
      } else {
        setRitualSteps(initialSteps)
      }
    } catch (error) {
      console.error('Error loading progress:', error)
      setRitualSteps(initialSteps)
    }

    const tips = [
      'La consistencia es clave: intenta acostarte y levantarte a la misma hora todos los días.',
      'Evita la cafeína 6 horas antes de dormir. Su vida media en el cuerpo es de 5-6 horas.',
      'Ejercicio regular mejora el sueño, pero evítalo 3 horas antes de acostarte.',
      'La exposición a luz natural durante el día mejora tu ritmo circadiano.',
      'Mantén tu habitación oscura: incluso pequeñas fuentes de luz pueden afectar el sueño.'
    ]
    setDailyTip(tips[Math.floor(Math.random() * tips.length)])
  }, [isClient])

  useEffect(() => {
    if (!isClient || ritualSteps.length === 0) return

    try {
      const progress: DailyProgress = {
        date: new Date().toDateString(),
        stepsCompleted: ritualSteps.filter(s => s.completed).map(s => s.id),
        journalEntry: journalText,
        breathingCycles
      }
      localStorage.setItem('sleepRitualProgress', JSON.stringify(progress))
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }, [ritualSteps, journalText, breathingCycles, isClient])

  useEffect(() => {
    if (!breathingActive) return

    const durations = { inhale: 4000, hold: 7000, exhale: 8000 }
    let currentPhase: 'inhale' | 'hold' | 'exhale' = 'inhale'
    
    const runPhase = () => {
      setBreathingPhase(currentPhase)
      
      const duration = durations[currentPhase]
      
      setTimeout(() => {
        if (currentPhase === 'inhale') {
          currentPhase = 'hold'
        } else if (currentPhase === 'hold') {
          currentPhase = 'exhale'
        } else {
          currentPhase = 'inhale'
          setBreathingCycles(prev => prev + 1)
        }
        
        if (breathingActive) runPhase()
      }, duration)
    }

    runPhase()
  }, [breathingActive])

  const completeStep = useCallback((stepId: number) => {
    setRitualSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ))
  }, [])

  const toggleBreathing = useCallback(() => {
    if (breathingActive) {
      if (breathingCycles >= 3) {
        completeStep(2)
      }
    } else {
      setBreathingCycles(0)
    }
    setBreathingActive(!breathingActive)
  }, [breathingActive, breathingCycles, completeStep])

  const completedSteps = ritualSteps.filter(s => s.completed).length
  const totalSteps = ritualSteps.length
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0

  const suggestedArticles = useMemo(() => {
    const currentStepData = ritualSteps[currentStep]
    if (!currentStepData) return []
    
    return essentialGuides.filter(guide => 
      currentStepData.relatedArticles.includes(guide.id)
    )
  }, [currentStep, ritualSteps])

  const navigateToArticle = useCallback((url: string) => {
    router.push(url)
  }, [router])

  return (
    <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden scroll-smooth antialiased">
      {/* Hero Section */}
      <section ref={heroRef} className="w-full border-b border-zinc-800/50">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/50 px-4 py-2 rounded-full mb-6">
                <BookOpen className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-300 font-medium text-sm">
                  Guía del Descanso Premium
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Todo sobre descanso perfecto
              </h1>
              
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Consejos respaldados por la ciencia sobre sueño saludable, ergonomía y bienestar
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Consejo del día */}
      {isClient && (
        <section className="w-full">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-amber-300 mb-1">💡 Tu consejo del día</h3>
                  <p className="text-sm text-zinc-300">{dailyTip}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Ritual del Descanso */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center">
                <Moon className="w-6 h-6 text-zinc-300" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Tu ritual del descanso</h2>
                <p className="text-sm text-zinc-400 mt-1">Completa los pasos para un sueño perfecto</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-5 py-3">
              <Trophy className={`w-6 h-6 ${progressPercentage === 100 ? 'text-amber-400' : 'text-zinc-600'}`} />
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{completedSteps}/{totalSteps}</div>
                <div className="text-xs text-zinc-500">completados</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-zinc-300 rounded-full"
              />
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {ritualSteps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`p-6 rounded-xl transition-all ${
                    step.completed
                      ? 'bg-zinc-800 border-2 border-zinc-700'
                      : isActive
                      ? 'bg-zinc-800/50 border-2 border-zinc-600'
                      : 'bg-zinc-800/30 border border-zinc-800 hover:bg-zinc-800/40'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                    step.completed ? 'bg-zinc-700' : 'bg-zinc-800/50'
                  }`}>
                    <Icon className={`w-6 h-6 ${step.completed || isActive ? 'text-white' : 'text-zinc-500'}`} />
                  </div>
                  <h3 className={`text-sm font-semibold ${step.completed || isActive ? 'text-white' : 'text-zinc-400'}`}>
                    {step.title}
                  </h3>
                </button>
              )
            })}
          </div>

          {/* Current Step Content */}
          {ritualSteps[currentStep] && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-8"
            >
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {ritualSteps[currentStep].title}
                  </h3>
                  
                  <p className="text-zinc-300 mb-6">
                    {ritualSteps[currentStep].description}
                  </p>

                  {/* Type-specific content */}
                  {ritualSteps[currentStep].type === 'timer' && (
                    <div className="space-y-6">
                      {breathingCycles > 0 && (
                        <div className="text-center">
                          <div className="text-sm text-zinc-400 mb-1">Ciclos completados</div>
                          <div className="text-3xl font-bold text-white">{breathingCycles}</div>
                        </div>
                      )}

                      <div className="relative h-64 flex items-center justify-center">
                        <motion.div
                          animate={{
                            scale: breathingActive
                              ? breathingPhase === 'exhale' ? 1 : 1.5
                              : 1,
                          }}
                          transition={{
                            duration: breathingPhase === 'inhale' ? 4 : breathingPhase === 'exhale' ? 8 : 7,
                            ease: "easeInOut"
                          }}
                          className="w-32 h-32 rounded-full bg-zinc-700 flex items-center justify-center"
                        >
                          <div className="text-white text-center">
                            <div className="text-sm font-medium mb-1">
                              {breathingActive ? (
                                breathingPhase === 'inhale' ? 'Inhala' :
                                breathingPhase === 'hold' ? 'Mantén' : 'Exhala'
                              ) : 'Listo'}
                            </div>
                            <div className="text-2xl font-bold">
                              {breathingActive ? (
                                breathingPhase === 'inhale' ? '4s' :
                                breathingPhase === 'hold' ? '7s' : '8s'
                              ) : '4-7-8'}
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      <button
                        onClick={toggleBreathing}
                        className="w-full py-4 bg-zinc-700 hover:bg-zinc-600 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
                      >
                        {breathingActive ? (
                          <>
                            <Pause className="w-5 h-5" />
                            Detener
                          </>
                        ) : (
                          <>
                            <Play className="w-5 h-5" />
                            Comenzar
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {ritualSteps[currentStep].type === 'journal' && (
                    <div className="space-y-4">
                      <textarea
                        value={journalText}
                        onChange={(e) => setJournalText(e.target.value)}
                        placeholder="Escribe tus observaciones..."
                        className="w-full h-40 px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none resize-none"
                      />
                      
                      <button
                        onClick={() => {
                          if (journalText.trim()) {
                            completeStep(ritualSteps[currentStep].id)
                          }
                        }}
                        disabled={!journalText.trim() || ritualSteps[currentStep].completed}
                        className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                          ritualSteps[currentStep].completed
                            ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                            : !journalText.trim()
                            ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                            : 'bg-zinc-700 hover:bg-zinc-600 text-white'
                        }`}
                      >
                        <BookMarked className="w-5 h-5" />
                        Guardar entrada
                      </button>
                    </div>
                  )}

                  {ritualSteps[currentStep].type === 'info' && (
                    <button
                      onClick={() => completeStep(ritualSteps[currentStep].id)}
                      disabled={ritualSteps[currentStep].completed}
                      className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                        ritualSteps[currentStep].completed
                          ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                          : 'bg-zinc-700 hover:bg-zinc-600 text-white'
                      }`}
                    >
                      <Check className="w-5 h-5" />
                      Marcar como listo
                    </button>
                  )}

                  {ritualSteps[currentStep].type === 'interactive' && (
                    <button
                      onClick={() => completeStep(ritualSteps[currentStep].id)}
                      disabled={ritualSteps[currentStep].completed}
                      className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                        ritualSteps[currentStep].completed
                          ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                          : 'bg-zinc-700 hover:bg-zinc-600 text-white'
                      }`}
                    >
                      <Check className="w-5 h-5" />
                      Temperatura ajustada
                    </button>
                  )}
                </div>

                {/* Related Articles */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Lectura recomendada
                  </h4>
                  
                  {suggestedArticles.length > 0 ? (
                    <div className="space-y-4">
                      {suggestedArticles.map((guide) => (
                        <button
                          key={guide.id}
                          onClick={() => navigateToArticle(guide.url)}
                          className="w-full text-left bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4 hover:bg-zinc-800/70 transition-all cursor-pointer"
                        >
                          <h5 className="font-semibold text-white mb-2">{guide.title}</h5>
                          <p className="text-sm text-zinc-400 mb-3">{guide.excerpt}</p>
                          <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <Clock className="w-3 h-3" />
                            {guide.readTime}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-zinc-800/30 rounded-xl p-6 text-center">
                      <p className="text-sm text-zinc-500">Explora las guías abajo</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Essential Guides */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Guías esenciales
            </h2>
            <p className="text-lg text-zinc-400">
              Información práctica que mejorará tu descanso
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {essentialGuides.map((guide) => (
              <article
                key={guide.id}
                onClick={() => navigateToArticle(guide.url)}
                className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl overflow-hidden hover:bg-zinc-800/60 transition-all cursor-pointer"
              >
                <div className="aspect-square bg-zinc-800 flex items-center justify-center text-6xl">
                  {guide.emoji}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {guide.title}
                  </h3>

                  <p className="text-sm text-zinc-400 mb-4 line-clamp-3">
                    {guide.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {guide.readTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {guide.date}
                    </div>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      navigateToArticle(guide.url)
                    }}
                    className="w-full py-3 bg-zinc-700 hover:bg-zinc-600 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
                  >
                    Leer guía
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const essentialGuides = [
  {
    id: 1,
    title: 'La guía definitiva de higiene del sueño',
    excerpt: 'Hábitos científicamente comprobados para mejorar la calidad del sueño: horarios consistentes, exposición a luz natural, evitar cafeína 6 horas antes de dormir.',
    emoji: '🌙',
    readTime: '8 min',
    date: 'Oct 2025',
    url: '/higiene-sueno'
  },
  {
    id: 2,
    title: 'Técnicas para dormirse en 10 minutos',
    excerpt: 'Método de respiración 4-7-8, relajación muscular progresiva, visualización guiada y técnica de escaneo corporal.',
    emoji: '😴',
    readTime: '6 min',
    date: 'Oct 2025',
    url: '/dormir-rapido'
  },
  {
    id: 3,
    title: 'Crea el dormitorio perfecto',
    excerpt: 'Temperatura ideal entre 15-19°C, importancia de la oscuridad total, cómo elegir el colchón y almohada correctos.',
    emoji: '🛏️',
    readTime: '7 min',
    date: 'Oct 2025',
    url: '/dormitorio-perfecto'
  }
]