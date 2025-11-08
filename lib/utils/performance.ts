// lib/utils/performance.ts

/**
 * Throttle function - limits function execution to once per specified delay
 * Useful for scroll, resize, and other high-frequency events
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null = null
    let lastExecTime = 0
  
    return function (this: any, ...args: Parameters<T>) {
      const currentTime = Date.now()
      const timeSinceLastExec = currentTime - lastExecTime
  
      const execute = () => {
        lastExecTime = currentTime
        func.apply(this, args)
      }
  
      if (timeSinceLastExec >= delay) {
        execute()
      } else if (!timeoutId) {
        timeoutId = setTimeout(() => {
          execute()
          timeoutId = null
        }, delay - timeSinceLastExec)
      }
    }
  }
  
  /**
   * Debounce function - delays function execution until after specified delay
   * Useful for search inputs, form validation, etc.
   */
  export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null = null
  
    return function (this: any, ...args: Parameters<T>) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
  
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        timeoutId = null
      }, delay)
    }
  }
  
  /**
   * Request Animation Frame throttle - limits to one execution per frame
   * Best for visual updates tied to browser rendering
   */
  export function rafThrottle<T extends (...args: any[]) => any>(
    func: T
  ): (...args: Parameters<T>) => void {
    let rafId: number | null = null
  
    return function (this: any, ...args: Parameters<T>) {
      if (rafId !== null) {
        return
      }
  
      rafId = requestAnimationFrame(() => {
        func.apply(this, args)
        rafId = null
      })
    }
  }
  
  /**
   * Lazy load images with Intersection Observer
   */
  export function lazyLoadImage(
    img: HTMLImageElement,
    src: string,
    options?: IntersectionObserverInit
  ): () => void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src
          observer.disconnect()
        }
      })
    }, options)
  
    observer.observe(img)
  
    return () => observer.disconnect()
  }
  
  /**
   * Measure performance of async operations
   */
  export async function measureAsync<T>(
    name: string,
    fn: () => Promise<T>
  ): Promise<T> {
    const start = performance.now()
    try {
      const result = await fn()
      const duration = performance.now() - start
      console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`)
      return result
    } catch (error) {
      const duration = performance.now() - start
      console.error(`[Performance] ${name} failed after ${duration.toFixed(2)}ms:`, error)
      throw error
    }
  }