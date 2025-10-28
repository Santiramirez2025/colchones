'use client'

import { motion } from 'framer-motion'
import { Building2, Users, Award, TrendingUp, Phone, Mail } from 'lucide-react'
import { useState } from 'react'

export default function ProfesionalPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Gracias por tu interés. Nos pondremos en contacto contigo pronto.')
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Soluciones para Profesionales
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Precios especiales y asesoramiento personalizado para hoteles, 
              interioristas y profesionales del descanso
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Ventajas para profesionales
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas para equipar tus proyectos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-6">
                  <benefit.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Sectors */}
      <section className="section-padding bg-warm-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Sectores que trabajamos
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl transition-shadow"
              >
                <div className="text-6xl mb-4 text-center">{sector.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-center">
                  {sector.title}
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  {sector.description}
                </p>
                <ul className="space-y-2">
                  {sector.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Solicita información
            </h2>
            <p className="text-xl text-gray-600">
              Cuéntanos tu proyecto y te enviaremos un presupuesto personalizado
            </p>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary-600"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Tipo de proyecto *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary-600"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="hotel">Hotel / Alojamiento</option>
                  <option value="interiorismo">Interiorismo</option>
                  <option value="fisioterapia">Fisioterapia / Salud</option>
                  <option value="retail">Retail / Tienda</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Cuéntanos sobre tu proyecto
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary-600"
                  placeholder="Número de unidades, características específicas, plazos..."
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Enviar solicitud
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="card text-center">
              <Phone className="w-8 h-8 text-primary-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Teléfono</h3>
              <p className="text-gray-600">+34 900 123 456</p>
              <p className="text-sm text-gray-500 mt-1">Lun-Vie 9:00-18:00</p>
            </div>
            <div className="card text-center">
              <Mail className="w-8 h-8 text-primary-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-gray-600">profesional@descansopremium.es</p>
              <p className="text-sm text-gray-500 mt-1">Respuesta en 24h</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const benefits = [
  {
    icon: TrendingUp,
    title: 'Precios especiales',
    description: 'Descuentos por volumen y condiciones preferentes',
  },
  {
    icon: Users,
    title: 'Asesor dedicado',
    description: 'Un experto para todos tus proyectos',
  },
  {
    icon: Award,
    title: 'Garantía extendida',
    description: 'Cobertura especial para instalaciones profesionales',
  },
  {
    icon: Building2,
    title: 'Logística adaptada',
    description: 'Entregas programadas según tus necesidades',
  },
]

const sectors = [
  {
    icon: '🏨',
    title: 'Hoteles',
    description: 'Equipamiento completo para alojamientos',
    features: [
      'Descuentos desde 10 unidades',
      'Logística coordinada',
      'Garantía profesional',
      'Reposición express',
    ],
  },
  {
    icon: '🏠',
    title: 'Interioristas',
    description: 'Soluciones para tus proyectos residenciales',
    features: [
      'Catálogo exclusivo',
      'Muestras personalizadas',
      'Comisiones especiales',
      'Soporte técnico',
    ],
  },
  {
    icon: '⚕️',
    title: 'Fisioterapeutas',
    description: 'Productos ergonómicos y terapéuticos',
    features: [
      'Colchones terapéuticos',
      'Certificaciones médicas',
      'Formación producto',
      'Precio profesional',
    ],
  },
]
