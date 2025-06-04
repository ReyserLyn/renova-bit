'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn, formatPrice } from '@/lib/utils'
import type { ComponentStep, ProductForSelection } from '@/types/quotation'
import { AnimatePresence, motion } from 'framer-motion'
import {
	CheckIcon,
	ExternalLinkIcon,
	FilterIcon,
	InfoIcon,
	SearchIcon,
	ShoppingCartIcon,
	SkipForwardIcon,
	SortAscIcon,
	SortDescIcon,
	StarIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

interface ComponentSelectorProps {
	step: ComponentStep
	products: ProductForSelection[]
	selectedProduct?: ProductForSelection | null
	isLoading?: boolean
	onSelectProduct: (product: ProductForSelection) => void
	onSkipStep: (skip: boolean) => void
	onSearchChange: (search: string) => void
	className?: string
}

interface Filters {
	search: string
	priceRange: [number, number]
	brands: string[]
	onlyInStock: boolean
	onlyCompatible: boolean
	sortBy: 'name' | 'price' | 'price_web' | 'brand' | 'rating'
	sortOrder: 'asc' | 'desc'
}

export function ComponentSelector({
	step,
	products,
	selectedProduct,
	isLoading = false,
	onSelectProduct,
	onSkipStep,
	onSearchChange,
	className,
}: ComponentSelectorProps) {
	const [filters, setFilters] = useState<Filters>({
		search: '',
		priceRange: [0, 10000],
		brands: [],
		onlyInStock: true,
		onlyCompatible: false,
		sortBy: 'price_web',
		sortOrder: 'asc',
	})

	const [showFilters, setShowFilters] = useState(false)

	// Obtener marcas únicas
	const availableBrands = useMemo(() => {
		const brands = [...new Set(products.map((p) => p.brand.name))].sort()
		return brands
	}, [products])

	// Filtrar y ordenar productos
	const filteredProducts = useMemo(() => {
		const filtered = products.filter((product) => {
			// Filtro de búsqueda
			if (filters.search) {
				const searchTerms = filters.search.toLowerCase()
				const matchesName = product.name.toLowerCase().includes(searchTerms)
				const matchesBrand = product.brand.name
					.toLowerCase()
					.includes(searchTerms)
				const matchesDescription = product.short_description
					.toLowerCase()
					.includes(searchTerms)
				if (!matchesName && !matchesBrand && !matchesDescription) {
					return false
				}
			}

			// Filtro de stock
			if (filters.onlyInStock && product.stock <= 0) {
				return false
			}

			// Filtro de compatibilidad
			if (filters.onlyCompatible && !product.isCompatible) {
				return false
			}

			// Filtro de marcas
			if (
				filters.brands.length > 0 &&
				!filters.brands.includes(product.brand.name)
			) {
				return false
			}

			// Filtro de rango de precios
			const price = Number.parseFloat(product.price_web)
			if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
				return false
			}

			return true
		})

		// Ordenar
		filtered.sort((a, b) => {
			let valueA: any
			let valueB: any

			switch (filters.sortBy) {
				case 'name':
					valueA = a.name.toLowerCase()
					valueB = b.name.toLowerCase()
					break
				case 'price':
					valueA = Number.parseFloat(a.price)
					valueB = Number.parseFloat(b.price)
					break
				case 'price_web':
					valueA = Number.parseFloat(a.price_web)
					valueB = Number.parseFloat(b.price_web)
					break
				case 'brand':
					valueA = a.brand.name.toLowerCase()
					valueB = b.brand.name.toLowerCase()
					break
				case 'rating':
					valueA = Number.parseFloat(a.rating || '0')
					valueB = Number.parseFloat(b.rating || '0')
					break
				default:
					valueA = Number.parseFloat(a.price_web)
					valueB = Number.parseFloat(b.price_web)
			}

			if (filters.sortOrder === 'asc') {
				return valueA > valueB ? 1 : valueA < valueB ? -1 : 0
			}
			return valueA < valueB ? 1 : valueA > valueB ? -1 : 0
		})

		return filtered
	}, [products, filters])

	const handleSearchChange = (value: string) => {
		setFilters((prev) => ({ ...prev, search: value }))
		onSearchChange(value)
	}

	const handleBrandToggle = (brand: string) => {
		setFilters((prev) => ({
			...prev,
			brands: prev.brands.includes(brand)
				? prev.brands.filter((b) => b !== brand)
				: [...prev.brands, brand],
		}))
	}

	return (
		<div className={cn('w-full space-y-6', className)}>
			{/* Header del paso */}
			<div className="space-y-4">
				<div className="flex items-center gap-3">
					<div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-xl">
						{step.icon}
					</div>
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-1">
							<h2 className="text-2xl font-bold">{step.name}</h2>
							{step.isOptional && <Badge variant="secondary">Opcional</Badge>}
						</div>
						<p className="text-muted-foreground">{step.description}</p>
					</div>
				</div>

				{/* Acciones principales */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
					{step.isOptional && (
						<Button
							variant="outline"
							onClick={() => onSkipStep(true)}
							className="flex items-center gap-2 cursor-pointer"
						>
							<SkipForwardIcon className="h-4 w-4" />
							Omitir
						</Button>
					)}

					<div className="flex justify-between w-full  items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setShowFilters(!showFilters)}
							className="flex items-center gap-2 cursor-pointer"
						>
							<FilterIcon className="h-4 w-4" />
							Filtros
							{showFilters && <span className="text-xs">(ocultar)</span>}
						</Button>
						<div className="ml-auto text-sm text-muted-foreground whitespace-nowrap overflow-hidden">
							{filteredProducts.length} productos encontrados
						</div>
					</div>
				</div>
			</div>

			{/* Barra de búsqueda */}
			<div className="relative">
				<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					placeholder={`Buscar ${step.name.toLowerCase()}...`}
					value={filters.search}
					onChange={(e) => handleSearchChange(e.target.value)}
					className="pl-10"
				/>
			</div>

			{/* Panel de filtros */}
			<AnimatePresence>
				{showFilters && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
					>
						<Card>
							<CardHeader className="pb-3">
								<CardTitle className="text-lg">
									Filtros y Ordenamiento
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
									{/* Ordenar por */}
									<div className="space-y-2">
										<Label className="text-sm font-medium">Ordenar por</Label>
										<Select
											value={filters.sortBy}
											onValueChange={(value) =>
												setFilters((prev) => ({
													...prev,
													sortBy: value as any,
												}))
											}
										>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="price_web">Precio Web</SelectItem>
												<SelectItem value="price">Precio Normal</SelectItem>
												<SelectItem value="name">Nombre</SelectItem>
												<SelectItem value="brand">Marca</SelectItem>
												<SelectItem value="rating">Calificación</SelectItem>
											</SelectContent>
										</Select>
										<Button
											size="sm"
											variant="outline"
											className="w-full cursor-pointer"
											onClick={() =>
												setFilters((prev) => ({
													...prev,
													sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
												}))
											}
										>
											{filters.sortOrder === 'asc' ? (
												<>
													<SortAscIcon className="h-4 w-4 mr-2" />
													Ascendente
												</>
											) : (
												<>
													<SortDescIcon className="h-4 w-4 mr-2" />
													Descendente
												</>
											)}
										</Button>
									</div>

									{/* Filtros de stock */}
									<div className="space-y-2">
										<Label className="text-sm font-medium">
											Disponibilidad
										</Label>
										<div className="flex items-center space-x-2">
											<Checkbox
												id="onlyInStock"
												checked={filters.onlyInStock}
												onCheckedChange={(checked) =>
													setFilters((prev) => ({
														...prev,
														onlyInStock: !!checked,
													}))
												}
											/>
											<Label
												htmlFor="onlyInStock"
												className="text-sm cursor-pointer"
											>
												Solo en stock
											</Label>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox
												id="onlyCompatible"
												checked={filters.onlyCompatible}
												onCheckedChange={(checked) =>
													setFilters((prev) => ({
														...prev,
														onlyCompatible: !!checked,
													}))
												}
											/>
											<Label
												htmlFor="onlyCompatible"
												className="text-sm cursor-pointer"
											>
												Solo compatibles
											</Label>
										</div>
									</div>

									{/* Marcas */}
									<div className="space-y-2 col-span-1 md:col-span-2">
										<Label className="text-sm font-medium">Marcas</Label>
										<div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
											{availableBrands.map((brand) => (
												<Badge
													key={brand}
													variant={
														filters.brands.includes(brand)
															? 'default'
															: 'secondary'
													}
													className="cursor-pointer"
													onClick={() => handleBrandToggle(brand)}
												>
													{brand}
													{filters.brands.includes(brand) && (
														<CheckIcon className="h-3 w-3 ml-1" />
													)}
												</Badge>
											))}
										</div>
									</div>
								</div>

								{/* Botón limpiar filtros */}
								<div className="flex justify-end">
									<Button
										variant="outline"
										size="sm"
										className="cursor-pointer"
										onClick={() =>
											setFilters({
												search: '',
												priceRange: [0, 10000],
												brands: [],
												onlyInStock: true,
												onlyCompatible: false,
												sortBy: 'price_web',
												sortOrder: 'asc',
											})
										}
									>
										Limpiar filtros
									</Button>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Grid de productos */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<AnimatePresence mode="popLayout">
					{filteredProducts.map((product, index) => {
						const isSelected = selectedProduct?.id === product.id
						const price = Number.parseFloat(product.price)
						const webPrice = Number.parseFloat(product.price_web)
						const savings = price - webPrice
						const savingsPercent =
							price > 0 ? Math.round((savings / price) * 100) : 0

						return (
							<motion.div
								key={product.id}
								layout
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ delay: index * 0.05, duration: 0.3 }}
							>
								<Card
									className={cn(
										'cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105',
										isSelected && 'ring-2 ring-primary bg-primary/5',
										product.stock <= 0 && 'opacity-60',
										!product.isCompatible &&
											'border-orange-200 dark:border-orange-800',
									)}
									onClick={() => product.stock > 0 && onSelectProduct(product)}
								>
									<CardContent className="p-4">
										{/* Imagen */}
										<div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-muted">
											{product.image_url ? (
												<Image
													src={product.image_url}
													alt={product.name}
													fill
													className="object-cover"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center text-4xl">
													{step.icon}
												</div>
											)}

											{/* Badges */}
											<div className="absolute top-2 left-2 flex flex-col gap-1">
												{product.stock <= 0 && (
													<Badge variant="destructive" className="text-xs">
														Agotado
													</Badge>
												)}
												{!product.isCompatible && (
													<Badge
														variant="outline"
														className="text-xs border-orange-500 text-orange-700"
													>
														Ver compatibilidad
													</Badge>
												)}
												{isSelected && (
													<Badge className="text-xs">
														<CheckIcon className="h-3 w-3 mr-1" />
														Seleccionado
													</Badge>
												)}
											</div>

											{/* Savings badge */}
											{savingsPercent > 0 && (
												<div className="absolute top-2 right-2">
													<Badge variant="destructive" className="text-xs">
														-{savingsPercent}%
													</Badge>
												</div>
											)}
										</div>

										{/* Información */}
										<div className="space-y-2">
											<div className="flex items-start justify-between gap-2">
												<Tooltip>
													<TooltipTrigger asChild>
														<h3 className="font-medium text-sm leading-tight cursor-pointer min-h-[2.5rem] flex items-start">
															{product.name}
														</h3>
													</TooltipTrigger>
													<TooltipContent>
														<p className="max-w-xs">{product.name}</p>
													</TooltipContent>
												</Tooltip>
												<Link
													href={`/producto/${product.slug}`}
													className="text-muted-foreground hover:text-primary cursor-pointer flex-shrink-0 mt-1"
													onClick={(e) => e.stopPropagation()}
												>
													<ExternalLinkIcon className="h-3 w-3" />
												</Link>
											</div>

											<div className="flex items-center gap-2">
												<Badge
													variant="outline"
													className="text-xs cursor-pointer"
												>
													{product.brand.name}
												</Badge>
												{product.rating && (
													<div className="flex items-center gap-1">
														<StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
														<span className="text-xs">{product.rating}</span>
													</div>
												)}
											</div>

											{/* Precios */}
											<div className="space-y-1">
												{webPrice !== price && (
													<div className="text-xs text-destructive line-through">
														S/ {formatPrice(price)}
													</div>
												)}
												<div className="text-lg font-bold text-primary">
													S/ {formatPrice(webPrice)}
												</div>
												{savingsPercent > 0 && (
													<div className="text-xs text-green-600">
														Ahorras S/ {formatPrice(savings)}
													</div>
												)}
											</div>

											{/* Stock */}
											<div className="text-xs text-muted-foreground">
												{product.stock > 0 ? (
													<span className="text-green-600">
														✓ {product.stock > 10 ? '>10' : product.stock} en
														stock
													</span>
												) : (
													<span className="text-destructive">✗ Sin stock</span>
												)}
											</div>

											{/* Botón de selección */}
											<Button
												className="w-full cursor-pointer"
												size="sm"
												variant={isSelected ? 'secondary' : 'default'}
												disabled={product.stock <= 0}
												onClick={(e) => {
													e.stopPropagation()
													onSelectProduct(product)
												}}
											>
												{isSelected ? (
													<>
														<CheckIcon className="h-4 w-4 mr-2" />
														Seleccionado
													</>
												) : (
													<>
														<ShoppingCartIcon className="h-4 w-4 mr-2" />
														Seleccionar
													</>
												)}
											</Button>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						)
					})}
				</AnimatePresence>
			</div>

			{/* Estado vacío */}
			{!isLoading && filteredProducts.length === 0 && (
				<div className="text-center py-12">
					<InfoIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
					<h3 className="text-lg font-medium mb-2">
						No se encontraron productos
					</h3>
					<p className="text-muted-foreground mb-4">
						Intenta ajustar los filtros o términos de búsqueda
					</p>
					<Button
						variant="outline"
						className="cursor-pointer"
						onClick={() =>
							setFilters({
								search: '',
								priceRange: [0, 10000],
								brands: [],
								onlyInStock: true,
								onlyCompatible: false,
								sortBy: 'price_web',
								sortOrder: 'asc',
							})
						}
					>
						Limpiar filtros
					</Button>
				</div>
			)}
		</div>
	)
}
