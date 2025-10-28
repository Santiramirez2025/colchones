'use client'

import { useState } from 'react'

export default function CookiesPage() {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  })

  const handleSave = () => {
    // Guardar preferencias en localStorage
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences))
    alert('Preferencias guardadas correctamente')
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          Política de Cookies
        </h1>

        <div className="prose prose-lg max-w-none space-y-8 mb-12">
          <p className="text-gray-600">
            Última actualización: Octubre 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold mb-4">¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo 
              cuando visitas nuestro sitio web. Nos ayudan a mejorar tu experiencia y 
              entender cómo utilizas nuestra web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Tipos de cookies que utilizamos</h2>
            
            <h3 className="text-xl font-bold mt-6 mb-2">Cookies Esenciales</h3>
            <p>
              Necesarias para el funcionamiento básico del sitio. No pueden ser desactivadas.
            </p>
            <ul>
              <li>Cookies de sesión</li>
              <li>Carrito de compras</li>
              <li>Preferencias de usuario</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-2">Cookies Analíticas</h3>
            <p>
              Nos ayudan a entender cómo los visitantes interactúan con nuestra web.
            </p>
            <ul>
              <li>Google Analytics</li>
              <li>Métricas de rendimiento</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-2">Cookies de Marketing</h3>
            <p>
              Utilizadas para mostrar anuncios relevantes y medir su efectividad.
            </p>
            <ul>
              <li>Meta Pixel</li>
              <li>Google Ads</li>
              <li>Remarketing</li>
            </ul>
          </section>
        </div>

        {/* Cookie Preferences */}
        <div className="card bg-warm-50">
          <h2 className="text-2xl font-bold mb-6">
            Gestiona tus preferencias
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Cookies Esenciales</h3>
                <p className="text-sm text-gray-600">
                  Necesarias para el funcionamiento del sitio
                </p>
              </div>
              <div className="ml-4">
                <input
                  type="checkbox"
                  checked={preferences.essential}
                  disabled
                  className="w-5 h-5"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Cookies Analíticas</h3>
                <p className="text-sm text-gray-600">
                  Nos ayudan a mejorar nuestro sitio web
                </p>
              </div>
              <div className="ml-4">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({ ...preferences, analytics: e.target.checked })
                  }
                  className="w-5 h-5"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Cookies de Marketing</h3>
                <p className="text-sm text-gray-600">
                  Para anuncios personalizados
                </p>
              </div>
              <div className="ml-4">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({ ...preferences, marketing: e.target.checked })
                  }
                  className="w-5 h-5"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="btn-primary w-full mt-6"
          >
            Guardar preferencias
          </button>
        </div>
      </div>
    </div>
  )
}
