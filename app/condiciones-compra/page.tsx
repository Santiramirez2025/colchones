import { ShoppingBag, CreditCard, Truck, RotateCcw, Shield, AlertCircle, CheckCircle, Mail, Phone, DollarSign } from 'lucide-react'

export default function CondicionesCompraPage() {
  const mainSections = [
    {
      icon: ShoppingBag,
      title: 'Proceso de Compra',
      items: [
        'Seleccioná tu colchón o sommier en el catálogo',
        'Agregá al carrito y revisá tu pedido',
        'Completá el formulario con tus datos',
        'Recibirás confirmación por email y WhatsApp'
      ]
    },
    {
      icon: DollarSign,
      title: 'Precios y Ofertas',
      items: [
        'Precios en pesos argentinos (ARS)',
        'IVA incluido en todos los precios publicados',
        'Promociones válidas según stock disponible',
        'Precios sujetos a modificación sin previo aviso'
      ]
    },
    {
      icon: CreditCard,
      title: 'Métodos de Pago',
      items: [
        'Tarjetas de crédito/débito (hasta 12 cuotas)',
        'Transferencia bancaria (10% descuento)',
        'MercadoPago',
        'Efectivo en sucursal'
      ]
    },
    {
      icon: Truck,
      title: 'Envío y Entrega',
      items: [
        'CABA y GBA: Envío gratis en 48-72hs',
        'Interior: Consultar costo y tiempos',
        'Coordinaremos día y horario de entrega',
        'Servicio de armado disponible (consultar costo)'
      ]
    }
  ]

  const importantSections = [
    {
      icon: RotateCcw,
      title: 'Derecho de Arrepentimiento',
      subtitle: '10 días corridos según Ley de Defensa del Consumidor',
      content: [
        {
          label: 'Plazo Legal',
          text: 'Tenés 10 días corridos desde que recibís el producto para arrepentirte de tu compra, según Art. 34 Ley 24.240.'
        },
        {
          label: 'Condiciones',
          text: 'El producto debe estar en perfectas condiciones, sin uso, con embalaje original y etiquetas. Recomendamos usar protector desde el primer día.'
        },
        {
          label: 'Proceso',
          text: 'Contactanos por email, WhatsApp o teléfono. Coordinamos el retiro sin cargo en CABA/GBA y procesamos el reembolso en 10 días hábiles.'
        },
        {
          label: 'Gastos',
          text: 'El costo del retiro corre por cuenta del consumidor fuera de CABA/GBA. Interior: a coordinar según zona.'
        }
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Garantía Legal',
      subtitle: 'Garantía de fábrica en todos nuestros productos',
      content: [
        {
          label: 'Cobertura',
          text: 'Garantía de fábrica según cada producto (consultar ficha técnica). Cubre defectos de fabricación y materiales.'
        },
        {
          label: 'Qué cubre',
          text: 'Hundimientos superiores a 2.5cm, roturas de costuras, defectos en resortes o espumas, problemas de estructura en sommiers.'
        },
        {
          label: 'Qué NO cubre',
          text: 'Desgaste normal por uso, manchas, quemaduras, roturas por mascotas, uso comercial o indebido del producto.'
        },
        {
          label: 'Activación',
          text: 'Guardá tu factura o ticket. Es indispensable para cualquier reclamo de garantía. Registro en línea disponible.'
        }
      ],
      color: 'from-emerald-500 to-green-500'
    }
  ]

  const additionalInfo = [
    {
      icon: AlertCircle,
      title: 'Disponibilidad',
      text: 'Los productos están sujetos a stock. Si no hay disponibilidad, te avisamos en 24hs y podés cancelar con reembolso total o esperar reposición.'
    },
    {
      icon: CheckCircle,
      title: 'Modificación del Pedido',
      text: 'Podés modificar o cancelar tu pedido sin cargo hasta que sea despachado. Una vez en camino, aplicará el derecho de arrepentimiento.'
    },
    {
      icon: Truck,
      title: 'Recepción',
      text: 'Revisá el paquete en presencia del transportista. Si hay daños visibles, anotalo en el remito y avisanos dentro de las 24hs.'
    }
  ]

  const paymentInfo = {
    title: 'Facturación',
    items: [
      'Emitimos factura A o B según corresponda',
      'La factura se envía automáticamente por email',
      'Para factura A, indicá CUIT en el checkout',
      'Cumplimos con normativa AFIP vigente'
    ]
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden antialiased">
      {/* Hero Section */}
      <section className="w-full border-b border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl mb-6">
              <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-zinc-300" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Condiciones de Compra
            </h1>
            <p className="text-lg text-zinc-400 mb-6">
              Todo lo que necesitás saber para comprar con confianza en Azul Colchones
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full text-zinc-300 text-sm">
              <CheckCircle className="w-4 h-4" />
              Última actualización: Noviembre 2024
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="w-full">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {mainSections.map((section, index) => (
              <div 
                key={index}
                className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 hover:bg-zinc-800/60 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-zinc-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-zinc-300" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{section.title}</h2>
                </div>
                
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Sections */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="space-y-8">
            {importantSections.map((section, index) => (
              <div 
                key={index}
                className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-6 h-6 md:w-7 md:h-7 text-zinc-300" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                        {section.title}
                      </h2>
                      <p className="text-sm md:text-base text-zinc-400">{section.subtitle}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {section.content.map((item, i) => (
                      <div key={i} className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4">
                        <div className="text-sm font-semibold text-white mb-2">
                          {item.label}
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info Cards */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-6">
            {additionalInfo.map((info, index) => (
              <div
                key={index}
                className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6 hover:bg-zinc-800/40 transition-all"
              >
                <div className="w-10 h-10 bg-zinc-700/50 rounded-lg flex items-center justify-center mb-4">
                  <info.icon className="w-5 h-5 text-zinc-300" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{info.title}</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {info.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Info Section */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-zinc-700/50 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-zinc-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">{paymentInfo.title}</h2>
            </div>
            <ul className="space-y-3">
              {paymentInfo.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Consumer Defense */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Defensa del Consumidor
            </h2>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              Tus derechos están protegidos por la Ley 24.240 de Defensa del Consumidor. 
              Ante cualquier inconveniente, podés recurrir a los organismos de defensa del consumidor.
            </p>
            <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 md:p-6 mb-4">
              <p className="text-sm text-zinc-300 mb-2">
                <strong className="text-white">Autoridad de Aplicación:</strong>
              </p>
              <p className="text-sm text-zinc-400 mb-3">
                Dirección General de Defensa y Protección del Consumidor
              </p>
              <div className="space-y-2 text-sm text-zinc-300">
                <p>📞 147 (CABA) | 0800-666-1518 (Nacional)</p>
                <a 
                  href="https://www.argentina.gob.ar/produccion/defensadelconsumidor"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-white underline transition-colors"
                >
                  www.argentina.gob.ar/produccion/defensadelconsumidor
                  <span className="text-xs">↗</span>
                </a>
              </div>
            </div>
            <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 md:p-6">
              <p className="text-sm text-zinc-300 mb-2">
                <strong className="text-white">COPREC - Conciliación Previa:</strong>
              </p>
              <a 
                href="https://www.buenosaires.gob.ar/defensaconsumidor/coprec"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white underline transition-colors"
              >
                www.buenosaires.gob.ar/defensaconsumidor/coprec
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Tenés dudas sobre las condiciones?
            </h2>
            <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
              Nuestro equipo está disponible para resolver cualquier consulta sobre el proceso de compra
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
                href="tel:+541140000000"
                className="inline-flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                <Phone className="w-5 h-5" />
                +54 11 4000-0000
              </a>
            </div>
            <p className="text-xs text-zinc-500 mt-6">
              Horario de atención: Lunes a Viernes de 9:00 a 18:00hs | Sábados de 10:00 a 14:00hs
            </p>
          </div>
        </div>
      </section>

      {/* Footer Legal */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-zinc-500">
              Estas condiciones se rigen por la legislación argentina vigente
            </p>
            <p className="text-xs text-zinc-600">
              Ley 24.240 de Defensa del Consumidor • Ley 25.326 de Protección de Datos Personales • 
              Código Civil y Comercial de la Nación
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}