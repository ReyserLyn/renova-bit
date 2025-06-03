export * from './product'

// Tipo principal para filtros de productos
export interface ProductFilters {
	search: string
	categories: string[]
	brands: string[]
	priceRange: [number, number]
	rating: number | null
	hasOffer: boolean
}

// Tipos para rangos y contadores
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
	category: { slug: string } | null
	brand: { slug: string } | null
	price: number
	rating: number
	offer: { offer_price: number } | null
}
