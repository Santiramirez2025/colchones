'use client'

import { ShoppingCart, Ruler, Package, CreditCard, Truck, CheckCircle, ArrowRight, Info } from 'lucide-react'
import { useState } from 'react'

export default function GuiaCompraPage() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      number: 1,
      icon: ShoppingCart,
      title: 'Explorá el catálogo',
      description: 'Descubrí nuestra selección de colchones premium',
      color: 'from-blue-500 to-cyan-500',
      details: [
        'Navegá por categorías: Viscoelásticos, Muelles ensacados, Híbridos',
        'Usá los filtros: firmeza, grosor, características',
        'Leé las fichas técnicas de cada modelo',
        'Consultá opiniones reales de clientes'
      ],
      tips: [
        'Identificá tu tipo de descanso: boca arriba, lateral, boca abajo',
        'Considerá tu peso y el de tu pareja si comparten cama',
        'Revisá las tablas de firmeza según tus preferencias'
      ]
    },
    {
      number: 2,
      icon: Ruler,
      title: 'Seleccioná tu medida',
      description: 'Elegí el tamaño perfecto para tu dormitorio',
      color: 'from-violet-500 to-purple-500',
      details: [
        'Medidas disponibles: 1 plaza (80/90x190), 1½ plaza (100/105x190), 2 plazas (140/150x190), Queen (160x200), King (180/200x200)',
        'Verificá el espacio disponible en tu habitación',
        'Tené en cuenta el tamaño de tu somier o base',
        'El precio se actualiza automáticamente según la medida'
      ],
      tips: [
        'Medí tu somier antes de comprar para asegurar compatibilidad',
        'Dejá al menos 60cm de espacio libre alrededor de la cama',
        'Para parejas, recomendamos mínimo 2 plazas (140x190cm)'
      ]
    },
    {
      number: 3,
      icon: Package,
      title: 'Agregá al carrito',
      description: 'Revisá tu selección antes de finalizar',
      color: 'from-emerald-500 to-green-500',
      details: [
        'Verificá el modelo y medida seleccionados',
        'Consultá el plazo de entrega estimado para tu zona',
        'Agregá accesorios opcionales: almohadas, protectores',
        'Revisá los costos de envío según tu ubicación'
      ],
      tips: [
        'Aprovechá combos: colchón + almohada con descuento especial',
        'El carrito se guarda si necesitás más tiempo para decidir',
        'Podés modificar cantidades y productos antes del checkout'
      ]
    },
    {
      number: 4,
      icon: CreditCard,
      title: 'Checkout seguro',
      description: 'Completá tu compra de forma rápida y segura',
      color: 'from-amber-500 to-orange-500',
      details: [
        'Completá tus datos de contacto y dirección de envío',
        'Elegí método de pago: Mercado Pago (cuotas sin interés), transferencia, débito o efectivo',
        'Revisá el resumen completo de tu pedido',
        'Aceptá términos y condiciones de compra'
      ],
      tips: [
        'Todos los pagos están protegidos con encriptación SSL',
        'Recibirás confirmación inmediata por email y WhatsApp',
        'Guardá tu número de pedido para hacer seguimiento del envío'
      ]
    },
    {
      number: 5,
      icon: Truck,
      title: 'Envío y entrega',
      description: 'Recibí tu colchón en tu domicilio',
      color: 'from-pink-500 to-rose-500',
      details: [
        'Envío a todo el país (consultá costos según tu zona)',
        'Entrega de 7 a 15 días hábiles según ubicación',
        'Te contactamos antes para coordinar día y horario',
        'Envío a domicilio incluido en el servicio'
      ],
      tips: [
        'Asegurate de que alguien pueda recibir el paquete',
        'El colchón viene enrollado al vacío para facilitar el transporte',
        'Dejalo expandirse 24-48h antes de usarlo por primera vez'
      ]
    },
    {
      number: 6,
      icon: CheckCircle,
      title: 'Disfrutá tu descanso',
      description: '30 días de prueba y 3 años de garantía',
      color: 'from-indigo-500 to-blue-500',
      details: [
        'Periodo de adaptación de 30 días desde la recepción',
        'Devolución sin cargo si no estás satisfecho',
        'Garantía de 3 años en todos los colchones',
        'Atención al cliente disponible por WhatsApp y email'
      ],
      tips: [
        'Dale 2-3 semanas de adaptación a tu cuerpo',
        'Usá protector de colchón desde el primer día',
        'Volteá el colchón cada 3 meses durante los primeros 6 meses'
      ]
    }
  ]

  const faqs = [
    {
      question: '¿Puedo cambiar la medida después de comprar?',
      answer: 'Sí, durante los 30 días de prueba podés cambiar la medida sin costo adicional. Solo coordinamos el cambio.'
    },
    {
      question: '¿El envío incluye subida a domicilio?',
      answer: 'Sí, el envío incluye la entrega en tu domicilio. Consultá costos de envío según tu ubicación en Argentina.'
    },
    {
      question: '¿Qué hago si no me gusta el colchón?',
      answer: 'Tenés 30 días para probarlo. Si no te convence, coordinamos la devolución y te reintegramos el importe completo.'
    },
    {
      question: '¿Necesito un somier específico?',
      answer: 'Nuestros colchones son compatibles con cualquier base: somier de láminas, cama con cajones o base firme.'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos Mercado Pago (con cuotas sin interés), transferencia bancaria, tarjeta de débito y efectivo.'
    },
    {
      question: '¿Cuánto demora el envío a mi zona?',
      answer: 'El tiempo de entrega varía entre 7 y 15 días hábiles según tu ubicación. Te confirmamos el plazo exacto al procesar tu pedido.'
    }
  ]

  const StepIcon = steps[activeStep].icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl mb-6 border border-violet-500/30">
            <Info className="w-10 h-10 text-violet-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Guía de Compra
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Comprar tu colchón ideal es fácil. Seguí estos pasos y resolvé cualquier duda
          </p>
        </div>

        {/* Steps Navigation */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
            {steps.map((step, index) => {
              const NavIcon = step.icon
              return (
                <div key={index} className="flex items-center">
                  <button
                    onClick={() => setActiveStep(index)}
                    className={`flex flex-col items-center gap-2 min-w-[80px] transition-all ${
                      activeStep === index ? 'scale-110' : 'opacity-50 hover:opacity-75'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${step.color} ${
                      activeStep === index ? 'shadow-lg' : ''
                    }`}>
                      <NavIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-zinc-400 text-center font-medium">
                      Paso {step.number}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-0.5 bg-zinc-800 mx-2 hidden sm:block" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Active Step Content */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${steps[activeStep].color}`} />
            
            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${steps[activeStep].color} flex-shrink-0`}>
                  <StepIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 mb-1">Paso {steps[activeStep].number} de {steps.length}</div>
                  <h2 className="text-3xl font-bold text-white mb-2">{steps[activeStep].title}</h2>
                  <p className="text-zinc-400">{steps[activeStep].description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Details */}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-violet-500 rounded" />
                    Qué hacer
                  </h3>
                  <ul className="space-y-3">
                    {steps[activeStep].details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tips */}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-amber-500 rounded" />
                    Consejos útiles
                  </h3>
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                    <ul className="space-y-3">
                      {steps[activeStep].tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                          <span className="text-amber-400 font-bold flex-shrink-0">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="px-4 py-2 text-sm text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← Anterior
                </button>
                
                {activeStep < steps.length - 1 ? (
                  <button
                    onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                    className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                  >
                    Siguiente paso
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href="/productos"
                    className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg"
                  >
                    Ver catálogo
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Process Overview */}
        <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Resumen del proceso</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {steps.map((step, index) => {
              const OverviewIcon = step.icon
              return (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center bg-gradient-to-br ${step.color} mb-2`}>
                    <OverviewIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-semibold text-white mb-1">{step.title}</div>
                  <div className="text-[10px] text-zinc-500">Paso {step.number}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Preguntas frecuentes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-white/5 rounded-xl p-6 hover:border-violet-500/20 transition-all"
              >
                <h3 className="text-white font-semibold mb-3 flex items-start gap-2">
                  <span className="text-violet-400 flex-shrink-0">?</span>
                  {faq.question}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para mejorar tu descanso?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Explorá nuestro catálogo y encontrá el colchón perfecto para vos. Envío a todo el país, 30 días de prueba y 3 años de garantía.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/productos"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-violet-600 rounded-xl font-bold transition-all shadow-lg inline-flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Ver catálogo
            </a>
            <a
              href="/contacto"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20 inline-flex items-center gap-2"
            >
              ¿Necesitás ayuda?
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}