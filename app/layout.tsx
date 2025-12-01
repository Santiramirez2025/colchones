import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Header from '../components/sections/Header'
import Footer from '../components/sections/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
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
  metadataBase: new URL('https://azulcolchones.com'),
  title: {
    default: 'Azul Colchones Villa María | Colchonería en Córdoba con Envío Gratis',
    template: '%s | Azul Colchones'
  },
  description: 'Colchonería en Villa María, Córdoba. ✓ Envío GRATIS en Villa María 24-48hs ✓ 8+ años de experiencia ✓ Garantía extendida ✓ 12 cuotas sin interés. Tu colchonería de confianza.',
  applicationName: 'Azul Colchones',
  
  keywords: [
    'colchones villa maría',
    'colchonería villa maría',
    'colchones córdoba',
    'colchones villa maría córdoba',
    'sommier villa maría',
    'donde comprar colchones villa maría',
    'colchones premium villa maría',
    'colchonería córdoba',
    'colchones baratos villa maría',
    'colchones matrimonio villa maría',
    'colchones ortopédicos villa maría',
    'colchones viscoelásticos córdoba',
    'azul colchones villa maría',
    'tienda colchones villa maría',
    'colchones con garantía villa maría',
    'financiación colchones córdoba',
    'envío gratis colchones villa maría',
    'sommier y colchón villa maría'
  ],
  
  authors: [{ name: 'Azul Colchones', url: 'https://azulcolchones.com' }],
  creator: 'Azul Colchones Villa María',
  publisher: 'Azul Colchones',
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://azulcolchones.com',
    siteName: 'Azul Colchones Villa María',
    title: 'Azul Colchones | Colchonería en Villa María, Córdoba',
    description: '🛏️ Tu colchonería de confianza en Villa María. 8+ años de experiencia. ✓ Envío GRATIS Villa María ✓ 12 cuotas sin interés ✓ Garantía extendida',
    images: [
      {
        url: 'https://azulcolchones.com/og-image-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Azul Colchones - Colchonería en Villa María, Córdoba',
        type: 'image/jpeg',
      },
      {
        url: 'https://azulcolchones.com/og-image-square.jpg',
        width: 1080,
        height: 1080,
        alt: 'Azul Colchones Villa María',
        type: 'image/jpeg',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@azulcolchones',
    creator: '@azulcolchones',
    title: '🛏️ Azul Colchones | Colchonería Villa María',
    description: '8+ años de experiencia en descanso. Envío GRATIS en Villa María. Tu colchonería de confianza.',
    images: {
      url: 'https://azulcolchones.com/twitter-image.jpg',
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
    },
  },
  
  alternates: {
    canonical: 'https://azulcolchones.com',
    languages: {
      'es-AR': 'https://azulcolchones.com',
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
        color: '#3b82f6',
      },
    ],
  },
  
  manifest: '/manifest.json',
  category: 'shopping',
  
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Azul Colchones',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#3b82f6',
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
      '@id': 'https://azulcolchones.com/#organization',
      name: 'Azul Colchones',
      alternateName: 'Azul Colchones Villa María',
      url: 'https://azulcolchones.com',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://azulcolchones.com/#logo',
        url: 'https://azulcolchones.com/logo.png',
        contentUrl: 'https://azulcolchones.com/logo.png',
        width: 512,
        height: 512,
        caption: 'Azul Colchones Logo',
      },
      image: { '@id': 'https://azulcolchones.com/#logo' },
      description: 'Colchonería en Villa María, Córdoba con 8+ años de experiencia. Colchones premium, sommiers y almohadas con envío gratis en Villa María.',
      telephone: '+54-353-XXXXXXX',
      email: 'info@azulcolchones.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '[Tu dirección]',
        addressLocality: 'Villa María',
        addressRegion: 'Córdoba',
        postalCode: '5900',
        addressCountry: 'AR'
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
      sameAs: [
        'https://www.facebook.com/azulcolchones',
        'https://www.instagram.com/azulcolchones',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '850',
        bestRating: '5',
        worstRating: '1'
      },
      makesOffer: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Colchones y Sommiers Premium'
          },
          availability: 'https://schema.org/InStock',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'ARS',
            minPrice: '150000',
            maxPrice: '800000'
          },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'ARS'
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'AR',
              addressRegion: 'Córdoba'
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 0,
                "maxValue": 1,
                "unitCode": "DAY"
              },
              "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 1,
                "maxValue": 2,
                "unitCode": "DAY"
              }
            }
          }
        }
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://azulcolchones.com/#website',
      url: 'https://azulcolchones.com',
      name: 'Azul Colchones Villa María',
      description: 'Colchonería en Villa María, Córdoba. Envío gratis y financiación.',
      publisher: { '@id': 'https://azulcolchones.com/#organization' },
      inLanguage: 'es-AR',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://azulcolchones.com/buscar?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://azulcolchones.com/#webpage',
      url: 'https://azulcolchones.com',
      name: 'Azul Colchones | Colchonería en Villa María, Córdoba',
      isPartOf: { '@id': 'https://azulcolchones.com/#website' },
      about: { '@id': 'https://azulcolchones.com/#organization' },
      primaryImageOfPage: { '@id': 'https://azulcolchones.com/#logo' },
      description: 'Colchonería en Villa María con envío gratis, 12 cuotas sin interés y garantía extendida.',
      inLanguage: 'es-AR',
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://azulcolchones.com/#localbusiness',
      name: 'Azul Colchones',
      image: 'https://azulcolchones.com/logo.png',
      priceRange: '$$',
      telephone: '+54-353-XXXXXXX',
      email: 'info@azulcolchones.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '[Tu dirección física]',
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
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '850',
        bestRating: '5',
        worstRating: '1'
      },
      paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Mercado Pago', 'Bank Transfer'],
      currenciesAccepted: 'ARS',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Colchones y Sommiers',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Colchones Premium'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Sommiers'
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
      name: '¿Hacen envíos a Villa María?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, realizamos envíos GRATIS en Villa María en 24-48 horas. También enviamos a toda Córdoba y el resto del país con costos preferenciales.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Puedo pagar en cuotas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, ofrecemos financiación en hasta 12 cuotas sin interés con Mercado Pago. También aceptamos transferencia bancaria con 10% de descuento y efectivo en tienda con 15% de descuento.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Qué garantía tienen los colchones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Todos nuestros colchones incluyen garantía extendida contra defectos de fabricación. Además, cumplimos con la Ley de Defensa del Consumidor Argentina.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Tienen local físico en Villa María?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, tenemos showroom en Villa María donde podés ver y probar nuestros productos. También atendemos consultas por WhatsApp para mayor comodidad.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cómo sé qué colchón elegir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contamos con un simulador interactivo que te ayuda a encontrar el colchón perfecto según tu peso, posición al dormir y preferencias. También podés consultarnos por WhatsApp para asesoramiento personalizado.'
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
      item: 'https://azulcolchones.com'
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
      lang="es-AR" 
      className={`scroll-smooth ${inter.variable} ${plusJakarta.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch para servicios */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.mercadopago.com" />
        
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
      
      <body 
        className={`${inter.className} font-sans antialiased bg-zinc-950 text-white min-h-screen flex flex-col`}
        style={{ 
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility'
        }}
      >
        {/* Skip to main content - Accesibilidad */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-xl focus:font-semibold focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-all duration-200"
        >
          Saltar al contenido principal
        </a>

        {/* Auth Provider */}
        <AuthProvider>
          {/* Header Component */}
          <Header />
          
          {/* Main Content */}
          <main 
            id="main-content" 
            className="flex-1 w-full scroll-mt-20"
            role="main"
            aria-label="Contenido principal"
          >
            {children}
          </main>
          
          {/* Footer Component */}
          <Footer />

          {/* WhatsApp flotante */}
          <WhatsAppButton 
            phoneNumber="5493531234567"
            message="¡Hola! Me interesa conocer más sobre los colchones de Azul Colchones"
            position="right"
            showTooltip={true}
          />
        </AuthProvider>

        {/* Analytics */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}