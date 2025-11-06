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
import ProductClient from './product-client'

type Params = Promise<{ slug: string }>

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

// Revalidate every 5 minutes for active products
export const revalidate = 300

// ============================================================================
// METADATA GENERATION
// ============================================================================

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  try {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
      return {
        title: 'Producto no encontrado | Tienda Colchón',
        description: 'El producto que buscas no está disponible',
        robots: { index: false, follow: false },
      }
    }

    const images = Array.isArray(product.images) ? product.images : []
    const imageUrl = images[0] || product.image || '/og-default.jpg'
    
    const discount = product.discount || 0
    const finalPrice = discount > 0 
      ? Math.round(product.price * (1 - discount / 100))
      : product.price
    const monthlyPrice = Math.round(finalPrice / 12)
    const priceText = `Desde ${monthlyPrice}€/mes`
    const savingsText = discount > 0 ? ` · Ahorra ${Math.round(product.price - finalPrice)}€` : ''
    const warrantyText = product.warranty 
      ? `${product.warranty} años garantía`
      : 'Garantía incluida'

    // SEO Keywords optimizados
    const keywords = [
      product.name,
      `${product.name} precio`,
      `comprar ${product.name} online`,
      product.category?.name || 'colchón premium',
      product.firmness ? `colchón firmeza ${product.firmness.toLowerCase()}` : null,
      product.height ? `colchón ${product.height}cm altura` : null,
      'envío gratis colchón',
      'colchón garantía 3 años',
      'financiación sin intereses',
      product.isEco ? 'colchón ecológico' : null,
      product.cooling ? 'colchón sistema enfriamiento' : null,
      product.hypoallergenic ? 'colchón hipoalergénico' : null,
      'Tu descanso asegurado',
    ].filter(Boolean) as string[]

    return {
      title: `${product.name} - ${priceText} | Envío Gratis 24h | Tienda Colchón`,
      description: `${product.subtitle || product.name} ⭐ ${product.rating}/5 (${product.reviews?.length || 0} opiniones)${savingsText} · ${warrantyText} · ${product.trialNights || 100} noches de prueba · Envío gratis península`,
      keywords,
      
      openGraph: {
        title: `${product.name} - ${priceText}`,
        description: `${product.subtitle || product.name} · ⭐ ${product.rating}/5 · ${warrantyText}`,
        url: `/producto/${slug}`,
        siteName: 'Tienda Colchón',
        locale: 'es_ES',
        type: 'website',
        images: [{ 
          url: imageUrl, 
          width: 1200, 
          height: 630, 
          alt: `${product.name} - Colchón viscoelástico premium` 
        }],
      },
      
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} - ${priceText}`,
        description: `${product.subtitle || product.name} · ⭐ ${product.rating}/5`,
        images: [imageUrl],
      },
      
      robots: { 
        index: Boolean(product.isActive && product.inStock), 
        follow: true 
      },
      
      alternates: { 
        canonical: `/producto/${slug}` 
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Error | Tienda Colchón',
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
    <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden antialiased">
      <div className="max-w-[1700px] mx-auto px-2 sm:px-4 lg:px-12 xl:px-[80px]">
        {/* Breadcrumbs Skeleton */}
        <div className="py-4 md:py-6">
          <div className="flex items-center gap-2 animate-pulse">
            <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
        </div>

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-8 md:py-12">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4 animate-pulse">
            <div className="aspect-square w-full bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6 animate-pulse">
            <div className="space-y-3">
              <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-3/4" />
              <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </div>
            <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-full" />
            <div className="space-y-2">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-4/6" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="h-14 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
              <div className="h-14 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Features Section Skeleton */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3">
                <div className="h-12 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 py-12 md:py-16">
          <div className="space-y-8 animate-pulse">
            <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                  <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
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
// PRODUCT SCHEMA JSON-LD
// ============================================================================

function generateProductSchema(product: any) {
  const images = Array.isArray(product.images) ? product.images : []
  const imageUrl = images[0] || product.image || '/og-default.jpg'
  const discount = product.discount || 0
  const finalPrice = discount > 0 
    ? Math.round(product.price * (1 - discount / 100))
    : product.price

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.subtitle || product.description || product.name,
    image: images.length > 0 ? images : [imageUrl],
    sku: product.sku || product.id,
    brand: {
      '@type': 'Brand',
      name: 'Tienda Colchón'
    },
    offers: {
      '@type': 'Offer',
      url: `https://tiendacolchon.es/producto/${product.slug}`,
      priceCurrency: 'EUR',
      price: finalPrice,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'EUR'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 24,
            maxValue: 48,
            unitCode: 'HUR'
          }
        }
      }
    },
    aggregateRating: product.reviews && product.reviews.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.8,
      reviewCount: product.reviews.length,
      bestRating: 5,
      worstRating: 1
    } : undefined,
    review: product.reviews?.slice(0, 5).map((review: any) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5
      },
      author: {
        '@type': 'Person',
        name: review.userName
      },
      reviewBody: review.comment
    })) || []
  }
}

// ============================================================================
// MAIN PRODUCT PAGE
// ============================================================================

export default async function ProductPage({ params }: { params: Params }) {
  try {
    const { slug } = await params
    const product = await getProductBySlug(slug)
    
    if (!product) {
      notFound()
    }

    // Non-blocking analytics tracking
    void trackProductView(product.id, {
      productId: product.id,
      productName: product.name,
      price: product.price,
      category: product.category?.name
    })

    // Parallel fetch of related products (non-blocking)
    const [relatedProducts, similarProducts] = await Promise.allSettled([
      getRelatedProducts(product.id, product.categoryId, 4),
      getSimilarProducts(product.id, product.firmnessValue, 4),
    ]).then(results => [
      results[0].status === 'fulfilled' ? results[0].value : [],
      results[1].status === 'fulfilled' ? results[1].value : [],
    ])

    // Stock information
    const stockInfo = {
      available: product.inStock ?? false,
      quantity: product.stock ?? 0,
      lowStock: (product.stock ?? 0) < (product.lowStockThreshold ?? 10),
      availableVariantsCount: product.variants?.filter(v => (v.stock ?? 0) > 0).length ?? 0,
      totalVariantsCount: product.variants?.length ?? 0,
    }

    // Breadcrumbs
    const breadcrumbs = [
      { name: 'Inicio', href: '/', current: false },
      { 
        name: product.category?.name || 'Productos', 
        href: product.category?.slug
          ? `/catalogo/${product.category.slug}`
          : '/catalogo',
        current: false 
      },
      { 
        name: product.name, 
        href: `/producto/${slug}`, 
        current: true 
      }
    ]

    // Generate Product Schema
    const productSchema = generateProductSchema(product)

    return (
      <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden scroll-smooth antialiased">
        {/* Product Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
          key="product-schema"
        />

        <Suspense fallback={<ProductPageSkeleton />}>
        <div className="w-full max-w-[1920px] mx-auto px-0 md:px-4 lg:px-6 py-6 md:py-10">
            <ProductClient
              product={product}
              relatedProducts={relatedProducts}
              similarProducts={similarProducts}
              reviews={product.reviews || []}
              stockInfo={stockInfo}
              breadcrumbs={breadcrumbs}
            />
          </div>
        </Suspense>
      </div>
    )
  } catch (error) {
    console.error('Error loading product page:', error)
    notFound()
  }
}