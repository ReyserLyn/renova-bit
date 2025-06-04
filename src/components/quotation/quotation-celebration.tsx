'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import type { QuotationSummary } from '@/types/quotation'
import { motion } from 'framer-motion'
import {
	CheckCircleIcon,
	DownloadIcon,
	ShareIcon,
	ShoppingCartIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

interface QuotationCelebrationProps {
	summary: QuotationSummary
	onRequestQuotation: () => void
	onDownload: () => void
	onShare: () => void
	onClose: () => void
	show: boolean
}

export function QuotationCelebration({
	summary,
	onRequestQuotation,
	onDownload,
	onShare,
	onClose,
	show,
}: QuotationCelebrationProps) {
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
	const [showConfetti, setShowConfetti] = useState(false)

	useEffect(() => {
		if (show) {
			setShowConfetti(true)
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			})

			// Detener confetti después de 3 segundos
			const timer = setTimeout(() => {
				setShowConfetti(false)
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [show])

	if (!show) return null

	return (
		<>
			{/* Confetti */}
			{showConfetti && (
				<Confetti
					width={dimensions.width}
					height={dimensions.height}
					recycle={false}
					numberOfPieces={200}
					gravity={0.1}
				/>
			)}

			{/* Modal de celebración */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
				onClick={onClose}
			>
				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.8, opacity: 0 }}
					transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
					className="w-full max-w-lg"
					onClick={(e) => e.stopPropagation()}
				>
					<Card className="border-2 bg-card shadow-2xl">
						<CardHeader className="text-center pb-4 relative">
							{/* Botón de cerrar */}
							<Button
								variant="ghost"
								size="sm"
								className="absolute top-2 right-2 h-8 w-8 p-0"
								onClick={onClose}
							>
								<span className="sr-only">Cerrar</span>
								<svg
									className="h-4 w-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-label="Cerrar dialog"
								>
									<title>Cerrar</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</Button>

							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
								className="flex justify-center mb-4"
							>
								<div className="w-16 h-16 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center">
									<CheckCircleIcon className="h-8 w-8 text-green-600" />
								</div>
							</motion.div>
							<CardTitle className="text-2xl text-center">
								🎉 ¡Configuración Completada!
							</CardTitle>
							<p className="text-muted-foreground">
								Has armado una PC increíble. Aquí tienes el resumen de tu
								configuración:
							</p>
						</CardHeader>

						<CardContent className="space-y-6">
							{/* Resumen de precios */}
							<div className="grid grid-cols-2 gap-4">
								<div className="text-center p-4 bg-muted/30 rounded-lg">
									<div className="text-sm text-muted-foreground mb-1">
										Componentes
									</div>
									<div className="text-2xl font-bold text-primary">
										{summary.totalComponents}
									</div>
								</div>
								<div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
									<div className="text-sm text-muted-foreground mb-1">
										Ahorros
									</div>
									<div className="text-2xl font-bold text-green-600">
										S/ {formatPrice(summary.totalSavings)}
									</div>
								</div>
							</div>

							{/* Precio final */}
							<div className="text-center p-6 bg-primary/10 rounded-lg">
								<div className="text-sm text-muted-foreground mb-1">
									Precio Final (Web)
								</div>
								<div className="text-3xl font-bold text-primary">
									S/ {formatPrice(summary.totalWebPrice)}
								</div>
								{summary.totalSavings > 0 && (
									<div className="text-sm text-green-600 mt-1">
										Ahorras {summary.estimatedSavingsPercent}% vs precio normal
									</div>
								)}
							</div>

							{/* Acciones */}
							<div className="space-y-3">
								<Button
									className="w-full"
									size="lg"
									onClick={onRequestQuotation}
								>
									<ShoppingCartIcon className="h-5 w-5 mr-2" />
									Solicitar Proforma Oficial
								</Button>

								<div className="grid grid-cols-2 gap-2">
									<Button variant="outline" onClick={onDownload}>
										<DownloadIcon className="h-4 w-4 mr-2" />
										Descargar PDF
									</Button>
									<Button variant="outline" onClick={onShare}>
										<ShareIcon className="h-4 w-4 mr-2" />
										Compartir
									</Button>
								</div>
							</div>

							{/* Lista de componentes */}
							<div className="space-y-2">
								<h4 className="font-medium text-sm">Tu configuración:</h4>
								<div className="max-h-40 overflow-y-auto space-y-1">
									{summary.components.map((component) => (
										<div
											key={component.componentType}
											className="flex items-center justify-between text-xs p-2 bg-muted/20 rounded"
										>
											<span className="truncate flex-1">
												{component.product.name}
											</span>
											<span className="font-medium ml-2">
												S/ {formatPrice(component.totalWebPrice)}
											</span>
										</div>
									))}
								</div>
							</div>

							{/* Mensaje motivacional */}
							<div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
								<div className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">
									✨ ¡Excelente elección!
								</div>
								<div className="text-xs text-blue-600 dark:text-blue-500">
									Has configurado una PC potente con excelente relación
									precio-rendimiento
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</motion.div>
		</>
	)
}
