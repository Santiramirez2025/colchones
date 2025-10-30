'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Moon, Sun, Coffee, Dumbbell, Clock, 
  ThermometerSun, Smartphone, BookOpen, CheckCircle2,
  ArrowLeft, Calendar, Lightbulb
} from 'lucide-react'

export default function HigieneSueno() {
  const habits = [
    {
      icon: Clock,
      title: 'Horario consistente',
      description: 'Acuéstate y levántate a la misma hora todos los días, incluso fines de semana.',
      why: 'Tu ritmo circadiano funciona mejor con rutinas predecibles.',
      tip: 'Configura alarmas tanto para dormir como para despertar.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Sun,
      title: 'Luz natural diurna',
      description: 'Exponte a luz brillante durante las primeras horas del día.',
      why: 'La luz solar regula tu producción de melatonina y cortisol.',
      tip: 'Sal al exterior 10-30 minutos dentro de la primera hora al despertar.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Coffee,
      title: 'Limita la cafeína',
      description: 'Evita café, té y bebidas energéticas 6 horas antes de dormir.',
      why: 'La vida media de la cafeína es de 5-6 horas en tu cuerpo.',
      tip: 'Tu última taza de café debe ser antes de las 3 PM si duermes a las 11 PM.',
      gradient: 'from-amber-500 to-brown-600'
    },
    {
      icon: Dumbbell,
      title: 'Ejercicio regular',
      description: 'Haz actividad física, pero termina al menos 3 horas antes de dormir.',
      why: 'El ejercicio mejora el sueño profundo pero eleva la temperatura corporal.',
      tip: 'Las mejores horas: mañana o tarde, no noche.',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Smartphone,
      title: 'Apaga pantallas',
      description: 'Sin dispositivos electrónicos 1 hora antes de acostarte.',
      why: 'La luz azul suprime la melatonina, la hormona del sueño.',
      tip: 'Activa el modo nocturno si necesitas usar tu dispositivo.',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: ThermometerSun,
      title: 'Temperatura fresca',
      description: 'Mantén tu habitación entre 15-19°C (60-67°F).',
      why: 'Tu temperatura corporal debe bajar para iniciar el sueño.',
      tip: 'Una habitación más fría es mejor que una muy cálida.',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Moon,
      title: 'Rutina nocturna',
      description: 'Crea un ritual relajante de 30-60 minutos antes de dormir.',
      why: 'Señaliza a tu cerebro que es hora de descansar.',
      tip: 'Lectura, baño tibio, meditación o estiramientos suaves.',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: BookOpen,
      title: 'Usa la cama solo para dormir',
      description: 'No trabajes, comas o veas TV en la cama.',
      why: 'Tu cerebro debe asociar la cama únicamente con el sueño.',
      tip: 'Si no puedes dormir en 20 minutos, sal de la cama.',
      gradient: 'from-pink-500 to-rose-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob" />
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
            🌙
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            La guía definitiva de
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              higiene del sueño
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-8">
            8 hábitos científicamente comprobados para transformar tu descanso
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              8 min de lectura
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
            <Lightbulb className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-3">¿Qué es la higiene del sueño?</h3>
              <p className="text-gray-300 leading-relaxed">
                La higiene del sueño son los hábitos y prácticas que promueven un sueño de calidad de forma consistente. 
                No se trata de cambios drásticos, sino de <strong className="text-white">ajustes sostenibles</strong> respaldados 
                por décadas de investigación científica. Implementar estos hábitos puede mejorar la duración y profundidad 
                de tu sueño en semanas.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Habits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {habits.map((habit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all group"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${habit.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <habit.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2">{habit.title}</h3>
              <p className="text-gray-300 mb-3 leading-relaxed">{habit.description}</p>
              
              {/* Why */}
              <div className="bg-white/5 rounded-xl p-3 mb-3">
                <div className="text-xs font-semibold text-purple-400 mb-1">¿Por qué funciona?</div>
                <div className="text-sm text-gray-400">{habit.why}</div>
              </div>

              {/* Tip */}
              <div className="flex items-start gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-cyan-300">{habit.tip}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Implementation Plan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
              📋
            </div>
            Plan de implementación (4 semanas)
          </h3>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center font-bold text-white flex-shrink-0">
                S1
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-1">Semana 1: Horarios</h4>
                <p className="text-gray-300 text-sm">Establece hora fija para dormir y despertar. Nada más.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-white flex-shrink-0">
                S2
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-1">Semana 2: Luz y cafeína</h4>
                <p className="text-gray-300 text-sm">Añade exposición solar matutina y corta cafeína después de las 3 PM.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center font-bold text-white flex-shrink-0">
                S3
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-1">Semana 3: Ambiente</h4>
                <p className="text-gray-300 text-sm">Optimiza temperatura y elimina pantallas 1 hora antes de dormir.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center font-bold text-white flex-shrink-0">
                S4
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-1">Semana 4: Rutina nocturna</h4>
                <p className="text-gray-300 text-sm">Crea un ritual relajante de 30-60 minutos antes de acostarte.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Takeaways */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">🎯 Puntos clave para recordar</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">
                <strong className="text-white">La consistencia es lo más importante.</strong> Es mejor dormir 7 horas a la misma hora todos los días que 9 horas con horario variable.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">
                <strong className="text-white">No implementes todo a la vez.</strong> Añade un hábito cada semana para que los cambios sean sostenibles.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">
                <strong className="text-white">Los resultados tardan 2-4 semanas.</strong> Tu ritmo circadiano necesita tiempo para adaptarse.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">
                <strong className="text-white">Si tienes insomnio crónico,</strong> consulta un especialista del sueño. Estos hábitos ayudan, pero no reemplazan tratamiento médico.
              </p>
            </div>
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