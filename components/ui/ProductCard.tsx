'use client'

import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  reviews: number
  features: string[]
  match?: number
}

interface ProductCardProps {
  product: Product
  isRecommended?: boolean
}

export default function ProductCard({ product, isRecommended }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card relative overflow-hidden h-full flex flex-col"
    >
      {/* Badge de recomendación */}
      {isRecommended && (
        <div className="absolute top-4 right-4 z-10 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
          <Sparkles className="w-4 h-4" />
          Ideal para ti
        </div>
      )}

      {/* Match percentage */}
      {product.match && (
        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary-600">
          {product.match}% match
        </div>
      )}

      {/* Imagen del producto */}
      <div className="relative h-64 bg-gradient-to-br from-warm-100 to-accent-mint rounded-xl mb-4 overflow-hidden">
        {/* Placeholder - sustituir con imagen real */}
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <div className="text-center">
            <div className="text-6xl mb-2">🛏️</div>
            <p className="text-sm">Imagen del producto</p>
          </div>
        </div>
        
        {/* Botón favorito */}
        <button className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all">
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
        </button>
      </div>

      {/* Información del producto */}
      <div className="flex-grow">
        <Link href={`/producto/${product.id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 font-semibold">{product.rating}</span>
          </div>
          <span className="text-gray-500 text-sm">({product.reviews} opiniones)</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="bg-warm-100 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Precio y CTA */}
      <div className="border-t pt-4 mt-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-3xl font-bold text-primary-600">{product.price}€</p>
            <p className="text-sm text-gray-500">o desde {Math.round(product.price / 12)}€/mes</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/producto/${product.id}`} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary py-3 text-sm"
            >
              Ver detalles
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary p-3"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
