'use client'

import Link from 'next/link'
import { 
  Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter,
  Sparkles, Shield, Clock, Award, Star, Check, ChevronDown,
  ArrowRight, Lock, Truck, Heart, Send
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const footerSections = [
    {
      id: 'products',
      title: 'Productos',
      icon: Sparkles,
      links: [
        { href: '/catalogo', label: 'Colchones Premium' },
        { href: '/catalogo?type=almohadas', label: 'Almohadas Ergonómicas' },
        { href: '/catalogo?type=bases', label: 'Bases Ajustables' },
        { href: '/catalogo?type=protectores', label: 'Protectores' },
        { href: '/comparador', label: 'Comparador' },
      ]
    },
    {
      id: 'support',
      title: 'Servicio',
      icon: Shield,
      links: [
        { href: '/garantias', label: 'Garantía 10 Años' },
        { href: '/envios', label: 'Envío Gratis 24-48h' },
        { href: '/devoluciones', label: 'Devolución 100 Noches' },
        { href: '/contacto', label: 'Contacto' },
        { href: '/faq', label: 'Preguntas Frecuentes' },
      ]
    },
    {
      id: 'company',
      title: 'Empresa',
      icon: Heart,
      links: [
        { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
        { href: '/blog', label: 'Guía del Sueño' },
        { href: '/showroom', label: 'Showroom Madrid' },
        { href: '/sostenibilidad', label: 'Sostenibilidad' },
        { href: '/opiniones', label: 'Opiniones Clientes' },
      ]
    },
  ]

  const trustBadges = [
    { icon: Shield, text: 'Hecho en España 🇪🇸', color: 'text-emerald-400' },
    { icon: Award, text: 'Garantía 10 Años', color: 'text-blue-400' },
    { icon: Lock, text: 'Pago Seguro SSL', color: 'text-purple-400' },
    { icon: Star, text: '+3000 Clientes Felices', color: 'text-amber-400' },
  ]

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-blue-500/10 hover:text-blue-400' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-pink-500/10 hover:text-pink-400' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-sky-500/10 hover:text-sky-400' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube', color: 'hover:bg-red-500/10 hover:text-red-400' },
  ]

  return (
    <footer className="relative bg-[#0e0e11] text-gray-300 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-12 lg:py-16 border-b border-gray-800/50"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-4"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Newsletter Exclusiva</span>
                </motion.div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  Consejos de descanso
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
                    directo a tu email
                  </span>
                </h3>
                <p className="text-gray-400 text-sm lg:text-base">
                  Únete a +5,000 personas que mejoran su descanso cada semana
                </p>
              </div>

              <motion.form
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSubmit}
                className="relative"
              >
                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-gray-900 transition-all"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-purple-500/25"
                  >
                    {submitted ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span className="hidden sm:inline">¡Listo!</span>
                      </>
                    ) : isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span className="hidden sm:inline">Suscribir</span>
                      </>
                    )}
                  </motion.button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Sin spam. Cancela cuando quieras.
                </p>
              </motion.form>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4"
            >
              <Link href="/" className="group inline-block mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-xl bg-purple-400/20 blur-md -z-10"
                    />
                  </div>
                  <div>
                    <div className="text-xl font-bold leading-none">
                      <span className="text-white">Descanso</span>
                      <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Premium</span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium tracking-wider uppercase mt-0.5">
                      Sleep Technology
                    </div>
                  </div>
                </div>
              </Link>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Expertos en tecnología del sueño. Diseñamos colchones premium que combinan innovación, confort y salud para tu mejor descanso.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-2 mb-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg bg-gray-900/50 border border-gray-800/50 flex items-center justify-center transition-all ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href="tel:+34900123456"
                  className="flex items-center gap-3 text-sm hover:text-purple-400 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <Phone className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Llámanos</div>
                    <div className="font-semibold text-white">900 123 456</div>
                  </div>
                </a>

                <a
                  href="mailto:info@descansopremium.es"
                  className="flex items-center gap-3 text-sm hover:text-purple-400 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Email</div>
                    <div className="font-medium">info@descansopremium.es</div>
                  </div>
                </a>

                <div className="flex items-start gap-3 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Showroom</div>
                    <div className="text-gray-300 leading-relaxed">
                      Calle Descanso 123<br />
                      28001 Madrid, España
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Links Columns - Desktop */}
            <div className="hidden lg:grid lg:col-span-8 grid-cols-3 gap-8">
              {footerSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <section.icon className="w-5 h-5 text-purple-400" />
                    <h4 className="text-white font-bold text-lg">{section.title}</h4>
                  </div>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors text-sm group inline-flex items-center gap-2"
                        >
                          <span className="relative">
                            {link.label}
                            <motion.span
                              className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Links Columns - Mobile Accordion */}
            <div className="lg:hidden space-y-2">
              {footerSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gray-800/50 rounded-xl overflow-hidden bg-gray-900/30"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-900/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="w-5 h-5 text-purple-400" />
                      <span className="text-white font-bold">{section.title}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: openSection === section.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openSection === section.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="p-4 pt-0 space-y-3">
                          {section.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-8 border-y border-gray-800/50"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col sm:flex-row items-center gap-3 p-4 bg-gray-900/30 border border-gray-800/50 rounded-xl hover:border-gray-700/50 transition-all"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center flex-shrink-0`}>
                  <badge.icon className={`w-5 h-5 ${badge.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-300 text-center sm:text-left">
                  {badge.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Secondary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-10"
        >
          <Link href="/simulador">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 border border-purple-500/20 hover:border-purple-500/40 transition-all p-6 lg:p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Descubre tu colchón ideal
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Test AI personalizado en menos de 2 minutos
                    </p>
                  </div>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25"
                >
                  <span>Empezar Test</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-800/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 text-center lg:text-left">
              <p>
                © {new Date().getFullYear()} <span className="text-gray-400 font-semibold">DescansoPremium</span>. Todos los derechos reservados.
              </p>
              <p className="text-xs mt-1">
                Diseñado con <Heart className="w-3 h-3 inline text-red-500" /> en España
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-sm">
              <Link
                href="/privacidad"
                className="text-gray-500 hover:text-purple-400 transition-colors"
              >
                Privacidad
              </Link>
              <span className="text-gray-800">•</span>
              <Link
                href="/terminos"
                className="text-gray-500 hover:text-purple-400 transition-colors"
              >
                Términos
              </Link>
              <span className="text-gray-800">•</span>
              <Link
                href="/cookies"
                className="text-gray-500 hover:text-purple-400 transition-colors"
              >
                Cookies
              </Link>
              <span className="text-gray-800">•</span>
              <Link
                href="/accesibilidad"
                className="text-gray-500 hover:text-purple-400 transition-colors"
              >
                Accesibilidad
              </Link>
            </div>
          </div>

          {/* Rating Stars */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex items-center justify-center gap-2 text-sm"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-gray-400">
              4.9/5 basado en <span className="text-white font-semibold">3,247 opiniones</span>
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}