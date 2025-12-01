// app/catalogo/page.tsx
import { Suspense } from 'react'
import { getProducts } from '@/lib/api/products'
import { centavosToARS } from '@/lib/utils/currency'
import CatalogoClient from './catalogo-client'
import { NormalizedProduct } from './components/types'

export const metadata = {
  title: 'Catálogo de Colchones Premium | Azul Colchones Villa María',
  description: 'Descubrí nuestra colección exclusiva de colchones premium. Tecnología de última generación, envío gratis en Villa María. 12 cuotas sin interés.',
}

export const revalidate = 3600

// ✅ Iconos inline SVG optimizados
const Icons = {
  Sparkles: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Zap: ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Package: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
}

function CatalogoLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 md:pb-24">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8 animate-pulse backdrop-blur-sm">
            <Icons.Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
            <span className="text-xs md:text-sm font-bold text-blue-300">
              Cargando catálogo premium...
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Nuestros{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
              Colchones
            </span>
          </h1>
          
          <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
            Villa María, Córdoba
          </p>
        </div>

        {/* Skeleton Grid Premium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white/5 border border-blue-500/20 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm">
                {/* Image Skeleton */}
                <div className="aspect-square bg-gradient-to-br from-blue-500/10 to-cyan-500/10 relative">
                  <div className="absolute top-3 left-3 right-3 flex justify-between">
                    <div className="h-6 w-20 bg-blue-500/20 rounded-lg" />
                    <div className="h-6 w-6 bg-blue-500/20 rounded-lg" />
                  </div>
                </div>
                
                {/* Content Skeleton */}
                <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                  <div className="space-y-2">
                    <div className="h-5 md:h-6 bg-blue-500/20 rounded-lg w-3/4" />
                    <div className="h-3 md:h-4 bg-blue-500/10 rounded w-1/2" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="h-8 md:h-10 bg-blue-500/20 rounded-lg w-24" />
                    <div className="h-6 md:h-8 bg-blue-500/10 rounded w-16" />
                  </div>
                  
                  <div className="pt-2">
                    <div className="h-12 md:h-14 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl w-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        <div className="flex items-center justify-center gap-2 mt-12 text-blue-400">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

export default async function CatalogoPage() {
  // getProducts() retorna { data: [], total, page, limit, hasMore }
  const { data: products, total } = await getProducts()

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center relative">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" />
        
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 mb-6 md:mb-8 shadow-2xl shadow-blue-500/50">
              <Icons.Zap className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                Catálogo en construcción
              </span>
            </h1>
            
            <p className="text-zinc-400 text-base md:text-lg mb-6 md:mb-8 max-w-md mx-auto leading-relaxed">
              Estamos preparando nuestra colección premium de colchones. Volvé pronto.
            </p>
            
            <div className="inline-block bg-white/5 border border-blue-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Icons.Package className="w-5 h-5 text-blue-400" />
                <p className="text-zinc-300 text-xs md:text-sm font-bold">
                  💡 Desarrolladores: Ejecutá el seed
                </p>
              </div>
              <code className="text-blue-400 font-mono text-xs md:text-sm break-all block bg-zinc-900/50 p-3 rounded-lg border border-blue-500/20">
                npm run db:seed
              </code>
            </div>

            {/* Additional info */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl backdrop-blur-sm">
              <p className="text-zinc-400 text-sm">
                📍 <span className="text-white font-semibold">Villa María, Córdoba</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ✅ CONVERTIR PRECIOS DE CENTAVOS A PESOS con tipado correcto
  const productsWithPrices: NormalizedProduct[] = (products as any[]).map((product: any) => ({
    ...product,
    price: centavosToARS(product.price),
    originalPrice: product.originalPrice ? centavosToARS(product.originalPrice) : null,
    compareAtPrice: product.compareAtPrice ? centavosToARS(product.compareAtPrice) : null,
    shippingCost: centavosToARS(product.shippingCost || 0),
  }))

  return (
    <Suspense fallback={<CatalogoLoading />}>
      <CatalogoClient 
        initialProducts={productsWithPrices}
        totalProducts={total}
      />
    </Suspense>
  )
}