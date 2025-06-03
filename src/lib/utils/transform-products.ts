export function transformProductsForFilters(products: any[]) {
	return products.map((product) => ({
		id: product.id,
		name: product.name,
		category: product.category ? { slug: product.category.slug } : null,
		brand: product.brand ? { slug: product.brand.slug } : null,
		price: Number.parseFloat(product.price) || 0,
		rating: Number(product.rating) || 0,
		offer: product.offer
			? { offer_price: Number.parseFloat(product.offer.offer_price) || 0 }
			: null,
	}))
}
