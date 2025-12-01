'use client'

import { Sparkles, RotateCcw, Shield, Droplets, Wind, Sun, AlertTriangle, CheckCircle, Calendar, ThermometerSun } from 'lucide-react'
import { useState } from 'react'

export default function CuidadoColchonPage() {
  const [activeTab, setActiveTab] = useState('basico')

  const basicCare = [
    {
      icon: Shield,
      title: 'Usá protector desde el día 1',
      description: 'Protege tu colchón de manchas, ácaros y humedad',
      tips: [
        'Elegí un protector transpirable e impermeable',
        'Lavalo cada 2-3 meses a 60°C',
        'Evitá plásticos que no transpiren'
      ]
    },
    {
      icon: RotateCcw,
      title: 'Girá y volteá regularmente',
      description: 'Distribuí el desgaste de forma uniforme',
      tips: [
        'Primeros 6 meses: volteá cada 3 meses',
        'Después: girá cabeza-pies cada 6 meses',
        'Algunos modelos no necesitan volteo (consultá etiqueta)'
      ]
    },
    {
      icon: Wind,
      title: 'Ventilá diariamente',
      description: 'Eliminá la humedad acumulada durante la noche',
      tips: [
        'Dejá la cama sin hacer 10-15 minutos al levantarte',
        'Abrí ventanas para renovar el aire',
        'Retirá edredón y almohadas para mejor ventilación'
      ]
    },
    {
      icon: Sun,
      title: 'Exponelo al sol ocasionalmente',
      description: 'La luz solar elimina ácaros y bacterias',
      tips: [
        '2-3 horas al año es suficiente',
        'Evitá exposición prolongada (puede dañar materiales)',
        'Ideal en primavera u otoño'
      ]
    }
  ]

  const cleaning = [
    {
      icon: Sparkles,
      title: 'Limpieza de superficie',
      frequency: 'Mensual',
      steps: [
        'Aspirá suavemente con el accesorio de tapicería',
        'Usá movimientos lentos para no dañar las fibras',
        'Prestá atención a costuras y esquinas',
        'No uses cepillos duros o abrasivos'
      ]
    },
    {
      icon: Droplets,
      title: 'Manchas accidentales',
      frequency: 'Según necesidad',
      steps: [
        'Actuá inmediatamente, no dejes secar',
        'Absorbé el líquido con papel (no frotes)',
        'Limpiá con paño húmedo y jabón neutro',
        'Dejá secar completamente antes de hacer la cama'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Qué NO hacer',
      frequency: 'Nunca',
      steps: [
        'No uses productos químicos agresivos',
        'No empapes el colchón (puede generar moho)',
        'No uses máquina de vapor directamente',
        'No dobles o enrolles el colchón'
      ]
    }
  ]

  const maintenance = [
    {
      period: 'Cada mes',
      icon: Calendar,
      tasks: [
        'Aspirar superficie del colchón',
        'Revisar estado del protector',
        'Ventilar profundamente'
      ]
    },
    {
      period: 'Cada 3 meses',
      icon: RotateCcw,
      tasks: [
        'Voltear el colchón (primeros 6 meses)',
        'Lavar el protector a 60°C',
        'Revisar estado de costuras'
      ]
    },
    {
      period: 'Cada 6 meses',
      icon: Sun,
      tasks: [
        'Girar cabeza-pies',
        'Exposición solar breve (2-3h)',
        'Revisar base o sommier'
      ]
    },
    {
      period: 'Cada año',
      icon: CheckCircle,
      tasks: [
        'Evaluación general del estado',
        'Limpiar base o sommier',
        'Considerar renovar protector si está desgastado'
      ]
    }
  ]

  const warnings = [
    {
      icon: ThermometerSun,
      title: 'Temperatura y humedad',
      text: 'Mantené la habitación entre 18-21°C y 40-60% humedad. El exceso de calor o humedad puede dañar los materiales.'
    },
    {
      icon: AlertTriangle,
      title: 'Señales de cambio',
      text: 'Considerá cambiar tu colchón si tiene hundimientos >2.5cm, manchas permanentes, olores persistentes o tiene más de 8-10 años.'
    },
    {
      icon: Shield,
      title: 'Base adecuada',
      text: 'Usá siempre una base firme y ventilada. Evitá apoyarlo directamente en el suelo o sobre superficies sin ventilación.'
    }
  ]

  const tabs = [
    { id: 'basico', label: 'Cuidados básicos', icon: Sparkles },
    { id: 'limpieza', label: 'Limpieza', icon: Droplets },
    { id: 'calendario', label: 'Calendario', icon: Calendar }
  ]

  return (
    <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden antialiased">
      {/* Hero Section */}
      <section className="w-full border-b border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl mb-6">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-zinc-300" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Cuidado del Colchón
            </h1>
            <p className="text-lg text-zinc-400 mb-6">
              Mantené tu colchón en perfectas condiciones y prolongá su vida útil
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full text-zinc-300 text-sm">
              <CheckCircle className="w-4 h-4" />
              Guía completa de mantenimiento
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="w-full border-b border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {tabs.map((tab) => {
              const TabIcon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-zinc-700 text-white'
                      : 'bg-zinc-800/30 text-zinc-400 hover:bg-zinc-800/50 hover:text-white border border-zinc-700/50'
                  }`}
                >
                  <TabIcon className="w-5 h-5" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="w-full">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {activeTab === 'basico' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {basicCare.map((item, index) => {
                  const ItemIcon = item.icon
                  return (
                    <div
                      key={index}
                      className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 hover:bg-zinc-800/60 transition-all"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-zinc-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <ItemIcon className="w-6 h-6 text-zinc-300" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                          <p className="text-sm text-zinc-400">{item.description}</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {item.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                            <CheckCircle className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-0.5" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>

              {/* Warnings */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Consejos importantes</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {warnings.map((warning, index) => {
                    const WarningIcon = warning.icon
                    return (
                      <div
                        key={index}
                        className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6"
                      >
                        <div className="w-10 h-10 bg-zinc-700/50 rounded-lg flex items-center justify-center mb-4">
                          <WarningIcon className="w-5 h-5 text-zinc-400" />
                        </div>
                        <h3 className="text-white font-semibold mb-3">{warning.title}</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">{warning.text}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'limpieza' && (
            <div className="space-y-6">
              {cleaning.map((section, index) => {
                const SectionIcon = section.icon
                return (
                  <div
                    key={index}
                    className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <SectionIcon className="w-6 h-6 md:w-7 md:h-7 text-zinc-300" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{section.title}</h2>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-700/50 border border-zinc-600/50 rounded-full text-zinc-300 text-xs">
                          <Calendar className="w-3 h-3" />
                          {section.frequency}
                        </div>
                      </div>
                    </div>
                    <ol className="space-y-3">
                      {section.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                          <span className="w-6 h-6 flex-shrink-0 rounded-full bg-zinc-700/50 flex items-center justify-center text-zinc-300 text-xs font-bold">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )
              })}

              {/* Products Warning */}
              <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-zinc-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Productos a evitar</h3>
                    <ul className="space-y-2 text-sm text-zinc-300">
                      <li className="flex items-start gap-2">
                        <span className="text-zinc-500">✗</span>
                        Lavandina o blanqueadores
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-zinc-500">✗</span>
                        Productos con amoníaco
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-zinc-500">✗</span>
                        Limpiadores abrasivos
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-zinc-500">✗</span>
                        Aerosoles perfumados (pueden manchar)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calendario' && (
            <div className="space-y-6">
              {maintenance.map((period, index) => {
                const PeriodIcon = period.icon
                return (
                  <div
                    key={index}
                    className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-zinc-700/50 rounded-xl flex items-center justify-center">
                        <PeriodIcon className="w-6 h-6 text-zinc-300" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{period.period}</h3>
                    </div>
                    <ul className="space-y-2">
                      {period.tasks.map((task, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                          <CheckCircle className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}

              {/* Timeline Visual */}
              <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8 mt-12">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Vida útil esperada</h3>
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-zinc-400">Nuevo</span>
                    <span className="text-sm text-zinc-400">8-10 años</span>
                  </div>
                  <div className="h-4 bg-zinc-800 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-gradient-to-r from-zinc-600 via-zinc-500 to-zinc-400 rounded-full" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center text-xs">
                    <div>
                      <div className="w-3 h-3 bg-zinc-600 rounded-full mx-auto mb-2" />
                      <div className="text-zinc-400">0-4 años</div>
                      <div className="text-zinc-500">Estado óptimo</div>
                    </div>
                    <div>
                      <div className="w-3 h-3 bg-zinc-500 rounded-full mx-auto mb-2" />
                      <div className="text-zinc-400">4-8 años</div>
                      <div className="text-zinc-500">Evaluar estado</div>
                    </div>
                    <div>
                      <div className="w-3 h-3 bg-zinc-400 rounded-full mx-auto mb-2" />
                      <div className="text-zinc-400">+8 años</div>
                      <div className="text-zinc-500">Considerar cambio</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Necesitás cambiar tu colchón?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Si tu colchón tiene más de 8 años o muestra signos de desgaste, es momento de renovar tu descanso
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/productos"
                className="px-8 py-4 bg-zinc-700 hover:bg-zinc-600 text-white rounded-xl font-bold transition-all inline-flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Ver colchones nuevos
              </a>
              <a
                href="/contacto"
                className="px-8 py-4 bg-zinc-800/50 hover:bg-zinc-800 text-white rounded-xl font-semibold transition-all border border-zinc-700/50"
              >
                Asesoramiento
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}