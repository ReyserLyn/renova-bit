import { ClientOnlyFilters } from '@/components/shop/client-only-filters'
import { EmptyCategory } from '@/components/shop/empty-products'
import { ProductList } from '@/components/shop/product-list'
import { SearchToolbar } from '@/components/shop/search-toolbar'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { getCategoryBySlug } from '@/database/queries/categories'
import { getCategoryPageData } from '@/database/queries/products'
import type { ProductFilters } from '@/lib/stores/filters-store'
import { sortProducts, transformProductsForFilters } from '@/lib/utils/index'
import type { Metadata } from 'next'
import { cache } from 'react'

interface CategoryPageProps {
	params: Promise<{ slug: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const getCachedCategoryData = cache(
	async (slug: string, filters: ProductFilters) => {
		return await getCategoryPageData(slug, filters)
	},
)

const getCachedCategory = cache(async (slug: string) => {
	return await getCategoryBySlug(slug)
})

export const revalidate = 300 // Revalidar cada 5 minutos

export async function generateMetadata({
	params,
}: CategoryPageProps): Promise<Metadata> {
	const { slug } = await params
	const category = await getCachedCategory(slug)
	const categoryName = category?.[0]?.name || 'Categoría'

	return {
		title: `${categoryName} - RenovaBit`,
		description: `Explora nuestra selección de ${categoryName.toLowerCase()}. Encuentra los mejores productos de tecnología con la mejor calidad y precios.`,
	}
}

export default async function CategoryPage({
	params,
	searchParams,
}: CategoryPageProps) {
	const { slug } = await params
	const searchParamsResolved = await searchParams

	const category = await getCachedCategory(slug)

	if (!category || category.length === 0) {
		return <EmptyCategory categoryName="esta categoría" />
	}

	const categoryData = category[0]

	const filters: ProductFilters = {
		search: (searchParamsResolved.buscar as string) || '',
		categories: [slug],
		brands: searchParamsResolved.marcas
			? (searchParamsResolved.marcas as string).split(',').filter(Boolean)
			: [],
		priceRange: [
			Number(searchParamsResolved.precio_min) || 0,
			Number(searchParamsResolved.precio_max) || 20000,
		],
		rating: searchParamsResolved.rating
			? Number(searchParamsResolved.rating)
			: null,
		hasOffer: searchParamsResolved.ofertas === 'true',
	}

	const sortBy = (searchParamsResolved.orden as string) || 'relevancia'
	const viewMode = (searchParamsResolved.vista as string) || 'grid'

	const {
		products,
		priceRange,
		brands,
		categories: allCategories,
	} = await getCachedCategoryData(slug, filters)

	if (!searchParamsResolved.precio_min) filters.priceRange[0] = priceRange.min
	if (!searchParamsResolved.precio_max) filters.priceRange[1] = priceRange.max

	const sortedProducts = sortProducts(products, sortBy)
	const transformedProducts = transformProductsForFilters(sortedProducts)

	const stats = {
		priceRange: {
			min: Math.min(
				...sortedProducts.map((p) => Number.parseFloat(p.price) || 0),
			),
			max: Math.max(
				...sortedProducts.map((p) => Number.parseFloat(p.price) || 0),
			),
		},
	}

	const breadcrumbItems = [
		{ label: 'Productos', href: '/busqueda' },
		{ label: categoryData.name, isActive: true },
	]

	return (
		<div className="min-h-screen ">
			<div className="container mx-auto px-4 py-8">
				<Breadcrumb items={breadcrumbItems} className="mb-6" />

				<div className="flex items-center justify-between mb-6">
					<div>
						<h1 className="text-3xl font-bold">{categoryData.name}</h1>
						<p className="text-muted-foreground mt-2">
							{sortedProducts.length}{' '}
							{sortedProducts.length === 1
								? 'producto encontrado'
								: 'productos encontrados'}
						</p>
					</div>
				</div>

				<div className="flex flex-col lg:flex-row gap-6">
					<div className="hidden lg:block lg:w-80 flex-shrink-0">
						<ClientOnlyFilters
							categories={allCategories}
							brands={brands}
							priceRange={priceRange}
							products={transformedProducts}
						/>
					</div>

					<div className="flex-1">
						{sortedProducts.length > 0 ? (
							<>
								<SearchToolbar
									totalProducts={sortedProducts.length}
									priceRange={stats.priceRange}
									sortBy={sortBy}
									viewMode={viewMode}
								/>

								<ProductList products={sortedProducts} viewMode={viewMode} />
							</>
						) : (
							<EmptyCategory categoryName={categoryData.name} />
						)}
					</div>
				</div>

				<ClientOnlyFilters
					categories={allCategories}
					brands={brands}
					priceRange={priceRange}
					products={transformedProducts}
					mobileOnly={true}
				/>
			</div>
		</div>
	)
}
