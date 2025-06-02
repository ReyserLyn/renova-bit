import { EmptyCategory } from '@/components/shop/empty-products'
import { ProductCard } from '@/components/shop/product-card'
import { getCategoryBySlug } from '@/database/queries/categories'

export default async function CategoryPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const category = await getCategoryBySlug(slug)

	if (!category || category.length === 0) {
		return <EmptyCategory categoryName="esta categoría" />
	}

	const categoryData = category[0]

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">{categoryData.name}</h1>

			{categoryData.products.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-6">
					{categoryData.products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			) : (
				<EmptyCategory categoryName={categoryData.name} />
			)}
		</div>
	)
}
