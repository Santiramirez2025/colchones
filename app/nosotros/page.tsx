'use client'

import { Heart, Shield, Truck, Users, Award, Target, CheckCircle, Star } from 'lucide-react'

export default function SobreNosotrosPage() {
  const valores = [
    {
      icon: Shield,
      title: 'Calidad garantizada',
      description: 'Seleccionamos cuidadosamente cada colchón para asegurar los más altos estándares de calidad y confort.',
      color: 'violet'
    },
    {
      icon: Heart,
      title: 'Compromiso con tu descanso',
      description: 'Tu bienestar es nuestra prioridad. Trabajamos para que encuentres el colchón perfecto para ti.',
      color: 'rose'
    },
    {
      icon: Truck,
      title: 'Envío rápido y seguro',
      description: 'Entrega en 3-6 días laborables. Tu colchón llega en perfectas condiciones, listo para usar.',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Atención personalizada',
      description: 'Nuestro equipo está disponible para asesorarte y resolver todas tus dudas.',
      color: 'emerald'
    }
  ]

  const stats = [
    { number: '3 años', label: 'de garantía' },
    { number: '100%', label: 'satisfacción' },
    { number: '24/48h', label: 'respuesta' },
    { number: '+5000', label: 'clientes felices' }
  ]

  const proceso = [
    {
      step: '01',
      title: 'Selección rigurosa',
      description: 'Evaluamos y seleccionamos colchones de marcas reconocidas que cumplen nuestros estándares de calidad.'
    },
    {
      step: '02',
      title: 'Asesoramiento experto',
      description: 'Te ayudamos a elegir el colchón ideal según tus necesidades, peso, postura y preferencias de firmeza.'
    },
    {
      step: '03',
      title: 'Gestión directa',
      description: 'Coordinamos todo el proceso de compra y entrega para ofrecerte la mejor experiencia posible.'
    },
    {
      step: '04',
      title: 'Seguimiento continuo',
      description: 'Estamos contigo después de la compra para asegurar tu total satisfacción con el producto.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl mb-6 border border-violet-500/30">
            <Heart className="w-10 h-10 text-violet-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Sobre nosotros
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            En TiendaColchon.es nos dedicamos a conectar a las personas con colchones de calidad excepcional. 
            Creemos que un buen descanso es fundamental para una vida saludable y productiva.
          </p>
        </div>

        {/* Nuestra Misión */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-3xl p-8 md:p-12 mb-16">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Target className="w-8 h-8 text-violet-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Nuestra misión</h2>
              <p className="text-zinc-300 text-lg leading-relaxed mb-4">
                Facilitar el acceso a colchones de alta calidad a precios competitivos. Trabajamos directamente 
                con fabricantes y marcas de confianza para ofrecerte productos que realmente marcan la diferencia 
                en tu descanso.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed">
                Como distribuidores especializados, nuestra experiencia nos permite seleccionar únicamente los 
                mejores productos del mercado, garantizando que cada colchón cumpla con nuestros rigurosos 
                estándares de calidad, confort y durabilidad.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 text-center hover:border-violet-500/30 transition-all"
            >
              <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text mb-2">
                {stat.number}
              </div>
              <div className="text-zinc-400 text-sm font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Valores */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Nuestros valores
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {valores.map((valor, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 hover:border-violet-500/30 transition-all"
              >
                <div className={`w-14 h-14 bg-${valor.color}-500/10 rounded-xl flex items-center justify-center mb-4`}>
                  <valor.icon className={`w-7 h-7 text-${valor.color}-400`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {valor.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {valor.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Proceso */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Cómo trabajamos
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {proceso.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 rounded-xl flex items-center justify-center">
                    <span className="text-violet-400 font-black text-lg">
                      {item.step}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Por qué elegirnos */}
        <div className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/30 rounded-3xl p-8 md:p-12">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 bg-violet-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Award className="w-8 h-8 text-violet-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                ¿Por qué elegirnos?
              </h2>
              <p className="text-zinc-300 text-lg">
                Somos más que una tienda online. Somos especialistas en descanso comprometidos 
                con tu bienestar.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Colchones seleccionados de marcas de confianza',
              'Asesoramiento personalizado sin compromiso',
              'Precios competitivos sin intermediarios innecesarios',
              'Envío rápido y seguro a toda la península',
              'Garantía de 3 años en todos los productos',
              'Atención al cliente cercana y profesional'
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-violet-400 flex-shrink-0" />
                <span className="text-zinc-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center mt-16">
          <p className="text-zinc-400 text-lg mb-8">
            ¿Tienes preguntas? Estamos aquí para ayudarte
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-violet-500/30"
          >
            Contáctanos
            <Star className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}