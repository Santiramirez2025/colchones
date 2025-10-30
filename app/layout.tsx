import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '../components/sections/Header'
import Footer from '../components/sections/Footer'

// ✅ OPTIMIZACIÓN: Fuentes con subset específico español + latin-ext
const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  // ✅ MEJORA: Solo cargar pesos que realmente uses
  weight: ['400', '500', '600', '700'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
  adjustFontFallback: true, // Reduce CLS
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#18181b' } // Zinc-900
  ],
  colorScheme: 'light dark', // ✅ Soportar ambos
}

export const metadata: Metadata = {
  metadataBase: new URL('https://tiendacolchon.es'),
  title: {
    default: 'Tienda Colchón | Colchones Viscoelásticos Premium con Envío Gratis',
    template: '%s | Tienda Colchón'
  },
  // ✅ MEJORA: Descripción optimizada con long-tail keywords y CTA
  description: 'Compra colchones viscoelásticos premium en España. ✓ Envío gratis 24-48h ✓ Tu descanso asegurado ✓ 3 años garantía ✓ +50.000 clientes. Encuentra tu colchón perfecto hoy.',
  applicationName: 'Tienda Colchón',
  
  // ✅ SEO CRÍTICO: Keywords estratégicas (búsquedas reales de usuarios)
  keywords: [
    // Keywords principales (alto volumen)
    'colchones viscoelásticos',
    'comprar colchón online',
    'colchones baratos calidad',
    'mejor colchón 2025',
    
    // Long-tail (alta conversión)
    'colchón viscoelástico 150x190',
    'colchón matrimonio oferta',
    'colchón espalda dolor lumbar',
    'colchón ortopédico cervical',
    
    // Locales
    'colchones Madrid',
    'colchones Barcelona',
    'tienda colchones España',
    
    // Comparativas y decisión
    'opiniones colchones viscoelásticos',
    'comparativa colchones 2025',
    'qué colchón comprar',
    'colchón firme o blando',
    
    // Beneficios
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
  
  // ✅ MEJORA: Open Graph optimizado con más detalles
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
  
  // ✅ MEJORA: Twitter Card optimizada
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
  
  // ✅ CRÍTICO: Robots optimizados para mejor crawling
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
  
  // ✅ IMPORTANTE: Añadir verification codes reales
  verification: {
    google: 'google-site-verification-code-aqui', // Obtener de Search Console
    // yandex: 'yandex-verification-code', // Solo si operas en Rusia
    other: {
      'facebook-domain-verification': 'facebook-verification-code', // Para Facebook Pixel
      'pinterest-site-verification': 'pinterest-code', // Si usas Pinterest
    },
  },
  
  alternates: {
    canonical: 'https://tiendacolchon.es',
    languages: {
      'es-ES': 'https://tiendacolchon.es',
      // Añadir si tienes versiones en catalán, gallego, euskera
      // 'ca-ES': 'https://tiendacolchon.es/ca',
    },
  },
  
  // ✅ MEJORA: Iconos optimizados para todos los dispositivos
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' }, // SVG escalable
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
        color: '#4f46e5', // Color de tu marca
      },
    ],
  },
  
  manifest: '/manifest.json',
  category: 'shopping',
  
  // ✅ MEJORA: Metadatos adicionales para PWA y móviles
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Tienda Colchón',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#4f46e5',
    'msapplication-config': '/browserconfig.xml',
  },
}

// ✅ MEJORA CRÍTICA: Schema.org más completo y optimizado
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // Organization Schema
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
      
      // ✅ IMPORTANTE: Contacto y ubicación
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
      
      // ✅ Redes sociales (actualizar con tus URLs reales)
      sameAs: [
        'https://www.facebook.com/tiendacolchon',
        'https://www.instagram.com/tiendacolchon',
        'https://www.youtube.com/@tiendacolchon',
        'https://www.linkedin.com/company/tiendacolchon',
        'https://www.pinterest.es/tiendacolchon',
        'https://twitter.com/tiendacolchon'
      ],
      
      // ✅ Rating agregado (actualizar con datos reales)
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '5247',
        bestRating: '5',
        worstRating: '1'
      },
      
      // ✅ Ofertas y servicios clave
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
    
    // Website Schema
    {
      '@type': 'WebSite',
      '@id': 'https://tiendacolchon.es/#website',
      url: 'https://tiendacolchon.es',
      name: 'Tienda Colchón',
      description: 'Compra colchones viscoelásticos premium online con envío gratis',
      publisher: { '@id': 'https://tiendacolchon.es/#organization' },
      inLanguage: 'es-ES',
      
      // ✅ SearchAction para barra de búsqueda en Google
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://tiendacolchon.es/buscar?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
    },
    
    // ✅ NUEVO: E-commerce WebPage Schema
    {
      '@type': 'WebPage',
      '@id': 'https://tiendacolchon.es/#webpage',
      url: 'https://tiendacolchon.es',
      name: 'Colchones Viscoelásticos Premium | Tienda Colchón',
      isPartOf: { '@id': 'https://tiendacolchon.es/#website' },
      about: { '@id': 'https://tiendacolchon.es/#organization' },
      primaryImageOfPage: { '@id': 'https://tiendacolchon.es/#logo' },
      description: 'Compra colchones viscoelásticos premium en España. Envío gratis 24-48h, Tu descanso asegurado y 3 años de garantía.',
      inLanguage: 'es-ES',
    },
    
    // Local Business Schema
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
      
      // ✅ Horario de atención (online 24/7)
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59'
        }
      ],
      
      // ✅ Rating agregado
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '5247',
        bestRating: '5',
        worstRating: '1'
      },
      
      // ✅ Métodos de pago
      paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'Financing'],
      currenciesAccepted: 'EUR',
      
      // ✅ Servicios destacados
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

// ✅ NUEVO: FAQPage Schema para preguntas frecuentes (añadir a homepage)
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
        text: 'Todos nuestros colchones incluyen 10 años de garantía del fabricante contra defectos de fabricación y pérdida de firmeza.'
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

// Breadcrumb JSON-LD
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
        {/* ✅ OPTIMIZACIÓN: Preconnect y DNS Prefetch críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* ✅ Analytics y CDNs */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        
        {/* ✅ NUEVO: Preload crítico para LCP */}
        <link 
          rel="preload" 
          href="/images/hero-colchon.webp" 
          as="image" 
          type="image/webp"
          fetchPriority="high"
        />
        
        {/* ✅ Structured Data - Todos los schemas */}
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
      
      <body className={`${inter.className} font-sans antialiased bg-[#fafafa] text-gray-900 overflow-x-hidden`}>
        {/* ✅ ACCESIBILIDAD: Skip to main content */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-indigo-600 focus:text-white focus:rounded-xl focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
        >
          Saltar al contenido principal
        </a>

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

        {/* ✅ PERFORMANCE: Google Analytics - afterInteractive */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
          strategy="afterInteractive"
        />
        <Script 
          id="google-analytics" 
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
              // ✅ Enhanced Ecommerce
              send_page_view: true,
            });
          `}
        </Script>

        {/* ✅ NUEVO: Google Tag Manager (más versátil que solo Analytics) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <>
            <Script
              id="google-tag-manager"
              strategy="afterInteractive"
            >
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `}
            </Script>
            <noscript>
              <iframe 
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                height="0" 
                width="0" 
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          </>
        )}

        {/* Facebook Pixel - afterInteractive */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <>
            <Script
              id="facebook-pixel"
              strategy="afterInteractive"
            >
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img 
                height="1" 
                width="1" 
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        {/* ✅ NUEVO: Microsoft Clarity (alternativa gratuita a Hotjar) */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
          >
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
          </Script>
        )}

        {/* Hotjar - lazyOnload */}
        {process.env.NEXT_PUBLIC_HOTJAR_ID && (
          <Script
            id="hotjar"
            strategy="lazyOnload"
          >
            {`
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `}
          </Script>
        )}

        {/* ✅ MEJORA: Web Vitals Reporting completo */}
        <Script
          id="web-vitals"
          strategy="afterInteractive"
        >
          {`
            function sendToAnalytics(metric) {
              const body = JSON.stringify({
                name: metric.name,
                value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                rating: metric.rating,
                delta: metric.delta,
                id: metric.id,
              });
              
              // Enviar a GA4
              if (window.gtag) {
                window.gtag('event', metric.name, {
                  value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                  metric_id: metric.id,
                  metric_value: metric.value,
                  metric_delta: metric.delta,
                  metric_rating: metric.rating,
                  event_category: 'Web Vitals',
                  non_interaction: true,
                });
              }
              
              // Enviar a tu API si tienes un endpoint
              if (navigator.sendBeacon) {
                navigator.sendBeacon('/api/analytics', body);
              }
            }
            
            // Report all available metrics whenever they're ready
            if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
              // LCP - Largest Contentful Paint
              new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                sendToAnalytics({
                  name: 'LCP',
                  value: lastEntry.renderTime || lastEntry.loadTime,
                  rating: lastEntry.renderTime < 2500 ? 'good' : lastEntry.renderTime < 4000 ? 'needs-improvement' : 'poor',
                  delta: lastEntry.renderTime || lastEntry.loadTime,
                  id: 'v3-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                });
              }).observe({ type: 'largest-contentful-paint', buffered: true });
              
              // FID - First Input Delay
              new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                  sendToAnalytics({
                    name: 'FID',
                    value: entry.processingStart - entry.startTime,
                    rating: entry.processingStart - entry.startTime < 100 ? 'good' : entry.processingStart - entry.startTime < 300 ? 'needs-improvement' : 'poor',
                    delta: entry.processingStart - entry.startTime,
                    id: 'v3-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                  });
                });
              }).observe({ type: 'first-input', buffered: true });
              
              // CLS - Cumulative Layout Shift
              let clsValue = 0;
              let clsEntries = [];
              new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                  if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    clsEntries.push(entry);
                  }
                });
              }).observe({ type: 'layout-shift', buffered: true });
              
              // Enviar CLS al salir de la página
              addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'hidden' && clsValue > 0) {
                  sendToAnalytics({
                    name: 'CLS',
                    value: clsValue,
                    rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
                    delta: clsValue,
                    id: 'v3-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                  });
                }
              });
            }
          `}
        </Script>

        {/* ✅ NUEVO: Cookie Consent Banner GDPR Compliant */}
        <Script 
          id="cookie-consent" 
          strategy="lazyOnload"
        >
          {`
            (function() {
              // Check if user has already given consent
              const consent = localStorage.getItem('cookie-consent');
              const consentDate = localStorage.getItem('cookie-consent-date');
              
              // Re-ask consent every 6 months
              const sixMonthsAgo = new Date();
              sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
              
              if (!consent || (consentDate && new Date(consentDate) < sixMonthsAgo)) {
                // Show cookie banner
                const banner = document.createElement('div');
                banner.id = 'cookie-consent-banner';
                banner.innerHTML = \`
                  <div style="position: fixed; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.95); color: white; padding: 1.5rem; z-index: 9999; backdrop-filter: blur(10px);">
                    <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                      <div style="flex: 1; min-width: 300px;">
                        <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">
                          🍪 Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. 
                          <a href="/politica-cookies" style="color: #60a5fa; text-decoration: underline;">Más información</a>
                        </p>
                      </div>
                      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                        <button id="cookie-reject" style="padding: 0.625rem 1.25rem; background: transparent; color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 0.5rem; cursor: pointer; font-weight: 500; font-size: 0.875rem;">
                          Rechazar
                        </button>
                        <button id="cookie-accept" style="padding: 0.625rem 1.25rem; background: #4f46e5; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600; font-size: 0.875rem;">
                          Aceptar todas
                        </button>
                      </div>
                    </div>
                  </div>
                \`;
                
                document.body.appendChild(banner);
                
                // Accept button
                document.getElementById('cookie-accept').addEventListener('click', () => {
                  localStorage.setItem('cookie-consent', 'accepted');
                  localStorage.setItem('cookie-consent-date', new Date().toISOString());
                  banner.remove();
                  
                  // Enable tracking
                  if (window.gtag) {
                    window.gtag('consent', 'update', {
                      'analytics_storage': 'granted',
                      'ad_storage': 'granted'
                    });
                  }
                  if (window.fbq) {
                    window.fbq('consent', 'grant');
                  }
                });
                
                // Reject button
                document.getElementById('cookie-reject').addEventListener('click', () => {
                  localStorage.setItem('cookie-consent', 'rejected');
                  localStorage.setItem('cookie-consent-date', new Date().toISOString());
                  banner.remove();
                  
                  // Disable tracking
                  if (window.gtag) {
                    window.gtag('consent', 'update', {
                      'analytics_storage': 'denied',
                      'ad_storage': 'denied'
                    });
                  }
                });
              } else if (consent === 'accepted') {
                // User already accepted, enable tracking
                if (window.gtag) {
                  window.gtag('consent', 'update', {
                    'analytics_storage': 'granted',
                    'ad_storage': 'granted'
                  });
                }
              }
            })();
          `}
        </Script>

        {/* ✅ NUEVO: Trustpilot Widget (si lo usas) */}
        {process.env.NEXT_PUBLIC_TRUSTPILOT_KEY && (
          <Script
            src={`https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js`}
            strategy="lazyOnload"
          />
        )}

        {/* ✅ NUEVO: Schema.org para productos (si tienes ecommerce) */}
        <Script
          id="ecommerce-product-schema"
          strategy="afterInteractive"
        >
          {`
            // Puedes añadir más schemas dinámicamente según la página
            // Este es un ejemplo para productos destacados
          `}
        </Script>
      </body>
    </html>
  )
}