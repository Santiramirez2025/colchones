// hooks/use-debounce.ts
// O también puede estar en: lib/hooks/use-debounce.ts
// Dependiendo de tu estructura de carpetas

import { useState, useEffect } from 'react'

/**
 * Hook para hacer debounce de un valor
 * Útil para optimizar búsquedas en tiempo real
 * 
 * @param value - Valor a hacer debounce
 * @param delay - Retraso en milisegundos (default: 500ms)
 * @returns Valor con debounce aplicado
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState('')
 * const debouncedSearchTerm = useDebounce(searchTerm, 300)
 * 
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Realizar búsqueda
 *     searchProducts(debouncedSearchTerm)
 *   }
 * }, [debouncedSearchTerm])
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Crear timeout para actualizar el valor después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Limpiar timeout si el valor cambia antes de que se cumpla el delay
    // Esto es crucial para evitar múltiples búsquedas innecesarias
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// ALTERNATIVA: Si prefieres exportación default
// export default useDebounce