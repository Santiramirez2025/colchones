'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, Check, Heart, TrendingUp } from 'lucide-react'
import ProductCard from '../../components/ui/ProductCard'

interface SimulatorResultsProps {
  answers: Record<string, any>
}

export default function SimulatorResults({ answers }: SimulatorResultsProps) {
  // Lógica de recomendación basada en respuestas
  const recommendations = getRecommendations(answers)

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-white to-accent-mint pt-24">
      <div className="container-custom py-12">
        {/* Header con confeti animado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-16 h-16 text-primary-600 mx-auto" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            ¡Hemos encontrado tu match perfecto!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Basándonos en tus preferencias, estos son los colchones ideales para ti
          </p>
        </motion.div>

        {/* Insights personalizados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="card bg-gradient-to-br from-primary-50 to-accent-mint">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary-600" />
              Tu perfil de descanso
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {recommendations.insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Productos recomendados */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Tus colchones recomendados
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {recommendations.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <ProductCard product={product} isRecommended={index === 0} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="card max-w-2xl mx-auto bg-gradient-to-br from-primary-600 to-primary-700 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres asesoramiento personalizado?
            </h3>
            <p className="mb-6 opacity-90">
              Guarda tus resultados y recibe un descuento exclusivo del 10%
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="tu@email.com"
                className="px-6 py-3 rounded-full text-gray-900 flex-1 max-w-xs"
              />
              <button className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all">
                Enviar resultados
              </button>
            </div>
          </div>

          <Link href="/comparador">
            <button className="btn-secondary">
              Comparar estos modelos
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

function getRecommendations(answers: Record<string, any>) {
  // Lógica simplificada de recomendación
  const insights = [
    'Necesitas un colchón de firmeza media-alta',
    'Te recomendamos materiales transpirables',
    'Ideal para durmientes de lado',
  ]

  const products = [
    {
      id: 1,
      name: 'Premium Cloud',
      price: 799,
      image: '/images/colchon1.jpg',
      rating: 4.9,
      reviews: 245,
      features: ['Memory Foam', 'Termorregulador', 'Hipoalergénico'],
      match: 98,
    },
    {
      id: 2,
      name: 'Ergo Max',
      price: 1099,
      image: '/images/colchon2.jpg',
      rating: 4.8,
      reviews: 189,
      features: ['Núcleo de muelles', 'Extra firmeza', 'Anti-ácaros'],
      match: 92,
    },
    {
      id: 3,
      name: 'Comfort Plus',
      price: 649,
      image: '/images/colchon3.jpg',
      rating: 4.7,
      reviews: 312,
      features: ['Látex natural', 'Transpirable', 'Ecológico'],
      match: 87,
    },
  ]

  return { insights, products }
}
