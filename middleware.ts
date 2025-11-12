import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const STORE_USER = process.env.STORE_USER || 'tienda'
  const STORE_PASSWORD = process.env.STORE_PASSWORD || 'colchon2025'
  
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader) {
    return new NextResponse('Acceso restringido', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Tienda Colchón"',
      },
    })
  }
  
  try {
    // Usar atob() en lugar de Buffer (compatible con Edge Runtime)
    const auth = authHeader.split(' ')[1]
    const decoded = atob(auth)
    const [user, password] = decoded.split(':')
    
    if (user !== STORE_USER || password !== STORE_PASSWORD) {
      return new NextResponse('Credenciales inválidas', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Tienda Colchón"',
        },
      })
    }
    
    return NextResponse.next()
  } catch (error) {
    return new NextResponse('Error de autenticación', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Tienda Colchón"',
      },
    })
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}