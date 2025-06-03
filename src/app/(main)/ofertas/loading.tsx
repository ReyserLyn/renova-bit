import { ProductsLoader } from '@/components/ui/page-loader'

export default function OffersLoading() {
	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumb skeleton */}
				<div className="flex items-center space-x-2 mb-6">
					<div className="h-4 w-16 bg-muted animate-pulse rounded" />
					<div className="h-4 w-4 bg-muted animate-pulse rounded" />
					<div className="h-4 w-16 bg-muted animate-pulse rounded" />
				</div>

				{/* Header skeleton */}
				<div className="flex items-center justify-between mb-6">
					<div className="h-8 bg-muted animate-pulse rounded w-48" />
					<div className="h-6 bg-muted animate-pulse rounded w-32" />
				</div>

				{/* Alert skeleton */}
				<div className="h-4 bg-muted animate-pulse rounded w-80 mb-4" />

				<ProductsLoader />
			</div>
		</div>
	)
}
