import { db } from '@/database'
import { cartItems } from '@/database/schema'
import type { CartItem } from '@/lib/stores/cart-store'
import { and, eq } from 'drizzle-orm'

/**
 * Obtener todos los items del carrito de un usuario
 */
export async function getUserCartItems(userId: string): Promise<CartItem[]> {
	try {
		const items = await db.query.cartItems.findMany({
			where: eq(cartItems.user_id, userId),
			with: {
				product: {
					with: {
						brand: true,
					},
				},
			},
		})

		return items.map((item) => ({
			product: item.product,
			quantity: item.quantity,
		}))
	} catch (error) {
		console.error('Error al obtener items del carrito:', error)
		return []
	}
}

/**
 * Insertar un nuevo item en el carrito
 */
export async function insertCartItem(
	userId: string,
	productId: string,
	quantity: number,
) {
	return await db.insert(cartItems).values({
		user_id: userId,
		product_id: productId,
		quantity,
	})
}

/**
 * Actualizar la cantidad de un item del carrito
 */
export async function updateCartItemQuantity(
	userId: string,
	productId: string,
	quantity: number,
) {
	return await db
		.update(cartItems)
		.set({
			quantity,
			updated_at: new Date(),
		})
		.where(
			and(eq(cartItems.user_id, userId), eq(cartItems.product_id, productId)),
		)
		.returning()
}

/**
 * Eliminar un item específico del carrito
 */
export async function deleteCartItem(userId: string, productId: string) {
	return await db
		.delete(cartItems)
		.where(
			and(eq(cartItems.user_id, userId), eq(cartItems.product_id, productId)),
		)
}

/**
 * Eliminar todos los items del carrito de un usuario
 */
export async function deleteAllCartItems(userId: string) {
	return await db.delete(cartItems).where(eq(cartItems.user_id, userId))
}

/**
 * Verificar si un producto existe en el carrito de un usuario
 */
export async function getCartItem(userId: string, productId: string) {
	return await db.query.cartItems.findFirst({
		where: and(
			eq(cartItems.user_id, userId),
			eq(cartItems.product_id, productId),
		),
	})
} 