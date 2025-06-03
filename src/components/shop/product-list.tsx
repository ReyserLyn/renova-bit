'use client'

import { ProductCard } from '@/components/shop/product-card'
import { ProductImageHover } from '@/components/shop/product-image-hover'
import { ProductTitleLink } from '@/components/shop/product-title-link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCart } from '@/hooks/use-cart'
import { BoxIcon, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'

interface Product {
	id: string
	name: string
	slug: string
	image_url: string
	short_description: string
	long_description: string | null
	stock: number
	price_web: string
	price: string
	brand_id: string
	category_id: string
	condition_id: 'N' | 'U' | 'R'
	rating: string | null
	rating_count: number
	brand: {
		id: string
		name: string
		slug: string
	}
	category?: {
		name: string
	}
	description?: string
	offer?: {
		id: string
		offer_price: string
		discount_percent: number
		end_date: string
	}
}

interface ProductListProps {
	products: Product[]
	viewMode: string
}

export function ProductList({ products, viewMode }: ProductListProps) {
	const { addItem, isAddingItem } = useCart()

	const handleAddToCart = (product: Product) => {
		addItem({ product, quantity: 1 })
	}

	if (viewMode === 'grid') {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center">
				{products.map((product) => {
					if (!product.brand) return null

					return (
						<div key={product.id} className="w-full flex justify-center">
							<ProductCard
								product={product}
								offer={
									product.offer?.id
										? {
												id: product.offer.id,
												offer_price: product.offer.offer_price,
												discount_percent: product.offer.discount_percent,
												end_date: new Date(product.offer.end_date),
											}
										: undefined
								}
							/>
						</div>
					)
				})}
			</div>
		)
	}

	// Vista de lista
	return (
		<div className="space-y-6">
			{products.map((product) => {
				if (!product.brand) return null

				return (
					<Card
						key={product.id}
						className="overflow-hidden hover:shadow-lg transition-shadow py-0"
					>
						<div className="flex flex-col lg:flex-row">
							<div className="lg:w-64 flex-shrink-0 flex  items-stretch justify-center lg:min-h-[280px]">
								<div className="w-full flex items-center justify-center">
									<ProductImageHover
										product={product}
										width={200}
										height={240}
										className="rounded-lg w-full"
										containerClassName="w-full h-full flex items-center justify-center"
									/>
								</div>
							</div>

							<div className="flex-1 p-6">
								<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
									<div className="flex-1">
										<ProductTitleLink
											product={product}
											variant="list"
											className="mb-2"
										/>

										<div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
											{product.brand && (
												<span className="flex items-center gap-1">
													<span className="font-medium">Marca:</span>
													{product.brand.name}
												</span>
											)}
											{product.category && (
												<span className="flex items-center gap-1">
													<span className="font-medium">Categoría:</span>
													{product.category.name}
												</span>
											)}
										</div>

										<div className="mb-4">
											{product.offer ? (
												<div className="flex flex-col gap-2">
													<div className="flex items-center gap-3">
														<span className="text-2xl font-bold text-red-600">
															S/{' '}
															{Number(
																product.offer.offer_price,
															).toLocaleString()}
														</span>
														<span className="text-lg text-muted-foreground line-through">
															S/ {Number(product.price).toLocaleString()}
														</span>
														{product.offer.discount_percent && (
															<span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
																-{product.offer.discount_percent}%
															</span>
														)}
													</div>
													<div className="text-sm text-orange-600 dark:text-orange-400 font-medium">
														¡Oferta especial por tiempo limitado!
													</div>
												</div>
											) : (
												<div className="flex flex-col gap-2">
													<div className="flex items-center justify-between">
														<span className="text-sm text-muted-foreground">
															Precio normal:
														</span>
														<span className="text-lg line-through text-muted-foreground">
															S/ {Number(product.price).toLocaleString()}
														</span>
													</div>
													<div className="flex items-center justify-between">
														<span className="text-lg font-semibold text-red-600 dark:text-red-400">
															Precio web:
														</span>
														<span className="text-2xl font-bold text-red-600 dark:text-red-400">
															S/ {Number(product.price_web).toLocaleString()}
														</span>
													</div>
													<div className="flex items-center justify-between text-sm">
														<span className="text-green-600 dark:text-green-400 font-medium">
															Ahorras: S/{' '}
															{(
																Number(product.price) -
																Number(product.price_web)
															).toLocaleString()}
														</span>
														<Badge
															variant="secondary"
															className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
														>
															{(
																((Number(product.price) -
																	Number(product.price_web)) /
																	Number(product.price)) *
																100
															).toFixed(0)}
															% OFF
														</Badge>
													</div>
													<div className="text-sm text-green-600 dark:text-green-400 font-medium">
														💰 ¡Precio web más barato! Compra online y ahorra
													</div>
												</div>
											)}
										</div>

										<div className="flex items-center gap-4 text-sm">
											{product.rating && (
												<div className="flex items-center gap-1">
													<span className="text-yellow-500">★</span>
													<span>{product.rating}</span>
												</div>
											)}
											{product.description && (
												<p className="text-muted-foreground line-clamp-2 flex-1">
													{product.description}
												</p>
											)}
										</div>

										{/* Badge de stock */}
										<div className="mt-2">
											<Badge variant="secondary" className="gap-1">
												<BoxIcon className="text-emerald-500" size={12} />
												stock:{' '}
												{Number(product.stock) > 0 ? '>10' : product.stock}
											</Badge>
										</div>
									</div>

									<div className="flex flex-col gap-2 lg:w-40">
										<Button size="sm" className="w-full" asChild>
											<Link href={`/producto/${product.slug}`}>
												Ver Producto
											</Link>
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="w-full flex items-center justify-center gap-1 text-xs"
											onClick={() => handleAddToCart(product)}
											disabled={isAddingItem}
										>
											<ShoppingCartIcon size={14} />
											<span className="hidden sm:inline">Añadir</span>
											<span className="sm:hidden">+</span>
										</Button>
									</div>
								</div>
							</div>
						</div>
					</Card>
				)
			})}
		</div>
	)
}
