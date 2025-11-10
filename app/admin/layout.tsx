import { AdminGuard } from '@/components/admin/AdminGuard'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard>
      <AdminLayoutWrapper>
        <AdminSidebar />
        {children}
      </AdminLayoutWrapper>
    </AdminGuard>
  )
}