// app/simulador/page.tsx - VERSIÓN CON DEBUG
import { Suspense } from 'react'
import { getProducts } from '@/lib/api/products'
import SimuladorClient from './simulador-client'
import { ProductDebugger } from '../../components/debug/ProductDebugger'
import { Brain } from 'lucide-react'

export const metadata = {
  title: 'Simulador IA - Encuentra tu Colchón Perfecto | Descanso Premium',
  description:
    'Test inteligente de 2 minutos. Nuestro algoritmo de IA analiza tu perfil de sueño y te recomienda el colchón ideal con 96% de precisión.',
}

export const revalidate = 3600 // Revalidar cada hora

// Variables de entorno para control de debugging
const IS_DEBUG = process.env.NODE_ENV === 'development'

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

/**
 * Validar y limpiar imágenes de un producto
 */
function validateAndCleanImages(images: any): string[] {
  // Si no hay imágenes, retornar array vacío
  if (!images) {
    console.warn('⚠️ Product has no images field')
    return []
  }

  // Si ya es un array
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

  // Si es un string, intentar parsearlo
  if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images)
      if (Array.isArray(parsed)) {
        return validateAndCleanImages(parsed) // Recursivo para validar el array parseado
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

  // 1. Obtener productos activos
  const { data: rawProducts } = await getProducts()

  console.log('📦 Raw products loaded:', rawProducts?.length || 0)

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

  // 3. Procesar productos con validación de imágenes
  const products = rawProducts.map((product: any) => {
    // Validar y limpiar imágenes específicamente
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
      
      // IMPORTANTE: Usar imágenes validadas
      images: cleanImages,
      
      // Asegurar que otros arrays también estén parseados
      features: Array.isArray(product.features) ? product.features : [],
      techFeatures: Array.isArray(product.techFeatures) ? product.techFeatures : [],
      highlights: Array.isArray(product.highlights) ? product.highlights : [],
      materials: Array.isArray(product.materials) ? product.materials : [],
      tags: Array.isArray(product.tags) ? product.tags : [],
      certifications: Array.isArray(product.certifications) ? product.certifications : [],
      layers: Array.isArray(product.layers) ? product.layers : [],
      
      // Asegurar valores numéricos críticos para el algoritmo
      firmnessValue: Number(product.firmnessValue) || 70,
      transpirability: Number(product.transpirability) || 80,
      height: Number(product.height) || 25,
      satisfaction: Number(product.satisfaction) || 95,
      
      // Asegurar booleanos
      cooling: Boolean(product.cooling),
      eco: Boolean(product.eco),
      isEco: Boolean(product.isEco),
      hypoallergenic: product.hypoallergenic !== false,
      washable: product.washable !== false,
      isBestSeller: Boolean(product.isBestSeller),
      isNew: Boolean(product.isNew),
      inStock: product.inStock !== false,
      
      // Asegurar números
      price: Number(product.price) || 0,
      originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      rating: Number(product.rating) || 4.8,
      reviewCount: Number(product.reviewCount) || 0,
    }
  })

  // 4. Filtrar productos válidos para el simulador
  const validProducts = products.filter((p: any) => {
    const isValid = 
      p.isActive !== false && 
      p.inStock !== false &&
      p.price > 0 &&
      p.images.length > 0 // CRÍTICO: Solo productos con imágenes

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

  // 5. Logging de estadísticas
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

  // 6. Verificar que tenemos productos válidos
  if (validProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 mb-8">
            <Brain className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Sin productos válidos
          </h1>
          
          <p className="text-zinc-400 text-lg mb-8">
            No encontramos productos con imágenes válidas para el simulador.
          </p>
          
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 text-left">
            <p className="text-zinc-400 text-sm mb-3">🔍 Productos procesados:</p>
            <ul className="space-y-1 text-sm">
              <li className="text-zinc-500">• Total: {rawProducts.length}</li>
              <li className="text-zinc-500">• Con imágenes: {products.filter((p: any) => p.images.length > 0).length}</li>
              <li className="text-zinc-500">• Activos: {products.filter((p: any) => p.isActive).length}</li>
              <li className="text-zinc-500">• En stock: {products.filter((p: any) => p.inStock).length}</li>
            </ul>
            
            <p className="text-violet-400 text-xs mt-4">
              Verifica que los productos en la DB tengan el campo 'images' correctamente guardado como JSON array.
            </p>
          </div>
        </div>
      </div>
    )
  }

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