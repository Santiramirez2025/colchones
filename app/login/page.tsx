'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/context/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

// --- Iconos ---
const Icons = {
  Moon: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1014 11.69 1 1 0 00-.36-1.05z" />
    </svg>
  ),
  Google: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  ),
  Eye: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  EyeOff: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ),
}

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [localLoading, setLocalLoading] = useState(false) 
  const [resetSent, setResetSent] = useState(false)

  const { signIn, signUp, signInWithGoogle, resetPassword, user, loading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/mi-cuenta'

  // Redirigir cuando el usuario esté autenticado
  useEffect(() => {
    if (user && !authLoading) { 
      router.push(redirectTo)
    }
  }, [user, authLoading, router, redirectTo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLocalLoading(true)

    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        if (!name.trim()) {
          throw new Error('El nombre es obligatorio')
        }
        await signUp(email, password, name)
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Error al autenticar'
      if (errorMessage.includes('auth/email-already-in-use')) {
        setError('Este email ya está registrado')
      } else if (errorMessage.includes('auth/invalid-credential') || errorMessage.includes('auth/wrong-password')) {
        setError('Email o contraseña incorrectos')
      } else if (errorMessage.includes('auth/weak-password')) {
        setError('La contraseña debe tener al menos 6 caracteres')
      } else if (errorMessage.includes('auth/user-not-found')) {
        setError('No existe un usuario con ese email')
      } else if (errorMessage.includes('auth/invalid-email')) {
        setError('El formato del email no es válido')
      } else if (errorMessage.includes('auth/too-many-requests')) {
        setError('Demasiados intentos. Intentá de nuevo más tarde')
      } else {
        setError(errorMessage)
      }
      setLocalLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setLocalLoading(true)
    try {
      await signInWithGoogle()
    } catch (err: any) {
      setError('Error al iniciar sesión con Google')
      setLocalLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      setError('Ingresá tu email para recuperar la contraseña')
      return
    }
    
    setError('')
    setLocalLoading(true)
    
    try {
      await resetPassword(email)
      setResetSent(true)
      setTimeout(() => setResetSent(false), 5000)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al enviar el email de recuperación'
      if (errorMessage.includes('auth/user-not-found')) {
        setError('No existe un usuario con ese email')
      } else if (errorMessage.includes('auth/invalid-email')) {
        setError('El formato del email no es válido')
      } else {
        setError('Error al enviar el email de recuperación')
      }
    } finally {
      setLocalLoading(false)
    }
  }
  
  const isGlobalLoading = localLoading || authLoading

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center px-4 py-12">
      {/* Fondo decorativo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-8 group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-600 flex items-center justify-center shadow-xl shadow-violet-500/30 group-hover:scale-105 transition-transform">
              <Icons.Moon className="w-7 h-7 text-white" />
            </div>
            <div className="text-2xl font-black">
              <span className="text-white">Azul</span>
              <span className="text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text">Colchones</span>
            </div>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Bienvenido de nuevo' : 'Creá tu cuenta'}
            </h1>
            <p className="text-zinc-400 text-sm">
              {isLogin ? 'Iniciá sesión para continuar con tu compra' : 'Registrate para empezar a comprar'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-start gap-3">
              <span className="text-red-500 text-lg flex-shrink-0">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {resetSent && (
            <div className="mb-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm flex items-start gap-3">
              <span className="text-emerald-500 text-lg flex-shrink-0">✓</span>
              <span>Email de recuperación enviado. Revisá tu bandeja de entrada.</span>
            </div>
          )}

          <div className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-2">
                  Nombre completo <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:bg-zinc-800 transition"
                  placeholder="Juan Pérez"
                  required={!isLogin}
                  disabled={isGlobalLoading}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:bg-zinc-800 transition"
                placeholder="tu@email.com"
                required
                disabled={isGlobalLoading}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-zinc-300">
                  Contraseña <span className="text-red-400">*</span>
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={isGlobalLoading || !email}
                    className="text-xs text-violet-400 hover:text-violet-300 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:bg-zinc-800 transition"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  disabled={isGlobalLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition"
                  disabled={isGlobalLoading}
                >
                  {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                </button>
              </div>
              {!isLogin && (
                <p className="mt-2 text-xs text-zinc-500">
                  Mínimo 6 caracteres
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isGlobalLoading}
              className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed shadow-lg shadow-violet-500/30 text-base"
            >
              {isGlobalLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Procesando...
                </span>
              ) : isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
            </button>
          </div>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-zinc-700" />
            <span className="text-xs text-zinc-500 font-medium">O continuá con</span>
            <div className="flex-1 h-px bg-zinc-700" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isGlobalLoading}
            className="w-full py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
          >
            <Icons.Google />
            <span>Continuar con Google</span>
          </button>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
                setResetSent(false)
              }}
              className="text-sm text-zinc-400 hover:text-violet-400 transition font-medium disabled:opacity-50"
              disabled={isGlobalLoading}
            >
              {isLogin ? (
                <>¿No tenés cuenta? <span className="text-violet-400 font-bold">Registrate</span></>
              ) : (
                <>¿Ya tenés cuenta? <span className="text-violet-400 font-bold">Iniciá sesión</span></>
              )}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500 leading-relaxed">
          Al continuar, aceptás nuestros{' '}
          <Link href="/terminos" className="text-violet-400 hover:text-violet-300 transition underline">
            Términos de Servicio
          </Link>{' '}
          y{' '}
          <Link href="/privacidad" className="text-violet-400 hover:text-violet-300 transition underline">
            Política de Privacidad
          </Link>
        </p>
      </div>
    </div>
  )
}