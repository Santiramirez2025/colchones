// app/catalogo/components/CategoryTabs.tsx
'use client'

import { motion } from 'framer-motion'

type Category = {
  id: string
  name: string
  icon: string
  count: number
}

interface CategoryTabsProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  // Safety check
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="w-full">
      {/* Mobile: Horizontal scroll */}
      <div className="block lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-2 pb-2">
          {categories.map((category) => {
            const isActive = activeCategory === category.id
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`
                  relative flex-shrink-0 px-4 py-2 rounded-lg font-semibold text-sm
                  transition-all duration-200 whitespace-nowrap
                  ${isActive 
                    ? 'bg-zinc-900 text-white shadow-lg' 
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                  <span className={`
                    text-xs px-1.5 py-0.5 rounded-full font-bold
                    ${isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-zinc-200 text-zinc-600'
                    }
                  `}>
                    {category.count}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Desktop: Centered tabs con animación */}
      <div className="hidden lg:block">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => {
            const isActive = activeCategory === category.id
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`
                  relative px-5 py-2.5 rounded-lg font-semibold transition-all duration-200
                  ${isActive 
                    ? 'text-white shadow-lg' 
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }
                `}
              >
                {/* Active background with animation */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryTab"
                    className="absolute inset-0 bg-zinc-900 rounded-lg"
                    transition={{ 
                      type: "spring", 
                      bounce: 0.15, 
                      duration: 0.5 
                    }}
                  />
                )}
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                  <span className={`
                    text-xs px-2 py-0.5 rounded-full font-bold
                    ${isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-zinc-200 text-zinc-600'
                    }
                  `}>
                    {category.count}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Scrollbar hide utility for mobile */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}