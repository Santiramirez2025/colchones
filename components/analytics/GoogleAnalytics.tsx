// components/analytics/GoogleAnalytics.tsx
'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-BTPV00LG0N'

export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views automáticamente en navegación
  useEffect(() => {
    if (pathname && typeof window !== 'undefined' && (window as any).gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      // Enviar pageview a GA4
      ;(window as any).gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: document.title,
      })

      // Log en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 [GA] Page View:', url)
      }
    }
  }, [pathname, searchParams])

  // Solo cargar en producción
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script 
        id="google-analytics" 
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
              send_page_view: false
            });
          `,
        }}
      />
    </>
  )
}