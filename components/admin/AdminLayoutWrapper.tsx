// ===== 2. components/admin/AdminLayoutWrapper.tsx =====
'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export function AdminLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}

