import { Shield, Lock, Eye, FileText, Mail, Phone } from 'lucide-react'

export default function PrivacidadPage() {
  const sections = [
    {
      icon: FileText,
      title: 'Información que Recopilamos',
      items: [
        'Datos personales (nombre, email, teléfono)',
        'Dirección de envío y facturación',
        'Información de pago (Stripe seguro)',
        'Historial de compras'
      ]
    },
    {
      icon: Eye,
      title: 'Uso de la Información',
      items: [
        'Procesar y enviar pedidos',
        'Mejorar productos y servicios',
        'Comunicaciones relevantes',
        'Cumplir obligaciones legales'
      ]
    },
    {
      icon: Lock,
      title: 'Protección de Datos',
      content: 'Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra acceso no autorizado.'
    },
    {
      icon: Shield,
      title: 'Tus Derechos (RGPD)',
      items: [
        'Acceso a tus datos',
        'Rectificación de datos',
        'Solicitar eliminación',
        'Portabilidad de datos'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl mb-6 border border-violet-500/30">
            <Shield className="w-10 h-10 text-violet-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Política de Privacidad
          </h1>
          <p className="text-zinc-400">Última actualización: Octubre 2025</p>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {sections.map((section, index) => (
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
              
              {section.items ? (
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-violet-400 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {section.content}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">¿Preguntas sobre privacidad?</h2>
          <p className="text-zinc-300 mb-6">Contáctanos para cualquier consulta</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:privacidad@tiendacolchon.es"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10"
            >
              <Mail className="w-5 h-5" />
              privacidad@tiendacolchon.es
            </a>
            <a 
              href="tel:+34900123456"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10"
            >
              <Phone className="w-5 h-5" />
              +34 900 123 456
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500">
            Cumplimos con el RGPD y protegemos tus datos con los más altos estándares de seguridad
          </p>
        </div>
      </div>
    </div>
  )
}