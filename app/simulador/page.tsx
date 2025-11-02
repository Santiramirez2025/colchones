// app/simulador/page.tsx - VERSIÓN MEJORADA UX/UI
import { Suspense } from 'react'
import { getProducts } from '@/lib/api/products'
import SimuladorClient from './simulador-client'
import { ProductDebugger } from '../../components/debug/ProductDebugger'
import { Brain, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Simulador IA - Encuentra tu Colchón Perfecto | Descanso Premium',
  description:
    'Test inteligente de 2 minutos. Nuestro algoritmo de IA analiza tu perfil de sueño y te recomienda el colchón ideal con 96% de precisión.',
}

export const revalidate = 3600

const IS_DEBUG = process.env.NODE_ENV === 'development'

function SimuladorLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center px-4">
      <div className="text-center max-w-sm mx-auto">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2.5 rounded-full mb-8 animate-pulse">
          <Brain className="w-4 h-4 text-cyan-400" />
          <span className="text-white font-semibold text-sm">Cargando simulador IA</span>
        </div>
        
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-violet-500/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-violet-500 rounded-full animate-spin" />
          <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-violet-400" />
        </div>
        
        {/* Loading Text */}
        <p className="text-zinc-400 text-base">
          Preparando tu experiencia personalizada
        </p>
      </div>
    </div>
  )
}

/**
 * Validar y limpiar imágenes de un producto
 */
function validateAndCleanImages(images: any): string[] {
  if (!images) {
    console.warn('⚠️ Product has no images field')
    return []
  }

  if (Array.isArray(images)) {
    const validImages = images.filter(img => {
      if (typeof img !== 'string') {
        console.warn('⚠️ Image is not a string:', img)
        return false
      }
      if (!img.startsWith('/') && !img.startsWith('http')) {
        console.warn('⚠️ Invalid image URL:', img)
        return false
      }
      return true
    })
    return validImages
  }

  if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images)
      if (Array.isArray(parsed)) {
        return validateAndCleanImages(parsed)
      }
      console.warn('⚠️ Parsed images is not an array:', parsed)
      return []
    } catch (error) {
      console.error('❌ Error parsing images JSON:', error)
      return []
    }
  }

  console.warn('⚠️ Images field has unexpected type:', typeof images)
  return []
}

export default async function SimuladorPage() {
  console.log('🚀 Starting Simulador Page Load...')

  const { data: rawProducts } = await getProducts()
  console.log('📦 Raw products loaded:', rawProducts?.length || 0)

  // Estado vacío - Diseño mejorado
  if (!rawProducts || rawProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          {/* Icon Container */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 mb-6 shadow-2xl shadow-violet-500/20">
            <Brain className="w-12 h-12 text-white" />
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
            Simulador en construcción
          </h1>
          
          {/* Description */}
          <p className="text-zinc-400 text-base md:text-lg mb-8">
            Estamos calibrando nuestro algoritmo de IA. Vuelve pronto.
          </p>
          
          {/* Dev Info Card */}
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left">
            <p className="text-zinc-400 text-sm mb-3">💡 Desarrolladores: Ejecuta el seed</p>
            <code className="block text-violet-400 font-mono text-xs md:text-sm bg-black/30 px-4 py-3 rounded-lg">
              npx prisma db seed
            </code>
          </div>
        </div>
      </div>
    )
  }

  // Procesar productos con validación
  const products = rawProducts.map((product: any) => {
    const cleanImages = validateAndCleanImages(product.images)
    
    if (IS_DEBUG && cleanImages.length === 0) {
      console.warn(`⚠️ Product "${product.name}" has no valid images`, {
        originalImages: product.images,
        type: typeof product.images,
        isArray: Array.isArray(product.images)
      })
    }

    return {
      ...product,
      images: cleanImages,
      features: Array.isArray(product.features) ? product.features : [],
      techFeatures: Array.isArray(product.techFeatures) ? product.techFeatures : [],
      highlights: Array.isArray(product.highlights) ? product.highlights : [],
      materials: Array.isArray(product.materials) ? product.materials : [],
      tags: Array.isArray(product.tags) ? product.tags : [],
      certifications: Array.isArray(product.certifications) ? product.certifications : [],
      layers: Array.isArray(product.layers) ? product.layers : [],
      firmnessValue: Number(product.firmnessValue) || 70,
      transpirability: Number(product.transpirability) || 80,
      height: Number(product.height) || 25,
      satisfaction: Number(product.satisfaction) || 95,
      cooling: Boolean(product.cooling),
      eco: Boolean(product.eco),
      isEco: Boolean(product.isEco),
      hypoallergenic: product.hypoallergenic !== false,
      washable: product.washable !== false,
      isBestSeller: Boolean(product.isBestSeller),
      isNew: Boolean(product.isNew),
      inStock: product.inStock !== false,
      price: Number(product.price) || 0,
      originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      rating: Number(product.rating) || 4.8,
      reviewCount: Number(product.reviewCount) || 0,
    }
  })

  // Filtrar productos válidos
  const validProducts = products.filter((p: any) => {
    const isValid = 
      p.isActive !== false && 
      p.inStock !== false &&
      p.price > 0 &&
      p.images.length > 0

    if (!isValid && IS_DEBUG) {
      console.warn(`⚠️ Product filtered out: "${p.name}"`, {
        isActive: p.isActive,
        inStock: p.inStock,
        price: p.price,
        imagesCount: p.images.length
      })
    }

    return isValid
  })

  // Logging
  console.log('📊 Simulador Stats:')
  console.log('  ✓ Total products loaded:', rawProducts.length)
  console.log('  ✓ Products after processing:', products.length)
  console.log('  ✓ Valid products for simulator:', validProducts.length)
  console.log('  ✓ Products with images:', products.filter((p: any) => p.images.length > 0).length)
  
  if (validProducts.length > 0) {
    const sampleProduct = validProducts[0]
    console.log('  ✓ Sample product:', {
      name: sampleProduct.name,
      slug: sampleProduct.slug,
      price: sampleProduct.price,
      imagesCount: sampleProduct.images.length,
      imagesType: typeof sampleProduct.images,
      isImagesArray: Array.isArray(sampleProduct.images),
      firstImage: sampleProduct.images[0],
      featuresCount: sampleProduct.features?.length || 0,
      firmnessValue: sampleProduct.firmnessValue,
    })
  }

  // Sin productos válidos - Diseño mejorado
  if (validProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          {/* Warning Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-red-500 to-orange-600 mb-6 shadow-2xl shadow-red-500/20">
            <Brain className="w-12 h-12 text-white" />
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
            Sin productos válidos
          </h1>
          
          {/* Description */}
          <p className="text-zinc-400 text-base md:text-lg mb-8">
            No encontramos productos con imágenes válidas para el simulador.
          </p>
          
          {/* Stats Card */}
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left">
            <p className="text-zinc-300 text-sm font-semibold mb-4">🔍 Productos procesados:</p>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Total</span>
                <span className="text-white font-semibold">{rawProducts.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Con imágenes</span>
                <span className="text-white font-semibold">
                  {products.filter((p: any) => p.images.length > 0).length}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Activos</span>
                <span className="text-white font-semibold">
                  {products.filter((p: any) => p.isActive).length}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">En stock</span>
                <span className="text-white font-semibold">
                  {products.filter((p: any) => p.inStock).length}
                </span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-violet-400 text-xs leading-relaxed">
                💡 Verifica que los productos en la DB tengan el campo 'images' correctamente guardado como JSON array.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render principal con productos válidos
  return (
    <>
      <Suspense fallback={<SimuladorLoading />}>
        <SimuladorClient products={validProducts} />
      </Suspense>

      {/* Debug tool - Solo en development */}
      {IS_DEBUG && <ProductDebugger products={validProducts} />}
    </>
  )
}