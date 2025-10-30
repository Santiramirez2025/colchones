'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  ThermometerSun, Moon, Volume2, Bed, Wind, 
  ArrowLeft, Clock, Calendar, CheckCircle2, 
  Lightbulb, Eye, Shirt, AlertTriangle
} from 'lucide-react'

export default function DormitorioPerfecto() {
  const factors = [
    {
      icon: ThermometerSun,
      title: 'Temperatura ideal',
      optimal: '15-19°C (60-67°F)',
      description: 'La temperatura corporal debe bajar para iniciar el sueño. Un ambiente fresco facilita este proceso.',
      gradient: 'from-blue-500 to-cyan-600',
      tips: [
        'Usa ventilador o aire acondicionado en verano',
        'Abre ventana en invierno si es posible',
        'Una habitación más fría es mejor que una cálida',
        'Usa ropa ligera y transpirable'
      ],
      science: 'Tu temperatura corporal baja ~1°C durante el sueño profundo. Una habitación fresca acelera este proceso.',
      investment: 'Bajo - $0-50 (ventilador) o Medio - $200-500 (aire acondicionado)'
    },
    {
      icon: Moon,
      title: 'Oscuridad total',
      optimal: '0 lux (completamente oscuro)',
      description: 'Cualquier fuente de luz puede suprimir la melatonina, incluso con ojos cerrados.',
      gradient: 'from-indigo-500 to-purple-600',
      tips: [
        'Cortinas blackout 100% opacas',
        'Cubre LEDs de electrónicos con cinta opaca',
        'Elimina luz de pasillo bajo la puerta',
        'Usa antifaz si no puedes oscurecer completamente'
      ],
      science: 'Tus ojos detectan luz incluso cerrados. La oscuridad total maximiza la producción de melatonina.',
      investment: 'Bajo - $20-80 (cortinas blackout) o $10-30 (antifaz de calidad)'
    },
    {
      icon: Volume2,
      title: 'Reducción de ruido',
      optimal: '<30 decibelios',
      description: 'El ruido interrumpe ciclos de sueño incluso si no te despierta completamente.',
      gradient: 'from-green-500 to-emerald-600',
      tips: [
        'Usa máquina de ruido blanco o ventilador',
        'Tapones para oídos de espuma o silicona',
        'Alfombras y cortinas gruesas absorben sonido',
        'Sella ventanas con burletes si hay ruido exterior'
      ],
      science: 'El ruido aumenta cortisol y reduce sueño profundo, aunque no te despiertes conscientemente.',
      investment: 'Bajo - $10-30 (tapones) o $20-60 (máquina de ruido blanco)'
    },
    {
      icon: Bed,
      title: 'Colchón y almohada adecuados',
      optimal: 'Según tu peso y postura',
      description: 'El soporte correcto previene dolor y mejora la calidad del sueño profundo.',
      gradient: 'from-purple-500 to-pink-600',
      tips: [
        'Colchón firme para boca abajo/espalda, medio para lado',
        'Reemplaza colchón cada 7-10 años',
        'Almohada alta si duermes de lado, baja boca arriba',
      ],
      science: 'El soporte inadecuado causa microdespertares que reducen sueño profundo sin que lo notes.',
      investment: 'Alto - $500-2000 (colchón calidad) + $50-150 (almohada)'
    },
    {
      icon: Wind,
      title: 'Ventilación y aire fresco',
      optimal: 'Renovación de aire cada 2-3 horas',
      description: 'El CO₂ acumulado reduce calidad del sueño y causa dolores de cabeza matutinos.',
      gradient: 'from-cyan-500 to-teal-600',
      tips: [
        'Abre ventana 10-15 minutos antes de dormir',
        'Purificador de aire si hay alergias o contaminación',
        'Evita ambientadores químicos',
        'Plantas como pothos o sansevieria mejoran el aire'
      ],
      science: 'Niveles altos de CO₂ (>1000 ppm) reducen sueño profundo hasta un 25%.',
      investment: 'Bajo - $0 (ventana) o Medio - $100-300 (purificador básico)'
    },
    {
      icon: Shirt,
      title: 'Ropa de cama transpirable',
      optimal: 'Algodón o bambú, >300 hilos',
      description: 'Materiales sintéticos atrapan calor y humedad, interrumpiendo termorregulación.',
      gradient: 'from-amber-500 to-orange-600',
      tips: [
        'Sábanas de algodón 100% o bambú',
        'Evita poliéster y microfibra',
        'Cambia sábanas cada 7-10 días',
        'Edredón ligero en verano, pesado en invierno'
      ],
      science: 'La transpiración nocturna es normal. Materiales transpirables evitan sobrecalentamiento.',
      investment: 'Medio - $80-200 (juego completo de calidad)'
    }
  ]

  const priorities = [
    {
      priority: 'Esencial',
      color: 'red',
      items: ['Temperatura fresca (15-19°C)', 'Oscuridad total o antifaz', 'Colchón sin hundimientos'],
      budget: '$30-100'
    },
    {
      priority: 'Importante',
      color: 'amber',
      items: ['Reducción de ruido', 'Ventilación adecuada', 'Ropa de cama transpirable'],
      budget: '$50-150'
    },
    {
      priority: 'Mejora',
      color: 'green',
      items: ['Colchón premium', 'Purificador de aire', 'Cortinas térmicas'],
      budget: '$500+'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 max-w-5xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.location.href = '/blog'}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al blog
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="text-9xl mb-6"
          >
            🛏️
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Crea el dormitorio perfecto
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              para dormir mejor
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-8">
            Optimiza tu ambiente para maximizar la calidad del sueño
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              7 min de lectura
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Octubre 2025
            </div>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12"
        >
          <div className="flex items-start gap-4">
            <Lightbulb className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-3">¿Por qué importa tu dormitorio?</h3>
              <p className="text-gray-300 leading-relaxed">
                Tu cerebro asocia tu dormitorio con el sueño. Un ambiente optimizado <strong className="text-white">señaliza 
                a tu cuerpo que es momento de descansar</strong>, mientras que condiciones incorrectas activan el sistema 
                de alerta incluso sin que lo notes conscientemente. Estudios muestran que optimizar tu dormitorio puede 
                aumentar la duración del sueño profundo hasta un <strong className="text-emerald-400">35%</strong>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Factors */}
        <div className="space-y-6 mb-12">
          {factors.map((factor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-emerald-500/50 transition-all"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${factor.gradient} flex items-center justify-center flex-shrink-0`}>
                  <factor.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{factor.title}</h3>
                  <div className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-3">
                    Óptimo: {factor.optimal}
                  </div>
                  <p className="text-gray-300">{factor.description}</p>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-white/5 rounded-2xl p-6 mb-4">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Cómo implementarlo
                </h4>
                <div className="space-y-2">
                  {factor.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-2" />
                      <p className="text-sm text-gray-300">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Science & Investment */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <div className="text-xl">🧠</div>
                    <div>
                      <h5 className="font-bold text-purple-300 text-sm mb-1">Base científica</h5>
                      <p className="text-xs text-gray-300">{factor.science}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <div className="text-xl">💰</div>
                    <div>
                      <h5 className="font-bold text-amber-300 text-sm mb-1">Inversión</h5>
                      <p className="text-xs text-gray-300">{factor.investment}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Priority Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              🎯
            </div>
            Prioridades según tu presupuesto
          </h3>

          <div className="space-y-4">
            {priorities.map((level, index) => (
              <div
                key={index}
                className={`border-2 rounded-2xl p-6 ${
                  level.color === 'red' 
                    ? 'border-red-500/50 bg-red-500/10'
                    : level.color === 'amber'
                    ? 'border-amber-500/50 bg-amber-500/10'
                    : 'border-green-500/50 bg-green-500/10'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${
                      level.color === 'red' 
                        ? 'bg-red-500'
                        : level.color === 'amber'
                        ? 'bg-amber-500'
                        : 'bg-green-500'
                    } flex items-center justify-center font-bold text-white`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className={`font-bold ${
                        level.color === 'red' 
                          ? 'text-red-300'
                          : level.color === 'amber'
                          ? 'text-amber-300'
                          : 'text-green-300'
                      }`}>
                        {level.priority}
                      </h4>
                      <p className="text-xs text-gray-400">Presupuesto: {level.budget}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  {level.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Common Mistakes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-red-600/20 to-orange-600/20 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            Errores comunes que arruinan tu sueño
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                ✕
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Habitación muy cálida</h4>
                <p className="text-sm text-gray-300">
                  Más de 21°C interfiere con termorregulación. Sentirás que "no puedes dormirte" sin saber por qué.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                ✕
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Luz de standby visible</h4>
                <p className="text-sm text-gray-300">
                  LEDs de TV, cargadores o relojes digitales pueden suprimir melatonina. Cúbrelos con cinta opaca negra.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                ✕
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Colchón viejo hundido</h4>
                <p className="text-sm text-gray-300">
                  Si tu colchón tiene más de 10 años o se hunde visiblemente, está causando microdespertares y dolor.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                ✕
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Usar el dormitorio para trabajar</h4>
                <p className="text-sm text-gray-300">
                  Tu cerebro asocia el espacio con la actividad. Trabajo en dormitorio = cerebro confundido sobre cuándo dormir.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Plan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">🚀 Empieza hoy mismo</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            No necesitas hacerlo todo de una vez. <strong className="text-white">Esta semana:</strong> ajusta la 
            temperatura y cubre luces LED. <strong className="text-white">Próximas 2 semanas:</strong> cortinas 
            blackout o antifaz. <strong className="text-white">En 1-2 meses:</strong> evalúa si necesitas cambiar colchón.
          </p>
          
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-white font-bold">
            <Eye className="w-5 h-5" />
            Haz una auditoría de tu dormitorio esta noche
          </div>
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
      `}</style>
    </div>
  )
}