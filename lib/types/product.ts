// lib/types/product.ts

import { Product, Category, Review, ProductVariant } from '@prisma/client'

/**
 * ⚡ Producto con campos JSON parseados como arrays
 * 
 * Este tipo extiende el modelo Product de Prisma pero con los campos
 * JSON convertidos de string a arrays para usar directamente en componentes
 */
export type ProductWithParsedJson = Omit<
  Product,
  'features' | 'techFeatures' | 'certifications' | 'images' | 'tags'
> & {
  // Campos JSON parseados como arrays
  features: string[]
  techFeatures: string[]
  certifications: string[]
  images: string[]
  tags: string[]
}

/**
 * ⚡ Producto con relaciones incluidas (Category)
 */
export type ProductWithCategory = ProductWithParsedJson & {
  category: Category | null
}

/**
 * ⚡ Producto completo para página de detalle
 * 
 * Incluye: category, reviews, variants
 */
export type ProductWithRelations = ProductWithParsedJson & {
  category: Category | null
  reviews: Review[]
  variants: ProductVariant[]
}

/**
 * ⚡ Producto con contador de productos en categoría
 */
export type CategoryWithCount = Category & {
  _count: {
    products: number
  }
}

/**
 * ⚡ Variante de producto para selector de tallas
 */
export type VariantOption = {
  id: string
  size: string
  price: number
  stock: number
  isAvailable: boolean
  sku: string
}

/**
 * ⚡ Review con valoraciones detalladas calculadas
 */
export type ReviewWithRatings = Review & {
  averageDetailRating?: number // Promedio de comfort, quality, value
}

/**
 * ⚡ Resumen de valoraciones de un producto
 */
export type ProductRatingSummary = {
  overall: number
  comfort: number
  quality: number
  value: number
  totalReviews: number
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

/**
 * ⚡ Opciones de filtrado para el catálogo
 */
export interface ProductFilterOptions {
  firmness?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  categoryId?: string
  tags?: string[]
  inStock?: boolean
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'featured' | 'newest'
}

/**
 * ⚡ Resultado de búsqueda con metadata
 */
export interface ProductSearchResult {
  products: ProductWithCategory[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

/**
 * ⚡ Item del carrito con información del producto
 */
export interface CartItem {
  id: string // ID de la variante o del producto
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  size?: string
  sku?: string
  maxStock?: number
}