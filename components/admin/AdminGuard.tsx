// ===== components/admin/AdminGuard.tsx (Refactorizado) =====
'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, ReactNode } from 'react'
import { AdminAuthProvider, useAdminAuth } from './AdminAuthContext'

function AdminGuardContent({ children }: { children: ReactNode }) {
  const { isLoggedIn, loading } = useAdminAuth()
  const router = useRouter()
  const pathname = usePathname()
  
  const isLoginPage = pathname === '/admin/login' // La única repetición necesaria aquí

  useEffect(() => {
    if (loading) return

    if (!isLoginPage && !isLoggedIn) {
      // Redirección si no está logeado y no está en la página de login
      router.replace('/admin/login')
    }
  }, [loading, isLoggedIn, isLoginPage, router])

  // 1. Mostrar Loader mientras se verifica
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
      </div>
    )
  }

  // 2. Permitir el acceso si está logeado O si está en la página de login
  if (isLoggedIn || isLoginPage) {
    return <>{children}</>
  }
  
  // 3. Si no está logeado y no es login (y ya terminó de cargar), no renderiza nada (router.replace ya se encargó).
  return null
}

export function AdminGuard({ children }: { children: ReactNode }) {
  // Envuelve con el proveedor de contexto para que todo el layout pueda acceder
  return <AdminAuthProvider><AdminGuardContent>{children}</AdminGuardContent></AdminAuthProvider>
}