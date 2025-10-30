'use client'

import { motion } from 'framer-motion'
import { useScrollProgress } from '@/lib/hooks/useScrollProgress'

export function ScrollProgressBar() {
  const { scaleX } = useScrollProgress()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 origin-left z-50 shadow-lg shadow-violet-500/50"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}