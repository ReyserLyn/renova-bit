'use server'

import { db } from '@/database'
import { cartItems } from '@/database/schema'
import type { CartItem } from '@/lib/stores/cart-store'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

/**
 * Obtener items del carrito de un usuario desde la base de datos
 */
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

/**
 * Guardar o actualizar un item en el carrito de la base de datos
 */
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

/**
 * Eliminar un item del carrito en la base de datos
 */
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

/**
 * Limpiar todo el carrito de un usuario en la base de datos
 */
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

/**
 * Sincronizar el carrito local con la base de datos
 * (útil al iniciar sesión)
 */
export async function syncCartWithDB(userId: string, localItems: CartItem[]) {
	try {
		// Obtener items actuales en la DB
		const dbItems = await getCartItemsFromDB(userId)

		// Crear un mapa para búsqueda rápida
		const dbItemsMap = new Map(dbItems.map((item) => [item.product.id, item]))
		let hasChanges = false

		// Sincronizar cada item local
		for (const localItem of localItems) {
			const dbItem = dbItemsMap.get(localItem.product.id)

			if (dbItem) {
				// Si existe en DB, usar la cantidad mayor
				const newQuantity = Math.max(dbItem.quantity, localItem.quantity)
				if (newQuantity !== dbItem.quantity) {
					await saveCartItemToDB(userId, localItem.product.id, newQuantity)
					hasChanges = true
				}
			} else {
				// Si no existe en DB, agregarlo
				await saveCartItemToDB(userId, localItem.product.id, localItem.quantity)
				hasChanges = true
			}
		}

		// Solo obtener el carrito actualizado si hubo cambios
		if (hasChanges) {
			const updatedCart = await getCartItemsFromDB(userId)
			return { success: true, items: updatedCart }
		}

		// Si no hubo cambios, devolver los items actuales
		return { success: true, items: dbItems }
	} catch (error) {
		console.error('Error al sincronizar carrito:', error)
		return { success: false, error: 'Error al sincronizar carrito' }
	}
}
