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
              banner.style.cssText = 'position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999; animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);';
              
              banner.innerHTML = \`
                <style>
                  @keyframes slideUp {
                    from { opacity: 0; transform: translateY(100%); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                  @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                  }
                  #cookie-consent-banner .btn-accept:hover {
                    transform: scale(1.02);
                    box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2);
                  }
                  #cookie-consent-banner .btn-reject:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: rgba(59, 130, 246, 0.5);
                  }
                  #cookie-consent-banner .btn-accept:active,
                  #cookie-consent-banner .btn-reject:active {
                    transform: scale(0.98);
                  }
                  @media (max-width: 768px) {
                    #cookie-consent-banner .cookie-content {
                      flex-direction: column;
                      text-align: center;
                    }
                    #cookie-consent-banner .cookie-buttons {
                      width: 100%;
                      justify-content: center;
                    }
                  }
                </style>
                
                <div style="position: relative; background: rgba(9, 9, 11, 0.98); backdrop-filter: blur(20px); border-top: 1px solid rgba(59, 130, 246, 0.2); box-shadow: 0 -10px 25px -5px rgba(0, 0, 0, 0.5);">
                  <!-- Gradiente superior decorativo -->
                  <div style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5) 50%, transparent);"></div>
                  
                  <!-- Shimmer effect -->
                  <div style="position: absolute; inset: 0; background: linear-gradient(45deg, transparent 25%, rgba(59, 130, 246, 0.05) 50%, transparent 75%); background-size: 250% 250%; animation: shimmer 3s linear infinite; pointer-events: none;"></div>
                  
                  <div class="cookie-content" style="position: relative; max-width: 1200px; margin: 0 auto; padding: 1.5rem 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;">
                    <!-- Icono + Texto -->
                    <div style="flex: 1; display: flex; align-items: start; gap: 1rem; min-width: 0;">
                      <!-- Icono Cookie -->
                      <div style="flex-shrink: 0; width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2)); border: 1px solid rgba(59, 130, 246, 0.3); display: flex; align-items: center; justify-content: center;">
                        <svg style="width: 20px; height: 20px; color: #60a5fa;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      
                      <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items-center; gap: 0.5rem; margin-bottom: 0.5rem;">
                          <span style="font-size: 0.75rem; font-weight: 800; color: #60a5fa; text-transform: uppercase; letter-spacing: 0.05em;">🍪 Cookies</span>
                        </div>
                        <p style="margin: 0; font-size: 0.9rem; line-height: 1.6; color: #d4d4d8;">
                          Usamos cookies para mejorar tu experiencia, analizar navegación y personalizar contenido.
                          <a href="/politica-cookies" style="color: #60a5fa; text-decoration: none; font-weight: 600; margin-left: 0.25rem; transition: color 0.2s;" onmouseover="this.style.color='#93c5fd'" onmouseout="this.style.color='#60a5fa'">
                            Ver política →
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <!-- Botones -->
                    <div class="cookie-buttons" style="display: flex; gap: 0.75rem; flex-shrink: 0;">
                      <button 
                        id="cookie-reject" 
                        class="btn-reject"
                        style="padding: 0.75rem 1.5rem; background: transparent; color: #d4d4d8; border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px; cursor: pointer; font-weight: 600; font-size: 0.875rem; transition: all 0.2s; white-space: nowrap;"
                      >
                        Rechazar
                      </button>
                      <button 
                        id="cookie-accept" 
                        class="btn-accept"
                        style="padding: 0.75rem 1.5rem; background: linear-gradient(to right, #2563eb, #0891b2); color: white; border: none; border-radius: 12px; cursor: pointer; font-weight: 700; font-size: 0.875rem; transition: all 0.2s; box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.2); white-space: nowrap;"
                      >
                        ✓ Aceptar
                      </button>
                    </div>
                  </div>
                </div>
              \`;
              
              document.body.appendChild(banner);
              
              document.getElementById('cookie-accept').addEventListener('click', () => {
                localStorage.setItem('cookie-consent', 'accepted');
                localStorage.setItem('cookie-consent-date', new Date().toISOString());
                
                // Animación de salida
                banner.style.animation = 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse';
                setTimeout(() => banner.remove(), 300);
                
                // Actualizar consentimiento
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
                
                // Animación de salida
                banner.style.animation = 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse';
                setTimeout(() => banner.remove(), 300);
                
                // Denegar tracking
                if (window.gtag) {
                  window.gtag('consent', 'update', {
                    'analytics_storage': 'denied',
                    'ad_storage': 'denied'
                  });
                }
              });
            } else if (consent === 'accepted') {
              // Restaurar consentimiento en carga
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