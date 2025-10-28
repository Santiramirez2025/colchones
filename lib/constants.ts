// Información de contacto
export const CONTACT_INFO = {
  phone: '+34 900 123 456',
  email: 'info@descansopremium.es',
  address: {
    street: 'Paseo de la Castellana 123',
    city: 'Madrid',
    postalCode: '28046',
    country: 'España',
  },
  social: {
    instagram: 'https://instagram.com/descansopremium',
    facebook: 'https://facebook.com/descansopremium',
    linkedin: 'https://linkedin.com/company/descansopremium',
  },
}

// Configuración de envío
export const SHIPPING_CONFIG = {
  freeShippingThreshold: 500, // Envío gratis a partir de 500€
  standardShippingCost: 49,
  deliveryTime: '24-48h',
  countries: ['España', 'Portugal'],
}

// Garantías y políticas
export const GUARANTEES = {
  trialNights: 100,
  warrantyYears: 10,
  returnPeriod: 30, // días
}

// Tipos de colchón
export const MATTRESS_TYPES = [
  { value: 'memory-foam', label: 'Memory Foam', description: 'Se adapta a tu cuerpo' },
  { value: 'latex', label: 'Látex', description: 'Natural y transpirable' },
  { value: 'spring', label: 'Muelles', description: 'Soporte firme' },
  { value: 'hybrid', label: 'Híbrido', description: 'Combina tecnologías' },
]

// Niveles de firmeza
export const FIRMNESS_LEVELS = [
  { value: 1, label: 'Muy blando', description: 'Para durmientes ligeros' },
  { value: 2, label: 'Blando', description: 'Confort extra' },
  { value: 3, label: 'Medio', description: 'Balance perfecto' },
  { value: 4, label: 'Firme', description: 'Soporte robusto' },
  { value: 5, label: 'Muy firme', description: 'Máximo soporte' },
]

// Tamaños disponibles
export const MATTRESS_SIZES = [
  { value: '90x190', label: 'Individual', price: 0 },
  { value: '105x190', label: 'Individual XL', price: 50 },
  { value: '135x190', label: 'Matrimonio', price: 100 },
  { value: '150x190', label: 'Queen', price: 150 },
  { value: '160x200', label: 'King', price: 200 },
  { value: '180x200', label: 'Super King', price: 250 },
]

// Características de productos
export const PRODUCT_FEATURES = {
  hypoallergenic: {
    icon: '🌿',
    label: 'Hipoalergénico',
    description: 'Protección contra ácaros y alergias',
  },
  cooling: {
    icon: '❄️',
    label: 'Termorregulador',
    description: 'Mantiene temperatura ideal',
  },
  ergonomic: {
    icon: '💪',
    label: 'Ergonómico',
    description: 'Soporte para columna vertebral',
  },
  eco: {
    icon: '♻️',
    label: 'Ecológico',
    description: 'Materiales sostenibles',
  },
  certified: {
    icon: '✓',
    label: 'Certificado',
    description: 'Cumple normativas europeas',
  },
}

// Preguntas frecuentes
export const FAQ = [
  {
    question: '¿Cuánto tarda el envío?',
    answer: 'Entregamos en 24-48 horas laborables en toda España. El envío es gratuito para pedidos superiores a 500€.',
  },
  {
    question: '¿Puedo probar el colchón?',
    answer: 'Sí, ofrecemos 100 noches de prueba. Si no estás satisfecho, te devolvemos el dinero sin preguntas.',
  },
  {
    question: '¿Qué garantía tienen los colchones?',
    answer: 'Todos nuestros colchones tienen 10 años de garantía contra defectos de fabricación.',
  },
  {
    question: '¿Cómo elijo el colchón adecuado?',
    answer: 'Usa nuestro simulador inteligente que te guiará en 6 preguntas para encontrar tu colchón ideal.',
  },
  {
    question: '¿Ofrecen financiación?',
    answer: 'Sí, puedes financiar tu compra en hasta 12 meses sin intereses con Klarna o Aplazame.',
  },
]

// Métodos de pago
export const PAYMENT_METHODS = [
  { id: 'card', name: 'Tarjeta de crédito/débito', icon: '💳' },
  { id: 'apple-pay', name: 'Apple Pay', icon: '' },
  { id: 'google-pay', name: 'Google Pay', icon: 'G' },
  { id: 'paypal', name: 'PayPal', icon: 'P' },
  { id: 'klarna', name: 'Klarna - Paga en 3', icon: 'K' },
]

// Badges de confianza
export const TRUST_BADGES = [
  { name: 'Trustpilot', rating: 4.8, reviews: 1234 },
  { name: 'Google Reviews', rating: 4.9, reviews: 856 },
]
