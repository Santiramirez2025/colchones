import { ArrowRight, Sparkles, Zap, Target, CheckCircle2, Clock } from 'lucide-react'

export default function CTASection2025() {
  const features = [
    { icon: Target, text: "Análisis personalizado" },
    { icon: Clock, text: "Resultados en 60seg" },
    { icon: CheckCircle2, text: "100% gratis" }
  ]

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-600">
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]" />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
              <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span className="text-sm font-black text-white tracking-wider">
                ENCUENTRA TU MATCH PERFECTO
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-8 mb-12">
            
            {/* Title with Enhanced Typography */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              <span className="block mb-3">
                ¿Aún tienes dudas
              </span>
              <span className="block relative inline-block">
                <span className="relative z-10">sobre cuál elegir?</span>
                {/* Underline decoration */}
                <div className="absolute bottom-2 left-0 right-0 h-3 bg-yellow-300/30 -z-10 transform -rotate-1" />
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
              Responde <span className="font-bold text-yellow-300">5 preguntas sencillas</span> y nuestro 
              simulador IA encontrará tu colchón perfecto en 
              <span className="font-bold text-yellow-300"> menos de 60 segundos</span>.
            </p>

            {/* Features Pills */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
                >
                  <feature.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button Container */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            {/* Main CTA Button */}
            <a
              href="/simulador"
              className="group relative overflow-hidden px-8 sm:px-10 py-5 sm:py-6 bg-white rounded-2xl shadow-2xl hover:shadow-[0_20px_60px_rgba(255,255,255,0.4)] transition-all duration-500 hover:scale-105 active:scale-95"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              
              <div className="relative flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-violet-600 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                  Iniciar Test Personalizado
                </span>
                <ArrowRight className="w-6 h-6 text-violet-600 group-hover:translate-x-2 transition-transform duration-300" />
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
            </a>

            {/* Secondary Button */}
            <a
              href="/catalogo"
              className="group px-8 py-5 rounded-2xl border-2 border-white/30 backdrop-blur-md text-white font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-lg">Ver Catálogo Completo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { value: "98%", label: "Satisfacción", sublabel: "de nuestros clientes" },
              { value: "5★", label: "Valoración", sublabel: "en +10K reviews" },
              { value: "2min", label: "Tiempo medio", sublabel: "para completar test" }
            ].map((stat, i) => (
              <div
                key={i}
                className="relative group p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative text-center">
                  <div className="text-4xl sm:text-5xl font-black text-white mb-2">{stat.value}</div>
                  <div className="text-sm font-bold text-white/90 mb-1">{stat.label}</div>
                  <div className="text-xs text-white/60">{stat.sublabel}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-white/70 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Sin registro • Sin datos personales • Resultados instantáneos</span>
            </p>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  )
}