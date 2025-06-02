import { db } from '@/database'
import { brands } from '@/database/schema'
import { eq } from 'drizzle-orm'

/**
 * Obtener una marca por su slug con sus productos
 */
export async function getBrandBySlug(slug: string) {
	return await db.query.brands.findMany({
		where: eq(brands.slug, slug),
		with: {
			products: {
				with: {
					brand: true,
					category: true,
				},
			},
		},
	})
}

/**
 * Obtener todas las marcas
 */
export async function getAllBrands() {
	return await db.query.brands.findMany({
		orderBy: brands.name,
	})
}

/**
 * Obtener una marca por su ID
 */
export async function getBrandById(brandId: string) {
	return await db.query.brands.findFirst({
		where: eq(brands.id, brandId),
	})
}
