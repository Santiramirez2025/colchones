// components/analytics/CookieConsent.tsx
'use client'

import Script from 'next/script'

export function CookieConsent() {
  return (
    <Script 
      id="cookie-consent" 
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const consent = localStorage.getItem('cookie-consent');
            const consentDate = localStorage.getItem('cookie-consent-date');
            
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            
            if (!consent || (consentDate && new Date(consentDate) < sixMonthsAgo)) {
              const banner = document.createElement('div');
              banner.id = 'cookie-consent-banner';
              banner.innerHTML = \`
                <div style="position: fixed; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.95); color: white; padding: 1.5rem; z-index: 9999; backdrop-filter: blur(10px);">
                  <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                    <div style="flex: 1; min-width: 300px;">
                      <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">
                        🍪 Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. 
                        <a href="/politica-cookies" style="color: #a78bfa; text-decoration: underline;">Más información</a>
                      </p>
                    </div>
                    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                      <button id="cookie-reject" style="padding: 0.625rem 1.25rem; background: transparent; color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 0.5rem; cursor: pointer; font-weight: 500; font-size: 0.875rem; transition: all 0.2s;">
                        Rechazar
                      </button>
                      <button id="cookie-accept" style="padding: 0.625rem 1.25rem; background: linear-gradient(to right, #8b5cf6, #d946ef); color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600; font-size: 0.875rem; transition: all 0.2s;">
                        Aceptar todas
                      </button>
                    </div>
                  </div>
                </div>
              \`;
              
              document.body.appendChild(banner);
              
              document.getElementById('cookie-accept').addEventListener('click', () => {
                localStorage.setItem('cookie-consent', 'accepted');
                localStorage.setItem('cookie-consent-date', new Date().toISOString());
                banner.remove();
                
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
              
              document.getElementById('cookie-reject').addEventListener('click', () => {
                localStorage.setItem('cookie-consent', 'rejected');
                localStorage.setItem('cookie-consent-date', new Date().toISOString());
                banner.remove();
                
                if (window.gtag) {
                  window.gtag('consent', 'update', {
                    'analytics_storage': 'denied',
                    'ad_storage': 'denied'
                  });
                }
              });
            } else if (consent === 'accepted') {
              if (window.gtag) {
                window.gtag('consent', 'update', {
                  'analytics_storage': 'granted',
                  'ad_storage': 'granted'
                });
              }
            }
          })();
        `,
      }}
    />
  )
}