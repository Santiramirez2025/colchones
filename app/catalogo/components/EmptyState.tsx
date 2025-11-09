// app/catalogo/components/EmptyState.tsx

import { AlertCircle, SlidersHorizontal, X } from 'lucide-react'

interface EmptyStateProps {
  onClearFilters: () => void
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-10 md:p-20 bg-gray-50 border border-gray-200 rounded-2xl text-center shadow-inner">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-2xl font-black text-gray-900 mb-2">
        ¡Vaya! No encontramos resultados 😔
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Parece que tu búsqueda o combinación de filtros es demasiado específica. Intenta reducir los criterios o limpiar todos los filtros.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onClearFilters}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg transition-colors"
        >
          <X className="w-5 h-5" />
          Limpiar todos los filtros
        </button>
        <button
          // Opción de abrir el drawer de nuevo si se necesita
          className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 font-bold rounded-xl flex items-center gap-2 hover:bg-gray-100 transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
          Ajustar filtros
        </button>
      </div>
    </div>
  )
}