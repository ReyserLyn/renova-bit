'use client'

import { Input } from '@/components/ui/input'
import { SelectNative } from '@/components/ui/select-native'
import { cn, textToSlug } from '@/lib/utils'
import { ArrowRightIcon, SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useId, useState } from 'react'

export default function InputSearch({
	className,
	showCategories = true,
	categories = [],
}: {
	className?: string
	showCategories?: boolean
	categories?: Array<{ id: string; name: string; slug: string }>
}) {
	const id = useId()
	const router = useRouter()

	// Estado local para el header - NO sincronizar con URL para evitar bucles
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('Todos')
	const [showAllCategories, setShowAllCategories] = useState(false)

	// Mostrar solo las primeras 5 categorías inicialmente
	const displayedCategories = showAllCategories
		? categories
		: categories.slice(0, 5)

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value

		if (value === 'Ver más...') {
			setShowAllCategories(true)
			return
		}

		if (value === 'Ver menos') {
			setShowAllCategories(false)
			return
		}

		setSelectedCategory(value)
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		const params = new URLSearchParams()
		
		params.set('buscar', searchTerm.trim())

		if (
			showCategories &&
			selectedCategory !== 'Todos' &&
			selectedCategory !== 'Categorías'
		) {
			// Convertir el nombre de categoría a slug
			const categorySlug = textToSlug(selectedCategory)
			params.set('categorias', categorySlug)
		}

		const newUrl = `/busqueda?${params.toString()}`

		router.push(newUrl)
		setSearchTerm('')
		setSelectedCategory('Todos')
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSubmit(e as any)
		}
	}

	return (
		<div className={cn('w-full', className)}>
			<form onSubmit={handleSubmit} className="flex w-full rounded-md">
				{showCategories && (
					<SelectNative
						className="hidden md:block text-foreground bg-background border-border hover:text-foreground hover:bg-accent w-[140px] rounded-e-none rounded-s-md shadow-none border-e-0 truncate"
						value={selectedCategory}
						onChange={handleCategoryChange}
					>
						<option
							value="Categorías"
							className="text-foreground bg-background"
						>
							Categorías
						</option>
						<option value="Todos" className="text-foreground bg-background">
							Todos
						</option>
						{displayedCategories.map((category) => (
							<option
								key={category.id}
								value={category.name}
								className="text-foreground bg-background"
							>
								{category.name}
							</option>
						))}
						{categories.length > 5 && !showAllCategories && (
							<option
								value="Ver más..."
								className="text-foreground bg-background italic"
							>
								Ver más... (+{categories.length - 5})
							</option>
						)}
						{showAllCategories && categories.length > 5 && (
							<option
								value="Ver menos"
								className="text-foreground bg-background italic"
							>
								Ver menos
							</option>
						)}
					</SelectNative>
				)}

				<div className="relative flex-1 w-full">
					<Input
						id={id}
						className={cn(
							'w-full shadow-none focus-visible:z-10 ps-9 pe-9 text-foreground bg-background border-border placeholder:text-muted-foreground',
							showCategories
								? 'md:border-s-0 md:rounded-s-none rounded-e-md'
								: 'rounded-md',
						)}
						placeholder="Busca en toda la tienda..."
						type="search"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyPress={handleKeyPress}
						autoFocus={false}
					/>

					<div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
						<SearchIcon size={16} />
					</div>

					<button
						type="submit"
						className="text-muted-foreground hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md outline-none focus:z-10 focus-visible:ring-2 focus-visible:ring-ring"
					>
						<ArrowRightIcon size={16} />
					</button>
				</div>
			</form>
		</div>
	)
}
