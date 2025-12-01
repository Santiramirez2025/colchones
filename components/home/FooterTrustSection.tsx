'use client'

import { Shield, Truck, Award, CreditCard } from 'lucide-react'
import { useState, useEffect } from 'react'

// 🎯 TRUST BADGES PIERO ARGENTINA
const TRUST_FOOTER = [
  {
    icon: Shield,
    title: 'Garantía Extendida',
    description: 'Respaldo de fábrica Piero'
  },
  {
    icon: Truck,
    title: 'Envío GRATIS',
    description: 'Villa María y zona en 24-48h'
  },
  {
    icon: Award,
    title: 'Marca Líder',
    description: '40+ años en Argentina'
  },
  {
    icon: CreditCard,
    title: '6 Cuotas sin Interés',
    description: 'Con Mercado Pago'
  }
]

export function FooterTrustSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('trust-section')
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  return (
    <section 
      id="trust-section"
      className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800/50"
      aria-label="Garantías y seguridad"
    >
      <div className="container mx-auto px-4">
        {/* Título sección */}
        <div 
          className="text-center mb-12 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Comprá con <span className="text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text">total confianza</span>
          </h2>
          <p className="text-slate-400 text-lg">
            🇦🇷 Distribuidor oficial Piero en Villa María, Córdoba
          </p>
        </div>

        {/* Grid badges */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {TRUST_FOOTER.map((item, i) => (
            <div
              key={i}
              className="group relative text-center transition-all duration-500 ease-out hover:scale-105"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${i * 150}ms`
              }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl group-hover:border-blue-500/50 transition-all duration-300">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-2xl shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-8 h-8 text-white drop-shadow-lg" aria-hidden="true" />
                </div>
                
                {/* Text */}
                <h3 className="text-white font-black text-lg mb-2 group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className="text-center mt-12 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '600ms'
          }}
        >
          <p className="text-slate-500 text-sm">
            ¿Tenés dudas? <a href="https://wa.me/5493531234567" className="text-blue-400 hover:text-blue-300 font-semibold underline transition-colors">Hablá con nosotros por WhatsApp</a>
          </p>
        </div>
      </div>
    </section>
  )
}