import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

interface RatingProps {
	value: number
	max?: number
	size?: 'sm' | 'md' | 'lg'
	interactive?: boolean
	onChange?: (rating: number) => void
	className?: string
}

export function Rating({
	value,
	max = 5,
	size = 'md',
	interactive = false,
	onChange,
	className,
}: RatingProps) {
	const sizeClasses = {
		sm: 'h-3 w-3',
		md: 'h-4 w-4',
		lg: 'h-5 w-5',
	}

	const handleClick = (rating: number) => {
		if (interactive && onChange) {
			onChange(rating)
		}
	}

	const StarElement = interactive ? 'button' : 'div'

	return (
		<div className={cn('flex gap-0.5', className)}>
			{Array.from({ length: max }, (_, i) => {
				const starValue = i + 1
				const isFilled = starValue <= value
				const isPartial = !isFilled && starValue - 1 < value

				const starProps = interactive
					? {
							type: 'button' as const,
							disabled: false,
							onClick: () => handleClick(starValue),
						}
					: {}

				return (
					<StarElement
						key={`star-${starValue}`}
						{...starProps}
						className={cn(
							'relative transition-colors',
							interactive && 'hover:scale-110 cursor-pointer',
							!interactive && 'cursor-default',
						)}
					>
						<Star
							className={cn(
								sizeClasses[size],
								'transition-colors',
								isFilled
									? 'fill-yellow-400 text-yellow-400'
									: 'fill-muted text-muted-foreground',
							)}
						/>
						{isPartial && (
							<Star
								className={cn(
									sizeClasses[size],
									'absolute inset-0 fill-yellow-400 text-yellow-400',
								)}
								style={{
									clipPath: `inset(0 ${100 - (value - (starValue - 1)) * 100}% 0 0)`,
								}}
							/>
						)}
					</StarElement>
				)
			})}
		</div>
	)
}

interface RatingDisplayProps {
	rating: number
	count?: number
	size?: 'sm' | 'md' | 'lg'
	showValue?: boolean
	className?: string
}

export function RatingDisplay({
	rating,
	count,
	size = 'md',
	showValue = true,
	className,
}: RatingDisplayProps) {
	return (
		<div className={cn('flex items-center gap-2', className)}>
			<Rating value={rating} size={size} interactive={false} />
			{showValue && (
				<div className="flex items-center gap-1 text-sm text-muted-foreground">
					<span className="font-medium text-foreground">
						{rating.toFixed(1)}
					</span>
					{count !== undefined && (
						<span>
							({count} {count === 1 ? 'reseña' : 'reseñas'})
						</span>
					)}
				</div>
			)}
		</div>
	)
}
