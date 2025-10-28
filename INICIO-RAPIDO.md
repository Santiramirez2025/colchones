# 🚀 Guía Rápida de Inicio - Descanso Premium

## ⚡ Inicio Rápido (5 minutos)

### 1. Instalar dependencias
```bash
cd descanso-premium
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales básicas (opcional para desarrollo):
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### 3. Ejecutar proyecto
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Estructura del Proyecto

```
descanso-premium/
├── app/                    # Páginas de Next.js 15
│   ├── page.tsx           # Home 🏠
│   ├── simulador/         # Simulador interactivo ✨
│   ├── catalogo/          # Catálogo de productos 📦
│   └── carrito/           # Carrito y checkout 🛒
├── components/            # Componentes reutilizables
│   ├── sections/          # Secciones (Header, Footer)
│   ├── simulador/         # Componentes del simulador
│   └── ui/                # Componentes UI base
├── lib/                   # Utilidades y helpers
└── docs/                  # Documentación
```

---

## 🎨 Personalización Básica

### Cambiar colores
Edita `tailwind.config.js`:
```js
colors: {
  primary: {
    600: '#TU_COLOR_AQUI',
  }
}
```

### Cambiar contenido
1. **Home**: `app/page.tsx`
2. **Productos**: `components/sections/ProductShowcase.tsx`
3. **Simulador**: `app/simulador/page.tsx`

---

## 🔑 Configuraciones Importantes

### 1. Stripe (Pagos)
1. Crea cuenta en [stripe.com](https://stripe.com)
2. Obtén API keys en Dashboard
3. Añádelas a `.env.local`

### 2. Google Tag Manager
1. Crea cuenta en [tagmanager.google.com](https://tagmanager.google.com)
2. Obtén tu GTM ID
3. Reemplaza `GTM-XXXXXXX` en `app/layout.tsx`

### 3. Meta Pixel
1. Crea pixel en Facebook Business
2. Añade el ID a `.env.local`

---

## 📱 Páginas Principales

| Ruta | Descripción | Estado |
|------|-------------|--------|
| `/` | Home con hero y showcase | ✅ |
| `/simulador` | Simulador interactivo | ✅ |
| `/catalogo` | Catálogo con filtros | ✅ |
| `/carrito` | Carrito y checkout | ✅ |
| `/comparador` | Comparar productos | 🔄 |
| `/profesional` | Área B2B | 🔄 |
| `/blog` | Blog y guías | 🔄 |

✅ = Completo | 🔄 = En progreso

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Ejecutar producción
npm start

# Linter
npm run lint
```

---

## 🎯 Próximos Pasos

1. **Contenido Real**
   - Añadir imágenes reales de productos
   - Completar descripciones
   - Añadir más productos

2. **CMS / Backend**
   - Instalar Strapi o Sanity
   - Crear modelos de datos
   - Conectar con frontend

3. **Pagos**
   - Completar integración Stripe
   - Configurar webhooks
   - Testing de pagos

4. **Marketing**
   - Setup GTM completo
   - Configurar eventos
   - Email marketing

---

## 🆘 Solución de Problemas

### Error: Cannot find module
```bash
rm -rf node_modules package-lock.json
npm install
```

### Estilos no se aplican
```bash
npm run dev
# Ctrl+C y reiniciar
```

### Port 3000 en uso
```bash
# Cambiar puerto
PORT=3001 npm run dev
```

---

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Stripe Docs](https://stripe.com/docs)

---

## 💬 Soporte

¿Necesitas ayuda? Revisa:
1. README.md completo
2. docs/ROADMAP.md
3. docs/SEO-MARKETING.md

---

**¡Éxito con tu tienda! 🚀**
