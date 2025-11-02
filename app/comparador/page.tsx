// app/comparador/page.tsx - OPTIMIZADO
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950">
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-16">
        {/* Header skeleton */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 md:px-6 md:py-3 rounded-full mb-4 md:mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
            <span className="text-xs md:text-sm font-bold text-white">
              Cargando comparador...
            </span>
          </div>
          
          <div className="h-12 md:h-16 bg-white/5 rounded-2xl w-64 md:w-96 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-white/5 rounded-xl w-48 md:w-80 mx-auto animate-pulse" />
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                {/* Image skeleton */}
                <div className="w-full aspect-video bg-white/10 rounded-xl mb-4" />
                
                {/* Text skeletons */}
                <div className="space-y-3">
                  <div className="h-6 bg-white/10 rounded w-3/4" />
                  <div className="h-4 bg-white/10 rounded w-1/2" />
                  <div className="h-10 bg-white/10 rounded w-2/3" />
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
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Icon */}
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-2xl">
            <Zap className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            No hay productos disponibles
          </h1>
          
          {/* Description */}
          <p className="text-zinc-400 text-base md:text-lg">
            Agrega productos al catálogo para poder compararlos
          </p>
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
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl">
            <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            Sin productos para comparar
          </h1>
          
          <p className="text-zinc-400 text-base md:text-lg mb-6">
            No hay productos activos disponibles en este momento
          </p>

          {/* Stats card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left">
            <p className="text-zinc-300 text-sm font-semibold mb-3">
              📊 Estadísticas:
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Total productos:</span>
                <span className="text-white font-semibold">{products.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Con imágenes:</span>
                <span className="text-white font-semibold">
                  {normalizedProducts.filter((p: any) => p.images.length > 0).length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">En stock:</span>
                <span className="text-white font-semibold">
                  {normalizedProducts.filter((p: any) => p.inStock).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<ComparadorLoading />}>
      <ComparadorClient products={availableProducts} />
    </Suspense>
  )
}