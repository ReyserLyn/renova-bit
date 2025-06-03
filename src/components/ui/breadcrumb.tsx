'use client'

import { cn } from '@/lib/utils'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

export interface BreadcrumbItem {
	label: string
	href?: string
	isActive?: boolean
}

interface BreadcrumbProps {
	items: BreadcrumbItem[]
	className?: string
	separator?: React.ReactNode
	homeIcon?: boolean
}

export function Breadcrumb({
	items,
	className,
	separator = <ChevronRight className="h-4 w-4 text-muted-foreground" />,
	homeIcon = true,
}: BreadcrumbProps) {
	const allItems = homeIcon ? [{ label: 'Inicio', href: '/' }, ...items] : items

	return (
		<nav
			aria-label="Navegación"
			className={cn('flex items-center space-x-1 text-sm', className)}
		>
			<ol className="flex items-center space-x-1">
				{allItems.map((item, index) => {
					const key = `breadcrumb-${index}-${item.label}-${item.href || 'no-href'}-${homeIcon && index === 0 ? 'home' : 'item'}`
					return (
						<Fragment key={key}>
							<li className="flex items-center">
								{item.href && !item.isActive ? (
									<Link
										href={item.href}
										className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
									>
										{index === 0 && homeIcon && <Home className="h-4 w-4" />}
										<span>{item.label}</span>
									</Link>
								) : (
									<span
										className={cn(
											'flex items-center gap-1',
											item.isActive
												? 'text-foreground font-medium'
												: 'text-muted-foreground',
										)}
									>
										{index === 0 && homeIcon && <Home className="h-4 w-4" />}
										<span>{item.label}</span>
									</span>
								)}
							</li>
							{index < allItems.length - 1 && (
								<li key={`separator-${index}`} className="flex items-center">
									{separator}
								</li>
							)}
						</Fragment>
					)
				})}
			</ol>
		</nav>
	)
}

export function BreadcrumbSkeleton({ className }: { className?: string }) {
	return (
		<div className={cn('flex items-center space-x-1', className)}>
			<div className="h-4 w-12 bg-muted animate-pulse rounded" />
			<ChevronRight className="h-4 w-4 text-muted-foreground" />
			<div className="h-4 w-20 bg-muted animate-pulse rounded" />
			<ChevronRight className="h-4 w-4 text-muted-foreground" />
			<div className="h-4 w-16 bg-muted animate-pulse rounded" />
		</div>
	)
}
