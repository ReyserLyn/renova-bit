'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useDynamicCounts } from '@/hooks/useDynamicCounts'
import { useFiltersSync } from '@/hooks/useFiltersSync'
import type { BrandWithCount, CategoryWithCount, TransformedProduct } from '@/types'
import {
	ChevronDownIcon,
	ChevronUpIcon,
	SearchIcon,
	StarIcon,
	XIcon,
} from 'lucide-react'
import React, { useState } from 'react'

interface ProductFiltersProps {
	categories: CategoryWithCount[]
	brands: BrandWithCount[]
	priceRange: {
		min: number
		max: number
	}
	products?: TransformedProduct[]
}

const FilterItem = React.memo(
	({
		id,
		name,
		slug,
		count,
		isChecked,
		onToggle,
		type,
	}: {
		id: string
		name: string
		slug: string
		count: number
		isChecked: boolean
		onToggle: (slug: string) => void
		type: 'category' | 'brand'
	}) => (
		<div className="flex items-center space-x-2 hover:bg-accent/50 p-1 rounded transition-colors cursor-pointer w-full text-left">
			<Checkbox
				id={`${type}-${id}`}
				checked={isChecked}
				onCheckedChange={() => onToggle(slug)}
				className="cursor-pointer"
			/>
			<Label
				htmlFor={`${type}-${id}`}
				className="text-sm font-normal flex-1 cursor-pointer hover:text-primary transition-colors"
			>
				{name}{count > 0 && ` (${count})`}
			</Label>
		</div>
	),
)

FilterItem.displayName = 'FilterItem'

const ProductFilters: React.FC<ProductFiltersProps> = React.memo(
	({ categories, brands, priceRange, products = [] }) => {
		const [showAllCategories, setShowAllCategories] = useState(false)
		const [showAllBrands, setShowAllBrands] = useState(false)

		const {
			filters,
			localPriceRange,
			hasActiveFilters,
			updateFilter,
			toggleCategory,
			toggleBrand,
			clearFilters,
			setLocalPriceRange,
			commitPriceRange,
		} = useFiltersSync({ priceRange })

		const { categories: dynamicCategories, brands: dynamicBrands } =
			useDynamicCounts({
				categories,
				brands,
				products,
				filters,
			})

		const ratingOptions = [
			{ value: 5, label: '5 estrellas exactas' },
			{ value: 4, label: '4 estrellas o más' },
			{ value: 3, label: '3 estrellas o más' },
			{ value: 2, label: '2 estrellas o más' },
			{ value: 1, label: '1 estrella o más' },
		]

		const renderStars = (rating: number) => {
			return Array.from({ length: 5 }, (_, i) => (
				<StarIcon
					key={`star-${rating}-${i}`}
					className={`h-3 w-3 ${
						i < rating
							? 'fill-yellow-400 text-yellow-400'
							: 'fill-gray-200 text-gray-200'
					}`}
				/>
			))
		}

		const handleSearchChange = (value: string) => {
			updateFilter('search', value)
		}

		const handleOfferToggle = (checked: boolean) => {
			updateFilter('hasOffer', checked)
		}

		const handleRatingChange = (checked: boolean, value: number) => {
			updateFilter('rating', checked ? value : null)
		}

		const handleClearFilters = () => {
			clearFilters()
		}

		return (
			<div className="space-y-4 px-1">
				<Card className="border-none shadow-none">
					<CardHeader>
						<CardTitle className="text-sm font-medium flex items-center gap-2">
							Buscar
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="relative">
							<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Buscar productos..."
								value={filters.search}
								onChange={(e) => handleSearchChange(e.target.value)}
								className="pl-9 cursor-text"
							/>
						</div>
					</CardContent>
				</Card>

				<div className="bg-red-50/50 dark:bg-red-950/30 rounded-lg p-4 space-y-3">
					<h3 className="text-sm font-medium text-red-700 dark:text-red-300 flex items-center gap-2">
						<span className="text-lg">🔥</span>
						Ofertas Especiales
					</h3>
					<div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-lg">
						<Checkbox
							id="has-offer"
							checked={filters.hasOffer}
							onCheckedChange={(checked) => handleOfferToggle(!!checked)}
							className="cursor-pointer border-red-300 dark:border-red-600 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
						/>
						<Label
							htmlFor="has-offer"
							className="text-sm font-medium cursor-pointer hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-2 text-red-700 dark:text-red-300"
						>
							<span className="text-red-500 text-lg">🏷️</span>
							<span>Solo productos en oferta</span>
							<span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold">
								¡DESCUENTOS!
							</span>
						</Label>
					</div>
				</div>

				{dynamicCategories.length > 0 && (
					<Card className="border-none shadow-none">
						<CardHeader>
							<CardTitle className="text-sm font-medium">
								Categorías ({dynamicCategories.length})
							</CardTitle>
						</CardHeader>
						<CardContent className="pt-0">
							<div className="space-y-2">
								{dynamicCategories
									.slice(0, showAllCategories ? undefined : 5)
									.map((category, index) => (
										<FilterItem
											key={`filter-category-${category.id}-${category.slug}-${index}`}
											id={category.id}
											name={category.name}
											slug={category.slug}
											count={category.productCount}
											isChecked={filters.categories.includes(category.slug)}
											onToggle={toggleCategory}
											type="category"
										/>
									))}

								{dynamicCategories.length > 5 && (
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setShowAllCategories(!showAllCategories)}
										className="w-full mt-2 text-xs h-8 hover:bg-accent/70"
									>
										{showAllCategories ? (
											<>
												<ChevronUpIcon className="h-3 w-3 mr-1" />
												Ver menos categorías
											</>
										) : (
											<>
												<ChevronDownIcon className="h-3 w-3 mr-1" />
												Ver más ({dynamicCategories.length - 5} más)
											</>
										)}
									</Button>
								)}
							</div>
						</CardContent>
					</Card>
				)}

				{dynamicBrands.length > 0 && (
					<Card className="border-none shadow-none">
						<CardHeader>
							<CardTitle className="text-sm font-medium">
								Marcas ({dynamicBrands.length})
							</CardTitle>
						</CardHeader>
						<CardContent className="pt-0">
							<div className="space-y-2">
								{dynamicBrands
									.slice(0, showAllBrands ? undefined : 8)
									.map((brand, index) => (
										<FilterItem
											key={`filter-brand-${brand.id}-${brand.slug}-${index}`}
											id={brand.id}
											name={brand.name}
											slug={brand.slug}
											count={brand.productCount}
											isChecked={filters.brands.includes(brand.slug)}
											onToggle={toggleBrand}
											type="brand"
										/>
									))}

								{dynamicBrands.length > 8 && (
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setShowAllBrands(!showAllBrands)}
										className="w-full mt-2 text-xs h-8 hover:bg-accent/70"
									>
										{showAllBrands ? (
											<>
												<ChevronUpIcon className="h-3 w-3 mr-1" />
												Ver menos marcas
											</>
										) : (
											<>
												<ChevronDownIcon className="h-3 w-3 mr-1" />
												Ver más ({dynamicBrands.length - 8} más)
											</>
										)}
									</Button>
								)}
							</div>
						</CardContent>
					</Card>
				)}

				<Card className="border-none shadow-none">
					<CardHeader>
						<CardTitle className="text-sm font-medium">Precio</CardTitle>
					</CardHeader>
					<CardContent className="pt-0 space-y-4">
						<div className="px-2">
							<Slider
								value={localPriceRange}
								onValueChange={setLocalPriceRange}
								onValueCommit={commitPriceRange}
								max={priceRange.max}
								min={priceRange.min}
								step={100}
								className="w-full cursor-pointer"
							/>
						</div>
						<div className="flex items-center justify-between text-sm text-muted-foreground">
							<span>S/ {localPriceRange[0].toLocaleString()}</span>
							<span>S/ {localPriceRange[1].toLocaleString()}</span>
						</div>
					</CardContent>
				</Card>

				<Card className="border-none shadow-none">
					<CardHeader>
						<CardTitle className="text-sm font-medium">Calificación</CardTitle>
					</CardHeader>
					<CardContent className="pt-0">
						<div className="space-y-2">
							{ratingOptions.map((ratingOption) => (
								<div
									key={ratingOption.value}
									className="flex items-center space-x-2 hover:bg-accent/50 p-1 rounded transition-colors cursor-pointer w-full text-left"
								>
									<Checkbox
										id={`rating-${ratingOption.value}`}
										checked={filters.rating === ratingOption.value}
										onCheckedChange={(checked) =>
											handleRatingChange(!!checked, ratingOption.value)
										}
										className="cursor-pointer"
									/>
									<Label
										htmlFor={`rating-${ratingOption.value}`}
										className="text-sm font-normal flex-1 cursor-pointer flex items-center space-x-1 hover:text-primary transition-colors"
									>
										<div className="flex">
											{renderStars(ratingOption.value)}
										</div>
										<span>{ratingOption.label}</span>
									</Label>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{hasActiveFilters && (
					<div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-4 space-y-3">
						<h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
							<span className="text-lg">🔧</span>
							Filtros Activos
						</h3>
						<div className="flex flex-wrap gap-1.5">
							{filters.search && (
								<div
									key="active-filter-search"
									className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/70 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-md text-xs max-w-full"
								>
									<span className="truncate">Búsqueda: "{filters.search}"</span>
									<button
										onClick={() => updateFilter('search', '')}
										className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 ml-1 flex-shrink-0"
										type="button"
									>
										<XIcon className="h-3 w-3" />
									</button>
								</div>
							)}

							{filters.categories.map((categorySlug, index) => {
								const category = dynamicCategories.find(
									(c) => c.slug === categorySlug,
								)
								return category ? (
									<div
										key={`active-filter-category-${categorySlug}-${index}`}
										className="flex items-center gap-1 bg-green-100 dark:bg-green-900/70 text-green-800 dark:text-green-200 px-2 py-1 rounded-md text-xs"
									>
										<span className="truncate">{category.name}</span>
										<button
											onClick={() => toggleCategory(categorySlug)}
											className="hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5 ml-1 flex-shrink-0"
											type="button"
										>
											<XIcon className="h-3 w-3" />
										</button>
									</div>
								) : null
							})}

							{filters.brands.map((brandSlug, index) => {
								const brand = dynamicBrands.find((b) => b.slug === brandSlug)
								return brand ? (
									<div
										key={`active-filter-brand-${brandSlug}-${index}`}
										className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/70 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-md text-xs"
									>
										<span className="truncate">{brand.name}</span>
										<button
											onClick={() => toggleBrand(brandSlug)}
											className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5 ml-1 flex-shrink-0"
											type="button"
										>
											<XIcon className="h-3 w-3" />
										</button>
									</div>
								) : null
							})}

							{(filters.priceRange[0] !== priceRange.min ||
								filters.priceRange[1] !== priceRange.max) && (
								<div
									key="active-filter-price"
									className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/70 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-md text-xs"
								>
									<span className="truncate">
										Precio: S/ {filters.priceRange[0].toLocaleString()} - S/{' '}
										{filters.priceRange[1].toLocaleString()}
									</span>
									<button
										onClick={() => {
											setLocalPriceRange([priceRange.min, priceRange.max])
											commitPriceRange()
										}}
										className="hover:bg-orange-200 dark:hover:bg-orange-800 rounded-full p-0.5 ml-1 flex-shrink-0"
										type="button"
									>
										<XIcon className="h-3 w-3" />
									</button>
								</div>
							)}

							{filters.rating && (
								<div
									key="active-filter-rating"
									className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/70 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-md text-xs"
								>
									<span className="truncate">
										{
											ratingOptions.find((r) => r.value === filters.rating)
												?.label
										}
									</span>
									<button
										onClick={() => updateFilter('rating', null)}
										className="hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded-full p-0.5 ml-1 flex-shrink-0"
										type="button"
									>
										<XIcon className="h-3 w-3" />
									</button>
								</div>
							)}

							{filters.hasOffer && (
								<div
									key="active-filter-offers"
									className="flex items-center gap-1 bg-red-100 dark:bg-red-900/70 text-red-800 dark:text-red-200 px-2 py-1 rounded-md text-xs"
								>
									<span>Solo ofertas</span>
									<button
										onClick={() => updateFilter('hasOffer', false)}
										className="hover:bg-red-200 dark:hover:bg-red-800 rounded-full p-0.5 ml-1 flex-shrink-0"
										type="button"
									>
										<XIcon className="h-3 w-3" />
									</button>
								</div>
							)}
						</div>
					</div>
				)}

				{hasActiveFilters && (
					<Button
						variant="outline"
						onClick={handleClearFilters}
						className="w-full hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer disabled:opacity-50"
					>
						<XIcon className="mr-2 h-4 w-4" />
						Limpiar todos los filtros
					</Button>
				)}
			</div>
		)
	},
)

ProductFilters.displayName = 'ProductFilters'

export default ProductFilters
