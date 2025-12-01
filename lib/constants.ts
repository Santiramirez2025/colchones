// lib/constants.ts - Configuración Azul Colchones Villa María

export const SITE_CONFIG = {
  name: 'Azul Colchones',
  displayName: 'Azul Colchones Villa María',
  domain: 'azulcolchones.com',
  url: 'https://azulcolchones.com',
  
  // Ubicación
  location: {
    city: 'Villa María',
    state: 'Córdoba',
    country: 'Argentina',
    countryCode: 'AR',
    address: '[Tu dirección]', // TODO: Completar con dirección real
    postalCode: '5900',
    coordinates: {
      lat: -32.4075,
      lng: -63.2406
    }
  },
  
  // Contacto
  phone: {
    number: '+5493531234567', // TODO: Reemplazar con número real
    display: '353 123-4567',
    whatsapp: '5493531234567'
  },
  email: 'info@azulcolchones.com',
  
  // Redes sociales
  social: {
    facebook: 'https://facebook.com/azulcolchones',
    instagram: 'https://instagram.com/azulcolchones',
    whatsapp: 'https://wa.me/5493531234567'
  },
  
  // Branding
  tagline: 'Tu colchonería de confianza en Villa María',
  slogan: '8+ años cuidando tu descanso',
  description: 'Colchonería en Villa María, Córdoba con 8+ años de experiencia. Colchones premium, sommiers y almohadas. Envío gratis en Villa María, 12 cuotas sin interés y garantía extendida.',
  
  // Valores de marca
  values: [
    'Calidad premium',
    'Experiencia local',
    'Asesoramiento personalizado',
    'Garantía extendida'
  ]
}

export const TRUST_BAR_ITEMS = [
  { 
    icon: 'Truck', 
    text: 'Envío Gratis',
    highlight: 'Villa María 24-48hs',
    description: 'Envío sin costo en Villa María'
  },
  { 
    icon: 'CreditCard', 
    text: '12 Cuotas',
    highlight: 'Sin Interés',
    description: 'Financiación con Mercado Pago'
  },
  { 
    icon: 'Shield', 
    text: 'Garantía Extendida',
    highlight: 'Asegurada',
    description: 'Calidad garantizada'
  },
  { 
    icon: 'MapPin', 
    text: 'Villa María',
    highlight: '8+ años',
    description: 'Experiencia en descanso'
  }
]

export const PAYMENT_METHODS = {
  mercadopago: {
    name: 'Mercado Pago',
    installments: [1, 3, 6, 12],
    maxInstallments: 12,
    icon: '/icons/mercadopago.svg'
  },
  transfer: {
    name: 'Transferencia Bancaria',
    discount: 10,
    description: '10% de descuento',
    banks: [
      {
        name: 'Banco Macro',
        cbu: '[CBU]', // TODO: Completar
        alias: '[ALIAS]' // TODO: Completar
      }
    ]
  },
  cash: {
    name: 'Efectivo en Local',
    discount: 15,
    description: '15% de descuento pagando en efectivo',
    location: 'Showroom Villa María'
  }
}

export const SHIPPING_ZONES = {
  villamaria: {
    name: 'Villa María',
    postcodes: ['5900'],
    cost: 0,
    deliveryTime: '24-48hs',
    description: 'Envío GRATIS'
  },
  cordobaCapital: {
    name: 'Córdoba Capital',
    postcodes: ['5000', '5001', '5002', '5003', '5004', '5005', '5006', '5007', '5008', '5009'],
    cost: 5000,
    deliveryTime: '2-3 días',
    description: 'Envío económico'
  },
  cordobaProvincia: {
    name: 'Resto de Córdoba',
    cost: 8000,
    deliveryTime: '3-5 días',
    description: 'Envío a toda la provincia'
  },
  nacional: {
    name: 'Resto del País',
    cost: 15000,
    deliveryTime: '5-10 días',
    description: 'Envío a toda Argentina'
  }
}

export const ANIMATION_CONFIG = {
  particles: {
    count: 6,
    minDuration: 10,
    maxDuration: 20
  },
  scroll: {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  },
  transitions: {
    ease: [0.4, 0, 0.2, 1],
    duration: 0.3
  }
}

export const SEO_DEFAULTS = {
  title: 'Azul Colchones Villa María | Colchonería en Córdoba',
  description: 'Colchonería en Villa María, Córdoba. ✓ Envío GRATIS Villa María 24-48hs ✓ 8+ años de experiencia ✓ 12 cuotas sin interés ✓ Garantía extendida. Tu colchonería de confianza.',
  keywords: [
    // Búsquedas locales principales
    'colchones villa maría',
    'colchonería villa maría',
    'colchones córdoba',
    'colchones villa maría córdoba',
    'azul colchones',
    'azul colchones villa maría',
    
    // Productos específicos
    'sommier villa maría',
    'colchón matrimonial villa maría',
    'colchón 2 plazas villa maría',
    'colchones ortopédicos villa maría',
    'colchones viscoelásticos córdoba',
    'memory foam villa maría',
    
    // Búsquedas comerciales
    'donde comprar colchones villa maría',
    'colchonería cerca de mi villa maría',
    'tienda de colchones villa maría',
    'colchones baratos villa maría',
    'colchones en cuotas villa maría',
    'financiación colchones córdoba',
    
    // Búsquedas de beneficios
    'envío gratis colchones villa maría',
    'colchones con garantía villa maría',
    '12 cuotas sin interés colchones'
  ],
  ogImage: '/og-image-home.jpg',
  twitterCard: 'summary_large_image'
}

export const BUSINESS_HOURS = {
  weekdays: {
    days: 'Lunes a Viernes',
    hours: '09:00 - 19:00'
  },
  saturday: {
    days: 'Sábados',
    hours: '09:00 - 13:00'
  },
  sunday: {
    days: 'Domingos',
    hours: 'Cerrado'
  }
}

export const LEGAL_INFO = {
  businessName: 'Azul Colchones', // TODO: Razón social completa
  cuit: '[CUIT]', // TODO: Completar
  responsableInscripto: true,
  defenseConsumer: {
    phone: '0800-666-1518',
    web: 'https://www.argentina.gob.ar/produccion/defensadelconsumidor'
  }
}

// Constantes de UI
export const CURRENCY = {
  code: 'ARS',
  symbol: '$',
  locale: 'es-AR',
  format: (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }
}

export const PRODUCT_CATEGORIES = [
  {
    slug: 'colchones',
    name: 'Colchones',
    description: 'Colchones de todas las medidas y tecnologías'
  },
  {
    slug: 'sommiers',
    name: 'Sommiers',
    description: 'Sommiers completos con base y colchón'
  },
  {
    slug: 'almohadas',
    name: 'Almohadas',
    description: 'Almohadas ergonómicas y de memory foam'
  },
  {
    slug: 'accesorios',
    name: 'Accesorios',
    description: 'Protectores, sábanas y más'
  }
]

export const WHATSAPP_MESSAGES = {
  general: '¡Hola! Me interesa conocer más sobre los colchones de Azul Colchones',
  product: (productName: string) => `¡Hola! Me interesa el producto: ${productName}`,
  quote: 'Hola, me gustaría recibir una cotización',
  showroom: '¡Hola! Quiero visitar el showroom en Villa María',
  delivery: 'Hola, quisiera consultar sobre tiempos y costos de envío'
}

// Configuración de campañas temporales
export const CAMPAIGNS = {
  hotSale: {
    name: 'Hot Sale',
    month: 5,
    startDay: 20,
    endDay: 31,
    discount: 40,
    code: 'HOTSALE40'
  },
  cyberMonday: {
    name: 'Cyber Monday',
    month: 11,
    startDay: 1,
    endDay: 10,
    discount: 45,
    code: 'CYBER45'
  }
}