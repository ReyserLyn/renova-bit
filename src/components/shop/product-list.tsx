'use client'

import { ProductCard } from '@/components/shop/product-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
						className="overflow-hidden hover:shadow-lg transition-shadow"
					>
						<div className="flex flex-col lg:flex-row">
							<div className="lg:w-64 flex-shrink-0 bg-gray-50 dark:bg-gray-800 p-4 flex items-center justify-center">
								<div className="w-full max-w-48">
									<img
										src={product.image_url || '/placeholder-product.jpg'}
										alt={product.name}
										className="w-full h-auto object-cover rounded-lg"
									/>
								</div>
							</div>

							<div className="flex-1 p-6">
								<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
									<div className="flex-1">
										<h3 className="text-lg font-semibold line-clamp-2 mb-2">
											{product.name}
										</h3>

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
												<div className="flex items-center gap-3">
													<span className="text-2xl font-bold text-red-600">
														S/{' '}
														{Number(product.offer.offer_price).toLocaleString()}
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
											) : (
												<span className="text-2xl font-bold">
													S/ {Number(product.price).toLocaleString()}
												</span>
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
									</div>

									<div className="flex flex-col gap-2 lg:w-32">
										<Button size="sm" className="w-full" asChild>
											<Link href={`/producto/${product.slug}`}>
												Ver Detalles
											</Link>
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="w-full"
											asChild
										>
											<Link href={`/producto/${product.slug}`}>
												🛒 Ver Producto
											</Link>
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
