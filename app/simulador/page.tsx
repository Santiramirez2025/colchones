// app/simulador/page.tsx - ARGENTINIZADO Y OPTIMIZADO
import { Suspense } from 'react'
import { getProducts } from '@/lib/api/products'
import { centavosToARS } from '@/lib/utils/currency'
import SimuladorClient from './simulador-client'
import { ProductDebugger } from '../../components/debug/ProductDebugger'
import { Brain, Sparkles, AlertTriangle } from 'lucide-react'

export const metadata = {
  title: 'Simulador IA - Encontrá tu Colchón Perfecto | Azul Colchones Villa María',
  description:
    'Test inteligente de 2 minutos. Nuestro algoritmo de IA analiza tu perfil de sueño y te recomienda el colchón ideal. Villa María, Córdoba.',
  keywords: 'simulador colchones, test sueño, IA colchones, Villa María, Córdoba',
}

export const revalidate = 3600

const IS_DEBUG = process.env.NODE_ENV === 'development'

// ============================================================================
// LOADING STATE
// ============================================================================

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

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Validar y parsear campo JSON de forma segura
 */
function parseJsonField<T = any>(field: any, fieldName: string, defaultValue: T): T {
  if (!field) {
    IS_DEBUG && console.log(`📝 Field "${fieldName}" is empty, using default`)
    return defaultValue
  }

  // Ya es el tipo correcto
  if (typeof defaultValue === 'object' && Array.isArray(defaultValue)) {
    if (Array.isArray(field)) {
      return field as T
    }
  }

  // Intentar parsear string JSON
  if (typeof field === 'string') {
    try {
      const parsed = JSON.parse(field)
      IS_DEBUG && console.log(`✅ Parsed "${fieldName}" from JSON string`)
      return parsed as T
    } catch (error) {
      IS_DEBUG && console.warn(`⚠️ Failed to parse "${fieldName}" JSON:`, error)
      return defaultValue
    }
  }

  IS_DEBUG && console.warn(`⚠️ Field "${fieldName}" has unexpected type:`, typeof field)
  return defaultValue
}

/**
 * Validar y limpiar imágenes de un producto
 */
function validateAndCleanImages(images: any): string[] {
  if (!images) {
    IS_DEBUG && console.warn('⚠️ Product has no images field')
    return []
  }

  // Ya es array
  if (Array.isArray(images)) {
    const validImages = images.filter(img => {
      if (typeof img !== 'string') {
        IS_DEBUG && console.warn('⚠️ Image is not a string:', img)
        return false
      }
      if (!img.startsWith('/') && !img.startsWith('http')) {
        IS_DEBUG && console.warn('⚠️ Invalid image URL:', img)
        return false
      }
      return true
    })
    return validImages
  }

  // Es string JSON
  if (typeof images === 'string') {
    return parseJsonField<string[]>(images, 'images', [])
  }

  IS_DEBUG && console.warn('⚠️ Images field has unexpected type:', typeof images)
  return []
}

/**
 * Normalizar producto para el simulador
 */
function normalizeProduct(product: any): any {
  const cleanImages = validateAndCleanImages(product.images)
  
  if (IS_DEBUG && cleanImages.length === 0) {
    console.warn(`⚠️ Product "${product.name}" has no valid images`, {
      originalImages: product.images,
      type: typeof product.images,
      isArray: Array.isArray(product.images)
    })
  }

  // ✅ Convertir precios de centavos a pesos
  const price = centavosToARS(product.price || 0)
  const originalPrice = product.originalPrice ? centavosToARS(product.originalPrice) : null
  const compareAtPrice = product.compareAtPrice ? centavosToARS(product.compareAtPrice) : null

  IS_DEBUG && console.log(`💰 Product "${product.name}" prices:`, {
    rawPrice: product.price,
    price,
    originalPrice,
    compareAtPrice
  })

  return {
    ...product,
    // Precios en pesos
    price,
    originalPrice,
    compareAtPrice,
    // Arrays parseados
    images: cleanImages,
    features: parseJsonField(product.features, 'features', []),
    techFeatures: parseJsonField(product.techFeatures, 'techFeatures', []),
    highlights: parseJsonField(product.highlights, 'highlights', []),
    materials: parseJsonField(product.materials, 'materials', []),
    tags: parseJsonField(product.tags, 'tags', []),
    certifications: parseJsonField(product.certifications, 'certifications', []),
    layers: parseJsonField(product.layers, 'layers', []),
    // Números normalizados
    firmnessValue: Number(product.firmnessValue) || 70,
    transpirability: Number(product.transpirability) || 80,
    height: Number(product.height) || 25,
    satisfaction: Number(product.satisfaction) || 95,
    rating: Number(product.rating) || 4.8,
    reviewCount: Number(product.reviewCount) || 0,
    // Booleanos normalizados
    cooling: Boolean(product.cooling),
    eco: Boolean(product.isEco),
    isEco: Boolean(product.isEco),
    hypoallergenic: product.hypoallergenic !== false,
    washable: product.washable !== false,
    isBestSeller: Boolean(product.isBestSeller),
    isNew: Boolean(product.isNew),
    inStock: product.inStock !== false,
    isActive: product.isActive !== false,
  }
}

/**
 * Validar si un producto es válido para el simulador
 */
function isValidProduct(product: any): boolean {
  const isValid = 
    product.isActive !== false && 
    product.inStock !== false &&
    product.price > 0 &&
    product.images.length > 0

  if (!isValid && IS_DEBUG) {
    console.warn(`⚠️ Product filtered out: "${product.name}"`, {
      isActive: product.isActive,
      inStock: product.inStock,
      price: product.price,
      imagesCount: product.images.length
    })
  }

  return isValid
}

// ============================================================================
// EMPTY STATES
// ============================================================================

function EmptyState() {
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
          Estamos calibrando nuestro algoritmo de IA. Volvé pronto.
        </p>
        
        {/* Dev Info Card */}
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left">
          <p className="text-zinc-400 text-sm mb-3">💡 Desarrolladores: Ejecutá el seed</p>
          <code className="block text-violet-400 font-mono text-xs md:text-sm bg-black/30 px-4 py-3 rounded-lg">
            npm run db:seed
          </code>
        </div>
      </div>
    </div>
  )
}

function NoValidProductsState({ 
  rawCount, 
  processedCount, 
  withImagesCount, 
  activeCount, 
  inStockCount 
}: { 
  rawCount: number
  processedCount: number
  withImagesCount: number
  activeCount: number
  inStockCount: number
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Warning Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-red-500 to-orange-600 mb-6 shadow-2xl shadow-red-500/20">
          <AlertTriangle className="w-12 h-12 text-white" />
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
              <span className="text-zinc-500">Total cargados</span>
              <span className="text-white font-semibold">{rawCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Procesados</span>
              <span className="text-white font-semibold">{processedCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Con imágenes</span>
              <span className={withImagesCount > 0 ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                {withImagesCount}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Activos</span>
              <span className="text-white font-semibold">{activeCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">En stock</span>
              <span className="text-white font-semibold">{inStockCount}</span>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-violet-400 text-xs leading-relaxed">
              💡 Verificá que los productos en la DB tengan el campo 'images' correctamente guardado como JSON array.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default async function SimuladorPage() {
  console.log('🚀 [Simulador] Starting page load...')

  // ✅ Fetch products from API
  const { data: rawProducts } = await getProducts()
  console.log('📦 [Simulador] Raw products loaded:', rawProducts?.length || 0)

  // ✅ Empty state
  if (!rawProducts || rawProducts.length === 0) {
    console.log('❌ [Simulador] No products found')
    return <EmptyState />
  }

  // ✅ Normalize products
  console.log('🔄 [Simulador] Normalizing products...')
  const products = rawProducts.map(normalizeProduct)
  console.log('✅ [Simulador] Products normalized:', products.length)

  // ✅ Filter valid products
  const validProducts = products.filter(isValidProduct)
  console.log('✅ [Simulador] Valid products:', validProducts.length)

  // ✅ Stats logging
  console.log('📊 [Simulador] Stats:')
  console.log('  ✓ Total products loaded:', rawProducts.length)
  console.log('  ✓ Products after processing:', products.length)
  console.log('  ✓ Valid products for simulator:', validProducts.length)
  console.log('  ✓ Products with images:', products.filter(p => p.images.length > 0).length)
  console.log('  ✓ Products in stock:', products.filter(p => p.inStock).length)
  console.log('  ✓ Best sellers:', products.filter(p => p.isBestSeller).length)
  
  if (validProducts.length > 0) {
    const sample = validProducts[0]
    console.log('  ✓ Sample product:', {
      name: sample.name,
      slug: sample.slug,
      price: sample.price,
      originalPrice: sample.originalPrice,
      imagesCount: sample.images.length,
      imagesType: typeof sample.images,
      isImagesArray: Array.isArray(sample.images),
      firstImage: sample.images[0],
      featuresCount: sample.features?.length || 0,
      firmnessValue: sample.firmnessValue,
      isBestSeller: sample.isBestSeller,
      inStock: sample.inStock,
    })
  }

  // ✅ No valid products state
  if (validProducts.length === 0) {
    console.log('❌ [Simulador] No valid products after filtering')
    return (
      <NoValidProductsState
        rawCount={rawProducts.length}
        processedCount={products.length}
        withImagesCount={products.filter(p => p.images.length > 0).length}
        activeCount={products.filter(p => p.isActive).length}
        inStockCount={products.filter(p => p.inStock).length}
      />
    )
  }

  // ✅ Render main simulator
  console.log('🎨 [Simulador] Rendering client with', validProducts.length, 'products')
  
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