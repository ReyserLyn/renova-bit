'use client'

import { removeReview } from '@/actions/reviews'
import { ReviewForm } from '@/components/product/review-form'
import { ReviewList } from '@/components/product/review-list'
import { DeleteConfirmationDialog } from '@/components/ui/delete-confirmation-dialog'
import type { Review, ReviewStats } from '@/types/product'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface ReviewSectionProps {
	productId: string
	productName: string
	reviews: Review[]
	reviewStats: ReviewStats
	userReview: Review | null
	currentUserId?: string
}

export function ReviewSection({
	productId,
	productName,
	reviews,
	reviewStats,
	userReview,
	currentUserId,
}: ReviewSectionProps) {
	const router = useRouter()
	const pathname = usePathname()
	const [editingReview, setEditingReview] = useState<Review | null>(null)
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [reviewToDelete, setReviewToDelete] = useState<string | null>(null)
	const [isDeleting, setIsDeleting] = useState(false)

	const handleEditReview = (review: Review) => {
		setEditingReview(review)
	}

	const handleCancelEdit = () => {
		setEditingReview(null)
	}

	const handleDeleteReview = (reviewId: string) => {
		setReviewToDelete(reviewId)
		setShowDeleteDialog(true)
	}

	const handleCloseDeleteDialog = () => {
		setShowDeleteDialog(false)
		setReviewToDelete(null)
	}

	const handleConfirmDelete = async () => {
		if (!reviewToDelete) return

		setIsDeleting(true)
		try {
			const result = await removeReview(reviewToDelete)
			if (result.success) {
				toast.success('Reseña eliminada exitosamente')
				setShowDeleteDialog(false)

				router.refresh()

				setTimeout(() => {
					router.refresh()
				}, 100)
			} else {
				toast.error(result.error || 'Error al eliminar la reseña')
			}
		} catch (error) {
			toast.error('Error al eliminar la reseña')
		} finally {
			setIsDeleting(false)
		}
	}

	const handleReviewUpdated = () => {
		router.refresh()
		setTimeout(() => {
			router.refresh()
		}, 100)
	}

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
				<div className="lg:col-span-2">
					<ReviewList
						reviews={reviews}
						stats={reviewStats}
						currentUserId={currentUserId}
						onEditReview={handleEditReview}
						onDeleteReview={handleDeleteReview}
					/>
				</div>

				<div>
					<ReviewForm
						productId={productId}
						productName={productName}
						hasExistingReview={!!userReview}
						editingReview={editingReview}
						onCancelEdit={handleCancelEdit}
						onReviewUpdated={handleReviewUpdated}
					/>
				</div>
			</div>

			{showDeleteDialog && (
				<DeleteConfirmationDialog
					isOpen={showDeleteDialog}
					onClose={handleCloseDeleteDialog}
					onConfirm={handleConfirmDelete}
					title="¿Eliminar reseña?"
					description="Esta acción no se puede deshacer. Tu reseña será eliminada permanentemente."
					confirmText="Eliminar reseña"
					cancelText="Cancelar"
					isLoading={isDeleting}
				/>
			)}
		</>
	)
}
