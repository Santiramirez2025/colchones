import { FileText, ShoppingBag, Truck, RotateCcw, Shield, Copyright, Scale, Mail, Phone } from 'lucide-react'

export default function TerminosPage() {
  const sections = [
    {
      icon: FileText,
      title: 'Aceptación de los Términos',
      content: 'Al acceder y utilizar este sitio web, aceptas estar sujeto a estos términos y condiciones de uso y todas las leyes aplicables.'
    },
    {
      icon: ShoppingBag,
      title: 'Compra de Productos',
      items: [
        'Debes tener al menos 18 años',
        'Proporcionar información veraz',
        'Aceptar precios al momento de compra',
        'Recibirás confirmación por email'
      ]
    },
    {
      icon: Truck,
      title: 'Envíos y Entregas',
      content: 'Entregamos en toda España peninsular en 24-48 horas laborables. Envío gratuito para pedidos superiores a 500€.'
    },
    {
      icon: RotateCcw,
      title: 'Política de Devoluciones',
      content: 'Puedes solicitar la devolución de tu colchón si no cumple con tus expectativas o presenta algún defecto. Gestionamos el proceso sin complicaciones.'
    },
    {
      icon: Shield,
      title: 'Garantía',
      content: 'Todos nuestros productos tienen 3 años de garantía contra defectos de fabricación.'
    },
    {
      icon: Copyright,
      title: 'Propiedad Intelectual',
      content: 'Todo el contenido de este sitio (textos, imágenes, logos, diseños) es propiedad de Descanso Premium y está protegido por las leyes de propiedad intelectual.'
    },
    {
      icon: Scale,
      title: 'Limitación de Responsabilidad',
      content: 'Descanso Premium no será responsable de daños indirectos, incidentales o consecuentes derivados del uso de nuestros productos.'
    },
    {
      icon: Scale,
      title: 'Ley Aplicable',
      content: 'Estos términos se rigen por la legislación española. Cualquier disputa se resolverá en los tribunales de Madrid.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mb-6 border border-cyan-500/30">
            <FileText className="w-10 h-10 text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Términos y Condiciones
          </h1>
          <p className="text-zinc-400">Última actualización: Octubre 2025</p>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              
              {section.items ? (
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-cyan-400 mt-1">•</span>
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
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">¿Preguntas sobre los términos?</h2>
          <p className="text-zinc-300 mb-6">Estamos aquí para ayudarte</p>
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
            Al realizar una compra, aceptas automáticamente estos términos y condiciones
          </p>
        </div>
      </div>
    </div>
  )
}