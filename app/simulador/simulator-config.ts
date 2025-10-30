// app/simulador/simulator-config.ts
import { Moon, Bed, Weight, Activity, Euro, TrendingUp, Package, Sparkles, Award, Shield } from 'lucide-react'

export const SIMULATOR_STEPS = [
  {
    id: 1,
    title: '¿Cuál es tu posición preferida para dormir?',
    subtitle: 'Esto determina la distribución de presión ideal',
    options: [
      { value: 'side', label: 'De lado', icon: Moon, desc: 'Necesitas adaptabilidad', gradient: 'from-blue-500 to-cyan-500' },
      { value: 'back', label: 'Boca arriba', icon: Bed, desc: 'Balance perfecto', gradient: 'from-purple-500 to-pink-500' },
      { value: 'stomach', label: 'Boca abajo', icon: Activity, desc: 'Firmeza extra', gradient: 'from-orange-500 to-red-500' },
      { value: 'mixed', label: 'Varía', icon: TrendingUp, desc: 'Versatilidad', gradient: 'from-green-500 to-emerald-500' }
    ],
    key: 'position' as const
  },
  {
    id: 2,
    title: '¿Cuál es tu peso aproximado?',
    subtitle: 'Para calcular el soporte óptimo',
    options: [
      { value: 'light', label: 'Menos de 60kg', icon: Weight, desc: 'Suavidad ideal', gradient: 'from-cyan-500 to-blue-500' },
      { value: 'medium', label: '60-90kg', icon: Activity, desc: 'Balance perfecto', gradient: 'from-purple-500 to-pink-500' },
      { value: 'heavy', label: 'Más de 90kg', icon: Shield, desc: 'Soporte reforzado', gradient: 'from-orange-500 to-red-500' }
    ],
    key: 'weight' as const
  },
  {
    id: 3,
    title: '¿Qué firmeza prefieres?',
    subtitle: 'Tu confort personal es clave',
    options: [
      { value: 'soft', label: 'Suave', icon: Moon, desc: 'Sensación envolvente', gradient: 'from-blue-400 to-cyan-400' },
      { value: 'medium', label: 'Media', icon: Award, desc: 'Lo más popular', gradient: 'from-purple-500 to-pink-500' },
      { value: 'firm', label: 'Firme', icon: Shield, desc: 'Máximo soporte', gradient: 'from-gray-600 to-gray-800' }
    ],
    key: 'firmness' as const
  },
  {
    id: 4,
    title: '¿Cuál es tu presupuesto?',
    subtitle: 'Calidad premium en todos los rangos',
    options: [
      { value: 'economic', label: 'Hasta 500€', icon: Euro, desc: 'Calidad accesible', gradient: 'from-green-500 to-emerald-500' },
      { value: 'standard', label: '500-1000€', icon: Package, desc: 'Mejor relación', gradient: 'from-purple-500 to-pink-500' },
      { value: 'premium', label: 'Más de 1000€', icon: Sparkles, desc: 'Tecnología top', gradient: 'from-yellow-500 to-orange-500' }
    ],
    key: 'budget' as const
  }
]