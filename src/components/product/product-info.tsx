'use client'

import { toggleWishlist } from '@/actions/wishlist'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RatingDisplay } from '@/components/ui/rating'
import { ShareModal } from '@/components/ui/share-modal'
import { useCart } from '@/hooks/use-cart'
import type { ProductWithRelations } from '@/types/product'
import { Heart, Minus, Package, Plus, Share2, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface ProductInfoProps {
	product: ProductWithRelations
	averageRating?: number
	reviewCount?: number
	isInWishlist?: boolean
}

export function ProductInfo({
	product,
	averageRating = 0,
	reviewCount = 0,
	isInWishlist = false,
}: ProductInfoProps) {
	const { addItem, isAddingItem } = useCart()
	const [quantity, setQuantity] = useState(1)
	const [wishlistState, setWishlistState] = useState(isInWishlist)
	const [isTogglingWishlist, setIsTogglingWishlist] = useState(false)
	const [isShareModalOpen, setIsShareModalOpen] = useState(false)

	const handleAddToCart = () => {
		addItem({ product, quantity })
	}

	const handleWishlistToggle = async () => {
		setIsTogglingWishlist(true)
		try {
			const result = await toggleWishlist(product.id)
			if (result.success) {
				setWishlistState(result.action === 'added')
				toast.success(result.message || 'Favoritos actualizado')
			} else {
				toast.error(result.error || 'Error al actualizar favoritos')
			}
		} catch (error) {
			toast.error('Error al actualizar favoritos')
		} finally {
			setIsTogglingWishlist(false)
		}
	}

	const handleShare = () => {
		setIsShareModalOpen(true)
	}

	const incrementQuantity = () => {
		if (quantity < Number(product.stock)) {
			setQuantity((prev) => prev + 1)
		}
	}

	const decrementQuantity = () => {
		if (quantity > 1) {
			setQuantity((prev) => prev - 1)
		}
	}

	const priceNormal = Number(product.price) || Number(product.price) || 0
	const priceWeb =
		Number(product.price_web) || Number(product.price) - 10.1 || 0
	const savings = priceNormal - priceWeb

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:min-h-[600px]">
			<div className="flex flex-col">
				<div className="relative bg-background rounded-lg overflow-hidden border flex items-center justify-center p-4 flex-1 min-h-[400px]">
					<Image
						src={product.image_url}
						alt={product.name}
						width={800}
						height={0}
						className="w-full h-auto object-contain max-h-full"
						priority
						style={{ height: 'auto' }}
					/>
				</div>
			</div>

			<div className="flex flex-col space-y-6">
				<div className="space-y-2">
					<p className="text-sm text-muted-foreground font-medium">
						{product.brand.name}
					</p>
					<h1 className="text-2xl lg:text-3xl font-bold text-foreground">
						{product.name}
					</h1>

					{reviewCount > 0 && (
						<RatingDisplay
							rating={averageRating}
							count={reviewCount}
							size="md"
						/>
					)}
				</div>

				<p className="text-muted-foreground leading-relaxed">
					{product.short_description}
				</p>

				<Card>
					<CardContent className="py-2">
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">
									Precio normal:
								</span>
								<span className="text-lg line-through text-muted-foreground">
									S/{priceNormal.toFixed(2)}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-lg font-semibold">Precio web:</span>
								<span className="text-2xl font-bold text-red-600 dark:text-red-400">
									S/{priceWeb.toFixed(2)}
								</span>
							</div>
							<div className="flex items-center justify-between text-sm">
								<span className="text-green-600 dark:text-green-400 font-medium">
									Ahorras: S/{savings.toFixed(2)}
								</span>
								<Badge
									variant="secondary"
									className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
								>
									{((savings / priceNormal) * 100).toFixed(0)}% OFF
								</Badge>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="flex items-center gap-2">
					<Package className="h-4 w-4 text-emerald-500" />
					<span className="text-sm">
						{Number(product.stock) > 0 ? (
							<span className="text-emerald-600 dark:text-emerald-400">
								En stock ({Number(product.stock) > 10 ? '10+' : product.stock}{' '}
								disponibles)
							</span>
						) : (
							<span className="text-red-600 dark:text-red-400">Sin stock</span>
						)}
					</span>
				</div>

				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">Categoría:</span>
					<Badge variant="outline">{product.category.name}</Badge>
				</div>

				{Number(product.stock) > 0 && (
					<div className="space-y-6 mt-auto">
						<div className="flex items-center gap-3">
							<span className="text-sm font-medium">Cantidad:</span>
							<div className="flex items-center border rounded-lg">
								<Button
									variant="ghost"
									size="sm"
									onClick={decrementQuantity}
									disabled={quantity <= 1}
									className="h-8 w-8 p-0"
								>
									<Minus className="h-3 w-3" />
								</Button>
								<span className="w-12 text-center text-sm font-medium">
									{quantity}
								</span>
								<Button
									variant="ghost"
									size="sm"
									onClick={incrementQuantity}
									disabled={quantity >= Number(product.stock)}
									className="h-8 w-8 p-0"
								>
									<Plus className="h-3 w-3" />
								</Button>
							</div>
						</div>

						<div className="flex gap-3">
							<Button
								size="lg"
								onClick={handleAddToCart}
								disabled={isAddingItem}
								className="flex-1 gap-2"
							>
								<ShoppingCart className="h-4 w-4" />
								{isAddingItem ? 'Agregando...' : 'Agregar al carrito'}
							</Button>

							<Button
								variant="outline"
								size="lg"
								onClick={handleWishlistToggle}
								disabled={isTogglingWishlist}
								className="gap-2"
							>
								<Heart
									className={`h-4 w-4 ${wishlistState ? 'fill-red-500 text-red-500' : ''}`}
								/>
							</Button>

							<Button
								variant="outline"
								size="lg"
								onClick={handleShare}
								className="gap-2"
							>
								<Share2 className="h-4 w-4" />
							</Button>
						</div>
					</div>
				)}

				{Number(product.stock) === 0 && (
					<div className="mt-auto">
						<Button disabled size="lg" className="w-full">
							Sin stock disponible
						</Button>
					</div>
				)}
			</div>

			<ShareModal
				isOpen={isShareModalOpen}
				onClose={() => setIsShareModalOpen(false)}
				url={typeof window !== 'undefined' ? window.location.href : ''}
				title={`${product.name} - ${product.brand.name}`}
				description={product.short_description}
			/>
		</div>
	)
}
