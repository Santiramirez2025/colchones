// ===== components/admin/AdminAuthContext.tsx (NUEVO) =====
// Crea un contexto para centralizar el estado de la sesión y el loader.
'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type AuthContextType = {
  isLoggedIn: boolean | null
  loading: boolean
  adminEmail: string | null
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAdminAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [adminEmail, setAdminEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // NOTE: En un entorno de producción, esta verificación NO debe usar localStorage.
  // Debe usar una llamada a la API para validar la sesión/token.
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdminLoggedIn') === 'true'
    const email = localStorage.getItem('adminEmail')
    
    setIsLoggedIn(isAdmin)
    setAdminEmail(email)
    setLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem('isAdminLoggedIn')
    localStorage.removeItem('adminEmail')
    setIsLoggedIn(false)
    setAdminEmail(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, adminEmail, logout }}>
      {children}
    </AuthContext.Provider>
  )
}