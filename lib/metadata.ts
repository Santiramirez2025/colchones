// lib/metadata.ts - SEO Optimizado e Integrado
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
    template: `%s | ${SITE_CONFIG.name}` // Para otras páginas
  },
  
  description: SEO_DEFAULTS.description,
  
  keywords: SEO_DEFAULTS.keywords,
  
  authors: [{ 
    name: SITE_CONFIG.name, 
    url: SITE_CONFIG.url 
  }],
  
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  
  // Open Graph optimizado
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    images: [
      {
        url: SEO_DEFAULTS.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Colchones Premium`,
        type: 'image/jpeg',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@tiendacolchon',
    creator: '@tiendacolchon',
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    images: {
      url: SEO_DEFAULTS.ogImage,
      alt: `${SITE_CONFIG.name} - Colchones Premium`,
    },
  },
  
  // Robots
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
  
  // Verification (actualizar con tus códigos reales)
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    other: {
      'facebook-domain-verification': 'your-facebook-verification',
    },
  },
  
  // Alternates
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      'es-ES': SITE_CONFIG.url,
    },
  },
  
  // Información adicional
  category: 'Hogar y Descanso',
  classification: 'E-commerce de Colchones',
  
  // Manifest
  manifest: '/manifest.json',
  
  // App-specific
  applicationName: SITE_CONFIG.name,
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  
  // Other
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

// ============================================
// STRUCTURED DATA (JSON-LD)
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
      image: `${SITE_CONFIG.url}${HERO_PRODUCT.images.hero}`,
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
      review: SOCIAL_PROOF.reviews.slice(0, 3).map((review) => ({
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
    
    // Breadcrumb
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_CONFIG.url}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: SITE_CONFIG.url,
        },
      ],
    },
    
    // FAQ
    {
      '@type': 'FAQPage',
      '@id': `${SITE_CONFIG.url}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Cuánto tiempo tarda el envío?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Realizamos envíos gratuitos en 24-48 horas a toda España peninsular. Para Baleares, Canarias, Ceuta y Melilla consultar plazos.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué garantía tienen los colchones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Todos nuestros colchones incluyen 10 años de garantía del fabricante contra defectos de fabricación y hundimientos superiores a 2cm.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Puedo probar el colchón antes de comprarlo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, ofrecemos 100 noches de prueba sin riesgo. Si no estás satisfecho, te lo recogemos gratis y te devolvemos el 100% del importe.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cómo funciona el test personalizado?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nuestro test con inteligencia artificial analiza tus preferencias de sueño en 2 minutos y te recomienda los colchones más adecuados según tu peso, postura al dormir, firmeza preferida y necesidades específicas.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué formas de pago aceptan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, Amex), PayPal, transferencia bancaria y financiación hasta 12 meses sin intereses.',
          },
        },
      ],
    },
  ],
}

// ============================================
// FUNCIÓN PARA EXPORTAR STRUCTURED DATA
// ============================================

/**
 * Retorna todos los structured data schemas como array
 * Para usar en page.tsx con map()
 */
export function getAllStructuredData() {
  return [structuredData]
}

// ============================================
// HELPERS PARA OTRAS PÁGINAS
// ============================================

/**
 * Genera metadata para páginas de productos
 */
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
      description: `${product.description} Precio: ${product.price}€. Envío gratis. Garantía 10 años. 100 noches de prueba.`,
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

/**
 * Genera metadata para páginas de categoría
 */
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

/**
 * Genera metadata para artículos de blog
 */
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