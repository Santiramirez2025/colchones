// lib/analytics.ts
// Sistema de analytics ligero y performante

// ============================================================================
// TYPES
// ============================================================================

export interface ProductViewEvent {
    productId: string
    productName?: string
    price?: number
    category?: string
  }
  
  export interface AddToCartEvent {
    productId: string
    productName: string
    price: number
    quantity: number
    variantId?: string
  }
  
  export interface PurchaseEvent {
    orderId: string
    products: Array<{
      productId: string
      productName: string
      price: number
      quantity: number
    }>
    total: number
    currency: string
  }
  
  // ============================================================================
  // ANALYTICS CLASS
  // ============================================================================
  
  class Analytics {
    private isClient = typeof window !== 'undefined'
    private isDev = process.env.NODE_ENV === 'development'
    
    /**
     * Log event para desarrollo
     */
    private log(event: string, data?: any) {
      if (this.isDev) {
        console.log('📊 [Analytics]', event, data)
      }
    }
    
    /**
     * Enviar evento a servicios externos
     */
    private track(event: string, data?: any) {
      this.log(event, data)
      
      if (!this.isClient) return
      
      try {
        // Google Analytics 4
        if ((window as any).gtag) {
          (window as any).gtag('event', event, data)
        }
        
        // Facebook Pixel
        if ((window as any).fbq) {
          (window as any).fbq('track', event, data)
        }
        
        // Custom analytics endpoint (opcional)
        if (process.env.NODE_ENV === 'production') {
          fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event, data, timestamp: new Date().toISOString() }),
          }).catch(err => console.error('Analytics error:', err))
        }
      } catch (error) {
        console.error('Analytics tracking error:', error)
      }
    }
    
    // ==========================================================================
    // PUBLIC METHODS
    // ==========================================================================
    
    /**
     * Track product view
     */
    trackProductView(productId: string, data?: Partial<ProductViewEvent>) {
      this.track('view_item', {
        item_id: productId,
        item_name: data?.productName,
        price: data?.price,
        item_category: data?.category,
      })
    }
    
    /**
     * Track add to cart
     */
    trackAddToCart(data: AddToCartEvent) {
      this.track('add_to_cart', {
        currency: 'EUR',
        value: data.price * data.quantity,
        items: [{
          item_id: data.productId,
          item_name: data.productName,
          price: data.price,
          quantity: data.quantity,
          item_variant: data.variantId,
        }]
      })
    }
    
    /**
     * Track remove from cart
     */
    trackRemoveFromCart(data: AddToCartEvent) {
      this.track('remove_from_cart', {
        currency: 'EUR',
        value: data.price * data.quantity,
        items: [{
          item_id: data.productId,
          item_name: data.productName,
          price: data.price,
          quantity: data.quantity,
        }]
      })
    }
    
    /**
     * Track begin checkout
     */
    trackBeginCheckout(cartValue: number, items: any[]) {
      this.track('begin_checkout', {
        currency: 'EUR',
        value: cartValue,
        items,
      })
    }
    
    /**
     * Track purchase
     */
    trackPurchase(data: PurchaseEvent) {
      this.track('purchase', {
        transaction_id: data.orderId,
        value: data.total,
        currency: data.currency,
        items: data.products.map(p => ({
          item_id: p.productId,
          item_name: p.productName,
          price: p.price,
          quantity: p.quantity,
        }))
      })
    }
    
    /**
     * Track search
     */
    trackSearch(searchTerm: string, resultsCount: number) {
      this.track('search', {
        search_term: searchTerm,
        results_count: resultsCount,
      })
    }
    
    /**
     * Track page view
     */
    trackPageView(url: string, title?: string) {
      this.track('page_view', {
        page_location: url,
        page_title: title || (this.isClient ? document.title : ''),
      })
    }
    
    /**
     * Track error
     */
    trackError(error: Error, context?: Record<string, any>) {
      this.track('error', {
        error_message: error.message,
        error_stack: error.stack,
        ...context
      })
    }
    
    /**
     * Track custom event
     */
    trackCustomEvent(eventName: string, data?: Record<string, any>) {
      this.track(eventName, data)
    }
  }
  
  // ============================================================================
  // SINGLETON INSTANCE
  // ============================================================================
  
  const analytics = new Analytics()
  
  // ============================================================================
  // CONVENIENCE FUNCTIONS
  // ============================================================================
  
  export const trackProductView = (productId: string, data?: Partial<ProductViewEvent>) => {
    return analytics.trackProductView(productId, data)
  }
  
  export const trackAddToCart = (data: AddToCartEvent) => {
    return analytics.trackAddToCart(data)
  }
  
  export const trackRemoveFromCart = (data: AddToCartEvent) => {
    return analytics.trackRemoveFromCart(data)
  }
  
  export const trackBeginCheckout = (cartValue: number, items: any[]) => {
    return analytics.trackBeginCheckout(cartValue, items)
  }
  
  export const trackPurchase = (data: PurchaseEvent) => {
    return analytics.trackPurchase(data)
  }
  
  export const trackSearch = (searchTerm: string, resultsCount: number) => {
    return analytics.trackSearch(searchTerm, resultsCount)
  }
  
  export const trackPageView = (url: string, title?: string) => {
    return analytics.trackPageView(url, title)
  }
  
  export const trackError = (error: Error, context?: Record<string, any>) => {
    return analytics.trackError(error, context)
  }
  
  export const trackCustomEvent = (eventName: string, data?: Record<string, any>) => {
    return analytics.trackCustomEvent(eventName, data)
  }
  
  export default analytics