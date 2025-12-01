// app/sitemap.ts - Optimizado para Azul Colchones Villa María
import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const BASE_URL = 'https://azulcolchones.com'
export const revalidate = 3600 // Regenerar cada hora

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // ✅ Fetch paralelo solo de modelos que existen
    const [products, uniqueCategories] = await Promise.all([
      prisma.product.findMany({
        where: { isActive: true },
        select: { 
          slug: true, 
          updatedAt: true,
          isBestSeller: true,
          isFeatured: true,
          category: true
        },
        orderBy: { updatedAt: 'desc' }
      }),
      // ✅ Obtener categorías únicas desde productos
      prisma.product.findMany({
        where: { 
          isActive: true
        },
        select: { category: true },
        distinct: ['category']
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

      // 3. CATEGORÍAS - Alta prioridad (desde productos)
      ...uniqueCategories
        .filter(cat => cat.category && cat.category.trim() !== '')
        .map(cat => ({
          url: `${BASE_URL}/catalogo?category=${encodeURIComponent(cat.category!)}`,
          lastModified: now,
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

      // 5. PÁGINAS LOCALES VILLA MARÍA
      {
        url: `${BASE_URL}/villa-maria`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8
      },

      // 6. PÁGINAS INSTITUCIONALES
      {
        url: `${BASE_URL}/nosotros`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6
      },

      // 7. SERVICIO AL CLIENTE
      {
        url: `${BASE_URL}/contacto`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6
      },
      {
        url: `${BASE_URL}/preguntas-frecuentes`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65
      },
      {
        url: `${BASE_URL}/envios`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6
      },
      {
        url: `${BASE_URL}/devoluciones`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.55
      },
      {
        url: `${BASE_URL}/garantia`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.55
      },
      {
        url: `${BASE_URL}/financiacion`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65
      },

      // 8. PÁGINAS LEGALES - Baja prioridad
      {
        url: `${BASE_URL}/defensa-consumidor`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.4
      },
      {
        url: `${BASE_URL}/boton-arrepentimiento`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.4
      },
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
    console.error('❌ Error generando sitemap:', error)
    
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
        url: `${BASE_URL}/villa-maria`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8
      },
      {
        url: `${BASE_URL}/contacto`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6
      }
    ]
  }
}