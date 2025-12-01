import { Shield, Package, AlertTriangle, CheckCircle, Clock, Mail, Phone, Award, XCircle } from 'lucide-react'

export default function GarantiaPage() {
  const warrantyConditions = [
    {
      icon: Shield,
      title: '5 años de garantía',
      description: 'Todos nuestros colchones cuentan con garantía de fábrica'
    },
    {
      icon: CheckCircle,
      title: 'Solo fallas de fábrica',
      description: 'Cubre defectos de fabricación y materiales comprobables'
    },
    {
      icon: Package,
      title: 'Factura requerida',
      description: 'Guardá tu factura, es indispensable para cualquier reclamo'
    },
    {
      icon: Clock,
      title: 'Evaluación técnica',
      description: 'Nuestro equipo evaluará el producto en todos los casos'
    }
  ]

  const warrantyCoverage = [
    {
      title: 'Qué cubre la garantía',
      items: [
        'Hundimientos superiores a 2.5cm',
        'Defectos en costuras de fábrica',
        'Problemas en resortes (si aplica)',
        'Fallas en materiales comprobables'
      ],
      icon: CheckCircle,
      color: 'text-zinc-300'
    },
    {
      title: 'Qué NO cubre',
      items: [
        'Desgaste normal por uso',
        'Manchas, roturas o quemaduras',
        'Daños por mascotas',
        'Uso comercial o inadecuado',
        'Falta de mantenimiento',
        'Preferencias de confort'
      ],
      icon: XCircle,
      color: 'text-zinc-500'
    }
  ]

  const returnPolicy = [
    {
      step: 1,
      title: 'Derecho de arrepentimiento',
      description: '10 días corridos desde la recepción según Ley 24.240'
    },
    {
      step: 2,
      title: 'Condición del producto',
      description: 'El colchón debe estar SIN USAR, en embalaje original cerrado'
    },
    {
      step: 3,
      title: 'Costos de flete',
      description: 'Los gastos de retiro corren por cuenta del comprador'
    },
    {
      step: 4,
      title: 'Reembolso',
      description: 'Una vez verificado el estado, procesamos el reembolso en 10 días hábiles'
    }
  ]

  const importantNotes = [
    {
      icon: AlertTriangle,
      title: 'Importante sobre arrepentimiento',
      text: 'Por razones de higiene y salud, NO se aceptan devoluciones de colchones que hayan sido desembalados, probados o usados. El producto debe estar en su embalaje original sin abrir.'
    },
    {
      icon: Award,
      title: 'Recomendación',
      text: 'Te sugerimos visitarnos en nuestro showroom en Balerdi 855 para probar los colchones antes de comprar. Así te asegurás de elegir el modelo ideal para vos.'
    }
  ]

  return (
    <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden antialiased">
      {/* Hero Section */}
      <section className="w-full border-b border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl mb-6">
              <Shield className="w-8 h-8 md:w-10 md:h-10 text-zinc-300" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Garantía y Devoluciones
            </h1>
            <p className="text-lg text-zinc-400">
              5 años de garantía por fallas de fábrica en todos nuestros productos
            </p>
          </div>
        </div>
      </section>

      {/* Important Alert */}
      <section className="w-full">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    ⚠️ Importante - Higiene y Salud
                  </h3>
                  <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                    Por razones de higiene y salud, <strong className="text-white">NO se aceptan devoluciones de colchones desembalados o usados</strong>. 
                    Te recomendamos visitarnos en nuestro showroom para probar los productos antes de comprar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Conditions */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Garantía de Fábrica
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {warrantyConditions.map((condition, index) => (
              <div
                key={index}
                className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 text-center hover:bg-zinc-800/60 transition-all"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-700/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <condition.icon className="w-6 h-6 md:w-7 md:h-7 text-zinc-300" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-2">
                  {condition.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {condition.description}
                </p>
              </div>
            ))}
          </div>

          {/* Coverage Details */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {warrantyCoverage.map((section, index) => (
              <div
                key={index}
                className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <section.icon className={`w-6 h-6 ${section.color}`} />
                  <h3 className="text-xl font-bold text-white">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className={`mt-1 ${section.color}`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Return Policy */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
            Derecho de Arrepentimiento
          </h2>
          <p className="text-zinc-400 text-center mb-8 max-w-2xl mx-auto">
            Según la Ley 24.240 de Defensa del Consumidor
          </p>

          <div className="max-w-3xl mx-auto space-y-4 mb-12">
            {returnPolicy.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-700/50 flex items-center justify-center text-white font-bold text-base md:text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-400">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Important Notes */}
          <div className="max-w-3xl mx-auto space-y-6">
            {importantNotes.map((note, index) => (
              <div
                key={index}
                className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <note.icon className="w-6 h-6 text-zinc-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{note.title}</h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">{note.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Process */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              ¿Cómo hacer un reclamo de garantía?
            </h2>
            <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8">
              <ol className="space-y-4">
                <li className="flex items-start gap-3 text-zinc-300">
                  <span className="w-6 h-6 flex-shrink-0 rounded-full bg-zinc-700/50 flex items-center justify-center text-white text-xs font-bold">
                    1
                  </span>
                  <span className="text-sm md:text-base">
                    <strong className="text-white">Contactanos</strong> por email, WhatsApp o teléfono describiendo el problema
                  </span>
                </li>
                <li className="flex items-start gap-3 text-zinc-300">
                  <span className="w-6 h-6 flex-shrink-0 rounded-full bg-zinc-700/50 flex items-center justify-center text-white text-xs font-bold">
                    2
                  </span>
                  <span className="text-sm md:text-base">
                    <strong className="text-white">Enviá fotos</strong> del defecto y tu factura de compra
                  </span>
                </li>
                <li className="flex items-start gap-3 text-zinc-300">
                  <span className="w-6 h-6 flex-shrink-0 rounded-full bg-zinc-700/50 flex items-center justify-center text-white text-xs font-bold">
                    3
                  </span>
                  <span className="text-sm md:text-base">
                    <strong className="text-white">Evaluación técnica:</strong> Nuestro equipo revisará tu caso
                  </span>
                </li>
                <li className="flex items-start gap-3 text-zinc-300">
                  <span className="w-6 h-6 flex-shrink-0 rounded-full bg-zinc-700/50 flex items-center justify-center text-white text-xs font-bold">
                    4
                  </span>
                  <span className="text-sm md:text-base">
                    <strong className="text-white">Solución:</strong> Si procede, coordinamos reparación o reemplazo según corresponda
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Tenés alguna consulta?
            </h2>
            <p className="text-zinc-400 mb-8">
              Contactanos y te ayudaremos con tu garantía o consulta sobre devoluciones
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:info@azulcolchones.com"
                className="inline-flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                <Mail className="w-5 h-5" />
                info@azulcolchones.com
              </a>
              <a 
                href="tel:+54353XXXXXXX"
                className="inline-flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                <Phone className="w-5 h-5" />
                +54 353 XXX-XXXX
              </a>
            </div>
            <p className="text-xs text-zinc-500 mt-6">
              Horario: Lunes a Viernes de 9:00 a 18:00hs | Sábados de 10:00 a 14:00hs
            </p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-zinc-500">
              Esta política cumple con la Ley 24.240 de Defensa del Consumidor de Argentina
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}