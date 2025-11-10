// ===== 3. components/admin/AdminSidebar.tsx =====
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function AdminSidebar() {
  const pathname = usePathname()
  const [adminEmail, setAdminEmail] = useState('')

  useEffect(() => {
    setAdminEmail(localStorage.getItem('adminEmail') || '')
  }, [])

  if (pathname === '/admin/login') {
    return null
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/productos', label: 'Productos', icon: '🛏️' },
    { href: '/admin/pedidos', label: 'Pedidos', icon: '📦' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn')
    localStorage.removeItem('adminEmail')
    window.location.href = '/admin/login'
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 p-6 z-40">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <p className="text-sm text-zinc-400 mt-1">{adminEmail}</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-violet-500 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6 space-y-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
        >
          <span>🚪</span>
          <span>Cerrar Sesión</span>
        </button>
        
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <span>←</span>
          <span>Volver a la tienda</span>
        </Link>
      </div>
    </aside>
  )
}

