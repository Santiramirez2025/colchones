// lib/store/cart-store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  size: string
  variant?: string
  sku?: string
}

export interface Coupon {
  code: string
  discount: number // Percentage or fixed amount
  type: 'percentage' | 'fixed'
}

interface CartState {
  items: CartItem[]
  coupon: Coupon | null
  
  // Actions
  addItem: (item: CartItem) => void
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
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          
          return { items: [...state.items, item] }
        })
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },
      
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
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
        
        return state.coupon.discount
      },
      
      getShipping: () => {
        const state = get()
        const subtotal = state.getSubtotal()
        
        // Free shipping over 500€
        if (subtotal >= 500) return 0
        
        // No shipping if cart is empty
        if (state.items.length === 0) return 0
        
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
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)