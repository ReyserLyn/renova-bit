'use client'

import { ProductImageHover } from '@/components/shop/product-image-hover'
import { ProductTitleLink } from '@/components/shop/product-title-link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { brands, products } from '@/database/schema'
import { useCart } from '@/hooks/use-cart'
import type { InferSelectModel } from 'drizzle-orm'
import { BoxIcon, Clock, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

type Product = InferSelectModel<typeof products> & {
	brand: InferSelectModel<typeof brands>
}

interface OfferInfo {
	id: string
	offer_price: string
	discount_percent: number
	end_date: Date
}

interface ProductCardProps {
	product: Product
	offer?: OfferInfo
}

function OfferCountdown({ endDate }: { endDate: Date }) {
	const [timeLeft, setTimeLeft] = useState('')

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date().getTime()
			const end = new Date(endDate).getTime()
			const difference = end - now

			if (difference > 0) {
				const days = Math.floor(difference / (1000 * 60 * 60 * 24))
				const hours = Math.floor(
					(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
				)
				const minutes = Math.floor(
					(difference % (1000 * 60 * 60)) / (1000 * 60),
				)

				if (days > 0) {
					setTimeLeft(`${days}d ${hours}h`)
				} else if (hours > 0) {
					setTimeLeft(`${hours}h ${minutes}m`)
				} else {
					setTimeLeft(`${minutes}m`)
				}
			} else {
				setTimeLeft('¡Expirado!')
			}
		}, 1000)

		return () => clearInterval(timer)
	}, [endDate])

	return (
		<div className="flex items-center gap-1 text-xs text-red-600 font-medium">
			<Clock size={12} />
			{timeLeft}
		</div>
	)
}

export function ProductCard({ product, offer }: ProductCardProps) {
	const { addItem, isAddingItem } = useCart()

	const handleAddToCart = () => {
		addItem({ product, quantity: 1 })
	}

	const hasOffer = offer && new Date(offer.end_date) > new Date()
	const finalPrice = hasOffer
		? Number(offer.offer_price)
		: Number(product.price_web)
	const originalPrice = hasOffer
		? Number(product.price_web)
		: Number(product.price)

	return (
		<Card className="w-full max-w-[320px] py-0 gap-0 my-3 relative">
			{hasOffer && (
				<div className="absolute top-2 left-2 z-20">
					<Badge className="bg-red-500 text-white hover:bg-red-600">
						-{offer.discount_percent}%
					</Badge>
				</div>
			)}

			<CardContent className="flex justify-center items-center flex-col p-0 relative">
				<ProductImageHover
					product={product}
					width={320}
					height={220}
					containerClassName="rounded-t-lg"
				/>
			</CardContent>

			<CardFooter className="flex flex-col text-left w-full justify-start p-4 gap-2">
				<div className="flex flex-col w-full">
					<span className="w-full text-sm text-muted-foreground">
						{product.brand.name}
					</span>

					<ProductTitleLink product={product} />
				</div>

				<div className="flex w-full items-center justify-between">
					<Badge variant="secondary" className="gap-1 self-start">
						<BoxIcon className="text-emerald-500" size={12} />
						stock: {Number(product.stock) > 0 ? '>10' : product.stock}
					</Badge>

					{hasOffer && <OfferCountdown endDate={offer.end_date} />}
				</div>

				<div className="flex w-full justify-between items-center">
					<div className="flex flex-col">
						{hasOffer ? (
							<>
								<span className="text-sm text-muted-foreground line-through">
									S/{originalPrice} Precio Normal
								</span>
								<Link href={`/producto/${product.slug}`}>
									<span className="text-lg font-bold text-red-600 dark:text-red-400">
										S/{finalPrice} ¡Oferta!
									</span>
								</Link>
							</>
						) : (
							<>
								<span className="text-base text-muted-foreground">
									S/{product.price} Precio Normal
								</span>
								<Link href={`/producto/${product.slug}`}>
									<span className="text-base text-red-600 dark:text-red-400">
										S/{finalPrice} Precio Web
									</span>
								</Link>
							</>
						)}
					</div>

					<Button
						variant="default"
						size="icon"
						className="h-12 w-12 rounded-full p-2 hover:bg-primary/90 hover:scale-110 transition-all duration-300 hover:cursor-pointer [&_svg:not([class*='size-'])]:size-5"
						onClick={handleAddToCart}
						disabled={isAddingItem}
					>
						<ShoppingCartIcon strokeWidth={2.5} />
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}
