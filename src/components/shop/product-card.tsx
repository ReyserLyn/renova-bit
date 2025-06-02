import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import type { brands, products } from '@/database/schema'
import type { InferSelectModel } from 'drizzle-orm'
import { BoxIcon, EyeIcon, ShoppingCartIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

type Product = InferSelectModel<typeof products> & {
	brand: InferSelectModel<typeof brands>
}

interface ProductCardProps {
	product: Product
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<Card className="w-full max-w-[320px] py-0 gap-0 my-3  relative">
			<CardContent className="flex justify-center items-center flex-col p-0 relative group">
				<Link
					href={`/producto/${product.slug}`}
					className="absolute inset-0 z-10"
					aria-label="Ver producto"
				/>

				<div className="relative w-full overflow-hidden bg-white rounded-t-lg">
					<Image
						src={product.image_url}
						alt={product.name}
						width={320}
						height={220}
						className="w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-105"
					/>

					<div className="absolute inset-0 bg-black/50 rounded-lg rounded-b-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
						<div className="bg-white/90 p-3 rounded-full text-black flex items-center justify-center">
							<EyeIcon className="w-6 h-6" strokeWidth={2} />
							<span className="ml-2 font-medium">Ver producto</span>
						</div>
					</div>
				</div>
			</CardContent>

			<CardFooter className="flex flex-col text-left w-full justify-start p-4 gap-2">
				<div className="flex flex-col w-full">
					<span className="w-full text-sm text-foreground/50">
						{product.brand.name}
					</span>

					<Link href={`/producto/${product.slug}`} className="w-full">
						<CardTitle className="text-[1rem] hover:text-amber-500 transition-all duration-300 text-base line-clamp-3 min-h-[calc(1.5rem*3)] leading-normal">
							{product.name}
						</CardTitle>
					</Link>
				</div>

				<div className="flex w-full items-center">
					<Badge variant="secondary" className="gap-1 self-start">
						<BoxIcon className="text-emerald-500" size={12} />
						stock: {Number(product.stock) > 0 ? '>10' : product.stock}
					</Badge>
				</div>

				<div className="flex w-full justify-between items-center">
					<div className="flex flex-col ">
						<span className="text-base">S/{product.price} Precio Normal</span>
						<Link href={`/producto/${product.slug}`}>
							<span className="text-base text-red-600">
								S/{Number(product.price) - 10.1} Precio Web
							</span>
						</Link>
					</div>

					<Button
						variant="default"
						size="icon"
						className="h-12 w-12 rounded-full p-2 hover:bg-primary/90 hover:scale-110 transition-all duration-300 hover:cursor-pointer [&_svg:not([class*='size-'])]:size-5"
					>
						<ShoppingCartIcon strokeWidth={2.5} />
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}
