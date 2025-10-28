'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, Star, Shield, Truck, Sparkles, Users, Award, Clock, 
  CheckCircle2, Play, ChevronRight, Brain, Zap, Lock, ChevronLeft, 
  BadgeCheck, TrendingUp, Heart, Package
} from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

// Animated Counter Component
function AnimatedCounter({ value, decimal = false }: { value: number; decimal?: boolean }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 })
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = decimal 
          ? latest.toFixed(1)
          : Intl.NumberFormat('es-ES').format(Math.floor(latest))
      }
    })
  }, [springValue, decimal])

  return <span ref={nodeRef}>0</span>
}

// Countdown Timer Component
function CountdownTimer() {
  const [time, setTime] = useState({ hours: 23, minutes: 45, seconds: 30 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          hours = 23
          minutes = 59
          seconds = 59
        }
        
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-2">
      {[
        { label: 'H', value: time.hours },
        { label: 'M', value: time.minutes },
        { label: 'S', value: time.seconds }
      ].map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 min-w-[40px] text-center">
              <span className="text-white font-bold text-lg tabular-nums">
                {String(item.value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-white/60 text-[10px] mt-1 font-medium">{item.label}</span>
          </div>
          {index < 2 && <span className="text-white/60 text-xl">:</span>}
        </div>
      ))}
    </div>
  )
}

// Rotating Trust Bar Component
function RotatingTrustBar() {
  const messages = [
    { icon: Lock, text: "Pago seguro SSL 🔒", color: "text-emerald-400" },
    { icon: Users, text: "Más de 50.000 clientes felices 💚", color: "text-blue-400" },
    { icon: Shield, text: "Garantía 10 años 🛡️", color: "text-purple-400" },
    { icon: BadgeCheck, text: "Hecho en España 🇪🇸", color: "text-amber-400" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [messages.length])

  const currentMessage = messages[currentIndex]

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-3 shadow-lg"
    >
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3"
          >
            <currentMessage.icon className={`w-5 h-5 ${currentMessage.color}`} />
            <span className="font-semibold text-sm">{currentMessage.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  const heroY = useTransform(scrollYProgress, [0, 0.3], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const stats = [
    { value: 52487, label: 'Clientes felices', icon: Users, suffix: '+' },
    { value: 4.9, label: 'Valoración media', icon: Star, decimal: true },
    { value: 98, label: '% Recomendación', icon: Award, suffix: '%' }
  ]

  const benefits = [
    {
      icon: Brain,
      title: 'Test Personalizado AI',
      description: '4 preguntas inteligentes que analizan tu perfil de sueño y recomiendan el colchón perfecto',
      stat: '2 min',
      gradient: 'from-indigo-400 via-purple-400 to-indigo-500',
      link: '/simulador',
      cta: 'Haz el test ahora'
    },
    {
      icon: Shield,
      title: 'Garantía Total 10 Años',
      description: 'Respaldo absoluto de calidad certificada. Tu inversión protegida a largo plazo',
      stat: '10 años',
      gradient: 'from-purple-400 via-pink-400 to-purple-500',
      link: '/garantias',
      cta: 'Ver garantía'
    },
    {
      icon: Zap,
      title: '100 Noches de Prueba',
      description: 'Duerme tranquilo, pruébalo en casa. Si no te convence, lo recogemos gratis',
      stat: '100%',
      gradient: 'from-amber-400 via-orange-400 to-amber-500',
      link: '/prueba',
      cta: 'Más información'
    }
  ]

  const testimonials = [
    {
      name: 'María González',
      role: 'Arquitecta, Madrid',
      text: 'Después de años con dolor de espalda crónico, este colchón literalmente cambió mi vida. El simulador AI acertó completamente con mi perfil. Ahora despierto sin dolor.',
      rating: 5,
      image: '/testimonials/maria.jpg',
      verified: true
    },
    {
      name: 'Carlos Ruiz',
      role: 'Empresario, Barcelona',
      text: 'Calidad premium a precio justo. La entrega fue impecable y el equipo súper profesional. Mi mujer y yo estamos encantados. Mejor inversión del año.',
      rating: 5,
      image: '/testimonials/carlos.jpg',
      verified: true
    },
    {
      name: 'Ana Martín',
      role: 'Profesora, Valencia',
      text: 'Mi hijo de 7 años duerme toda la noche desde que cambiamos su colchón. Como madre, no puedo estar más agradecida. ¡Recomendado 100%!',
      rating: 5,
      image: '/testimonials/ana.jpg',
      verified: true
    },
    {
      name: 'Roberto Sánchez',
      role: 'Médico, Sevilla',
      text: 'Como profesional de la salud, valoro mucho la tecnología aplicada al descanso. Este colchón cumple todos los estándares. Excelente para la columna.',
      rating: 5,
      image: '/testimonials/roberto.jpg',
      verified: true
    }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="bg-[#fafafa] pb-16">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Rotating Trust Bar */}
      <RotatingTrustBar />

      {/* HERO ULTRA PREMIUM */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        {/* Animated background */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          {/* Improved blob animations */}
          <div className="absolute inset-0 opacity-20">
            <motion.div 
              animate={{ 
                x: [0, 100, -50, 0],
                y: [0, -100, 50, 0],
                scale: [1, 1.2, 0.9, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl"
            />
            <motion.div 
              animate={{ 
                x: [0, -100, 100, 0],
                y: [0, 100, -50, 0],
                scale: [1, 0.8, 1.3, 1]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
            />
            <motion.div 
              animate={{ 
                x: [0, 50, -100, 0],
                y: [0, -50, 100, 0],
                scale: [1, 1.1, 0.9, 1]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl"
            />
          </div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "anticipate" }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full mb-8 shadow-2xl"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span className="text-white font-bold text-sm">
                Más de 50.000 personas ya descansan mejor
              </span>
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"
                  />
                ))}
              </div>
            </motion.div>

            {/* Main headline with tracking */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-[1.05] tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Duerme como
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  nunca antes
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
                  className="absolute bottom-3 left-0 h-5 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-lg"
                />
              </span>
            </motion.h1>

            {/* Emotional subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="text-lg md:text-xl text-indigo-200 mb-6 leading-relaxed max-w-2xl mx-auto font-medium"
            >
              El descanso que tu cuerpo siempre necesitó
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Tecnología <span className="text-white font-bold">de última generación</span> y diseño premium personalizado para ti
            </motion.p>

            {/* Trust indicators - Top of fold */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-6 mb-10"
            >
              {[
                { icon: BadgeCheck, text: 'Fabricado en España 🇪🇸' },
                { icon: Lock, text: 'Pago seguro SSL' },
                { icon: Shield, text: 'Garantía 10 años' }
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl"
                >
                  <item.icon className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/90 text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link 
                href="/simulador"
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                />
                <span className="relative">Encuentra tu colchón ideal</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="relative w-5 h-5" />
                </motion.div>
              </Link>

              <button
                onClick={() => setVideoPlaying(true)}
                className="group inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
              >
                <Play className="w-5 h-5 fill-current" />
                Ver cómo funciona
              </button>
            </motion.div>

            {/* Additional trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-white/80">Envío gratis 24-48h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-white/80">100 noches de prueba</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-white/80">Devolución gratuita</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs font-medium uppercase tracking-wider">Descubre más</span>
            <ChevronRight className="w-5 h-5 rotate-90" />
          </div>
        </motion.div>
      </section>

      {/* STATS SECTION WITH ANIMATED COUNTERS */}
      <section ref={statsRef} className="relative py-20 bg-gradient-to-b from-white via-indigo-50/30 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
              Números que hablan
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className="relative group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-indigo-200 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white mb-6 group-hover:scale-110 transition-transform duration-500">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  
                  <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                    <AnimatedCounter value={stat.value} decimal={stat.decimal} />
                    {stat.suffix}
                  </div>
                  
                  <p className="text-gray-600 font-semibold text-lg">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-gray-500 mt-8"
          >
            Datos auditados 2025 por <span className="text-indigo-600 font-semibold">DormirMejor.es</span>
          </motion.p>
        </div>
      </section>

      {/* BENEFITS SECTION - IMPROVED */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
              ¿Por qué elegirnos?
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Tecnología y confianza
              <br />
              en cada detalle
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: "anticipate" }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="relative h-full bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 overflow-hidden">
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon with 3D effect */}
                  <motion.div 
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                    transition={{ duration: 0.3 }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} text-white mb-6 shadow-lg relative`}
                  >
                    <benefit.icon className="w-8 h-8 relative z-10" />
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.gradient} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                  </motion.div>

                  {/* Badge */}
                  <div className="absolute top-8 right-8">
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${benefit.gradient} text-white text-xs font-bold shadow-lg`}>
                      {benefit.stat}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text transition-all">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {benefit.description}
                  </p>

                  {/* Floating CTA for AI Test */}
                  {benefit.link === '/simulador' && (
                    <Link href={benefit.link}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
                      >
                        <span>{benefit.cta}</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </Link>
                  )}

                  {benefit.link !== '/simulador' && (
                    <Link href={benefit.link} className="flex items-center text-purple-600 font-bold group/link">
                      <span className="relative">
                        {benefit.cta}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover/link:w-full transition-all duration-300" />
                      </span>
                      <ChevronRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform ml-1" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Microcopy */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-gray-500 mt-12 flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4 text-indigo-600" />
            <span>Sin compromiso • Protegido por SSL • Certificado ISO 9001</span>
          </motion.p>
        </div>
      </section>

      {/* TESTIMONIALS WITH CAROUSEL */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
              <BadgeCheck className="w-4 h-4" />
              <span>Verificado por clientes reales</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Miles de personas ya
              <br />
              duermen mejor
            </h2>
            
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-gray-600 font-medium">
              4.9/5 basado en <span className="text-gray-900 font-bold">5,247 reseñas verificadas</span>
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="relative max-w-5xl mx-auto mt-16">
            <div className="relative overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100"
                >
                  <div className="grid md:grid-cols-[300px,1fr] gap-8 items-center">
                    {/* Image */}
                    <div className="relative">
                      <div className="aspect-square rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          👤
                        </div>
                      </div>
                      {testimonials[currentTestimonial].verified && (
                        <div className="absolute -top-3 -right-3 bg-emerald-500 text-white rounded-full p-2 shadow-lg">
                          <BadgeCheck className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="text-left">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      
                      <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-6 font-medium">
                        "{testimonials[currentTestimonial].text}"
                      </p>
                      
                      <div>
                        <div className="text-xl font-bold text-gray-900">
                          {testimonials[currentTestimonial].name}
                        </div>
                        <div className="text-gray-600">
                          {testimonials[currentTestimonial].role}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center border border-gray-200 hover:border-indigo-300 group"
              aria-label="Anterior testimonio"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-indigo-600 transition-colors" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center border border-gray-200 hover:border-indigo-300 group"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-indigo-600 transition-colors" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'w-8 bg-gradient-to-r from-indigo-600 to-purple-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ver testimonio ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* URGENCY CTA WITH COUNTDOWN */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500" />
        
        {/* Improved animated blobs */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, 100, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 0.8, 1.2],
              x: [0, -100, 0],
              y: [0, 100, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-300/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Urgency badge with countdown */}
            <div className="inline-flex flex-col items-center gap-4 bg-white/15 backdrop-blur-xl border border-white/30 px-6 py-4 rounded-2xl mb-8 shadow-2xl">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-300" />
                <span className="text-white font-bold">Oferta especial termina en</span>
              </div>
              <CountdownTimer />
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              ¿Listo para el mejor
              <br />
              descanso de tu vida?
            </h2>
            
            <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              Descubre tu colchón perfecto en <span className="font-black">menos de 2 minutos</span> con nuestro simulador inteligente
            </p>

            <Link
              href="/simulador"
              className="group inline-flex items-center gap-3 bg-white text-purple-600 px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-[1.02]"
            >
              Empezar ahora gratis
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>

            {/* Mini review with stars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-white font-semibold text-sm">
                "Cambió mi forma de dormir" - Ana M.
              </span>
            </motion.div>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-white/90 text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>100% gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>Resultados instantáneos</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}