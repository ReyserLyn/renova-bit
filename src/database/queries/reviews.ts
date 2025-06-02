import { db } from '@/database'
import { products, reviews } from '@/database/schema'
import { and, desc, eq, sql } from 'drizzle-orm'

/**
 * Obtener reviews de un producto
 */
export async function getProductReviews(productId: string) {
	return await db.query.reviews.findMany({
		where: and(
			eq(reviews.product_id, productId),
			eq(reviews.is_approved, true),
		),
		orderBy: [desc(reviews.created_at)],
	})
}

/**
 * Obtener estadísticas de reviews de un producto
 */
export async function getProductReviewStats(productId: string) {
	const stats = await db
		.select({
			totalReviews: sql<number>`count(*)::int`,
			averageRating: sql<number>`round(avg(${reviews.rating})::numeric, 2)::float`,
			rating5: sql<number>`count(case when ${reviews.rating} = 5 then 1 end)::int`,
			rating4: sql<number>`count(case when ${reviews.rating} = 4 then 1 end)::int`,
			rating3: sql<number>`count(case when ${reviews.rating} = 3 then 1 end)::int`,
			rating2: sql<number>`count(case when ${reviews.rating} = 2 then 1 end)::int`,
			rating1: sql<number>`count(case when ${reviews.rating} = 1 then 1 end)::int`,
		})
		.from(reviews)
		.where(
			and(eq(reviews.product_id, productId), eq(reviews.is_approved, true)),
		)

	return (
		stats[0] || {
			totalReviews: 0,
			averageRating: 0,
			rating5: 0,
			rating4: 0,
			rating3: 0,
			rating2: 0,
			rating1: 0,
		}
	)
}

/**
 * Insertar una nueva review
 */
export async function insertReview(data: {
	product_id: string
	user_id: string
	user_name: string
	user_email: string
	user_image_url?: string | null
	rating: number
	title: string
	comment: string
	is_verified_purchase?: boolean
}) {
	return await db.insert(reviews).values(data).returning()
}

/**
 * Verificar si un usuario ya ha revieweado un producto
 */
export async function getUserProductReview(productId: string, userId: string) {
	return await db.query.reviews.findFirst({
		where: and(eq(reviews.product_id, productId), eq(reviews.user_id, userId)),
	})
}

/**
 * Actualizar el rating promedio de un producto
 */
export async function updateProductRating(productId: string) {
	try {
		const stats = await getProductReviewStats(productId)

		// Si no hay reseñas, establecer rating en null y count en 0
		const rating =
			stats.totalReviews > 0 ? stats.averageRating.toString() : null
		const ratingCount = stats.totalReviews

		const result = await db
			.update(products)
			.set({
				rating: rating,
				rating_count: ratingCount,
			})
			.where(eq(products.id, productId))
			.returning()

		return result
	} catch (error) {
		console.error('Error en updateProductRating:', error)
		throw error
	}
}

/**
 * Actualizar una review
 */
export async function updateReview(
	reviewId: string,
	data: {
		rating: number
		title: string
		comment: string
	},
) {
	return await db
		.update(reviews)
		.set({
			...data,
			updated_at: new Date(),
		})
		.where(eq(reviews.id, reviewId))
		.returning()
}

/**
 * Eliminar una review
 */
export async function deleteReview(reviewId: string) {
	return await db.delete(reviews).where(eq(reviews.id, reviewId)).returning()
}
