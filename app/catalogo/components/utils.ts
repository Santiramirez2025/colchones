// app/catalogo/components/utils.ts

// Helper para parsear campos JSON/multilinea
export const parseJsonField = (field: any): string[] => {
    if (Array.isArray(field)) return field
    if (typeof field === 'string') {
      if (field.includes('\n')) {
        return field.split('\n').filter(Boolean)
      }
      try {
        const parsed = JSON.parse(field)
        return Array.isArray(parsed) ? parsed : []
      } catch (e) {
        return field ? [field] : []
      }
    }
    return []
  }
  
  // Constantes de filtros
  export const filters = {
    firmness: ['Todas', 'Suave', 'Media-Suave', 'Media', 'Media-Firme', 'Firme'],
    price: ['Todos', 'Hasta 500€', '500-800€', '800-1200€', 'Más de 1200€'],
    rating: ['Todas', '4.5+', '4.7+', '4.9+']
  }