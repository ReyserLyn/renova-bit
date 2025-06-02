import { db } from '@/database'
import { wishlists } from '@/database/schema'
import { and, eq } from 'drizzle-orm'

/**
 * Agregar producto a wishlist
 */
export async function addToWishlist(userId: string, productId: string) {
	return await db
		.insert(wishlists)
		.values({
			user_id: userId,
			product_id: productId,
		})
		.returning()
}

/**
 * Remover producto de wishlist
 */
export async function removeFromWishlist(userId: string, productId: string) {
	return await db
		.delete(wishlists)
		.where(
			and(eq(wishlists.user_id, userId), eq(wishlists.product_id, productId)),
		)
}

/**
 * Verificar si producto está en wishlist
 */
export async function isInWishlist(userId: string, productId: string) {
	const item = await db.query.wishlists.findFirst({
		where: and(
			eq(wishlists.user_id, userId),
			eq(wishlists.product_id, productId),
		),
	})
	return !!item
}

/**
 * Obtener wishlist del usuario
 */
export async function getUserWishlist(userId: string) {
	return await db.query.wishlists.findMany({
		where: eq(wishlists.user_id, userId),
		with: {
			product: {
				with: {
					brand: true,
					category: true,
				},
			},
		},
	})
}
