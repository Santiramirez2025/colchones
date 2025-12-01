'use client'

import { formatPrecioContado, getMejorCuota } from '@/lib/utils/pricing'

interface PriceDisplayProps {
  precioBase: number
  showCuotas?: boolean
  variant?: 'default' | 'compact' | 'large'
  className?: string
}

export default function PriceDisplay({ 
  precioBase, 
  showCuotas = true,
  variant = 'default',
  className = ''
}: PriceDisplayProps) {
  const mejorCuota = getMejorCuota(precioBase)

  if (variant === 'compact') {
    return (
      <div className={className}>
        <div className="text-white font-black text-2xl">
          {formatPrecioContado(precioBase)}
        </div>
        {showCuotas && (
          <div className="text-violet-400 text-sm mt-1">
            {mejorCuota.cuotas}x {mejorCuota.formatted.precioCuota}
          </div>
        )}
      </div>
    )
  }

  if (variant === 'large') {
    return (
      <div className={className}>
        <div className="text-emerald-400 text-sm font-semibold mb-2">
          CONTADO / TRANSFERENCIA
        </div>
        <div className="text-white font-black text-5xl md:text-6xl mb-3">
          {formatPrecioContado(precioBase)}
        </div>
        {showCuotas && (
          <div className="text-zinc-400 text-lg">
            o hasta <span className="text-violet-400 font-bold">
              {mejorCuota.cuotas} cuotas de {mejorCuota.formatted.precioCuota}
            </span>
          </div>
        )}
      </div>
    )
  }

  // Default
  return (
    <div className={className}>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-white font-black text-4xl">
          {formatPrecioContado(precioBase)}
        </span>
        <span className="text-emerald-400 text-sm font-semibold">
          CONTADO
        </span>
      </div>
      {showCuotas && (
        <div className="text-zinc-300 text-base">
          Hasta <span className="text-violet-400 font-bold">
            {mejorCuota.cuotas} cuotas de {mejorCuota.formatted.precioCuota}
          </span>
        </div>
      )}
    </div>
  )
}