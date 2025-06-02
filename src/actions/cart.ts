'use server'

import { db } from '@/database'
import { cartItems } from '@/database/schema'
import type { CartItem } from '@/lib/stores/cart-store'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// obtener items del carrito de un usuario desde la base de datos
export async function getCartItemsFromDB(userId: string): Promise<CartItem[]> {
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

// guardar o actualizar un item en el carrito de la base de datos
export async function saveCartItemToDB(
	userId: string,
	productId: string,
	quantity: number,
) {
	try {
		if (quantity <= 0) {
			// Si la cantidad es 0 o menos, eliminar el item
			await removeCartItemFromDB(userId, productId)
			return
		}

		// Intentar actualizar primero
		const updated = await db
			.update(cartItems)
			.set({
				quantity,
				updated_at: new Date(),
			})
			.where(
				and(eq(cartItems.user_id, userId), eq(cartItems.product_id, productId)),
			)
			.returning()

		// Si no se actualizó ningún registro, insertar uno nuevo
		if (updated.length === 0) {
			await db.insert(cartItems).values({
				user_id: userId,
				product_id: productId,
				quantity,
			})
		}

		revalidatePath('/cart')
		return { success: true }
	} catch (error) {
		console.error('Error al guardar item en el carrito:', error)
		return { success: false, error: 'Error al guardar en el carrito' }
	}
}

// eliminar un item del carrito en la base de datos
export async function removeCartItemFromDB(userId: string, productId: string) {
	try {
		await db
			.delete(cartItems)
			.where(
				and(eq(cartItems.user_id, userId), eq(cartItems.product_id, productId)),
			)

		revalidatePath('/cart')
		return { success: true }
	} catch (error) {
		console.error('Error al eliminar item del carrito:', error)
		return { success: false, error: 'Error al eliminar del carrito' }
	}
}

// limpiar todo el carrito de un usuario en la base de datos
export async function clearCartInDB(userId: string) {
	try {
		await db.delete(cartItems).where(eq(cartItems.user_id, userId))

		revalidatePath('/cart')
		return { success: true }
	} catch (error) {
		console.error('Error al limpiar el carrito:', error)
		return { success: false, error: 'Error al limpiar el carrito' }
	}
}

// reemplazar completamente el carrito en la base de datos con items locales
export async function replaceCartInDB(userId: string, localItems: CartItem[]) {
	try {
		// Primero limpiar todo el carrito existente en la BD
		await clearCartInDB(userId)

		// Luego insertar todos los items locales
		if (localItems.length > 0) {
			for (const localItem of localItems) {
				await saveCartItemToDB(userId, localItem.product.id, localItem.quantity)
			}
		}

		revalidatePath('/cart')
		return { success: true, items: localItems }
	} catch (error) {
		console.error('Error al reemplazar carrito:', error)
		return { success: false, error: 'Error al reemplazar carrito' }
	}
}
