/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizaciones de producción
  reactStrictMode: true,
  // ❌ REMOVED: swcMinify - Ya está activado por defecto en Next.js 15
  
  // Configuración de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Si usas un CDN, añádelo aquí
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.tiendacolchon.es',
      // },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 días
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers de seguridad mejorados
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ],
      },
      // Cache para assets estáticos
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache para imágenes
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache para fuentes
      {
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Optimizaciones de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'], // Mantener errores y warnings
    } : false,
  },

  // Configuración de compresión
  compress: true,

  // ❌ REMOVED: optimizeFonts - Ya está activado por defecto en Next.js 15

  // Configuración de salida (si usas static export)
  // output: 'standalone', // Para Docker
  // output: 'export', // Para static site

  // Trailing slash (importante para SEO)
  trailingSlash: false,

  // Generar sitemap automáticamente
  generateBuildId: async () => {
    // Puedes usar git commit hash o timestamp
    return `build-${Date.now()}`
  },

  // Configuración de webpack (opcional)
  webpack: (config, { dev, isServer }) => {
    // Optimizaciones adicionales
    if (!dev && !isServer) {
      // Análisis de bundle (opcional)
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('@next/bundle-analyzer')({
          enabled: true,
        })
        config.plugins.push(new BundleAnalyzerPlugin())
      }
    }

    return config
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'zustand'],
    
    // Server Actions (si los usas)
    // serverActions: true,
    
    // App Router optimizations
    // optimisticClientCache: true,
  },

  // Redirects (ejemplo)
  async redirects() {
    return [
      // Redireccionar www a non-www (o viceversa)
      // {
      //   source: '/:path*',
      //   has: [
      //     {
      //       type: 'host',
      //       value: 'www.tiendacolchon.es',
      //     },
      //   ],
      //   destination: 'https://tiendacolchon.es/:path*',
      //   permanent: true,
      // },
    ]
  },

  // Rewrites (para API proxy, etc)
  async rewrites() {
    return [
      // Ejemplo: proxy a Stripe
      // {
      //   source: '/api/stripe/:path*',
      //   destination: 'https://api.stripe.com/:path*',
      // },
    ]
  },

  // Variables de entorno públicas
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://tiendacolchon.es',
  },

  // Power-ups de rendimiento
  poweredByHeader: false, // Ocultar header X-Powered-By
  generateEtags: true, // ETags para cache
  
  // Configuración de páginas
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

module.exports = nextConfig