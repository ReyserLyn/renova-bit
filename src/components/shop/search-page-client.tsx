'use client'

import { ProductList } from '@/components/shop/product-list'
import { SearchToolbar } from '@/components/shop/search-toolbar'
import { useViewMode } from '@/hooks/use-view-mode'

interface SearchPageClientProps {
	products: any[]
	totalProducts: number
	priceRange: {
		min: number
		max: number
	}
	sortBy: string
}

export function SearchPageClient({
	products,
	totalProducts,
	priceRange,
	sortBy,
}: SearchPageClientProps) {
	const { viewMode } = useViewMode()

	return (
		<>
			<SearchToolbar
				totalProducts={totalProducts}
				priceRange={priceRange}
				sortBy={sortBy}
			/>
			<ProductList products={products} viewMode={viewMode} />
		</>
	)
}
