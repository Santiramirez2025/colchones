import { RotateCcw, Package, AlertTriangle, CheckCircle, Euro, Clock, Shield, Mail, Phone } from 'lucide-react'

export default function DevolucionesPage() {
  const returnCosts = [
    {
      country: 'España',
      inTransit: '14€',
      delivered: '28€',
      color: 'emerald'
    },
    {
      country: 'Portugal',
      inTransit: '25€',
      delivered: '50€',
      color: 'blue'
    }
  ]

  const conditions = [
    {
      icon: Package,
      title: 'Embalaje original',
      description: 'El colchón debe estar en su embalaje y precinto original, sin abrir ni desprecintado'
    },
    {
      icon: Shield,
      title: 'Sin usar',
      description: 'Por razones de higiene, no se aceptan colchones que hayan sido utilizados'
    },
    {
      icon: CheckCircle,
      title: 'Estado perfecto',
      description: 'Debe estar en las mismas condiciones en que lo recibiste, sin daños ni manchas'
    },
    {
      icon: Clock,
      title: '14 días naturales',
      description: 'Tienes 14 días desde la recepción para solicitar la devolución'
    }
  ]

  const process = [
    {
      step: 1,
      title: 'Contacta con nosotros',
      description: 'Envía un email o llama dentro de los 14 días naturales desde la recepción'
    },
    {
      step: 2,
      title: 'Confirma tu pedido',
      description: 'Indícanos tu número de pedido y el motivo de la devolución'
    },
    {
      step: 3,
      title: 'Prepara el envío',
      description: 'Empaqueta el colchón en su embalaje original sin desprecintarlo'
    },
    {
      step: 4,
      title: 'Envío y verificación',
      description: 'Organizamos la recogida. Verificamos el estado al recibirlo'
    },
    {
      step: 5,
      title: 'Reembolso',
      description: 'Reembolso en 14 días naturales al mismo medio de pago (menos costes de devolución)'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mb-6 border border-cyan-500/30">
            <RotateCcw className="w-10 h-10 text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Devoluciones y Cambios
          </h1>
          <p className="text-zinc-400 text-lg">14 días de garantía de devolución</p>
        </div>

        {/* Important Alert */}
        <div className="mb-12 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">⚠️ Importante - Higiene y Salud</h3>
              <p className="text-zinc-300 leading-relaxed text-sm">
                Por razones de <strong className="text-white">higiene y salud</strong>, <strong className="text-white">NO se aceptan colchones desprecintados o usados</strong>. El colchón debe estar en su embalaje original, sin abrir, en perfectas condiciones y sin signos de uso.
              </p>
            </div>
          </div>
        </div>

        {/* Return Conditions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Condiciones de Devolución</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conditions.map((condition, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all text-center"
              >
                <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <condition.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{condition.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{condition.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Return Costs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Costes de Devolución</h2>
          <p className="text-zinc-400 text-center mb-8">
            Los costes varían según el estado del pedido en el momento de la solicitud
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Free if in production */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">En Fabricación</h3>
              <div className="text-4xl font-black text-emerald-400 mb-2">GRATIS</div>
              <p className="text-xs text-zinc-400">Cancelación sin coste si aún no ha salido de fábrica</p>
            </div>

            {/* Spain costs */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-white mb-4">España</h3>
              </div>
              <div className="space-y-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-zinc-500 mb-1">En tránsito</p>
                  <p className="text-2xl font-black text-white">14€</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-zinc-500 mb-1">Ya entregado</p>
                  <p className="text-2xl font-black text-white">28€</p>
                </div>
              </div>
            </div>

            {/* Portugal costs */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-white mb-4">Portugal</h3>
              </div>
              <div className="space-y-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-zinc-500 mb-1">En tránsito</p>
                  <p className="text-2xl font-black text-white">25€</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-zinc-500 mb-1">Ya entregado</p>
                  <p className="text-2xl font-black text-white">50€</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-cyan-500/20 rounded-xl p-4 text-center">
            <p className="text-sm text-zinc-400">
              💡 <strong className="text-cyan-400">Importante:</strong> Los costes de devolución se descontarán del reembolso total
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Proceso de Devolución</h2>
          <div className="space-y-4">
            {process.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-400">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Refund Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center">
                <Euro className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Reembolso</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Reembolso en 14 días naturales tras recibir y verificar el colchón</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Se realizará al mismo método de pago utilizado en la compra</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Se descontarán los costes de devolución del importe total</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Cambios</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Contacta dentro de los 14 días naturales</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Aplican las mismas condiciones (sin desprecintado)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>El cliente asume los gastos de envío y recogida</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">¿Necesitas hacer una devolución?</h2>
          <p className="text-zinc-300 mb-6">
            Contacta con nuestro equipo y te guiaremos en todo el proceso
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
              href="tel:+34650906891"
              className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
            >
              <Phone className="w-5 h-5" />
              650 906 891
            </a>
          </div>
          <p className="text-xs text-zinc-500 mt-4">
            Horario: Lunes a Viernes de 10:00 a 14:00
          </p>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500">
            No se aceptan devoluciones que no hayan sido previamente comunicadas
          </p>
        </div>
      </div>
    </div>
  )
}