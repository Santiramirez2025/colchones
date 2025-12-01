import { Scale, Building2, MapPin, FileText, Mail, Phone } from 'lucide-react'

export default function AvisoLegalPage() {
  const sections = [
    {
      icon: Building2,
      title: 'Datos Identificativos',
      items: [
        'Razón Social: TiendaColchon Argentina S.R.L.',
        'CUIT: 30-12345678-9',
        'Inscripción IGJ: Registro N° 123456',
        'Domicilio: Av. Córdoba 1234, C1055AAB CABA, Argentina'
      ]
    },
    {
      icon: MapPin,
      title: 'Contacto',
      items: [
        'Email: info@tiendacolchon.com.ar',
        'Teléfono: +54 11 4000-0000',
        'WhatsApp: +54 9 11 5000-0000',
        'Horario: Lunes a Viernes de 9:00 a 18:00hs'
      ]
    },
    {
      icon: Scale,
      title: 'Condiciones de Uso',
      items: [
        'Acceso libre y gratuito al sitio web',
        'Uso responsable de los contenidos',
        'Prohibido el uso fraudulento o ilegal',
        'Nos reservamos el derecho de modificar contenidos sin previo aviso'
      ]
    },
    {
      icon: FileText,
      title: 'Propiedad Intelectual',
      content: 'Todos los contenidos del sitio (textos, imágenes, logotipos, marcas, diseño) son propiedad exclusiva de TiendaColchon Argentina S.R.L. o están debidamente licenciados. Queda prohibida su reproducción, distribución o modificación sin autorización expresa por escrito.'
    }
  ]

  const legalInfo = [
    {
      title: 'Responsabilidad',
      content: 'TiendaColchon Argentina S.R.L. no se responsabiliza por daños directos o indirectos derivados del uso del sitio web. Nos esforzamos por mantener la información actualizada y precisa, pero no garantizamos la ausencia de errores u omisiones.'
    },
    {
      title: 'Enlaces a Terceros',
      content: 'Nuestro sitio puede contener enlaces a sitios web de terceros. No nos responsabilizamos por el contenido, políticas de privacidad o prácticas de estos sitios externos. El acceso a los mismos es bajo responsabilidad del usuario.'
    },
    {
      title: 'Ley Aplicable y Jurisdicción',
      content: 'Este aviso legal se rige por las leyes de la República Argentina. Para cualquier controversia o conflicto, las partes se someten a la jurisdicción de los Tribunales Ordinarios de la Ciudad Autónoma de Buenos Aires, renunciando expresamente a cualquier otro fuero o jurisdicción que pudiera corresponderles.'
    },
    {
      title: 'Defensa del Consumidor',
      content: 'Cumplimos con la Ley 24.240 de Defensa del Consumidor y sus modificatorias. Los consumidores pueden presentar reclamos ante la Dirección General de Defensa y Protección del Consumidor de la Ciudad Autónoma de Buenos Aires o el organismo provincial correspondiente.'
    }
  ]

  return (
    <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden antialiased">
      {/* Hero Section */}
      <section className="w-full border-b border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl mb-6">
              <Scale className="w-8 h-8 md:w-10 md:h-10 text-zinc-300" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Aviso Legal
            </h1>
            <p className="text-lg text-zinc-400">
              Última actualización: Noviembre 2024
            </p>
          </div>
        </div>
      </section>

      {/* Main Sections Grid */}
      <section className="w-full">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {sections.map((section, index) => (
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
                
                {section.items ? (
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                        <span className="text-zinc-500 mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
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
        </div>
      </section>

      {/* Additional Legal Info */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="space-y-6">
            {legalInfo.map((info, index) => (
              <div 
                key={index}
                className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6 md:p-8"
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                  {info.title}
                </h3>
                <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                  {info.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COPREC Notice */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Resolución de Conflictos
            </h2>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              De acuerdo con la normativa vigente, los consumidores tienen derecho a recurrir a entidades de resolución alternativa de litigios en materia de consumo.
            </p>
            <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 md:p-6">
              <p className="text-sm md:text-base text-zinc-300 mb-3">
                <strong className="text-white">COPREC - Sistema de Resolución de Conflictos en Línea</strong>
              </p>
              <p className="text-sm text-zinc-400 mb-4">
                Conciliación Previa en las Relaciones de Consumo para la Ciudad Autónoma de Buenos Aires
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

      {/* Consumer Protection */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Defensa del Consumidor
            </h2>
            <div className="space-y-4 text-sm md:text-base text-zinc-300">
              <p className="leading-relaxed">
                <strong className="text-white">Ley N° 24.240 de Defensa del Consumidor:</strong> Este sitio cumple con todas las disposiciones de la normativa argentina de protección al consumidor.
              </p>
              <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 md:p-6">
                <p className="text-sm text-zinc-400 mb-2">
                  <strong className="text-white">Autoridad de Aplicación CABA:</strong>
                </p>
                <p className="text-sm text-zinc-300 mb-1">
                  Dirección General de Defensa y Protección del Consumidor
                </p>
                <p className="text-xs md:text-sm text-zinc-400">
                  📞 147 (CABA) | 0800-666-1518 (Nacional)
                </p>
                <a 
                  href="https://www.argentina.gob.ar/produccion/defensadelconsumidor"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white underline transition-colors mt-2"
                >
                  www.argentina.gob.ar/produccion/defensadelconsumidor
                  <span className="text-xs">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Consultas legales?
            </h2>
            <p className="text-zinc-300 mb-8">
              Estamos a tu disposición para cualquier duda o aclaración
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:legal@tiendacolchon.com.ar"
                className="inline-flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                <Mail className="w-5 h-5" />
                legal@tiendacolchon.com.ar
              </a>
              <a 
                href="tel:+541140000000"
                className="inline-flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                <Phone className="w-5 h-5" />
                +54 11 4000-0000
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-sm text-center text-zinc-500">
            Este aviso legal cumple con la Ley 24.240 de Defensa del Consumidor, 
            Ley 25.326 de Protección de Datos Personales y disposiciones del Código Civil y Comercial de la Nación Argentina
          </p>
        </div>
      </section>
    </div>
  )
}