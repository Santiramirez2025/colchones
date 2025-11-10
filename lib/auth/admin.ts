// Lista de emails con acceso admin
const ADMIN_EMAILS = [
    'santiagoagustinramirezmindel@gmail.com',
    // Agrega más emails aquí si necesitas
  ]
  
  export function isAdmin(email: string | null | undefined): boolean {
    if (!email) return false
    return ADMIN_EMAILS.includes(email.toLowerCase())
  }
  
  export function checkAdminAccess(email: string | null | undefined) {
    if (!isAdmin(email)) {
      throw new Error('No tienes permisos de administrador')
    }
  }