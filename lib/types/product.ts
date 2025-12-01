// lib/types/product.ts
import { Product, Review, ProductVariant } from '@prisma/client'

// ============================================================================
// PRODUCT TYPES CON JSON PARSEADO
// ============================================================================

export type ProductWithParsedJson = Omit<Product, 'features' | 'techFeatures' | 'certifications' | 'images' | 'tags' | 'highlights' | 'materials' | 'layers' | 'foamLayers'> & {
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
  foamLayers: Array<{
    type: string
    density: string
    thickness: number
  }>
}

// Tipo simple para categoría (ya que el campo category en Product es solo string)
export type ProductCategory = {
  name: string
  slug: string
}

export type ProductWithCategory = ProductWithParsedJson & {
  category: string | null
}

export type ProductWithRelations = ProductWithParsedJson & {
  category: string | null
  reviews: Review[]
  variants: ProductVariant[]
}

// ============================================================================
// CATEGORY TYPES (si category es solo string en tu schema)
// ============================================================================

export type CategoryWithCount = {
  name: string
  slug: string
  _count: {
    products: number
  }
}

export type CategoryWithProducts = {
  name: string
  slug: string
  products: ProductWithParsedJson[]
}

// ============================================================================
// VARIANT TYPES
// ============================================================================

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
  isDefault: boolean
  sku: string
  weight: number | null
  order: number
}

export interface SelectedVariant extends VariantOption {
  quantity: number
  discount?: number
}

// ============================================================================
// REVIEW TYPES
// ============================================================================

export type ReviewWithRatings = Review & {
  averageDetailRating?: number
  isHelpfulToUser?: boolean
}

export type ProductRatingSummary = {
  average: number
  count: number
  comfort: number
  quality: number
  value: number
  delivery: number
  firmness: number
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export interface ReviewsWithPagination {
  reviews: Review[]
  total: number
  hasMore: boolean
}

// ============================================================================
// FILTER & SEARCH TYPES
// ============================================================================

export interface ProductFilterOptions {
  firmness?: string
  springType?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  category?: string
  tags?: string[]
  inStock?: boolean
  isEco?: boolean
  cooling?: boolean
  hypoallergenic?: boolean
  antiMite?: boolean
  airFlow?: boolean
  pillowTop?: boolean
  includesBase?: boolean
  reversible?: boolean
  motionIsolation?: boolean
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular'
  page?: number
  pageSize?: number
}

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
    springTypes?: string[]
  }
}

// ============================================================================
// CART TYPES
// ============================================================================

export interface CartItem {
  id: string
  productId: string
  variantId?: string
  name: string
  subtitle?: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  size?: string
  dimensions?: string
  sku?: string
  maxStock: number
  freeShipping?: boolean
  deliveryDays?: number
}

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

export interface StockInfo {
  available: boolean
  quantity: number
  lowStock: boolean
  availableVariantsCount: number
  totalVariantsCount: number
  message?: string
}

// ============================================================================
// BREADCRUMB
// ============================================================================

export interface Breadcrumb {
  name: string
  href: string
  current?: boolean
}

// ============================================================================
// COMPARISON
// ============================================================================

export interface ProductComparison {
  id: string
  name: string
  image: string
  price: number
  originalPrice: number | null
  rating: number
  firmness: string
  firmnessValue: number
  transpirability: number
  adaptability: number
  height: number
  warranty: number
  trialNights: number
  springType?: string
  springCount?: number
  fabricType?: string
  foamDensity?: string
  cooling: boolean
  hypoallergenic: boolean
  antiMite: boolean
  airFlow: boolean
  pillowTop: boolean
  includesBase: boolean
  washable: boolean
  reversible: boolean
  silent: boolean
  motionIsolation: boolean
  edgeSupport: boolean
  isEco: boolean
  materials: string[]
  reviewCount: number
  satisfaction: number
}

// ============================================================================
// WISHLIST
// ============================================================================

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
  isPremium?: boolean
  inStock: boolean
  freeShipping: boolean
  deliveryDays: number
  category?: string | null
}

// ============================================================================
// FORM DATA
// ============================================================================

export interface ProductFormData {
  name: string
  slug: string
  subtitle: string
  description: string
  story?: string
  price: number
  originalPrice?: number
  firmnessValue: number
  firmness: string
  transpirability: number
  adaptability: number
  height: number
  baseHeight?: number
  totalHeight?: number
  springType?: string
  springCount?: number
  foamDensity?: string
  fabricType?: string
  image: string
  images: string[]
  videoUrl?: string
  gradient: string
  features: string[]
  techFeatures: string[]
  highlights: string[]
  materials: string[]
  layers: Array<{ name: string; description: string }>
  foamLayers?: Array<{ type: string; density: string; thickness: number }>
  antiMite?: boolean
  airFlow?: boolean
  pillowTop?: boolean
  includesBase?: boolean
  isActive: boolean
  isFeatured: boolean
  isBestSeller: boolean
  isNew: boolean
  isEco: boolean
  isPremium?: boolean
  category?: string
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
}

export interface VariantFormData {
  size: string
  width: number
  length: number
  dimensions?: string
  price: number
  originalPrice?: number
  stock: number
  sku: string
  weight?: number
  isDefault?: boolean
  order?: number
}

// ============================================================================
// API RESPONSES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

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

export type ArrayElement<T> = T extends (infer U)[] ? U : never

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>