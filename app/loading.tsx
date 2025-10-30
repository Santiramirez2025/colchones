'use client'

import { useEffect, useState } from 'react'

export default function Loading() {
  const [dots, setDots] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100"
      role="status"
      aria-live="polite"
      aria-label="Cargando contenido"
    >
      <div className="text-center px-4">
        {/* ✅ Animación CSS pura - Sin Framer Motion (ahorra 50KB) */}
        <div className="relative inline-block mb-6">
          <div className="text-7xl animate-pulse-scale">
            🛏️
          </div>
          {/* Círculo decorativo con animación CSS */}
          <div className="absolute inset-0 -z-10">
            <div className="w-24 h-24 bg-indigo-100 rounded-full animate-ping opacity-20" />
          </div>
        </div>
        
        {/* ✅ Título descriptivo y optimizado */}
        <h1 className="text-3xl font-bold text-zinc-900 mb-3">
          Cargando tu tienda de colchones{'.'.repeat(dots)}
        </h1>
        
        {/* ✅ Mensaje descriptivo para SEO */}
        <p className="text-zinc-600 text-lg max-w-md mx-auto mb-8">
          Preparando los mejores colchones viscoelásticos premium para tu descanso
        </p>

        {/* ✅ Loading dots - Pure CSS animation */}
        <div className="flex gap-2 justify-center" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: '0.8s'
              }}
            />
          ))}
        </div>

        {/* ✅ Progress bar visual (opcional) */}
        <div className="mt-8 w-64 mx-auto">
          <div className="h-1.5 bg-zinc-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-loading-bar" />
          </div>
        </div>

        {/* ✅ Mensaje de accesibilidad oculto visualmente pero accesible */}
        <span className="sr-only">
          Cargando página de Tienda Colchón. Por favor espere un momento.
        </span>
      </div>

      {/* ✅ Inline CSS animations para evitar dependencias externas */}
      <style jsx>{`
        @keyframes pulse-scale {
          0%, 100% { 
            transform: scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1.1); 
            opacity: 0.8; 
          }
        }

        @keyframes loading-bar {
          0% { 
            transform: translateX(-100%); 
          }
          100% { 
            transform: translateX(400%); 
          }
        }

        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }

        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }

        /* Reduce motion para accesibilidad */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-scale,
          .animate-bounce,
          .animate-loading-bar,
          .animate-ping {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}