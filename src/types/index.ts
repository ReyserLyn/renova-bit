export * from './product'

export interface ProductFilters {
	search: string
	categories: string[]
	brands: string[]
	priceRange: [number, number]
	rating: number | null
	hasOffer: boolean
}

export interface PriceRange {
	min: number
	max: number
}

export interface CategoryWithCount {
	id: string
	name: string
	slug: string
	productCount: number
}

export interface BrandWithCount {
	id: string
	name: string
	slug: string
	productCount: number
}

export interface TransformedProduct {
	id: string
	name: string
	category: string
	brand: string
	price: number
	rating: number
	hasOffer: boolean
} 