// app/producto/[slug]/page.tsx
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getProductBySlug, getRelatedProducts, getSimilarProducts, getProductRatings } from '@/lib/api/products'
import ProductClient from './product-client'
import ProductLoading from './product-loading'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Producto no encontrado | Descanso Premium',
      description: 'El producto que buscas no está disponible',
    }
  }

  const imageUrl = Array.isArray(product.images) && product.images.length > 0
    ? product.images[0]
    : product.image || '/og-default.jpg'

  const price = product.price
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - price) / product.originalPrice) * 100) 
    : 0

  return {
    title: `${product.name} | Desde ${Math.round(price / 12)}€/mes - Envío Gratis`,
    description: `${product.subtitle} ⭐ ${product.rating || 4.8}/5 estrellas · ${discount > 0 ? `-${discount}% de descuento` : 'Mejor precio'} · 100 noches de prueba · Garantía 10 años`,
    keywords: [
      product.name,
      'colchón premium',
      'colchón',
      'descanso',
      `firmeza ${product.firmnessValue}%`,
      `${product.height}cm`,
      'envío gratis',
      '100 noches prueba',
      'garantía 10 años',
    ],
    openGraph: {
      title: `${product.name}`,
      description: product.subtitle,
      url: `/producto/${slug}`,
      siteName: 'Descanso Premium',
      locale: 'es_ES',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.subtitle,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/producto/${slug}`,
    },
  }
}

// ✅ Convertir array a string separado por comas
function normalizeToString(value: unknown): string {
  if (Array.isArray(value)) {
    return value.filter(item => typeof item === 'string').join(',')
  }
  if (typeof value === 'string') {
    return value
  }
  return ''
}

// ✅ Convertir array de imágenes a string (primera imagen)
function normalizeImages(images: unknown): string {
  if (Array.isArray(images) && images.length > 0) {
    return images[0]
  }
  if (typeof images === 'string') {
    return images
  }
  return ''
}

// ✅ Normalizar un producto individual
function normalizeProduct(product: any) {
  return {
    ...product,
    features: normalizeToString(product.features),
    techFeatures: normalizeToString(product.techFeatures),
    certifications: normalizeToString(product.certifications),
    tags: normalizeToString(product.tags),
    images: normalizeImages(product.images),
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  
  if (!product) {
    notFound()
  }

  const [relatedProducts, similarProducts, averageRatings] = await Promise.all([
    getRelatedProducts(product.id, product.categoryId, 4),
    getSimilarProducts(product.id, product.firmnessValue, 4),
    getProductRatings(product.id),
  ])

  // ✅ Normalizar producto principal
  const normalizedProduct = normalizeProduct(product)

  // ✅ Normalizar productos relacionados y similares
  const normalizedRelatedProducts = relatedProducts.map(normalizeProduct)
  const normalizedSimilarProducts = similarProducts.map(normalizeProduct)

  const stockInfo = {
    available: product.inStock,
    quantity: product.stock || 0,
    lowStock: (product.stock || 0) < 10,
  }

  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductClient
        product={normalizedProduct}
        relatedProducts={normalizedRelatedProducts}
        similarProducts={normalizedSimilarProducts}
        averageRatings={averageRatings}
        stockInfo={stockInfo}
      />
    </Suspense>
  )
}