import { Truck, MapPin, Clock, Package, CheckCircle, AlertTriangle, Plane, Calendar } from 'lucide-react'

export default function EnviosPage() {
  const shippingZones = [
    {
      zone: 'España Península',
      icon: MapPin,
      price: 'GRATIS',
      days: '3-6 días laborables',
      color: 'emerald',
      highlight: true
    },
    {
      zone: 'Baleares',
      icon: MapPin,
      price: 'GRATIS',
      days: '4-10 días laborables',
      color: 'cyan'
    },
    {
      zone: 'Portugal',
      icon: MapPin,
      price: '10€',
      days: '3-6 días laborables',
      color: 'blue'
    },
    {
      zone: 'Europa',
      icon: Plane,
      price: 'Consultar',
      days: '4-6 días laborables',
      note: 'Alemania, Francia, Italia (hasta 160cm ancho)',
      color: 'violet'
    }
  ]

  const deliverySteps = [
    {
      icon: Package,
      title: 'Fabricación bajo pedido',
      description: 'Tu colchón se fabrica específicamente para ti para garantizar máxima frescura y calidad'
    },
    {
      icon: Truck,
      title: 'Envasado al vacío',
      description: 'Lo enrollamos y envasamos justo antes del envío para conservar todas sus propiedades'
    },
    {
      icon: Clock,
      title: 'Envío rápido',
      description: 'Entrega en 3-6 días laborables en península (medidas especiales +1-2 días)'
    },
    {
      icon: CheckCircle,
      title: 'Entrega en domicilio',
      description: 'Directamente en la puerta de tu casa si las condiciones del edificio lo permiten'
    }
  ]

  const importantNotes = [
    'Las entregas se realizan solo de Lunes a Viernes',
    'Sábados, domingos y festivos NO son días laborables',
    'Recibirás email con número de seguimiento',
    'Si no recibes tu pedido en 11 días, contáctanos',
    'La ausencia en la entrega alargará el plazo'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl mb-6 border border-blue-500/30">
            <Truck className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Envíos y Entregas
          </h1>
          <p className="text-zinc-400 text-lg">Envío gratis a toda España Península</p>
        </div>

        {/* Important Alert */}
        <div className="mb-12 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">⚠️ Revisa tu colchón al recibirlo</h3>
              <p className="text-zinc-300 leading-relaxed text-sm">
                <strong className="text-white">Revisa el embalaje en el momento de la entrega.</strong> Si hay roturas o daños visibles, <strong className="text-white">rechaza la entrega</strong> y te lo enviaremos de nuevo sin coste. No se aceptan reclamaciones después de firmar el albarán.
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Zones */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Zonas de Envío</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingZones.map((zone, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br from-zinc-900 to-zinc-950 border ${
                  zone.highlight 
                    ? 'border-emerald-500/30 ring-2 ring-emerald-500/20' 
                    : 'border-white/10'
                } rounded-2xl p-6 hover:border-${zone.color}-500/30 transition-all text-center relative`}
              >
                {zone.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Más Popular
                  </div>
                )}
                
                <div className={`w-14 h-14 bg-${zone.color}-500/10 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <zone.icon className={`w-7 h-7 text-${zone.color}-400`} />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{zone.zone}</h3>
                
                <div className={`text-3xl font-black mb-2 ${
                  zone.price === 'GRATIS' ? 'text-emerald-400' : 'text-white'
                }`}>
                  {zone.price}
                </div>
                
                <p className="text-sm text-zinc-400 mb-2">{zone.days}</p>
                
                {zone.note && (
                  <p className="text-xs text-zinc-500 mt-3 border-t border-white/10 pt-3">
                    {zone.note}
                  </p>
                )}
              </div>
            ))}
          </div>
          
          {/* No shipping zones */}
          <div className="mt-6 bg-zinc-900/50 border border-red-500/20 rounded-xl p-4 text-center">
            <p className="text-sm text-zinc-400">
              ❌ <strong className="text-red-400">No enviamos a:</strong> Canarias, Ceuta y Melilla
              <span className="text-zinc-500 ml-2">(trabajando para hacerlo pronto)</span>
            </p>
          </div>
        </div>

        {/* Delivery Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Proceso de Entrega</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverySteps.map((step, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all relative"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-blue-400" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Delivery Days */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Días de Entrega</h3>
            </div>
            
            <ul className="space-y-2">
              {importantNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Special Measures */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Medidas Especiales</h3>
            </div>
            
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Los colchones con largos y anchos especiales (medidas menos frecuentes) pueden tardar <strong className="text-white">1-2 días adicionales</strong> de lo previsto debido a su fabricación personalizada.
            </p>
            
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
              <p className="text-xs text-cyan-400 font-semibold">
                💡 Fabricamos cada colchón bajo pedido para garantizar máxima calidad
              </p>
            </div>
          </div>
        </div>

        {/* Change Address Warning */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/20 rounded-2xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Cambio de Dirección</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Los cambios de dirección tras el envío pueden generar <strong className="text-white">gastos adicionales</strong> que deberá asumir el comprador. Estos gastos no serán reembolsados aunque se ejerza el derecho de devolución.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">¿Tienes dudas sobre tu envío?</h2>
          <p className="text-zinc-300 mb-6">
            Estamos aquí para ayudarte con cualquier consulta
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:envios@tiendacolchon.es"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10"
            >
              <Package className="w-5 h-5" />
              envios@tiendacolchon.es
            </a>
            <a 
              href="tel:+34900123456"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
            >
              <Truck className="w-5 h-5" />
              900 123 456
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500">
            Todos los colchones incluyen número de seguimiento · Entrega asegurada
          </p>
        </div>
      </div>
    </div>
  )
}