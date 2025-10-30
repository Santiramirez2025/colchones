// lib/api/products.ts
import { prisma } from '@/lib/prisma'
import { Product, Category, Review, ProductVariant } from '@prisma/client'
import { parseJsonField } from '@/lib/utils/parse-product'
import { 
  ProductWithCategory, 
  ProductWithRelations,
  ProductFilterOptions 
} from '@/lib/types/product'

/**
 * ⚡ Parsear un producto de Prisma a ProductWithParsedJson
 * 
 * Convierte todos los campos JSON (string) a arrays
 */
function parseProduct<T extends Product>(product: T): T & {
  features: string[]
  techFeatures: string[]
  certifications: string[]
  images: string[]
  tags: string[]
} {
  return {
    ...product,
    features: parseJsonField(product.features),
    techFeatures: parseJsonField(product.techFeatures),
    certifications: parseJsonField(product.certifications),
    images: parseJsonField(product.images),
    tags: parseJsonField(product.tags)
  }
}

/**
 * ⚡ Parsear producto con categoría
 */
function parseProductWithCategory(
  product: Product & { category: Category | null }
): ProductWithCategory {
  return {
    ...parseProduct(product),
    category: product.category
  }
}

/**
 * ⚡ Parsear producto con todas las relaciones
 */
function parseProductWithRelations(
  product: Product & { 
    category: Category | null
    reviews: Review[]
    variants: ProductVariant[]
  }
): ProductWithRelations {
  return {
    ...parseProduct(product),
    category: product.category,
    reviews: product.reviews,
    variants: product.variants
  }
}

// ============================================================================
// FUNCIONES PÚBLICAS
// ============================================================================

/**
 * Obtener todos los productos activos
 */
export async function getProducts(): Promise<ProductWithCategory[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true
      },
      include: {
        category: true
      },
      orderBy: [
        { isBestSeller: 'desc' },
        { rating: 'desc' },
        { createdAt: 'desc' }
      ]
    })
    
    return products.map(parseProductWithCategory)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

/**
 * Obtener producto por slug con todas sus relaciones
 */
export async function getProductBySlug(slug: string): Promise<ProductWithRelations | null> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug
      },
      include: {
        category: true,
        reviews: {
          where: {
            verified: true
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 20
        },
        variants: {
          where: {
            isAvailable: true
          },
          orderBy: {
            size: 'asc'
          }
        }
      }
    })
    
    // Validar que el producto exista y esté activo
    if (!product || !product.isActive) {
      return null
    }
    
    return parseProductWithRelations(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

/**
 * Obtener productos por categoría
 */
export async function getProductsByCategory(categorySlug: string): Promise<ProductWithCategory[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        category: {
          slug: categorySlug,
          isActive: true
        }
      },
      include: {
        category: true
      },
      orderBy: [
        { rating: 'desc' },
        { reviewCount: 'desc' }
      ]
    })
    
    return products.map(parseProductWithCategory)
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

/**
 * Obtener productos destacados
 */
export async function getFeaturedProducts(limit: number = 6): Promise<ProductWithCategory[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { isBestSeller: true },
          { isNew: true },
          { isFeatured: true }
        ]
      },
      include: {
        category: true
      },
      orderBy: [
        { isFeatured: 'desc' },
        { isBestSeller: 'desc' },
        { rating: 'desc' }
      ],
      take: limit
    })
    
    return products.map(parseProductWithCategory)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

/**
 * Buscar productos
 */
export async function searchProducts(query: string): Promise<ProductWithCategory[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          {
            name: {
              contains: query
            }
          },
          {
            subtitle: {
              contains: query
            }
          },
          {
            description: {
              contains: query
            }
          }
        ]
      },
      include: {
        category: true
      },
      orderBy: {
        rating: 'desc'
      }
    })
    
    return products.map(parseProductWithCategory)
  } catch (error) {
    console.error('Error searching products:', error)
    return []
  }
}

/**
 * Filtrar productos con opciones avanzadas
 */
export async function filterProducts(options: ProductFilterOptions): Promise<ProductWithCategory[]> {
  try {
    const where: any = {
      isActive: true
    }

    // Filtro de firmeza
    if (options.firmness && options.firmness !== 'Todas') {
      where.firmness = options.firmness
    }

    // Filtro de precio
    if (options.minPrice !== undefined || options.maxPrice !== undefined) {
      where.price = {}
      if (options.minPrice !== undefined) {
        where.price.gte = options.minPrice
      }
      if (options.maxPrice !== undefined) {
        where.price.lte = options.maxPrice
      }
    }

    // Filtro de rating
    if (options.minRating !== undefined) {
      where.rating = {
        gte: options.minRating
      }
    }

    // Filtro de categoría
    if (options.categoryId) {
      where.categoryId = options.categoryId
    }

    // Filtro de stock
    if (options.inStock !== undefined) {
      where.inStock = options.inStock
    }

    // Configurar ordenamiento
    let orderBy: any = [
      { isBestSeller: 'desc' },
      { rating: 'desc' }
    ]

    switch (options.sortBy) {
      case 'price-asc':
        orderBy = { price: 'asc' }
        break
      case 'price-desc':
        orderBy = { price: 'desc' }
        break
      case 'rating':
        orderBy = { rating: 'desc' }
        break
      case 'newest':
        orderBy = { createdAt: 'desc' }
        break
      case 'featured':
      default:
        orderBy = [
          { isFeatured: 'desc' },
          { isBestSeller: 'desc' },
          { rating: 'desc' }
        ]
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true
      },
      orderBy
    })

    return products.map(parseProductWithCategory)
  } catch (error) {
    console.error('Error filtering products:', error)
    return []
  }
}

/**
 * Obtener productos relacionados (misma categoría, excluyendo el actual)
 */
export async function getRelatedProducts(
  productId: string, 
  categoryId: string | null,
  limit: number = 3
): Promise<ProductWithCategory[]> {
  try {
    if (!categoryId) return []

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        categoryId: categoryId,
        id: { not: productId }
      },
      include: {
        category: true
      },
      orderBy: [
        { rating: 'desc' },
        { reviewCount: 'desc' }
      ],
      take: limit
    })

    return products.map(parseProductWithCategory)
  } catch (error) {
    console.error('Error fetching related products:', error)
    return []
  }
}

/**
 * Obtener productos similares (por firmeza similar)
 */
export async function getSimilarProducts(
  productId: string,
  firmnessValue: number,
  limit: number = 3
): Promise<ProductWithCategory[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        id: { not: productId },
        firmnessValue: {
          gte: firmnessValue - 15,
          lte: firmnessValue + 15
        }
      },
      include: {
        category: true
      },
      orderBy: {
        rating: 'desc'
      },
      take: limit
    })

    return products.map(parseProductWithCategory)
  } catch (error) {
    console.error('Error fetching similar products:', error)
    return []
  }
}

/**
 * Obtener categorías con contador de productos activos
 */
export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true
      },
      include: {
        _count: {
          select: {
            products: {
              where: {
                isActive: true
              }
            }
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    })
    
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Calcular valoraciones promedio detalladas de un producto
 */
export async function getProductRatings(productId: string) {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId,
        isPublished: true
      },
      select: {
        rating: true,
        comfortRating: true,
        qualityRating: true,
        valueRating: true
      }
    })

    if (reviews.length === 0) {
      return {
        comfort: 0,
        quality: 0,
        value: 0
      }
    }

    const comfort = reviews.reduce((sum, r) => sum + (r.comfortRating || 0), 0) / reviews.length
    const quality = reviews.reduce((sum, r) => sum + (r.qualityRating || 0), 0) / reviews.length
    const value = reviews.reduce((sum, r) => sum + (r.valueRating || 0), 0) / reviews.length

    return {
      comfort: Math.round(comfort * 10) / 10,
      quality: Math.round(quality * 10) / 10,
      value: Math.round(value * 10) / 10
    }
  } catch (error) {
    console.error('Error calculating product ratings:', error)
    return {
      comfort: 0,
      quality: 0,
      value: 0
    }
  }
}