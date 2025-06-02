'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCart } from '@/hooks/use-cart'
import type { CartItem as CartItemType } from '@/lib/stores/cart-store'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CartItemProps {
	item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
	const { updateQuantity, removeItem, isUpdatingQuantity, isRemovingItem } =
		useCart()

	const handleIncrement = () => {
		updateQuantity({ productId: item.product.id, quantity: item.quantity + 1 })
	}

	const handleDecrement = () => {
		if (item.quantity > 1) {
			updateQuantity({
				productId: item.product.id,
				quantity: item.quantity - 1,
			})
		}
	}

	const handleRemove = () => {
		removeItem(item.product.id)
	}

	const itemTotal = Number.parseFloat(item.product.price) * item.quantity

	return (
		<Card className="p-3 sm:p-4 w-full max-w-full overflow-hidden">
			<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
				<Link href={`/producto/${item.product.slug}`} className="flex-shrink-0">
					<div className="relative h-24 w-24 overflow-hidden rounded-md mx-auto sm:mx-0">
						<Image
							src={item.product.image_url}
							alt={item.product.name}
							fill
							className="object-cover"
						/>
					</div>
				</Link>
				<div className="flex-1 min-w-0 w-full">
					<div className="flex flex-col sm:flex-row sm:justify-between gap-2">
						<div className="min-w-0 flex-1">
							<Link href={`/producto/${item.product.slug}`}>
								<h3 className="font-semibold hover:text-amber-500 transition-colors text-sm sm:text-base line-clamp-2">
									{item.product.name}
								</h3>
							</Link>
							<p className="text-xs sm:text-sm text-muted-foreground">
								{item.product.brand.name}
							</p>
						</div>
						{/* Precio unitario */}
						<p className="font-semibold text-sm sm:text-base flex-shrink-0">
							S/{item.product.price}
						</p>
					</div>

					{/* Controles de cantidad y total */}
					<div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
						<div className="flex items-center gap-2">
							<Button
								size="icon"
								variant="outline"
								className="h-7 w-7 sm:h-8 sm:w-8"
								onClick={handleDecrement}
								disabled={isUpdatingQuantity || item.quantity <= 1}
							>
								<Minus className="h-3 w-3 sm:h-4 sm:w-4" />
							</Button>

							<span className="w-8 sm:w-12 text-center text-sm sm:text-base">
								{item.quantity}
							</span>

							<Button
								size="icon"
								variant="outline"
								className="h-7 w-7 sm:h-8 sm:w-8"
								onClick={handleIncrement}
								disabled={isUpdatingQuantity}
							>
								<Plus className="h-3 w-3 sm:h-4 sm:w-4" />
							</Button>

							<Button
								size="icon"
								variant="ghost"
								className="h-7 w-7 sm:h-8 sm:w-8 ml-2 text-destructive hover:text-destructive"
								onClick={handleRemove}
								disabled={isRemovingItem}
							>
								<Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
							</Button>
						</div>

						{/* Total del item */}
						<p className="font-bold text-base sm:text-lg">
							S/{itemTotal.toFixed(2)}
						</p>
					</div>
				</div>
			</div>
		</Card>
	)
}
