'use client'

import { Phone, Mail, Clock, Send, CheckCircle, MessageCircle, MapPin, Award } from 'lucide-react'
import { useState } from 'react'

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    
    setTimeout(() => setSubmitted(false), 5000)
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Showroom',
      value: 'Balerdi 855',
      subtitle: 'Villa María, Córdoba',
      link: 'https://maps.google.com/?q=Balerdi+855+Villa+Maria+Cordoba'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      value: '+54 353 XXX-XXXX',
      link: 'tel:+54353XXXXXXX'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@azulcolchones.com',
      link: 'mailto:info@azulcolchones.com'
    },
    {
      icon: Clock,
      title: 'Horario',
      value: 'Lun-Vie: 9:00-18:00',
      subtitle: 'Sáb: 10:00-14:00'
    }
  ]

  const faqs = [
    {
      q: '¿Cuánto tarda el envío?',
      a: 'En Villa María: 24-48hs. Interior del país: 3-7 días hábiles según zona.'
    },
    {
      q: '¿Puedo devolver el colchón?',
      a: 'Sí, tenés 10 días corridos de arrepentimiento según Ley de Defensa del Consumidor.'
    },
    {
      q: '¿Tienen garantía?',
      a: 'Todos nuestros productos tienen garantía de fábrica. Consultá por cada modelo.'
    },
    {
      q: '¿Puedo visitarlos?',
      a: 'Sí, visitanos en Balerdi 855, Villa María. Te asesoramos personalmente.'
    }
  ]

  return (
    <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden antialiased">
      {/* Hero Section */}
      <section className="w-full border-b border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl mb-6">
              <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-zinc-300" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Contactanos
            </h1>
            <p className="text-lg text-zinc-400 mb-6">
              Estamos para ayudarte a encontrar tu descanso perfecto
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full text-zinc-300 text-sm">
              <Award className="w-4 h-4" />
              Más de 35 años de experiencia en Villa María
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="w-full">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 hover:bg-zinc-800/60 transition-all text-center"
              >
                <div className="w-12 h-12 bg-zinc-700/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-zinc-300" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm">{info.title}</h3>
                {info.link ? (
                  <a 
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-zinc-300 hover:text-white transition-colors font-medium block text-sm"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-zinc-300 font-medium text-sm">{info.value}</p>
                )}
                {info.subtitle && (
                  <p className="text-xs text-zinc-500 mt-1">{info.subtitle}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Envianos un mensaje
              </h2>
              <p className="text-zinc-400 mb-8">
                Respondemos en menos de 24 horas
              </p>

              {submitted && (
                <div className="mb-6 bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-zinc-300 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">¡Mensaje enviado!</p>
                    <p className="text-zinc-400 text-sm">Te responderemos pronto</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                      placeholder="+54 9 XXX XXX-XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Asunto *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-zinc-600 transition-all"
                  >
                    <option value="" className="bg-zinc-900">Seleccioná un asunto</option>
                    <option value="producto" className="bg-zinc-900">Consulta sobre productos</option>
                    <option value="pedido" className="bg-zinc-900">Estado de mi pedido</option>
                    <option value="envio" className="bg-zinc-900">Consulta de envío</option>
                    <option value="garantia" className="bg-zinc-900">Garantía</option>
                    <option value="showroom" className="bg-zinc-900">Visita al showroom</option>
                    <option value="otro" className="bg-zinc-900">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all resize-none"
                    placeholder="Contanos cómo podemos ayudarte..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || submitted || !formData.name || !formData.email || !formData.subject || !formData.message}
                  className="w-full bg-zinc-700 hover:bg-zinc-600 text-white px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : submitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>¡Enviado!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Enviar mensaje</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* FAQs */}
              <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                  Preguntas frecuentes
                </h3>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="pb-6 border-b border-zinc-700/50 last:border-0">
                      <h4 className="font-semibold text-white mb-2 text-sm md:text-base">
                        {faq.q}
                      </h4>
                      <p className="text-sm text-zinc-400">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opening Hours */}
              <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-zinc-700/50 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-zinc-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Horario</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 text-sm">Lunes a Viernes</span>
                    <span className="font-bold text-white text-sm">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 text-sm">Sábados</span>
                    <span className="font-bold text-white text-sm">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 text-sm">Domingos</span>
                    <span className="font-semibold text-zinc-500 text-sm">Cerrado</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8 text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-700/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-zinc-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  ¿Necesitás ayuda inmediata?
                </h3>
                <p className="text-zinc-400 mb-6 text-sm">
                  Escribinos por WhatsApp
                </p>
                <a
                  href="https://wa.me/54935XXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Abrir WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-700/50 rounded-2xl mb-6">
                <Award className="w-8 h-8 text-zinc-300" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Más de 35 años de trayectoria
              </h2>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Somos referentes en la venta de colchones y sommiers en Villa María. 
                Atendemos principalmente en nuestra ciudad pero también realizamos envíos a todo el país.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 md:gap-8 mt-8">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">35+</div>
                  <div className="text-sm text-zinc-400">Años de experiencia</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
                  <div className="text-sm text-zinc-400">Garantía de calidad</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">24hs</div>
                  <div className="text-sm text-zinc-400">Entrega Villa María</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Visitá nuestro showroom
            </h2>
            <p className="text-zinc-400">
              Balerdi 855, Villa María, Córdoba
            </p>
          </div>
          
          <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl overflow-hidden">
            <div className="aspect-video bg-zinc-800 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-500 mb-4">Mapa de ubicación</p>
                <a
                  href="https://maps.google.com/?q=Balerdi+855+Villa+Maria+Cordoba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-xl font-semibold transition-all text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  )
}