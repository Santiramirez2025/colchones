// app/producto/[slug]/page.tsx
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getProductBySlug, getRelatedProducts, getSimilarProducts } from '@/lib/api/products'
import ProductClient from './product-client'
import ProductLoading from './product-loading'

type Params = { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Producto no encontrado | Descanso Premium',
      description: 'El producto que buscas no está disponible',
    }
  }

  const images = Array.isArray(product.images) ? product.images : []
  const imageUrl = images[0] || product.image || '/og-default.jpg'
  
  const discount = product.discount || 0

  return {
    title: `${product.name} | Desde ${Math.round(product.price / 12)}€/mes - Envío Gratis`,
    description: `${product.subtitle} ⭐ ${product.rating}/5 estrellas${discount > 0 ? ` · -${discount}% descuento` : ''} · Garantía ${product.warranty || 3} años`,
    keywords: [
      product.name,
      'colchón premium',
      `firmeza ${product.firmnessValue}%`,
      `${product.height}cm`,
      'envío gratis',
    ],
    openGraph: {
      title: product.name,
      description: product.subtitle,
      url: `/producto/${slug}`,
      siteName: 'Descanso Premium',
      locale: 'es_ES',
      type: 'website',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.subtitle,
      images: [imageUrl],
    },
    robots: { index: true, follow: true },
    alternates: { canonical: `/producto/${slug}` },
  }
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  
  if (!product) notFound()

  const [relatedProducts, similarProducts] = await Promise.all([
    getRelatedProducts(product.id, product.categoryId, 4),
    getSimilarProducts(product.id, product.firmnessValue, 4),
  ])

  const stockInfo = {
    available: product.inStock,
    quantity: product.stock,
    lowStock: product.stock < product.lowStockThreshold,
    availableVariantsCount: product.variants?.filter(v => v.stock > 0).length || 0,
    totalVariantsCount: product.variants?.length || 0,
  }

  const breadcrumbs = [
    { name: 'Inicio', href: '/', current: false },
    { name: product.category?.name || 'Productos', href: '/productos', current: false },
    { name: product.name, href: `/producto/${slug}`, current: true }
  ]

  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductClient
        product={product}
        relatedProducts={relatedProducts}
        similarProducts={similarProducts}
        reviews={product.reviews}
        stockInfo={stockInfo}
        breadcrumbs={breadcrumbs}
      />
    </Suspense>
  )
}