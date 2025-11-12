import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const STORE_USER = process.env.STORE_USER || 'tienda'
  const STORE_PASSWORD = process.env.STORE_PASSWORD || 'colchon2024'
  
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Basic ')) {
    return new NextResponse('Acceso restringido', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Tienda Colchón"',
      },
    })
  }
  
  try {
    const base64Credentials = authHeader.substring(6)
    
    // Decodificar base64 de forma compatible con Edge Runtime
    const credentials = decodeBase64(base64Credentials)
    const [user, password] = credentials.split(':')
    
    if (user !== STORE_USER || password !== STORE_PASSWORD) {
      throw new Error('Invalid credentials')
    }
    
    return NextResponse.next()
  } catch (error) {
    return new NextResponse('Credenciales inválidas', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Tienda Colchón"',
      },
    })
  }
}

// Función helper compatible con Edge Runtime
function decodeBase64(str: string): string {
  const text = atob(str)
  const length = text.length
  const bytes = new Uint8Array(length)
  for (let i = 0; i < length; i++) {
    bytes[i] = text.charCodeAt(i)
  }
  return new TextDecoder().decode(bytes)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}