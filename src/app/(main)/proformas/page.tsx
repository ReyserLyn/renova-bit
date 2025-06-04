'use client'

import { ClientOnly } from '@/components/client-only'
import { ComponentSelector } from '@/components/quotation/component-selector'
import { QuotationCelebration } from '@/components/quotation/quotation-celebration'
import { QuotationStepper } from '@/components/quotation/quotation-stepper'
import { QuotationSummary } from '@/components/quotation/quotation-summary'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useProducts } from '@/hooks/use-products'
import {
	useCurrentStep,
	useQuotationActions,
	useQuotationBuilder,
	useQuotationSummary,
	useSelectedComponents,
} from '@/hooks/use-quotation-builder'
import { getStepByOrder } from '@/lib/quotation/steps-config'
import type { ProductForSelection } from '@/types/quotation'
import { AnimatePresence, motion } from 'framer-motion'
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	CheckIcon,
	HelpCircleIcon,
	ListIcon,
	MessageCircleIcon,
	RotateCcwIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

interface Product {
	id: string
	name: string
	slug: string
	image_url: string
	short_description: string
	price: string
	price_web: string
	stock: number
	brand: {
		id: string
		name: string
		slug: string
	}
	category: {
		id: string
		name: string
		slug: string
	}
	rating?: string
}

export default function QuotationBuilderPage() {
	const [showCelebration, setShowCelebration] = useState(false)
	const [showMobileStepper, setShowMobileStepper] = useState(false)

	const currentStep = useCurrentStep()
	const summary = useQuotationSummary()
	const components = useSelectedComponents()
	const {
		goToStep,
		nextStep,
		previousStep,
		selectComponent,
		removeComponent,
		skipComponent,
		updateQuantity,
		resetBuilder,
		requestQuotation,
		autoSkipEmptyComponents,
	} = useQuotationActions()

	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		setSearchTerm('')
	}, [currentStep])

	const currentStepData = getStepByOrder(currentStep)

	const categoryFilters = currentStepData?.categoryFilters || []
	const { data: allProducts = [], isLoading: isLoadingProducts } = useProducts({
		categories: categoryFilters,
		search: searchTerm,
	})

	const productsForSelection = useMemo((): ProductForSelection[] => {
		return allProducts.map((product: Product) => ({
			id: product.id,
			name: product.name,
			slug: product.slug,
			image_url: product.image_url,
			short_description: product.short_description,
			price: product.price,
			price_web: product.price_web,
			stock: product.stock,
			brand: product.brand,
			category: product.category,
			rating: product.rating,
			isCompatible: true,
			compatibilityNotes: [],
		}))
	}, [allProducts])

	const completedSteps = useMemo(() => {
		const completed = new Set<number>()
		Object.entries(components).forEach(([_, component], index) => {
			if (component && !component.isSkipped) {
				const stepOrder = index + 1
				completed.add(stepOrder)
			}
		})
		return completed
	}, [components])

	const skippedSteps = useMemo(() => {
		const skipped = new Set<number>()
		Object.entries(components).forEach(([_, component], index) => {
			if (component?.isSkipped) {
				const stepOrder = index + 1
				skipped.add(stepOrder)
			}
		})
		return skipped
	}, [components])

	const selectedProduct = currentStepData
		? components[currentStepData.id]
		: null

	const handleSelectProduct = (product: ProductForSelection) => {
		if (!currentStepData) return

		selectComponent(currentStepData.id, product)
		toast.success(`${currentStepData.name} seleccionado: ${product.name}`)
	}

	const handleSkipStep = (skip: boolean) => {
		if (!currentStepData) return

		skipComponent(currentStepData.id, skip)
		if (skip) {
			toast.info(`${currentStepData.name} omitido`)
		} else {
			toast.info(`${currentStepData.name} ya no se omite`)
		}
	}

	const handleRemoveComponent = (componentType: string) => {
		removeComponent(componentType as any)
		toast.info('Componente removido')
	}

	const handleUpdateQuantity = (componentType: string, quantity: number) => {
		updateQuantity(componentType as any, quantity)
	}

	const handleRequestQuotation = async () => {
		if (summary.totalComponents === 0) {
			toast.error('Agrega al menos 1 componente antes de solicitar la proforma')
			return
		}

		try {
			autoSkipEmptyComponents()
			setShowCelebration(true)
			await requestQuotation()
		} catch (error) {
			toast.error('Error al solicitar la proforma')
		}
	}

	const handleResetBuilder = () => {
		resetBuilder()
		toast.info('Builder reiniciado')
	}

	const handleDownloadQuotation = () => {
		// TODO: Implementar descarga de PDF
		toast.success('Función de descarga próximamente')
		setShowCelebration(false)
	}

	const handleShareQuotation = () => {
		// TODO: Implementar compartir
		if (navigator.share) {
			navigator.share({
				title: 'Mi configuración PC - Renova Bit',
				text: `He configurado una PC increíble por S/ ${summary.totalWebPrice}`,
				url: window.location.href,
			})
		} else {
			// Fallback: copiar al portapapeles
			navigator.clipboard.writeText(window.location.href)
			toast.success('Enlace copiado al portapapeles')
		}
		setShowCelebration(false)
	}

	const handleCloseCelebration = () => {
		setShowCelebration(false)
	}

	if (!currentStepData) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">Error</h1>
					<p>No se pudo cargar el paso actual</p>
				</div>
			</div>
		)
	}

	return (
		<ClientOnly
			fallback={
				<div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
						<p className="text-muted-foreground">
							Cargando constructor de PC...
						</p>
					</div>
				</div>
			}
		>
			<TooltipProvider>
				<div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
						{/* Header */}
						<div className="mb-6 lg:mb-8">
							<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
								<div className="text-center lg:text-left">
									<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
										Construye tu PC Ideal
									</h1>
									<p className="text-muted-foreground text-sm sm:text-base">
										Configura tu computadora paso a paso y obtén el mejor precio
									</p>
								</div>
								<div className="flex items-center justify-center lg:justify-end gap-3">
									<Button variant="outline" size="sm" asChild>
										<Link href="/contacto">
											<MessageCircleIcon className="h-4 w-4 mr-2" />
											Ayuda
										</Link>
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={handleResetBuilder}
									>
										<RotateCcwIcon className="h-4 w-4 mr-2" />
										Reiniciar
									</Button>
								</div>
							</div>

							{/* Progreso general - solo en desktop */}
							<Card className="hidden lg:block">
								<CardContent className="pt-4 pb-4 sm:pt-6 sm:pb-6">
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium">
											Progreso General
										</span>
										<span className="text-sm text-muted-foreground">
											{completedSteps.size} de{' '}
											{useQuotationBuilder.getState().steps.length} pasos
										</span>
									</div>
									<Progress
										value={
											(completedSteps.size /
												useQuotationBuilder.getState().steps.length) *
											100
										}
										className="h-2"
									/>
								</CardContent>
							</Card>

							{/* Progreso general - mobile */}
							<Card className="lg:hidden">
								<CardContent className="pt-4 pb-4">
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium">
											Progreso General
										</span>
										<span className="text-sm text-muted-foreground">
											{completedSteps.size} de{' '}
											{useQuotationBuilder.getState().steps.length} pasos
										</span>
									</div>
									<Progress
										value={
											(completedSteps.size /
												useQuotationBuilder.getState().steps.length) *
											100
										}
										className="h-2"
									/>
								</CardContent>
							</Card>
						</div>

						{/* Layout responsivo */}
						<div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-12 gap-6 lg:gap-8">
							{/* Sidebar izquierdo - Stepper */}
							<div className="xl:col-span-3 order-1 xl:order-1">
								<div className="hidden md:block">
									<QuotationStepper
										steps={useQuotationBuilder.getState().steps}
										currentStep={currentStep}
										completedSteps={completedSteps}
										skippedSteps={skippedSteps}
										onStepClick={goToStep}
									/>
								</div>
							</div>

							{/* Contenido principal - Selector */}
							<div className="sm:col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-6 order-2 xl:order-2 ">
								<AnimatePresence mode="wait">
									<motion.div
										key={currentStep}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.3 }}
										className="space-y-6"
									>
										<ComponentSelector
											step={currentStepData}
											products={productsForSelection}
											selectedProduct={
												selectedProduct?.product
													? {
															...selectedProduct.product,
															isCompatible: true,
															compatibilityNotes: [],
														}
													: null
											}
											isLoading={isLoadingProducts}
											onSelectProduct={handleSelectProduct}
											onSkipStep={handleSkipStep}
											onSearchChange={setSearchTerm}
										/>

										{/* Navegación entre pasos */}
										<Card>
											<CardContent className="pt-4 pb-4 sm:pt-6 sm:pb-6">
												<div className="flex items-center justify-between">
													<Button
														variant="outline"
														onClick={previousStep}
														disabled={currentStep === 1}
														className="flex items-center gap-2"
														size="sm"
													>
														<ArrowLeftIcon className="h-4 w-4" />
														<span className="hidden sm:inline">Anterior</span>
													</Button>

													<div className="text-center">
														<div className="text-base sm:text-lg font-semibold">
															Paso {currentStep} de{' '}
															{useQuotationBuilder.getState().steps.length}
														</div>
														<div className="text-xs sm:text-sm text-muted-foreground">
															{currentStepData.name}
														</div>
													</div>

													{currentStep ===
													useQuotationBuilder.getState().steps.length ? (
														<Button
															onClick={handleRequestQuotation}
															className="flex items-center gap-2"
															size="sm"
														>
															<CheckIcon className="h-4 w-4" />
															<span className="hidden sm:inline">
																Solicitar Proforma
															</span>
															<span className="sm:hidden">Solicitar</span>
														</Button>
													) : (
														<Button
															onClick={nextStep}
															className="flex items-center gap-2"
															size="sm"
														>
															<span className="hidden sm:inline">
																Siguiente
															</span>
															<ArrowRightIcon className="h-4 w-4" />
														</Button>
													)}
												</div>
											</CardContent>
										</Card>
									</motion.div>
								</AnimatePresence>
							</div>

							{/* Sidebar derecho - Resumen */}
							<div className="xl:col-span-3 order-3 xl:order-3 lg:col-span-4 lg:order-2">
								<div className="hidden lg:block space-y-6">
									<QuotationSummary
										summary={summary}
										components={components}
										onRemoveComponent={handleRemoveComponent}
										onUpdateQuantity={handleUpdateQuantity}
										onRequestQuotation={handleRequestQuotation}
										onResetBuilder={handleResetBuilder}
									/>

									{/* Panel de ayuda */}
									<Card>
										<CardHeader className="pb-3">
											<CardTitle className="flex items-center gap-2 text-sm">
												<HelpCircleIcon className="h-4 w-4" />
												¿Necesitas ayuda?
											</CardTitle>
										</CardHeader>
										<CardContent className="space-y-3">
											<p className="text-xs text-muted-foreground">
												Nuestros expertos pueden ayudarte a elegir los mejores
												componentes para tu presupuesto.
											</p>
											<div className="space-y-2">
												<Button
													variant="outline"
													size="sm"
													className="w-full"
													asChild
												>
													<Link href="/contacto">
														<MessageCircleIcon className="h-3 w-3 mr-2" />
														Contactar ahora
													</Link>
												</Button>
												<Button
													variant="ghost"
													size="sm"
													className="w-full"
													asChild
												>
													<Link
														href="https://wa.me/51999999999"
														target="_blank"
													>
														💬 WhatsApp
													</Link>
												</Button>
											</div>
										</CardContent>
									</Card>

									{/* Tips */}
									<Card>
										<CardHeader className="pb-3">
											<CardTitle className="flex items-center gap-2 text-sm">
												💡 Tips
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="space-y-2 text-xs text-muted-foreground">
												<p>• Los precios web son siempre más baratos</p>
												<p>• Puedes omitir cualquier componente</p>
												<p>• Todos los componentes tienen garantía</p>
												<p>• Delivery gratis los fines de semana</p>
											</div>
										</CardContent>
									</Card>
								</div>
							</div>
						</div>

						{/* Resumen móvil */}
						<div className="lg:hidden mt-6">
							<QuotationSummary
								summary={summary}
								components={components}
								onRemoveComponent={handleRemoveComponent}
								onUpdateQuantity={handleUpdateQuantity}
								onRequestQuotation={handleRequestQuotation}
								onResetBuilder={handleResetBuilder}
							/>
						</div>

						{/* Panel de ayuda móvil */}
						<div className="lg:hidden mt-6">
							<Card>
								<CardHeader className="pb-3">
									<CardTitle className="flex items-center gap-2 text-sm">
										<HelpCircleIcon className="h-4 w-4" />
										¿Necesitas ayuda?
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									<p className="text-xs text-muted-foreground">
										Nuestros expertos pueden ayudarte a elegir los mejores
										componentes para tu presupuesto.
									</p>
									<div className="grid grid-cols-2 gap-2">
										<Button variant="outline" size="sm" asChild>
											<Link href="/contacto">
												<MessageCircleIcon className="h-3 w-3 mr-2" />
												Contactar
											</Link>
										</Button>
										<Button variant="ghost" size="sm" asChild>
											<Link href="https://wa.me/51999999999" target="_blank">
												💬 WhatsApp
											</Link>
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Botón flotante para stepper móvil */}
					<div className="lg:hidden fixed bottom-4 right-4 z-50">
						<Sheet open={showMobileStepper} onOpenChange={setShowMobileStepper}>
							<SheetTrigger asChild>
								<Button
									size="icon"
									className="h-12 w-12 rounded-full shadow-lg"
								>
									<ListIcon className="h-5 w-5" />
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="w-80 p-0 flex flex-col">
								<SheetHeader className="p-6 pb-4 flex-shrink-0">
									<SheetTitle className="text-left">
										Pasos de Configuración
									</SheetTitle>
								</SheetHeader>
								<div className="flex-1 overflow-y-auto px-6 pb-6">
									<div className="space-y-4">
										{/* Progreso en sidebar */}
										<Card>
											<CardContent className="pt-4 pb-4">
												<div className="flex items-center justify-between mb-2">
													<span className="text-sm font-medium">
														Progreso General
													</span>
													<span className="text-sm text-muted-foreground">
														{completedSteps.size} de{' '}
														{useQuotationBuilder.getState().steps.length} pasos
													</span>
												</div>
												<Progress
													value={
														(completedSteps.size /
															useQuotationBuilder.getState().steps.length) *
														100
													}
													className="h-2"
												/>
											</CardContent>
										</Card>

										{/* Stepper */}
										<QuotationStepper
											steps={useQuotationBuilder.getState().steps}
											currentStep={currentStep}
											completedSteps={completedSteps}
											skippedSteps={skippedSteps}
											forceDesktopLayout={true}
											onStepClick={(step) => {
												goToStep(step)
												setShowMobileStepper(false)
											}}
										/>
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>

					{/* Celebración cuando se solicita la proforma */}
					<QuotationCelebration
						summary={summary}
						onRequestQuotation={handleRequestQuotation}
						onDownload={handleDownloadQuotation}
						onShare={handleShareQuotation}
						onClose={handleCloseCelebration}
						show={showCelebration}
					/>
				</div>
			</TooltipProvider>
		</ClientOnly>
	)
}
