// app/catalogo/components/types.ts

// Tipos principales para el Catálogo
export type NormalizedProduct = {
    id: string
    name: string
    subtitle: string
    slug: string
    price: number
    originalPrice?: number | null
    discount?: number | null
    rating: number
    reviewCount: number
    firmness: string
    badge?: string | null
    story: string
    isNew?: boolean | null
    isBestSeller?: boolean | null
    images: string
    features: string
    techFeatures: string // JSON/string multilinea
    certifications: string // JSON/string multilinea
    tags?: string
    highlights?: string
    benefits?: string
    specifications?: string
  }
  
  // Interfaz para las props del componente principal
  export interface CatalogoClientProps {
    initialProducts: NormalizedProduct[]
  }
  
  // Props para ProductCard
  export interface ProductCardProps {
    product: NormalizedProduct
    index: number
    isFavorite: boolean
    onToggleFavorite: () => void
    avgPrice: number
  }