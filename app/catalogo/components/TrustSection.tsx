// app/catalogo/components/TrustSection.tsx

import { Truck, Shield, Clock, Leaf, Lock } from 'lucide-react'

export default function TrustSection() {
  const trustPoints = [
    { icon: Truck, title: 'Envío y Devolución GRATIS', description: 'En toda España peninsular. Plazo de 24/48h.' },
    { icon: Shield, title: '3 Años de Garantía Premium', description: 'Doble de lo habitual sin letra pequeña.' },
    { icon: Clock, title: '100 Noches de Prueba', description: 'Pruébalo en casa sin compromiso alguno.' },
    { icon: Leaf, title: 'Materiales Certificados', description: 'Espumas y tejidos con sello Oeko-Tex Standard.' },
  ]
  
  return (
    <section className="py-16 md:py-24 bg-indigo-50/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-12">
          💤 Dormir con Total Confianza
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((point, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <point.icon className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{point.title}</h3>
              <p className="text-gray-600 text-sm">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}