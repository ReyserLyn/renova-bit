import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'

interface PageLoaderProps {
	className?: string
	size?: 'sm' | 'md' | 'lg'
	text?: string
	fullScreen?: boolean
}

export function PageLoader({
	className,
	size = 'md',
	text = 'Cargando...',
	fullScreen = false,
}: PageLoaderProps) {
	const sizeClasses = {
		sm: 'h-4 w-4',
		md: 'h-8 w-8',
		lg: 'h-12 w-12',
	}

	const textSizeClasses = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg',
	}

	const containerClasses = fullScreen
		? 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50'
		: 'w-full'

	return (
		<div
			className={cn(
				containerClasses,
				'flex flex-col items-center justify-center gap-4',
				fullScreen ? 'min-h-screen' : 'py-16',
				className,
			)}
		>
			<div className="flex flex-col items-center gap-3">
				<LoaderIcon
					className={cn('animate-spin text-primary', sizeClasses[size])}
				/>
				<p
					className={cn(
						'text-muted-foreground font-medium',
						textSizeClasses[size],
					)}
				>
					{text}
				</p>
			</div>
		</div>
	)
}

interface ProductsLoaderProps {
	className?: string
}

export function ProductsLoader({ className }: ProductsLoaderProps) {
	return (
		<div className={cn('space-y-6', className)}>
			<div className="flex items-center justify-between">
				<div className="h-6 bg-muted animate-pulse rounded w-48" />
				<div className="h-6 bg-muted animate-pulse rounded w-24" />
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{Array.from({ length: 8 }).map((_, i) => (
					<div key={i} className="space-y-3">
						<div className="aspect-square bg-muted animate-pulse rounded-lg" />
						<div className="space-y-2">
							<div className="h-4 bg-muted animate-pulse rounded w-3/4" />
							<div className="h-3 bg-muted animate-pulse rounded w-1/2" />
							<div className="h-5 bg-muted animate-pulse rounded w-20" />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

interface SearchLoaderProps {
	className?: string
}

export function SearchLoader({ className }: SearchLoaderProps) {
	return (
		<div className={cn('space-y-8', className)}>
			<div className="flex items-center space-x-2">
				<div className="h-4 w-16 bg-muted animate-pulse rounded" />
				<div className="h-4 w-4 bg-muted animate-pulse rounded" />
				<div className="h-4 w-24 bg-muted animate-pulse rounded" />
			</div>

			<div className="space-y-4">
				<div className="h-8 bg-muted animate-pulse rounded w-64" />
				<div className="h-5 bg-muted animate-pulse rounded w-96" />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
				<div className="space-y-6">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="space-y-3">
							<div className="h-5 bg-muted animate-pulse rounded w-24" />
							<div className="space-y-2">
								{Array.from({ length: 3 }).map((_, j) => (
									<div
										key={j}
										className="h-4 bg-muted animate-pulse rounded w-full"
									/>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="lg:col-span-3">
					<ProductsLoader />
				</div>
			</div>
		</div>
	)
}
