import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CartSkeleton() {
	return (
		<div className="container mx-auto px-4 py-4 sm:py-8">
			<Skeleton className="h-6 sm:h-8 w-48 sm:w-64 mb-4 sm:mb-8" />

			<div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-8">
				<div className="lg:col-span-2 space-y-4">
					{[1, 2, 3].map((i) => (
						<Card key={i} className="p-3 sm:p-4">
							<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
								<Skeleton className="h-20 w-20 sm:h-24 sm:w-24 rounded-md mx-auto sm:mx-0 flex-shrink-0" />

								<div className="flex-1 min-w-0">
									<div className="flex flex-col sm:flex-row sm:justify-between mb-3 sm:mb-4 gap-2">
										<div className="space-y-2 min-w-0 flex-1">
											<Skeleton className="h-4 sm:h-5 w-full max-w-48" />
											<Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
										</div>
										<Skeleton className="h-4 sm:h-5 w-12 sm:w-16 flex-shrink-0" />
									</div>

									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
										<div className="flex items-center gap-2">
											<Skeleton className="h-7 w-7 sm:h-8 sm:w-8" />
											<Skeleton className="h-5 sm:h-6 w-6 sm:w-8" />
											<Skeleton className="h-7 w-7 sm:h-8 sm:w-8" />
											<Skeleton className="h-7 w-7 sm:h-8 sm:w-8 ml-2" />
										</div>
										<Skeleton className="h-5 sm:h-6 w-16 sm:w-20" />
									</div>
								</div>
							</div>
						</Card>
					))}
				</div>

				<div className="lg:col-span-1">
					<Card className="p-4 sm:p-6">
						<Skeleton className="h-5 sm:h-6 w-32 sm:w-40 mb-4" />

						<div className="space-y-4">
							<div className="space-y-2">
								<div className="flex justify-between">
									<Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
									<Skeleton className="h-3 sm:h-4 w-12 sm:w-16" />
								</div>
								<div className="flex justify-between">
									<Skeleton className="h-3 sm:h-4 w-24 sm:w-32" />
									<Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
								</div>
							</div>

							<div className="h-px bg-border" />

							<div className="space-y-2">
								<Skeleton className="h-3 sm:h-4 w-24 sm:w-32 mb-2" />
								<Skeleton className="h-16 sm:h-20 w-full" />
								<Skeleton className="h-16 sm:h-20 w-full" />
							</div>

							<div className="h-px bg-border" />

							<div className="flex justify-between">
								<Skeleton className="h-5 sm:h-6 w-20 sm:w-24" />
								<Skeleton className="h-5 sm:h-6 w-16 sm:w-20" />
							</div>

							<div className="space-y-2 pt-4">
								<Skeleton className="h-9 sm:h-10 w-full" />
								<Skeleton className="h-9 sm:h-10 w-full" />
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	)
}
