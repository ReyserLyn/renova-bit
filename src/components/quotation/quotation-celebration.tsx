'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
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

			// Prevenir scroll del body
			document.body.style.overflow = 'hidden'

			const updateDimensions = () => {
				setDimensions({
					width: window.innerWidth,
					height: window.innerHeight,
				})
			}

			// Establecer dimensiones iniciales
			updateDimensions()

			// Listener para cambios de tamaño de ventana
			window.addEventListener('resize', updateDimensions)

			// Detener confetti después de 5 segundos (más tiempo para disfrutar)
			const timer = setTimeout(() => {
				setShowConfetti(false)
			}, 5000)

			return () => {
				clearTimeout(timer)
				window.removeEventListener('resize', updateDimensions)
				// Restaurar scroll del body
				document.body.style.overflow = 'unset'
			}
		}
	}, [show])

	if (!show) return null

	return (
		<>
			{/* Confetti - Fuera del modal para evitar cortes */}
			{showConfetti && (
				<div className="fixed inset-0 z-40 pointer-events-none">
					<Confetti
						width={dimensions.width}
						height={dimensions.height}
						recycle={false}
						numberOfPieces={200}
						gravity={0.15}
						friction={0.99}
						wind={0.02}
						initialVelocityX={5}
						initialVelocityY={-20}
						colors={[
							'#FFD700', // Dorado
							'#FF6B6B', // Rojo coral
							'#4ECDC4', // Verde agua
							'#45B7D1', // Azul cielo
							'#96CEB4', // Verde menta
							'#FFEAA7', // Amarillo suave
							'#DDA0DD', // Violeta
							'#98D8C8', // Verde claro
						]}
						tweenDuration={3000}
					/>
				</div>
			)}

			{/* Modal de celebración */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50"
				onClick={onClose}
			>
				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.8, opacity: 0 }}
					transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
					className="w-full max-w-lg"
					onClick={(e) => e.stopPropagation()}
					style={{ maxHeight: '80vh' }}
				>
					<Card className="border-2 bg-card shadow-2xl">
						<CardHeader className="text-center pb-3 sm:pb-4 relative">
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
								className="flex justify-center mb-3 sm:mb-4"
							>
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center">
									<CheckCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
								</div>
							</motion.div>
							<CardTitle className="text-lg sm:text-2xl text-center">
								🎉 ¡Configuración Completada!
							</CardTitle>
							<p className="text-muted-foreground text-sm sm:text-base">
								Has armado una PC increíble. Aquí tienes el resumen de tu
								configuración:
							</p>
						</CardHeader>

						<div
							className="px-4 sm:px-6 overflow-y-auto"
							style={{ maxHeight: 'calc(80vh - 200px)' }}
						>
							<div className="space-y-4 sm:space-y-6 py-2">
								{/* Resumen de precios */}
								<div className="grid grid-cols-2 gap-3 sm:gap-4">
									<div className="text-center p-3 sm:p-4 bg-muted/30 rounded-lg">
										<div className="text-xs sm:text-sm text-muted-foreground mb-1">
											Componentes
										</div>
										<div className="text-xl sm:text-2xl font-bold text-primary">
											{summary.totalComponents}
										</div>
									</div>
									<div className="text-center p-3 sm:p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
										<div className="text-xs sm:text-sm text-muted-foreground mb-1">
											Ahorros
										</div>
										<div className="text-xl sm:text-2xl font-bold text-green-600">
											S/ {formatPrice(summary.totalSavings)}
										</div>
									</div>
								</div>

								{/* Precio final */}
								<div className="text-center p-4 sm:p-6 bg-primary/10 rounded-lg">
									<div className="text-xs sm:text-sm text-muted-foreground mb-1">
										Precio Final (Web)
									</div>
									<div className="text-2xl sm:text-3xl font-bold text-primary">
										S/ {formatPrice(summary.totalWebPrice)}
									</div>
									{summary.totalSavings > 0 && (
										<div className="text-xs sm:text-sm text-green-600 mt-1">
											Ahorras {summary.estimatedSavingsPercent}% vs precio
											normal
										</div>
									)}
								</div>

								{/* Acciones */}
								<div className="space-y-2 sm:space-y-3">
									<Button
										className="w-full"
										size="lg"
										onClick={onRequestQuotation}
									>
										<ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
										Solicitar Proforma Oficial
									</Button>

									<div className="grid grid-cols-2 gap-2">
										<Button variant="outline" size="sm" onClick={onDownload}>
											<DownloadIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
											<span className="text-xs sm:text-sm">Descargar PDF</span>
										</Button>
										<Button variant="outline" size="sm" onClick={onShare}>
											<ShareIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
											<span className="text-xs sm:text-sm">Compartir</span>
										</Button>
									</div>
								</div>

								{/* Lista de componentes */}
								<div className="space-y-2">
									<h4 className="font-medium text-xs sm:text-sm">
										Tu configuración:
									</h4>
									<div className="space-y-1">
										{summary.components.map((component) => (
											<div
												key={component.componentType}
												className="flex items-center justify-between text-xs p-2 bg-muted/20 rounded"
											>
												<span className="truncate flex-1 text-xs">
													{component.product.name}
												</span>
												<span className="font-medium ml-2 text-xs">
													S/ {formatPrice(component.totalWebPrice)}
												</span>
											</div>
										))}
									</div>
								</div>

								{/* Mensaje motivacional */}
								<div className="text-center p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
									<div className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">
										✨ ¡Excelente elección!
									</div>
									<div className="text-xs text-blue-600 dark:text-blue-500">
										Has configurado una PC potente con excelente relación
										precio-rendimiento
									</div>
								</div>
							</div>
						</div>
					</Card>
				</motion.div>
			</motion.div>
		</>
	)
}
