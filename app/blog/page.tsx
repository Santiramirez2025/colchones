'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Calendar, Clock, ArrowRight, BookOpen, 
  Bookmark, Check, Moon, Sunrise,
  Wind, ThermometerSun, BookMarked, Volume2,
  VolumeX, Play, Pause, ChevronRight, Trophy,
  Lightbulb, CheckCircle2
} from 'lucide-react'

// Tipos para el ritual del descanso
interface RitualStep {
  id: number
  title: string
  description: string
  icon: any
  type: 'info' | 'timer' | 'interactive' | 'audio' | 'journal'
  completed: boolean
  relatedArticles: number[]
}

interface DailyProgress {
  date: string
  stepsCompleted: number[]
  journalEntry: string
}

export default function BlogPage() {
  // Estados del ritual del descanso
  const [currentStep, setCurrentStep] = useState(0)
  const [ritualSteps, setRitualSteps] = useState<RitualStep[]>([])
  const [breathingActive, setBreathingActive] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [journalText, setJournalText] = useState('')
  const [dailyTip, setDailyTip] = useState('')

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Inicializar ritual del descanso
  useEffect(() => {
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
        title: 'Medita o relaja',
        description: 'La meditación nocturna reduce el cortisol y prepara tu mente para el descanso. 10 minutos pueden marcar la diferencia.',
        icon: Volume2,
        type: 'audio',
        completed: false,
        relatedArticles: [2]
      },
      {
        id: 5,
        title: 'Diario del sueño',
        description: 'Registrar tus patrones de sueño te ayuda a identificar qué funciona mejor para ti. Sé consciente de tu descanso.',
        icon: BookMarked,
        type: 'journal',
        completed: false,
        relatedArticles: [1]
      }
    ]

    // Cargar progreso desde localStorage
    const savedProgress = localStorage.getItem('sleepRitualProgress')
    if (savedProgress) {
      const progress: DailyProgress = JSON.parse(savedProgress)
      const today = new Date().toDateString()
      
      if (progress.date === today) {
        setRitualSteps(initialSteps.map(step => ({
          ...step,
          completed: progress.stepsCompleted.includes(step.id)
        })))
        setJournalText(progress.journalEntry)
      } else {
        setRitualSteps(initialSteps)
      }
    } else {
      setRitualSteps(initialSteps)
    }

    // Generar consejo diario aleatorio
    const tips = [
      'La consistencia es clave: intenta acostarte y levantarte a la misma hora todos los días, incluso los fines de semana.',
      'Evita la cafeína 6 horas antes de dormir. Su vida media en el cuerpo es de 5-6 horas.',
      'Ejercicio regular mejora el sueño, pero evítalo 3 horas antes de acostarte.',
      'Tu colchón debe renovarse cada 7-10 años para mantener el soporte adecuado.',
      'La exposición a luz natural durante el día mejora tu ritmo circadiano.',
      'Una almohada adecuada puede reducir el dolor de cuello hasta un 50%.',
      'Los baños tibios 90 minutos antes de dormir aumentan la calidad del sueño.',
      'Mantén tu habitación oscura: incluso pequeñas fuentes de luz pueden afectar el sueño.'
    ]
    const randomTip = tips[Math.floor(Math.random() * tips.length)]
    setDailyTip(randomTip)
  }, [])

  // Guardar progreso en localStorage
  useEffect(() => {
    if (ritualSteps.length > 0) {
      const progress: DailyProgress = {
        date: new Date().toDateString(),
        stepsCompleted: ritualSteps.filter(s => s.completed).map(s => s.id),
        journalEntry: journalText
      }
      localStorage.setItem('sleepRitualProgress', JSON.stringify(progress))
    }
  }, [ritualSteps, journalText])

  // Animación de respiración
  useEffect(() => {
    if (!breathingActive) return

    const phases: Array<'inhale' | 'hold' | 'exhale'> = ['inhale', 'hold', 'exhale']
    const durations = { inhale: 4000, hold: 7000, exhale: 8000 }
    let currentPhaseIndex = 0

    const breathingInterval = setInterval(() => {
      setBreathingPhase(phases[currentPhaseIndex])
      currentPhaseIndex = (currentPhaseIndex + 1) % 3
    }, durations[breathingPhase])

    return () => clearInterval(breathingInterval)
  }, [breathingActive, breathingPhase])

  const completeStep = (stepId: number) => {
    setRitualSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ))
  }

  const toggleBreathing = () => {
    setBreathingActive(!breathingActive)
    if (breathingActive) {
      completeStep(2)
    }
  }

  const completedSteps = ritualSteps.filter(s => s.completed).length
  const totalSteps = ritualSteps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  // Artículos sugeridos según progreso
  const getSuggestedArticles = () => {
    const currentStepData = ritualSteps[currentStep]
    if (!currentStepData) return []
    
    return essentialGuides.filter(guide => 
      currentStepData.relatedArticles.includes(guide.id)
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/20 px-5 py-2 rounded-full mb-6"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300 font-semibold text-sm">
                  Guía del Descanso Premium
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                Todo sobre
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  descanso perfecto
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Consejos respaldados por la ciencia sobre sueño saludable, ergonomía y bienestar
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Consejo del día - Sticky */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-4 z-40 container mx-auto px-4 mb-8"
      >
        <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-pink-500/20 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-amber-300 mb-1">💡 Tu consejo del día</h3>
              <p className="text-sm text-gray-300">{dailyTip}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SECCIÓN: Ritual del Descanso */}
      <section className="relative container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          {/* Header del ritual */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">💤 Tu ritual del descanso</h2>
                <p className="text-gray-400 text-sm">Completa los pasos para un sueño perfecto</p>
              </div>
            </div>
            
            {/* Barra de progreso */}
            <div className="hidden md:flex items-center gap-3">
              <Trophy className={`w-6 h-6 ${progressPercentage === 100 ? 'text-yellow-400' : 'text-gray-600'}`} />
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{completedSteps}/{totalSteps}</div>
                <div className="text-xs text-gray-400">pasos completados</div>
              </div>
            </div>
          </div>

          {/* Barra de progreso visual */}
          <div className="mb-8">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-xl">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full relative"
              >
                {progressPercentage === 100 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <div className="w-4 h-4 text-yellow-300">⭐</div>
                  </motion.div>
                )}
              </motion.div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Inicio</span>
              <span>{progressPercentage.toFixed(0)}% completado</span>
              <span>Listo para dormir</span>
            </div>
          </div>

          {/* Steps del ritual */}
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {ritualSteps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              
              return (
                <motion.button
                  key={step.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setCurrentStep(index)}
                  className={`relative group p-6 rounded-2xl transition-all ${
                    step.completed
                      ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50'
                      : isActive
                      ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 scale-105'
                      : 'bg-white/5 border-2 border-white/10 hover:border-purple-500/30 hover:bg-white/10'
                  }`}
                >
                  {/* Número del paso */}
                  <div className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step.completed
                      ? 'bg-green-500 text-white'
                      : isActive
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-gray-400'
                  }`}>
                    {step.completed ? <Check className="w-5 h-5" /> : index + 1}
                  </div>

                  {/* Icono */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    step.completed
                      ? 'bg-green-500/20'
                      : isActive
                      ? 'bg-purple-500/20'
                      : 'bg-white/10'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      step.completed
                        ? 'text-green-400'
                        : isActive
                        ? 'text-purple-400'
                        : 'text-gray-400'
                    }`} />
                  </div>

                  {/* Título */}
                  <h3 className={`text-sm font-bold mb-1 ${
                    step.completed || isActive ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </h3>

                  {/* Indicador activo */}
                  {isActive && (
                    <motion.div
                      layoutId="activeStep"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-500 rounded-full"
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Contenido del paso actual */}
          <AnimatePresence mode="wait">
            {ritualSteps[currentStep] && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Columna izquierda: Información */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      {React.createElement(ritualSteps[currentStep].icon, {
                        className: "w-8 h-8 text-purple-400"
                      })}
                      <h3 className="text-2xl font-bold text-white">
                        {ritualSteps[currentStep].title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {ritualSteps[currentStep].description}
                    </p>

                    {/* Contenido interactivo según el tipo */}
                    {ritualSteps[currentStep].type === 'info' && (
                      <button
                        onClick={() => completeStep(ritualSteps[currentStep].id)}
                        disabled={ritualSteps[currentStep].completed}
                        className={`w-full py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                          ritualSteps[currentStep].completed
                            ? 'bg-green-500/20 text-green-300 cursor-not-allowed'
                            : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400'
                        }`}
                      >
                        {ritualSteps[currentStep].completed ? (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            Completado
                          </>
                        ) : (
                          <>
                            <Check className="w-5 h-5" />
                            Marcar como listo
                          </>
                        )}
                      </button>
                    )}

                    {ritualSteps[currentStep].type === 'timer' && (
                      <div className="space-y-4">
                        {/* Visualización de respiración */}
                        <div className="relative h-64 flex items-center justify-center">
                          <motion.div
                            animate={{
                              scale: breathingActive
                                ? breathingPhase === 'inhale'
                                  ? [1, 1.5]
                                  : breathingPhase === 'hold'
                                  ? 1.5
                                  : [1.5, 1]
                                : 1,
                            }}
                            transition={{
                              duration: breathingPhase === 'inhale' ? 4 : breathingPhase === 'exhale' ? 8 : 7,
                              ease: "easeInOut"
                            }}
                            className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center"
                          >
                            <div className="text-white text-center">
                              <div className="text-sm font-semibold mb-1">
                                {breathingActive ? (
                                  breathingPhase === 'inhale' ? 'Inhala' :
                                  breathingPhase === 'hold' ? 'Mantén' : 'Exhala'
                                ) : 'Listo'}
                              </div>
                              <div className="text-2xl font-bold">
                                {breathingActive ? (
                                  breathingPhase === 'inhale' ? '4' :
                                  breathingPhase === 'hold' ? '7' : '8'
                                ) : '4-7-8'}
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        <button
                          onClick={toggleBreathing}
                          className="w-full py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400 transition-all"
                        >
                          {breathingActive ? (
                            <>
                              <Pause className="w-5 h-5" />
                              Detener ejercicio
                            </>
                          ) : (
                            <>
                              <Play className="w-5 h-5" />
                              Comenzar respiración
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {ritualSteps[currentStep].type === 'interactive' && (
                      <div className="space-y-4">
                        <div className="bg-white/5 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400">Temperatura recomendada:</span>
                            <span className="text-2xl font-bold text-cyan-400">15-19°C</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Un ambiente fresco ayuda a tu cuerpo a reducir su temperatura interna, señal clave para el sueño profundo.
                          </div>
                        </div>
                        
                        <button
                          onClick={() => completeStep(ritualSteps[currentStep].id)}
                          disabled={ritualSteps[currentStep].completed}
                          className={`w-full py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                            ritualSteps[currentStep].completed
                              ? 'bg-green-500/20 text-green-300 cursor-not-allowed'
                              : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400'
                          }`}
                        >
                          {ritualSteps[currentStep].completed ? (
                            <>
                              <CheckCircle2 className="w-5 h-5" />
                              Temperatura ajustada
                            </>
                          ) : (
                            <>
                              <Check className="w-5 h-5" />
                              Ya ajusté la temperatura
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {ritualSteps[currentStep].type === 'audio' && (
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 text-center">
                          <motion.div
                            animate={{
                              scale: audioPlaying ? [1, 1.1, 1] : 1,
                              rotate: audioPlaying ? [0, 5, -5, 0] : 0
                            }}
                            transition={{ duration: 2, repeat: audioPlaying ? Infinity : 0 }}
                            className="text-6xl mb-4"
                          >
                            🎵
                          </motion.div>
                          <p className="text-sm text-gray-400 mb-4">
                            Sonidos relajantes para meditación nocturna
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setAudioPlaying(!audioPlaying)
                            if (!audioPlaying) {
                              setTimeout(() => {
                                completeStep(ritualSteps[currentStep].id)
                              }, 3000)
                            }
                          }}
                          className="w-full py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400 transition-all"
                        >
                          {audioPlaying ? (
                            <>
                              <VolumeX className="w-5 h-5" />
                              Detener sonidos
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-5 h-5" />
                              Reproducir meditación guiada
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
                          placeholder="¿Cómo dormiste anoche? ¿Qué te ayudó o qué te despertó? Escribe tus observaciones..."
                          className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none transition-all resize-none"
                        />
                        
                        <button
                          onClick={() => {
                            if (journalText.trim()) {
                              completeStep(ritualSteps[currentStep].id)
                            }
                          }}
                          disabled={!journalText.trim() || ritualSteps[currentStep].completed}
                          className={`w-full py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                            ritualSteps[currentStep].completed
                              ? 'bg-green-500/20 text-green-300 cursor-not-allowed'
                              : !journalText.trim()
                              ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400'
                          }`}
                        >
                          {ritualSteps[currentStep].completed ? (
                            <>
                              <CheckCircle2 className="w-5 h-5" />
                              Entrada guardada
                            </>
                          ) : (
                            <>
                              <BookMarked className="w-5 h-5" />
                              Guardar entrada
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Columna derecha: Artículos relacionados */}
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple-400" />
                      Lectura recomendada
                    </h4>
                    
                    <div className="space-y-3">
                      {getSuggestedArticles().map((guide) => (
                        <motion.div
                          key={guide.id}
                          whileHover={{ scale: 1.02 }}
                          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-purple-500/50 transition-all cursor-pointer group"
                        >
                          <div className="flex gap-3">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${guide.gradient} flex items-center justify-center flex-shrink-0`}>
                              <span className="text-2xl">{guide.emoji}</span>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-bold text-white text-sm mb-1 group-hover:text-purple-400 transition-colors">
                                {guide.title}
                              </h5>
                              <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                                {guide.excerpt}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                {guide.readTime}
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                        </motion.div>
                      ))}
                      
                      {getSuggestedArticles().length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p className="text-sm">No hay artículos relacionados</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navegación entre pasos */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="px-6 py-2 rounded-xl font-semibold text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    ← Anterior
                  </button>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Paso {currentStep + 1} de {totalSteps}</div>
                  </div>
                  
                  <button
                    onClick={() => setCurrentStep(Math.min(totalSteps - 1, currentStep + 1))}
                    disabled={currentStep === totalSteps - 1}
                    className="px-6 py-2 rounded-xl font-semibold text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    Siguiente →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mensaje de felicitación al completar todo */}
          {progressPercentage === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 backdrop-blur-xl border-2 border-green-500/50 rounded-3xl p-8 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">
                ¡Felicitaciones! 🎉
              </h3>
              <p className="text-gray-300 mb-4">
                Has completado tu ritual del descanso. Estás listo para una noche de sueño reparador.
              </p>
              <button
                onClick={() => {
                  setRitualSteps(prev => prev.map(s => ({ ...s, completed: false })))
                  setCurrentStep(0)
                  setJournalText('')
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white transition-all"
              >
                Reiniciar ritual mañana
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* SECCIÓN: Guías Esenciales (Solo 3 artículos) */}
      <section className="relative container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-3">
            📚 Guías esenciales para tu mejor descanso
          </h2>
          <p className="text-gray-400 text-lg">
            Información práctica y científica que realmente mejorará tu sueño
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {essentialGuides.map((guide, index) => (
            <motion.article
              key={guide.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 hover:scale-[1.03] transition-all cursor-pointer"
              onClick={() => window.location.href = guide.url}
            >
              {/* Emoji grande */}
              <div className={`relative h-56 bg-gradient-to-br ${guide.gradient} flex items-center justify-center`}>
                <motion.span
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-8xl"
                >
                  {guide.emoji}
                </motion.span>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {guide.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-4">
                  {guide.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
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
                    window.location.href = guide.url
                  }}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 group/btn"
                >
                  Leer guía completa
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CSS Animations */}
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

// Solo 3 guías esenciales y prácticas
const essentialGuides = [
  {
    id: 1,
    title: 'La guía definitiva de higiene del sueño',
    excerpt: 'Hábitos científicamente comprobados para mejorar la calidad del sueño: horarios consistentes, exposición a luz natural, evitar cafeína 6 horas antes de dormir, rutina nocturna relajante, y mantener tu habitación oscura y fresca.',
    emoji: '🌙',
    readTime: '8 min',
    date: 'Oct 2025',
    gradient: 'from-purple-600 to-indigo-700',
    url: '/higiene-sueno' // Ruta a HigieneSueno.tsx
  },
  {
    id: 2,
    title: 'Técnicas comprobadas para dormirse en 10 minutos',
    excerpt: 'Método de respiración 4-7-8, relajación muscular progresiva, visualización guiada y técnica de escaneo corporal. Estrategias efectivas respaldadas por la ciencia del sueño para conciliar el sueño rápidamente.',
    emoji: '😴',
    readTime: '6 min',
    date: 'Oct 2025',
    gradient: 'from-cyan-600 to-blue-700',
    url: '/dormir-rapido' // Ruta a DormirRapido.tsx
  },
  {
    id: 3,
    title: 'Crea el dormitorio perfecto para dormir mejor',
    excerpt: 'Temperatura ideal entre 15-19°C, importancia de la oscuridad total, cómo elegir el colchón y almohada correctos, beneficios de materiales transpirables, y estrategias para reducir el ruido ambiental.',
    emoji: '🛏️',
    readTime: '7 min',
    date: 'Oct 2025',
    gradient: 'from-emerald-600 to-teal-700',
    url: '/dormitorio-perfecto' // Ruta a DormitorioPerfecto.tsx
  }
]