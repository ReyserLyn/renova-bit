'use client'

import { CardTitle } from '@/components/ui/card'
import Link from 'next/link'

interface ProductTitleLinkProps {
	product: {
		slug: string
		name: string
	}
	className?: string
	titleClassName?: string
	variant?: 'card' | 'list'
}

export function ProductTitleLink({
	product,
	className = '',
	titleClassName = '',
	variant = 'card',
}: ProductTitleLinkProps) {
	const baseStyles =
		variant === 'card'
			? 'text-[1rem] hover:text-primary transition-all duration-300 text-base line-clamp-3 min-h-[calc(1.5rem*3)] leading-normal'
			: 'text-lg font-semibold line-clamp-2 hover:text-primary transition-all duration-300'

	return (
		<Link href={`/producto/${product.slug}`} className={`w-full ${className}`}>
			<CardTitle className={`${baseStyles} ${titleClassName}`}>
				{product.name}
			</CardTitle>
		</Link>
	)
}
