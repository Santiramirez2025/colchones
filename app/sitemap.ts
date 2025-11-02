// app/sitemap.ts - Sitemap optimizado profesional
import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.tiendacolchon.es'
const NOW = new Date()

// ============================================
// CONFIGURACIÓN DE PRIORIDADES SEO
// ============================================
const PRIORITIES = {
  HOME: 1.0,
  PRODUCTS_LIST: 0.9,
  PRODUCT_PAGE: 0.9,
  CATEGORIES: 0.8,
  BLOG: 0.7,
  BLOG_POST: 0.6,
  INFO_PAGES: 0.6,
  LEGAL: 0.3
} as const

const FREQUENCIES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
} as const

// ============================================
// HELPER FUNCTION
// ============================================
const createUrl = (
  path: string, 
  priority: number, 
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  lastModified: Date = NOW
): MetadataRoute.Sitemap[number] => ({
  url: `${BASE_URL}${path}`,
  lastModified,
  changeFrequency,
  priority
})

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ============================================
  // PÁGINAS PRINCIPALES
  // ============================================
  const mainPages: MetadataRoute.Sitemap = [
    createUrl('/', PRIORITIES.HOME, FREQUENCIES.DAILY),
    createUrl('/productos', PRIORITIES.PRODUCTS_LIST, FREQUENCIES.DAILY),
    createUrl('/blog', PRIORITIES.BLOG, FREQUENCIES.WEEKLY),
  ]

  // ============================================
  // CATEGORÍAS DE PRODUCTOS
  // ============================================
  const categories = [
    'colchones-viscoelasticos',
    'colchones-muelles-ensacados',
    'colchones-hibridos',
    'colchones-latex',
    'almohadas',
    'bases-somieres'
  ]

  const categoryPages: MetadataRoute.Sitemap = categories.map(slug =>
    createUrl(`/categoria/${slug}`, PRIORITIES.CATEGORIES, FREQUENCIES.WEEKLY)
  )

  // ============================================
  // PRODUCTOS DESTACADOS
  // ============================================
  const products = [
    'colchon-multisac-premium',
    'colchon-viscoelastico-adaptable',
    'colchon-hibrido-comfort',
    'colchon-latex-natural',
    'almohada-viscoelastica'
  ]

  const productPages: MetadataRoute.Sitemap = products.map(slug =>
    createUrl(`/producto/${slug}`, PRIORITIES.PRODUCT_PAGE, FREQUENCIES.WEEKLY)
  )

  // ============================================
  // BLOG POSTS
  // ============================================
  const blogPosts = [
    'como-elegir-colchon-perfecto',
    'guia-firmeza-colchones',
    'mejor-colchon-dolor-espalda',
    'diferencias-colchon-viscoelastico-muelles'
  ]

  const blogPages: MetadataRoute.Sitemap = blogPosts.map(slug =>
    createUrl(`/blog/${slug}`, PRIORITIES.BLOG_POST, FREQUENCIES.MONTHLY)
  )

  // ============================================
  // PÁGINAS INFORMATIVAS
  // ============================================
  const infoPages = [
    { path: '/sobre-nosotros', freq: FREQUENCIES.MONTHLY },
    { path: '/contacto', freq: FREQUENCIES.MONTHLY },
    { path: '/preguntas-frecuentes', freq: FREQUENCIES.MONTHLY },
    { path: '/garantia', freq: FREQUENCIES.MONTHLY },
    { path: '/envios', freq: FREQUENCIES.MONTHLY },
    { path: '/devoluciones', freq: FREQUENCIES.MONTHLY }
  ]

  const infoSitemap: MetadataRoute.Sitemap = infoPages.map(page =>
    createUrl(page.path, PRIORITIES.INFO_PAGES, page.freq)
  )

  // ============================================
  // PÁGINAS LEGALES
  // ============================================
  const legalPages: MetadataRoute.Sitemap = [
    '/politica-privacidad',
    '/terminos-condiciones',
    '/politica-cookies'
  ].map(path => createUrl(path, PRIORITIES.LEGAL, FREQUENCIES.YEARLY))

  // ============================================
  // COMBINAR TODO
  // ============================================
  return [
    ...mainPages,
    ...categoryPages,
    ...productPages,
    ...blogPages,
    ...infoSitemap,
    ...legalPages
  ]
}

// ============================================
// NOTA: INTEGRACIÓN CON BASE DE DATOS
// ============================================
/*
Para sitios con muchos productos, usa tu base de datos:

import { prisma } from '@/lib/prisma'

// Dentro de sitemap():
const dbProducts = await prisma.product.findMany({
  where: { published: true },
  select: { slug: true, updatedAt: true }
})

const productPages = dbProducts.map(product =>
  createUrl(
    `/producto/${product.slug}`,
    PRIORITIES.PRODUCT_PAGE,
    FREQUENCIES.WEEKLY,
    product.updatedAt
  )
)
*/

// ============================================
// VERIFICACIÓN
// ============================================
/*
1. Verifica tu sitemap en:
   https://www.tiendacolchon.es/sitemap.xml

2. Envía a Google Search Console:
   - https://search.google.com/search-console

3. Valida con:
   - https://www.xml-sitemaps.com/validate-xml-sitemap.html

4. Robots.txt debe incluir:
   Sitemap: https://www.tiendacolchon.es/sitemap.xml
*/