import { Button } from '@/components/ui/button'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
	icon: LucideIcon
	title: string
	description: string
	actionLabel: string
	actionHref: string
	className?: string
}

export function EmptyState({
	icon: Icon,
	title,
	description,
	actionLabel,
	actionHref,
	className = '',
}: EmptyStateProps) {
	return (
		<div className={`container mx-auto px-4 py-16 ${className}`}>
			<div className="max-w-md mx-auto text-center">
				<div className="mb-8">
					<Icon className="h-24 w-24 mx-auto text-muted-foreground/50" />
				</div>

				<h2 className="text-2xl font-bold mb-4">{title}</h2>

				<p className="text-muted-foreground mb-8">{description}</p>

				<Link href={actionHref}>
					<Button size="lg" className="gap-2">
						{actionLabel}
					</Button>
				</Link>
			</div>
		</div>
	)
}
