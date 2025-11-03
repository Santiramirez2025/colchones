export const SITE_CONFIG = {
  name: 'TiendaColchon',
  domain: 'tiendacolchon.es',
  url: 'https://tiendacolchon.es',
  phone: {
    number: '+34900123456',
    display: '900 123 456'
  },
  tagline: 'Innovación en el sueño',
  description: 'Colchones premium con tecnología Multisac® de 1.800 muelles ensacados. Certificados de calidad europea, envío gratis y 3 años de garantía.'
}

export const TRUST_BAR_ITEMS = [
  { icon: 'Truck', text: 'Envío gratis 3 a 6 dias' },
  { icon: 'Shield', text: 'Garantía 3 años' },
  { icon: 'Moon', text: 'Certificados de calidad europea' }
]

export const ANIMATION_CONFIG = {
  particles: {
    count: 6, // Reducido de 12
    minDuration: 10,
    maxDuration: 20
  },
  scroll: {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  }
}

export const SEO_DEFAULTS = {
  title: 'Colchones Premium con 1.800 Muelles | TiendaColchon',
  description: 'Descubre colchones premium con tecnología Multisac® de 1.800 muelles ensacados. Certificados de calidad europea, envío gratis y 3 años de garantía.',
  keywords: 'colchones, colchones premium, muelles ensacados, multisac, colchón viscoelástico, mejor colchón',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
}