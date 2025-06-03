import { ProductInfo } from '@/components/product/product-info'
import { ReviewSection } from '@/components/product/review-section'
import { ProductCard } from '@/components/shop/product-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
	getProductPageData,
	getRelatedProducts,
} from '@/database/queries/products'
import {
	getProductReviewStats,
	getProductReviews,
	getUserProductReview,
} from '@/database/queries/reviews'
import { isInWishlist } from '@/database/queries/wishlist'
import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface ProductPageProps {
	params: Promise<{ slug: string }>
}

export async function generateMetadata({
	params,
}: ProductPageProps): Promise<Metadata> {
	const { slug } = await params
	const product = await getProductPageData(slug)

	if (!product) {
		return {
			title: 'Producto no encontrado',
		}
	}

	return {
		title: `${product.name} - ${product.brand.name} | Renova Bit`,
		description: product.short_description,
		openGraph: {
			title: `${product.name} - ${product.brand.name}`,
			description: product.short_description,
			images: [{ url: product.image_url }],
		},
	}
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { slug } = await params
	const { userId } = await auth()

	const product = await getProductPageData(slug)

	if (!product) {
		notFound()
	}

	const [reviews, reviewStats, relatedProducts, userReview, wishlistStatus] =
		await Promise.all([
			getProductReviews(product.id),
			getProductReviewStats(product.id),
			getRelatedProducts(product.id, product.category_id, 4),
			userId ? getUserProductReview(product.id, userId) : null,
			userId ? isInWishlist(userId, product.id) : false,
		])

	return (
		<div className="container mx-auto px-4 py-8">
			<ProductInfo
				product={product}
				averageRating={reviewStats.averageRating}
				reviewCount={reviewStats.totalReviews}
				isInWishlist={wishlistStatus}
			/>

			<Separator className="my-12" />

			{product.long_description && (
				<Card className="mb-12">
					<CardHeader>
						<CardTitle>Descripción del producto</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="prose prose-gray dark:prose-invert max-w-none">
							<p className="text-muted-foreground leading-relaxed whitespace-pre-line">
								{product.long_description}
							</p>
						</div>
					</CardContent>
				</Card>
			)}

			<ReviewSection
				productId={product.id}
				productName={product.name}
				reviews={reviews}
				reviewStats={reviewStats}
				userReview={userReview || null}
				currentUserId={userId || undefined}
			/>

			{relatedProducts.length > 0 && (
				<>
					<Separator className="mb-8" />
					<div className="space-y-6">
						<h2 className="text-2xl font-bold">Productos relacionados</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
							{relatedProducts.map((relatedProduct) => (
								<ProductCard key={relatedProduct.id} product={relatedProduct} />
							))}
						</div>
					</div>
				</>
			)}
		</div>
	)
}
