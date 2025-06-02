import { EmptyBrand } from '@/components/shop/empty-products'
import { ProductCard } from '@/components/shop/product-card'
import { getBrandBySlug } from '@/database/queries/brands'

export default async function BrandPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const brand = await getBrandBySlug(slug)

	if (!brand || brand.length === 0) {
		return <EmptyBrand brandName="esta marca" />
	}

	const brandData = brand[0]

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Productos de {brandData.name}</h1>

			{brandData.products.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-6">
					{brandData.products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			) : (
				<EmptyBrand brandName={brandData.name} />
			)}
		</div>
	)
}
