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
import ProductLoading from './product-loading'

type Params = Promise<{ slug: string }>

// Generate static params for popular products (ISR)
export async function generateStaticParams() {
  try {
    const products = await getPopularProducts(50)
    return products.map((product) => ({ slug: product.slug }))
  } catch (error) {
    console.error('Failed to generate static params:', error)
    return []
  }
}

// Revalidate every hour
export const revalidate = 3600

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Producto no encontrado | Descanso Premium',
      description: 'El producto que buscas no está disponible',
      robots: { index: false, follow: false },
    }
  }

  const images = Array.isArray(product.images) ? product.images : []
  const imageUrl = images[0] || product.image || '/og-default.jpg'
  
  const discount = product.discount || 0
  const monthlyPrice = Math.round(product.price / 12)
  const priceText = `Desde ${monthlyPrice}€/mes`
  const warrantyText = product.warranty 
    ? `Garantía ${product.warranty} años`
    : 'Garantía incluida'
  const discountText = discount > 0 ? ` · -${discount}% descuento` : ''

  const keywords = [
    product.name,
    product.category?.name || 'colchón premium',
    product.firmness ? `firmeza ${product.firmness.toLowerCase()}` : null,
    product.firmnessValue ? `firmeza ${product.firmnessValue}%` : null,
    product.height ? `altura ${product.height}cm` : null,
    'envío gratis',
    'financiación sin intereses',
    product.isEco ? 'ecológico' : null,
    product.cooling ? 'sistema de enfriamiento' : null,
    product.hypoallergenic ? 'hipoalergénico' : null,
  ].filter(Boolean) as string[]

  return {
    title: `${product.name} | ${priceText} - Envío Gratis`,
    description: `${product.subtitle || product.name} ⭐ ${product.rating}/5 estrellas${discountText} · ${warrantyText} · ${product.trialNights || 100} noches de prueba`,
    keywords,
    openGraph: {
      title: product.name,
      description: product.subtitle || product.name,
      url: `/producto/${slug}`,
      siteName: 'Descanso Premium',
      locale: 'es_ES',
      type: 'website',
      images: [{ 
        url: imageUrl, 
        width: 1200, 
        height: 630, 
        alt: product.name 
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.subtitle || product.name,
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
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  
  if (!product) notFound()

  // Non-blocking analytics
  void trackProductView(product.id, {
    productId: product.id,
    productName: product.name,
    price: product.price,
    category: product.category?.name
  })

  const [relatedProducts, similarProducts] = await Promise.all([
    getRelatedProducts(product.id, product.categoryId, 4),
    getSimilarProducts(product.id, product.firmnessValue, 4),
  ])

  const stockInfo = {
    available: product.inStock ?? false,
    quantity: product.stock ?? 0,
    lowStock: (product.stock ?? 0) < (product.lowStockThreshold ?? 10),
    availableVariantsCount: product.variants?.filter(v => (v.stock ?? 0) > 0).length ?? 0,
    totalVariantsCount: product.variants?.length ?? 0,
  }

  const breadcrumbs = [
    { name: 'Inicio', href: '/', current: false },
    { 
      name: product.category?.name || 'Productos', 
      href: product.category?.slug
        ? `/catalogo/${product.category.slug}`
        : '/productos',
      current: false 
    },
    { 
      name: product.name, 
      href: `/producto/${slug}`, 
      current: true 
    }
  ]

  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductClient
        product={product}
        relatedProducts={relatedProducts}
        similarProducts={similarProducts}
        reviews={product.reviews || []}
        stockInfo={stockInfo}
        breadcrumbs={breadcrumbs}
      />
    </Suspense>
  )
}