// lib/api/products.ts - VERSIÓN OPTIMIZADA Y CORREGIDA (SQLite Compatible)
import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { Product, Category, Review, ProductVariant, Prisma } from '@prisma/client'
import { parseJsonField } from '@/lib/utils/parse-product'

// ============================================================================
// TIPOS
// ============================================================================

type ParsedJsonFields = {
  features: string[]
  techFeatures: string[]
  certifications: string[]
  images: string[]
  tags: string[]
  highlights: string[]
  materials: string[]
  layers: Array<{ name: string; description: string }>
}

type ParsedProduct<T extends Product> = Omit<T, keyof ParsedJsonFields> & ParsedJsonFields

export type ProductWithCategory = ParsedProduct<Product> & {
  category: Category | null
}

export type ProductWithRelations = ParsedProduct<Product> & {
  category: Category | null
  reviews: Review[]
  variants: ProductVariant[]
}

export type ProductFilterOptions = {
  firmness?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  categoryId?: string
  inStock?: boolean
  isEco?: boolean
  cooling?: boolean
  hypoallergenic?: boolean
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular'
}

export type PaginatedResult<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// ============================================================================
// FUNCIONES DE PARSING
// ============================================================================

/**
 * Parsear un producto de Prisma a ProductWithParsedJson
 */
function parseProduct<T extends Product>(product: T): ParsedProduct<T> {
  return {
    ...product,
    features: parseJsonField(product.features),
    techFeatures: parseJsonField(product.techFeatures),
    certifications: parseJsonField(product.certifications),
    images: parseJsonField(product.images),
    tags: parseJsonField(product.tags),
    highlights: parseJsonField(product.highlights),
    materials: parseJsonField(product.materials),
    layers: parseJsonField(product.layers),
  } as ParsedProduct<T>
}

/**
 * Parsear producto con categoría
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
 * Parsear producto con todas las relaciones
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
// FUNCIONES PÚBLICAS - CON CACHÉ
// ============================================================================

/**
 * Obtener todos los productos activos con paginación
 */
export async function getProducts(options?: {
  page?: number
  limit?: number
  categoryId?: string
}): Promise<PaginatedResult<ProductWithCategory>> {
  try {
    const page = options?.page || 1
    const limit = options?.limit || 100
    const skip = (page - 1) * limit

    const where: Prisma.ProductWhereInput = { isActive: true }
    if (options?.categoryId) {
      where.categoryId = options.categoryId
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true
        },
        orderBy: [
          { position: 'asc' },
          { isBestSeller: 'desc' },
          { rating: 'desc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: limit
      }),
      prisma.product.count({ where })
    ])
    
    return {
      data: products.map(parseProductWithCategory),
      total,
      page,
      limit,
      hasMore: skip + limit < total
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      data: [],
      total: 0,
      page: 1,
      limit: options?.limit || 20,
      hasMore: false
    }
  }
}

/**
 * Obtener todos los productos (para generateStaticParams) - CON CACHÉ
 */
export const getAllProductsSlugs = unstable_cache(
  async (filters?: { isActive?: boolean }) => {
    try {
      const where: Prisma.ProductWhereInput = {}
      if (filters?.isActive !== undefined) {
        where.isActive = filters.isActive
      }

      const products = await prisma.product.findMany({
        where,
        select: {
          id: true,
          slug: true,
          name: true,
          isActive: true,
        }
      })
      
      return products
    } catch (error) {
      console.error('Error fetching all products:', error)
      return []
    }
  },
  ['all-products-slugs'],
  { 
    revalidate: 3600,
    tags: ['products']
  }
)

/**
 * Obtener producto por slug con todas sus relaciones - CON CACHÉ
 */
export const getProductBySlug = unstable_cache(
  async (slug: string): Promise<ProductWithRelations | null> => {
    try {
      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
          reviews: {
            where: {
              isPublished: true
            },
            orderBy: [
              { verified: 'desc' },
              { helpfulCount: 'desc' },
              { createdAt: 'desc' }
            ],
            take: 20
          },
          variants: {
            where: {
              isAvailable: true
            },
            orderBy: [
              { isPopular: 'desc' },
              { price: 'asc' }
            ]
          }
        }
      })
      
      if (!product) {
        return null
      }
      
      return parseProductWithRelations(product)
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  },
  ['product-by-slug'],
  { 
    revalidate: 1800,
    tags: ['products', 'reviews']
  }
)

/**
 * Obtener variantes de un producto
 */
export async function getProductVariants(productId: string): Promise<ProductVariant[]> {
  try {
    return await prisma.productVariant.findMany({
      where: { 
        productId,
        isAvailable: true
      },
      orderBy: [
        { isPopular: 'desc' },
        { price: 'asc' },
      ],
    })
  } catch (error) {
    console.error('Error fetching product variants:', error)
    return []
  }
}

/**
 * Obtener reviews de un producto con paginación
 */
export async function getProductReviews(
  productId: string,
  options: { 
    limit?: number
    offset?: number
    verified?: boolean 
  } = {}
): Promise<PaginatedResult<Review>> {
  try {
    const { limit = 10, offset = 0, verified } = options

    const where: Prisma.ReviewWhereInput = {
      productId,
      isPublished: true,
    }

    if (verified !== undefined) {
      where.verified = verified
    }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: [
          { verified: 'desc' },
          { helpfulCount: 'desc' },
          { createdAt: 'desc' }
        ],
        skip: offset,
        take: limit,
      }),
      prisma.review.count({ where })
    ])

    return {
      data: reviews,
      total,
      page: Math.floor(offset / limit) + 1,
      limit,
      hasMore: offset + limit < total
    }
  } catch (error) {
    console.error('Error fetching product reviews:', error)
    return {
      data: [],
      total: 0,
      page: 1,
      limit: options.limit || 10,
      hasMore: false
    }
  }
}

/**
 * Obtener productos por categoría - CON CACHÉ
 */
export const getProductsByCategory = unstable_cache(
  async (categorySlug: string): Promise<ProductWithCategory[]> => {
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
          { position: 'asc' },
          { rating: 'desc' },
          { reviewCount: 'desc' }
        ]
      })
      
      return products.map(parseProductWithCategory)
    } catch (error) {
      console.error('Error fetching products by category:', error)
      return []
    }
  },
  ['products-by-category'],
  { 
    revalidate: 1800,
    tags: ['products', 'categories']
  }
)

/**
 * Obtener productos destacados - CON CACHÉ
 */
export const getFeaturedProducts = unstable_cache(
  async (limit: number = 6): Promise<ProductWithCategory[]> => {
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
          { position: 'asc' },
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
  },
  ['featured-products'],
  { 
    revalidate: 3600,
    tags: ['products']
  }
)

/**
 * Obtener productos populares para generateStaticParams - CON CACHÉ
 */
export const getPopularProducts = unstable_cache(
  async (limit: number = 50) => {
    try {
      const products = await prisma.product.findMany({
        where: {
          isActive: true,
          inStock: true,
        },
        select: {
          id: true,
          slug: true,
          name: true,
          price: true,
          rating: true,
          salesCount: true,
          isBestSeller: true,
        },
        orderBy: [
          { isBestSeller: 'desc' },
          { salesCount: 'desc' },
          { rating: 'desc' },
          { viewsCount: 'desc' }
        ],
        take: limit
      })
      
      return products
    } catch (error) {
      console.error('Error fetching popular products:', error)
      return []
    }
  },
  ['popular-products'],
  { 
    revalidate: 3600,
    tags: ['products']
  }
)

/**
 * Buscar productos - CASE-INSENSITIVE para SQLite
 * 🔥 VERSIÓN CORREGIDA - Filtra en memoria para búsqueda case-insensitive
 */
export async function searchProducts(
  query: string,
  options?: {
    limit?: number
    categoryId?: string
  }
): Promise<ProductWithCategory[]> {
  try {
    if (!query || query.trim() === '') {
      return []
    }

    const searchTerm = query.trim().toLowerCase()
    const limit = options?.limit || 50

    // Obtener todos los productos activos
    const allProducts = await prisma.product.findMany({
      where: {
        isActive: true,
        ...(options?.categoryId && { categoryId: options.categoryId })
      },
      include: {
        category: true
      },
      orderBy: [
        { isBestSeller: 'desc' },
        { rating: 'desc' },
        { reviewCount: 'desc' }
      ]
    })

    // Filtrar en memoria (case-insensitive)
    const filtered = allProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.subtitle?.toLowerCase().includes(searchTerm) ||
      p.description?.toLowerCase().includes(searchTerm)
    ).slice(0, limit)

    console.log(`🔍 Search "${searchTerm}": ${filtered.length} products found`)
    
    return filtered.map(parseProductWithCategory)
  } catch (error) {
    console.error('Error searching products:', error)
    return []
  }
}

/**
 * Filtrar productos con opciones avanzadas
 */
export async function filterProducts(
  options: ProductFilterOptions
): Promise<ProductWithCategory[]> {
  try {
    const where: Prisma.ProductWhereInput = {
      isActive: true
    }

    if (options.firmness && options.firmness !== 'Todas') {
      where.firmness = options.firmness as any
    }

    if (options.minPrice !== undefined || options.maxPrice !== undefined) {
      where.price = {}
      if (options.minPrice !== undefined) {
        where.price.gte = options.minPrice
      }
      if (options.maxPrice !== undefined) {
        where.price.lte = options.maxPrice
      }
    }

    if (options.minRating !== undefined) {
      where.rating = {
        gte: options.minRating
      }
    }

    if (options.categoryId) {
      where.categoryId = options.categoryId
    }

    if (options.inStock !== undefined) {
      where.inStock = options.inStock
    }

    if (options.isEco) {
      where.isEco = true
    }
    if (options.cooling) {
      where.cooling = true
    }
    if (options.hypoallergenic) {
      where.hypoallergenic = true
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput[] = [
      { position: 'asc' },
      { isBestSeller: 'desc' },
      { rating: 'desc' }
    ]

    switch (options.sortBy) {
      case 'price-asc':
        orderBy = [{ price: 'asc' }]
        break
      case 'price-desc':
        orderBy = [{ price: 'desc' }]
        break
      case 'rating':
        orderBy = [{ rating: 'desc' }]
        break
      case 'newest':
        orderBy = [{ createdAt: 'desc' }]
        break
      case 'popular':
        orderBy = [{ salesCount: 'desc' }]
        break
      case 'featured':
      default:
        orderBy = [
          { position: 'asc' },
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
 * Obtener productos relacionados (misma categoría) - CON CACHÉ
 */
export const getRelatedProducts = unstable_cache(
  async (
    productId: string, 
    categoryId: string | null,
    limit: number = 4
  ): Promise<ProductWithCategory[]> => {
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
          { isBestSeller: 'desc' },
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
  },
  ['related-products'],
  { 
    revalidate: 3600,
    tags: ['products']
  }
)

/**
 * Obtener productos similares (por firmeza similar)
 */
export async function getSimilarProducts(
  productId: string,
  firmnessValue: number,
  limit: number = 4
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
      orderBy: [
        { rating: 'desc' },
        { reviewCount: 'desc' }
      ],
      take: limit
    })

    return products.map(parseProductWithCategory)
  } catch (error) {
    console.error('Error fetching similar products:', error)
    return []
  }
}

/**
 * Obtener categorías con contador de productos - CON CACHÉ
 */
export const getCategories = unstable_cache(
  async () => {
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
  },
  ['categories-list'],
  { 
    revalidate: 7200,
    tags: ['categories']
  }
)

/**
 * Calcular valoraciones promedio - OPTIMIZADO con aggregations
 */
export async function getProductRatings(productId: string) {
  try {
    const [avgResult, distribution] = await Promise.all([
      prisma.review.aggregate({
        where: {
          productId,
          isPublished: true
        },
        _avg: {
          rating: true,
          comfortRating: true,
          qualityRating: true,
          valueRating: true,
          deliveryRating: true
        },
        _count: {
          rating: true
        }
      }),
      prisma.review.groupBy({
        by: ['rating'],
        where: {
          productId,
          isPublished: true
        },
        _count: {
          rating: true
        }
      })
    ])

    const dist: Record<number, number> = {
      5: 0, 4: 0, 3: 0, 2: 0, 1: 0
    }
    
    distribution.forEach(d => {
      dist[d.rating] = d._count.rating
    })

    return {
      average: Math.round((avgResult._avg.rating || 0) * 10) / 10,
      count: avgResult._count.rating,
      comfort: Math.round((avgResult._avg.comfortRating || 0) * 10) / 10,
      quality: Math.round((avgResult._avg.qualityRating || 0) * 10) / 10,
      value: Math.round((avgResult._avg.valueRating || 0) * 10) / 10,
      delivery: Math.round((avgResult._avg.deliveryRating || 0) * 10) / 10,
      distribution: dist
    }
  } catch (error) {
    console.error('Error calculating product ratings:', error)
    return {
      average: 0,
      count: 0,
      comfort: 0,
      quality: 0,
      value: 0,
      delivery: 0,
      distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    }
  }
}

/**
 * Incrementar contador de vistas - Fire and forget
 */
export function incrementProductViews(productId: string): void {
  prisma.product.update({
    where: { id: productId },
    data: {
      viewsCount: {
        increment: 1
      }
    }
  }).catch(error => {
    console.error('Error incrementing product views:', error)
  })
}

/**
 * Marcar review como útil/no útil
 */
export async function markReviewHelpful(
  reviewId: string, 
  helpful: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.review.update({
      where: { id: reviewId },
      data: helpful 
        ? { helpfulCount: { increment: 1 } }
        : { notHelpfulCount: { increment: 1 } }
    })
    
    return { success: true }
  } catch (error) {
    console.error('Error marking review as helpful:', error)
    return { 
      success: false, 
      error: 'Failed to update review' 
    }
  }
}

/**
 * Obtener estadísticas de productos
 */
export async function getProductStats() {
  try {
    const [
      totalProducts,
      activeProducts,
      avgRating,
      totalReviews
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.product.aggregate({
        where: { isActive: true },
        _avg: { rating: true }
      }),
      prisma.review.count({ where: { isPublished: true } })
    ])

    return {
      totalProducts,
      activeProducts,
      averageRating: Math.round((avgRating._avg.rating || 0) * 10) / 10,
      totalReviews
    }
  } catch (error) {
    console.error('Error fetching product stats:', error)
    return {
      totalProducts: 0,
      activeProducts: 0,
      averageRating: 0,
      totalReviews: 0
    }
  }
}