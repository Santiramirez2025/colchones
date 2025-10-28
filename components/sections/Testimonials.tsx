'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

export default function Testimonials() {
  return (
    <section className="section-padding bg-gradient-to-br from-warm-50 to-accent-lavender">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600">
            Miles de personas duermen mejor gracias a nosotros
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card bg-white"
            >
              <Quote className="w-10 h-10 text-primary-600 mb-4 opacity-50" />
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic">{testimonial.text}</p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-mint rounded-full flex items-center justify-center font-bold text-primary-600">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-2">Opiniones verificadas por</p>
          <div className="flex justify-center gap-8 items-center flex-wrap">
            <div className="font-bold text-xl text-gray-700">Trustpilot ★★★★★</div>
            <div className="font-bold text-xl text-gray-700">Google ★★★★★</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const testimonials = [
  {
    name: 'María González',
    location: 'Madrid',
    text: 'Desde que cambié mi colchón, mi calidad de sueño ha mejorado increíblemente. El simulador fue muy preciso y el servicio impecable.',
  },
  {
    name: 'Carlos Ruiz',
    location: 'Barcelona',
    text: 'La mejor inversión que he hecho. Adiós a los dolores de espalda. El equipo me asesoró perfectamente según mis necesidades.',
  },
  {
    name: 'Ana Martínez',
    location: 'Valencia',
    text: 'Excelente relación calidad-precio. El proceso de compra fue muy fácil y la entrega rapidísima. 100% recomendable.',
  },
]
