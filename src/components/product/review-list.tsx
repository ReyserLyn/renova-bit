import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RatingDisplay } from '@/components/ui/rating'
import type { Review, ReviewStats } from '@/types/product'
import { CheckCircle, Edit, MoreHorizontal, Trash2, User } from 'lucide-react'
import Image from 'next/image'

interface ReviewListProps {
	reviews: Review[]
	stats: ReviewStats
	currentUserId?: string
	onEditReview?: (review: Review) => void
	onDeleteReview?: (reviewId: string) => void
}

const formatDate = (date: string | Date) => {
	return new Date(date).toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}

export function ReviewList({
	reviews,
	stats,
	currentUserId,
	onEditReview,
	onDeleteReview,
}: ReviewListProps) {
	if (reviews.length === 0) {
		return (
			<Card>
				<CardContent>
					<div className="text-center py-8">
						<User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
						<h3 className="text-lg font-semibold mb-2">Aún no hay reseñas</h3>
						<p className="text-muted-foreground">
							Sé el primero en compartir tu experiencia con este producto
						</p>
					</div>
				</CardContent>
			</Card>
		)
	}

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold">
							Reseñas de clientes ({stats.totalReviews})
						</h3>
						<RatingDisplay
							rating={stats.averageRating}
							count={stats.totalReviews}
							size="md"
						/>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						{[5, 4, 3, 2, 1].map((star) => {
							const count = stats[
								`rating${star}` as keyof ReviewStats
							] as number
							const percentage =
								stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0

							return (
								<div key={star} className="flex items-center gap-2 text-sm">
									<span className="w-8">{star}★</span>
									<div className="flex-1 bg-muted rounded-full h-2">
										<div
											className="bg-yellow-400 h-2 rounded-full transition-all"
											style={{ width: `${percentage}%` }}
										/>
									</div>
									<span className="text-muted-foreground w-12 text-right">
										{count}
									</span>
								</div>
							)
						})}
					</div>
				</CardContent>
			</Card>

			<div className="space-y-4">
				{reviews.map((review) => {
					const isOwner = currentUserId === review.user_id

					return (
						<Card key={review.id}>
							<CardContent>
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0">
										{review.user_image_url ? (
											<div className="h-10 w-10 rounded-full overflow-hidden">
												<Image
													src={review.user_image_url}
													alt={review.user_name}
													width={40}
													height={40}
													className="h-full w-full object-cover"
												/>
											</div>
										) : (
											<div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
												<User className="h-5 w-5 text-primary" />
											</div>
										)}
									</div>

									<div className="flex-1 min-w-0 space-y-3">
										<div className="flex items-center justify-between gap-2">
											<div className="flex items-center gap-2 min-w-0 flex-1">
												<h4 className="font-semibold text-foreground truncate">
													{review.user_name}
												</h4>
												{review.is_verified_purchase && (
													<Badge
														variant="secondary"
														className="gap-1 flex-shrink-0"
													>
														<CheckCircle className="h-3 w-3" />
														<span className="hidden sm:inline">
															Compra verificada
														</span>
														<span className="sm:hidden">Verificada</span>
													</Badge>
												)}
											</div>
											<div className="flex items-center gap-2 flex-shrink-0">
												<span className="text-sm text-muted-foreground hidden sm:block">
													{formatDate(review.created_at)}
												</span>
												<span className="text-xs text-muted-foreground sm:hidden">
													{new Date(review.created_at).toLocaleDateString(
														'es-ES',
														{
															day: '2-digit',
															month: '2-digit',
														},
													)}
												</span>
												{isOwner && (onEditReview || onDeleteReview) && (
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																variant="ghost"
																size="sm"
																className="h-8 w-8 p-0 flex-shrink-0"
															>
																<MoreHorizontal className="h-4 w-4" />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent align="end">
															{onEditReview && (
																<DropdownMenuItem
																	onClick={() => onEditReview(review)}
																	className="gap-2"
																>
																	<Edit className="h-4 w-4" />
																	Editar reseña
																</DropdownMenuItem>
															)}
															{onDeleteReview && (
																<DropdownMenuItem
																	onClick={() => onDeleteReview(review.id)}
																	className="gap-2 text-destructive"
																>
																	<Trash2 className="h-4 w-4" />
																	Eliminar reseña
																</DropdownMenuItem>
															)}
														</DropdownMenuContent>
													</DropdownMenu>
												)}
											</div>
										</div>

										<RatingDisplay
											rating={review.rating}
											size="sm"
											showValue={false}
										/>

										<div className="min-w-0">
											<h5 className="font-medium text-foreground mb-2">
												{review.title}
											</h5>
											<p className="text-muted-foreground leading-relaxed break-words">
												{review.comment}
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					)
				})}
			</div>
		</div>
	)
}
