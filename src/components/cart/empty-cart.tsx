import { Button } from '@/components/ui/button'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export function EmptyCart() {
	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-md mx-auto text-center">
				<div className="mb-8">
					<ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground/50" />
				</div>

				<h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>

				<p className="text-muted-foreground mb-8">
					Parece que aún no has agregado ningún producto a tu carrito. ¡Explora
					nuestro catálogo y encuentra lo que necesitas!
				</p>

				<Link href="/">
					<Button size="lg" className="gap-2">
						<ArrowLeft className="h-4 w-4" />
						Continuar Comprando
					</Button>
				</Link>
			</div>
		</div>
	)
}
