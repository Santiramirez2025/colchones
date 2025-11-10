'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    // Si es la página de login, permitir acceso
    if (isLoginPage) {
      setIsLoading(false)
      return
    }

    // Verificar autenticación para otras páginas
    const isAdmin = localStorage.getItem('isAdminLoggedIn')
    
    if (isAdmin !== 'true') {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
    
    setIsLoading(false)
  }, [router, pathname, isLoginPage])

  // Si es login, mostrar sin layout
  if (isLoginPage) {
    return <>{children}</>
  }

  // Loader
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn')
    localStorage.removeItem('adminEmail')
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-lg flex items-center justify-center">
                <span className="text-lg">🛏️</span>
              </div>
              <span className="text-white font-bold text-lg">Admin Panel</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}