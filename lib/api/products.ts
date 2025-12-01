// lib/api/products.ts - ✅ OPTIMIZADO Y ACTUALIZADO CON VARIANTS
import { prisma } from '@/lib/prisma'

// ============================================================================
// TIPOS
// ============================================================================

export type Product = {
  id: string
  name: string
  slug: string
  subtitle: string
  description: string
  price: number
  originalPrice: number | null
  compareAtPrice: number | null
  stock: number
  inStock: boolean
  lowStockAlert: number
  category: string
  subcategory: string | null
  tags: string[]
  images: string[]
  firmness: string | null
  firmnessValue: number
  height: number
  weight: number | null
  warranty: number
  trialNights: number
  features: string[]
  techFeatures: string[]
  highlights: string[]
  materials: string[]
  layers: any
  certifications: string[]
  cooling: boolean
  isEco: boolean
  hypoallergenic: boolean
  washable: boolean
  transpirability: number
  satisfaction: number
  rating: number
  reviewCount: number
  isActive: boolean
  isFeatured: boolean
  isBestSeller: boolean
  isNew: boolean
  metaTitle: string | null
  metaDescription: string | null
  metaKeywords: string[]
  createdAt: Date
  updatedAt: Date
  variants?: any[]  // ✅ AGREGADO
  reviews?: any[]   // ✅ AGREGADO
}

export type PaginatedResult<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export type ProductFilterOptions = {
  category?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  inStock?: boolean
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Asegura que el producto tenga todos los campos necesarios
 * (Los arrays ya vienen correctamente de Prisma)
 */
function parseProduct(product: any): Product {
  return {
    ...product,
    // Asegurar arrays vacíos si vienen null
    tags: product.tags || [],
    images: product.images || [],
    features: product.features || [],
    techFeatures: product.techFeatures || [],
    highlights: product.highlights || [],
    materials: product.materials || [],
    certifications: product.certifications || [],
    metaKeywords: product.metaKeywords || [],
    variants: product.variants || [],  // ✅ AGREGADO
    reviews: product.reviews || []     // ✅ AGREGADO
  }
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Obtener todos los productos con paginación y filtros
 */
export async function getProducts(options?: {
  page?: number
  limit?: number
  category?: string
}): Promise<PaginatedResult<Product>> {
  try {
    const page = options?.page || 1
    const limit = options?.limit || 100
    const skip = (page - 1) * limit

    const where: any = {
      isActive: true,
    }

    if (options?.category) {
      where.category = options.category
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: [
          { isBestSeller: 'desc' },
          { isNew: 'desc' },
          { rating: 'desc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: limit,
        include: {
          variants: {
            orderBy: [
              { isDefault: 'desc' },
              { price: 'asc' }
            ]
          }
        }
      }),
      prisma.product.count({ where })
    ])
    
    return {
      data: products.map(parseProduct),
      total,
      page,
      limit,
      hasMore: skip + limit < total
    }
  } catch (error) {
    console.error('❌ Error fetching products:', error)
    return {
      data: [],
      total: 0,
      page: 1,
      limit: options?.limit || 100,
      hasMore: false
    }
  }
}

/**
 * Obtener producto por slug - CON VARIANTS Y REVIEWS ✅
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    console.log('🔍 [API] Fetching product by slug:', slug)
    
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: {  // ✅ CRÍTICO: Sin esto no aparecen las medidas
          orderBy: [
            { isDefault: 'desc' }, // Variante default primero
            { price: 'asc' }       // Luego por precio
          ]
        },
        reviews: {
          where: { verified: true },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })
    
    if (!product) {
      console.log('❌ [API] Product not found:', slug)
      return null
    }
    
    console.log('✅ [API] Product loaded:', {
      id: product.id,
      name: product.name,
      price: product.price,
      variantsCount: product.variants?.length || 0,
      reviewsCount: product.reviews?.length || 0
    })
    
    return parseProduct(product)
  } catch (error) {
    console.error('❌ Error fetching product by slug:', error)
    return null
  }
}

/**
 * Obtener todos los slugs (para generateStaticParams)
 */
export async function getAllProductsSlugs(): Promise<{ slug: string }[]> {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: { slug: true }
    })
    
    return products
  } catch (error) {
    console.error('❌ Error fetching slugs:', error)
    return []
  }
}

/**
 * Buscar productos
 */
export async function searchProducts(
  query: string,
  limit: number = 50
): Promise<Product[]> {
  try {
    if (!query || query.trim() === '') return []

    const searchTerm = query.trim().toLowerCase()

    const allProducts = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        variants: {
          orderBy: [
            { isDefault: 'desc' },
            { price: 'asc' }
          ]
        }
      }
    })

    const filtered = allProducts
      .filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.subtitle?.toLowerCase().includes(searchTerm) ||
        p.description?.toLowerCase().includes(searchTerm) ||
        p.category?.toLowerCase().includes(searchTerm)
      )
      .slice(0, limit)
    
    return filtered.map(parseProduct)
  } catch (error) {
    console.error('❌ Error searching products:', error)
    return []
  }
}

/**
 * Filtrar productos con opciones avanzadas
 */
export async function filterProducts(
  options: ProductFilterOptions
): Promise<Product[]> {
  try {
    const where: any = {
      isActive: true,
    }

    if (options.category) {
      where.category = options.category
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
      where.rating = { gte: options.minRating }
    }

    if (options.inStock !== undefined) {
      where.inStock = options.inStock
    }

    let orderBy: any[] = [
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
        orderBy = [{ rating: 'desc' }, { reviewCount: 'desc' }]
        break
      case 'newest':
        orderBy = [{ createdAt: 'desc' }]
        break
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        variants: {
          orderBy: [
            { isDefault: 'desc' },
            { price: 'asc' }
          ]
        }
      }
    })

    return products.map(parseProduct)
  } catch (error) {
    console.error('❌ Error filtering products:', error)
    return []
  }
}

/**
 * Obtener productos destacados
 */
export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
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
      orderBy: [
        { isFeatured: 'desc' },
        { isBestSeller: 'desc' },
        { rating: 'desc' }
      ],
      take: limit,
      include: {
        variants: {
          orderBy: [
            { isDefault: 'desc' },
            { price: 'asc' }
          ]
        }
      }
    })
    
    return products.map(parseProduct)
  } catch (error) {
    console.error('❌ Error fetching featured products:', error)
    return []
  }
}

/**
 * Obtener productos por categoría
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        category: category
      },
      orderBy: [
        { isBestSeller: 'desc' },
        { rating: 'desc' }
      ],
      include: {
        variants: {
          orderBy: [
            { isDefault: 'desc' },
            { price: 'asc' }
          ]
        }
      }
    })
    
    return products.map(parseProduct)
  } catch (error) {
    console.error('❌ Error fetching products by category:', error)
    return []
  }
}

/**
 * Obtener todas las categorías únicas
 */
export async function getCategories(): Promise<string[]> {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: { category: true },
      distinct: ['category']
    })
    
    return products
      .map(p => p.category)
      .filter(Boolean)
      .sort()
  } catch (error) {
    console.error('❌ Error fetching categories:', error)
    return []
  }
}

/**
 * Obtener productos relacionados (misma categoría)
 */
export async function getRelatedProducts(
  productId: string,
  category: string,
  limit: number = 4
): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        category: category,
        id: { not: productId }
      },
      orderBy: [
        { isBestSeller: 'desc' },
        { rating: 'desc' }
      ],
      take: limit,
      include: {
        variants: {
          orderBy: [
            { isDefault: 'desc' },
            { price: 'asc' }
          ]
        }
      }
    })

    return products.map(parseProduct)
  } catch (error) {
    console.error('❌ Error fetching related products:', error)
    return []
  }
}

/**
 * Obtener productos populares (los más vendidos/mejor valorados)
 */
export async function getPopularProducts(limit: number = 4): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { isBestSeller: 'desc' },
        { rating: 'desc' },
        { reviewCount: 'desc' },
      ],
      take: limit,
      include: {
        variants: {
          orderBy: [
            { isDefault: 'desc' },
            { price: 'asc' }
          ]
        }
      }
    })

    return products.map(parseProduct)
  } catch (error) {
    console.error('❌ Error fetching popular products:', error)
    return []
  }
}

/**
 * Obtener productos similares (misma categoría, excluyendo el actual)
 */
export async function getSimilarProducts(
  productId: string,
  category: string,
  limit: number = 4
): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        category: category,
        id: { not: productId }
      },
      orderBy: [
        { isBestSeller: 'desc' },
        { rating: 'desc' }
      ],
      take: limit,
      include: {
        variants: {
          orderBy: [
            { isDefault: 'desc' },
            { price: 'asc' }
          ]
        }
      }
    })

    return products.map(parseProduct)
  } catch (error) {
    console.error('❌ Error fetching similar products:', error)
    return []
  }
}

/**
 * Obtener estadísticas de productos
 */
export async function getProductStats() {
  try {
    const [total, active, avgRating, bestSellers, categories] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.product.aggregate({
        where: { isActive: true },
        _avg: { rating: true }
      }),
      prisma.product.count({ 
        where: { isActive: true, isBestSeller: true } 
      }),
      prisma.product.findMany({
        where: { isActive: true },
        select: { category: true },
        distinct: ['category']
      })
    ])

    return {
      total,
      active,
      averageRating: Math.round((avgRating._avg.rating || 0) * 10) / 10,
      bestSellers,
      categoriesCount: categories.length
    }
  } catch (error) {
    console.error('❌ Error fetching stats:', error)
    return {
      total: 0,
      active: 0,
      averageRating: 0,
      bestSellers: 0,
      categoriesCount: 0
    }
  }
}