'use client'

import { Shield, Truck, Award, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

// Mock data since TRUST_FOOTER is not exported from product-data
const TRUST_FOOTER = [
  {
    icon: Shield,
    title: 'Garantía Extendida',
    description: '10 años de garantía total'
  },
  {
    icon: Truck,
    title: 'Envío Gratis',
    description: 'A toda España en 24-48h'
  },
  {
    icon: Award,
    title: 'Calidad Premium',
    description: 'Fabricado en España'
  },
  {
    icon: Heart,
    title: 'Prueba 100 Días',
    description: 'Devolución sin compromiso'
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
      className="py-16 bg-zinc-950 border-t border-white/5"
      aria-label="Garantías y seguridad"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {TRUST_FOOTER.map((item, i) => (
            <div
              key={i}
              className="text-center transition-all duration-500 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 100}ms`
              }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 mb-4 shadow-lg shadow-violet-500/30">
                <item.icon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-white font-bold mb-1">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}