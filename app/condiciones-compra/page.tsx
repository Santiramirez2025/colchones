import { ShoppingBag, CreditCard, Truck, RotateCcw, Shield, AlertCircle, CheckCircle, Mail, Phone, Euro } from 'lucide-react'

export default function CondicionesCompraPage() {
  const mainSections = [
    {
      icon: ShoppingBag,
      title: 'Proceso de Compra',
      items: [
        'Selecciona tu colchón y medida en el catálogo',
        'Añade al carrito y revisa tu pedido',
        'Completa el formulario con tus datos',
        'Recibirás confirmación por email al finalizar'
      ]
    },
    {
      icon: Euro,
      title: 'Precios y Ofertas',
      items: [
        'Precios finales con IVA incluido',
        'Envío gratis a península española',
        'Promociones válidas según disponibilidad',
        'Nos reservamos el derecho a modificar precios'
      ]
    },
    {
      icon: CreditCard,
      title: 'Métodos de Pago',
      items: [
        'Tarjeta de crédito/débito (Visa, Mastercard)',
        'PayPal',
        'Transferencia bancaria',
        'Pago 100% seguro con encriptación SSL'
      ]
    },
    {
      icon: Truck,
      title: 'Envío y Entrega',
      items: [
        'Península: gratis en 48-72h laborables',
        'Baleares: 15€ adicionales (5-7 días)',
        'Canarias, Ceuta y Melilla: consultar',
        'Subida a domicilio disponible por 29€'
      ]
    }
  ]

  const importantSections = [
    {
      icon: RotateCcw,
      title: 'Derecho de Desistimiento',
      subtitle: '30 días de prueba sin compromiso',
      content: [
        {
          label: 'Plazo',
          text: 'Tienes 30 días naturales desde la recepción del colchón para probarlo.'
        },
        {
          label: 'Condiciones',
          text: 'El colchón debe estar en perfectas condiciones, sin manchas ni roturas. Recomendamos usar protector desde el primer día.'
        },
        {
          label: 'Proceso',
          text: 'Contacta con nosotros por email o teléfono. Coordinamos la recogida gratuita y tramitamos el reembolso en 14 días.'
        },
        {
          label: 'Excepciones',
          text: 'No se admiten devoluciones de productos personalizados o con medidas especiales bajo pedido.'
        }
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Garantía Legal',
      subtitle: '3 años de garantía en todos los colchones',
      content: [
        {
          label: 'Cobertura',
          text: 'Cubre defectos de fabricación y materiales. No cubre desgaste normal por uso.'
        },
        {
          label: 'Qué cubre',
          text: 'Hundimientos superiores a 2.5cm, roturas de costuras, defectos en cremalleras.'
        },
        {
          label: 'Qué NO cubre',
          text: 'Daños por uso indebido, manchas, quemaduras, roturas por mascotas, o falta de mantenimiento.'
        },
        {
          label: 'Activación',
          text: 'Guarda tu factura de compra. Es imprescindible para cualquier reclamación de garantía.'
        }
      ],
      color: 'from-emerald-500 to-green-500'
    }
  ]

  const additionalInfo = [
    {
      icon: AlertCircle,
      title: 'Disponibilidad de Productos',
      text: 'Los productos están sujetos a disponibilidad de stock. En caso de no disponibilidad, te informaremos en un plazo máximo de 24h y podrás cancelar el pedido con reembolso íntegro.'
    },
    {
      icon: CheckCircle,
      title: 'Modificación o Cancelación',
      text: 'Puedes modificar o cancelar tu pedido sin coste hasta que sea enviado. Una vez en tránsito, aplica el derecho de desistimiento de 30 días.'
    },
    {
      icon: Truck,
      title: 'Recepción del Pedido',
      text: 'Es importante que revises el paquete en presencia del transportista. Si detectas daños, anótalo en el albarán de entrega y contacta con nosotros en 24h.'
    }
  ]

  const paymentInfo = {
    title: 'Facturación',
    items: [
      'La factura se genera automáticamente y se envía por email',
      'Puedes solicitar factura a nombre de empresa indicándolo en el checkout',
      'Para modificar datos de facturación, contacta antes del envío',
      'Cumplimos con la normativa fiscal española vigente'
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl mb-6 border border-violet-500/30">
            <ShoppingBag className="w-10 h-10 text-violet-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Condiciones de Compra
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Todo lo que necesitas saber para comprar con confianza
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm">
            <CheckCircle className="w-4 h-4" />
            Última actualización: Octubre 2025
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {mainSections.map((section, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              
              <ul className="space-y-2.5">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Important Sections - Full Width */}
        <div className="space-y-8 mb-12">
          {importantSections.map((section, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${section.color}`} />
              
              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${section.color} flex-shrink-0`}>
                    <section.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{section.title}</h2>
                    <p className="text-zinc-400">{section.subtitle}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {section.content.map((item, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${section.color}`} />
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

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {additionalInfo.map((info, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-white/5 rounded-xl p-6 hover:border-violet-500/20 transition-all"
            >
              <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4">
                <info.icon className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{info.title}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {info.text}
              </p>
            </div>
          ))}
        </div>

        {/* Payment Info Section */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Euro className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">{paymentInfo.title}</h2>
          </div>
          <ul className="space-y-3">
            {paymentInfo.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Dispute Resolution */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Resolución de Conflictos</h2>
          <p className="text-zinc-300 mb-4 leading-relaxed">
            Como consumidor, tienes derecho a recurrir a entidades de resolución alternativa de litigios. 
            De acuerdo con el Reglamento (UE) 524/2013, la Comisión Europea facilita una plataforma de resolución de litigios en línea.
          </p>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
            <p className="text-sm text-zinc-400 mb-2">
              <strong className="text-white">Plataforma ODR (Online Dispute Resolution):</strong>
            </p>
            <a 
              href="https://ec.europa.eu/consumers/odr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline text-sm break-all"
            >
              https://ec.europa.eu/consumers/odr
            </a>
          </div>
          <p className="text-xs text-zinc-500">
            También puedes contactar con las juntas arbitrales de consumo de tu comunidad autónoma.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">¿Tienes dudas sobre las condiciones?</h2>
          <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
            Nuestro equipo está disponible para resolver cualquier pregunta sobre el proceso de compra
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:info@tiendacolchon.es"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10"
            >
              <Mail className="w-5 h-5" />
              info@tiendacolchon.es
            </a>
            <a 
              href="tel:+34900123456"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10"
            >
              <Phone className="w-5 h-5" />
              +34 900 123 456
            </a>
          </div>
          <p className="text-xs text-zinc-500 mt-6">
            Horario de atención: Lunes a Viernes de 9:00 a 19:00h
          </p>
        </div>

        {/* Footer Legal */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500 mb-2">
            Estas condiciones se rigen por la legislación española
          </p>
          <p className="text-xs text-zinc-600">
            Ley 3/2014 de defensa de los consumidores y usuarios • Real Decreto Legislativo 1/2007 • Ley 34/2002 LSSI-CE
          </p>
        </div>

      </div>
    </div>
  )
}