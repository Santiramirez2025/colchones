// ============================================
// tests/integration/api/products.test.ts
// ============================================
import { describe, it, expect } from 'vitest'
import { GET } from '@/app/api/products/route'

describe('/api/products', () => {
  it('retorna lista de productos', async () => {
    const request = new Request('http://localhost:3000/api/products')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })

  it('productos tienen la estructura correcta', async () => {
    const request = new Request('http://localhost:3000/api/products')
    const response = await GET(request)
    const data = await response.json()

    if (data.length > 0) {
      const product = data[0]
      expect(product).toHaveProperty('id')
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('price')
    }
  })
})