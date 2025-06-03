'use client'

import { Button } from '@/components/ui/button'
import type { LucideIcon } from 'lucide-react'
import { forwardRef } from 'react'

interface FloatingFiltersButtonProps {
	hasActiveFilters?: boolean
	icon: LucideIcon
	text: string
}

export const FloatingFiltersButton = forwardRef<
	HTMLButtonElement,
	FloatingFiltersButtonProps
>(({ hasActiveFilters = false, icon: Icon, text, ...props }, ref) => {
	return (
		<Button
			ref={ref}
			{...props}
			className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ${
				hasActiveFilters
					? 'bg-blue-600 hover:bg-blue-700'
					: 'bg-primary hover:bg-primary/90'
			}`}
			size="icon"
		>
			<Icon className="h-5 w-5" />
			<span className="sr-only">{text}</span>
		</Button>
	)
})

FloatingFiltersButton.displayName = 'FloatingFiltersButton'
