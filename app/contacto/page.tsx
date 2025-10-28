'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Gracias por contactarnos. Te responderemos pronto.')
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-warm-50 to-accent-mint">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contacta con nosotros
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Estamos aquí para ayudarte a encontrar tu descanso perfecto
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-4">
                  <method.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-bold mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-2">{method.value}</p>
                {method.subtitle && (
                  <p className="text-sm text-gray-500">{method.subtitle}</p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="card">
                <h2 className="text-3xl font-bold mb-2">Envíanos un mensaje</h2>
                <p className="text-gray-600 mb-8">
                  Responderemos en menos de 24 horas
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary-600"
                        placeholder="+34 600 000 000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Asunto *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary-600"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="producto">Consulta sobre productos</option>
                      <option value="pedido">Estado de mi pedido</option>
                      <option value="devolucion">Devolución o cambio</option>
                      <option value="garantia">Garantía</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary-600"
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Enviar mensaje
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* FAQ Quick Links */}
              <div className="card">
                <h3 className="text-2xl font-bold mb-4">
                  Preguntas frecuentes
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="pb-4 border-b last:border-0">
                      <h4 className="font-semibold mb-2">{faq.question}</h4>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Chat */}
              <div className="card bg-gradient-to-br from-primary-600 to-primary-700 text-white">
                <MessageCircle className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">
                  Chat en directo
                </h3>
                <p className="mb-6 opacity-90">
                  ¿Necesitas ayuda inmediata? Habla con nuestro equipo
                </p>
                <button className="bg-white text-primary-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all">
                  Iniciar chat
                </button>
              </div>

              {/* Opening Hours */}
              <div className="card">
                <Clock className="w-8 h-8 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold mb-4">Horario de atención</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lunes - Viernes</span>
                    <span className="font-semibold">9:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sábados</span>
                    <span className="font-semibold">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Domingos</span>
                    <span className="font-semibold">Cerrado</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-warm-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visítanos</h2>
            <p className="text-xl text-gray-600">
              Estamos en Madrid, pero entregamos en toda España
            </p>
          </div>

          <div className="card overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-warm-100 to-accent-mint flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                <p className="text-xl font-semibold">Paseo de la Castellana 123</p>
                <p className="text-gray-600">28046 Madrid, España</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const contactMethods = [
  {
    icon: Phone,
    title: 'Teléfono',
    value: '+34 900 123 456',
    subtitle: 'Lun-Vie 9:00-20:00',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@descansopremium.es',
    subtitle: 'Respuesta en 24h',
  },
  {
    icon: MapPin,
    title: 'Dirección',
    value: 'Paseo de la Castellana 123',
    subtitle: '28046 Madrid',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+34 600 000 000',
    subtitle: 'Chat directo',
  },
]

const faqs = [
  {
    question: '¿Cuánto tarda el envío?',
    answer: 'Entregamos en 24-48 horas laborables en toda España.',
  },
  {
    question: '¿Puedo devolver el colchón?',
    answer: 'Sí, tienes 100 noches de prueba para devolverlo sin coste.',
  },
  {
    question: '¿Ofrecen garantía?',
    answer: 'Todos nuestros productos tienen 10 años de garantía.',
  },
]
