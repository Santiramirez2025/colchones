/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://tiendacolchon.es',
    generateRobotsTxt: true,
    generateIndexSitemap: true, // Para sitios con >50k URLs
    
    // ============================================
    // OPCIONES DE GENERACIÓN
    // ============================================
    exclude: [
      '/admin/*',
      '/api/*',
      '/dashboard/*',
      '/checkout/*',
      '/carrito',
      '/cuenta/*',
      '/gracias',
      '/404',
      '/500',
      '/sitemap.xml',
      '/sitemap-*.xml',
      '/server-sitemap.xml',
      '/*?*', // Excluir URLs con query params
    ],
  
    // ============================================
    // CONFIGURACIÓN DE ROBOTS.TXT
    // ============================================
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: [
            '/admin/',
            '/api/',
            '/_next/',
            '/dashboard/',
            '/checkout/',
            '/carrito/',
            '/cuenta/',
            '/gracias/',
          ],
        },
        // Configuración específica para bots
        {
          userAgent: 'Googlebot',
          allow: '/',
          crawlDelay: 0,
        },
        {
          userAgent: 'Bingbot',
          allow: '/',
          crawlDelay: 1,
        },
        // Bloquear bots maliciosos
        {
          userAgent: 'MJ12bot',
          disallow: '/',
        },
        {
          userAgent: 'AhrefsBot',
          crawlDelay: 10,
        },
        {
          userAgent: 'SemrushBot',
          crawlDelay: 10,
        },
      ],
      additionalSitemaps: [
        'https://tiendacolchon.es/sitemap.xml',
        'https://tiendacolchon.es/server-sitemap.xml', // Para contenido dinámico
      ],
    },
  
    // ============================================
    // PRIORIDADES Y FRECUENCIAS POR RUTA
    // ============================================
    transform: async (config, path) => {
      // Página principal
      if (path === '/') {
        return {
          loc: path,
          changefreq: 'daily',
          priority: 1.0,
          lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
      }
  
      // Productos
      if (path.startsWith('/producto/')) {
        return {
          loc: path,
          changefreq: 'weekly',
          priority: 0.9,
          lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
          images: [
            {
              loc: `https://tiendacolchon.es/images${path}.jpg`,
              title: path.split('/').pop()?.replace(/-/g, ' '),
            },
          ],
        }
      }
  
      // Categorías
      if (path.startsWith('/categoria/')) {
        return {
          loc: path,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
      }
  
      // Blog
      if (path.startsWith('/blog/')) {
        return {
          loc: path,
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
      }
  
      // Páginas institucionales
      if (['/sobre-nosotros', '/contacto', '/preguntas-frecuentes'].includes(path)) {
        return {
          loc: path,
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
      }
  
      // Páginas legales
      if (['/politica-privacidad', '/terminos-condiciones', '/politica-cookies'].includes(path)) {
        return {
          loc: path,
          changefreq: 'yearly',
          priority: 0.3,
          lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
      }
  
      // Default
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.5,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    },
  
    // ============================================
    // OPCIONES ADICIONALES
    // ============================================
    autoLastmod: true, // Añadir fecha automáticamente
    sitemapSize: 50000, // Máximo de URLs por sitemap
    changefreq: 'weekly', // Frecuencia por defecto
    priority: 0.7, // Prioridad por defecto
    
    // Alternativas de idioma (si tienes multi-idioma)
    alternateRefs: [
      // {
      //   href: 'https://tiendacolchon.es',
      //   hreflang: 'es',
      // },
      // {
      //   href: 'https://tiendacolchon.es/en',
      //   hreflang: 'en',
      // },
    ],
  
    // ============================================
    // SITEMAPS ADICIONALES
    // ============================================
    additionalPaths: async (config) => {
      const result = []
  
      // Ejemplo: Añadir productos desde API o DB
      // const products = await fetch('https://api.tiendacolchon.es/products')
      //   .then(res => res.json())
  
      // products.forEach(product => {
      //   result.push({
      //     loc: `/producto/${product.slug}`,
      //     changefreq: 'weekly',
      //     priority: 0.9,
      //     lastmod: product.updatedAt,
      //   })
      // })
  
      return result
    },
  
    // ============================================
    // OPCIONES DE OUTPUT
    // ============================================
    outDir: './public', // Directorio de salida
    
    // Generar sitemaps separados por tipo de contenido
    // outDir: './public',
    // transform: async (config, path) => {
    //   if (path.startsWith('/blog/')) {
    //     return {
    //       loc: path,
    //       changefreq: 'monthly',
    //       priority: 0.7,
    //       alternateRefs: config.alternateRefs ?? [],
    //       // Esto irá a /public/sitemap-blog.xml
    //     }
    //   }
    // },
  }
  
  // ============================================
  // INSTALACIÓN
  // ============================================
  // npm install next-sitemap
  //
  // En package.json añadir:
  // "scripts": {
  //   "postbuild": "next-sitemap"
  // }
  //
  // O ejecutar manualmente:
  // npx next-sitemap