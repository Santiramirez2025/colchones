// app/api/auth/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // ❌ TEMPORALMENTE DESACTIVADO - Problemas en producción
  return NextResponse.json({ 
    error: 'Auth sync temporarily disabled' 
  }, { status: 503 })
}

// TODO: Resto del código comentado...