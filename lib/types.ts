import { LucideIcon } from 'lucide-react'

// ============================================
// TYPES ORIGINALES DEL E-COMMERCE
// ============================================

// Tipos para productos del catálogo
export interface Product {
  id: number
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  rating: number
  reviews: number
  description: string
  shortDescription?: string
  category: string
  features: string[]
  specifications?: Record<string, string>
  inStock: boolean
  match?: number // Para resultados del simulador
  badge?: string // "Más vendido", "Nuevo", etc.
}

// Tipos para el carrito
export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  size: string
  image: string
}

// Tipos para el simulador
export interface SimulatorQuestion {
  id: string
  title: string
  subtitle: string
  type: 'choice' | 'scale' | 'multiselect'
  options?: SimulatorOption[]
  min?: number
  max?: number
  labels?: string[]
}

export interface SimulatorOption {
  value: string
  label: string
  icon?: string
  description?: string
}

export interface SimulatorAnswers {
  [key: string]: any
}

export interface SimulatorResult {
  products: Product[]
  insights: string[]
  matchScores: Record<number, number>
}

// Tipos para testimonios
export interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  text: string
  date: string
  verified: boolean
  productId?: number
}

// Tipos para artículos del blog
export interface BlogArticle {
  id: number
  slug: string
  title: string
  excerpt: string
  content?: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
  emoji?: string
  tags: string[]
}

// Tipos para formularios
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface CheckoutFormData {
  name: string
  lastName: string
  email: string
  phone: string
  address: string
  postalCode: string
  city: string
  province: string
  country: string
  paymentMethod: 'card' | 'paypal' | 'klarna'
}

// Tipos para API responses
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface StripeCheckoutResponse {
  sessionId: string
  url: string
}

// Tipos para filtros del catálogo
export interface CatalogFilters {
  type: string
  firmness: string
  price: string
  category?: string
  inStock?: boolean
}

// Tipos para comparador
export interface ComparisonFeature {
  name: string
  key: string
  type: 'boolean' | 'string' | 'number'
}

// Tipos para área profesional
export interface ProfessionalInquiry {
  name: string
  company: string
  email: string
  phone: string
  type: string
  message: string
  units?: number
}

// Tipos para reviews
export interface Review {
  id: number
  productId: number
  userId: number
  userName: string
  rating: number
  title: string
  comment: string
  date: string
  verified: boolean
  helpful: number
  images?: string[]
}

// Tipos para envío
export interface ShippingOption {
  id: string
  name: string
  price: number
  estimatedDays: string
}

// Tipos para cupones
export interface Coupon {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  minPurchase?: number
  expiresAt?: string
}

// Tipos para usuario (cuando se implemente auth)
export interface User {
  id: number
  email: string
  name: string
  phone?: string
  addresses?: Address[]
  orders?: Order[]
}

export interface Address {
  id: number
  name: string
  address: string
  postalCode: string
  city: string
  province: string
  country: string
  isDefault: boolean
}

export interface Order {
  id: string
  userId: number
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  trackingNumber?: string
  createdAt: string
  deliveredAt?: string
}

// ============================================
// TYPES ADICIONALES PARA LANDING PAGE
// ============================================

// Hero Product (versión simplificada para landing)
export interface HeroProductPrice {
  monthly: number
  months: number
  original: number
  current: number
  discount: number
}

export interface ProductSpecification {
  label: string
  value: string
  icon: LucideIcon
}

export interface ProductImages {
  hero: string
  composition: string
  blurDataURL: string
}

export interface ProductQuickSpec {
  icon: LucideIcon
  text: string
}

export interface TrustIndicator {
  icon: LucideIcon
  text: string
  color: string
}

export interface HeroProduct {
  name: string
  description: string
  price: HeroProductPrice
  specifications: ProductSpecification[]
  quickSpecs: ProductQuickSpec[]
  trustIndicators: TrustIndicator[]
  images: ProductImages
}

// Social Proof para Landing
export interface LandingRating {
  value: number
  count: number
  verified: boolean
}

export interface CustomerStats {
  total: number
  satisfied: number
}

export interface SocialBadge {
  icon: LucideIcon
  label: string
  sublabel: string
  gradient: string
  border: string
  iconColor: string
}

export interface LandingReview {
  rating: number
  name: string
  location: string
  text: string
  verified: boolean
}

export interface Stat {
  value: number
  suffix: string
  label: string
  decimal: boolean
}

export interface SocialProof {
  rating: LandingRating
  customers: CustomerStats
  badges: SocialBadge[]
  reviews: LandingReview[]
  stats: Stat[]
}

// Composition Types
export interface CompositionLayer {
  num: number
  name: string
  description: string
}

// Technology Types
export interface Technology {
  icon: LucideIcon
  title: string
  description: string
  specs: string
}

// Benefits Types
export interface Benefit {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
  link: string
  cta: string
}

// Trust Footer Types
export interface TrustItem {
  icon: LucideIcon
  title: string
  description: string
}

// CTA Types
export interface CTAFeature {
  icon: LucideIcon
  text: string
}

// Site Config Types
export interface SiteConfig {
  name: string
  domain: string
  url: string
  phone: {
    number: string
    display: string
  }
  tagline: string
  description: string
}

// Animation Config Types
export interface AnimationConfig {
  particles: {
    count: number
    minDuration: number
    maxDuration: number
  }
  scroll: {
    stiffness: number
    damping: number
    restDelta: number
  }
}

// SEO Types
export interface SEODefaults {
  title: string
  description: string
  keywords: string
  ogImage: string
  twitterCard: string
}