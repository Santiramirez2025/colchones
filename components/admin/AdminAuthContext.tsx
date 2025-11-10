// ===== components/admin/AdminAuthContext.tsx (CORREGIDO) =====
'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type AuthContextType = {
  isLoggedIn: boolean | null
  loading: boolean
  adminEmail: string | null
  login: (email: string) => void  // ✅ AGREGADO
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

  // Verificación inicial al cargar
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdminLoggedIn') === 'true'
    const email = localStorage.getItem('adminEmail')
    
    setIsLoggedIn(isAdmin)
    setAdminEmail(email)
    setLoading(false)
  }, [])

  // ✅ NUEVA FUNCIÓN: Actualizar estado cuando se hace login
  const login = (email: string) => {
    localStorage.setItem('isAdminLoggedIn', 'true')
    localStorage.setItem('adminEmail', email)
    setIsLoggedIn(true)
    setAdminEmail(email)
  }

  const logout = () => {
    localStorage.removeItem('isAdminLoggedIn')
    localStorage.removeItem('adminEmail')
    setIsLoggedIn(false)
    setAdminEmail(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, adminEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}