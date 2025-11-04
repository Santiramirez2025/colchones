import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Header from '../components/sections/Header'
import Footer from '../components/sections/Footer'
import { AuthProvider } from '@/lib/context/AuthContext'
import { Analytics } from '@/components/analytics'

// ============================================================================
// FONTS
// ============================================================================

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  weight: ['400', '500', '600', '700'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-display',
  preload: true,
  weight: ['500', '600', '700', '800'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
})

// ============================================================================
// VIEWPORT
// ============================================================================

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#18181b' }
  ],
  colorScheme: 'light dark',
}

// ============================================================================
// METADATA
// ============================================================================

export const metadata: Metadata = {
  metadataBase: new URL('https://tiendacolchon.es'),
  title: {
    default: 'Tienda Colchón | Colchones Viscoelásticos Premium con Envío Gratis',
    template: '%s | Tienda Colchón'
  },
  description: 'Compra colchones viscoelásticos premium en España. ✓ Envío gratis 3 a 6 dias ✓ Tu descanso asegurado ✓ 3 años garantía ✓ +50.000 clientes. Encuentra tu colchón perfecto hoy.',
  applicationName: 'Tienda Colchón',
  
  keywords: [
    'colchones viscoelásticos',
    'comprar colchón online',
    'colchones baratos calidad',
    'mejor colchón 2025',
    'colchón viscoelástico 150x190',
    'colchón matrimonio oferta',
    'colchón espalda dolor lumbar',
    'colchón ortopédico cervical',
    'colchones Madrid',
    'colchones Barcelona',
    'tienda colchones España',
    'opiniones colchones viscoelásticos',
    'comparativa colchones 2025',
    'qué colchón comprar',
    'colchón firme o blando',
    'envío gratis colchones',
    'tu descanso asegurado',
    'colchón garantía 3 años',
    'financiación colchones'
  ],
  
  authors: [{ name: 'Tienda Colchón', url: 'https://tiendacolchon.es' }],
  creator: 'Tienda Colchón',
  publisher: 'Tienda Colchón',
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://tiendacolchon.es',
    siteName: 'Tienda Colchón',
    title: 'Colchones Viscoelásticos Premium | Envío Gratis 24h y Tu descanso asegurado',
    description: '🛏️ +50.000 clientes duermen mejor. Colchones premium con tecnología adaptativa. ✓ Envío gratis ✓ Sin riesgo ✓ Garantía 3 años',
    images: [
      {
        url: 'https://tiendacolchon.es/og-image-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Colchón viscoelástico premium de Tienda Colchón con capas de confort',
        type: 'image/jpeg',
      },
      {
        url: 'https://tiendacolchon.es/og-image-square.jpg',
        width: 1080,
        height: 1080,
        alt: 'Tienda Colchón - Descanso Premium',
        type: 'image/jpeg',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@tiendacolchon',
    creator: '@tiendacolchon',
    title: '🛏️ Colchones Viscoelásticos Premium | Envío Gratis 24h',
    description: '+50k clientes satisfechos. Tu descanso asegurado. Encuentra tu colchón perfecto hoy.',
    images: {
      url: 'https://tiendacolchon.es/twitter-image.jpg',
      alt: 'Tienda Colchón - Colchones Premium',
    },
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: 'google-site-verification-code-aqui',
    other: {
      'facebook-domain-verification': 'facebook-verification-code',
      'pinterest-site-verification': 'pinterest-code',
    },
  },
  
  alternates: {
    canonical: 'https://tiendacolchon.es',
    languages: {
      'es-ES': 'https://tiendacolchon.es',
    },
  },
  
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#4f46e5',
      },
    ],
  },
  
  manifest: '/manifest.json',
  category: 'shopping',
  
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Tienda Colchón',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#4f46e5',
    'msapplication-config': '/browserconfig.xml',
  },
}

// ============================================================================
// STRUCTURED DATA (Schema.org JSON-LD)
// ============================================================================

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://tiendacolchon.es/#organization',
      name: 'Tienda Colchón',
      alternateName: 'Tienda Colchon',
      url: 'https://tiendacolchon.es',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://tiendacolchon.es/#logo',
        url: 'https://tiendacolchon.es/logo.png',
        contentUrl: 'https://tiendacolchon.es/logo.png',
        width: 512,
        height: 512,
        caption: 'Tienda Colchón Logo',
      },
      image: { '@id': 'https://tiendacolchon.es/#logo' },
      description: 'Tienda online de colchones viscoelásticos premium con envío gratis en 24-48h. Más de 50.000 clientes satisfechos en España.',
      telephone: '+34-900-123-456',
      email: 'info@tiendacolchon.es',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle Ejemplo 123',
        addressLocality: 'Madrid',
        addressRegion: 'Comunidad de Madrid',
        postalCode: '28001',
        addressCountry: 'ES'
      },
      sameAs: [
        'https://www.facebook.com/tiendacolchon',
        'https://www.instagram.com/tiendacolchon',
        'https://www.youtube.com/@tiendacolchon',
        'https://www.linkedin.com/company/tiendacolchon',
        'https://www.pinterest.es/tiendacolchon',
        'https://twitter.com/tiendacolchon'
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '5247',
        bestRating: '5',
        worstRating: '1'
      },
      makesOffer: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Colchones Viscoelásticos Premium'
          },
          availability: 'https://schema.org/InStock',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'EUR',
            minPrice: '299',
            maxPrice: '1299'
          },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'EUR'
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: {
                '@type': 'QuantitativeValue',
                minValue: '24',
                maxValue: '48',
                unitCode: 'HUR'
              }
            }
          }
        }
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://tiendacolchon.es/#website',
      url: 'https://tiendacolchon.es',
      name: 'Tienda Colchón',
      description: 'Compra colchones viscoelásticos premium online con envío gratis',
      publisher: { '@id': 'https://tiendacolchon.es/#organization' },
      inLanguage: 'es-ES',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://tiendacolchon.es/buscar?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://tiendacolchon.es/#webpage',
      url: 'https://tiendacolchon.es',
      name: 'Colchones Viscoelásticos Premium | Tienda Colchón',
      isPartOf: { '@id': 'https://tiendacolchon.es/#website' },
      about: { '@id': 'https://tiendacolchon.es/#organization' },
      primaryImageOfPage: { '@id': 'https://tiendacolchon.es/#logo' },
      description: 'Compra colchones viscoelásticos premium en España. Envío gratis 3 a 6 dias, Tu descanso asegurado y 3 años de garantía.',
      inLanguage: 'es-ES',
    },
    {
      '@type': 'Store',
      '@id': 'https://tiendacolchon.es/#localbusiness',
      name: 'Tienda Colchón',
      image: 'https://tiendacolchon.es/logo.png',
      priceRange: '€€-€€€',
      telephone: '+34-900-123-456',
      email: 'info@tiendacolchon.es',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle Ejemplo 123',
        addressLocality: 'Madrid',
        addressRegion: 'Comunidad de Madrid',
        postalCode: '28001',
        addressCountry: 'ES'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 40.4168,
        longitude: -3.7038
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59'
        }
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '5247',
        bestRating: '5',
        worstRating: '1'
      },
      paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'Financing'],
      currenciesAccepted: 'EUR',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Colchones Premium',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Colchón Viscoelástico'
            }
          }
        ]
      }
    }
  ]
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto tarda el envío de un colchón?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Realizamos envíos gratis en 24-48 horas a toda España peninsular. Recibirás tu colchón enrollado al vacío en un paquete compacto.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Por qué confiar en la calidad de nuestros colchones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trabajamos con fabricantes nacionales que utilizan materiales certificados y tecnologías de última generación en descanso. Cada colchón pasa por rigurosos controles de calidad antes de llegar a tu hogar, garantizando confort y durabilidad desde la primera noche.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Qué garantía tienen los colchones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Todos nuestros colchones incluyen 3 años de garantía del fabricante contra defectos de fabricación y pérdida de firmeza.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cómo sé qué firmeza de colchón elegir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Recomendamos firmeza media-alta para la mayoría de personas. Si duermes de lado, elige firmeza media. Si duermes boca arriba o boca abajo, firmeza media-alta o alta.'
      }
    }
  ]
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: 'https://tiendacolchon.es'
    }
  ]
}

// ============================================================================
// ROOT LAYOUT
// ============================================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="es" 
      className={`scroll-smooth ${inter.variable} ${plusJakarta.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch para servicios de analytics */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        
        {/* Preload crítico para LCP */}
        <link 
          rel="preload" 
          href="/images/hero-colchon.webp" 
          as="image" 
          type="image/webp"
          fetchPriority="high"
        />
        
        {/* Structured Data - Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="jsonld-main"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
          key="jsonld-breadcrumb"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          key="jsonld-faq"
        />
      </head>
      
      <body className={`${inter.className} font-sans antialiased bg-zinc-950 text-white overflow-x-hidden`}>
        {/* Skip to main content - Accesibilidad */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-violet-600 focus:text-white focus:rounded-xl focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all"
        >
          Saltar al contenido principal
        </a>

        {/* Auth Provider - Envuelve toda la app */}
        <AuthProvider>
          {/* Header Component */}
          <Header />
          
          {/* Main Content */}
          <main 
            id="main-content" 
            className="min-h-screen"
            role="main"
            aria-label="Contenido principal"
          >
            {children}
          </main>
          
          {/* Footer Component */}
          <Footer />
        </AuthProvider>

        {/* ✅ ANALYTICS - Todos los servicios de tracking modulares */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}