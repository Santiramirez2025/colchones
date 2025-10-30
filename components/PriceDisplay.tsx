'use client'

interface PriceDisplayProps {
  monthly: number
  months?: number
  original: number
  current: number
  discount?: number
  className?: string
}

export function PriceDisplay({ 
  monthly, 
  months = 12, 
  original, 
  current,
  className = ''
}: PriceDisplayProps) {
  return (
    <div className={`inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 backdrop-blur-xl border border-emerald-500/20 px-6 py-4 rounded-2xl ${className}`}>
      <div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl md:text-4xl font-black text-white">
            {monthly}€
          </span>
          <span className="text-lg text-zinc-400">/mes</span>
        </div>
        <p className="text-xs text-emerald-400 font-semibold mt-1">
          Financiación 0% · Sin intereses · {months} meses
        </p>
      </div>
      <div className="hidden sm:block h-10 w-px bg-white/10" />
      <div className="text-sm text-zinc-400">
        <p className="line-through text-zinc-500">{original}€</p>
        <p className="text-white font-bold">Desde {current}€</p>
      </div>
    </div>
  )
}