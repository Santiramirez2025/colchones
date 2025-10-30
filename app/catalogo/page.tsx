// app/catalogo/page.tsx
import { Suspense } from 'react'
import { getProducts } from '@/lib/api/products'
import CatalogoClient from './catalogo-client'
import { Sparkles, Zap } from 'lucide-react'

export const metadata = {
  title: 'Colchones Premium 2025 | Desde 39€/mes - Envío Gratis',
  description:
    'Descubre nuestra colección exclusiva de colchones premium con hasta -50%. Tecnología Multisac®, 1.800 muelles. 100 noches de prueba gratis.',
}

export const revalidate = 3600

function CatalogoLoading() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 px-6 py-3 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-violet-400 animate-pulse" />
            <span className="text-sm font-bold text-white">
              Cargando catálogo premium...
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Nuestros <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Colchones</span>
          </h1>
        </div>

        {/* Skeleton Grid Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-3xl overflow-hidden">
                <div className="h-80 bg-zinc-800/50" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-zinc-800 rounded w-3/4" />
                  <div className="h-4 bg-zinc-800 rounded w-1/2" />
                  <div className="h-10 bg-zinc-800 rounded w-1/3" />
                  <div className="h-14 bg-zinc-800 rounded" />
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
  const products = await getProducts()

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 mb-8">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Catálogo en construcción
          </h1>
          <p className="text-zinc-400 text-lg mb-8 max-w-md mx-auto">
            Estamos preparando nuestra colección premium. Vuelve pronto.
          </p>
          <div className="inline-block bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <p className="text-zinc-400 text-sm mb-3">💡 Desarrolladores: Ejecuta el seed</p>
            <code className="text-violet-400 font-mono text-sm">
              npx prisma db seed
            </code>
          </div>
        </div>
      </div>
    )
  }

  const normalizedProducts = products.map((product: any) => ({
    ...product,
    images: Array.isArray(product.images) ? product.images[0] : product.images,
  }))

  return (
    <Suspense fallback={<CatalogoLoading />}>
      <CatalogoClient initialProducts={normalizedProducts} />
    </Suspense>
  )
}