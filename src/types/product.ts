import type {
	brands,
	categories,
	products,
	reviews,
	wishlists,
} from '@/database/schema'
import type { InferSelectModel } from 'drizzle-orm'

export type Product = InferSelectModel<typeof products>
export type Brand = InferSelectModel<typeof brands>
export type Category = InferSelectModel<typeof categories>
export type Review = InferSelectModel<typeof reviews>
export type Wishlist = InferSelectModel<typeof wishlists>

export type ProductWithRelations = Product & {
	brand: Brand
	category: Category
	reviews?: Review[]
}

export interface ReviewStats {
	totalReviews: number
	averageRating: number
	rating5: number
	rating4: number
	rating3: number
	rating2: number
	rating1: number
}

export interface ProductPageData {
	product: ProductWithRelations
	reviews: Review[]
	reviewStats: ReviewStats
	relatedProducts: ProductWithRelations[]
	isInWishlist?: boolean
}
