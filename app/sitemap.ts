// app/sitemap.ts - Optimizado con Prisma
import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const BASE_URL = 'https://www.tiendacolchon.es'
export const revalidate = 3600 // Regenerar cada hora

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch paralelo de toda la data
    const [products, categories, blogPosts] = await Promise.all([
      prisma.product.findMany({
        where: { isActive: true },
        select: { 
          slug: true, 
          updatedAt: true,
          isBestSeller: true,
          isFeatured: true 
        },
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.category.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
        orderBy: { order: 'asc' }
      }),
      prisma.blogPost.findMany({
        where: { isPublished: true },
        select: { slug: true, publishedAt: true, updatedAt: true },
        orderBy: { publishedAt: 'desc' }
      })
    ])

    const now = new Date()

    return [
      // 1. HOME - Máxima prioridad
      {
        url: BASE_URL,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 1.0
      },

      // 2. PÁGINAS PRINCIPALES
      {
        url: `${BASE_URL}/catalogo`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.9
      },
      {
        url: `${BASE_URL}/comparador`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.85
      },
      {
        url: `${BASE_URL}/guia-compra`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8
      },
      {
        url: `${BASE_URL}/simulador`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75
      },

      // 3. CATEGORÍAS - Alta prioridad
      ...categories.map(cat => ({
        url: `${BASE_URL}/categoria/${cat.slug}`,
        lastModified: cat.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.85
      })),

      // 4. PRODUCTOS - Prioridad diferenciada
      ...products.map(prod => ({
        url: `${BASE_URL}/producto/${prod.slug}`,
        lastModified: prod.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: prod.isBestSeller || prod.isFeatured ? 0.9 : 0.8
      })),

      // 5. BLOG
      {
        url: `${BASE_URL}/blog`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7
      },
      ...blogPosts.map(post => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.publishedAt || post.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6
      })),

      // 6. GUÍAS Y CONTENIDO
      {
        url: `${BASE_URL}/cuidado-colchon`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65
      },
      {
        url: `${BASE_URL}/higiene-sueno`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65
      },
      {
        url: `${BASE_URL}/dormir-rapido`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65
      },
      {
        url: `${BASE_URL}/dormitorio-perfecto`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65
      },

      // 7. PÁGINAS INSTITUCIONALES
      {
        url: `${BASE_URL}/nosotros`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6
      },
      {
        url: `${BASE_URL}/profesional`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.55
      },
      {
        url: `${BASE_URL}/opiniones`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7
      },

      // 8. SERVICIO AL CLIENTE
      {
        url: `${BASE_URL}/contacto`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5
      },
      {
        url: `${BASE_URL}/preguntas-frecuentes`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6
      },
      {
        url: `${BASE_URL}/envios`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5
      },
      {
        url: `${BASE_URL}/devoluciones`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5
      },
      {
        url: `${BASE_URL}/garantia`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5
      },

      // 9. PÁGINAS LEGALES - Baja prioridad
      {
        url: `${BASE_URL}/privacidad`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3
      },
      {
        url: `${BASE_URL}/terminos`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3
      },
      {
        url: `${BASE_URL}/condiciones-compra`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3
      },
      {
        url: `${BASE_URL}/cookies`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3
      },
      {
        url: `${BASE_URL}/aviso-legal`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3
      }
    ]
  } catch (error) {
    console.error('Error generando sitemap:', error)
    
    // Fallback: devolver solo páginas principales
    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0
      },
      {
        url: `${BASE_URL}/catalogo`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9
      },
      {
        url: `${BASE_URL}/contacto`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5
      }
    ]
  }
}