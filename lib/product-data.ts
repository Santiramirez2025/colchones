import { 
  Layers, Zap, TrendingUp, Shield, Brain, Moon, 
  CheckCircle2, Truck, Lock, Clock, Users, Star 
} from 'lucide-react'
import type { 
  HeroProduct, 
  SocialProof as SocialProofType,
  CompositionLayer,
  Technology,
  Benefit,
  TrustItem,
  CTAFeature
} from './types'

export const HERO_PRODUCT: HeroProduct = {
  name: 'Colchón Premium Multisac®',
  description: 'Colchones premium con 1.800 muelles ensacados Multisac® y materiales certificados',
  price: {
    monthly: 39,
    months: 12,
    original: 799,
    current: 449,
    discount: 44
  },
  quickSpecs: [
    { icon: TrendingUp, text: 'Firmeza Media-Alta' },
    { icon: Layers, text: 'Altura 32 cm' },
    { icon: Zap, text: 'Multisac® 1.800 muelles' }
  ],
  specifications: [
    { label: 'Altura', value: '32 cm', icon: Layers },
    { label: 'Muelles', value: '1.800', icon: Zap },
    { label: 'Firmeza', value: '70%', icon: TrendingUp },
    { label: 'Garantía', value: '10 años', icon: Shield }
  ],
  trustIndicators: [
    { icon: CheckCircle2, text: 'Envío gratis 24-48h', color: 'text-emerald-400' },
    { icon: CheckCircle2, text: 'Garantía de Satisfacción Total', color: 'text-cyan-400' },
    { icon: CheckCircle2, text: 'Garantía 3 años', color: 'text-violet-400' }
  ],
  images: {
    hero: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
    composition: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
  }
}

export const SOCIAL_PROOF: SocialProofType = {
  rating: {
    value: 4.8,
    count: 2438,
    verified: true
  },
  customers: {
    total: 12000,
    satisfied: 98
  },
  badges: [
    {
      icon: Star,
      label: '4.8/5',
      sublabel: '2.438 opiniones',
      gradient: 'from-amber-500/10 via-orange-500/10 to-amber-500/10',
      border: 'border-amber-500/20',
      iconColor: 'text-amber-400'
    },
    {
      icon: Users,
      label: '+12.000 clientes',
      sublabel: 'satisfechos',
      gradient: 'from-violet-500/10 via-fuchsia-500/10 to-violet-500/10',
      border: 'border-violet-500/20',
      iconColor: 'text-violet-400'
    }
  ],
  reviews: [
    {
      rating: 5,
      name: 'María G.',
      location: 'Madrid',
      text: 'El mejor colchón. Test muy útil.',
      verified: true
    },
    {
      rating: 5,
      name: 'Carlos R.',
      location: 'Barcelona',
      text: 'Envío rápido. Los 1.800 muelles se notan.',
      verified: true
    },
    {
      rating: 5,
      name: 'Laura M.',
      location: 'Valencia',
      text: 'Mejor compra del año.',
      verified: true
    }
  ],
  stats: [
    { value: 12000, suffix: '+', label: 'Clientes satisfechos', decimal: false },
    { value: 4.8, decimal: true, suffix: '/5', label: 'Valoración media' },
    { value: 98, suffix: '%', label: 'Recomendarían', decimal: false }
  ]
}

export const COMPOSITION_LAYERS: CompositionLayer[] = [
  { num: 1, name: 'Muelles Ensacados', description: 'Innovadoras Tecnologías' },
  { num: 2, name: 'Fibras naturales', description: 'Termorregulador' },
  { num: 3, name: 'Látex 65kg/m³', description: 'Adaptación perfecta' },
  { num: 4, name: 'Tecnología HR', description: 'Eco-friendly' },
  { num: 5, name: 'Multisac® 1.800', description: 'Independencia total' }
]

export const TECHNOLOGIES: Technology[] = [
  {
    icon: Zap,
    title: 'Multisac® Micro',
    description: '1.800 micromuelles ensacados con independencia total de lechos',
    specs: '1.800 muelles • Medida 150x190cm'
  },
  {
    icon: Moon,
    title: 'Capas Premium',
    description: 'Viscosa natural, látex 65kg/m³ y winesoja sostenible',
    specs: 'Termorregulador • Hipoalergénico • Eco-friendly'
  }
]

export const BENEFITS: Benefit[] = [
  {
    icon: Brain,
    title: 'Test Personalizado',
    description: '4 preguntas para encontrar tu colchón ideal con IA',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    link: '/simulador',
    cta: 'Comenzar test'
  },
  {
    icon: Shield,
    title: 'Garantía 3 Años',
    description: 'Cobertura completa en todos los modelos',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    link: '#garantia',
    cta: 'Ver detalles'
  },
  {
    icon: Moon,
    title: 'Compromiso de Confort',
    description: 'Te acompañamos hasta que encuentres el colchón perfecto para tu descanso',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    link: '#confort',
    cta: 'Descubrir más'
  }
]

export const TRUST_FOOTER: TrustItem[] = [
  { icon: Truck, title: 'Envío Express', description: 'Gratis 24-48h' },
  { icon: Shield, title: 'Garantía', description: '3 años' },
  { icon: Lock, title: 'Pago Seguro', description: 'SSL' }
]

export const CTA_FEATURES: CTAFeature[] = [
  { icon: CheckCircle2, text: '100% Gratuito' },
  { icon: Clock, text: 'Solo 2 minutos' },
  { icon: Star, text: 'Sin compromiso' }
]