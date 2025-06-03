'use client'

import { EyeIcon, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProductImageHoverProps {
	product: {
		slug: string
		name: string
		image_url: string
	}
	width?: number
	height?: number
	className?: string
	containerClassName?: string
}

export function ProductImageHover({
	product,
	width = 320,
	height = 220,
	className = '',
	containerClassName = '',
}: ProductImageHoverProps) {
	const [imageError, setImageError] = useState(false)

	const handleImageError = () => {
		setImageError(true)
	}

	const hasValidImage =
		product.image_url && !imageError && product.image_url.trim() !== ''

	return (
		<div
			className={`relative w-full overflow-hidden bg-background rounded-lg group ${containerClassName}`}
		>
			<Link
				href={`/producto/${product.slug}`}
				className="absolute inset-0 z-10"
				aria-label="Ver producto"
			/>

			{hasValidImage ? (
				<Image
					src={product.image_url}
					alt={product.name}
					width={width}
					height={height}
					className={`w-full object-contain transition-transform duration-300 group-hover:scale-105 ${className}`}
					style={{ height: `${height}px`, maxHeight: '100%', maxWidth: '100%' }}
					onError={handleImageError}
					unoptimized
				/>
			) : (
				<div
					className={`w-full flex items-center justify-center ${className}`}
					style={{ height: `${height}px`, maxHeight: '100%' }}
				>
					<ImageIcon className="w-16 h-16 text-muted-foreground/50" />
				</div>
			)}

			<div className="absolute inset-0 bg-black/50 dark:bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
				<div className="bg-background/90 backdrop-blur-sm p-3 rounded-full text-foreground flex items-center justify-center border">
					<EyeIcon className="w-6 h-6" strokeWidth={2} />
					<span className="ml-2 font-medium">Ver producto</span>
				</div>
			</div>
		</div>
	)
}
