'use client'

import { useRef, useState, useEffect } from 'react'

interface UseInViewOnceOptions {
  threshold?: number
  rootMargin?: string
}

export function useInViewOnce(options: UseInViewOnceOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)
          // Desconectar después de la primera vista para mejor performance
          if (ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '0px',
      }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => {
      observer.disconnect()
    }
  }, [isInView, options.threshold, options.rootMargin])
  
  return [ref, isInView] as const
}