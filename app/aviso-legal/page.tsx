import { Scale, Building2, MapPin, FileText, Mail, Phone } from 'lucide-react'

export default function AvisoLegalPage() {
  const sections = [
    {
      icon: Building2,
      title: 'Datos Identificativos',
      items: [
        'Razón Social: TiendaColchon S.L.',
        'CIF: B-12345678',
        'Registro Mercantil: Madrid, Tomo 1234, Folio 56, Hoja M-123456',
        'Domicilio: Calle del Descanso, 25, 28001 Madrid'
      ]
    },
    {
      icon: MapPin,
      title: 'Contacto',
      items: [
        'Email: info@tiendacolchon.es',
        'Teléfono: +34 900 123 456',
        'Horario: L-V de 9:00 a 19:00h',
        'Web: www.tiendacolchon.es'
      ]
    },
    {
      icon: Scale,
      title: 'Condiciones de Uso',
      items: [
        'Acceso libre y gratuito',
        'Uso responsable del sitio web',
        'Prohibido uso fraudulento',
        'Nos reservamos el derecho de modificar contenidos'
      ]
    },
    {
      icon: FileText,
      title: 'Propiedad Intelectual',
      content: 'Todos los contenidos del sitio (textos, imágenes, logotipos, diseño) son propiedad de TiendaColchon S.L. o de terceros con licencia. Queda prohibida su reproducción sin autorización.'
    }
  ]

  const legalInfo = [
    {
      title: 'Responsabilidad',
      content: 'TiendaColchon S.L. no se hace responsable de los daños y perjuicios derivados del uso inadecuado del sitio web. Nos esforzamos por mantener la información actualizada, pero no garantizamos la ausencia de errores.'
    },
    {
      title: 'Enlaces Externos',
      content: 'Nuestro sitio puede contener enlaces a sitios web de terceros. No nos hacemos responsables del contenido o políticas de privacidad de estos sitios externos.'
    },
    {
      title: 'Ley Aplicable',
      content: 'Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio del usuario.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl mb-6 border border-violet-500/30">
            <Scale className="w-10 h-10 text-violet-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Aviso Legal
          </h1>
          <p className="text-zinc-400">Última actualización: Octubre 2025</p>
        </div>

        {/* Main Sections Grid */}
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

        {/* Additional Legal Info */}
        <div className="space-y-6 mb-12">
          {legalInfo.map((info, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-white/5 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-3">{info.title}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {info.content}
              </p>
            </div>
          ))}
        </div>

        {/* Dispute Resolution Notice */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Resolución de Conflictos</h2>
          <p className="text-zinc-300 mb-4">
            De acuerdo con la normativa europea, los consumidores tienen derecho a recurrir a entidades de resolución alternativa de litigios en materia de consumo.
          </p>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-sm text-zinc-400">
              <strong className="text-white">Plataforma de Resolución de Litigios en Línea:</strong><br />
              <a 
                href="https://ec.europa.eu/consumers/odr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">¿Dudas legales?</h2>
          <p className="text-zinc-300 mb-6">Estamos a tu disposición para cualquier consulta</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:legal@tiendacolchon.es"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10"
            >
              <Mail className="w-5 h-5" />
              legal@tiendacolchon.es
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
            Este aviso legal cumple con la Ley 34/2002 de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE)
          </p>
        </div>
      </div>
    </div>
  )
}