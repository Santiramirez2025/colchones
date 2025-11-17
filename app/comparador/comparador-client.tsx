// app/comparador/comparador-client.tsx - OPTIMIZADO 2025
'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  X, Plus, Check, Star, Zap, Shield, Wind, Leaf, 
  Award, Ruler, Weight, Moon, ArrowRight, ChevronLeft, 
  ChevronRight, Sparkles
} from 'lucide-react'

interface Product {
  id: string
  slug: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  rating: number
  reviewCount: number
  firmness: string
  firmnessValue: number
  height: number
  warranty: number
  trialNights: number
  cooling: boolean
  eco: boolean
  hypoallergenic: boolean
  features: string[]
  techFeatures: string[]
  materials: string[]
  layers: any[]
  transpirability: number
  satisfaction: number
}

interface ComparadorClientProps {
  products: Product[]
}

export default function ComparadorClient({ products }: ComparadorClientProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [showSelector, setShowSelector] = useState(false)
  const [activeTabMobile, setActiveTabMobile] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Añadir producto a comparación
  const addProduct = (product: Product) => {
    if (selectedProducts.length < 4 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product])
      setActiveTabMobile(selectedProducts.length)
    }
    setShowSelector(false)
  }

  // Eliminar producto
  const removeProduct = (productId: string) => {
    const newProducts = selectedProducts.filter(p => p.id !== productId)
    setSelectedProducts(newProducts)
    if (activeTabMobile >= newProducts.length && activeTabMobile > 0) {
      setActiveTabMobile(newProducts.length - 1)
    }
  }

  // Scroll horizontal para mobile
  const scrollToProduct = (index: number) => {
    setActiveTabMobile(index)
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = container.offsetWidth
      container.scrollTo({ left: cardWidth * index, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-violet-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 md:px-6 md:py-3 rounded-full mb-4 md:mb-6">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
            <span className="text-xs md:text-sm font-bold text-white">
              Comparador Inteligente
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-3 md:mb-4 leading-tight">
            Compara y Decide
          </h1>
          
          <p className="text-base md:text-xl text-zinc-300 max-w-2xl mx-auto">
            Analiza hasta 4 colchones lado a lado y encuentra tu match perfecto
          </p>
        </motion.div>

        {/* Empty State */}
        {selectedProducts.length === 0 && (
          <EmptyState onAddProduct={() => setShowSelector(true)} />
        )}

        {/* Product Tabs - Mobile Only */}
        {selectedProducts.length > 0 && (
          <div className="md:hidden mb-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {selectedProducts.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => scrollToProduct(index)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    activeTabMobile === index
                      ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
                      : 'bg-white/5 text-zinc-400 border border-white/10'
                  }`}
                >
                  {product.name.split(' ')[0]}
                </button>
              ))}
              
              {selectedProducts.length < 4 && (
                <button
                  onClick={() => setShowSelector(true)}
                  className="flex-shrink-0 p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Comparison View */}
        {selectedProducts.length > 0 && (
          <>
            {/* Mobile: Carousel */}
            <div className="md:hidden">
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {selectedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="w-full flex-shrink-0 snap-center px-2"
                  >
                    <ProductCardMobile
                      product={product}
                      onRemove={() => removeProduct(product.id)}
                      index={index}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center gap-2 mt-4">
                {selectedProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToProduct(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeTabMobile === index
                        ? 'bg-violet-500 w-6'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: Table */}
            <div className="hidden md:block">
              <ComparisonTable
                products={selectedProducts}
                onRemove={removeProduct}
                onAddMore={() => setShowSelector(true)}
              />
            </div>
          </>
        )}

        {/* Product Selector Modal */}
        <AnimatePresence>
          {showSelector && (
            <ProductSelector
              products={products}
              selectedIds={selectedProducts.map(p => p.id)}
              onSelect={addProduct}
              onClose={() => setShowSelector(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ============================================================================
// EMPTY STATE
// ============================================================================
function EmptyState({ onAddProduct }: { onAddProduct: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto text-center py-16"
    >
      <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
        <Sparkles className="w-12 h-12 text-white" />
      </div>
      
      <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
        Comienza a comparar
      </h2>
      
      <p className="text-zinc-400 text-base md:text-lg mb-8">
        Selecciona hasta 4 colchones para ver una comparación detallada
      </p>
      
      <button
        onClick={onAddProduct}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
      >
        <Plus className="w-5 h-5" />
        Añadir Producto
      </button>
    </motion.div>
  )
}

// ============================================================================
// PRODUCT CARD MOBILE
// ============================================================================
function ProductCardMobile({ 
  product, 
  onRemove, 
  index 
}: { 
  product: Product
  onRemove: () => void
  index: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative"
    >
      {/* Remove button */}
      <button
        onClick={onRemove}
        className="absolute top-4 right-4 w-8 h-8 bg-red-500/20 border border-red-500/50 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition z-10"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Image */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-white/5">
        <Image
          src={product.images[0] || '/placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Product info */}
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-black text-white mb-2">{product.name}</h3>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-zinc-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-white font-semibold text-sm">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-zinc-400 text-sm">
              ({product.reviewCount})
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              {product.price}€
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-lg text-zinc-500 line-through">
                {product.originalPrice}€
              </span>
            )}
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-3">
          <SpecBadge
            icon={Ruler}
            label="Altura"
            value={`${product.height}cm`}
          />
          <SpecBadge
            icon={Moon}
            label="Firmeza"
            value={product.firmness}
          />
          <SpecBadge
            icon={Shield}
            label="Garantía"
            value={`${product.warranty} años`}
          />
          <SpecBadge
            icon={Award}
            label="Prueba"
            value={`${product.trialNights} noches`}
          />
        </div>

        {/* Features */}
        <div className="space-y-2">
          {product.features.slice(0, 4).map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-sm text-zinc-300"
            >
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {product.cooling && (
            <Badge icon={Wind} label="Cooling" color="cyan" />
          )}
          {product.eco && (
            <Badge icon={Leaf} label="Eco" color="emerald" />
          )}
          {product.hypoallergenic && (
            <Badge icon={Shield} label="Hipoalergénico" color="violet" />
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/producto/${product.slug}`}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform w-full"
        >
          Ver Detalles
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  )
}

// ============================================================================
// COMPARISON TABLE - DESKTOP OPTIMIZADO
// ============================================================================
function ComparisonTable({
  products,
  onRemove,
  onAddMore
}: {
  products: Product[]
  onRemove: (id: string) => void
  onAddMore: () => void
}) {
  const rows = [
    { label: 'Producto', key: 'product', isHeader: true },
    { label: 'Precio', key: 'price', highlight: true },
    { label: 'Valoración', key: 'rating', highlight: true },
    { label: 'Firmeza', key: 'firmness' },
    { label: 'Altura', key: 'height' },
    { label: 'Garantía', key: 'warranty' },
    { label: 'Refrigeración', key: 'cooling' },
    { label: 'Ecológico', key: 'eco' },
    { label: 'Hipoalergénico', key: 'hypoallergenic' },
    { label: 'Transpiración', key: 'transpirability' },
    { label: 'Satisfacción', key: 'satisfaction' },
    { label: 'Características Clave', key: 'features' },
  ]

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row.key}
                className={`
                  ${row.isHeader ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20' : ''}
                  ${row.highlight ? 'bg-white/10' : ''}
                  ${!row.isHeader && !row.highlight && rowIndex % 2 === 0 ? 'bg-white/5' : ''}
                  ${!row.isHeader && !row.highlight && rowIndex % 2 === 1 ? 'bg-transparent' : ''}
                  border-b border-white/5 last:border-0
                  transition-colors hover:bg-white/5
                `}
              >
                {/* Row label */}
                <td className="sticky left-0 bg-zinc-900/95 backdrop-blur-xl border-r border-white/10 px-6 py-5 font-bold text-white whitespace-nowrap z-10 min-w-[180px]">
                  <div className="flex items-center gap-2">
                    {row.highlight && (
                      <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full" />
                    )}
                    <span className={row.highlight ? 'text-lg' : ''}>{row.label}</span>
                  </div>
                </td>

                {/* Product columns */}
                {products.map((product) => (
                  <td
                    key={product.id}
                    className="px-8 py-5 text-center relative min-w-[280px]"
                  >
                    {row.key === 'product' && (
                      <ProductHeader
                        product={product}
                        onRemove={() => onRemove(product.id)}
                      />
                    )}
                    {row.key === 'price' && (
                      <PriceCell product={product} />
                    )}
                    {row.key === 'rating' && (
                      <RatingCell product={product} />
                    )}
                    {row.key === 'firmness' && (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-white font-bold text-lg">
                          {product.firmness}
                        </span>
                        <div className="w-full max-w-[120px] h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"
                            style={{ width: `${(product.firmnessValue / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {row.key === 'height' && (
                      <div className="flex items-center justify-center gap-2">
                        <Ruler className="w-4 h-4 text-violet-400" />
                        <span className="text-white font-semibold text-lg">{product.height}cm</span>
                      </div>
                    )}
                    {row.key === 'warranty' && (
                      <div className="flex items-center justify-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        <span className="text-white font-semibold text-lg">{product.warranty} años</span>
                      </div>
                    )}
                    {row.key === 'trial' && (
                      <div className="flex items-center justify-center gap-2">
                        <Moon className="w-4 h-4 text-cyan-400" />
                        <span className="text-white font-semibold text-lg">{product.trialNights} noches</span>
                      </div>
                    )}
                    {row.key === 'cooling' && (
                      <BooleanCell value={product.cooling} />
                    )}
                    {row.key === 'eco' && (
                      <BooleanCell value={product.eco} />
                    )}
                    {row.key === 'hypoallergenic' && (
                      <BooleanCell value={product.hypoallergenic} />
                    )}
                    {row.key === 'transpirability' && (
                      <PercentageBar value={product.transpirability} label="Transpiración" />
                    )}
                    {row.key === 'satisfaction' && (
                      <PercentageBar value={product.satisfaction} label="Satisfacción" />
                    )}
                    {row.key === 'features' && (
                      <FeaturesList features={product.features} />
                    )}
                  </td>
                ))}

                {/* Add more column */}
                {products.length < 4 && (
                  <td className="px-8 py-5 text-center min-w-[280px]">
                    {row.key === 'product' && (
                      <button
                        onClick={onAddMore}
                        className="w-full h-full min-h-[240px] border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center gap-3 text-zinc-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/5 transition-all group"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Plus className="w-8 h-8" />
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg mb-1">Añadir Producto</div>
                          <div className="text-xs text-zinc-500">Compara hasta 4</div>
                        </div>
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============================================================================
// TABLE CELLS - OPTIMIZADAS
// ============================================================================
function ProductHeader({ product, onRemove }: { product: Product; onRemove: () => void }) {
  return (
    <div className="relative pb-4">
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500/20 border border-red-500/50 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all hover:scale-110 z-20"
      >
        <X className="w-4 h-4" />
      </button>
      
      {/* Imagen con tamaño fijo y aspect ratio consistente */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-white/5 border border-white/10 group">
        <Image
          src={product.images[0] || '/placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="280px"
          priority
        />
        {/* Overlay sutil al hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <h3 className="text-xl font-black text-white mb-3 leading-tight min-h-[3rem] flex items-center justify-center">
        {product.name}
      </h3>
      
      <Link
        href={`/producto/${product.slug}`}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 shadow-lg hover:shadow-xl"
      >
        Ver Detalles
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

function PriceCell({ product }: { product: Product }) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="py-2">
      <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-1">
        {product.price}€
      </div>
      {product.originalPrice && product.originalPrice > product.price && (
        <div className="space-y-1">
          <div className="text-base text-zinc-500 line-through">
            {product.originalPrice}€
          </div>
          <div className="inline-block bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
            -{discount}% OFF
          </div>
        </div>
      )}
    </div>
  )
}

function RatingCell({ product }: { product: Product }) {
  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(product.rating)
                ? 'fill-amber-400 text-amber-400'
                : 'text-zinc-600'
            }`}
          />
        ))}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-white font-black text-2xl">
          {product.rating.toFixed(1)}
        </span>
        <span className="text-zinc-400 text-sm font-medium">
          / 5.0
        </span>
      </div>
      <span className="text-zinc-500 text-xs">
        {product.reviewCount.toLocaleString()} valoraciones
      </span>
    </div>
  )
}

function BooleanCell({ value }: { value: boolean }) {
  return value ? (
    <div className="flex flex-col items-center gap-2">
      <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
        <Check className="w-6 h-6 text-emerald-400" />
      </div>
      <span className="text-emerald-400 font-semibold text-sm">Sí</span>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-2">
      <div className="w-12 h-12 rounded-full bg-zinc-800/50 border border-zinc-700 flex items-center justify-center">
        <X className="w-6 h-6 text-zinc-600" />
      </div>
      <span className="text-zinc-600 font-semibold text-sm">No</span>
    </div>
  )
}

function PercentageBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="w-full max-w-[160px] mx-auto py-2">
      <div className="mb-2">
        <span className="text-3xl font-black text-white">{value}%</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-full"
        />
      </div>
      <div className="mt-1 text-xs text-zinc-500 font-medium">{label}</div>
    </div>
  )
}

function FeaturesList({ features }: { features: string[] }) {
  return (
    <div className="text-left space-y-2 max-w-[240px] mx-auto">
      {features.slice(0, 4).map((feature, i) => (
        <div key={i} className="flex items-start gap-2 text-sm text-zinc-300">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-2 leading-snug">{feature}</span>
        </div>
      ))}
      {features.length > 4 && (
        <div className="text-xs text-violet-400 font-semibold pl-6">
          +{features.length - 4} características más
        </div>
      )}
    </div>
  )
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================
function SpecBadge({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon: any
  label: string
  value: string 
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-violet-400" />
        <span className="text-xs text-zinc-400">{label}</span>
      </div>
      <div className="text-white font-bold text-sm">{value}</div>
    </div>
  )
}

function Badge({ 
  icon: Icon, 
  label, 
  color 
}: { 
  icon: any
  label: string
  color: 'cyan' | 'emerald' | 'violet' 
}) {
  const colors = {
    cyan: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300',
    emerald: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300',
    violet: 'bg-violet-500/20 border-violet-500/50 text-violet-300'
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${colors[color]}`}>
      <Icon className="w-3 h-3" />
      {label}
    </div>
  )
}

// ============================================================================
// PRODUCT SELECTOR MODAL
// ============================================================================
function ProductSelector({
  products,
  selectedIds,
  onSelect,
  onClose
}: {
  products: Product[]
  selectedIds: string[]
  onSelect: (product: Product) => void
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-zinc-900 border border-white/10 rounded-3xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-white">
            Selecciona un producto
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products
            .filter(p => !selectedIds.includes(p.id))
            .map((product, index) => (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelect(product)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-4 transition-all hover:scale-105 text-left group"
              >
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 bg-white/5">
                  <Image
                    src={product.images[0] || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-violet-400">
                    {product.price}€
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-white text-sm font-semibold">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
        </div>
      </motion.div>
    </motion.div>
  )
}