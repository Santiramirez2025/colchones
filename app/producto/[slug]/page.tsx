import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug, getRelatedProducts, getSimilarProducts, getProductRatings } from '@/lib/api/products'
import ProductClient from './product-client'
import ProductLoading from './product-loading'

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
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
    openGraph: {
      title: product.name,
      description: product.subtitle,
      url: `/producto/${params.slug}`,
      siteName: 'Descanso Premium',
      locale: 'es_ES',
      type: 'website',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: product.name }],
    },
  }
}

export default async function ProductPage(
  { params }: { params: { slug: string } }
) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()

  const [relatedProducts, similarProducts, averageRatings] = await Promise.all([
    getRelatedProducts(product.id, product.categoryId, 4),
    getSimilarProducts(product.id, product.firmnessValue, 4),
    getProductRatings(product.id),
  ])

  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductClient
        product={product}
        relatedProducts={relatedProducts}
        similarProducts={similarProducts}
        averageRatings={averageRatings}
      />
    </Suspense>
  )
}
