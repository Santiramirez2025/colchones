import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ============================================
// CONFIGURACIÓN DE AUTENTICACIÓN TEMPORAL
// ============================================
// Credenciales simples - CAMBIALAS por las tuyas
const VALID_USERNAME = 'admin'
const VALID_PASSWORD = 'mipassword123'

// Rutas que requieren autenticación adicional (usuario registrado)
const protectedRoutes = ['/mi-cuenta', '/checkout']
const authRoutes = ['/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // ============================================
  // PROTECCIÓN TEMPORAL DE TODO EL SITIO
  // ============================================
  const siteAuthCookie = request.cookies.get('site-access')
  
  if (siteAuthCookie?.value !== 'granted') {
    // Verificar credenciales Basic Auth
    const authHeader = request.headers.get('authorization')
    
    if (authHeader) {
      const auth = authHeader.split(' ')[1]
      const [username, password] = Buffer.from(auth, 'base64').toString().split(':')
      
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        const response = NextResponse.next()
        // Cookie válida por 24 horas
        response.cookies.set('site-access', 'granted', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24, // 24 horas
          path: '/',
          sameSite: 'lax'
        })
        return response
      }
    }

    // Solicitar autenticación
    return new NextResponse('Acceso Restringido - Se requiere autenticación', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Acceso al Sitio Web"',
      },
    })
  }
  
  // ============================================
  // PROTECCIÓN DE RUTAS ESPECÍFICAS (usuario registrado)
  // ============================================
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  
  if (isProtectedRoute) {
    // Aquí verificarías la sesión del usuario registrado
    // Por ahora permitimos el acceso si pasó la protección del sitio
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Proteger todas las rutas excepto:
     * - api (rutas API)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}