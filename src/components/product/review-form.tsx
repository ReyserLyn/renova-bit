'use client'

import { createReview, editReview } from '@/actions/reviews'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Rating } from '@/components/ui/rating'
import { Textarea } from '@/components/ui/textarea'
import type { Review } from '@/types/product'
import { SignInButton, useUser } from '@clerk/nextjs'
import bcrypt from 'bcryptjs'
import { Loader2, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface ReviewFormProps {
	productId: string
	productName: string
	hasExistingReview?: boolean
	editingReview?: Review | null
	onCancelEdit?: () => void
	onReviewUpdated?: () => void
}

export function ReviewForm({
	productId,
	productName,
	hasExistingReview = false,
	editingReview = null,
	onCancelEdit,
	onReviewUpdated,
}: ReviewFormProps) {
	const { user } = useUser()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [rating, setRating] = useState(5)
	const [title, setTitle] = useState('')
	const [comment, setComment] = useState('')

	const isEditing = !!editingReview

	const [clerkReady] = useState(true)

	useEffect(() => {
		if (editingReview) {
			setRating(editingReview.rating)
			setTitle(editingReview.title)
			setComment(editingReview.comment)
		} else {
			setRating(5)
			setTitle('')
			setComment('')
		}
	}, [editingReview])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!user) {
			toast.error('Debes iniciar sesión para dejar una reseña')
			return
		}

		setIsSubmitting(true)

		try {
			let result: { success: boolean; message?: string; error?: string }

			if (isEditing && editingReview) {
				result = await editReview({
					reviewId: editingReview.id,
					rating,
					title,
					comment,
				})
			} else {
				result = await createReview({
					productId,
					rating,
					title,
					comment,
				})
			}

			if (result.success) {
				toast.success(
					result.message ||
						(isEditing ? 'Reseña actualizada' : 'Reseña enviada'),
				)

				if (isEditing) {
					onCancelEdit?.()
				} else {
					setTitle('')
					setComment('')
					setRating(5)
				}

				onReviewUpdated?.()
			} else {
				toast.error(result.error || 'Error al procesar la reseña')
			}
		} catch (error) {
			toast.error('Error al procesar la reseña. Inténtalo de nuevo.')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleCancel = () => {
		if (isEditing) {
			onCancelEdit?.()
		} else {
			setTitle('')
			setComment('')
			setRating(5)
		}
	}

	if (!clerkReady) {
		return (
			<Card>
				<CardHeader>
					<div className="h-6 bg-muted rounded animate-pulse" />
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<div className="h-4 bg-muted rounded animate-pulse w-20" />
						<div className="flex gap-1">
							{[...Array(5)].map((_, i) => (
								<div
									key={bcrypt.genSaltSync(2)}
									className="h-6 w-6 bg-muted rounded animate-pulse"
								/>
							))}
						</div>
					</div>
					<div className="space-y-2">
						<div className="h-4 bg-muted rounded animate-pulse w-32" />
						<div className="h-10 bg-muted rounded animate-pulse" />
					</div>
					<div className="space-y-2">
						<div className="h-4 bg-muted rounded animate-pulse w-24" />
						<div className="h-24 bg-muted rounded animate-pulse" />
					</div>
					<div className="h-10 bg-muted rounded animate-pulse" />
				</CardContent>
			</Card>
		)
	}

	if (!user) {
		return (
			<Card>
				<CardContent>
					<div className="text-center py-8">
						<div className="h-12 w-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
							<Star className="h-6 w-6 text-primary" />
						</div>
						<h3 className="text-lg font-semibold mb-2">
							Inicia sesión para escribir una reseña
						</h3>
						<p className="text-muted-foreground mb-4">
							Necesitas estar autenticado para poder compartir tu experiencia
							con este producto
						</p>
						<Button asChild>
							<SignInButton mode="modal" />
						</Button>
					</div>
				</CardContent>
			</Card>
		)
	}

	if (hasExistingReview && !isEditing) {
		return (
			<Card>
				<CardContent>
					<div className="text-center py-8">
						<Star className="h-12 w-12 mx-auto text-yellow-400 mb-4" />
						<h3 className="text-lg font-semibold mb-2">
							Ya has reseñado este producto
						</h3>
						<p className="text-muted-foreground">
							Solo puedes dejar una reseña por producto
						</p>
					</div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					{isEditing
						? 'Editar reseña'
						: `Escribir una reseña para ${productName}`}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="rating">Calificación</Label>
						<div className="flex items-center gap-2">
							<Rating
								value={rating}
								interactive
								onChange={setRating}
								size="lg"
							/>
							<span className="text-sm text-muted-foreground">
								({rating} {rating === 1 ? 'estrella' : 'estrellas'})
							</span>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="title">Título de la reseña</Label>
						<Input
							id="title"
							value={title}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setTitle(e.target.value)
							}
							placeholder="Resumen de tu experiencia"
							required
							maxLength={200}
							className="text-foreground bg-background border-border"
						/>
						<p className="text-xs text-muted-foreground">
							{title.length}/200 caracteres
						</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="comment">Comentario</Label>
						<Textarea
							id="comment"
							value={comment}
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
								setComment(e.target.value)
							}
							placeholder="Comparte los detalles de tu experiencia con este producto..."
							required
							rows={4}
							maxLength={1000}
							className="text-foreground bg-background border-border"
						/>
						<p className="text-xs text-muted-foreground">
							{comment.length}/1000 caracteres
						</p>
					</div>

					<div className="flex gap-3">
						{isEditing && (
							<Button
								type="button"
								variant="outline"
								onClick={handleCancel}
								disabled={isSubmitting}
								className="flex-1"
							>
								Cancelar
							</Button>
						)}

						<Button
							type="submit"
							disabled={isSubmitting || !title.trim() || !comment.trim()}
							className={isEditing ? 'flex-1' : 'w-full'}
						>
							{isSubmitting && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							{isSubmitting
								? isEditing
									? 'Actualizando...'
									: 'Enviando reseña...'
								: isEditing
									? 'Actualizar reseña'
									: 'Enviar reseña'}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	)
}
