'use client'

import { useScroll, useSpring, useReducedMotion } from 'framer-motion'
import { ANIMATION_CONFIG } from '../constants'

export function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : ANIMATION_CONFIG.scroll.stiffness,
    damping: prefersReducedMotion ? 100 : ANIMATION_CONFIG.scroll.damping,
    restDelta: ANIMATION_CONFIG.scroll.restDelta
  })
  
  return { scrollYProgress, scaleX, prefersReducedMotion }
}