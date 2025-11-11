// ============================================
// tests/unit/lib/product-utils.test.ts
// ============================================
import { describe, it, expect } from 'vitest'
import { 
  calculateDiscount, 
  formatPrice,
  getDiscountPercentage,
  filterProductsByFirmness,
  sortProducts 
} from '@/lib/helpers/product-utils'

describe('Product Utils', () => {
  describe('calculateDiscount', () => {
    it('calcula el descuento correctamente', () => {
      expect(calculateDiscount(100, 10)).toBe(90)
      expect(calculateDiscount(50, 20)).toBe(40)
    })

    it('retorna el precio original si el descuento es 0', () => {
      expect(calculateDiscount(100, 0)).toBe(100)
    })

    it('maneja descuentos del 100%', () => {
      expect(calculateDiscount(100, 100)).toBe(0)
    })

    it('lanza error con descuentos negativos', () => {
      expect(() => calculateDiscount(100, -10)).toThrow()
    })

    it('lanza error con descuentos mayores a 100', () => {
      expect(() => calculateDiscount(100, 150)).toThrow()
    })
  })

  describe('formatPrice', () => {
    it('formatea precios correctamente', () => {
      expect(formatPrice(1000)).toBe('1000 €')
      expect(formatPrice(99.99)).toBe('99,99 €')
    })

    it('maneja precios de 0', () => {
      expect(formatPrice(0)).toBe('0 €')
    })

    it('formatea precios grandes', () => {
      const formatted = formatPrice(1234567.89)
      expect(formatted).toContain('1')
      expect(formatted).toContain('€')
    })
  })

  describe('getDiscountPercentage', () => {
    it('calcula el porcentaje de descuento', () => {
      expect(getDiscountPercentage(1199, 899)).toBe(25)
      expect(getDiscountPercentage(100, 50)).toBe(50)
    })

    it('retorna 0 si no hay descuento', () => {
      expect(getDiscountPercentage(100, 100)).toBe(0)
    })

    it('retorna 0 si el precio actual es mayor', () => {
      expect(getDiscountPercentage(100, 150)).toBe(0)
    })
  })

  describe('filterProductsByFirmness', () => {
    const products = [
      { id: '1', name: 'A', firmness: 'SUAVE' },
      { id: '2', name: 'B', firmness: 'MEDIO' },
      { id: '3', name: 'C', firmness: 'FIRME' },
    ]

    it('filtra productos por firmeza', () => {
      const result = filterProductsByFirmness(products, 'MEDIO')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('B')
    })

    it('retorna todos los productos si no hay filtro', () => {
      const result = filterProductsByFirmness(products)
      expect(result).toHaveLength(3)
    })
  })

  describe('sortProducts', () => {
    const products = [
      { id: '1', name: 'B', price: 500 },
      { id: '2', name: 'A', price: 1000 },
      { id: '3', name: 'C', price: 750 },
    ]

    it('ordena por precio ascendente', () => {
      const result = sortProducts(products, 'price-asc')
      expect(result[0].price).toBe(500)
      expect(result[2].price).toBe(1000)
    })

    it('ordena por precio descendente', () => {
      const result = sortProducts(products, 'price-desc')
      expect(result[0].price).toBe(1000)
      expect(result[2].price).toBe(500)
    })

    it('ordena por nombre alfabéticamente', () => {
      const result = sortProducts(products, 'name')
      expect(result[0].name).toBe('A')
      expect(result[2].name).toBe('C')
    })
  })
})
