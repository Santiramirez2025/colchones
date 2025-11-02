// ============================================
// app/producto/[slug]/product-error.tsx
// ============================================
'use client'

import Link from 'next/link'
import { AlertTriangle, Home, Search, RefreshCw } from 'lucide-react'

interface ProductErrorProps {
  error?: Error
  reset?: () => void
}

export default function ProductError({ error, reset }: ProductErrorProps = {}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full blur-xl opacity-50"></div>
              <div className="relative bg-white rounded-full p-6 shadow-lg">
                <AlertTriangle className="w-16 h-16 text-red-500" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Ups! Algo salió mal
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8">
            No pudimos cargar este producto. Esto puede deberse a un problema temporal 
            o a que el producto ya no está disponible.
          </p>

          {/* Error details (only in development) */}
          {process.env.NODE_ENV === 'development' && error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <p className="text-sm font-mono text-red-800 break-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {reset && (
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Intentar de nuevo
              </button>
            )}
            
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
            >
              <Search className="w-5 h-5" />
              Ver todos los productos
            </Link>
            
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
            >
              <Home className="w-5 h-5" />
              Volver al inicio
            </Link>
          </div>

          {/* Help text */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              ¿Necesitas ayuda?{' '}
              <Link href="/contacto" className="text-blue-600 hover:text-blue-700 font-medium">
                Contáctanos
              </Link>
              {' '}o llama al{' '}
              <a href="tel:+34900123456" className="text-blue-600 hover:text-blue-700 font-medium">
                900 123 456
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}