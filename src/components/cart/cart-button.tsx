'use client'

import { useCart } from '@/hooks/use-cart'
import { useMounted } from '@/hooks/use-mounted'
import Link from 'next/link'
import { FaCartShopping } from 'react-icons/fa6'

export function CartButton() {
	const { totalItems } = useCart()
	const mounted = useMounted()

	const displayItems = mounted ? totalItems : 0

	return (
		<Link href="/cart" className="flex flex-col items-center text-xs">
			<div className="relative">
				<FaCartShopping className="w-5 h-5" />
				{displayItems > 0 && (
					<span className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
						{displayItems > 99 ? '99+' : displayItems}
					</span>
				)}
			</div>
			<span>Carrito</span>
		</Link>
	)
}
