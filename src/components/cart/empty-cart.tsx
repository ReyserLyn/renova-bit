import { EmptyState } from '@/components/ui/empty-state'
import { ShoppingCart } from 'lucide-react'

export function EmptyCart() {
	return (
		<EmptyState
			icon={ShoppingCart}
			title="Tu carrito está vacío"
			description="Parece que aún no has agregado ningún producto a tu carrito. ¡Explora nuestro catálogo y encuentra lo que necesitas!"
			actionLabel="Continuar Comprando"
			actionHref="/"
		/>
	)
}
