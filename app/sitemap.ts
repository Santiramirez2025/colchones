// app/sitemap.ts - Sitemap dinámico para Next.js 15
import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
// import { prisma } from '@/lib/prisma' // Si usas Prisma para productos

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url
  const currentDate = new Date()

  // ============================================
  // PÁGINAS ESTÁTICAS
  // ============================================
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/productos`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/preguntas-frecuentes`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/garantia`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/envios`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/politica-privacidad`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos-condiciones`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-cookies`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // ============================================
  // PÁGINAS DINÁMICAS - PRODUCTOS
  // ============================================
  // Opción 1: Productos hardcodeados
  const productPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/producto/colchon-multisac-premium`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Añade más productos aquí
  ]

  // Opción 2: Productos desde base de datos (Prisma)
  /*
  const products = await prisma.product.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/producto/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))
  */

  // ============================================
  // PÁGINAS DINÁMICAS - CATEGORÍAS
  // ============================================
  const categoryPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/categoria/colchones-viscoelasticos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categoria/colchones-muelles`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categoria/colchones-hibridos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categoria/almohadas`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // ============================================
  // PÁGINAS DINÁMICAS - BLOG
  // ============================================
  // Opción 1: Posts hardcodeados
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog/como-elegir-colchon-perfecto`,
      lastModified: new Date('2024-10-15'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Añade más posts aquí
  ]

  // Opción 2: Posts desde base de datos
  /*
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  */

  // ============================================
  // COMBINAR TODAS LAS PÁGINAS
  // ============================================
  return [
    ...staticPages,
    ...productPages,
    ...categoryPages,
    ...blogPages,
  ]
}

// ============================================
// SITEMAP INDEX (opcional para sitios grandes)
// ============================================
// Si tienes >50,000 URLs, crea múltiples sitemaps:

/*
// app/sitemap-index.xml/route.ts
export async function GET() {
  const baseUrl = 'https://tiendacolchon.es'
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>${baseUrl}/sitemap.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    <sitemap>
      <loc>${baseUrl}/sitemap-products.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    <sitemap>
      <loc>${baseUrl}/sitemap-blog.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
  </sitemapindex>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
*/