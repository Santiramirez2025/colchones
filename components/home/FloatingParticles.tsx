import { useEffect, useState } from 'react'

export function FloatingParticles({ 
  count = 15, 
  className = '' 
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const particles = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100
    const top = Math.random() * 100
    const size = Math.random() * 4 + 2
    const duration = Math.random() * 10 + 15
    const delay = Math.random() * 5
    const xOffset = (Math.random() - 0.5) * 20

    return { id: i, left, top, size, duration, delay, xOffset }
  })

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translate(var(--x-offset), -30px) scale(1.2);
            opacity: 0.3;
          }
        }
      `}</style>
      <div 
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
        aria-hidden="true"
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/10"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              '--x-offset': `${particle.xOffset}px`,
              animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  )
}