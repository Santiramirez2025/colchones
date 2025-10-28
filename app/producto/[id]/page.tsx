'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Check, Truck, Shield, Award } from 'lucide-react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function ProductoPage() {
  const params = useParams()
  const productId = params?.id as string
  
  // En producción, estos datos vendrían de una API/CMS
  const product = getProductById(productId)
  
  const [selectedSize, setSelectedSize] = useState('150x190')
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Producto no encontrado</h1>
          <Link href="/catalogo">
            <button className="btn-primary">Volver al catálogo</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="sticky top-24">
              <div className="aspect-square bg-gradient-to-br from-warm-100 to-accent-mint rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
                <span className="text-9xl">🛏️</span>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    className="aspect-square bg-gradient-to-br from-warm-100 to-accent-mint rounded-lg hover:ring-2 ring-primary-600 transition-all"
                  >
                    <span className="text-4xl">🛏️</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-semibold">{product.rating}</span>
                </div>
                <span className="text-gray-600">
                  ({product.reviews} opiniones)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-5xl font-bold text-primary-600 mb-2">
                  {product.price}€
                </p>
                <p className="text-gray-600">
                  o desde <span className="font-semibold">{Math.round(product.price / 12)}€/mes</span> sin intereses
                </p>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-700 mb-8">
                {product.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <label className="block font-semibold mb-3">
                  Tamaño del colchón
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setSelectedSize(size.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedSize === size.value
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <p className="font-semibold">{size.label}</p>
                      <p className="text-sm text-gray-600">{size.value}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="block font-semibold mb-3">Cantidad</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border-2 rounded-lg hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 border-2 rounded-lg hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-4 mb-8">
                <button className="w-full btn-primary flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Añadir al carrito
                </button>
                <button className="w-full btn-secondary flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Añadir a favoritos
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="text-center">
                    <badge.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold">{badge.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="card mb-16">
          <div className="border-b mb-8">
            <div className="flex gap-8">
              {['Especificaciones', 'Opiniones', 'Envío y Devoluciones'].map((tab) => (
                <button
                  key={tab}
                  className="pb-4 border-b-2 border-primary-600 font-semibold text-primary-600"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Especificaciones técnicas</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {specs.map((spec, index) => (
                  <div key={index} className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">{spec.label}</span>
                    <span className="font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold mb-8">También te puede interesar</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Aquí irían productos relacionados */}
          </div>
        </div>
      </div>
    </div>
  )
}

function getProductById(id: string) {
  const products = {
    '1': {
      id: 1,
      name: 'Premium Cloud',
      price: 799,
      rating: 4.9,
      reviews: 245,
      description: 'Colchón de alta gama con tecnología Memory Foam de última generación. Diseñado para proporcionar el equilibrio perfecto entre confort y soporte, adaptándose a tu cuerpo para un descanso reparador.',
      features: [
        'Memory Foam de alta densidad',
        'Termorregulador',
        'Hipoalergénico',
        'Funda lavable',
        'Certificado Oeko-Tex',
        'Fabricado en España',
      ],
    },
    '2': {
      id: 2,
      name: 'Ergo Max',
      price: 1099,
      rating: 4.8,
      reviews: 189,
      description: 'Colchón premium con sistema de muelles ensacados y capa superior de memory foam. Máximo soporte y adaptabilidad para un descanso sin igual.',
      features: [
        'Muelles ensacados individuales',
        'Capa memory foam',
        'Extra firmeza',
        'Anti-ácaros',
        'Tecnología cooling',
        '10 años de garantía',
      ],
    },
  }
  
  return products[id as keyof typeof products]
}

const sizes = [
  { value: '90x190', label: 'Individual' },
  { value: '135x190', label: 'Matrimonio' },
  { value: '150x190', label: 'Queen' },
  { value: '160x200', label: 'King' },
  { value: '180x200', label: 'Super King' },
]

const trustBadges = [
  { icon: Truck, title: 'Envío 24-48h' },
  { icon: Shield, title: '100 noches' },
  { icon: Award, title: '10 años garantía' },
]

const specs = [
  { label: 'Tipo', value: 'Memory Foam' },
  { label: 'Firmeza', value: 'Media' },
  { label: 'Altura', value: '25cm' },
  { label: 'Núcleo', value: 'HR de 18cm' },
  { label: 'Capa viscoelástica', value: '5cm' },
  { label: 'Funda', value: 'Stretch lavable' },
  { label: 'Certificaciones', value: 'Oeko-Tex, CertiPUR' },
  { label: 'Garantía', value: '10 años' },
]
