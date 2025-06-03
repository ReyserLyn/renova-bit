import { EmptyOffers } from '@/components/shop/empty-products'
import { ProductCard } from '@/components/shop/product-card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { getActiveOffers } from '@/database/queries/offers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Ofertas Especiales - RenovaBit',
	description:
		'Descubre nuestras ofertas especiales en tecnología. Productos con descuentos por tiempo limitado.',
}

export default async function OffersPage() {
	const offers = await getActiveOffers()

	const breadcrumbItems = [{ label: 'Ofertas', isActive: true }]

	return (
		<div className="container mx-auto px-4 py-8">
			<Breadcrumb items={breadcrumbItems} className="mb-6" />

			<div className="flex items-center justify-between mb-6">
				<h1 className="text-3xl font-bold">Ofertas Especiales</h1>
				{offers.length > 0 && (
					<span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
						{offers.length}{' '}
						{offers.length === 1 ? 'oferta disponible' : 'ofertas disponibles'}
					</span>
				)}
			</div>

			{offers.length > 0 ? (
				<>
					<div className="mb-4 text-sm text-muted-foreground">
						⚡ Ofertas por tiempo limitado. ¡No te las pierdas!
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-6">
						{offers.map((offer) => {
							if (!offer.product || !offer.brand) return null

							const productWithBrand = {
								...offer.product,
								brand: offer.brand,
							}

							return (
								<ProductCard
									key={offer.id}
									product={productWithBrand}
									offer={{
										id: offer.id,
										offer_price: offer.offer_price,
										discount_percent: offer.discount_percent,
										end_date: offer.end_date,
									}}
								/>
							)
						})}
					</div>
				</>
			) : (
				<EmptyOffers />
			)}
		</div>
	)
}
