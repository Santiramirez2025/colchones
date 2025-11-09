// app/catalogo/page.tsx
import { Suspense } from 'react'
import { getProducts } from '@/lib/api/products'
import CatalogoClient from './catalogo-client'
import { Sparkles, Zap } from 'lucide-react'

export const metadata = {
  title: 'Colchones Premium 2025 | Desde 39€/mes - Envío Gratis',
  description:
    'Descubre nuestra colección exclusiva de colchones premium con hasta -50%. Tecnología Multisac®, 1.800 muelles. Certificados de calidad europea.',
}

export const revalidate = 3600

function CatalogoLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 md:pb-24">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8 animate-pulse">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
            <span className="text-xs md:text-sm font-bold text-zinc-900">
              Cargando catálogo premium...
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 mb-4 leading-tight">
            Nuestros <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Colchones</span>
          </h1>
        </div>

        {/* Skeleton Grid Premium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white border border-zinc-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm">
                {/* Image Skeleton */}
                <div className="aspect-square bg-zinc-100 relative">
                  <div className="absolute top-3 left-3 right-3 flex justify-between">
                    <div className="h-6 w-20 bg-zinc-200 rounded-lg" />
                    <div className="h-6 w-6 bg-zinc-200 rounded-lg" />
                  </div>
                </div>
                
                {/* Content Skeleton */}
                <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                  <div className="space-y-2">
                    <div className="h-5 md:h-6 bg-zinc-200 rounded-lg w-3/4" />
                    <div className="h-3 md:h-4 bg-zinc-100 rounded w-1/2" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="h-8 md:h-10 bg-zinc-200 rounded-lg w-24" />
                    <div className="h-6 md:h-8 bg-zinc-100 rounded w-16" />
                  </div>
                  
                  <div className="pt-2">
                    <div className="h-12 md:h-14 bg-zinc-200 rounded-xl w-full" />
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

export default async function CatalogoPage() {
  // getProducts() retorna { data: [], total, page, limit, hasMore }
  const { data: products, total } = await getProducts()

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 mb-6 md:mb-8 shadow-xl shadow-violet-500/30">
              <Zap className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 mb-3 md:mb-4 leading-tight">
              Catálogo en construcción
            </h1>
            
            <p className="text-zinc-600 text-base md:text-lg mb-6 md:mb-8 max-w-md mx-auto">
              Estamos preparando nuestra colección premium. Vuelve pronto.
            </p>
            
            <div className="inline-block bg-zinc-50 border border-zinc-200 rounded-xl md:rounded-2xl p-4 md:p-6">
              <p className="text-zinc-600 text-xs md:text-sm mb-2 md:mb-3">💡 Desarrolladores: Ejecuta el seed</p>
              <code className="text-violet-600 font-mono text-xs md:text-sm break-all">
                npx prisma db seed
              </code>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Normalizamos TODOS los campos array a strings
  const normalizedProducts = products.map((product) => {
    const normalized: any = { ...product }
    
    // Lista de campos que son arrays y deben convertirse a strings
    const arrayFields = [
      'images', 'features', 'techFeatures', 'certifications', 
      'tags', 'highlights', 'benefits', 'specifications'
    ]
    
    arrayFields.forEach(field => {
      if (field === 'images') {
        // Para images, solo tomamos la primera
        normalized[field] = Array.isArray(product[field as keyof typeof product]) 
          ? (product[field as keyof typeof product] as string[])[0] || '' 
          : product[field as keyof typeof product]
      } else {
        // Para el resto, unimos con saltos de línea
        normalized[field] = Array.isArray(product[field as keyof typeof product])
          ? (product[field as keyof typeof product] as string[]).join('\n')
          : product[field as keyof typeof product]
      }
    })
    
    return normalized
  })

  return (
    <Suspense fallback={<CatalogoLoading />}>
      <CatalogoClient initialProducts={normalizedProducts} />
    </Suspense>
  )
}