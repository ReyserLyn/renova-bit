'use client'

import { QUOTATION_STEPS } from '@/lib/quotation/steps-config'
import type {
	ComponentType,
	QuotationBuilderActions,
	QuotationBuilderState,
	QuotationSummary,
	SelectedComponent,
} from '@/types/quotation'
import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const useHydrated = () => {
	const [hydrated, setHydrated] = useState(false)

	useEffect(() => {
		setHydrated(true)
	}, [])

	return hydrated
}

const initialSummary: QuotationSummary = {
	totalComponents: 0,
	totalPrice: 0,
	totalWebPrice: 0,
	totalSavings: 0,
	estimatedSavingsPercent: 0,
	components: [],
	isComplete: false,
	incompatibilityIssues: [],
}

const initialState: QuotationBuilderState = {
	currentStep: 1,
	components: {
		cpu: null,
		motherboard: null,
		ram1: null,
		ram2: null,
		storage1: null,
		storage2: null,
		case: null,
		psu: null,
		cooling: null,
		mouse: null,
		keyboard: null,
		audio: null,
		monitor: null,
	},
	quotationId: undefined,
	steps: QUOTATION_STEPS,
	isLoading: false,
	error: undefined,
	summary: initialSummary,
	userInfo: {},
	showOnlyCompatible: false,
	autoAdvanceStep: true,
}

const calculateSummary = (
	components: Record<ComponentType, SelectedComponent | null>,
): QuotationSummary => {
	const selectedComponents = Object.values(components).filter(
		(comp): comp is SelectedComponent => comp !== null && !comp.isSkipped,
	)

	const totalPrice = selectedComponents.reduce(
		(sum, comp) => sum + comp.totalPrice,
		0,
	)
	const totalWebPrice = selectedComponents.reduce(
		(sum, comp) => sum + comp.totalWebPrice,
		0,
	)
	const totalSavings = totalPrice - totalWebPrice
	const estimatedSavingsPercent =
		totalPrice > 0 ? Math.round((totalSavings / totalPrice) * 100) : 0

	const isComplete = selectedComponents.length > 0

	return {
		totalComponents: selectedComponents.length,
		totalPrice,
		totalWebPrice,
		totalSavings,
		estimatedSavingsPercent,
		components: selectedComponents,
		isComplete,
		incompatibilityIssues: [], // TODO: Implementar reglas de compatibilidad
	}
}

type QuotationBuilderStore = QuotationBuilderState & QuotationBuilderActions

export const useQuotationBuilder = create<QuotationBuilderStore>()(
	persist(
		immer((set, get) => ({
			...initialState,

			// Navegación
			goToStep: (step: number) => {
				set((state) => {
					if (step >= 1 && step <= QUOTATION_STEPS.length) {
						state.currentStep = step
					}
				})
			},

			nextStep: () => {
				set((state) => {
					const currentStepConfig = QUOTATION_STEPS.find(
						(step) => step.order === state.currentStep,
					)
					if (currentStepConfig?.isOptional) {
						const componentType = currentStepConfig.id as ComponentType
						const hasComponent =
							state.components[componentType] &&
							!state.components[componentType]?.isSkipped

						if (!hasComponent) {
							// Marcar como omitido automáticamente
							state.components[componentType] = {
								componentType,
								product: {
									id: '',
									name: 'Componente omitido',
									slug: '',
									image_url: '',
									price: '0',
									price_web: '0',
									brand: { id: '', name: '', slug: '' },
									category: { id: '', name: '', slug: '' },
									short_description: '',
									stock: 0,
								},
								quantity: 0,
								unitPrice: 0,
								unitWebPrice: 0,
								totalPrice: 0,
								totalWebPrice: 0,
								isOptional: true,
								isSkipped: true,
								addedAt: new Date(),
							}
							state.summary = calculateSummary(state.components)
						}
					}

					if (state.currentStep < QUOTATION_STEPS.length) {
						state.currentStep += 1
					}
				})
			},

			previousStep: () => {
				set((state) => {
					if (state.currentStep > 1) {
						state.currentStep -= 1
					}
				})
			},

			goToComponent: (componentType: ComponentType) => {
				set((state) => {
					const step = QUOTATION_STEPS.find((s) => s.id === componentType)
					if (step) {
						state.currentStep = step.order
					}
				})
			},

			// Selección de componentes
			selectComponent: (componentType: ComponentType, product: any) => {
				set((state) => {
					const unitPrice = Number.parseFloat(product.price)
					const unitWebPrice = Number.parseFloat(product.price_web)
					const quantity = 1

					const selectedComponent: SelectedComponent = {
						componentType,
						product: {
							id: product.id,
							name: product.name,
							slug: product.slug,
							image_url: product.image_url,
							price: product.price,
							price_web: product.price_web,
							brand: product.brand,
							category: product.category,
							short_description: product.short_description,
							stock: product.stock,
						},
						quantity,
						unitPrice,
						unitWebPrice,
						totalPrice: unitPrice * quantity,
						totalWebPrice: unitWebPrice * quantity,
						isOptional:
							QUOTATION_STEPS.find((s) => s.id === componentType)?.isOptional ||
							false,
						isSkipped: false,
						addedAt: new Date(),
					}

					state.components[componentType] = selectedComponent
					state.summary = calculateSummary(state.components)

					// Auto avanzar al siguiente paso si está habilitado
					if (
						state.autoAdvanceStep &&
						state.currentStep < QUOTATION_STEPS.length
					) {
						state.currentStep += 1
					}
				})
			},

			removeComponent: (componentType: ComponentType) => {
				set((state) => {
					state.components[componentType] = null
					state.summary = calculateSummary(state.components)
				})
			},

			skipComponent: (componentType: ComponentType, skip: boolean) => {
				set((state) => {
					const component = state.components[componentType]
					if (component) {
						component.isSkipped = skip
					} else if (skip) {
						// Crear un componente "fantasma" para marcar como omitido
						const step = QUOTATION_STEPS.find((s) => s.id === componentType)
						if (step?.isOptional) {
							state.components[componentType] = {
								componentType,
								product: {
									id: '',
									name: 'Componente omitido',
									slug: '',
									image_url: '',
									price: '0',
									price_web: '0',
									brand: { id: '', name: '', slug: '' },
									category: { id: '', name: '', slug: '' },
									short_description: '',
									stock: 0,
								},
								quantity: 0,
								unitPrice: 0,
								unitWebPrice: 0,
								totalPrice: 0,
								totalWebPrice: 0,
								isOptional: true,
								isSkipped: true,
								addedAt: new Date(),
							}
						}
					}
					state.summary = calculateSummary(state.components)

					// Auto avanzar si está omitiendo
					if (
						skip &&
						state.autoAdvanceStep &&
						state.currentStep < QUOTATION_STEPS.length
					) {
						state.currentStep += 1
					}
				})
			},

			updateQuantity: (componentType: ComponentType, quantity: number) => {
				set((state) => {
					const component = state.components[componentType]
					if (component && quantity > 0) {
						component.quantity = quantity
						component.totalPrice = component.unitPrice * quantity
						component.totalWebPrice = component.unitWebPrice * quantity
						state.summary = calculateSummary(state.components)
					}
				})
			},

			// Configuración
			setUserInfo: (info) => {
				set((state) => {
					state.userInfo = { ...state.userInfo, ...info }
				})
			},

			setShowOnlyCompatible: (show: boolean) => {
				set((state) => {
					state.showOnlyCompatible = show
				})
			},

			setAutoAdvanceStep: (auto: boolean) => {
				set((state) => {
					state.autoAdvanceStep = auto
				})
			},

			// Persistencia (implementar después)
			saveQuotation: async () => {
				const state = get()
				console.log('Guardando proforma...', state.summary)
				// TODO: Implementar llamada a API
			},

			loadQuotation: async (quotationId: string) => {
				set((state) => {
					state.isLoading = true
					state.quotationId = quotationId
				})
				// TODO: Implementar carga desde API
				console.log('Cargando proforma:', quotationId)
			},

			resetBuilder: () => {
				set(() => initialState)
			},

			// Finalización (implementar después)
			requestQuotation: async (notes?: string) => {
				const state = get()
				console.log('Solicitando proforma...', {
					notes,
					summary: state.summary,
				})
				// TODO: Implementar solicitud de proforma
			},

			downloadQuotation: () => {
				const state = get()
				console.log('Descargando proforma...', state.summary)
				// TODO: Implementar descarga PDF
			},

			shareQuotation: () => {
				const state = get()
				console.log('Compartiendo proforma...', state.summary)
				// TODO: Implementar compartir
			},

			// Auto-omitir componentes vacíos
			autoSkipEmptyComponents: () => {
				set((state) => {
					for (const step of QUOTATION_STEPS) {
						const componentType = step.id as ComponentType
						const component = state.components[componentType]

						// Si es opcional y no tiene producto seleccionado (o está null), marcarlo como omitido
						if (step.isOptional && (!component || component.isSkipped)) {
							state.components[componentType] = {
								componentType,
								product: {
									id: '',
									name: 'Componente omitido',
									slug: '',
									image_url: '',
									price: '0',
									price_web: '0',
									brand: { id: '', name: '', slug: '' },
									category: { id: '', name: '', slug: '' },
									short_description: '',
									stock: 0,
								},
								quantity: 0,
								unitPrice: 0,
								unitWebPrice: 0,
								totalPrice: 0,
								totalWebPrice: 0,
								isOptional: true,
								isSkipped: true,
								addedAt: new Date(),
							}
						}
					}
					state.summary = calculateSummary(state.components)
				})
			},

			initializeBuilder: () => {
				set((state) => {
					state.summary = calculateSummary(state.components)
				})
			},
		})),
		{
			name: 'quotation-builder',
			storage: createJSONStorage(() => {
				// Solo ejecutar en el cliente
				if (typeof window === 'undefined') {
					return {
						getItem: () => null,
						setItem: () => {},
						removeItem: () => {},
					}
				}
				return localStorage
			}),
			partialize: (state) => ({
				currentStep: state.currentStep,
				components: state.components,
				summary: state.summary,
				userInfo: state.userInfo,
				showOnlyCompatible: state.showOnlyCompatible,
				autoAdvanceStep: state.autoAdvanceStep,
			}),
			onRehydrateStorage: () => {
				return (state, error) => {
					if (error) {
						console.error('Error al rehidratar el storage:', error)
					} else if (state) {
						// Recalcular el resumen después de cargar desde storage
						state.summary = calculateSummary(state.components)
					}
				}
			},
		},
	),
)

// Hooks individuales que usan hidratación para evitar problemas de SSR
export const useCurrentStep = () => {
	const hydrated = useHydrated()
	const [step, setStep] = useState(1)

	useEffect(() => {
		if (hydrated) {
			const unsubscribe = useQuotationBuilder.subscribe((state) =>
				setStep(state.currentStep),
			)
			setStep(useQuotationBuilder.getState().currentStep)
			return unsubscribe
		}
	}, [hydrated])

	return step
}

export const useQuotationSummary = () => {
	const hydrated = useHydrated()
	const [summary, setSummary] = useState<QuotationSummary>(initialSummary)

	useEffect(() => {
		if (hydrated) {
			const unsubscribe = useQuotationBuilder.subscribe((state) =>
				setSummary(state.summary),
			)
			setSummary(useQuotationBuilder.getState().summary)
			return unsubscribe
		}
	}, [hydrated])

	return summary
}

export const useSelectedComponents = () => {
	const hydrated = useHydrated()
	const [components, setComponents] = useState(initialState.components)

	useEffect(() => {
		if (hydrated) {
			const unsubscribe = useQuotationBuilder.subscribe((state) =>
				setComponents(state.components),
			)
			setComponents(useQuotationBuilder.getState().components)
			return unsubscribe
		}
	}, [hydrated])

	return components
}

export const useQuotationActions = () => {
	const hydrated = useHydrated()
	const [actions, setActions] = useState<QuotationBuilderActions | null>(null)

	useEffect(() => {
		if (hydrated) {
			const store = useQuotationBuilder.getState()
			setActions({
				goToStep: store.goToStep,
				nextStep: store.nextStep,
				previousStep: store.previousStep,
				goToComponent: store.goToComponent,
				selectComponent: store.selectComponent,
				removeComponent: store.removeComponent,
				skipComponent: store.skipComponent,
				updateQuantity: store.updateQuantity,
				setUserInfo: store.setUserInfo,
				setShowOnlyCompatible: store.setShowOnlyCompatible,
				setAutoAdvanceStep: store.setAutoAdvanceStep,
				saveQuotation: store.saveQuotation,
				loadQuotation: store.loadQuotation,
				resetBuilder: store.resetBuilder,
				requestQuotation: store.requestQuotation,
				downloadQuotation: store.downloadQuotation,
				shareQuotation: store.shareQuotation,
				autoSkipEmptyComponents: store.autoSkipEmptyComponents,
				initializeBuilder: store.initializeBuilder,
			})
		}
	}, [hydrated])

	// Funciones por defecto que no hacen nada si no está hidratado
	return (
		actions || {
			goToStep: () => {},
			nextStep: () => {},
			previousStep: () => {},
			goToComponent: () => {},
			selectComponent: () => {},
			removeComponent: () => {},
			skipComponent: () => {},
			updateQuantity: () => {},
			setUserInfo: () => {},
			setShowOnlyCompatible: () => {},
			setAutoAdvanceStep: () => {},
			saveQuotation: async () => {},
			loadQuotation: async () => {},
			resetBuilder: () => {},
			requestQuotation: async () => {},
			downloadQuotation: () => {},
			shareQuotation: () => {},
			autoSkipEmptyComponents: () => {},
			initializeBuilder: () => {},
		}
	)
}
