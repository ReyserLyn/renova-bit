import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function textToSlug(text: string): string {
	return (
		text
			.toString()
			.normalize('NFD')
			// biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.trim()
			.replace(/\s+/g, '-')
			.replace(/[^\w\-]+/g, '')
			.replace(/\-\-+/g, '-')
			.replace(/^-+/, '')
			.replace(/-+$/, '')
	)
}

export function formatPrice(price: number | string): string {
	const numPrice = typeof price === 'string' ? Number.parseFloat(price) : price
	return numPrice.toFixed(2)
}
