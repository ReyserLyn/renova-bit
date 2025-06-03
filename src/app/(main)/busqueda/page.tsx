import { ClientOnlyFilters } from '@/components/shop/client-only-filters'
import { EmptySearch } from '@/components/shop/empty-products'
import { ProductList } from '@/components/shop/product-list'
import { SearchToolbar } from '@/components/shop/search-toolbar'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getSearchPageData } from '@/database/queries/products'
import type { ProductFilters as ProductFiltersType } from '@/lib/stores/filters-store'
import { sortProducts } from '@/lib/utils/sort-products'
import { transformProductsForFilters } from '@/lib/utils/transform-products'
import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

interface SearchPageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({
	searchParams,
}: SearchPageProps): Promise<Metadata> {
	const params = await searchParams
	const searchTerm = (params.buscar as string) || ''

	return {
		title: searchTerm
			? `Búsqueda: ${searchTerm} - RenovaBit`
			: 'Búsqueda de productos - RenovaBit',
		description: searchTerm
			? `Resultados de búsqueda para "${searchTerm}". Encuentra los mejores productos de tecnología.`
			: 'Busca y filtra todos nuestros productos de tecnología. Encuentra exactamente lo que necesitas.',
		keywords: searchTerm
			? `${searchTerm}, tecnología, productos, RenovaBit`
			: 'búsqueda, productos, tecnología, computadoras, laptops',
	}
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const params = await searchParams

	const filters: ProductFiltersType = {
		search: (params.buscar as string) || '',
		categories: params.categorias
			? (params.categorias as string).split(',').filter(Boolean)
			: [],
		brands: params.marcas
			? (params.marcas as string).split(',').filter(Boolean)
			: [],
		priceRange: [
			Number(params.precio_min) || 0,
			Number(params.precio_max) || 20000,
		],
		rating: params.rating ? Number(params.rating) : null,
		hasOffer: params.ofertas === 'true',
	}

	const sortBy = (params.orden as string) || 'relevancia'
	const viewMode = (params.vista as string) || 'grid'

	const { products, priceRange, brands, categories } =
		await getSearchPageData(filters)

	if (!params.precio_min) filters.priceRange[0] = priceRange.min
	if (!params.precio_max) filters.priceRange[1] = priceRange.max

	const sortedProducts = sortProducts(products, sortBy)
	const transformedProducts = transformProductsForFilters(sortedProducts)

	const stats = {
		total: sortedProducts.length,
		withOffers: sortedProducts.filter((p) => p.offer).length,
		categories: new Set(
			sortedProducts.map((p) => p.category?.slug).filter(Boolean),
		).size,
		brands: new Set(sortedProducts.map((p) => p.brand?.slug).filter(Boolean))
			.size,
		priceRange: {
			min: Math.min(
				...sortedProducts.map((p) => Number.parseFloat(p.price) || 0),
			),
			max: Math.max(
				...sortedProducts.map((p) => Number.parseFloat(p.price) || 0),
			),
		},
	}

	const breadcrumbItems = [{ label: 'Búsqueda de Productos', isActive: true }]

	const getSearchSummary = () => {
		const parts = []
		if (filters.search) parts.push(`"${filters.search}"`)
		if (filters.categories.length > 0)
			parts.push(
				`en ${filters.categories.length} categoría${filters.categories.length > 1 ? 's' : ''}`,
			)
		if (filters.brands.length > 0)
			parts.push(
				`de ${filters.brands.length} marca${filters.brands.length > 1 ? 's' : ''}`,
			)
		if (filters.hasOffer) parts.push('con ofertas')
		if (filters.rating) parts.push(`con ${filters.rating}+ estrellas`)

		return parts.length > 0 ? parts.join(' ') : 'todos los productos'
	}

	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<div className="mb-8">
					<Breadcrumb items={breadcrumbItems} className="mb-6" />

					<div className="text-center mb-6">
						<div className="flex items-center justify-center gap-3 mb-4">
							<SearchIcon className="h-6 w-6 text-muted-foreground" />
							<h1 className="text-3xl lg:text-4xl font-bold">
								{filters.search
									? `Resultados para "${filters.search}"`
									: 'Explorar Productos'}
							</h1>
						</div>

						<p className="text-muted-foreground text-lg">
							{filters.search
								? `Encontramos ${stats.total} productos que coinciden con tu búsqueda`
								: 'Descubre toda nuestra colección de productos tecnológicos'}
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
						<Card className="text-center p-4">
							<div className="text-2xl font-bold text-blue-600">
								{stats.total}
							</div>
							<div className="text-sm text-muted-foreground">Productos</div>
						</Card>
						<Card className="text-center p-4">
							<div className="text-2xl font-bold text-red-600">
								{stats.withOffers}
							</div>
							<div className="text-sm text-muted-foreground">En Oferta</div>
						</Card>
						<Card className="text-center p-4">
							<div className="text-2xl font-bold text-green-600">
								{stats.categories}
							</div>
							<div className="text-sm text-muted-foreground">Categorías</div>
						</Card>
						<Card className="text-center p-4">
							<div className="text-2xl font-bold text-purple-600">
								{stats.brands}
							</div>
							<div className="text-sm text-muted-foreground">Marcas</div>
						</Card>
					</div>
				</div>

				{(filters.search ||
					filters.categories.length > 0 ||
					filters.brands.length > 0 ||
					filters.hasOffer ||
					filters.rating) && (
					<Card className="mb-6 border-muted bg-muted/30 dark:border-muted dark:bg-muted/10">
						<CardContent className="p-4">
							<div className="flex flex-wrap items-center gap-2 mb-3">
								<SlidersHorizontalIcon className="h-4 w-4 text-foreground" />
								<span className="text-sm font-medium text-foreground">
									Buscando: {getSearchSummary()}
								</span>
							</div>
							<div className="flex flex-wrap gap-2">
								{filters.search && (
									<Badge
										variant="secondary"
										className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
									>
										Término: "{filters.search}"
									</Badge>
								)}
								{filters.categories.map((cat) => (
									<Badge
										key={cat}
										variant="secondary"
										className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
									>
										Categoría: {cat}
									</Badge>
								))}
								{filters.brands.map((brand) => (
									<Badge
										key={brand}
										variant="secondary"
										className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200"
									>
										Marca: {brand}
									</Badge>
								))}
								{filters.hasOffer && (
									<Badge
										variant="secondary"
										className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
									>
										Solo ofertas
									</Badge>
								)}
								{filters.rating && (
									<Badge
										variant="secondary"
										className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
									>
										{filters.rating}+ estrellas
									</Badge>
								)}
							</div>
						</CardContent>
					</Card>
				)}

				{!filters.search && filters.categories.length === 0 && (
					<Card className="mb-6">
						<CardContent className="p-6">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								🔥 Categorías Populares
							</h3>
							<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
								{[
									'laptops',
									'computadoras',
									'monitores',
									'teclados',
									'mouses',
									'audífonos',
								].map((category) => (
									<Button
										key={category}
										variant="outline"
										size="sm"
										asChild
										className="hover:bg-primary/10 hover:border-primary/50 transition-colors"
									>
										<Link href={`/categoria/${category}`}>
											{category.charAt(0).toUpperCase() + category.slice(1)}
										</Link>
									</Button>
								))}
							</div>
						</CardContent>
					</Card>
				)}

				<div className="flex flex-col lg:flex-row gap-6">
					<div className="hidden lg:block lg:w-80 flex-shrink-0">
						<ClientOnlyFilters
							categories={categories}
							brands={brands}
							priceRange={priceRange}
							products={transformedProducts}
						/>
					</div>

					<div className="flex-1 min-w-0">
						{sortedProducts.length > 0 ? (
							<>
								<SearchToolbar
									totalProducts={sortedProducts.length}
									priceRange={stats.priceRange}
									sortBy={sortBy}
									viewMode={viewMode}
								/>

								<ProductList products={sortedProducts} viewMode={viewMode} />

								{sortedProducts.length < 5 && filters.search && (
									<Card className="mt-8 border-dashed">
										<CardContent className="p-6 text-center">
											<p className="text-muted-foreground mb-4">
												¿No encuentras lo que buscas?
											</p>
											<div className="flex flex-col sm:flex-row gap-3 justify-center">
												<Button variant="outline" asChild>
													<Link href="/busqueda">Ver todos los productos</Link>
												</Button>
												<Button asChild>
													<Link href="/atencion-al-cliente">
														Contactar soporte
													</Link>
												</Button>
											</div>
										</CardContent>
									</Card>
								)}
							</>
						) : (
							<EmptySearch searchTerm={filters.search} />
						)}
					</div>
				</div>
			</div>

			<ClientOnlyFilters
				categories={categories}
				brands={brands}
				priceRange={priceRange}
				products={transformedProducts}
				mobileOnly={true}
			/>
		</div>
	)
}
