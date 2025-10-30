'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Star, TrendingUp, Award, Sparkles, ArrowRight, Heart, ShoppingCart, CheckCircle2, Zap } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'

export default function ProductShowcase() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      
      {/* Animated background blobs */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute top-20 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-20 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section - PREMIUM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge superior */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 px-5 py-2 rounded-full mb-6"
          >
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-bold text-purple-600 uppercase tracking-wide">
              Los favoritos de 2025
            </span>
            <Sparkles className="w-4 h-4 text-pink-600" />
          </motion.div>

          {/* Título principal */}
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Colchones que están
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                revolucionando el descanso
              </span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute bottom-2 left-0 h-3 bg-gradient-to-r from-purple-200/50 to-pink-200/50 -z-10"
              />
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            Tecnología premium + diseño inteligente = tu mejor inversión en salud
          </p>

          {/* Stats mini */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold">4.9/5 en todas las gamas</span>
            </div>
            <span className="hidden sm:block">•</span>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span className="font-semibold">Certificación ISO 9001</span>
            </div>
          </div>
        </motion.div>

        {/* Products Grid - ULTRA PREMIUM */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-purple-200 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
                
                {/* Badges superiores */}
                <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start">
                  {product.badge && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wide shadow-lg ${product.badgeColor}`}
                    >
                      {product.badge}
                    </motion.div>
                  )}
                  
                  {/* Heart button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all group/heart"
                  >
                    <Heart className="w-5 h-5 text-gray-400 group-hover/heart:text-red-500 group-hover/heart:fill-red-500 transition-all" />
                  </motion.button>
                </div>

                {/* Image Container */}
                <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                  {/* Placeholder con gradiente */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-full h-full bg-gradient-to-br ${product.gradient} opacity-20`} />
                    <div className="absolute text-6xl">{product.emoji}</div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Vista rápida</span>
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  {/* Name & Price */}
                  <h3 className="text-2xl font-black mb-2 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {product.price}€
                    </span>
                    {product.oldPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        {product.oldPrice}€
                      </span>
                    )}
                    {product.discount && (
                      <span className="text-sm font-bold text-green-600">
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={`/catalogo/${product.id}`}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold shadow-lg hover:shadow-purple-500/50 transition-all group/btn"
                  >
                    <span>Ver detalles</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-2xl font-bold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 group shadow-lg hover:shadow-purple-500/30"
          >
            <span>Ver catálogo completo</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </Link>

          <p className="text-sm text-gray-500 mt-4">
            🚚 Envío gratis 24-48h • 💤 Certificados de calidad europea • 🛡️ 3 años garantía
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// DATA - VERSIÓN MEJORADA
const featuredProducts = [
  {
    id: 1,
    name: 'Premium Cloud',
    price: 799,
    oldPrice: 999,
    discount: 20,
    image: '/images/colchon1.jpg',
    emoji: '☁️',
    rating: 4.9,
    reviews: 245,
    features: [
      'Memory Foam 7 capas',
      'Termorregulador inteligente',
      'Hipoalergénico certificado',
      'Garantía extendida 12 años'
    ],
    badge: 'Más vendido',
    badgeColor: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
    gradient: 'from-cyan-200 to-blue-300'
  },
  {
    id: 2,
    name: 'Ergo Max Pro',
    price: 1099,
    oldPrice: null,
    image: '/images/colchon2.jpg',
    emoji: '⚡',
    rating: 4.8,
    reviews: 189,
    features: [
      'Núcleo muelles ensacados',
      'Extra firmeza lumbar',
      'Tratamiento anti-ácaros',
      'Bordes reforzados 360°'
    ],
    badge: 'Premium',
    badgeColor: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
    gradient: 'from-purple-200 to-pink-300'
  },
  {
    id: 3,
    name: 'Comfort Plus Eco',
    price: 649,
    oldPrice: 799,
    discount: 19,
    image: '/images/colchon3.jpg',
    emoji: '🌿',
    rating: 4.7,
    reviews: 312,
    features: [
      'Látex 100% natural',
      'Ultra transpirable',
      'Certificado ecológico',
      'Fabricación sostenible'
    ],
    badge: 'Eco-Friendly',
    badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
    gradient: 'from-green-200 to-emerald-300'
  },
]