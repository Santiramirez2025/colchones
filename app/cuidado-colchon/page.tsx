'use client'

import { Sparkles, RotateCcw, Shield, Droplets, Wind, Sun, AlertTriangle, CheckCircle, Calendar, ThermometerSun } from 'lucide-react'
import { useState } from 'react'

export default function CuidadoColchonPage() {
  const [activeTab, setActiveTab] = useState('basico')

  const basicCare = [
    {
      icon: Shield,
      title: 'Usa protector desde el día 1',
      description: 'Protege tu colchón de manchas, ácaros y humedad',
      tips: [
        'Elige un protector transpirable e impermeable',
        'Lávalo cada 2-3 meses a 60°C',
        'Evita plásticos que no transpiren'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: RotateCcw,
      title: 'Gira y voltea regularmente',
      description: 'Distribuye el desgaste de forma uniforme',
      tips: [
        'Primeros 6 meses: voltea cada 3 meses',
        'Después: gira cabeza-pies cada 6 meses',
        'Algunos modelos no necesitan volteo (consulta etiqueta)'
      ],
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: Wind,
      title: 'Ventila diariamente',
      description: 'Elimina humedad acumulada durante la noche',
      tips: [
        'Deja la cama sin hacer 10-15 minutos al levantarte',
        'Abre ventanas para renovar el aire',
        'Retira edredón y almohadas para mejor ventilación'
      ],
      color: 'from-emerald-500 to-green-500'
    },
    {
      icon: Sun,
      title: 'Exponlo al sol ocasionalmente',
      description: 'La luz solar elimina ácaros y bacterias',
      tips: [
        '2-3 horas al año es suficiente',
        'Evita exposición prolongada (puede dañar materiales)',
        'Ideal en primavera u otoño'
      ],
      color: 'from-amber-500 to-orange-500'
    }
  ]

  const cleaning = [
    {
      icon: Sparkles,
      title: 'Limpieza de superficie',
      frequency: 'Mensual',
      steps: [
        'Aspira suavemente con el accesorio de tapicería',
        'Usa movimientos lentos para no dañar las fibras',
        'Presta atención a costuras y esquinas',
        'No uses cepillos duros o abrasivos'
      ]
    },
    {
      icon: Droplets,
      title: 'Manchas accidentales',
      frequency: 'Según necesidad',
      steps: [
        'Actúa inmediatamente, no dejes secar',
        'Absorbe el líquido con papel absorbente (no frotes)',
        'Limpia con paño húmedo y jabón neutro',
        'Deja secar completamente antes de hacer la cama'
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
      ],
      color: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      period: 'Cada 3 meses',
      icon: RotateCcw,
      tasks: [
        'Voltear el colchón (primeros 6 meses)',
        'Lavar el protector a 60°C',
        'Revisar estado de costuras'
      ],
      color: 'bg-violet-500/10 border-violet-500/20'
    },
    {
      period: 'Cada 6 meses',
      icon: Sun,
      tasks: [
        'Girar cabeza-pies',
        'Exposición solar breve (2-3h)',
        'Revisar base o somier'
      ],
      color: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      period: 'Cada año',
      icon: CheckCircle,
      tasks: [
        'Evaluación general del estado',
        'Limpiar base o somier',
        'Considerar renovar protector si está desgastado'
      ],
      color: 'bg-emerald-500/10 border-emerald-500/20'
    }
  ]

  const warnings = [
    {
      icon: ThermometerSun,
      title: 'Temperatura y humedad',
      text: 'Mantén la habitación entre 18-21°C y 40-60% humedad. El exceso de calor o humedad puede dañar los materiales.'
    },
    {
      icon: AlertTriangle,
      title: 'Señales de cambio',
      text: 'Considera cambiar tu colchón si tiene hundimientos >2.5cm, manchas permanentes, olores persistentes o tiene más de 8-10 años.'
    },
    {
      icon: Shield,
      title: 'Base adecuada',
      text: 'Usa siempre una base firme y ventilada. Evita apoyarlo directamente en el suelo o sobre superficies sin ventilación.'
    }
  ]

  const tabs = [
    { id: 'basico', label: 'Cuidados básicos', icon: Sparkles },
    { id: 'limpieza', label: 'Limpieza', icon: Droplets },
    { id: 'calendario', label: 'Calendario', icon: Calendar }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl mb-6 border border-violet-500/30">
            <Sparkles className="w-10 h-10 text-violet-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Cuidado del Colchón
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Mantén tu colchón en perfectas condiciones y prolonga su vida útil
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm">
            <CheckCircle className="w-4 h-4" />
            Guía completa de mantenimiento
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {tabs.map((tab) => {
            const TabIcon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-violet-600 text-white shadow-lg'
                    : 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800/50 hover:text-white border border-white/5'
                }`}
              >
                <TabIcon className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'basico' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {basicCare.map((item, index) => {
                const ItemIcon = item.icon
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all"
                  >
                    <div className={`h-2 bg-gradient-to-r ${item.color}`} />
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.color} flex-shrink-0`}>
                          <ItemIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                          <p className="text-sm text-zinc-400">{item.description}</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {item.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
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
                      className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6"
                    >
                      <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                        <WarningIcon className="w-5 h-5 text-amber-400" />
                      </div>
                      <h3 className="text-white font-semibold mb-3">{warning.title}</h3>
                      <p className="text-sm text-zinc-300 leading-relaxed">{warning.text}</p>
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
                  className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-violet-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <SectionIcon className="w-7 h-7 text-violet-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{section.title}</h2>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-xs">
                        <Calendar className="w-3 h-3" />
                        {section.frequency}
                      </div>
                    </div>
                  </div>
                  <ol className="space-y-3">
                    {section.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                        <span className="w-6 h-6 flex-shrink-0 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-300 text-xs font-bold">
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
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Productos a evitar</h3>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">✗</span>
                      Lejía o blanqueadores
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">✗</span>
                      Productos con amoníaco
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">✗</span>
                      Limpiadores abrasivos
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">✗</span>
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
                  className={`${period.color} border rounded-2xl p-6`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <PeriodIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{period.period}</h3>
                  </div>
                  <ul className="space-y-2">
                    {period.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}

            {/* Timeline Visual */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 mt-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Vida útil esperada</h3>
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-zinc-400">Nuevo</span>
                  <span className="text-sm text-zinc-400">8-10 años</span>
                </div>
                <div className="h-4 bg-zinc-800 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-xs">
                  <div>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto mb-2" />
                    <div className="text-zinc-400">0-4 años</div>
                    <div className="text-zinc-500">Estado óptimo</div>
                  </div>
                  <div>
                    <div className="w-3 h-3 bg-amber-500 rounded-full mx-auto mb-2" />
                    <div className="text-zinc-400">4-8 años</div>
                    <div className="text-zinc-500">Evaluar estado</div>
                  </div>
                  <div>
                    <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-2" />
                    <div className="text-zinc-400">+8 años</div>
                    <div className="text-zinc-500">Considerar cambio</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Bottom */}
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl p-8 text-center mt-12">
          <h2 className="text-3xl font-bold text-white mb-4">¿Necesitas cambiar tu colchón?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Si tu colchón tiene más de 8 años o muestra signos de desgaste, es momento de renovar tu descanso
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/catalogo"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-violet-600 rounded-xl font-bold transition-all shadow-lg inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Ver colchones nuevos
            </a>
            <a
              href="/contacto"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
            >
              Asesoramiento
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}