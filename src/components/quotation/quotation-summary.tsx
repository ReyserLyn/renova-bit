'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { getStepById } from '@/lib/quotation/steps-config'
import { cn, formatPrice } from '@/lib/utils'
import type { QuotationSummary, SelectedComponent } from '@/types/quotation'
import { AnimatePresence, motion } from 'framer-motion'
import {
	AlertTriangleIcon,
	CheckCircleIcon,
	ExternalLinkIcon,
	MinusIcon,
	PlusIcon,
	ShoppingCartIcon,
	TrashIcon,
	XCircleIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface QuotationSummaryProps {
	summary: QuotationSummary
	components: Record<string, SelectedComponent | null>
	onRemoveComponent: (componentType: string) => void
	onUpdateQuantity: (componentType: string, quantity: number) => void
	onRequestQuotation: () => void
	onResetBuilder: () => void
	onOpenCelebration?: () => void
	className?: string
}

// biome-ignore lint/suspicious/noRedeclare: <explanation>
export function QuotationSummary({
	summary,
	components,
	onRemoveComponent,
	onUpdateQuantity,
	onRequestQuotation,
	onResetBuilder,
	onOpenCelebration,
	className,
}: QuotationSummaryProps) {
	const selectedComponents = summary.components.filter(
		(comp) => !comp.isSkipped,
	)
	const skippedComponents = Object.values(components).filter(
		(comp) => comp?.isSkipped,
	)

	return (
		<Card className={cn('w-full', className)}>
			<CardHeader className="pb-4">
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2">
						<ShoppingCartIcon className="h-5 w-5" />
						Resumen de Configuración
					</CardTitle>
					<Badge variant={summary.isComplete ? 'default' : 'secondary'}>
						{summary.isComplete ? 'Completa' : 'En progreso'}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Métricas principales */}
				<div className="space-y-3">
					<div className="text-center p-4 bg-muted/30 rounded-lg">
						<div className="text-2xl font-bold text-primary">
							{summary.totalComponents}
						</div>
						<div className="text-sm text-muted-foreground">Componentes</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="text-center p-3 bg-muted/30 rounded-lg">
							<div className="text-base font-bold text-destructive line-through">
								S/ {formatPrice(summary.totalPrice)}
							</div>
							<div className="text-xs text-muted-foreground">Precio Normal</div>
						</div>

						<div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
							<div className="text-base font-bold text-green-600">
								-S/ {formatPrice(summary.totalSavings)}
							</div>
							<div className="text-xs text-muted-foreground">
								Ahorras ({summary.estimatedSavingsPercent}%)
							</div>
						</div>
					</div>

					<div className="text-center p-4 bg-primary/10 rounded-lg">
						<div className="text-2xl font-bold text-primary">
							S/ {formatPrice(summary.totalWebPrice)}
						</div>
						<div className="text-sm text-muted-foreground font-medium">
							Precio Web
						</div>
					</div>
				</div>

				{/* Lista de componentes seleccionados */}
				<div className="space-y-3">
					<h4 className="font-medium text-sm flex items-center gap-2">
						<CheckCircleIcon className="h-4 w-4 text-green-500" />
						Componentes Seleccionados ({selectedComponents.length})
					</h4>

					<AnimatePresence mode="popLayout">
						{selectedComponents.map((component) => {
							const step = getStepById(component.componentType)

							return (
								<motion.div
									key={component.componentType}
									layout
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
									className="p-3 bg-card border rounded-lg space-y-3"
								>
									{/* Header con imagen y nombre */}
									<div className="flex items-start gap-3">
										{/* Imagen del producto */}
										<div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
											{component.product.image_url ? (
												<Image
													src={component.product.image_url}
													alt={component.product.name}
													fill
													className="object-cover"
													sizes="48px"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center text-lg">
													{step?.icon || '📦'}
												</div>
											)}
										</div>

										{/* Información básica */}
										<div className="flex-1 min-w-0">
											<div className="flex items-start gap-2">
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<h5 className="font-medium text-sm leading-tight truncate cursor-help">
																{component.product.name}
															</h5>
														</TooltipTrigger>
														<TooltipContent>
															<p className="max-w-xs">
																{component.product.name}
															</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
												<Link
													href={`/producto/${component.product.slug}`}
													className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0 cursor-pointer"
												>
													<ExternalLinkIcon className="h-3 w-3" />
												</Link>
											</div>
											<div className="flex flex-wrap items-center gap-1 mt-1">
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<span className="text-xs text-muted-foreground cursor-help">
																{step?.name}
															</span>
														</TooltipTrigger>
														<TooltipContent>
															<p>{step?.name}</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
												<Badge
													variant="outline"
													className="text-xs py-0 px-1 cursor-pointer"
												>
													{component.product.brand.name}
												</Badge>
											</div>
										</div>
									</div>

									{/* Controles y precio abajo */}
									<div className="flex items-center justify-between pt-2 border-t border-border/50">
										{/* Controles de cantidad */}
										<div className="flex items-center gap-2">
											<Button
												size="icon"
												variant="outline"
												className="h-7 w-7 cursor-pointer"
												onClick={() =>
													onUpdateQuantity(
														component.componentType,
														Math.max(1, component.quantity - 1),
													)
												}
												disabled={component.quantity <= 1}
											>
												<MinusIcon className="h-3 w-3" />
											</Button>
											<span className="text-sm font-medium w-8 text-center">
												{component.quantity}
											</span>
											<Button
												size="icon"
												variant="outline"
												className="h-7 w-7 cursor-pointer"
												onClick={() =>
													onUpdateQuantity(
														component.componentType,
														component.quantity + 1,
													)
												}
											>
												<PlusIcon className="h-3 w-3" />
											</Button>
										</div>

										{/* Precio */}
										<div className="text-right flex-1 ml-4">
											<div className="text-sm font-bold text-primary">
												S/ {formatPrice(component.totalWebPrice)}
											</div>
											{component.totalPrice !== component.totalWebPrice && (
												<div className="text-xs text-destructive line-through">
													S/ {formatPrice(component.totalPrice)}
												</div>
											)}
										</div>

										{/* Botón remover */}
										<Button
											size="icon"
											variant="ghost"
											className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0 cursor-pointer ml-2"
											onClick={() => onRemoveComponent(component.componentType)}
										>
											<TrashIcon className="h-3 w-3" />
										</Button>
									</div>
								</motion.div>
							)
						})}
					</AnimatePresence>

					{selectedComponents.length === 0 && (
						<div className="text-center py-8 text-muted-foreground">
							<ShoppingCartIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
							<p>No hay componentes seleccionados</p>
							<p className="text-xs">Agrega componentes para ver el resumen</p>
						</div>
					)}
				</div>

				{/* Componentes omitidos */}
				{skippedComponents.length > 0 && (
					<div className="space-y-3">
						<h4 className="font-medium text-sm flex items-center gap-2">
							<XCircleIcon className="h-4 w-4 text-muted-foreground" />
							Componentes Omitidos ({skippedComponents.length})
						</h4>

						<div className="space-y-2">
							{skippedComponents.map((component) => {
								if (!component) return null
								const step = getStepById(component.componentType)

								return (
									<div
										key={component.componentType}
										className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg opacity-60"
									>
										<span className="text-lg">{step?.icon || '📦'}</span>
										<span className="text-sm text-muted-foreground line-through">
											{step?.name}
										</span>
										<Badge variant="outline" className="ml-auto">
											Omitido
										</Badge>
									</div>
								)
							})}
						</div>
					</div>
				)}

				{/* Alertas de compatibilidad */}
				{summary.incompatibilityIssues.length > 0 && (
					<div className="space-y-3">
						<h4 className="font-medium text-sm flex items-center gap-2 text-orange-600">
							<AlertTriangleIcon className="h-4 w-4" />
							Alertas de Compatibilidad
						</h4>

						<div className="space-y-2">
							{summary.incompatibilityIssues.map((issue, index) => (
								<div
									key={index}
									className={cn(
										'p-3 rounded-lg text-sm',
										issue.severity === 'error' &&
											'bg-destructive/10 text-destructive',
										issue.severity === 'warning' &&
											'bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400',
									)}
								>
									<div className="font-medium mb-1">{issue.message}</div>
									{issue.suggestion && (
										<div className="text-xs opacity-80">{issue.suggestion}</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				<Separator />

				{/* Acciones principales */}
				<div className="space-y-3">
					<Button
						className="w-full cursor-pointer"
						size="lg"
						onClick={onRequestQuotation}
						disabled={summary.totalComponents === 0}
					>
						{summary.totalComponents > 0 ? (
							<>
								<CheckCircleIcon className="h-5 w-5 mr-2" />
								Solicitar Proforma
							</>
						) : (
							<>
								<AlertTriangleIcon className="h-5 w-5 mr-2" />
								Agrega componentes
							</>
						)}
					</Button>

					<div className="grid grid-cols-2 gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={onResetBuilder}
							className="cursor-pointer"
						>
							Reiniciar
						</Button>
						{onOpenCelebration && summary.totalComponents > 0 ? (
							<Button
								variant="outline"
								size="sm"
								onClick={onOpenCelebration}
								className="cursor-pointer"
							>
								Ver Resumen
							</Button>
						) : (
							<Button
								variant="outline"
								size="sm"
								asChild
								className="cursor-pointer"
							>
								<Link href="/contacto">Consultar</Link>
							</Button>
						)}
					</div>
				</div>

				{/* Mensaje motivacional */}
				{summary.totalSavings > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg"
					>
						<div className="text-sm font-medium text-green-700 dark:text-green-400">
							🎉 ¡Excelente elección!
						</div>
						<div className="text-xs text-green-600 dark:text-green-500">
							Con precios web ahorrarás S/ {formatPrice(summary.totalSavings)} (
							{summary.estimatedSavingsPercent}%)
						</div>
					</motion.div>
				)}
			</CardContent>
		</Card>
	)
}
