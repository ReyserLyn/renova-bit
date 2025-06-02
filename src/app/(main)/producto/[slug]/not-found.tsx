import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Producto no encontrado | Renova Bit',
	description: 'El producto que buscas no existe o ya no está disponible.',
}

export default function ProductNotFound() {
	return (
		<div className="bg-background text-foreground">
			<div className="container mx-auto px-4 py-16">
				<div className="max-w-md mx-auto text-center">
					<div className="mb-8">
						<FileQuestion className="h-24 w-24 mx-auto text-muted-foreground/50" />
					</div>

					<h2 className="text-2xl font-bold text-foreground mb-4">
						Producto no encontrado
					</h2>

					<p className="text-muted-foreground mb-8">
						Lo sentimos, el producto que buscas no existe o ya no está
						disponible. Puede que haya sido descontinuado o que hayas escrito
						mal la dirección.
					</p>

					<div className="flex flex-row gap-4 justify-center">
						<Link href="/">
							<Button size="lg" className="gap-2 w-full sm:w-auto">
								Volver al inicio
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
