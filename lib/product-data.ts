import { 
  Layers, Zap, TrendingUp, Shield, Brain, Moon, 
  CheckCircle2, Truck, Lock, Clock, Users, Star,
  Heart, Award, Sparkles, Wind
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
// PRODUCTO PRINCIPAL - Hero Section
// ============================================================================
export const HERO_PRODUCT: HeroProduct = {
  name: 'Colchón Premium Multisac®',
  description: 'Tecnología de 1.800 micromuelles ensacados independientes con capas de látex natural y materiales certificados para un descanso perfecto',
  price: {
    monthly: 39,
    months: 12,
    original: 799,
    current: 449,
    discount: 44
  },
  quickSpecs: [
    { icon: TrendingUp, text: 'Firmeza Media-Alta (7/10)' },
    { icon: Layers, text: '32cm de altura premium' },
    { icon: Zap, text: '1.800 muelles Multisac®' }
  ],
  specifications: [
    { label: 'Altura', value: '32 cm', icon: Layers },
    { label: 'Muelles', value: '1.800', icon: Zap },
    { label: 'Firmeza', value: '7/10', icon: TrendingUp },
    { label: 'Garantía', value: '3 años', icon: Shield }
  ],
  trustIndicators: [
    { 
      icon: Truck, 
      text: 'Envío gratis en 3-6 días', 
      color: 'text-emerald-400' 
    },
    { 
      icon: CheckCircle2, 
      text: '100 noches de prueba sin riesgo', 
      color: 'text-cyan-400' 
    },
    { 
      icon: Shield, 
      text: 'Garantía completa de 3 años', 
      color: 'text-violet-400' 
    }
  ],
  images: {
    hero: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
    composition: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
  }
}

// ============================================================================
// SOCIAL PROOF - Prueba Social y Confianza
// ============================================================================
export const SOCIAL_PROOF: SocialProofType = {
  rating: {
    value: 4.8,
    count: 2847,
    verified: true
  },
  customers: {
    total: 15000,
    satisfied: 98
  },
  badges: [
    {
      icon: Star,
      label: '4.8/5',
      sublabel: '2.847 opiniones',
      gradient: 'from-amber-500/10 via-orange-500/10 to-amber-500/10',
      border: 'border-amber-500/20',
      iconColor: 'text-amber-400'
    },
    {
      icon: Users,
      label: '+15.000',
      sublabel: 'clientes felices',
      gradient: 'from-violet-500/10 via-fuchsia-500/10 to-violet-500/10',
      border: 'border-violet-500/20',
      iconColor: 'text-violet-400'
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
      name: 'María González',
      location: 'Madrid',
      text: 'Increíble calidad-precio. El test me ayudó a elegir el colchón perfecto. Llevo 3 meses y duermo como nunca.',
      verified: true
    },
    {
      rating: 5,
      name: 'Carlos Rodríguez',
      location: 'Barcelona',
      text: 'Los 1.800 muelles se notan de verdad. Mi espalda lo agradece cada mañana. Envío súper rápido.',
      verified: true
    },
    {
      rating: 5,
      name: 'Laura Martínez',
      location: 'Valencia',
      text: 'La mejor inversión en mi descanso. El sistema Multisac® es una maravilla. Totalmente recomendable.',
      verified: true
    },
    {
      rating: 5,
      name: 'Javier Sánchez',
      location: 'Sevilla',
      text: 'Calidad excepcional. El colchón mantiene la temperatura perfecta toda la noche. Muy satisfecho.',
      verified: true
    }
  ],
  stats: [
    { value: 15000, suffix: '+', label: 'Clientes satisfechos', decimal: false },
    { value: 4.8, decimal: true, suffix: '/5', label: 'Valoración media' },
    { value: 98, suffix: '%', label: 'Recomendarían', decimal: false }
  ]
}

// ============================================================================
// COMPOSICIÓN - Capas del Colchón
// ============================================================================
export const COMPOSITION_LAYERS: CompositionLayer[] = [
  { 
    num: 1, 
    name: 'Acolchado Premium', 
    description: 'Tejido transpirable y suave al tacto' 
  },
  { 
    num: 2, 
    name: 'Fibras Naturales', 
    description: 'Termorregulación inteligente' 
  },
  { 
    num: 3, 
    name: 'Látex Natural 65kg/m³', 
    description: 'Adaptación ergonómica perfecta' 
  },
  { 
    num: 4, 
    name: 'Espuma HR Eco-Friendly', 
    description: 'Durabilidad y sostenibilidad' 
  },
  { 
    num: 5, 
    name: 'Sistema Multisac® 1.800', 
    description: 'Independencia total de lechos' 
  },
  { 
    num: 6, 
    name: 'Base Reforzada', 
    description: 'Soporte estructural óptimo' 
  }
]

// ============================================================================
// TECNOLOGÍAS - Características Técnicas
// ============================================================================
export const TECHNOLOGIES: Technology[] = [
  {
    icon: Zap,
    title: 'Sistema Multisac® Micro',
    description: '1.800 micromuelles ensacados individualmente que trabajan de forma independiente. Cada muelle responde solo a la presión que recibe, garantizando una adaptación perfecta a cada zona del cuerpo.',
    specs: '1.800 muelles • Independencia total • Sin transferencia de movimiento'
  },
  {
    icon: Layers,
    title: 'Núcleo de Látex Natural',
    description: 'Capa de látex de alta densidad (65kg/m³) que combina soporte firme con adaptabilidad excepcional. Material natural, hipoalergénico y de larga durabilidad.',
    specs: 'Densidad 65kg/m³ • Hipoalergénico • Certificado Oeko-Tex'
  },
  {
    icon: Wind,
    title: 'Sistema de Ventilación',
    description: 'Canales de aire integrados y tejidos transpirables que mantienen la temperatura ideal durante toda la noche. Evacuación eficiente de humedad.',
    specs: 'Transpirable • Termorregulador • Antiácaros'
  },
  {
    icon: Shield,
    title: 'Materiales Certificados',
    description: 'Todos nuestros materiales cuentan con certificaciones europeas de calidad y sostenibilidad. Libres de sustancias nocivas.',
    specs: 'CertiPUR • Oeko-Tex Standard 100 • ISO 9001'
  }
]

// ============================================================================
// BENEFICIOS - Propuestas de Valor
// ============================================================================
export const BENEFITS: Benefit[] = [
  {
    icon: Brain,
    title: 'Test Inteligente Personalizado',
    description: 'Responde 4 preguntas simples y nuestra IA te recomendará el colchón perfecto según tu peso, postura al dormir y preferencias de firmeza. Sin compromiso.',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    link: '/simulador',
    cta: 'Comenzar test gratuito'
  },
  {
    icon: Shield,
    title: 'Garantía Total 3 Años',
    description: 'Cobertura completa de fabricación en todos nuestros colchones. Si algo falla, lo solucionamos o te devolvemos tu dinero. Así de simple.',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    link: '#garantia',
    cta: 'Ver condiciones'
  },
  {
    icon: Heart,
    title: '100 Noches de Prueba',
    description: 'Duerme tranquilo sabiendo que tienes 100 noches para estar seguro. Si no te convence, recogemos el colchón y te devolvemos todo tu dinero. Sin preguntas.',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    link: '#prueba',
    cta: 'Saber más'
  },
  {
    icon: Truck,
    title: 'Envío Express Gratuito',
    description: 'Recibe tu colchón en 3-6 días laborables sin coste adicional. Entrega en planta baja o llevamos el colchón hasta tu habitación por solo 15€.',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    link: '#envio',
    cta: 'Zonas de envío'
  },
  {
    icon: Sparkles,
    title: 'Fabricación Española Premium',
    description: 'Diseñados y fabricados en España con los más altos estándares de calidad. Control exhaustivo en cada fase del proceso de producción.',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    link: '#fabricacion',
    cta: 'Nuestro proceso'
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
// VENTAJAS COMPETITIVAS - USPs
// ============================================================================
export const COMPETITIVE_ADVANTAGES = [
  {
    title: 'Precio Directo de Fábrica',
    description: 'Sin intermediarios. Ahorra hasta un 60% vs tiendas tradicionales',
    icon: TrendingUp
  },
  {
    title: 'Tecnología Multisac®',
    description: 'Sistema exclusivo de muelles ensacados de última generación',
    icon: Zap
  },
  {
    title: 'Materiales Premium',
    description: 'Látex natural, fibras orgánicas y tejidos certificados',
    icon: Sparkles
  },
  {
    title: 'Atención Personalizada',
    description: 'Equipo especializado disponible para asesorarte en todo momento',
    icon: Users
  }
]

// ============================================================================
// FAQ RÁPIDO - Preguntas Frecuentes (Opcional)
// ============================================================================
export const QUICK_FAQ = [
  {
    question: '¿Cuánto tarda en llegar?',
    answer: 'Entre 3 y 6 días laborables. Envío express gratuito.'
  },
  {
    question: '¿Puedo probarlo antes de comprarlo?',
    answer: 'Tienes 100 noches de prueba. Si no te convence, te devolvemos el dinero.'
  },
  {
    question: '¿Qué garantía tiene?',
    answer: '3 años de garantía completa de fabricación en todos los modelos.'
  },
  {
    question: '¿Es el colchón adecuado para mí?',
    answer: 'Haz nuestro test de 2 minutos y te recomendaremos el colchón perfecto.'
  }
]