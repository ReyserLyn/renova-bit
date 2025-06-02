import { EmptyState } from '@/components/ui/empty-state'
import { FileQuestion } from 'lucide-react'
import type { Metadata } from 'next'
import { MainLayoutContent } from './(main)/layout'

export const metadata: Metadata = {
	title: '404 - Página no encontrada | Renova Bit',
	description:
		'La página que buscas no existe. Explora nuestro catálogo de productos tecnológicos.',
}

export default function NotFoundPage() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<MainLayoutContent>
				<EmptyState
					icon={FileQuestion}
					title="Página no encontrada"
					description="Lo sentimos, la página que buscas no existe. Puede que haya sido movida, eliminada o que hayas escrito mal la dirección."
					actionLabel="Volver al inicio"
					actionHref="/"
				/>
			</MainLayoutContent>
		</div>
	)
}
