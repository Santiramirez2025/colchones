// lib/utils/parse-product.ts

/**
 * ⚡ Helper para parsear campos JSON almacenados como strings en SQLite
 * 
 * Maneja de forma segura:
 * - Arrays que ya vienen parseados
 * - Strings JSON válidos
 * - Valores inválidos o null
 */
export function parseJsonField<T = any>(field: any): T[] {
    // Si ya es un array, retornarlo directamente
    if (Array.isArray(field)) {
      return field
    }
    
    // Si es un string, intentar parsearlo
    if (typeof field === 'string') {
      try {
        const parsed = JSON.parse(field)
        return Array.isArray(parsed) ? parsed : []
      } catch (error) {
        console.warn('Error parsing JSON field:', error)
        return []
      }
    }
    
    // En cualquier otro caso, retornar array vacío
    return []
  }
  
  /**
   * ⚡ Helper para serializar arrays a JSON string para SQLite
   * 
   * Útil cuando necesites guardar datos en la BD
   */
  export function stringifyJsonField<T = any>(data: T[]): string {
    try {
      return JSON.stringify(data)
    } catch (error) {
      console.error('Error stringifying JSON field:', error)
      return '[]'
    }
  }
  
  /**
   * ⚡ Validar que un campo JSON tenga el formato correcto
   */
  export function isValidJsonArray(field: any): boolean {
    try {
      const parsed = typeof field === 'string' ? JSON.parse(field) : field
      return Array.isArray(parsed)
    } catch {
      return false
    }
  }