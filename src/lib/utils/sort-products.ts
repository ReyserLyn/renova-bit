export function sortProducts(products: any[], sortBy: string) {
	const sortedProducts = [...products]

	switch (sortBy) {
		case 'precio-asc':
			return sortedProducts.sort((a, b) => {
				const priceA = a.offer
					? Number.parseFloat(a.offer.offer_price)
					: Number.parseFloat(a.price)
				const priceB = b.offer
					? Number.parseFloat(b.offer.offer_price)
					: Number.parseFloat(b.price)
				return priceA - priceB
			})
		case 'precio-desc':
			return sortedProducts.sort((a, b) => {
				const priceA = a.offer
					? Number.parseFloat(a.offer.offer_price)
					: Number.parseFloat(a.price)
				const priceB = b.offer
					? Number.parseFloat(b.offer.offer_price)
					: Number.parseFloat(b.price)
				return priceB - priceA
			})
		case 'nombre':
			return sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
		case 'rating':
			return sortedProducts.sort(
				(a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0),
			)
		case 'ofertas':
			return sortedProducts.sort((a, b) => {
				if (a.offer && !b.offer) return -1
				if (!a.offer && b.offer) return 1
				if (a.offer && b.offer) {
					return (
						(b.offer.discount_percent || 0) - (a.offer.discount_percent || 0)
					)
				}
				return 0
			})
		default:
			return sortedProducts
	}
}
