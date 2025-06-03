import { ProductsLoader } from '@/components/ui/page-loader'

export default function CategoryLoading() {
	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center space-x-2 mb-6">
					<div className="h-4 w-16 bg-muted animate-pulse rounded" />
					<div className="h-4 w-4 bg-muted animate-pulse rounded" />
					<div className="h-4 w-24 bg-muted animate-pulse rounded" />
				</div>

				<div className="text-center mb-8">
					<div className="h-8 bg-muted animate-pulse rounded w-64 mx-auto mb-4" />
					<div className="h-5 bg-muted animate-pulse rounded w-96 mx-auto" />
				</div>

				<ProductsLoader />
			</div>
		</div>
	)
}
