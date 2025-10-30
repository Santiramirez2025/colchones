'use client'

import { useState, useEffect } from 'react'

export function useMousePosition(enabled: boolean = true) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    if (!enabled) return
    
    // Solo ejecutar en desktop
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    if (!isDesktop) return
    
    let timeoutId: NodeJS.Timeout
    
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId)
      // Throttle a ~60fps
      timeoutId = setTimeout(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      }, 16)
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeoutId)
    }
  }, [enabled])
  
  return position
}