// lib/types/product.ts - VERSIÓN OPTIMIZADA

import { Product, Category, Review, ProductVariant } from '@prisma/client'

// ============================================================================
// PRODUCT TYPES CON JSON PARSEADO
// ============================================================================

/**
 * ⚡ Producto con campos JSON parseados como arrays/objetos
 * 
 * Este tipo extiende el modelo Product de Prisma pero con los campos
 * JSON convertidos de string a arrays/objetos para usar directamente en componentes
 */
export type ProductWithParsedJson = Omit<
  Product,
  'features' | 'techFeatures' | 'certifications' | 'images' | 'tags' | 'highlights' | 'materials' | 'layers'
> & {
  // ✅ Campos JSON parseados
  features: string[]
  techFeatures: string[]
  certifications: string[]
  images: string[]
  tags: string[]
  highlights: string[]
  materials: string[]
  layers: Array<{
    name: string
    description: string
    thickness?: string
    material?: string
  }>
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

// ============================================================================
// CATEGORY TYPES
// ============================================================================

/**
 * ⚡ Categoría con contador de productos
 */
export type CategoryWithCount = Category & {
  _count: {
    products: number
  }
}

/**
 * ⚡ Categoría con productos incluidos
 */
export type CategoryWithProducts = Category & {
  products: ProductWithParsedJson[]
}

// ============================================================================
// VARIANT TYPES
// ============================================================================

/**
 * ⚡ Variante de producto para selector de tallas
 */
export type VariantOption = {
  id: string
  size: string
  dimensions: string | null
  width: number
  length: number
  price: number
  originalPrice: number | null
  stock: number
  isAvailable: boolean
  isPopular: boolean
  sku: string
  weight: number | null
}

/**
 * ⚡ Variante seleccionada en el frontend
 */
export interface SelectedVariant extends VariantOption {
  quantity: number
  discount?: number
}

// ============================================================================
// REVIEW TYPES
// ============================================================================

/**
 * ⚡ Review con valoraciones detalladas calculadas
 */
export type ReviewWithRatings = Review & {
  averageDetailRating?: number // Promedio de comfort, quality, value
  isHelpfulToUser?: boolean // Si el usuario actual lo marcó como útil
}

/**
 * ⚡ Resumen de valoraciones de un producto
 */
export type ProductRatingSummary = {
  average: number       // Promedio general
  count: number         // Total de reviews
  comfort: number       // Promedio comfort
  quality: number       // Promedio calidad
  value: number         // Promedio relación calidad-precio
  delivery: number      // Promedio entrega
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

/**
 * ⚡ Review con paginación
 */
export interface ReviewsWithPagination {
  reviews: Review[]
  total: number
  hasMore: boolean
}

// ============================================================================
// FILTER & SEARCH TYPES
// ============================================================================

/**
 * ⚡ Opciones de filtrado para el catálogo
 */
export interface ProductFilterOptions {
  // Filtros de producto
  firmness?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  categoryId?: string
  tags?: string[]
  
  // Filtros de disponibilidad
  inStock?: boolean
  
  // Filtros de características
  isEco?: boolean
  cooling?: boolean
  hypoallergenic?: boolean
  reversible?: boolean
  motionIsolation?: boolean
  
  // Ordenamiento
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular'
  
  // Paginación
  page?: number
  pageSize?: number
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
  filters?: {
    categories: CategoryWithCount[]
    priceRange: { min: number; max: number }
    firmnesses: string[]
  }
}

// ============================================================================
// CART TYPES
// ============================================================================

/**
 * ⚡ Item del carrito con información del producto
 */
export interface CartItem {
  id: string              // ID único del item en el carrito
  productId: string       // ID del producto
  variantId?: string      // ID de la variante (talla)
  name: string
  subtitle?: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  
  // Información de la variante
  size?: string
  dimensions?: string
  sku?: string
  
  // Límites
  maxStock: number
  
  // Características
  freeShipping?: boolean
  deliveryDays?: number
}

/**
 * ⚡ Resumen del carrito
 */
export interface CartSummary {
  items: CartItem[]
  subtotal: number
  shipping: number
  discount: number
  tax: number
  total: number
  itemsCount: number
  couponCode?: string
}

// ============================================================================
// STOCK INFO
// ============================================================================

/**
 * ⚡ Información de stock de un producto
 */
export interface StockInfo {
  available: boolean
  quantity: number
  lowStock: boolean
  availableVariantsCount: number
  totalVariantsCount: number
  message?: string // "Solo quedan 3 unidades" | "En stock" | "Agotado"
}

// ============================================================================
// BREADCRUMB
// ============================================================================

/**
 * ⚡ Breadcrumb para navegación
 */
export interface Breadcrumb {
  name: string
  href: string
  current?: boolean
}

// ============================================================================
// COMPARISON
// ============================================================================

/**
 * ⚡ Producto para comparador
 */
export interface ProductComparison {
  id: string
  name: string
  image: string
  price: number
  originalPrice: number | null
  rating: number
  
  // Características comparables
  firmness: string
  firmnessValue: number
  transpirability: number
  adaptability: number
  height: number
  warranty: number
  trialNights: number
  
  // Features booleanas
  cooling: boolean
  hypoallergenic: boolean
  washable: boolean
  reversible: boolean
  silent: boolean
  motionIsolation: boolean
  edgeSupport: boolean
  isEco: boolean
  
  // Materiales
  materials: string[]
  
  // Social proof
  reviewCount: number
  satisfaction: number
}

// ============================================================================
// WISHLIST
// ============================================================================

/**
 * ⚡ Item de wishlist
 */
export interface WishlistItem {
  id: string
  productId: string
  product: ProductWithCategory
  addedAt: Date
  notifyOnDiscount?: boolean
  notifyOnStock?: boolean
}

// ============================================================================
// PRODUCT CARD
// ============================================================================

/**
 * ⚡ Props mínimas para ProductCard
 */
export interface ProductCardProps {
  id: string
  name: string
  slug: string
  subtitle: string
  image: string
  images: string[]
  price: number
  originalPrice: number | null
  discount: number
  rating: number
  reviewCount: number
  badge?: string | null
  gradient: string
  isBestSeller: boolean
  isNew: boolean
  isEco: boolean
  inStock: boolean
  freeShipping: boolean
  deliveryDays: number
  category?: {
    name: string
    slug: string
  } | null
}

// ============================================================================
// FORM DATA
// ============================================================================

/**
 * ⚡ Datos para crear/actualizar producto
 */
export interface ProductFormData {
  // Basic Info
  name: string
  slug: string
  subtitle: string
  description: string
  story?: string
  
  // Pricing
  price: number
  originalPrice?: number
  
  // Características
  firmnessValue: number
  firmness: string
  transpirability: number
  adaptability: number
  height: number
  
  // Media
  image: string
  images: string[]
  videoUrl?: string
  gradient: string
  
  // Features
  features: string[]
  techFeatures: string[]
  highlights: string[]
  materials: string[]
  layers: Array<{ name: string; description: string }>
  
  // Status
  isActive: boolean
  isFeatured: boolean
  isBestSeller: boolean
  isNew: boolean
  isEco: boolean
  
  // Category
  categoryId?: string
  
  // SEO
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
}

/**
 * ⚡ Datos para crear variante
 */
export interface VariantFormData {
  size: string
  width: number
  length: number
  price: number
  originalPrice?: number
  stock: number
  sku: string
  weight?: number
  isPopular?: boolean
}

// ============================================================================
// API RESPONSES
// ============================================================================

/**
 * ⚡ Respuesta estándar de API
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

/**
 * ⚡ Respuesta paginada
 */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasMore: boolean
}

// ============================================================================
// HELPERS DE TIPO
// ============================================================================

/**
 * ⚡ Extraer tipo de array
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : never

/**
 * ⚡ Hacer campos opcionales
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * ⚡ Hacer campos requeridos
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>