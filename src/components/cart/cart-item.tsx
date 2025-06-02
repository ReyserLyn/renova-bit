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
		<Card className="p-4">
			<div className="flex gap-4">
				<Link href={`/producto/${item.product.slug}`}>
					<div className="relative h-24 w-24 overflow-hidden rounded-md">
						<Image
							src={item.product.image_url}
							alt={item.product.name}
							fill
							className="object-cover"
						/>
					</div>
				</Link>
				<div className="flex-1">
					<div className="flex justify-between">
						<div>
							<Link href={`/producto/${item.product.slug}`}>
								<h3 className="font-semibold hover:text-amber-500 transition-colors">
									{item.product.name}
								</h3>
							</Link>
							<p className="text-sm text-muted-foreground">
								{item.product.brand.name}
							</p>
						</div>
						{/* Precio unitario */}
						<p className="font-semibold">S/{item.product.price}</p>
					</div>

					{/* Controles de cantidad y total */}
					<div className="mt-4 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Button
								size="icon"
								variant="outline"
								className="h-8 w-8"
								onClick={handleDecrement}
								disabled={isUpdatingQuantity || item.quantity <= 1}
							>
								<Minus className="h-4 w-4" />
							</Button>

							<span className="w-12 text-center">{item.quantity}</span>

							<Button
								size="icon"
								variant="outline"
								className="h-8 w-8"
								onClick={handleIncrement}
								disabled={isUpdatingQuantity}
							>
								<Plus className="h-4 w-4" />
							</Button>

							<Button
								size="icon"
								variant="ghost"
								className="h-8 w-8 ml-2 text-destructive hover:text-destructive"
								onClick={handleRemove}
								disabled={isRemovingItem}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>

						{/* Total del item */}
						<p className="font-bold text-lg">S/{itemTotal.toFixed(2)}</p>
					</div>
				</div>
			</div>
		</Card>
	)
}
