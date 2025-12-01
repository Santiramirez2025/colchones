// app/producto/[slug]/page.tsx - ARGENTINA 2025 CON SISTEMA DE CUOTAS
// ✅ CORREGIDO: Conversión de precios centavos → pesos
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { 
  getProductBySlug, 
  getRelatedProducts, 
  getSimilarProducts, 
  getPopularProducts 
} from '@/lib/api/products'
import { trackProductView } from '@/lib/analytics'
import { centavosToARS, formatARS } from '@/lib/utils/currency'
import { getMejorCuota, calcularTodasLasCuotas, getTextoPromocional } from '@/lib/utils/pricing'
import ProductClient from './product-client'

type Params = Promise<{ slug: string }>

// ============================================================================
// HELPER: CONVERTIR PRECIOS DE PRODUCTO
// ============================================================================

/**
 * Convierte todos los precios de un producto y sus variantes de centavos a pesos
 * CRÍTICO: Esto debe hacerse ANTES de pasar el producto al client component
 */
function convertirPreciosProducto(product: any) {
  if (!product) return null
  
  return {
    ...product,
    // ✅ Precios principales: centavos → pesos
    price: centavosToARS(product.price),
    originalPrice: product.originalPrice ? centavosToARS(product.originalPrice) : null,
    compareAtPrice: product.compareAtPrice ? centavosToARS(product.compareAtPrice) : null,
    shippingCost: product.shippingCost ? centavosToARS(product.shippingCost) : 0,
    
    // ✅ Variantes (si existen)
    variants: product.variants?.map((variant: any) => ({
      ...variant,
      price: centavosToARS(variant.price),
      originalPrice: variant.originalPrice ? centavosToARS(variant.originalPrice) : null,
    })) || [],
  }
}

// ============================================================================
// STATIC GENERATION - ISR
// ============================================================================

export async function generateStaticParams() {
  try {
    const products = await getPopularProducts(50)
    return products.map((product) => ({ slug: product.slug }))
  } catch (error) {
    console.error('Failed to generate static params:', error)
    return []
  }
}

export const revalidate = 300 // 5 minutos

// ============================================================================
// METADATA GENERATION - ARGENTINA CON CUOTAS
// ============================================================================

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  try {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
      return {
        title: 'Producto no encontrado | Azul Colchones Villa María',
        description: 'El producto que buscás no está disponible',
        robots: { index: false, follow: false },
      }
    }

    const images = Array.isArray(product.images) ? product.images : []
    const imageUrl = images[0] || '/og-default.jpg'
    
    // ✅ CONVERSIÓN: centavos → pesos
    const pricePesos = centavosToARS(product.price)
    const originalPricePesos = product.originalPrice ? centavosToARS(product.originalPrice) : null
    
    // ✅ CALCULAR CUOTAS
    const mejorCuota = getMejorCuota(pricePesos)
    const todasCuotas = calcularTodasLasCuotas(pricePesos)
    
    // Calcular ahorro si hay descuento
    const savingsAmount = originalPricePesos && originalPricePesos > pricePesos
      ? originalPricePesos - pricePesos
      : 0
    
    // Textos optimizados para SEO
    const priceText = `${formatARS(pricePesos)} · Hasta ${mejorCuota.cuotas} cuotas de ${mejorCuota.formatted.precioCuota}`
    const savingsText = savingsAmount > 0 
      ? ` · Ahorrás ${formatARS(savingsAmount)}` 
      : ''
    const warrantyText = product.warranty 
      ? `${product.warranty} años garantía`
      : '5 años garantía'
      const baseText = (product as any).includesBase 
      ? ' · Incluye base'
      : ''

    // SEO Keywords optimizados Argentina con cuotas
    const keywords = [
      // Producto base
      product.name,
      `${product.name} precio Argentina`,
      `comprar ${product.name} Villa María`,
      `${product.name} Córdoba`,
      
      // Categoría y características
      product.category || 'colchón premium',
      product.firmness ? `colchón firmeza ${product.firmness.toLowerCase()}` : null,
      product.height ? `colchón ${product.height}cm altura` : null,
      
      // Financiación
      `${product.name} 12 cuotas sin interés`,
      `${product.name} en cuotas Mercado Pago`,
      'colchón 3 cuotas sin recargo',
      'colchón 6 cuotas tarjeta',
      'financiación colchones Villa María',
      
      // Ubicación
      'envío gratis Villa María',
      'colchones Villa María Córdoba',
      'Azul Colchones Villa María',
      
      // Marca
      'colchones Piero Argentina',
      `Piero ${product.name}`,
      
      // Garantía y prueba
      'colchón garantía 5 años',
      '100 noches de prueba',
      
      // Características específicas
      product.isEco ? 'colchón ecológico' : null,
      product.cooling ? 'colchón sistema enfriamiento' : null,
      product.hypoallergenic ? 'colchón hipoalergénico' : null,
    ].filter(Boolean) as string[]

    // Description optimizada con cuotas
    const description = [
      product.subtitle || product.name,
      `⭐ ${product.rating}/5 (${product.reviewCount || 0} opiniones)`,
      savingsText,
      `💳 ${todasCuotas.map(c => `${c.cuotas}x ${c.formatted.precioCuota}`).join(' · ')}`,
      warrantyText,
      `${product.trialNights || 100} noches de prueba`,
      'Envío gratis Villa María',
      baseText
    ].filter(Boolean).join(' · ')

    return {
      title: `${product.name} - ${priceText} | Envío Gratis | Azul Colchones`,
      description,
      keywords,
      
      openGraph: {
        title: `${product.name} - ${formatARS(pricePesos)}`,
        description: `${getTextoPromocional(pricePesos)} · ⭐ ${product.rating}/5 · ${warrantyText} · Envío gratis Villa María${baseText}`,
        url: `https://azulcolchones.com.ar/producto/${slug}`,
        siteName: 'Azul Colchones',
        locale: 'es_AR',
        type: 'website',
        images: [{ 
          url: imageUrl, 
          width: 1200, 
          height: 630, 
          alt: `${product.name} - Colchón premium Villa María - ${mejorCuota.cuotas} cuotas sin interés` 
        }],
      },
      
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} - ${formatARS(pricePesos)}`,
        description: `${getTextoPromocional(pricePesos)} · ⭐ ${product.rating}/5 · Azul Colchones`,
        images: [imageUrl],
      },
      
      robots: { 
        index: Boolean(product.isActive && product.inStock), 
        follow: true 
      },
      
      alternates: { 
        canonical: `https://azulcolchones.com.ar/producto/${slug}` 
      },

      // Additional metadata
      other: {
        'product:price:amount': pricePesos.toString(),
        'product:price:currency': 'ARS',
        'product:availability': product.inStock ? 'in stock' : 'out of stock',
        'product:condition': 'new',
        'product:brand': 'Piero',
        'product:retailer': 'Azul Colchones',
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Error | Azul Colchones',
      description: 'Ha ocurrido un error al cargar el producto',
      robots: { index: false, follow: false },
    }
  }
}

// ============================================================================
// PRODUCT PAGE SKELETON
// ============================================================================

function ProductPageSkeleton() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-x-hidden antialiased">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" />
      
      <div className="max-w-[1700px] mx-auto px-2 sm:px-4 lg:px-12 xl:px-[80px] relative z-10">
        {/* Breadcrumbs Skeleton */}
        <div className="py-4 md:py-6">
          <div className="flex items-center gap-2 animate-pulse">
            <div className="h-4 w-16 bg-blue-500/20 rounded" />
            <div className="h-4 w-4 bg-blue-500/10 rounded" />
            <div className="h-4 w-24 bg-blue-500/20 rounded" />
            <div className="h-4 w-4 bg-blue-500/10 rounded" />
            <div className="h-4 w-32 bg-blue-500/20 rounded" />
          </div>
        </div>

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-8 md:py-12">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4 animate-pulse">
            <div className="aspect-square w-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20" />
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-blue-500/10 border border-blue-500/20 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6 animate-pulse">
            <div className="space-y-3">
              <div className="h-8 bg-blue-500/20 rounded-lg w-3/4" />
              <div className="h-5 bg-blue-500/10 rounded w-1/2" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-6 w-20 bg-blue-500/20 rounded" />
              <div className="h-6 w-32 bg-blue-500/10 rounded" />
            </div>
            
            {/* Price skeleton con cuotas */}
            <div className="space-y-3 p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
              <div className="h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg w-2/3" />
              <div className="h-4 bg-blue-500/10 rounded w-1/2" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-10 bg-blue-500/10 rounded-lg" />
                <div className="h-10 bg-blue-500/10 rounded-lg" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 bg-blue-500/10 rounded w-full" />
              <div className="h-4 bg-blue-500/10 rounded w-5/6" />
              <div className="h-4 bg-blue-500/10 rounded w-4/6" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="h-14 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl" />
              <div className="h-14 bg-blue-500/10 rounded-xl border border-blue-500/20" />
            </div>
          </div>
        </div>

        {/* Features Section Skeleton */}
        <div className="border-t border-blue-500/20 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3">
                <div className="h-12 w-12 bg-blue-500/20 rounded-full" />
                <div className="h-4 w-20 bg-blue-500/10 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="border-t border-blue-500/20 py-12 md:py-16">
          <div className="space-y-8 animate-pulse">
            <div className="h-8 w-48 bg-blue-500/20 rounded-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-square bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20" />
                  <div className="h-5 bg-blue-500/20 rounded w-3/4" />
                  <div className="h-6 bg-blue-500/10 rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// PRODUCT SCHEMA JSON-LD - ARGENTINA CON SISTEMA DE CUOTAS
// ============================================================================

function generateProductSchema(product: any) {
  const images = Array.isArray(product.images) ? product.images : []
  const imageUrl = images[0] || product.image || '/og-default.jpg'
  
  // ✅ CONVERSIÓN: centavos → pesos
  const pricePesos = centavosToARS(product.price)
  const originalPricePesos = product.originalPrice ? centavosToARS(product.originalPrice) : null
  
  // ✅ CALCULAR TODAS LAS CUOTAS
  const todasCuotas = calcularTodasLasCuotas(pricePesos)
  const mejorCuota = getMejorCuota(pricePesos)

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.subtitle || product.description || product.name,
    image: images.length > 0 ? images : [imageUrl],
    sku: product.sku || product.id,
    mpn: product.sku || product.id,
    brand: {
      '@type': 'Brand',
      name: product.category === 'Sommiers' || product.category === 'Bases' ? 'Azul Colchones' : 'Piero',
      logo: 'https://azulcolchones.com.ar/logo-piero.png'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Azul Colchones',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Centro Comercial',
        addressLocality: 'Villa María',
        addressRegion: 'Córdoba',
        postalCode: '5900',
        addressCountry: 'AR'
      },
      telephone: '+54-353-XXX-XXXX',
      url: 'https://azulcolchones.com.ar'
    },
    offers: {
      '@type': 'AggregateOffer',
      url: `https://azulcolchones.com.ar/producto/${product.slug}`,
      priceCurrency: 'ARS',
      price: pricePesos.toFixed(2),
      lowPrice: pricePesos.toFixed(2),
      highPrice: (originalPricePesos || pricePesos).toFixed(2),
      offerCount: todasCuotas.length + 1,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      
      offers: [
        {
          '@type': 'Offer',
          price: pricePesos.toFixed(2),
          priceCurrency: 'ARS',
          name: 'Precio de contado / transferencia',
          description: 'Pago en efectivo, transferencia o débito',
          availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
        ...todasCuotas.map(cuota => ({
          '@type': 'Offer',
          price: cuota.precioTotal.toFixed(2),
          priceCurrency: 'ARS',
          name: `${cuota.cuotas} cuotas de ${cuota.formatted.precioCuota}`,
          description: `Financiación en ${cuota.cuotas} pagos de ${cuota.formatted.precioCuota} (+${cuota.recargoPercentage})`,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: cuota.precioCuota.toFixed(2),
            priceCurrency: 'ARS',
            referenceQuantity: {
              '@type': 'QuantitativeValue',
              value: cuota.cuotas,
              unitText: 'cuotas'
            }
          },
          availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        }))
      ],
      
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'ARS'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'AR',
          addressRegion: 'Córdoba'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 6,
            unitCode: 'DAY'
          },
          businessDays: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday'
            ]
          }
        }
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'AR',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: product.trialNights || 100,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      }
    },
    aggregateRating: product.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.8,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1
    } : undefined,
    additionalProperty: [
      product.firmness ? {
        '@type': 'PropertyValue',
        name: 'Firmeza',
        value: product.firmness
      } : null,
      product.height ? {
        '@type': 'PropertyValue',
        name: 'Altura',
        value: `${product.height} cm`
      } : null,
      {
        '@type': 'PropertyValue',
        name: 'Garantía',
        value: `${product.warranty || 5} años`
      },
      {
        '@type': 'PropertyValue',
        name: 'Período de prueba',
        value: `${product.trialNights || 100} noches`
      },
      {
        '@type': 'PropertyValue',
        name: 'Financiación disponible',
        value: `Hasta ${mejorCuota.cuotas} cuotas`
      }
    ].filter(Boolean)
  }
}

// ============================================================================
// MAIN PRODUCT PAGE
// ============================================================================

export default async function ProductPage({ params }: { params: Params }) {
  try {
    const { slug } = await params
    
    console.log('🛏️ [ProductPage] Loading product:', slug)
    
    // ✅ Obtener producto RAW desde DB (precios en centavos)
    const productRaw = await getProductBySlug(slug)
    
    if (!productRaw) {
      console.log('❌ [ProductPage] Product not found:', slug)
      notFound()
    }

    console.log('📊 [ProductPage] Product RAW from DB:', {
      id: productRaw.id,
      name: productRaw.name,
      priceInCentavos: productRaw.price,
      originalPriceInCentavos: productRaw.originalPrice
    })

    // ✅ CONVERTIR PRECIOS: centavos → pesos
    const product = convertirPreciosProducto(productRaw)

    console.log('✅ [ProductPage] Product CONVERTED to pesos:', {
      id: product.id,
      name: product.name,
      priceInPesos: product.price,
      formatted: formatARS(product.price),
      originalPriceInPesos: product.originalPrice,
      variantsCount: product.variants?.length || 0
    })

    // Non-blocking analytics tracking (usar precio en pesos)
    void trackProductView(product.id, {
      productId: product.id,
      productName: product.name,
      price: product.price, // Ya en pesos
      category: product.category
    })

    // ✅ Parallel fetch of related products
    const [relatedProductsRaw, similarProductsRaw] = await Promise.allSettled([
      getRelatedProducts(product.id, product.category, 4),
      getSimilarProducts(product.id, product.category, 4),
    ]).then(results => [
      results[0].status === 'fulfilled' ? results[0].value : [],
      results[1].status === 'fulfilled' ? results[1].value : [],
    ])

    // ✅ CONVERTIR PRECIOS de productos relacionados
    const relatedProducts = relatedProductsRaw.map(convertirPreciosProducto).filter(Boolean)
    const similarProducts = similarProductsRaw.map(convertirPreciosProducto).filter(Boolean)

    console.log('📦 [ProductPage] Related products:', relatedProducts.length)
    console.log('🔄 [ProductPage] Similar products:', similarProducts.length)

    // Stock information
    const stockInfo = {
      available: product.inStock ?? false,
      quantity: product.stock ?? 0,
      lowStock: (product.stock ?? 0) < 10,
      availableVariantsCount: product.variants?.filter((v: any) => v.stock > 0).length || 0,
      totalVariantsCount: product.variants?.length || 0,
    }

    // Breadcrumbs
    const breadcrumbs = [
      { name: 'Inicio', href: '/', current: false },
      { 
        name: product.category || 'Productos', 
        href: product.category
          ? `/catalogo?category=${product.category.toLowerCase()}`
          : '/catalogo',
        current: false 
      },
      { 
        name: product.name, 
        href: `/producto/${slug}`, 
        current: true 
      }
    ]

    // ✅ Generate Product Schema (usar productRaw para el schema, se convierte dentro)
    const productSchema = generateProductSchema(productRaw)

    console.log('🎯 [ProductPage] Rendering with converted prices')

    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-x-hidden scroll-smooth antialiased relative">
        {/* Background effects */}
        <div className="fixed inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px] pointer-events-none" />

        {/* Product Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
          key="product-schema"
        />

        <Suspense fallback={<ProductPageSkeleton />}>
          <div className="w-full max-w-[1920px] mx-auto px-0 md:px-4 lg:px-6 py-6 md:py-10 relative z-10">
            <ProductClient
              product={product}
              relatedProducts={relatedProducts}
              similarProducts={similarProducts}
              reviews={[]}
              stockInfo={stockInfo}
              breadcrumbs={breadcrumbs}
            />
          </div>
        </Suspense>
      </div>
    )
  } catch (error) {
    console.error('❌ [ProductPage] Error loading product page:', error)
    notFound()
  }
}