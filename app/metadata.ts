// lib/metadata.ts - SEO Optimizado para Azul Colchones Villa María
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
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
  
  description: SEO_DEFAULTS.description,
  keywords: SEO_DEFAULTS.keywords,
  
  authors: [{ 
    name: SITE_CONFIG.name, 
    url: SITE_CONFIG.url 
  }],
  
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    images: [
      {
        url: SEO_DEFAULTS.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Colchonería Villa María`,
        type: 'image/jpeg',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@azulcolchones',
    creator: '@azulcolchones',
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    images: {
      url: SEO_DEFAULTS.ogImage,
      alt: `${SITE_CONFIG.name} - Colchonería Villa María`,
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
  
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
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
// STRUCTURED DATA DINÁMICO
// ============================================

/**
 * Obtiene todos los schemas structured data para la home
 */
export async function getAllStructuredData() {
  try {
    // Fetch datos necesarios en paralelo
    const [featuredProduct, stats, topReview] = await Promise.all([
      // Producto destacado para el hero
      prisma.product.findFirst({
        where: { 
          isActive: true,
          isFeatured: true 
        },
        orderBy: [
          { isBestSeller: 'desc' },
          { rating: 'desc' }
        ],
        select: {
          name: true,
          description: true,
          price: true,
          originalPrice: true,
          images: true,
          slug: true,
          rating: true,
          reviewCount: true,
          warranty: true,
        }
      }),
      
      // Estadísticas agregadas
      prisma.product.aggregate({
        where: { isActive: true },
        _avg: { rating: true },
        _sum: { reviewCount: true }
      }),
      
      // Mejor review para mostrar
      prisma.review.findFirst({
        where: { 
          verified: true,
          rating: 5
        },
        orderBy: { createdAt: 'desc' },
        select: {
          rating: true,
          comment: true,
          createdAt: true,
          user: {
            select: {
              name: true
            }
          }
        }
      })
    ])

    const avgRating = stats._avg.rating || 4.9
    const totalReviews = stats._sum.reviewCount || 850

    // Array de schemas
    const schemas = []

    // 1. Organization Schema
    schemas.push({
      '@context': 'https://schema.org',
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
        addressLocality: 'Villa María',
        addressRegion: 'Córdoba',
        postalCode: '5900',
        streetAddress: 'Villa María',
        addressCountry: 'AR',
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
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phone.number,
        contactType: 'Atención al Cliente',
        areaServed: 'AR',
        availableLanguage: 'Spanish',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '19:00'
        }
      },
      aggregateRating: totalReviews > 0 ? {
        '@type': 'AggregateRating',
        ratingValue: avgRating.toFixed(1),
        reviewCount: totalReviews.toString(),
        bestRating: '5',
        worstRating: '1',
      } : undefined,
      sameAs: [
        'https://facebook.com/azulcolchones',
        'https://instagram.com/azulcolchones',
      ].filter(Boolean),
    })

    // 2. WebSite Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      publisher: {
        '@id': `${SITE_CONFIG.url}/#organization`,
      },
      inLanguage: 'es-AR',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_CONFIG.url}/catalogo?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    })

    // 3. LocalBusiness Schema (para Google Maps)
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${SITE_CONFIG.url}/#localbusiness`,
      name: SITE_CONFIG.name,
      image: `${SITE_CONFIG.url}/logo.png`,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.phone.number,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Villa María',
        addressLocality: 'Villa María',
        addressRegion: 'Córdoba',
        postalCode: '5900',
        addressCountry: 'AR'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -32.4075,
        longitude: -63.2406
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
      aggregateRating: totalReviews > 0 ? {
        '@type': 'AggregateRating',
        ratingValue: avgRating.toFixed(1),
        reviewCount: totalReviews.toString(),
        bestRating: '5',
        worstRating: '1',
      } : undefined,
      paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Mercado Pago', 'Bank Transfer'],
      currenciesAccepted: 'ARS',
    })

    // 4. Product Schema (Featured Product)
    if (featuredProduct) {
      const nextYear = new Date()
      nextYear.setFullYear(nextYear.getFullYear() + 1)

      const productImage = featuredProduct.images && featuredProduct.images.length > 0
        ? (featuredProduct.images[0].startsWith('http') 
            ? featuredProduct.images[0] 
            : `${SITE_CONFIG.url}${featuredProduct.images[0]}`)
        : `${SITE_CONFIG.url}/placeholder.jpg`

      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${SITE_CONFIG.url}/producto/${featuredProduct.slug}`,
        name: featuredProduct.name,
        description: featuredProduct.description,
        image: productImage,
        brand: {
          '@type': 'Brand',
          name: SITE_CONFIG.name,
        },
        offers: {
          '@type': 'Offer',
          url: `${SITE_CONFIG.url}/producto/${featuredProduct.slug}`,
          priceCurrency: 'ARS',
          price: (featuredProduct.price / 100).toFixed(2), // Convertir de centavos
          priceValidUntil: nextYear.toISOString().split('T')[0],
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
        aggregateRating: featuredProduct.reviewCount > 0 ? {
          '@type': 'AggregateRating',
          ratingValue: featuredProduct.rating.toFixed(1),
          reviewCount: featuredProduct.reviewCount.toString(),
          bestRating: '5',
          worstRating: '1',
        } : undefined,
        warranty: {
          '@type': 'WarrantyPromise',
          durationOfWarranty: {
            '@type': 'QuantitativeValue',
            value: featuredProduct.warranty.toString(),
            unitCode: 'ANN',
          },
        },
      })
    }

    // 5. FAQPage Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
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
          name: '¿Qué garantía tienen los colchones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Todos nuestros colchones incluyen garantía extendida del fabricante contra defectos de fabricación. Además, cumplimos con la Ley de Defensa del Consumidor Argentina (24.240).',
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
          name: '¿Qué formas de pago aceptan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Aceptamos Mercado Pago (tarjetas de crédito y débito), transferencia bancaria con 10% descuento, y efectivo en nuestro local de Villa María con 15% descuento.',
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
    })

    // 6. BreadcrumbList Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: SITE_CONFIG.url,
        },
      ],
    })

    return schemas

  } catch (error) {
    console.error('Error generando structured data:', error)
    
    // Fallback: schemas mínimos sin datos de BD
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      }
    ]
  }
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
  images: string[]
  slug: string
}): Metadata {
  const url = `${SITE_CONFIG.url}/producto/${product.slug}`
  const image = product.images && product.images.length > 0
    ? (product.images[0].startsWith('http') ? product.images[0] : `${SITE_CONFIG.url}${product.images[0]}`)
    : `${SITE_CONFIG.url}/placeholder.jpg`

  return {
    title: `${product.name} - Comprar en Villa María`,
    description: `${product.description} Precio: $${(product.price / 100).toLocaleString('es-AR')}. Envío GRATIS Villa María 24-48hs. Garantía extendida. 12 cuotas sin interés.`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ 
        url: image,
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
      images: image,
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
  slug: string
}): Metadata {
  const url = `${SITE_CONFIG.url}/categoria/${category.slug}`

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

/**
 * Genera metadata para artículos de blog
 */
export function generateBlogMetadata(article: {
  title: string
  excerpt: string
  coverImage?: string
  author: string
  publishedAt: Date
  slug: string
}): Metadata {
  const url = `${SITE_CONFIG.url}/blog/${article.slug}`

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [{
        url: article.coverImage.startsWith('http') 
          ? article.coverImage 
          : `${SITE_CONFIG.url}${article.coverImage}`,
        width: 1200,
        height: 630,
        alt: article.title
      }] : [],
      type: 'article',
      publishedTime: article.publishedAt.toISOString(),
      authors: [article.author],
      url,
      locale: 'es_AR',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.coverImage,
    },
    alternates: {
      canonical: url,
    },
  }
}

/**
 * Genera structured data para un producto específico
 */
export function generateProductStructuredData(product: {
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  slug: string
  rating: number
  reviewCount: number
  warranty: number
  sku?: string
}) {
  const nextYear = new Date()
  nextYear.setFullYear(nextYear.getFullYear() + 1)

  const image = product.images && product.images.length > 0
    ? (product.images[0].startsWith('http') ? product.images[0] : `${SITE_CONFIG.url}${product.images[0]}`)
    : `${SITE_CONFIG.url}/placeholder.jpg`

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_CONFIG.url}/producto/${product.slug}`,
      priceCurrency: 'ARS',
      price: (product.price / 100).toFixed(2),
      priceValidUntil: nextYear.toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
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
    aggregateRating: product.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toFixed(1),
      reviewCount: product.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    } : undefined,
  }
}