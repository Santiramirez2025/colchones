import { Shield, Package, Clock, AlertTriangle, CheckCircle, Truck, FileText } from 'lucide-react'

export default function GarantiaPage() {
  const sections = [
    {
      icon: Shield,
      title: 'Cobertura de Garantía',
      content: 'La garantía es de 3 años sobre defectos de fabricación. Cubre imperfecciones del producto que no sean causadas por uso indebido o desgaste normal.',
      color: 'emerald'
    },
    {
      icon: AlertTriangle,
      title: 'Revisión en la Entrega',
      alert: true,
      items: [
        'Revisar el producto inmediatamente al recibirlo',
        'Indicar cualquier desperfecto del embalaje en el albarán',
        'Rechazar la entrega si hay roturas o daños visibles',
        'No se aceptan reclamaciones después de firmar el albarán'
      ]
    },
    {
      icon: Clock,
      title: 'Plazo de Reclamación',
      content: 'Agujeros, manchas en el tejido, hilos sueltos u otras imperfecciones similares que no sean reclamadas en el momento de la entrega, o dentro de las 24 horas siguientes a su recepción, quedarán excluidas de la garantía.',
      highlight: '24 horas para reclamar defectos visibles'
    },
    {
      icon: Package,
      title: 'Tolerancias de Medidas',
      content: 'Las medidas de largo, ancho y altura de colchones y toppers admiten variaciones de ±3 cm. No se aceptan devoluciones por ligeras variaciones de medida.',
      color: 'cyan'
    },
    {
      icon: Truck,
      title: 'Producto Equivocado o Extraviado',
      items: [
        'Si recibes un producto equivocado, solicita devolución/reposición en 24 horas',
        'Si la mercancía se extravía, enviamos el producto de nuevo sin coste',
        'Realizamos reembolso total si es necesario'
      ]
    },
    {
      icon: FileText,
      title: 'Garantía Legal',
      content: 'Con carácter general, la garantía legal de los productos es de tres años desde la entrega. Dispones de dos meses para comunicar las faltas de conformidad. Los defectos manifestados después de los primeros seis meses no se presumirán como defectos de fábrica.'
    }
  ]

  const exclusions = [
    'Uso con somieres de muelles (elimina la garantía)',
    'Daños causados por uso indebido',
    'Desgaste normal del producto',
    'Defectos no comunicados en 24 horas',
    'Daños del embalaje no indicados en el albarán'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl mb-6 border border-emerald-500/30">
            <Shield className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Garantía de 3 Años
          </h1>
          <p className="text-zinc-400 text-lg">Protección completa en tu compra</p>
        </div>

        {/* Important Alert */}
        <div className="mb-12 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">⚠️ Importante</h3>
              <p className="text-zinc-300 leading-relaxed">
                <strong className="text-white">Revisa tu producto en el momento de la entrega.</strong> Cualquier desperfecto del embalaje debe ser indicado en el albarán. En caso de rotura o daños, <strong className="text-white">rechaza la entrega</strong> y te enviaremos el producto de nuevo sin coste adicional.
              </p>
            </div>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {sections.map((section, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br from-zinc-900 to-zinc-950 border ${
                section.alert 
                  ? 'border-amber-500/20' 
                  : 'border-white/10'
              } rounded-2xl p-6 hover:border-emerald-500/30 transition-all`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-${section.color || 'emerald'}-500/10 rounded-xl flex items-center justify-center`}>
                  <section.icon className={`w-6 h-6 text-${section.color || 'emerald'}-400`} />
                </div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              
              {section.content && (
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {section.content}
                </p>
              )}

              {section.highlight && (
                <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                  <p className="text-sm font-semibold text-emerald-400">
                    ⏰ {section.highlight}
                  </p>
                </div>
              )}

              {section.items && (
                <ul className="space-y-2 mt-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Exclusions */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-red-500/20 rounded-2xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Exclusiones de Garantía</h2>
          </div>
          
          <ul className="space-y-3">
            {exclusions.map((exclusion, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="text-red-400 font-bold mt-0.5">✕</span>
                <span>{exclusion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">¿Necesitas ayuda?</h2>
          <p className="text-zinc-300 mb-6">
            Si tienes alguna duda sobre la garantía o necesitas hacer una reclamación
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:garantia@tiendacolchon.es"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10"
            >
              <FileText className="w-5 h-5" />
              garantia@tiendacolchon.es
            </a>
            <a 
              href="tel:+34900123456"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
            >
              <Shield className="w-5 h-5" />
              900 123 456
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500">
            Garantía válida desde la fecha de entrega del producto
          </p>
        </div>
      </div>
    </div>
  )
}