'use server'

import {
	deleteAllCartItems,
	deleteCartItem,
	getCartItem,
	getUserCartItems,
	insertCartItem,
	updateCartItemQuantity,
} from '@/database/queries/cart'
import type { CartItem } from '@/lib/stores/cart-store'
import { revalidatePath } from 'next/cache'

// obtener items del carrito de un usuario desde la base de datos
export async function getCartItemsFromDB(userId: string): Promise<CartItem[]> {
	return await getUserCartItems(userId)
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

		// Verificar si el item ya existe
		const existingItem = await getCartItem(userId, productId)

		if (existingItem) {
			// Actualizar cantidad existente
			await updateCartItemQuantity(userId, productId, quantity)
		} else {
			// Insertar nuevo item
			await insertCartItem(userId, productId, quantity)
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
		await deleteCartItem(userId, productId)

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
		await deleteAllCartItems(userId)

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
