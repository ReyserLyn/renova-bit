import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CartSkeleton() {
	return (
		<div className="container mx-auto px-4 py-8">
			{/* Título del carrito */}
			<Skeleton className="h-8 w-64 mb-8" />

			<div className="grid lg:grid-cols-3 gap-8">
				{/* Items del carrito */}
				<div className="lg:col-span-2 space-y-4">
					{[1, 2, 3].map((i) => (
						<Card key={i} className="p-4">
							<div className="flex gap-4">
								{/* Imagen */}
								<Skeleton className="h-24 w-24 rounded-md" />

								{/* Contenido */}
								<div className="flex-1">
									<div className="flex justify-between mb-4">
										<div className="space-y-2">
											<Skeleton className="h-5 w-48" />
											<Skeleton className="h-4 w-24" />
										</div>
										<Skeleton className="h-5 w-16" />
									</div>

									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Skeleton className="h-8 w-8" />
											<Skeleton className="h-6 w-8" />
											<Skeleton className="h-8 w-8" />
											<Skeleton className="h-8 w-8 ml-2" />
										</div>
										<Skeleton className="h-6 w-20" />
									</div>
								</div>
							</div>
						</Card>
					))}
				</div>

				{/* Resumen del carrito */}
				<div className="lg:col-span-1">
					<Card className="p-6">
						{/* Header */}
						<Skeleton className="h-6 w-40 mb-4" />

						{/* Contenido */}
						<div className="space-y-4">
							{/* Líneas del resumen */}
							<div className="space-y-2">
								<div className="flex justify-between">
									<Skeleton className="h-4 w-24" />
									<Skeleton className="h-4 w-16" />
								</div>
								<div className="flex justify-between">
									<Skeleton className="h-4 w-32" />
									<Skeleton className="h-4 w-20" />
								</div>
							</div>

							{/* Separador */}
							<div className="h-px bg-border" />

							{/* Envío */}
							<div className="space-y-2">
								<Skeleton className="h-4 w-32 mb-2" />
								<Skeleton className="h-20 w-full" />
								<Skeleton className="h-20 w-full" />
							</div>

							{/* Separador */}
							<div className="h-px bg-border" />

							{/* Total */}
							<div className="flex justify-between">
								<Skeleton className="h-6 w-24" />
								<Skeleton className="h-6 w-20" />
							</div>

							{/* Botones */}
							<div className="space-y-2 pt-4">
								<Skeleton className="h-10 w-full" />
								<Skeleton className="h-10 w-full" />
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	)
}
