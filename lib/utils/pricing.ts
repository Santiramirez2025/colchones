// lib/utils/pricing.ts - Sistema de Precios con Cuotas Argentina
import { formatARS } from './currency'

/**
 * Configuración de recargos por cuotas
 * Estos porcentajes se pueden cambiar fácilmente
 */
export const CUOTAS_CONFIG = {
  3: { recargo: 0.20, label: '3 cuotas' },   // +20%
  6: { recargo: 0.31, label: '6 cuotas' },   // +31%
  9: { recargo: 0.44, label: '9 cuotas' },   // +44%
  12: { recargo: 0.60, label: '12 cuotas' }, // +60%
} as const

export type CuotasOption = keyof typeof CUOTAS_CONFIG

/**
 * Interfaz para resultado de cálculo de cuotas
 */
export interface CuotaCalculation {
  cuotas: number
  precioTotal: number
  precioCuota: number
  recargo: number
  recargoPercentage: number
  label: string
  formatted: {
    precioTotal: string
    precioCuota: string
    recargo: string
  }
}

/**
 * Calcula el precio con recargo para N cuotas
 */
export function calcularPrecioCuotas(
  precioBase: number,
  cuotas: CuotasOption
): CuotaCalculation {
  const config = CUOTAS_CONFIG[cuotas]
  const recargo = precioBase * config.recargo
  const precioTotal = precioBase + recargo
  const precioCuota = precioTotal / cuotas

  return {
    cuotas,
    precioTotal,
    precioCuota,
    recargo,
    recargoPercentage: config.recargo * 100,
    label: config.label,
    formatted: {
      precioTotal: formatARS(precioTotal),
      precioCuota: formatARS(precioCuota),
      recargo: formatARS(recargo),
    }
  }
}

/**
 * Calcula todas las opciones de cuotas disponibles
 */
export function calcularTodasLasCuotas(precioBase: number): CuotaCalculation[] {
  return Object.keys(CUOTAS_CONFIG).map(cuotas => 
    calcularPrecioCuotas(precioBase, Number(cuotas) as CuotasOption)
  )
}

/**
 * Obtiene la mejor opción (12 cuotas para marketing)
 */
export function getMejorCuota(precioBase: number): CuotaCalculation {
  return calcularPrecioCuotas(precioBase, 12)
}

/**
 * Formatea precio de contado (sin recargo)
 */
export function formatPrecioContado(precio: number): string {
  return formatARS(precio)
}

/**
 * Genera texto promocional
 */
export function getTextoPromocional(precioBase: number): string {
  const mejor = getMejorCuota(precioBase)
  return `Hasta ${mejor.cuotas} cuotas de ${mejor.formatted.precioCuota}`
}