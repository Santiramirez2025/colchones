// components/home/FeaturedProducts.tsx

'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, ArrowRight, Sparkles, TrendingUp, Award, ShoppingBag } from 'lucide-react'

// ✅ Definir el tipo directamente
type FeaturedProduct = {
  id: string
  name: string
  slug: string
  subtitle?: string | null
  price: number
  compareAtPrice?: number | null
  images: string[]
  rating: number
  reviewCount: number
  isBestSeller?: boolean | null
  isNew?: boolean | null
  highlights?: string[]
  category?: string | null  // ✅ CAMBIAR: string en lugar de { name: string }
}

interface FeaturedProductsProps {
  initialProducts: FeaturedProduct[]
}

export function FeaturedProducts({ initialProducts }: FeaturedProductsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // 🔍 DEBUG COMPLETO
  console.log('=== FEATURED PRODUCTS DEBUG ===')
  initialProducts.slice(0, 2).forEach((p, i) => {
    console.log(`Producto ${i + 1}:`, {
      name: p.name,
      price: p.price,
      priceType: typeof p.price,
      compareAtPrice: p.compareAtPrice,
      formatted: p.price.toLocaleString('es-AR')
    })
  })

  // Función helper para formatear precios (maneja centavos o pesos)
  const formatPrice = (price: number) => {
    console.log('formatPrice input:', price)
    // Si es > 10000, probablemente son centavos
    const priceInPesos = price > 10000 ? price / 100 : price
    const formatted = `$${priceInPesos.toLocaleString('es-AR')}`
    console.log('formatPrice output:', formatted)
    return formatted
  }

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950" />
      
      {/* Animated orbs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 space-y-6"
        >
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 backdrop-blur-xl border border-violet-500/20 px-4 py-2 rounded-full">
            <TrendingUp className="w-4 h-4 text-violet-400" />
            <span className="text-white/90 font-bold text-sm">Más vendidos</span>
          </div>

          {/* Título */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            Descubrí nuestros
            <span className="block mt-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              colchones premium
            </span>
          </h2>

          {/* Subtítulo */}
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
            Los más elegidos por miles de personas que ya duermen mejor
          </p>
        </motion.div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {initialProducts.slice(0, 6).map((product, index) => {
            // Calcular descuento si existe compareAtPrice
            const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
const discountPercent = hasDiscount && product.compareAtPrice
  ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
  : 0

            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative"
              >
                <Link href={`/producto/${product.slug}`} className="block">
                  {/* Card container con glassmorphism */}
                  <div className="relative bg-gradient-to-br from-zinc-900/40 to-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/20 hover:-translate-y-2">
                    
                    {/* Gradient hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/10 group-hover:to-fuchsia-500/10 transition-all duration-500 pointer-events-none" />

                    {/* Imagen del producto */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                      <Image
                        src={product.images?.[0] || '/images/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 3}
                      />
                      
                      {/* Overlay gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                      {/* Badges flotantes */}
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 flex-wrap">
                        {product.isBestSeller && (
                          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg">
                            <Award className="w-3 h-3" />
                            Bestseller
                          </span>
                        )}
                        {product.isNew && (
                          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg">
                            <Sparkles className="w-3 h-3" />
                            Nuevo
                          </span>
                        )}
                        {discountPercent > 0 && (
                          <span className="ml-auto inline-flex items-center bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg">
                            -{discountPercent}%
                          </span>
                        )}
                      </div>

                      {/* Rating flotante */}
                      {product.rating > 0 && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-white text-sm font-bold">{product.rating.toFixed(1)}</span>
                          {product.reviewCount > 0 && (
                            <span className="text-white/60 text-xs">({product.reviewCount})</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Contenido del card */}
                    <div className="p-5 sm:p-6 space-y-4 relative z-10">
                      {/* Categoría */}
                      {product.category && (
                        <span className="inline-block text-xs font-semibold text-violet-400 uppercase tracking-wider">
                          {product.category}
                        </span>
                      )}

                      {/* Nombre */}
                      <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-violet-300 transition-colors">
                        {product.name}
                      </h3>

                      {/* Subtítulo */}
                      {product.subtitle && (
                        <p className="text-sm text-zinc-400 line-clamp-2">
                          {product.subtitle}
                        </p>
                      )}

                      {/* Highlights */}
                      {product.highlights && product.highlights.length > 0 && (
                        <ul className="flex flex-wrap gap-2">
                          {product.highlights.slice(0, 3).map((highlight, i) => (
                            <li 
                              key={i} 
                              className="text-xs text-zinc-300 bg-white/5 px-2 py-1 rounded-md border border-white/10"
                            >
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Precio y CTA */}
                      <div className="flex items-end justify-between pt-4 border-t border-white/5">
                        <div className="space-y-1">
                          {hasDiscount && (
                            <span className="block text-sm text-zinc-500 line-through">
                              {formatPrice(product.compareAtPrice!)}
                            </span>
                          )}
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-white">
                              {formatPrice(product.price)}
                            </span>
                            {hasDiscount && discountPercent > 0 && (
                              <span className="text-xs font-bold text-green-400">
                                Ahorrás {discountPercent}%
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl shadow-lg shadow-violet-500/50 group-hover:shadow-xl group-hover:shadow-violet-500/60 transition-shadow"
                          aria-label={`Ver detalles de ${product.name}`}
                        >
                          <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </div>

        {/* CTA para ver más productos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-violet-500/50 transition-all duration-500 hover:scale-105 group"
          >
            <ShoppingBag className="w-5 h-5" />
            Ver todo el catálogo
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}