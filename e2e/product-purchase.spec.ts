// e2e/product-purchase.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Flujo de Compra Completo', () => {
  test('usuario puede comprar un colchón', async ({ page }) => {
    // 1. Ir a la página principal
    await page.goto('/')
    await expect(page).toHaveTitle(/TiendaColchon/i)

    // 2. Navegar al catálogo
    await page.click('text=Catálogo')
    await expect(page).toHaveURL(/\/catalogo/)

    // 3. Seleccionar un producto
    await page.click('text=Imperial Lux')
    await expect(page).toHaveURL(/\/producto\//)

    // 4. Añadir al carrito
    await page.click('button:has-text("Añadir al carrito")')
    await expect(page.locator('.cart-notification')).toBeVisible()

    // 5. Ir al carrito
    await page.click('[aria-label="Carrito"]')
    await expect(page).toHaveURL(/\/carrito/)

    // 6. Proceder al checkout
    await page.click('text=Proceder al pago')
    await expect(page).toHaveURL(/\/checkout/)

    // 7. Rellenar formulario
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="name"]', 'Test User')
    await page.fill('[name="address"]', 'Calle Test 123')

    // 8. Completar pago (modo test de Stripe)
    await page.fill('[name="cardNumber"]', '4242424242424242')
    await page.fill('[name="cardExpiry"]', '12/25')
    await page.fill('[name="cardCvc"]', '123')

    // 9. Confirmar compra
    await page.click('button:has-text("Confirmar compra")')

    // 10. Verificar página de éxito
    await expect(page).toHaveURL(/\/success/)
    await expect(page.locator('text=Compra realizada')).toBeVisible()
  })

  test('validación de formulario de checkout', async ({ page }) => {
    await page.goto('/checkout')

    // Intentar enviar sin datos
    await page.click('button:has-text("Confirmar compra")')

    // Verificar mensajes de error
    await expect(page.locator('text=Email requerido')).toBeVisible()
    await expect(page.locator('text=Nombre requerido')).toBeVisible()
  })
})