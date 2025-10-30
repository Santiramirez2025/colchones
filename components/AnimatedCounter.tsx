'use client'

import { useRef, useEffect } from 'react'
import { useMotionValue, useSpring, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  decimal?: boolean
  suffix?: string
}

export function AnimatedCounter({ value, decimal = false, suffix = '' }: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 })
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (nodeRef.current) {
        const displayValue = decimal 
          ? latest.toFixed(1)
          : Intl.NumberFormat('es-ES').format(Math.floor(latest))
        nodeRef.current.textContent = displayValue + suffix
      }
    })
    
    return () => unsubscribe()
  }, [springValue, decimal, suffix])

  return <span ref={nodeRef}>0{suffix}</span>
}