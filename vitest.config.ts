import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    // Actualizado de './vitest.setup.ts' a './tests/setup.ts'
    setupFiles: ['./tests/setup.ts'], 
    // Patrones de inclusión de archivos de prueba más amplios
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], 
    // Directorios a excluir
    exclude: ['node_modules', 'dist', '.next', 'e2e'], 
    coverage: {
      provider: 'v8',
      // Reporteros de cobertura añadidos
      reporter: ['text', 'json', 'html', 'lcov'], 
      // Archivos a incluir en el análisis de cobertura
      include: ['app/**', 'components/**', 'lib/**'], 
      // Archivos y directorios a excluir del análisis de cobertura
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        '.next/',
        'app/layout.tsx',
        'app/**/layout.tsx',
        'app/**/loading.tsx',
        'app/**/error.tsx',
        'app/**/not-found.tsx',
      ],
      // Umbrales de cobertura obligatorios
      thresholds: { 
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
  resolve: {
    alias: {
      // Mantenido el alias raíz
      '@': path.resolve(__dirname, './'), 
      // Nuevos aliases específicos añadidos
      '@/components': path.resolve(__dirname, './components'), 
      '@/lib': path.resolve(__dirname, './lib'),
      '@/app': path.resolve(__dirname, './app'),
    },
  },
})