// app/producto/[slug]/components/ImageZoomer.tsx
'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface ImageZoomerProps {
  src: string;
  alt: string;
  zoomLevel?: number; // Nivel de ampliación (ej. 3x)
}

export default function ImageZoomer({ src, alt, zoomLevel = 3 }: ImageZoomerProps) {
  const [isZooming, setIsZooming] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    
    const rect = imageRef.current.getBoundingClientRect()
    
    // Calcula la posición del cursor (0 a 100%) dentro de la imagen
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setPosition({ x, y })
  }

  return (
    <div
      ref={imageRef}
      className="relative w-full h-full cursor-none overflow-hidden" 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsZooming(true)}
      onMouseLeave={() => setIsZooming(false)}
    >
      {/* 1. Imagen principal */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain" // Ajusta la imagen al contenedor
        priority
      />

      {/* 2. Lupa de Zoom (Ventana que muestra la ampliación) */}
      {isZooming && (
        <div
          style={{
            // La magia: usa la imagen como fondo, la amplía (zoomLevel), 
            // y la desplaza en dirección opuesta a la posición del cursor (position.x/y)
            backgroundImage: `url(${src})`,
            backgroundSize: `${zoomLevel * 100}% ${zoomLevel * 100}%`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            
            // Centra la lupa en la posición del cursor
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: `translate(-50%, -50%)`,
          }}
          className="absolute w-40 h-40 md:w-64 md:h-64 rounded-full border-4 border-white shadow-2xl pointer-events-none transition-all duration-75 ease-out"
        />
      )}
    </div>
  )
}