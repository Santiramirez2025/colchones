import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '../components/sections/Header'
import Footer from '../components/sections/Footer'

// Fuente principal - Inter (clean, professional)
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  weight: ['400', '500', '600', '700', '800', '900'],
  fallback: ['system-ui', 'arial'],
})

// Fuente display - Plus Jakarta Sans (elegant, modern)
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  preload: true,
  weight: ['400', '500', '600', '700', '800'],
  fallback: ['system-ui', 'arial'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1e1b4b' }
  ],
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://descanso-premium.es'),
  title: {
    default: 'Descanso Premium - Colchones de Lujo con Tecnología Inteligente',
    template: '%s | Descanso Premium'
  },
  description: 'Descubre tu colchón perfecto en 2 minutos con nuestro simulador inteligente. Más de 50.000 clientes satisfechos. Envío gratis, 100 noches de prueba y 10 años de garantía.',
  applicationName: 'Descanso Premium',
  keywords: [
    'colchones premium',
    'colchones España',
    'simulador de colchones',
    'descanso premium',
    'colchones ortopédicos',
    'mejor colchón',
    'colchón viscoelástico',
    'colchón memory foam',
    'salud del sueño',
    'ergonomía',
    'colchones con garantía',
    'envío gratis colchones',
    'test colchón AI',
    'colchón personalizado'
  ],
  authors: [{ name: 'Descanso Premium', url: 'https://descanso-premium.es' }],
  creator: 'Descanso Premium',
  publisher: 'Descanso Premium',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://descanso-premium.es',
    siteName: 'Descanso Premium',
    title: 'Descanso Premium - Tu Colchón Ideal para un Sueño Perfecto',
    description: 'Más de 50.000 clientes duermen mejor con nuestros colchones premium. Simulador inteligente, envío gratis y 100 noches de prueba.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Descanso Premium - Colchones de Lujo con Tecnología del Sueño',
        type: 'image/jpeg',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@descansopremium',
    creator: '@descansopremium',
    title: 'Descanso Premium - Colchones de Lujo con IA',
    description: 'Encuentra tu colchón perfecto en 2 minutos. +50k clientes satisfechos.',
    images: {
      url: '/twitter-image.jpg',
      alt: 'Descanso Premium',
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
    google: 'tu-codigo-google-verification',
    yandex: 'tu-codigo-yandex',
    // other: {
    //   'facebook-domain-verification': 'tu-codigo-facebook',
    // },
  },
  
  alternates: {
    canonical: 'https://descanso-premium.es',
    languages: {
      'es-ES': 'https://descanso-premium.es',
    },
  },
  
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
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
      },
    ],
  },
  
  manifest: '/manifest.json',
  category: 'e-commerce',
  
  // Additional metadata for better SEO
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'mobile-web-app-capable': 'yes',
  },
}

// Enhanced JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://descanso-premium.es/#organization',
      name: 'Descanso Premium',
      url: 'https://descanso-premium.es',
      logo: {
        '@type': 'ImageObject',
        url: 'https://descanso-premium.es/logo.png',
        width: 512,
        height: 512,
      },
      image: 'https://descanso-premium.es/logo.png',
      description: 'Tienda premium de colchones con tecnología del sueño avanzada',
      telephone: '+34-900-123-456',
      email: 'info@descansopremium.es',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle Principal 123',
        addressLocality: 'Madrid',
        addressRegion: 'Madrid',
        postalCode: '28001',
        addressCountry: 'ES'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 40.4168,
        longitude: -3.7038
      },
      sameAs: [
        'https://facebook.com/descansopremium',
        'https://instagram.com/descansopremium',
        'https://twitter.com/descansopremium',
        'https://youtube.com/descansopremium'
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://descanso-premium.es/#website',
      url: 'https://descanso-premium.es',
      name: 'Descanso Premium',
      description: 'Colchones premium con tecnología inteligente del sueño',
      publisher: {
        '@id': 'https://descanso-premium.es/#organization'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://descanso-premium.es/buscar?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://descanso-premium.es/#localbusiness',
      name: 'Descanso Premium',
      image: 'https://descanso-premium.es/logo.png',
      priceRange: '€€€',
      telephone: '+34-900-123-456',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle Principal 123',
        addressLocality: 'Madrid',
        addressRegion: 'Madrid',
        postalCode: '28001',
        addressCountry: 'ES'
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '00:00',
        closes: '23:59'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '5247',
        bestRating: '5',
        worstRating: '1'
      },
      paymentAccepted: 'Cash, Credit Card, Debit Card, PayPal',
      currenciesAccepted: 'EUR',
    }
  ]
}

// Breadcrumb JSON-LD for homepage
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: 'https://descanso-premium.es'
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
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="jsonld-organization"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
          key="jsonld-breadcrumb"
        />
      </head>
      
      <body className={`${inter.className} font-sans antialiased bg-[#fafafa] text-gray-900 overflow-x-hidden`}>
        {/* Skip to main content for accessibility */}
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
        >
          {children}
        </main>
        
        {/* Footer Component */}
        <Footer />

        {/* Performance: Load analytics after interactive */}
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
              cookie_flags: 'SameSite=None;Secure'
            });
          `}
        </Script>

        {/* Facebook Pixel - Optional */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
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
        )}

        {/* Cookie Consent - Load after user can interact */}
        <Script 
          id="cookie-consent" 
          strategy="lazyOnload"
        >
          {`
            // Cookie consent logic
            // Puedes integrar: CookieBot, OneTrust, Cookieyes, etc.
            // Ejemplo básico:
            (function() {
              const consent = localStorage.getItem('cookie-consent');
              if (!consent) {
                // Mostrar banner de cookies
                console.log('Mostrar banner de cookies');
              }
            })();
          `}
        </Script>

        {/* Hotjar - Optional (lazyload for performance) */}
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

        {/* Web Vitals Reporting - Optional */}
        <Script
          id="web-vitals"
          strategy="afterInteractive"
        >
          {`
            // Report Web Vitals to analytics
            function sendToAnalytics(metric) {
              if (window.gtag) {
                window.gtag('event', metric.name, {
                  value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                  event_category: 'Web Vitals',
                  event_label: metric.id,
                  non_interaction: true,
                });
              }
            }
            
            // You can implement reportWebVitals here if needed
          `}
        </Script>
      </body>
    </html>
  )
}