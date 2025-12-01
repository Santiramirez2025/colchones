// lib/utils/currency.ts - ARGENTINA - PESOS ENTEROS
/**
 * IMPORTANTE: Todos los precios en la DB están en PESOS ENTEROS
 * Ejemplo: price: 210000 = $210.000
 */

/**
 * Formatear precio en pesos argentinos
 * @param pesos - Precio en pesos enteros (210000)
 * @returns String formateado "$210.000"
 */
export function formatARS(pesos: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(pesos)
  }
  
  /**
   * Formatear número sin símbolo de moneda
   * @param value - Número a formatear
   * @returns String formateado "210.000"
   */
  export function formatNumber(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }
  
  /**
   * Parsear string de precio a número
   * @param value - String "$210.000" o "210.000"
   * @returns Número 210000
   */
  export function parseARS(value: string): number {
    return Number(value.replace(/\./g, '').replace(/[^0-9]/g, ''))
  }
  
  /**
   * Calcular porcentaje de descuento
   * @param original - Precio original
   * @param current - Precio actual
   * @returns Porcentaje de descuento
   */
  export function calculateDiscount(original: number, current: number): number {
    if (!original || original <= current) return 0
    return Math.round(((original - current) / original) * 100)
  }
  
  /**
   * Formatear rango de precios
   * @param min - Precio mínimo
   * @param max - Precio máximo
   * @returns String "Desde $210.000" o "$210.000 - $305.000"
   */
  export function formatPriceRange(min: number, max?: number): string {
    if (!max || min === max) {
      return `Desde ${formatARS(min)}`
    }
    return `${formatARS(min)} - ${formatARS(max)}`
  }
  
  // ============================================================================
  // ❌ FUNCIONES DE CENTAVOS - NO USAR
  // ============================================================================
  // Si por alguna razón necesitás trabajar con centavos en el futuro:
  
  /**
   * @deprecated NO USAR - Los precios están en pesos enteros
   * Convertir centavos a pesos (solo si migrás a centavos)
   */
  export function centavosToARS(centavos: number): number {
    return centavos / 100
  }
  
  /**
   * @deprecated NO USAR - Los precios están en pesos enteros
   * Convertir pesos a centavos (solo si migrás a centavos)
   */
  export function arsToCentavos(pesos: number): number {
    return Math.round(pesos * 100)
  }
  
  // ============================================================================
  // EJEMPLOS DE USO
  // ============================================================================
  /*
  const price = 210000 // DB value
  
  formatARS(210000)                    → "$210.000"
  formatARS(165000)                    → "$165.000"
  formatNumber(210000)                 → "210.000"
  parseARS("$210.000")                 → 210000
  calculateDiscount(260000, 210000)    → 19
  formatPriceRange(165000, 305000)     → "$165.000 - $305.000"
  */