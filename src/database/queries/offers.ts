import { and, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '..'
import { brands, categories, offers, products } from '../schema'

// Obtener todas las ofertas activas y válidas
export async function getActiveOffers() {
	const now = new Date()

	return await db
		.select({
			id: offers.id,
			product_id: offers.product_id,
			offer_price: offers.offer_price,
			discount_percent: offers.discount_percent,
			start_date: offers.start_date,
			end_date: offers.end_date,
			product: {
				id: products.id,
				name: products.name,
				slug: products.slug,
				image_url: products.image_url,
				short_description: products.short_description,
				long_description: products.long_description,
				stock: products.stock,
				price_web: products.price_web,
				price: products.price,
				brand_id: products.brand_id,
				category_id: products.category_id,
				condition_id: products.condition_id,
				rating: products.rating,
				rating_count: products.rating_count,
			},
			brand: {
				id: brands.id,
				name: brands.name,
				slug: brands.slug,
			},
			category: {
				id: categories.id,
				name: categories.name,
				slug: categories.slug,
			},
		})
		.from(offers)
		.leftJoin(products, eq(offers.product_id, products.id))
		.leftJoin(brands, eq(products.brand_id, brands.id))
		.leftJoin(categories, eq(products.category_id, categories.id))
		.where(
			and(
				eq(offers.is_active, true),
				lte(offers.start_date, now),
				gte(offers.end_date, now),
			),
		)
		.orderBy(sql`${offers.discount_percent} DESC`)
}

// Obtener oferta de un producto específico
export async function getProductOffer(productId: string) {
	const now = new Date()

	const result = await db
		.select()
		.from(offers)
		.where(
			and(
				eq(offers.product_id, productId),
				eq(offers.is_active, true),
				lte(offers.start_date, now),
				gte(offers.end_date, now),
			),
		)
		.limit(1)

	return result[0] || null
}

// Crear una nueva oferta
export async function createOffer(data: {
	product_id: string
	offer_price: string
	discount_percent: number
	start_date: Date
	end_date: Date
}) {
	return await db.insert(offers).values(data).returning()
}

// Desactivar ofertas expiradas (función para usar en cron jobs)
export async function deactivateExpiredOffers() {
	const now = new Date()

	return await db
		.update(offers)
		.set({ is_active: false })
		.where(and(eq(offers.is_active, true), lte(offers.end_date, now)))
		.returning()
}

// Verificar si un producto tiene oferta activa
export async function hasActiveOffer(productId: string): Promise<boolean> {
	const offer = await getProductOffer(productId)
	return offer !== null
}
