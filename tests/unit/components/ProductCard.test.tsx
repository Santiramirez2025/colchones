// tests/unit/components/ProductCard.test.tsx
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../utils/test-utils'
import ProductCard from '@/components/ui/ProductCard'

const mockProduct = {
  id: 1,
  name: 'Colchón Premium',
  slug: 'colchon-premium',
  price: 899,
  image: '/images/colchon.jpg',
  rating: 4.8,
  reviews: 120,
  features: ['Firmeza media', 'Memory foam', 'Transpirable']
}

describe('ProductCard Component', () => {
  it('renderiza la información del producto correctamente', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Colchón Premium')).toBeInTheDocument()
  })

  it('muestra el precio del producto', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('899€')).toBeInTheDocument()
  })

  it('renderiza la imagen del producto', () => {
    const { container } = renderWithProviders(<ProductCard product={mockProduct} />)
    
    // Verifica que existe el contenedor de la imagen
    const imageContainer = container.querySelector('.relative.h-64')
    expect(imageContainer).toBeInTheDocument()
  })
})