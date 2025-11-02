// lib/store/cart-store.ts - SIN ERRORES
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  slug: string
  name: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  images?: string[]
  size: string
  variant?: string
  sku?: string
  maxQuantity?: number
  inStock?: boolean
  category?: string
  rating?: number
  isBestSeller?: boolean
}

export interface Coupon {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
}

interface CartState {
  items: CartItem[]
  coupon: Coupon | null
  
  // Actions - ✅ FIX: Omit 'id' y 'quantity', luego hacer quantity opcional
  addItem: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (coupon: Coupon) => void
  removeCoupon: () => void
  
  // Computed values
  getSubtotal: () => number
  getDiscount: () => number
  getShipping: () => number
  getTotal: () => number
  getItemCount: () => number
  hasItem: (productId: string, size: string, variant?: string) => boolean
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => 
              i.productId === item.productId && 
              i.size === item.size && 
              i.variant === item.variant
          )
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === existingItem.id
                  ? { 
                      ...i, 
                      quantity: Math.min(
                        i.quantity + (item.quantity || 1),
                        i.maxQuantity || 99
                      )
                    }
                  : i
              ),
            }
          }
          
          const newItem: CartItem = {
            ...item,
            id: `${item.productId}-${item.size}-${item.variant || 'default'}-${Date.now()}`,
            quantity: item.quantity || 1,
            inStock: item.inStock !== false,
            images: item.images || (item.image ? [item.image] : [])
          }
          
          return { items: [...state.items, newItem] }
        })
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id 
              ? { 
                  ...item, 
                  quantity: Math.min(
                    Math.max(1, quantity),
                    item.maxQuantity || 99
                  )
                } 
              : item
          ),
        }))
      },
      
      clearCart: () => {
        set({ items: [], coupon: null })
      },
      
      applyCoupon: (coupon) => {
        set({ coupon })
      },
      
      removeCoupon: () => {
        set({ coupon: null })
      },
      
      getSubtotal: () => {
        const state = get()
        return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },
      
      getDiscount: () => {
        const state = get()
        if (!state.coupon) return 0
        
        const subtotal = state.getSubtotal()
        
        if (state.coupon.type === 'percentage') {
          return (subtotal * state.coupon.discount) / 100
        }
        
        return Math.min(state.coupon.discount, subtotal)
      },
      
      getShipping: () => {
        const state = get()
        const subtotal = state.getSubtotal()
        
        if (state.items.length === 0) return 0
        if (subtotal >= 500) return 0
        
        return 49
      },
      
      getTotal: () => {
        const state = get()
        const subtotal = state.getSubtotal()
        const discount = state.getDiscount()
        const shipping = state.getShipping()
        
        return Math.max(0, subtotal - discount + shipping)
      },
      
      getItemCount: () => {
        const state = get()
        return state.items.reduce((count, item) => count + item.quantity, 0)
      },
      
      hasItem: (productId, size, variant) => {
        const state = get()
        return state.items.some(
          item => 
            item.productId === productId && 
            item.size === size && 
            (!variant || item.variant === variant)
        )
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        coupon: state.coupon
      })
    }
  )
)

// ============================================================================
// UTILITY HOOKS
// ============================================================================

export function useAddToCart() {
  const addItem = useCartStore(state => state.addItem)
  
  return (product: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => {
    addItem(product)
    
    if (typeof window !== 'undefined') {
      console.log(`✅ ${product.name} agregado al carrito`)
    }
  }
}

export function useIsInCart(productId: string, size: string, variant?: string) {
  return useCartStore(state => state.hasItem(productId, size, variant))
}

export function useCartItemQuantity(productId: string, size: string, variant?: string) {
  return useCartStore(state => {
    const item = state.items.find(
      i => i.productId === productId && i.size === size && (!variant || i.variant === variant)
    )
    return item?.quantity || 0
  })
}