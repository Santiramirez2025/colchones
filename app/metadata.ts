// lib/metadata.ts - SEO Optimizado e Integrado con Prisma
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
  
  // TODO: Actualizar con tus códigos reales de Search Console
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
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
        orderBy: { salesCount: 'desc' },
        select: {
          name: true,
          description: true,
          price: true,
          originalPrice: true,
          image: true,
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
          isPublished: true,
          verified: true,
          rating: 5
        },
        orderBy: { helpfulCount: 'desc' },
        select: {
          userName: true,
          rating: true,
          comment: true,
          createdAt: true
        }
      })
    ])

    const avgRating = stats._avg.rating || 4.8
    const totalReviews = stats._sum.reviewCount || 0

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
        addressLocality: 'Madrid', // TODO: Actualizar con dirección real
        addressRegion: 'Comunidad de Madrid',
        postalCode: '28001',
        streetAddress: 'Calle Ejemplo 123', // TODO: Actualizar
        addressCountry: 'ES',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phone.number,
        contactType: 'Atención al Cliente',
        areaServed: 'ES',
        availableLanguage: 'Spanish',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00'
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
        // TODO: Añadir tus URLs reales de redes sociales
        // 'https://facebook.com/tiendacolchon',
        // 'https://instagram.com/tiendacolchon',
        // 'https://twitter.com/tiendacolchon',
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
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle Ejemplo 123', // TODO: Actualizar
        addressLocality: 'Madrid',
        postalCode: '28001',
        addressCountry: 'ES'
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    })

    // 4. Product Schema (Featured Product)
    if (featuredProduct) {
      const nextYear = new Date()
      nextYear.setFullYear(nextYear.getFullYear() + 1)

      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${SITE_CONFIG.url}/producto/${featuredProduct.slug}`,
        name: featuredProduct.name,
        description: featuredProduct.description,
        image: featuredProduct.image.startsWith('http') 
          ? featuredProduct.image 
          : `${SITE_CONFIG.url}${featuredProduct.image}`,
        brand: {
          '@type': 'Brand',
          name: SITE_CONFIG.name,
        },
        offers: {
          '@type': 'Offer',
          url: `${SITE_CONFIG.url}/producto/${featuredProduct.slug}`,
          priceCurrency: 'EUR',
          price: featuredProduct.price.toFixed(2),
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
          name: '¿Cuánto tiempo tarda el envío?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Realizamos envíos gratuitos en 24-48 horas a toda España peninsular. Para Baleares, Canarias, Ceuta y Melilla el plazo es de 3-5 días laborables.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué garantía tienen los colchones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Todos nuestros colchones incluyen garantía del fabricante de hasta 10 años contra defectos de fabricación. Además, ofrecemos 100 noches de prueba con devolución gratuita si no estás satisfecho.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Puedo probar el colchón antes de quedármelo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, todos nuestros colchones incluyen 100 noches de prueba. Si no estás satisfecho, recogemos el colchón gratis y te devolvemos el 100% de tu dinero.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué formas de pago aceptan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal, transferencia bancaria y financiación hasta 12 meses sin intereses.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cómo funciona la devolución?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Si durante las 100 noches de prueba no estás satisfecho, contacta con nosotros y coordinamos la recogida gratuita. Una vez recibido el colchón, procesamos el reembolso completo en 3-5 días laborables.',
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
  image: string
  slug: string
}): Metadata {
  const url = `${SITE_CONFIG.url}/producto/${product.slug}`

  return {
    title: `${product.name} - Comprar Online`,
    description: `${product.description} Precio: ${product.price}€. Envío gratis en 24-48h. 100 noches de prueba. Hasta 10 años de garantía.`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ 
        url: product.image.startsWith('http') ? product.image : `${SITE_CONFIG.url}${product.image}`,
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
      images: product.image.startsWith('http') ? product.image : `${SITE_CONFIG.url}${product.image}`,
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
    title: `${category.name} - Comprar Online con Envío Gratis`,
    description: `${category.description} Envío gratis en 24-48h. 100 noches de prueba. Hasta 10 años de garantía.`,
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
  image: string
  slug: string
  rating: number
  reviewCount: number
  warranty: number
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
      priceCurrency: 'EUR',
      price: product.price.toFixed(2),
      priceValidUntil: nextYear.toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
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