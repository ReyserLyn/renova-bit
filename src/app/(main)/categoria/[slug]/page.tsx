import { ProductCard } from '@/components/shop/product-card'
import { getCategoryBySlug } from '@/database/queries/categories'
export default async function CategoryPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const category = await getCategoryBySlug(slug)
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">{category[0].name}</h1>

			{category[0].products.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-6">
					{category[0].products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			) : (
				<p className="text-gray-500">No hay productos en esta categoría.</p>
			)}
		</div>
	)
}
