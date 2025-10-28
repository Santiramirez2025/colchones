// app/metadata.ts - SEO Optimizado
import { Metadata } from 'next'

export const homeMetadata: Metadata = {
  title: 'Descanso Premium - Colchones de Alta Gama con Tecnología del Sueño | Test AI Gratis',
  description: 'Descubre tu colchón perfecto con nuestro Test AI en 2 minutos. Colchones premium fabricados en España con garantía de 10 años. +50,000 clientes felices. Envío gratis 24-48h.',
  keywords: [
    'colchones premium',
    'colchones de alta gama',
    'tecnología del sueño',
    'test colchón personalizado',
    'colchones España',
    'descanso premium',
    'mejor colchón',
    'colchón ergonómico',
    'garantía 10 años',
    'prueba 100 noches'
  ],
  authors: [{ name: 'Descanso Premium' }],
  creator: 'Descanso Premium',
  publisher: 'Descanso Premium',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://descansopremium.es',
    title: 'Descanso Premium - Colchones de Alta Gama',
    description: 'Descubre tu colchón perfecto con nuestro Test AI. +50,000 clientes felices. Garantía 10 años.',
    siteName: 'Descanso Premium',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Descanso Premium - Colchones de Alta Gama',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Descanso Premium - Colchones de Alta Gama',
    description: 'Descubre tu colchón perfecto con nuestro Test AI. +50,000 clientes felices.',
    images: ['/twitter-image.jpg'],
    creator: '@descansopremium',
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  
  // Alternate languages
  alternates: {
    canonical: 'https://descansopremium.es',
    languages: {
      'es-ES': 'https://descansopremium.es',
    },
  },
  
  // Additional metadata
  category: 'Hogar y Descanso',
}

// Structured Data (JSON-LD)
export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Descanso Premium',
  description: 'Tienda de colchones premium con tecnología del sueño',
  url: 'https://descansopremium.es',
  logo: 'https://descansopremium.es/logo.png',
  image: 'https://descansopremium.es/og-image.jpg',
  telephone: '+34900123456',
  email: 'info@descansopremium.es',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle Descanso 123',
    addressLocality: 'Madrid',
    postalCode: '28001',
    addressCountry: 'ES',
  },
  priceRange: '€€€',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '5247',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    'https://facebook.com/descansopremium',
    'https://instagram.com/descansopremium',
    'https://twitter.com/descansopremium',
  ],
}