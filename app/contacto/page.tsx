'use client'

import { Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
      icon: Phone,
      title: 'Teléfono',
      value: '900 123 456',
      link: 'tel:+34900123456',
      color: 'emerald'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'hola@tiendacolchon.es',
      link: 'mailto:hola@tiendacolchon.es',
      color: 'blue'
    },
    {
      icon: Clock,
      title: 'Horario',
      value: 'Lun-Vie: 9:00-20:00',
      subtitle: 'Sáb: 10:00-14:00',
      color: 'violet'
    }
  ]

  const faqs = [
    {
      q: '¿Cuánto tarda el envío?',
      a: '3-6 días laborables en península. Envío gratis.'
    },
    {
      q: '¿Puedo devolver el colchón?',
      a: 'Sí, si presenta defectos o no cumple con las especificaciones.'
    },
    {
      q: '¿Tienen garantía?',
      a: 'Sí, 3 años de garantía en todos nuestros productos.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl mb-6 border border-violet-500/30">
            <MessageCircle className="w-10 h-10 text-violet-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Contacta con nosotros
          </h1>
          <p className="text-zinc-400 text-lg">
            Estamos aquí para ayudarte a encontrar tu descanso perfecto
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-all text-center"
            >
              <div className={`w-14 h-14 bg-${info.color}-500/10 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <info.icon className={`w-7 h-7 text-${info.color}-400`} />
              </div>
              <h3 className="text-white font-bold mb-2">{info.title}</h3>
              {info.link ? (
                <a 
                  href={info.link}
                  className="text-zinc-300 hover:text-white transition-colors font-semibold block"
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-zinc-300 font-semibold">{info.value}</p>
              )}
              {info.subtitle && (
                <p className="text-sm text-zinc-500 mt-1">{info.subtitle}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-2">Envíanos un mensaje</h2>
            <p className="text-zinc-400 mb-8">Responderemos en menos de 24 horas</p>

            {submitted && (
              <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-emerald-400 font-semibold">¡Mensaje enviado!</p>
                  <p className="text-emerald-400/80 text-sm">Te responderemos pronto</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
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
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
                    placeholder="+34 600 000 000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Asunto *
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
                >
                  <option value="" className="bg-zinc-900">Selecciona un asunto</option>
                  <option value="producto" className="bg-zinc-900">Consulta sobre productos</option>
                  <option value="pedido" className="bg-zinc-900">Estado de mi pedido</option>
                  <option value="devolucion" className="bg-zinc-900">Devolución o cambio</option>
                  <option value="garantia" className="bg-zinc-900">Garantía</option>
                  <option value="otro" className="bg-zinc-900">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Mensaje *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all resize-none"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
            </form>
          </div>

          {/* FAQ & Info */}
          <div className="space-y-6">
            {/* FAQs */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Preguntas frecuentes</h3>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="pb-6 border-b border-white/10 last:border-0">
                    <h4 className="font-semibold text-white mb-2">{faq.q}</h4>
                    <p className="text-sm text-zinc-400">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Horario de atención</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Lunes - Viernes</span>
                  <span className="font-bold text-white">9:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Sábados</span>
                  <span className="font-bold text-white">10:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Domingos</span>
                  <span className="font-semibold text-zinc-500">Cerrado</span>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                ¿Necesitas ayuda inmediata?
              </h3>
              <p className="text-zinc-400 mb-6 text-sm">
                Escríbenos por WhatsApp
              </p>
              <a
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Abrir WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

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