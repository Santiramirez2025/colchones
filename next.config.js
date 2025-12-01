/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizaciones de producción
  reactStrictMode: true,
  poweredByHeader: false,

  // Configuración de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 días
    // ✅ Agregar qualities para evitar warnings
    qualities: [50, 75, 90, 95, 100],
    // Deshabilitar lazy loading para imágenes críticas (puedes sobreescribir con priority)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers de seguridad optimizados
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { 
            key: 'Strict-Transport-Security', 
            value: 'max-age=63072000; includeSubDomains; preload' 
          },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { 
            key: 'Permissions-Policy', 
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' 
          },
        ],
      },
      // Headers específicos para recursos estáticos
      {
        source: '/images/:path*',
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
      exclude: ['error', 'warn'],
    } : false,
  },

  // Configuración de compresión
  compress: true,

  // Optimización de transpilación
  transpilePackages: ['framer-motion'],

  // Configuración de webpack personalizada
  webpack: (config, { dev, isServer }) => {
    // Optimización de producción
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Separar framer-motion por su tamaño
            framer: {
              name: 'framer',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 30,
            },
            // Common chunks
            common: {
              name: 'common',
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      }
    }
    return config
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    // Optimización de CSS
    optimizeCss: true,
  },

  // Configuración de redirects comunes
  async redirects() {
    return [
      // Ejemplo: redirigir www a no-www
      // {
      //   source: '/:path*',
      //   has: [{ type: 'host', value: 'www.tiendacolchon.es' }],
      //   destination: 'https://tiendacolchon.es/:path*',
      //   permanent: true,
      // },
    ]
  },
}

module.exports = nextConfig