'use client'

import { useState } from 'react'
import { Cookie, Shield, BarChart3, Check, Info } from 'lucide-react'

export default function CookiesPage() {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    try {
      localStorage.setItem('cookie-preferences', JSON.stringify(preferences))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving preferences:', error)
    }
  }

  const cookieTypes = [
    {
      id: 'essential',
      icon: Shield,
      title: 'Cookies Esenciales',
      description: 'Necesarias para que el sitio funcione correctamente. No se pueden desactivar.',
      examples: ['Carrito de compras', 'Inicio de sesión', 'Preferencias del sitio'],
      required: true
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: 'Cookies Analíticas',
      description: 'Nos ayudan a entender cómo usás el sitio para mejorarlo.',
      examples: ['Google Analytics', 'Estadísticas de navegación'],
      required: false
    }
  ]

  return (
    <div className="min-h-screen w-full bg-zinc-950 overflow-x-hidden antialiased">
      {/* Hero Section */}
      <section className="w-full border-b border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl mb-6">
              <Cookie className="w-8 h-8 md:w-10 md:h-10 text-zinc-300" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Política de Cookies
            </h1>
            <p className="text-lg text-zinc-400 mb-6">
              Simple y transparente: así usamos cookies en Azul Colchones
            </p>
            <p className="text-sm text-zinc-500">
              Última actualización: Noviembre 2024
            </p>
          </div>
        </div>
      </section>

      {/* What are Cookies */}
      <section className="w-full">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-zinc-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Info className="w-6 h-6 text-zinc-300" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    ¿Qué son las cookies?
                  </h2>
                </div>
              </div>
              <p className="text-zinc-300 leading-relaxed mb-4">
                Las cookies son pequeños archivos de texto que se guardan en tu dispositivo cuando visitás nuestro sitio web. 
                Nos ayudan a recordar tus preferencias y mejorar tu experiencia de navegación.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                En Azul Colchones usamos cookies solo cuando es necesario y siempre respetando tu privacidad 
                de acuerdo con la Ley 25.326 de Protección de Datos Personales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              Tipos de cookies que usamos
            </h2>

            <div className="space-y-6 mb-12">
              {cookieTypes.map((cookie) => (
                <div 
                  key={cookie.id}
                  className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-zinc-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <cookie.icon className="w-6 h-6 text-zinc-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{cookie.title}</h3>
                        {cookie.required && (
                          <span className="text-xs bg-zinc-700/50 text-zinc-300 px-3 py-1 rounded-full font-semibold">
                            Obligatoria
                          </span>
                        )}
                      </div>
                      <p className="text-zinc-300 mb-4 leading-relaxed">
                        {cookie.description}
                      </p>
                      <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4">
                        <p className="text-sm font-semibold text-white mb-2">Ejemplos:</p>
                        <ul className="space-y-1">
                          {cookie.examples.map((example, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                              <span className="text-zinc-600 mt-1">•</span>
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Preferences Manager */}
            <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                Gestioná tus preferencias
              </h3>

              {saved && (
                <div className="mb-6 bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4 flex items-center gap-3">
                  <Check className="w-6 h-6 text-zinc-300 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">¡Preferencias guardadas!</p>
                    <p className="text-zinc-400 text-sm">Tus cambios se aplicaron correctamente</p>
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-6">
                {cookieTypes.map((cookie) => (
                  <div 
                    key={cookie.id}
                    className="flex items-center justify-between p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <cookie.icon className="w-5 h-5 text-zinc-400" />
                      <div>
                        <h4 className="font-semibold text-white text-sm">{cookie.title}</h4>
                        <p className="text-xs text-zinc-500">{cookie.required ? 'Siempre activa' : 'Opcional'}</p>
                      </div>
                    </div>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences[cookie.id as keyof typeof preferences]}
                        disabled={cookie.required}
                        onChange={(e) =>
                          setPreferences({ ...preferences, [cookie.id]: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                        preferences[cookie.id as keyof typeof preferences]
                          ? 'peer-checked:bg-zinc-600'
                          : ''
                      } ${cookie.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}></div>
                    </label>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-zinc-700 hover:bg-zinc-600 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Guardar preferencias
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Cómo controlar las cookies
              </h3>
              <div className="space-y-4 text-sm text-zinc-300">
                <p className="leading-relaxed">
                  <strong className="text-white">Desde tu navegador:</strong> Podés configurar tu navegador para que rechace todas las cookies o te avise cuando se envíe una. Sin embargo, algunas funciones del sitio pueden no funcionar correctamente.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white">Desde esta página:</strong> Usá el gestor de preferencias arriba para elegir qué cookies querés permitir.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white">Duración:</strong> Las cookies esenciales duran solo durante tu sesión. Las cookies analíticas pueden durar hasta 2 años para ayudarnos a entender patrones de uso a largo plazo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="w-full border-t border-zinc-800/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-zinc-400">
              Podés cambiar tus preferencias en cualquier momento volviendo a esta página
            </p>
            <p className="text-xs text-zinc-600">
              Esta política cumple con la Ley 25.326 de Protección de Datos Personales de Argentina
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}