import { createCoupon } from '@/actions/coupons'

/**
 * Script para crear cupones desde la línea de comandos
 * Uso: pnpm tsx src/scripts/create-coupon.ts TECNO10 10
 */
async function main() {
	const args = process.argv.slice(2)

	if (args.length < 2) {
		console.error(
			'Uso: pnpm tsx src/scripts/create-coupon.ts <CODIGO> <PORCENTAJE>',
		)
		console.error('Ejemplo: pnpm tsx src/scripts/create-coupon.ts TECNO10 10')
		process.exit(1)
	}

	const [code, discountStr] = args
	const discountPercent = Number.parseInt(discountStr)

	if (
		Number.isNaN(discountPercent) ||
		discountPercent <= 0 ||
		discountPercent > 100
	) {
		console.error('El porcentaje debe ser un número entre 1 y 100')
		process.exit(1)
	}

	console.log(`Creando cupón ${code} con ${discountPercent}% de descuento...`)

	const result = await createCoupon(code, discountPercent, {
		validUntil: new Date('2025-12-31'),
		minPurchase: 50,
	})

	if (result.success) {
		console.log('✅ Cupón creado exitosamente!')
		console.log(`ID: ${result.coupon?.id}`)
		console.log(`Código: ${code}`)
		console.log(`Descuento: ${discountPercent}%`)
	} else {
		console.error('❌ Error al crear cupón:', result.error)
		process.exit(1)
	}

	process.exit(0)
}

main().catch((error) => {
	console.error('Error:', error)
	process.exit(1)
})
