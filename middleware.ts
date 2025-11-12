import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/mi-cuenta', '/checkout']
const authRoutes = ['/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Verificar si la ruta requiere autenticación
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  
  // Si es ruta protegida y no hay sesión, redirigir a login
  if (isProtectedRoute) {
    // Aquí podrías verificar una cookie de sesión si la implementas
    // Por ahora, dejamos que el cliente maneje la redirección
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}