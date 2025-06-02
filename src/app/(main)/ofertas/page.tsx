import { EmptyOffers } from '@/components/shop/empty-products'
import { ProductCard } from '@/components/shop/product-card'
// import { getOffersProducts } from '@/database/queries/products'

export default async function OffersPage() {
	// TODO: Implementar lógica real de ofertas
	// const offers = await getOffersProducts()
	const offers: any[] = []

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Ofertas Especiales</h1>

			{offers.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-6">
					{offers.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			) : (
				<EmptyOffers />
			)}
		</div>
	)
}
