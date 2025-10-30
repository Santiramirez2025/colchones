// lib/metadata.ts - SEO Optimizado
import { Metadata } from 'next'
import { SITE_CONFIG, SEO_DEFAULTS } from '@/lib/constants'
import { HERO_PRODUCT, SOCIAL_PROOF } from '@/lib/product-data'

// ============================================
// METADATA PRINCIPAL PARA HOME
// ============================================

export const homeMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  
  title: {
    default: SEO_DEFAULTS.title,
    template: `%s | ${SITE_CONFIG.name}`
  },
  
  // OPTIMIZADO: Description con USPs + precio
  description: 'Colchón Premium 1.800 muelles Multisac®. Envío gratis 24h, Tu descanso asegurado, garantía 3 años. Desde 39€/mes. Test personalizado gratis.',
  
  // OPTIMIZADO: Keywords long-tail específicos
  keywords: [
    'colchón premium muelles ensacados',
    'colchón 1800 muelles',
    'colchón 32cm altura',
    'Garantía de Satisfacción Total',
    'colchón envío 24 horas',
    'colchón garantía 3 años',
    'colchón firmeza 70',
    'colchón Multisac'
  ],
  
  authors: [{ 
    name: SITE_CONFIG.name, 
    url: SITE_CONFIG.url 
  }],
  
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SEO_DEFAULTS.title,
    description: 'Colchón Premium 1.800 muelles. Envío gratis 24h. Garantía de Satisfacción Total.',
    images: [
      {
        url: '/og-colchon-premium-multisac.jpg', // Nombre descriptivo
        width: 1200,
        height: 630,
        alt: 'Colchón Premium Multisac 1.800 muelles ensacados',
        type: 'image/jpeg',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@tiendacolchon',
    creator: '@tiendacolchon',
    title: SEO_DEFAULTS.title,
    description: 'Colchón Premium 1.800 muelles. Envío gratis 24h. Desde 39€/mes.',
    images: {
      url: '/og-colchon-premium-multisac.jpg',
      alt: 'Colchón Premium Multisac',
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
    // yandex: 'tu-codigo-si-aplica',
    // other: {
    //   'facebook-domain-verification': 'tu-codigo-facebook',
    // },
  },
  
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      'es-ES': SITE_CONFIG.url,
    },
  },
  
  category: 'Hogar y Descanso',
  classification: 'E-commerce de Colchones',
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
// STRUCTURED DATA (JSON-LD) - OPTIMIZADO
// ============================================

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // Organization
    {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
        width: 512,
        height: 512,
      },
      description: SITE_CONFIG.description,
      telephone: SITE_CONFIG.phone.number,
      email: `info@${SITE_CONFIG.domain}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Madrid',
        addressRegion: 'Comunidad de Madrid',
        postalCode: '28001',
        streetAddress: 'Calle del Descanso 123',
        addressCountry: 'ES',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: SITE_CONFIG.phone.number,
          contactType: 'Atención al Cliente',
          areaServed: 'ES',
          availableLanguage: ['Spanish'],
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: SOCIAL_PROOF.rating.value.toString(),
        reviewCount: SOCIAL_PROOF.rating.count.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      sameAs: [
        `https://facebook.com/${SITE_CONFIG.domain.split('.')[0]}`,
        `https://instagram.com/${SITE_CONFIG.domain.split('.')[0]}`,
        `https://twitter.com/${SITE_CONFIG.domain.split('.')[0]}`,
      ],
    },
    
    // Website
    {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
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
    
    // Product (Hero Product)
    {
      '@type': 'Product',
      '@id': `${SITE_CONFIG.url}/#product`,
      name: HERO_PRODUCT.name,
      description: HERO_PRODUCT.description,
      image: HERO_PRODUCT.images.hero,
      brand: {
        '@type': 'Brand',
        name: SITE_CONFIG.name,
      },
      offers: {
        '@type': 'Offer',
        url: SITE_CONFIG.url,
        priceCurrency: 'EUR',
        price: HERO_PRODUCT.price.current.toString(),
        priceValidUntil: '2025-12-31',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@id': `${SITE_CONFIG.url}/#organization`,
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0',
            currency: 'EUR',
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 2,
              unitCode: 'DAY',
            },
          },
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: SOCIAL_PROOF.rating.value.toString(),
        reviewCount: SOCIAL_PROOF.rating.count.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      // OPTIMIZADO: Solo 2 reviews en lugar de 3
      review: SOCIAL_PROOF.reviews.slice(0, 2).map((review) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.name,
        },
        datePublished: new Date().toISOString(),
        reviewBody: review.text,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating.toString(),
          bestRating: '5',
          worstRating: '1',
        },
      })),
      warranty: {
        '@type': 'WarrantyPromise',
        durationOfWarranty: {
          '@type': 'QuantitativeValue',
          value: '10',
          unitCode: 'ANN',
        },
      },
    },
    
    // OPTIMIZADO: FAQ reducido a 3 preguntas clave
    {
      '@type': 'FAQPage',
      '@id': `${SITE_CONFIG.url}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Cuánto tiempo tarda el envío?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Realizamos envíos gratuitos en 24-48 horas a toda España peninsular.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué garantía tienen los colchones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Todos nuestros colchones incluyen 10 años de garantía del fabricante contra defectos de fabricación.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Por qué confiar en la calidad de nuestros colchones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Trabajamos con fabricantes nacionales que utilizan materiales certificados y tecnologías de última generación en descanso. Cada colchón pasa por rigurosos controles de calidad antes de llegar a tu hogar, garantizando confort y durabilidad desde la primera noche.',
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

  return {
    title: `${product.name} - Comprar Online`,
    description: `${product.description} Precio: ${product.price}€. Envío gratis 24h. Garantía 3 años. Certificados de calidad europea.`,
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
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
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
    title: `${category.name} - Comprar Online`,
    description: category.description,
    openGraph: {
      title: category.name,
      description: category.description,
      type: 'website',
      url,
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
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
    alternates: {
      canonical: url,
    },
  }
}