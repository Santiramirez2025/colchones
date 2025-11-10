'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/context/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

// --- Iconos (Se mantienen igual) ---
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
}
// --- Fin Iconos ---

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  // El loading del formulario local ahora se gestiona de forma más limpia
  const [localLoading, setLocalLoading] = useState(false) 
  const [resetSent, setResetSent] = useState(false)

  // Usamos el 'loading' del AuthContext para la redirección
  const { signIn, signUp, signInWithGoogle, resetPassword, user, loading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/mi-cuenta'

  // Redirigir cuando el usuario esté autenticado y sincronizado
  useEffect(() => {
    // Usamos authLoading para sincronizar el estado del Context
    if (user && !authLoading) { 
      router.push(redirectTo)
    }
  }, [user, authLoading, router, redirectTo]) // Dependemos de authLoading del Context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLocalLoading(true) // Usamos el loading local para el formulario

    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        if (!name.trim()) {
          throw new Error('El nombre es obligatorio')
        }
        await signUp(email, password, name)
      }
      // NOTA: No desactivamos localLoading aquí, el useEffect de redirección lo gestionará
      // en el flujo de éxito. Si la autenticación es exitosa, pero la sincronización falla,
      // el authLoading del contexto se pondrá en false y el localLoading debería seguir ese ejemplo.
      
    } catch (err: any) {
      // Manejo de errores
      const errorMessage = err.message || 'Error al autenticar'
      if (errorMessage.includes('auth/email-already-in-use')) {
        setError('Este email ya está registrado')
      } else if (errorMessage.includes('auth/invalid-credential') || errorMessage.includes('auth/wrong-password')) {
        setError('Email o contraseña incorrectos')
      } else if (errorMessage.includes('auth/weak-password')) {
        setError('La contraseña debe tener al menos 6 caracteres')
      } else {
        // En caso de error desconocido, mostramos el mensaje.
        // También puede ser que la función 'syncUser' en el AuthContext falle y arroje un error.
        setError(errorMessage)
      }
      
      setLocalLoading(false) // Desactivamos loading solo en caso de error
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
      setError('Ingresa tu email para recuperar la contraseña')
      return
    }
    
    setError('')
    
    try {
      await resetPassword(email)
      setResetSent(true)
      setTimeout(() => setResetSent(false), 5000)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al enviar el email de recuperación'
      if (errorMessage.includes('auth/user-not-found')) {
        setError('No existe un usuario con ese email.')
      } else {
        setError('Error al enviar el email de recuperación.')
      }
    }
  }
  
  // Usamos el loading del AuthContext para deshabilitar botones mientras se carga el usuario inicial.
  const isGlobalLoading = localLoading || authLoading;

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-8 group">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:scale-105 transition">
              <Icons.Moon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-black">
              <span className="text-white">Tienda</span>
              <span className="text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text">Colchon</span>
            </div>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <h1 className="text-2xl font-bold text-white mb-2 text-center">
            {isLogin ? 'Bienvenido de nuevo' : 'Crear cuenta'}
          </h1>
          <p className="text-zinc-400 text-center mb-6 text-sm">
            {isLogin ? 'Inicia sesión para continuar' : 'Regístrate para empezar'}
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {resetSent && (
            <div className="mb-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm">
              Email de recuperación enviado. Revisa tu bandeja de entrada.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition"
                  placeholder="Tu nombre"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-zinc-300">
                  Contraseña *
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    // Deshabilitar si ya está en proceso de carga o si el email está vacío para evitar spam
                    disabled={isGlobalLoading || email === ''} 
                    className="text-xs text-violet-400 hover:text-violet-300 transition disabled:opacity-50"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition"
                placeholder="••••••••"
                required
                minLength={6}
              />
              {!isLogin && (
                <p className="mt-1 text-xs text-zinc-500">
                  Mínimo 6 caracteres
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isGlobalLoading}
              className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 shadow-lg shadow-violet-500/30"
            >
              {isGlobalLoading ? 'Procesando...' : isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-zinc-500 font-medium">O continuar con</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isGlobalLoading}
            className="w-full py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
          >
            <Icons.Google />
            <span>Google</span>
          </button>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
                setResetSent(false)
              }}
              className="text-sm text-zinc-400 hover:text-violet-400 transition font-medium"
              disabled={isGlobalLoading} // Bloquear cambio de vista mientras se procesa
            >
              {isLogin ? (
                <>¿No tienes cuenta? <span className="text-violet-400 font-bold">Regístrate</span></>
              ) : (
                <>¿Ya tienes cuenta? <span className="text-violet-400 font-bold">Inicia sesión</span></>
              )}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Al continuar, aceptas nuestros{' '}
          <Link href="/terminos" className="text-violet-400 hover:underline">
            Términos de Servicio
          </Link>{' '}
          y{' '}
          <Link href="/privacidad" className="text-violet-400 hover:underline">
            Política de Privacidad
          </Link>
        </p>
      </div>
    </div>
  )
}