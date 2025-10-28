'use client'

import { motion } from 'framer-motion'
import { Shield, Truck, Award, CreditCard } from 'lucide-react'

export default function TrustBadges() {
  return (
    <section className="py-12 bg-warm-50 border-y">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-full mb-3">
                <badge.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold mb-1">{badge.title}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const badges = [
  {
    icon: Shield,
    title: '100 Noches',
    description: 'Garantía de prueba',
  },
  {
    icon: Truck,
    title: 'Envío Gratis',
    description: 'En 24-48h',
  },
  {
    icon: Award,
    title: '10 Años',
    description: 'Garantía total',
  },
  {
    icon: CreditCard,
    title: 'Pago Flexible',
    description: 'Hasta 12 meses',
  },
]
