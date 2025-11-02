# 🛏️ Descanso Premium - Tienda Online de Colchones Premium

Tienda online innovadora, elegante y funcional para una marca española de descanso premium. Combina tecnología, bienestar y confianza con un simulador interactivo de descanso.

## ✨ Características Principales

### 🎯 Experiencia de Usuario
- **Simulador Inteligente**: 6 preguntas dinámicas que guían al cliente a su colchón ideal
- **Resultados Personalizados**: Recomendaciones con badges "Ideal para ti"
- **Asesor Virtual IA**: Botón flotante con recomendaciones inteligentes
- **Diseño Responsive**: Optimizado para móvil (70% de las compras)
- **Checkout Express**: Una sola página con múltiples métodos de pago

### 💻 Stack Tecnológico
- **Framework**: Next.js 15 + React 19
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Pagos**: Stripe + Apple Pay + Google Pay
- **TypeScript**: Para código robusto y mantenible

### 🎨 Diseño
- Estilo minimalista con blanco cálido
- Tipografía moderna (Inter)
- Microanimaciones suaves
- Paleta de colores: azul primario, tonos cálidos, acentos pastel

## 📁 Estructura del Proyecto

```
descanso-premium/
├── app/
│   ├── api/
│   │   └── checkout/
│   ├── simulador/
│   │   └── page.tsx          # Simulador interactivo
│   ├── catalogo/
│   │   └── page.tsx          # Catálogo con filtros
│   ├── carrito/
│   │   └── page.tsx          # Carrito y checkout
│   ├── comparador/
│   ├── profesional/
│   ├── blog/
│   ├── layout.tsx            # Layout principal
│   ├── page.tsx              # Home page
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductShowcase.tsx
│   │   ├── TrustBadges.tsx
│   │   └── Testimonials.tsx
│   ├── simulador/
│   │   ├── SimulatorStep.tsx
│   │   └── SimulatorResults.tsx
│   └── ui/
│       ├── ProductCard.tsx
│       └── FloatingAssistant.tsx
├── lib/                      # Utilidades y helpers
├── public/                   # Assets estáticos
└── styles/
```

## 🚀 Instalación

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/descanso-premium.git
cd descanso-premium
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:
- Stripe API keys
- Google Tag Manager ID
- Meta Pixel ID
- Klaviyo/HubSpot API (opcional)
- OpenAI API key (para asesor virtual)

4. **Ejecutar en desarrollo**
```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Build para Producción

```bash
# Build
npm run build

# Iniciar servidor de producción
npm start
```

## 📦 Deploy

### Vercel (Recomendado)
1. Push tu código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Configura las variables de entorno
4. Deploy automático

### AWS / Custom Server
```bash
npm run build
npm start
```

## 🎨 Personalización

### Colores
Edita `tailwind.config.js` para personalizar la paleta de colores:

```js
colors: {
  primary: {
    500: '#0ea5e9', // Tu color principal
  },
  // ...
}
```

### Contenido
- **Productos**: Edita los arrays de productos en las páginas
- **Preguntas del simulador**: Modifica `app/simulador/page.tsx`
- **Testimonios**: Actualiza `components/sections/Testimonials.tsx`

## 🔧 Configuración de Marketing

### Google Tag Manager
1. Obtén tu GTM ID en [tagmanager.google.com](https://tagmanager.google.com)
2. Añádelo en `.env.local`
3. El código ya está integrado en `app/layout.tsx`

### Meta Pixel
Añade tu Pixel ID en las variables de entorno y configura eventos personalizados.

### Email Marketing
Integración lista para:
- Klaviyo
- HubSpot
- Mailchimp

## 📊 Funcionalidades Pendientes de Implementar

- [ ] Integración completa con Stripe
- [ ] CMS (Strapi o Sanity) para gestión de productos
- [ ] Área de usuario / Login
- [ ] Wishlist / Favoritos
- [ ] Sistema de reviews verificadas
- [ ] Blog con contenido SEO
- [ ] Chatbot con IA (OpenAI)
- [ ] Integración con Klarna/Aplazame
- [ ] Panel de administración

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y está protegido por derechos de autor.

## 📞 Soporte

Para soporte y consultas:
- Email: info@dtiendacolchon.es
- Web: https://tiendacolchon.es

---

**Desarrollado con ❤️ para el mejor descanso de tus clientes**
