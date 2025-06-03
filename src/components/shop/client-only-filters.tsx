'use client'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { useSSRSafeFilters } from '@/hooks/useSSRSafeFilters'
import { useHasActiveFilters } from '@/lib/stores/filters-store'
import { SlidersHorizontalIcon } from 'lucide-react'
import { FloatingFiltersButton } from './floating-filters-button'
import ProductFilters from './product-filters'

interface Category {
	id: string
	name: string
	slug: string
	productCount: number
}

interface Brand {
	id: string
	name: string
	slug: string
	productCount: number
}

interface Product {
	id: string
	name: string
	category: { slug: string } | null
	brand: { slug: string } | null
	price: number
	rating?: number
	offer?: { offer_price: number } | null
}

interface ClientOnlyFiltersProps {
	categories: Category[]
	brands: Brand[]
	priceRange: {
		min: number
		max: number
	}
	products?: Product[]
	mobileOnly?: boolean
}

export function ClientOnlyFilters({
	categories,
	brands,
	priceRange,
	products,
	mobileOnly = false,
}: ClientOnlyFiltersProps) {
	const hasActiveFilters = useHasActiveFilters()

	useSSRSafeFilters({
		categories,
		brands,
		priceRange,
		products,
	})

	if (mobileOnly) {
		return (
			<Sheet>
				<SheetTrigger asChild>
					<FloatingFiltersButton
						hasActiveFilters={hasActiveFilters}
						icon={SlidersHorizontalIcon}
						text="Filtros"
					/>
				</SheetTrigger>
				<SheetContent
					side="left"
					className="w-[calc(100vw-2rem)] sm:w-[400px] overflow-y-auto p-4 sm:p-6"
				>
					<SheetHeader className="mb-4 sm:mb-6">
						<SheetTitle>Filtros de búsqueda</SheetTitle>
					</SheetHeader>
					<div className="pr-2">
						<ProductFilters
							categories={categories}
							brands={brands}
							priceRange={priceRange}
							products={products}
						/>
					</div>
				</SheetContent>
			</Sheet>
		)
	}

	return (
		<ProductFilters
			categories={categories}
			brands={brands}
			priceRange={priceRange}
			products={products}
		/>
	)
}
