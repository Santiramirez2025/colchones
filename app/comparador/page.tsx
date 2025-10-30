// app/comparador/page.tsx
import { Suspense } from 'react'
import { getProducts } from '@/lib/api/products'
import ComparadorClient from './comparador-client'
import { Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Comparador de Colchones Premium | Encuentra tu colchón ideal',
  description: 'Compara hasta 4 colchones premium lado a lado. Análisis profesional con IA para ayudarte a tomar la mejor decisión.',
}

export const revalidate = 3600

function ComparadorLoading() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 px-6 py-3 rounded-full mb-8 animate-pulse">
            <Sparkles className="w-5 h-5 text-violet-400" />
            <span className="text-sm font-bold text-white">
              Cargando comparador...
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6">
                <div className="h-64 bg-zinc-800 rounded-2xl mb-6" />
                <div className="space-y-4">
                  <div className="h-6 bg-zinc-800 rounded w-3/4" />
                  <div className="h-4 bg-zinc-800 rounded w-1/2" />
                  <div className="h-10 bg-zinc-800 rounded w-1/3" />
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
  const products = await getProducts()

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">
            No hay productos disponibles
          </h1>
          <p className="text-zinc-400">
            Agrega productos al catálogo para poder compararlos
          </p>
        </div>
      </div>
    )
  }

  // Normalizar productos
  const normalizedProducts = products.map((product: any) => ({
    ...product,
    images: Array.isArray(product.images) ? product.images : [product.images || product.image],
    features: Array.isArray(product.features) 
      ? product.features 
      : product.features?.split(',').map((f: string) => f.trim()) || [],
  }))

  return (
    <Suspense fallback={<ComparadorLoading />}>
      <ComparadorClient products={normalizedProducts} />
    </Suspense>
  )
}