// components/analytics/Analytics.tsx
import { GoogleAnalytics } from './GoogleAnalytics'
import { GoogleTagManager } from './GoogleTagManager'
import { FacebookPixel } from './FacebookPixel'
import { MicrosoftClarity } from './MicrosoftClarity'
import { WebVitals } from './WebVitals'
import { CookieConsent } from './CookieConsent'

/**
 * Componente central de Analytics
 * Agrupa todos los servicios de analytics y tracking
 */
export function Analytics() {
  return (
    <>
      {/* Google Analytics 4 */}
      <GoogleAnalytics />
      
      {/* Google Tag Manager */}
      <GoogleTagManager />
      
      {/* Facebook Pixel */}
      <FacebookPixel />
      
      {/* Microsoft Clarity */}
      <MicrosoftClarity />
      
      {/* Web Vitals Tracking */}
      <WebVitals />
      
      {/* Cookie Consent Banner */}
      <CookieConsent />
    </>
  )
}