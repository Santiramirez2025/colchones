// app/producto/[slug]/components/Breadcrumbs.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbsProps {
  productName: string
}

export default function Breadcrumbs({ productName }: BreadcrumbsProps) {
  const breadcrumbs = [
    { name: 'Inicio', href: '/', current: false },
    { name: 'Catálogo', href: '/catalogo', current: false },
    { name: productName, href: '', current: true }
  ]

  return (
    <nav 
      aria-label="Breadcrumb"
      className="mb-6 md:mb-8 lg:mb-10"
    >
      <motion.ol 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex flex-wrap items-center gap-1.5 md:gap-2 text-sm"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {breadcrumbs.map((crumb, index) => (
          <li
            key={`breadcrumb-${index}-${crumb.name}`}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="flex items-center"
          >
            {/* Separador (excepto en el primer elemento) */}
            {index > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.2 }}
              >
                <ChevronRight 
                  className="w-4 h-4 text-zinc-700 mx-0.5" 
                  aria-hidden="true"
                />
              </motion.div>
            )}

            {crumb.current ? (
              /* Producto actual - sin enlace */
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 + 0.1, duration: 0.2 }}
                itemProp="name"
                aria-current="page"
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 text-white font-bold text-sm truncate max-w-[180px] sm:max-w-xs md:max-w-md"
              >
                {crumb.name}
              </motion.span>
            ) : (
              /* Inicio y Catálogo - con enlace */
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 + 0.1, duration: 0.2 }}
              >
                <Link
                  href={crumb.href}
                  itemProp="item"
                  className="group relative px-2.5 py-1.5 rounded-lg transition-all hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-950 flex items-center gap-1.5"
                  aria-label={index === 0 ? 'Volver a inicio' : `Ir a ${crumb.name}`}
                >
                  {/* Icono solo para Inicio */}
                  {index === 0 && (
                    <Home 
                      className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 transition-colors" 
                      aria-hidden="true" 
                    />
                  )}
                  
                  <span 
                    itemProp="name"
                    className={`relative z-10 text-zinc-400 group-hover:text-white font-medium transition-colors text-sm ${
                      index === 0 ? 'hidden sm:inline' : ''
                    }`}
                  >
                    {crumb.name}
                  </span>
                  
                  {/* Efecto de underline animado */}
                  <motion.span
                    className="absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            )}
            
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </motion.ol>

      {/* Indicador visual de profundidad */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="h-0.5 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-transparent rounded-full mt-3 origin-left"
        style={{ width: '60%' }}
        aria-hidden="true"
      />
    </nav>
  )
}