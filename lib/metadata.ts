// lib/metadata.ts - SEO Optimizado para Azul Colchones Villa María
import { Metadata } from 'next'
import { SITE_CONFIG, SEO_DEFAULTS } from '@/lib/constants'

// ============================================
// METADATA PRINCIPAL PARA HOME
// ============================================

export const homeMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  
  title: {
    default: SEO_DEFAULTS.title,
    template: `%s | ${SITE_CONFIG.name}`
  },
  
  // OPTIMIZADO: Description con USPs argentinos
  description: 'Colchonería en Villa María, Córdoba. Envío GRATIS Villa María 24-48hs. 12 cuotas sin interés con Mercado Pago. 8+ años de experiencia. Garantía extendida.',
  
  // OPTIMIZADO: Keywords long-tail locales
  keywords: SEO_DEFAULTS.keywords,
  
  authors: [{ 
    name: SITE_CONFIG.name, 
    url: SITE_CONFIG.url 
  }],
  
  creator: SITE_CONFIG.displayName,
  publisher: SITE_CONFIG.name,
  
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.displayName,
    title: SEO_DEFAULTS.title,
    description: 'Tu colchonería en Villa María. Envío GRATIS. 12 cuotas sin interés. Garantía extendida.',
    images: [
      {
        url: '/og-azul-colchones-villa-maria.jpg',
        width: 1200,
        height: 630,
        alt: 'Azul Colchones - Colchonería en Villa María, Córdoba',
        type: 'image/jpeg',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@azulcolchones',
    creator: '@azulcolchones',
    title: SEO_DEFAULTS.title,
    description: 'Tu colchonería en Villa María. Envío GRATIS. 12 cuotas sin interés.',
    images: {
      url: '/og-azul-colchones-villa-maria.jpg',
      alt: 'Azul Colchones Villa María',
    },
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      noimageindex: false,
    },
  },
  
  // NOTA: Completar con códigos reales o eliminar antes de producción
  verification: {
    google: 'COMPLETAR_GOOGLE_SEARCH_CONSOLE',
  },
  
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      'es-AR': SITE_CONFIG.url,
    },
  },
  
  category: 'Hogar y Descanso',
  classification: 'Colchonería Online',
  manifest: '/manifest.json',
  applicationName: SITE_CONFIG.name,
  
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

// ============================================
// STRUCTURED DATA (JSON-LD) - OPTIMIZADO ARGENTINA
// ============================================

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // Organization
    {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      alternateName: SITE_CONFIG.displayName,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
        width: 512,
        height: 512,
      },
      description: SITE_CONFIG.description,
      telephone: SITE_CONFIG.phone.number,
      email: SITE_CONFIG.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE_CONFIG.location.city,
        addressRegion: SITE_CONFIG.location.state,
        postalCode: SITE_CONFIG.location.postalCode,
        streetAddress: SITE_CONFIG.location.address,
        addressCountry: SITE_CONFIG.location.countryCode,
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Villa María'
        },
        {
          '@type': 'State',
          name: 'Córdoba'
        },
        {
          '@type': 'Country',
          name: 'Argentina'
        }
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: SITE_CONFIG.phone.number,
          contactType: 'Atención al Cliente',
          areaServed: 'AR',
          availableLanguage: ['Spanish'],
          hoursAvailable: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '19:00'
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Saturday',
              opens: '09:00',
              closes: '13:00'
            }
          ]
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '850',
        bestRating: '5',
        worstRating: '1',
      },
      sameAs: [
        SITE_CONFIG.social.facebook,
        SITE_CONFIG.social.instagram,
      ],
    },
    
    // Website
    {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.displayName,
      description: SITE_CONFIG.description,
      inLanguage: 'es-AR',
      publisher: {
        '@id': `${SITE_CONFIG.url}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_CONFIG.url}/buscar?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    
    // LocalBusiness
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_CONFIG.url}/#localbusiness`,
      name: SITE_CONFIG.name,
      image: `${SITE_CONFIG.url}/logo.png`,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.phone.number,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.location.address,
        addressLocality: SITE_CONFIG.location.city,
        addressRegion: SITE_CONFIG.location.state,
        postalCode: SITE_CONFIG.location.postalCode,
        addressCountry: SITE_CONFIG.location.countryCode
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: SITE_CONFIG.location.coordinates.lat,
        longitude: SITE_CONFIG.location.coordinates.lng
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '19:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '13:00'
        }
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '850',
        bestRating: '5',
        worstRating: '1',
      },
      paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Mercado Pago', 'Bank Transfer'],
      currenciesAccepted: 'ARS',
    },
    
    // Offer - Colchones genérico
    {
      '@type': 'Offer',
      '@id': `${SITE_CONFIG.url}/#offer`,
      itemOffered: {
        '@type': 'Product',
        name: 'Colchones Premium',
        description: 'Colchones de alta calidad con garantía extendida'
      },
      availability: 'https://schema.org/InStock',
      priceCurrency: 'ARS',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'ARS',
        minPrice: '150000',
        maxPrice: '800000'
      },
      seller: {
        '@id': `${SITE_CONFIG.url}/#organization`,
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'ARS',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'AR',
          addressRegion: 'Córdoba'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
        },
      },
    },
    
    // FAQ - Optimizado para Argentina
    {
      '@type': 'FAQPage',
      '@id': `${SITE_CONFIG.url}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Hacen envíos a Villa María?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, realizamos envíos GRATIS en Villa María en 24-48 horas. También enviamos a toda Córdoba y el resto de Argentina con costos preferenciales.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Puedo pagar en cuotas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, aceptamos Mercado Pago con hasta 12 cuotas sin interés. También ofrecemos 10% de descuento en transferencia bancaria y 15% en efectivo.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué garantía tienen los colchones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Todos nuestros colchones incluyen garantía extendida del fabricante contra defectos de fabricación. Además, cumplimos con la Ley de Defensa del Consumidor Argentina (24.240).',
          },
        },
        {
          '@type': 'Question',
          name: '¿Tienen local físico en Villa María?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, tenemos showroom en Villa María donde podés ver y probar nuestros colchones. También atendemos por WhatsApp para consultas rápidas.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cómo funciona el derecho de arrepentimiento?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Según la Ley 24.240 de Defensa del Consumidor, tenés 10 días corridos desde que recibís el producto para arrepentirte de la compra sin dar explicaciones.',
          },
        },
      ],
    },
  ],
}

// ============================================
// FUNCIÓN PARA EXPORTAR STRUCTURED DATA
// ============================================

export function getAllStructuredData() {
  return [structuredData]
}

// ============================================
// HELPERS PARA OTRAS PÁGINAS
// ============================================

export function generateProductMetadata(product: {
  name: string
  description: string
  price: number
  image: string
  slug?: string
}): Metadata {
  const url = product.slug 
    ? `${SITE_CONFIG.url}/producto/${product.slug}`
    : SITE_CONFIG.url

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price)

  return {
    title: `${product.name} - Comprar en Villa María`,
    description: `${product.description} Precio: ${formattedPrice}. Envío GRATIS Villa María 24-48hs. 12 cuotas sin interés. Garantía extendida.`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ 
        url: product.image, 
        width: 1200, 
        height: 630,
        alt: product.name
      }],
      type: 'website',
      url,
      locale: 'es_AR',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: product.image,
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateCategoryMetadata(category: {
  name: string
  description: string
  slug?: string
}): Metadata {
  const url = category.slug
    ? `${SITE_CONFIG.url}/categoria/${category.slug}`
    : SITE_CONFIG.url

  return {
    title: `${category.name} en Villa María - Envío Gratis`,
    description: `${category.description} Envío GRATIS Villa María 24-48hs. 12 cuotas sin interés. Garantía extendida.`,
    openGraph: {
      title: category.name,
      description: category.description,
      type: 'website',
      url,
      locale: 'es_AR',
    },
    twitter: {
      card: 'summary_large_image',
      title: category.name,
      description: category.description,
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateBlogMetadata(article: {
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  slug?: string
}): Metadata {
  const url = article.slug
    ? `${SITE_CONFIG.url}/blog/${article.slug}`
    : SITE_CONFIG.url

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ 
        url: article.image, 
        width: 1200, 
        height: 630,
        alt: article.title
      }],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      url,
      locale: 'es_AR',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.image,
    },
    alternates: {
      canonical: url,
    },
  }
}

// ============================================
// HELPER PARA PRODUCTO ESPECÍFICO CON SCHEMA
// ============================================

export function generateProductStructuredData(product: {
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  slug: string
  rating?: number
  reviewCount?: number
  sku?: string
}) {
  const nextYear = new Date()
  nextYear.setFullYear(nextYear.getFullYear() + 1)

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image.startsWith('http') ? product.image : `${SITE_CONFIG.url}${product.image}`,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_CONFIG.url}/producto/${product.slug}`,
      priceCurrency: 'ARS',
      price: product.price.toFixed(2),
      priceValidUntil: nextYear.toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'ARS',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'AR',
          addressRegion: 'Córdoba'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
        },
      },
    },
    aggregateRating: product.reviewCount && product.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: (product.rating || 4.9).toFixed(1),
      reviewCount: product.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    } : undefined,
  }
}