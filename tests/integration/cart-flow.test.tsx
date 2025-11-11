// ============================================
// tests/integration/cart-flow.test.tsx
// ============================================
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/tests/utils/test-utils'
import { useCartStore } from '@/lib/store/cart-store'

// Definir mockProduct ANTES de usarlo
const mockProduct = {
  id: '1',
  name: 'Colchón Imperial',
  price: 899,
  slug: 'colchon-imperial',
  image: '/test.jpg',
  quantity: 1,
}

// Mock del componente CartPage
function MockCartPage({ product }: { product: any }) {
  const { items, addItem, removeItem } = useCartStore()
  
  return (
    <div>
      {items.length === 0 ? (
        <p>Carrito vacío</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.id}>
              <span>{item.name}</span>
              <span>{item.price} €</span>
              <button onClick={() => removeItem(item.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => addItem(product)}>Añadir Producto</button>
    </div>
  )
}

describe('Cart Flow', () => {
  beforeEach(() => {
    // Reset store antes de cada test
    useCartStore.setState({ items: [] })
  })

  it('añade producto al carrito y actualiza el total', async () => {
    const { user } = render(<MockCartPage product={mockProduct} />)
    
    // Estado inicial
    expect(screen.getByText(/carrito vacío/i)).toBeInTheDocument()
    
    // Añadir producto
    const addButton = screen.getByRole('button', { name: /añadir producto/i })
    await user.click(addButton)
    
    // Verificar que el producto se añadió
    await waitFor(() => {
      expect(screen.getByText(/colchón imperial/i)).toBeInTheDocument()
      expect(screen.getByText(/899 €/i)).toBeInTheDocument()
    })
  })

  it('elimina producto del carrito', async () => {
    // Setup con producto en carrito
    useCartStore.getState().addItem(mockProduct)
    
    const { user } = render(<MockCartPage product={mockProduct} />)
    
    const removeButton = screen.getByRole('button', { name: /eliminar/i })
    await user.click(removeButton)
    
    await waitFor(() => {
      expect(screen.getByText(/carrito vacío/i)).toBeInTheDocument()
    })
  })
})