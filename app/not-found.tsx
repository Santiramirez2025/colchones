'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-50 via-white to-accent-lavender">
      <div className="container-custom text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-9xl mb-8">😴</div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-primary-600 mb-4">
            404
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¡Ups! Esta página está durmiendo
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Parece que la página que buscas no existe o ha sido movida. 
            Pero no te preocupes, ¡podemos ayudarte a encontrar lo que necesitas!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Volver al inicio
              </motion.button>
            </Link>
            
            <Link href="/catalogo">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Explorar productos
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
