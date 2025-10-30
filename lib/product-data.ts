import { 
    Layers, Zap, TrendingUp, Shield, Brain, Moon, Heart, 
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
    specifications: [
      { label: 'Altura', value: '32 cm', icon: Layers },
      { label: 'Muelles', value: '1.800', icon: Zap },
      { label: 'Firmeza', value: '70%', icon: TrendingUp },
      { label: 'Garantía', value: '10 años', icon: Shield }
    ],
    quickSpecs: [
      { icon: Layers, text: '32cm altura' },
      { icon: Zap, text: '1.800 muelles' },
      { icon: TrendingUp, text: 'Firmeza 70%' }
    ],
    trustIndicators: [
      { icon: CheckCircle2, text: 'Envío express gratis', color: 'text-emerald-400' },
      { icon: CheckCircle2, text: '100 noches sin riesgo', color: 'text-cyan-400' },
      { icon: CheckCircle2, text: 'Garantía 10 años', color: 'text-violet-400' }
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
        text: 'Increíble calidad. El test me ayudó a elegir el colchón perfecto. Noto la diferencia cada mañana.',
        verified: true
      },
      {
        rating: 5,
        name: 'Carlos R.',
        location: 'Barcelona',
        text: 'Envío rapidísimo y el colchón es espectacular. Los 1.800 muelles se notan muchísimo.',
        verified: true
      },
      {
        rating: 5,
        name: 'Laura M.',
        location: 'Valencia',
        text: 'Probé las 100 noches y no lo devolví. Mejor inversión que he hecho en años para mi descanso.',
        verified: true
      }
    ],
    stats: [
      { value: 12000, suffix: '+', label: 'Clientes satisfechos', decimal: false },
      { value: 4.8, decimal: true, suffix: '/5', label: 'Valoración media' },
      { value: 98, suffix: '%', label: 'Recomendarían', decimal: false },
      { value: 100, suffix: ' noches', label: 'Garantía de prueba', decimal: false }
    ]
  }
  
  export const COMPOSITION_LAYERS: CompositionLayer[] = [
    { num: 1, name: 'Tejido con viscosa', description: 'Material natural, suave y fresco' },
    { num: 2, name: 'Fibras naturales', description: 'Algodón y lino termorreguladores' },
    { num: 3, name: 'Fibra hipoalergénica', description: 'Protección contra ácaros' },
    { num: 4, name: 'Látex 65kg/m³', description: 'Elasticidad y adaptación' },
    { num: 5, name: 'Softbalance', description: 'Capa de confort equilibrado' },
    { num: 6, name: 'Soporte de fibras', description: 'Unión estructural' },
    { num: 7, name: 'Winesoja 50kg/m³', description: 'Firmeza adaptable sostenible' },
    { num: 8, name: 'Amortiguador', description: 'Distribución de presión' },
    { num: 9, name: 'Multisac® Micro', description: '1.800 muelles ensacados' },
    { num: 10, name: 'Amortiguador base', description: 'Soporte adicional' },
    { num: 11, name: 'Microsil HR 25kg/m³', description: 'Base de alta resiliencia' },
    { num: 12, name: 'Soporte de fibras', description: 'Unión estructural' },
    { num: 13, name: 'Fibra hipoalergénica', description: 'Protección inferior' },
    { num: 14, name: 'Tejido 3D', description: 'Transpirabilidad máxima' },
    { num: 15, name: 'Sistema Compact', description: 'Refuerzo lateral perimetral' }
  ]
  
  export const TECHNOLOGIES: Technology[] = [
    {
      icon: Zap,
      title: 'Multisac® Micro',
      description: '1.800 micromuelles ensacados individualmente que ofrecen máxima independencia de lechos y precisión ergonómica',
      specs: '1.800 muelles • Independencia total • Medida 150x190cm'
    },
    {
      icon: Moon,
      title: 'Viscosa Natural',
      description: 'Material de origen natural con propiedades absorbentes, extremadamente ligero y suave al tacto',
      specs: 'Sostenible • Termorregulador • Tacto sedoso'
    },
    {
      icon: Heart,
      title: 'Látex 65kg/m³',
      description: 'Material elástico y flexible con alta transpirabilidad gracias a su estructura de celda abierta',
      specs: 'Alta densidad • Hipoalergénico • Adaptación perfecta'
    },
    {
      icon: Layers,
      title: 'Winesoja 50kg/m³',
      description: 'Espuma sostenible de aceite de soja que proporciona firmeza adaptable y regula la temperatura',
      specs: 'Eco-friendly • Alta densidad • Termorregulador'
    }
  ]
  
  export const BENEFITS: Benefit[] = [
    {
      icon: Brain,
      title: 'Test Personalizado',
      description: 'Responde 4 preguntas y descubre qué colchón se adapta mejor a tu forma de dormir y necesidades específicas',
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      link: '/simulador',
      cta: 'Comenzar test'
    },
    {
      icon: Shield,
      title: 'Garantía 10 Años',
      description: 'Respaldamos la calidad de nuestros colchones con una garantía completa de 10 años en todos los modelos',
      gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
      link: '#garantia',
      cta: 'Ver detalles'
    },
    {
      icon: Moon,
      title: '100 Noches de Prueba',
      description: 'Pruébalo en tu casa durante 100 noches. Si no estás satisfecho, te lo recogemos sin coste',
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      link: '#prueba',
      cta: 'Más información'
    }
  ]
  
  export const TRUST_FOOTER: TrustItem[] = [
    { icon: Truck, title: 'Envío Express', description: 'Gratis 24-48h' },
    { icon: Shield, title: 'Garantía', description: '10 años completos' },
    { icon: Moon, title: 'Prueba', description: '100 noches' },
    { icon: Lock, title: 'Pago Seguro', description: 'Encriptado SSL' }
  ]
  
  export const CTA_FEATURES: CTAFeature[] = [
    { icon: CheckCircle2, text: '100% Gratuito' },
    { icon: Clock, text: 'Solo 2 minutos' },
    { icon: Star, text: 'Sin compromiso' }
  ]