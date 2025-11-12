import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Credenciales desde variables de entorno
  const STORE_USER = process.env.STORE_USER || 'tienda'
  const STORE_PASSWORD = process.env.STORE_PASSWORD || 'colchon2025'
  
  // Obtener el header de autorización
  const authHeader = request.headers.get('authorization')
  
  // Si no hay header, pedir credenciales
  if (!authHeader) {
    return new NextResponse('Acceso restringido', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Tienda Colchón"',
      },
    })
  }
  
  // Decodificar y verificar credenciales
  const auth = authHeader.split(' ')[1]
  const [user, password] = Buffer.from(auth, 'base64').toString().split(':')
  
  if (user !== STORE_USER || password !== STORE_PASSWORD) {
    return new NextResponse('Credenciales inválidas', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Tienda Colchón"',
      },
    })
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}