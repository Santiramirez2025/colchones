'use client'

import { useState } from 'react'
import { Cookie, Shield, BarChart3, Target, Check, Save } from 'lucide-react'

export default function CookiesPage() {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  })

  const cookieTypes = [
    {
      id: 'essential',
      icon: Shield,
      title: 'Cookies Esenciales',
      description: 'Necesarias para el funcionamiento básico del sitio',
      items: ['Cookies de sesión', 'Carrito de compras', 'Preferencias de usuario'],
      required: true,
      color: 'emerald'
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: 'Cookies Analíticas',
      description: 'Nos ayudan a entender cómo interactúas con nuestra web',
      items: ['Google Analytics', 'Métricas de rendimiento'],
      required: false,
      color: 'cyan'
    },
    {
      id: 'marketing',
      icon: Target,
      title: 'Cookies de Marketing',
      description: 'Para mostrar anuncios relevantes',
      items: ['Meta Pixel', 'Google Ads', 'Remarketing'],
      required: false,
      color: 'violet'
    }
  ]

  const handleSave = () => {
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences))
    // Toast notification
    const toast = document.createElement('div')
    toast.className = 'fixed top-24 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-2xl z-50 flex items-center gap-2'
    toast.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> Preferencias guardadas correctamente'
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl mb-6 border border-amber-500/30">
            <Cookie className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Política de Cookies
          </h1>
          <p className="text-zinc-400 mb-4">Última actualización: Octubre 2025</p>
          <p className="text-zinc-300 max-w-2xl mx-auto text-sm">
            Las cookies son pequeños archivos que se almacenan en tu dispositivo para mejorar tu experiencia y entender cómo utilizas nuestra web.
          </p>
        </div>

        {/* Cookie Types Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {cookieTypes.map((cookie) => (
            <div 
              key={cookie.id}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${cookie.color}-500/10 rounded-xl flex items-center justify-center`}>
                  <cookie.icon className={`w-6 h-6 text-${cookie.color}-400`} />
                </div>
                {cookie.required && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg font-bold">
                    Requerida
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{cookie.title}</h3>
              <p className="text-sm text-zinc-400 mb-4">{cookie.description}</p>
              
              <ul className="space-y-1.5">
                {cookie.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-500">
                    <span className="text-amber-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Preferences Manager */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <Save className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Gestiona tus preferencias</h2>
          </div>

          <div className="space-y-4 mb-6">
            {cookieTypes.map((cookie) => (
              <div 
                key={cookie.id}
                className="flex items-center justify-between p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <cookie.icon className={`w-6 h-6 text-${cookie.color}-400`} />
                  <div>
                    <h3 className="font-bold text-white text-sm">{cookie.title}</h3>
                    <p className="text-xs text-zinc-400">{cookie.description}</p>
                  </div>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer ml-4">
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
                      ? 'peer-checked:bg-emerald-500'
                      : ''
                  } ${cookie.required ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                </label>
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Guardar preferencias
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500">
            Puedes cambiar tus preferencias en cualquier momento volviendo a esta página
          </p>
        </div>
      </div>
    </div>
  )
}