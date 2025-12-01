'use client'

import { Heart, Shield, Truck, Users, Award, Target, CheckCircle, Star, MapPin, Calendar, Home } from 'lucide-react'

export default function SobreNosotrosPage() {
  const valores = [
    {
      icon: Heart,
      title: 'Tradición familiar',
      description: 'Más de 35 años de experiencia familiar en el rubro nos respaldan. Tres generaciones dedicadas al descanso de nuestros clientes.',
      color: 'from-rose-500/20 to-pink-500/20',
      iconColor: 'text-rose-400',
      borderColor: 'border-rose-500/30'
    },
    {
      icon: Shield,
      title: 'Calidad garantizada',
      description: 'Seleccionamos cuidadosamente cada colchón para asegurar los más altos estándares de calidad y confort para vos y tu familia.',
      color: 'from-violet-500/20 to-purple-500/20',
      iconColor: 'text-violet-400',
      borderColor: 'border-violet-500/30'
    },
    {
      icon: Users,
      title: 'Atención personalizada',
      description: 'Te recibimos en nuestro showroom con calidez y profesionalismo. Nuestro equipo está siempre disponible para asesorarte.',
      color: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30'
    },
    {
      icon: Home,
      title: 'Compromiso local',
      description: 'Somos un comercio de Villa María para Villa María. Apoyamos a nuestra comunidad y creemos en el valor del comercio local.',
      color: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/30'
    }
  ]

  const stats = [
    { number: '+35', label: 'años de trayectoria' },
    { number: '3', label: 'generaciones' },
    { number: '100%', label: 'atención familiar' },
    { number: '+10.000', label: 'clientes satisfechos' }
  ]

  const hitos = [
    {
      year: '1989',
      title: 'Nuestros inicios',
      description: 'Abrimos nuestras puertas en Villa María con el sueño de ofrecer colchones de calidad a precios justos.'
    },
    {
      year: '2000',
      title: 'Expansión',
      description: 'Ampliamos nuestro showroom y sumamos nuevas marcas premium a nuestro catálogo.'
    },
    {
      year: '2015',
      title: 'Segunda generación',
      description: 'La familia crece y los hijos se suman al negocio, renovando el compromiso con nuestros clientes.'
    },
    {
      year: '2024',
      title: 'Presencia digital',
      description: 'Lanzamos nuestra tienda online para llegar a más hogares en toda la región.'
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
            Sobre Nosotros
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Somos un comercio familiar de Villa María con más de <span className="text-white font-bold">35 años de trayectoria</span> en la venta de colchones. 
            Tres generaciones dedicadas a brindarte el mejor descanso.
          </p>
        </div>

        {/* Nuestra Historia */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-3xl p-8 md:p-12 mb-16">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-violet-500/30">
              <Target className="w-8 h-8 text-violet-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Nuestra historia</h2>
              <p className="text-zinc-300 text-lg leading-relaxed mb-4">
                Desde 1989, Azul Colchones es sinónimo de confianza y calidad en Villa María. 
                Comenzamos como un pequeño negocio familiar con el sueño de ayudar a las personas 
                a descansar mejor, y hoy somos referentes en la región.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed mb-4">
                Lo que empezó como un emprendimiento familiar se convirtió en una tradición que 
                pasa de generación en generación. Nuestro compromiso sigue siendo el mismo: 
                ofrecerte colchones de primera calidad con el respaldo de nuestra experiencia y 
                el calor de un negocio familiar.
              </p>
              <p className="text-zinc-300 text-lg leading-relaxed">
                Hoy, con más de tres décadas en el mercado, seguimos creciendo sin perder nuestra esencia: 
                la atención personalizada, el asesoramiento honesto y el compromiso con cada cliente 
                que nos elige.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 text-center hover:border-violet-500/30 transition-all hover:scale-105"
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

        {/* Showroom Location */}
        <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/30 rounded-3xl p-8 md:p-12 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-violet-500/30">
              <MapPin className="w-10 h-10 text-violet-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-3">
                Visitá nuestro showroom
              </h2>
              <p className="text-zinc-300 text-lg mb-4">
                Te esperamos en nuestro local para que puedas probar y ver todos nuestros colchones
              </p>
              <div className="flex flex-col gap-2 text-zinc-300">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <MapPin className="w-5 h-5 text-violet-400" />
                  <span className="font-semibold">Balerdi 855, Villa María, Córdoba</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Calendar className="w-5 h-5 text-violet-400" />
                  <span>Lunes a Viernes: 9:00 - 19:00 | Sábados: 9:00 - 13:00</span>
                </div>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Balerdi+855+Villa+María+Córdoba"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-violet-600 rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
            >
              Ver en el mapa
            </a>
          </div>
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
                className={`bg-gradient-to-br ${valor.color} border ${valor.borderColor} rounded-2xl p-8 hover:scale-[1.02] transition-all`}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${valor.color} rounded-xl flex items-center justify-center mb-4 border ${valor.borderColor}`}>
                  <valor.icon className={`w-7 h-7 ${valor.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {valor.title}
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  {valor.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Nuestra trayectoria
          </h2>
          <div className="space-y-8">
            {hitos.map((hito, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 rounded-xl flex items-center justify-center">
                    <span className="text-violet-400 font-black text-lg">
                      {hito.year}
                    </span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {hito.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {hito.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Por qué elegirnos */}
        <div className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/30 rounded-3xl p-8 md:p-12">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-violet-500/30">
              <Award className="w-8 h-8 text-violet-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                ¿Por qué elegirnos?
              </h2>
              <p className="text-zinc-300 text-lg">
                Somos más que una tienda. Somos tu familia en el descanso, con la experiencia 
                de más de 35 años cuidando el sueño de los vecinos de Villa María.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Más de 35 años de experiencia en el rubro',
              'Comercio familiar de tercera generación',
              'Showroom en Villa María para probar los productos',
              'Asesoramiento personalizado sin presiones',
              'Garantía de 3 años en todos los colchones',
              'Entrega e instalación en toda la región',
              'Precios justos y promociones frecuentes',
              'Atención cercana y profesional'
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
          <p className="text-zinc-400 text-lg mb-6">
            ¿Querés conocernos mejor? Te esperamos en nuestro showroom
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-violet-500/30"
            >
              Contactanos
              <Star className="w-5 h-5" />
            </a>
            <a
              href="/productos"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all"
            >
              Ver catálogo
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}