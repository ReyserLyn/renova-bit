export * from '../utils'

export * from './sort-products'
export * from './transform-products'

export function formatPrice(price: string | number): string {
	const numPrice = typeof price === 'string' ? Number.parseFloat(price) : price
	return new Intl.NumberFormat('es-PE', {
		style: 'currency',
		currency: 'PEN',
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(numPrice)
}

export function isValidOffer(
	offer: { end_date: string | Date } | null | undefined,
): boolean {
	if (!offer) return false
	const endDate = new Date(offer.end_date)
	return endDate > new Date()
}
