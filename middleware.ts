import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const STORE_USER = process.env.STORE_USER || 'tienda'
  const STORE_PASSWORD = process.env.STORE_PASSWORD || 'colchon2024'
  
  const authHeader = request.headers.get('authorization')
  
  // Si no hay header, pedir autenticación
  if (!authHeader) {
    return new NextResponse('Acceso restringido', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Tienda Colchón"',
      },
    })
  }
  
  // Decodificar usando una función más simple
  const base64 = authHeader.replace('Basic ', '')
  let credentials = ''
  
  try {
    // Método simple sin Buffer ni atob
    const binaryString = base64.split('').map(c => {
      const code = c.charCodeAt(0)
      return String.fromCharCode(code > 127 ? code - 256 : code)
    }).join('')
    
    credentials = decodeURIComponent(escape(binaryString))
  } catch {
    // Si falla, usar atob directo
    try {
      credentials = atob(base64)
    } catch {
      return new NextResponse('Error de autenticación', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Tienda Colchón"',
        },
      })
    }
  }
  
  const [user, password] = credentials.split(':')
  
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