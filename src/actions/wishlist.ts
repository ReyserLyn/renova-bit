'use server'

import {
	addToWishlist,
	isInWishlist,
	removeFromWishlist,
} from '@/database/queries/wishlist'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function toggleWishlist(productId: string) {
	try {
		const { userId } = await auth()

		if (!userId) {
			return {
				success: false,
				error: 'Debes iniciar sesión para agregar a favoritos',
			}
		}

		const isCurrentlyInWishlist = await isInWishlist(userId, productId)

		if (isCurrentlyInWishlist) {
			await removeFromWishlist(userId, productId)
			return {
				success: true,
				action: 'removed',
				message: 'Producto removido de favoritos',
			}
		}

		await addToWishlist(userId, productId)
		return {
			success: true,
			action: 'added',
			message: 'Producto agregado a favoritos',
		}
	} catch (error) {
		console.error('Error al toggle wishlist:', error)
		return {
			success: false,
			error: 'Error interno del servidor',
		}
	} finally {
		revalidatePath('/producto/[slug]', 'page')
	}
}
