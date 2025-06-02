'use server'

import {
	deleteReview,
	getUserProductReview,
	insertReview,
	updateProductRating,
	updateReview,
} from '@/database/queries/reviews'
import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

interface CreateReviewData {
	productId: string
	rating: number
	title: string
	comment: string
}

interface UpdateReviewData {
	reviewId: string
	rating: number
	title: string
	comment: string
}

export async function createReview(data: CreateReviewData) {
	try {
		const { userId } = await auth()
		const user = await currentUser()

		if (!userId) {
			return {
				success: false,
				error: 'Debes iniciar sesión para dejar una reseña',
			}
		}

		const userEmail =
			(user?.primaryEmailAddress?.emailAddress as string) ||
			`${userId}@temp.com`

		const userName =
			(user?.username as string) ||
			(user?.fullName as string) ||
			(user?.firstName as string) ||
			'Usuario'

		const userImageUrl = (user?.imageUrl as string) || null

		const existingReview = await getUserProductReview(data.productId, userId)
		if (existingReview) {
			return {
				success: false,
				error: 'Ya has dejado una reseña para este producto',
			}
		}

		if (data.rating < 1 || data.rating > 5) {
			return {
				success: false,
				error: 'La calificación debe estar entre 1 y 5 estrellas',
			}
		}

		if (data.title.trim().length < 5) {
			return {
				success: false,
				error: 'El título debe tener al menos 5 caracteres',
			}
		}

		if (data.comment.trim().length < 5) {
			return {
				success: false,
				error: 'El comentario debe tener al menos 5 caracteres',
			}
		}

		await insertReview({
			product_id: data.productId,
			user_id: userId,
			user_name: userName,
			user_email: userEmail,
			user_image_url: userImageUrl,
			rating: data.rating,
			title: data.title.trim(),
			comment: data.comment.trim(),
		})

		await updateProductRating(data.productId)

		revalidatePath('/producto', 'layout')
		revalidatePath('/', 'layout')

		return {
			success: true,
			message: 'Reseña creada exitosamente',
		}
	} catch (error) {
		console.error('Error al crear reseña:', error)
		return {
			success: false,
			error: 'Error interno del servidor',
		}
	}
}

export async function editReview(data: UpdateReviewData) {
	try {
		const { userId } = await auth()

		if (!userId) {
			return {
				success: false,
				error: 'Debes iniciar sesión para editar la reseña',
			}
		}

		if (data.rating < 1 || data.rating > 5) {
			return {
				success: false,
				error: 'La calificación debe estar entre 1 y 5 estrellas',
			}
		}

		if (data.title.trim().length < 5) {
			return {
				success: false,
				error: 'El título debe tener al menos 5 caracteres',
			}
		}

		if (data.comment.trim().length < 5) {
			return {
				success: false,
				error: 'El comentario debe tener al menos 5 caracteres',
			}
		}

		const updated = await updateReview(data.reviewId, {
			rating: data.rating,
			title: data.title.trim(),
			comment: data.comment.trim(),
		})

		if (updated.length > 0) {
			await updateProductRating(updated[0].product_id)
		}

		revalidatePath('/producto', 'layout')
		revalidatePath('/', 'layout')

		return {
			success: true,
			message: 'Reseña actualizada exitosamente',
		}
	} catch (error) {
		console.error('Error al editar reseña:', error)
		return {
			success: false,
			error: 'Error interno del servidor',
		}
	}
}

export async function removeReview(reviewId: string) {
	try {
		const { userId } = await auth()

		if (!userId) {
			return {
				success: false,
				error: 'Debes iniciar sesión para eliminar la reseña',
			}
		}

		const deleted = await deleteReview(reviewId)

		if (deleted.length > 0) {
			try {
				await updateProductRating(deleted[0].product_id)
			} catch (ratingError) {
				console.error('Error al actualizar rating:', ratingError)
				// Continuamos aunque falle el rating
			}
		}

		revalidatePath('/producto', 'layout')
		revalidatePath('/', 'layout')

		return {
			success: true,
			message: 'Reseña eliminada exitosamente',
		}
	} catch (error) {
		console.error('Error completo al eliminar reseña:', error)
		return {
			success: false,
			error: 'Error interno del servidor',
		}
	}
}
