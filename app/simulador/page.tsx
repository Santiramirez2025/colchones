// app/simulador/page.tsx
import { Suspense } from 'react'
import { getProducts } from '@/lib/api/products'
import SimuladorClient from './simulador-client'
import { Brain, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Simulador IA - Encuentra tu Colchón Perfecto | Descanso Premium',
  description:
    'Test inteligente de 2 minutos. Nuestro algoritmo de IA analiza tu perfil de sueño y te recomienda el colchón ideal con 96% de precisión.',
}

export const revalidate = 3600 // Revalidar cada hora

function SimuladorLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full mb-8">
          <Brain className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="text-white font-bold">Cargando simulador IA...</span>
        </div>
        
        <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-6" />
        
        <p className="text-zinc-400 text-lg">
          Preparando tu experiencia personalizada
        </p>
      </div>
    </div>
  )
}

export default async function SimuladorPage() {
  // 1. Obtener productos activos y en stock
  const rawProducts = await getProducts()

  // 2. Validar que hay productos
  if (!rawProducts || rawProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 mb-8">
            <Brain className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Simulador en construcción
          </h1>
          
          <p className="text-zinc-400 text-lg mb-8">
            Estamos calibrando nuestro algoritmo de IA. Vuelve pronto.
          </p>
          
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <p className="text-zinc-400 text-sm mb-3">💡 Desarrolladores: Ejecuta el seed</p>
            <code className="text-violet-400 font-mono text-sm">
              npx prisma db seed
            </code>
          </div>
        </div>
      </div>
    )
  }

  // 3. 🔥 PARSEAR JSON STRINGS - CRÍTICO PARA QUE FUNCIONE EL ALGORITMO
  const products = rawProducts.map((product: any) => {
    // Helper para parsear de forma segura
    const safeJsonParse = (field: any, fallback: any = []) => {
      try {
        if (typeof field === 'string') {
          return JSON.parse(field)
        }
        if (Array.isArray(field)) {
          return field
        }
        return fallback
      } catch (e) {
        return fallback
      }
    }

    return {
      ...product,
      // Parsear arrays JSON
      features: safeJsonParse(product.features, []),
      techFeatures: safeJsonParse(product.techFeatures, []),
      highlights: safeJsonParse(product.highlights, []),
      materials: safeJsonParse(product.materials, []),
      tags: safeJsonParse(product.tags, []),
      certifications: safeJsonParse(product.certifications, []),
      layers: safeJsonParse(product.layers, []),
      
      // Parsear images (puede venir como JSON string o ya parseado)
      images: safeJsonParse(product.images, [product.image]),
      
      // Asegurar valores numéricos críticos para el algoritmo
      firmnessValue: product.firmnessValue || 70,
      transpirability: product.transpirability || 80,
      height: product.height || 25,
      satisfaction: product.satisfaction || 95,
      
      // Asegurar booleanos
      cooling: product.cooling || false,
      eco: product.eco || false,
      isEco: product.isEco || false,
      hypoallergenic: product.hypoallergenic || true,
      washable: product.washable || true,
      isBestSeller: product.isBestSeller || false,
      isNew: product.isNew || false,
      inStock: product.inStock !== false, // Por defecto true
      
      // Asegurar números
      price: Number(product.price) || 0,
      originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
      rating: Number(product.rating) || 4.8,
      reviewCount: Number(product.reviewCount) || 0,
    }
  })

  // 4. Filtrar productos válidos para el simulador
  const validProducts = products.filter((p: any) => 
    p.isActive !== false && 
    p.inStock !== false &&
    p.price > 0
  )

  console.log('📊 Simulador Stats:')
  console.log('  - Total products loaded:', rawProducts.length)
  console.log('  - Valid products for simulator:', validProducts.length)
  console.log('  - Sample product fields:', validProducts[0] ? {
    name: validProducts[0].name,
    firmnessValue: validProducts[0].firmnessValue,
    featuresType: typeof validProducts[0].features,
    featuresLength: validProducts[0].features?.length,
  } : 'No products')

  return (
    <Suspense fallback={<SimuladorLoading />}>
      <SimuladorClient products={validProducts} />
    </Suspense>
  )
}