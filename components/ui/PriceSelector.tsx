'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, DollarSign, Percent, Check } from 'lucide-react'
import { 
  calcularTodasLasCuotas, 
  formatPrecioContado,
  type CuotaCalculation 
} from '@/lib/utils/pricing'

interface PriceSelectorProps {
  precioBase: number
  className?: string
  onSelect?: (option: 'contado' | CuotaCalculation) => void
}

export default function PriceSelector({ 
  precioBase, 
  className = '',
  onSelect 
}: PriceSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<'contado' | number>('contado')
  const cuotasOptions = calcularTodasLasCuotas(precioBase)

  const handleSelect = (option: 'contado' | number) => {
    setSelectedOption(option)
    if (onSelect) {
      if (option === 'contado') {
        onSelect('contado')
      } else {
        const cuotaData = cuotasOptions.find(c => c.cuotas === option)
        if (cuotaData) onSelect(cuotaData)
      }
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Precio de Contado */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleSelect('contado')}
        className={`w-full p-4 md:p-6 rounded-2xl border-2 transition-all ${
          selectedOption === 'contado'
            ? 'border-emerald-500 bg-emerald-500/10'
            : 'border-white/10 hover:border-white/20 bg-white/5'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              selectedOption === 'contado'
                ? 'bg-emerald-500'
                : 'bg-white/10'
            }`}>
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg mb-1">
                Contado / Transferencia / Débito
              </div>
              <div className="text-emerald-400 font-black text-2xl md:text-3xl">
                {formatPrecioContado(precioBase)}
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                Crédito en 1 pago también
              </div>
            </div>
          </div>
          {selectedOption === 'contado' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center"
            >
              <Check className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </div>
      </motion.button>

      {/* Separador */}
      <div className="flex items-center gap-3">
        <div className="h-px bg-white/10 flex-1" />
        <span className="text-zinc-500 text-sm font-semibold">O pagá en cuotas</span>
        <div className="h-px bg-white/10 flex-1" />
      </div>

      {/* Opciones de Cuotas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cuotasOptions.map((option, index) => (
          <motion.button
            key={option.cuotas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(option.cuotas)}
            className={`p-4 rounded-xl border-2 transition-all relative overflow-hidden ${
              selectedOption === option.cuotas
                ? 'border-violet-500 bg-violet-500/10'
                : 'border-white/10 hover:border-white/20 bg-white/5'
            }`}
          >
            {/* Badge de recargo */}
            <div className="absolute top-2 right-2 bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
              +{option.recargoPercentage}%
            </div>

            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                selectedOption === option.cuotas
                  ? 'bg-violet-500'
                  : 'bg-white/10'
              }`}>
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              
              <div className="text-left flex-1">
                <div className="text-white font-bold text-base mb-1">
                  {option.label}
                </div>
                <div className="text-violet-400 font-black text-xl">
                  {option.formatted.precioCuota}
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  Total: {option.formatted.precioTotal}
                </div>
              </div>

              {selectedOption === option.cuotas && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Info adicional */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Percent className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-300">
            <span className="font-semibold">Tip:</span> Pagando en efectivo/transferencia ahorrás hasta{' '}
            <span className="font-bold">{formatPrecioContado(precioBase * 0.60)}</span> vs 12 cuotas
          </div>
        </div>
      </div>
    </div>
  )
}