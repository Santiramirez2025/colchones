import { 
  Layers, Zap, TrendingUp, Shield, Brain, Moon, 
  CheckCircle2, Truck, Lock, Clock, Users, Star,
  Heart, Award, Sparkles, Wind, CreditCard, MapPin
} from 'lucide-react'
import type { 
  HeroProduct, 
  SocialProof as SocialProofType,
  CompositionLayer,
  Technology,
  Benefit,
  CTAFeature
} from './types'

// ============================================================================
// PRODUCTO PRINCIPAL - Hero Section (Piero Colchones)
// ============================================================================
export const HERO_PRODUCT: HeroProduct = {
  name: 'Colchón Piero Comodísimo',
  description: 'Tecnología de 1.200 resortes ensacados independientes con espuma de alta densidad y tejido de algodón para un descanso perfecto',
  price: {
    monthly: 45000,
    months: 12,
    original: 680000,
    current: 520000,
    discount: 24
  },
  quickSpecs: [
    { icon: TrendingUp, text: 'Firmeza Media-Alta (7/10)' },
    { icon: Layers, text: '30cm de altura premium' },
    { icon: Zap, text: '1.200 resortes ensacados' }
  ],
  specifications: [
    { label: 'Altura', value: '30 cm', icon: Layers },
    { label: 'Resortes', value: '1.200', icon: Zap },
    { label: 'Firmeza', value: '7/10', icon: TrendingUp },
    { label: 'Garantía', value: 'Extendida', icon: Shield }
  ],
  trustIndicators: [
    { 
      icon: Truck, 
      text: 'Envío GRATIS Villa María 24-48hs', 
      color: 'text-blue-400' 
    },
    { 
      icon: CreditCard, 
      text: '12 cuotas sin interés Mercado Pago', 
      color: 'text-cyan-400' 
    },
    { 
      icon: Shield, 
      text: 'Garantía extendida asegurada', 
      color: 'text-emerald-400' 
    }
  ],
  images: {
    hero: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
    composition: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
  }
}

// ============================================================================
// SOCIAL PROOF - Prueba Social y Confianza Argentina
// ============================================================================
export const SOCIAL_PROOF: SocialProofType = {
  rating: {
    value: 4.9,
    count: 850,
    verified: true
  },
  customers: {
    total: 5000,
    satisfied: 98
  },
  badges: [
    {
      icon: Star,
      label: '4.9/5',
      sublabel: '850 opiniones',
      gradient: 'from-amber-500/10 via-orange-500/10 to-amber-500/10',
      border: 'border-amber-500/20',
      iconColor: 'text-amber-400'
    },
    {
      icon: MapPin,
      label: '8+ años',
      sublabel: 'en Villa María',
      gradient: 'from-blue-500/10 via-cyan-500/10 to-blue-500/10',
      border: 'border-blue-500/20',
      iconColor: 'text-blue-400'
    },
    {
      icon: Award,
      label: '98%',
      sublabel: 'satisfacción',
      gradient: 'from-emerald-500/10 via-teal-500/10 to-cyan-500/10',
      border: 'border-emerald-500/20',
      iconColor: 'text-emerald-400'
    }
  ],
  reviews: [
    {
      rating: 5,
      name: 'María Fernández',
      location: 'Villa María, Córdoba',
      text: 'Excelente atención y calidad. El colchón Piero es súper cómodo y me lo trajeron en el día. Muy recomendable.',
      verified: true
    },
    {
      rating: 5,
      name: 'Carlos Rodríguez',
      location: 'Córdoba Capital',
      text: 'Los 1.200 resortes se notan. Mi espalda mejoró muchísimo. Lo pagué en 12 cuotas sin interés, impecable.',
      verified: true
    },
    {
      rating: 5,
      name: 'Laura Martínez',
      location: 'Villa Nueva, Córdoba',
      text: 'La mejor inversión. El colchón Piero Comodísimo es de excelente calidad. 8 años de experiencia se notan.',
      verified: true
    },
    {
      rating: 5,
      name: 'Javier Sánchez',
      location: 'Río Cuarto, Córdoba',
      text: 'Calidad excepcional por el precio. Me asesoraron re bien por WhatsApp. Llegó rápido y en perfecto estado.',
      verified: true
    }
  ],
  stats: [
    { value: 5000, suffix: '+', label: 'Clientes satisfechos', decimal: false },
    { value: 4.9, decimal: true, suffix: '/5', label: 'Valoración media' },
    { value: 98, suffix: '%', label: 'Recomendarían', decimal: false }
  ]
}

// ============================================================================
// COMPOSICIÓN - Capas del Colchón Piero
// ============================================================================
export const COMPOSITION_LAYERS: CompositionLayer[] = [
  { 
    num: 1, 
    name: 'Acolchado de Algodón', 
    description: 'Tejido suave y natural al tacto' 
  },
  { 
    num: 2, 
    name: 'Espuma Soft Confort', 
    description: 'Primera capa de adaptación' 
  },
  { 
    num: 3, 
    name: 'Espuma Alta Densidad 28kg/m³', 
    description: 'Soporte ergonómico superior' 
  },
  { 
    num: 4, 
    name: 'Sistema de Resortes Ensacados', 
    description: '1.200 resortes independientes' 
  },
  { 
    num: 5, 
    name: 'Capa de Aislación', 
    description: 'Protección y durabilidad' 
  },
  { 
    num: 6, 
    name: 'Base Reforzada Multi-Densidad', 
    description: 'Soporte estructural óptimo' 
  }
]

// ============================================================================
// TECNOLOGÍAS - Características Técnicas Piero
// ============================================================================
export const TECHNOLOGIES: Technology[] = [
  {
    icon: Zap,
    title: 'Sistema de Resortes Ensacados',
    description: '1.200 resortes ensacados individualmente que trabajan de forma independiente. Cada resorte responde solo a la presión que recibe, garantizando independencia de lechos perfecta.',
    specs: '1.200 resortes • Independencia total • Sin transferencia de movimiento'
  },
  {
    icon: Layers,
    title: 'Espuma Alta Densidad Premium',
    description: 'Capa de espuma de alta densidad (28kg/m³) que combina soporte firme con adaptabilidad excepcional. Material duradero de larga vida útil.',
    specs: 'Densidad 28kg/m³ • Hipoalergénico • Alta durabilidad'
  },
  {
    icon: Wind,
    title: 'Sistema de Ventilación Natural',
    description: 'Tejidos transpirables y estructura ventilada que mantienen la temperatura ideal durante toda la noche. Evacuación eficiente de humedad.',
    specs: 'Transpirable • Termorregulador • Antiácaros'
  },
  {
    icon: Shield,
    title: 'Materiales Certificados',
    description: 'Marca Piero reconocida en Argentina con más de 70 años de trayectoria. Calidad y confianza garantizada en cada producto.',
    specs: 'Marca líder • Calidad asegurada • Garantía extendida'
  }
]

// ============================================================================
// BENEFICIOS - Propuestas de Valor Argentina
// ============================================================================
export const BENEFITS: Benefit[] = [
  {
    icon: Brain,
    title: 'Test Personalizado Gratuito',
    description: 'Respondé 4 preguntas simples y te recomendamos el colchón perfecto según tu peso, postura al dormir y preferencias. Sin compromiso.',
    gradient: 'from-blue-500 via-cyan-500 to-blue-600',
    link: '/simulador',
    cta: 'Comenzar test gratis'
  },
  {
    icon: Shield,
    title: 'Garantía Extendida',
    description: 'Cobertura completa de fabricación en todos nuestros colchones Piero. Calidad respaldada por más de 70 años de trayectoria de la marca.',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    link: '#garantia',
    cta: 'Ver condiciones'
  },
  {
    icon: MapPin,
    title: '8+ Años en Villa María',
    description: 'Conocemos Villa María y sus necesidades. Showroom físico donde podés ver y probar nuestros colchones. Asesoramiento personalizado.',
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    link: '#showroom',
    cta: 'Visitanos'
  },
  {
    icon: Truck,
    title: 'Envío GRATIS Villa María',
    description: 'Recibí tu colchón Piero en 24-48hs sin costo adicional en Villa María. Envíos a toda Córdoba y Argentina con costos preferenciales.',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    link: '#envio',
    cta: 'Zonas de envío'
  },
  {
    icon: CreditCard,
    title: '12 Cuotas Sin Interés',
    description: 'Financiación con Mercado Pago hasta 12 cuotas sin interés. También aceptamos transferencia (10% off) y efectivo (15% off).',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    link: '#financiacion',
    cta: 'Ver opciones'
  }
]

// ============================================================================
// CTA FEATURES - Características del Call-to-Action
// ============================================================================
export const CTA_FEATURES: CTAFeature[] = [
  { icon: CheckCircle2, text: '100% Gratuito y sin compromiso' },
  { icon: Clock, text: 'Solo 2 minutos para completar' },
  { icon: Star, text: 'Recomendación personalizada con IA' },
  { icon: Lock, text: 'Tus datos protegidos y seguros' }
]

// ============================================================================
// VENTAJAS COMPETITIVAS - USPs Argentina
// ============================================================================
export const COMPETITIVE_ADVANTAGES = [
  {
    title: 'Marca Piero Reconocida',
    description: 'Más de 70 años de trayectoria y confianza en Argentina',
    icon: Award
  },
  {
    title: 'Experiencia Local',
    description: '8+ años en Villa María conociendo las necesidades de la región',
    icon: MapPin
  },
  {
    title: 'Financiación Accesible',
    description: '12 cuotas sin interés o hasta 15% off en efectivo',
    icon: CreditCard
  },
  {
    title: 'Atención Personalizada',
    description: 'Equipo local disponible por WhatsApp, teléfono y showroom',
    icon: Users
  }
]

// ============================================================================
// FAQ RÁPIDO - Preguntas Frecuentes Argentina
// ============================================================================
export const QUICK_FAQ = [
  {
    question: '¿Cuánto tarda en llegar a Villa María?',
    answer: 'Entre 24-48 horas. Envío GRATIS en Villa María.'
  },
  {
    question: '¿Puedo verlo antes de comprarlo?',
    answer: 'Sí, tenemos showroom en Villa María donde podés probar todos nuestros modelos.'
  },
  {
    question: '¿Qué garantía tiene?',
    answer: 'Garantía extendida de fabricación. Respaldados por más de 70 años de Piero en Argentina.'
  },
  {
    question: '¿Puedo pagar en cuotas?',
    answer: 'Sí, hasta 12 cuotas sin interés con Mercado Pago. También 10% off en transferencia.'
  },
  {
    question: '¿El colchón es adecuado para mí?',
    answer: 'Hacé nuestro test de 2 minutos y te recomendamos el colchón perfecto para vos.'
  },
  {
    question: '¿Tienen derecho de arrepentimiento?',
    answer: 'Sí, según Ley 24.240 tenés 10 días corridos para arrepentirte de la compra.'
  }
]

// ============================================================================
// MODELOS PIERO DISPONIBLES (Opcional)
// ============================================================================
export const PIERO_MODELS = [
  {
    name: 'Piero Comodísimo',
    description: 'Colchón de resortes ensacados con espuma alta densidad',
    firmness: 7,
    height: 30,
    springs: 1200,
    priceFrom: 480000,
    popular: true
  },
  {
    name: 'Piero Grand Premium',
    description: 'Máximo confort con pillow top y doble acolchado',
    firmness: 6,
    height: 35,
    springs: 1200,
    priceFrom: 650000,
    premium: true
  },
  {
    name: 'Piero Pocket',
    description: 'Resortes pocket individuales para máxima independencia',
    firmness: 8,
    height: 28,
    springs: 1000,
    priceFrom: 420000,
    bestseller: true
  },
  {
    name: 'Piero Soft',
    description: 'Firmeza media ideal para quienes duermen de costado',
    firmness: 5,
    height: 26,
    springs: 800,
    priceFrom: 350000,
    economic: true
  }
]

// ============================================================================
// MEDIDAS DISPONIBLES (Standard Argentina)
// ============================================================================
export const AVAILABLE_SIZES = [
  { name: '1 Plaza', dimensions: '80x190 cm', code: '80x190' },
  { name: '1 Plaza y Media', dimensions: '100x190 cm', code: '100x190' },
  { name: '2 Plazas', dimensions: '130x190 cm', code: '130x190', popular: true },
  { name: 'Queen', dimensions: '160x190 cm', code: '160x190', popular: true },
  { name: 'King', dimensions: '180x200 cm', code: '180x200' },
  { name: 'Super King', dimensions: '200x200 cm', code: '200x200' }
]

// ============================================================================
// MÉTODOS DE PAGO DESTACADOS
// ============================================================================
export const PAYMENT_HIGHLIGHTS = [
  {
    icon: CreditCard,
    title: 'Mercado Pago',
    description: '12 cuotas sin interés',
    badge: 'Más elegido',
    color: 'text-blue-400'
  },
  {
    icon: TrendingUp,
    title: 'Transferencia',
    description: '10% descuento',
    badge: 'Más ahorro',
    color: 'text-emerald-400'
  },
  {
    icon: Star,
    title: 'Efectivo',
    description: '15% descuento',
    badge: 'Mejor precio',
    color: 'text-amber-400'
  }
]