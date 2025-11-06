// app/comparador/page.tsx - OPTIMIZADO PREMIUM UX
import { Suspense } from 'react'
import { getProducts } from '@/lib/api/products'
import ComparadorClient from './comparador-client'
import { Sparkles, Zap } from 'lucide-react'

export const metadata = {
  title: 'Comparador de Colchones Premium | Encuentra tu colchón ideal',
  description: 'Compara hasta 4 colchones premium lado a lado. Análisis profesional con IA para ayudarte a tomar la mejor decisión.',
}

export const revalidate = 3600

function ComparadorLoading() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 overflow-x-hidden scroll-smooth antialiased">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 md:pb-24">
        {/* Header skeleton */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 md:px-6 md:py-3 rounded-full mb-6 md:mb-8 animate-pulse shadow-lg shadow-violet-500/20">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
            <span className="text-xs md:text-sm font-bold text-white">
              Cargando comparador...
            </span>
          </div>
          
          <div className="space-y-3 md:space-y-4 mb-6">
            <div className="h-10 md:h-14 bg-white/5 backdrop-blur-sm rounded-2xl w-full max-w-md mx-auto animate-pulse" />
            <div className="h-5 md:h-6 bg-white/5 backdrop-blur-sm rounded-xl w-full max-w-sm mx-auto animate-pulse" />
          </div>
        </div>

        {/* Cards skeleton - Grid responsive optimizado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300">
                {/* Image skeleton con aspect ratio */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5">
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    <div className="h-6 w-16 bg-white/20 rounded-lg" />
                    <div className="h-8 w-8 bg-white/20 rounded-full" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-2xl" />
                  </div>
                </div>
                
                {/* Content skeleton */}
                <div className="p-4 md:p-6 space-y-4">
                  {/* Title & subtitle */}
                  <div className="space-y-2">
                    <div className="h-5 md:h-6 bg-white/10 rounded-lg w-4/5" />
                    <div className="h-3 md:h-4 bg-white/10 rounded w-3/5" />
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="w-4 h-4 bg-white/10 rounded" />
                      ))}
                    </div>
                    <div className="h-4 w-12 bg-white/10 rounded" />
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-2 pt-2 border-t border-white/10">
                    <div className="h-8 md:h-10 bg-white/10 rounded-lg w-24" />
                    <div className="h-5 md:h-6 bg-white/10 rounded w-16" />
                  </div>
                  
                  {/* Specs grid */}
                  <div className="grid grid-cols-3 gap-2 pt-3">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="text-center p-2 bg-white/5 rounded-lg">
                        <div className="h-3 bg-white/10 rounded w-full mb-1" />
                        <div className="h-4 bg-white/10 rounded w-2/3 mx-auto" />
                      </div>
                    ))}
                  </div>
                  
                  {/* Button */}
                  <div className="pt-4">
                    <div className="h-12 md:h-14 bg-white/10 rounded-xl w-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function ComparadorPage() {
  // Obtener productos
  const { data: products } = await getProducts()

  // Sin productos disponibles
  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 overflow-x-hidden scroll-smooth antialiased flex items-center justify-center">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-lg mx-auto">
            {/* Icon */}
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-2xl shadow-orange-500/30">
              <Zap className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4 leading-tight">
              No hay productos disponibles
            </h1>
            
            {/* Description */}
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              Agrega productos al catálogo para poder compararlos
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Normalizar productos
  const normalizedProducts = products.map((product: any) => ({
    ...product,
    // Asegurar arrays válidos
    images: Array.isArray(product.images) && product.images.length > 0 
      ? product.images 
      : [product.image].filter(Boolean),
    features: Array.isArray(product.features) ? product.features : [],
    techFeatures: Array.isArray(product.techFeatures) ? product.techFeatures : [],
    highlights: Array.isArray(product.highlights) ? product.highlights : [],
    materials: Array.isArray(product.materials) ? product.materials : [],
    layers: Array.isArray(product.layers) ? product.layers : [],
    certifications: Array.isArray(product.certifications) ? product.certifications : [],
    
    // Asegurar valores numéricos
    rating: Number(product.rating) || 4.8,
    reviewCount: Number(product.reviewCount) || 0,
    price: Number(product.price) || 0,
    originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
    firmnessValue: Number(product.firmnessValue) || 70,
    height: Number(product.height) || 25,
    warranty: Number(product.warranty) || 3,
    trialNights: Number(product.trialNights) || 100,
    transpirability: Number(product.transpirability) || 80,
    satisfaction: Number(product.satisfaction) || 95,
    
    // Asegurar booleanos
    cooling: Boolean(product.cooling),
    eco: Boolean(product.eco),
    hypoallergenic: Boolean(product.hypoallergenic),
    isActive: product.isActive !== false,
    inStock: product.inStock !== false,
  }))

  // Filtrar solo productos activos y en stock
  const availableProducts = normalizedProducts.filter((p: any) => 
    p.isActive && p.inStock && p.price > 0 && p.images.length > 0
  )

  // Sin productos válidos para comparar
  if (availableProducts.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 overflow-x-hidden scroll-smooth antialiased flex items-center justify-center">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-lg mx-auto">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-amber-500/30">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4 leading-tight">
              Sin productos para comparar
            </h1>
            
            <p className="text-zinc-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
              No hay productos activos disponibles en este momento
            </p>

            {/* Stats card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 text-left shadow-xl shadow-black/20">
              <p className="text-zinc-300 text-sm md:text-base font-bold mb-4 md:mb-5 flex items-center gap-2">
                <span>📊</span> Estadísticas:
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-zinc-400 text-sm md:text-base">Total productos:</span>
                  <span className="text-white font-bold text-base md:text-lg">{products.length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-zinc-400 text-sm md:text-base">Con imágenes:</span>
                  <span className="text-white font-bold text-base md:text-lg">
                    {normalizedProducts.filter((p: any) => p.images.length > 0).length}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-zinc-400 text-sm md:text-base">En stock:</span>
                  <span className="text-white font-bold text-base md:text-lg">
                    {normalizedProducts.filter((p: any) => p.inStock).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 overflow-x-hidden scroll-smooth antialiased">
      <Suspense fallback={<ComparadorLoading />}>
        <ComparadorClient products={availableProducts} />
      </Suspense>
    </div>
  )
}