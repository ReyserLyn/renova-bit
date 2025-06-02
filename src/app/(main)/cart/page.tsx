'use client'

import { CartItem } from '@/components/cart/cart-item'
import { CartSkeleton } from '@/components/cart/cart-skeleton'
import { CartSummary } from '@/components/cart/cart-summary'
import { EmptyCart } from '@/components/cart/empty-cart'
import { useCart } from '@/hooks/use-cart'
import { useUser } from '@/hooks/use-user'

export default function CartPage() {
	const { items, isLoading, isSyncing } = useCart()
	const { isLoaded: isUserLoaded } = useUser()

	if (!isUserLoaded || (isLoading && items.length === 0)) {
		return <CartSkeleton />
	}

	if (items.length === 0) {
		return <EmptyCart />
	}

	return (
		<div className="container mx-auto px-4 py-4 sm:py-8 max-w-full overflow-hidden">
			<div className="flex items-center gap-2 mb-4 sm:mb-8">
				<h1 className="text-2xl sm:text-3xl font-bold">Carrito de Compras</h1>
				{isSyncing && (
					<div className="flex items-center gap-2 text-sm text-muted-foreground sr-only">
						<div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
						<span>Sincronizando...</span>
					</div>
				)}
			</div>

			<div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-8">
				<div className="lg:col-span-2 w-full min-w-0">
					<div className="space-y-4">
						{items.map((item) => (
							<CartItem key={item.product.id} item={item} />
						))}
					</div>
				</div>

				<div className="lg:col-span-1 w-full min-w-0">
					<CartSummary />
				</div>
			</div>
		</div>
	)
}
