import { ProductCard } from '@/components/shop/product-card'
import { Button } from '@/components/ui/button'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import type { ProductWithRelations } from '@/types/product'
import { ArrowRight, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface FeaturedProductsProps {
	products: ProductWithRelations[]
	title?: string
	subtitle?: string
	showAll?: boolean
}

export function FeaturedProducts({
	products,
	title = 'Productos Destacados',
	subtitle = 'Los productos más populares y mejor valorados',
	showAll = true,
}: FeaturedProductsProps) {
	if (!products || products.length === 0) {
		return null
	}

	return (
		<section className="py-16">
			<div className="container">
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
					<div className="text-center lg:text-left mb-6 lg:mb-0">
						<div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
							<div className="flex items-center gap-1">
								<Star className="w-5 h-5 text-yellow-500 fill-current" />
								<TrendingUp className="w-5 h-5 text-primary" />
							</div>
							<span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
								Más Vendidos
							</span>
						</div>
						<h2 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
						<p className="text-lg text-muted-foreground max-w-2xl">
							{subtitle}
						</p>
					</div>

					{showAll && (
						<Button variant="outline" size="lg" asChild>
							<Link href="/productos">
								Ver Todos los Productos
								<ArrowRight className="ml-2 w-4 h-4" />
							</Link>
						</Button>
					)}
				</div>

				<Carousel
					opts={{
						align: 'start',
						slidesToScroll: 1,
					}}
					className="w-full"
				>
					<CarouselContent className="-ml-2 md:-ml-4">
						{products.map((product) => (
							<CarouselItem
								key={product.id}
								className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
							>
								<div className="h-full">
									<ProductCard product={product} />
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="hidden lg:flex -left-12" />
					<CarouselNext className="hidden lg:flex -right-12" />
				</Carousel>

				<div className="lg:hidden text-center mt-6">
					<p className="text-sm text-muted-foreground">
						← Desliza para ver más productos →
					</p>
				</div>
			</div>
		</section>
	)
}
