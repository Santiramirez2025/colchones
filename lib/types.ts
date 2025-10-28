// Tipos para productos
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
