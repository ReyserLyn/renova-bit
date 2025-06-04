export type ComponentType =
	| 'cpu'
	| 'motherboard'
	| 'ram1'
	| 'ram2'
	| 'storage1'
	| 'storage2'
	| 'case'
	| 'psu'
	| 'cooling'
	| 'mouse'
	| 'keyboard'
	| 'audio'
	| 'monitor'

export type QuotationStatus =
	| 'draft'
	| 'completed'
	| 'requested'
	| 'confirmed'
	| 'cancelled'

export interface ComponentStep {
	id: ComponentType
	name: string
	description: string
	order: number
	isOptional: boolean
	icon: string
	categoryFilters?: string[] // Categorías de productos permitidas para este componente
	compatibilityRules?: CompatibilityRule[]
}

export interface CompatibilityRule {
	dependsOn: ComponentType
	rule: (
		selectedComponent: SelectedComponent,
		dependentComponent: SelectedComponent,
	) => boolean
	errorMessage: string
}

export interface SelectedComponent {
	componentType: ComponentType
	product: {
		id: string
		name: string
		slug: string
		image_url: string
		price: string
		price_web: string
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
		short_description: string
		stock: number
	}
	quantity: number
	unitPrice: number
	unitWebPrice: number
	totalPrice: number
	totalWebPrice: number
	isOptional: boolean
	isSkipped: boolean
	addedAt: Date
}

export interface QuotationSummary {
	totalComponents: number
	totalPrice: number
	totalWebPrice: number
	totalSavings: number
	estimatedSavingsPercent: number
	components: SelectedComponent[]
	isComplete: boolean
	incompatibilityIssues: CompatibilityIssue[]
}

export interface CompatibilityIssue {
	severity: 'warning' | 'error'
	componentTypes: ComponentType[]
	message: string
	suggestion?: string
}

export interface Quotation {
	id: string
	userId: string
	userEmail?: string
	userName?: string
	userPhone?: string
	title: string
	notes?: string
	status: QuotationStatus
	totalPrice: number
	totalWebPrice: number
	savings: number
	configurationData?: QuotationSummary
	isCompatible: boolean
	compatibilityNotes?: string
	expiresAt?: Date
	requestedAt?: Date
	confirmedAt?: Date
	createdAt: Date
	updatedAt: Date
	items: QuotationItem[]
}

export interface QuotationItem {
	id: string
	quotationId: string
	productId?: string
	componentType: ComponentType
	componentOrder: number
	quantity: number
	unitPrice: number
	unitWebPrice: number
	totalPrice: number
	totalWebPrice: number
	isOptional: boolean
	isSkipped: boolean
	productName?: string
	productImageUrl?: string
	productBrand?: string
	productCategory?: string
	createdAt: Date
	updatedAt: Date
}

export interface QuotationBuilderState {
	// Estado actual
	currentStep: number
	components: Record<ComponentType, SelectedComponent | null>
	quotationId?: string

	// Configuración
	steps: ComponentStep[]
	isLoading: boolean
	error?: string

	// Resumen calculado
	summary: QuotationSummary

	// Metadatos de usuario
	userInfo: {
		name?: string
		email?: string
		phone?: string
	}

	// Preferencias
	showOnlyCompatible: boolean
	autoAdvanceStep: boolean
}

export interface QuotationBuilderActions {
	// Navegación
	goToStep: (step: number) => void
	nextStep: () => void
	previousStep: () => void
	goToComponent: (componentType: ComponentType) => void

	// Selección de componentes
	selectComponent: (componentType: ComponentType, product: any) => void
	removeComponent: (componentType: ComponentType) => void
	skipComponent: (componentType: ComponentType, skip: boolean) => void
	updateQuantity: (componentType: ComponentType, quantity: number) => void

	// Configuración
	setUserInfo: (info: Partial<QuotationBuilderState['userInfo']>) => void
	setShowOnlyCompatible: (show: boolean) => void
	setAutoAdvanceStep: (auto: boolean) => void

	// Persistencia
	saveQuotation: () => Promise<void>
	loadQuotation: (quotationId: string) => Promise<void>
	resetBuilder: () => void

	// Finalización
	requestQuotation: (notes?: string) => Promise<void>
	downloadQuotation: () => void
	shareQuotation: () => void

	// Utilidades
	autoSkipEmptyComponents: () => void
	initializeBuilder: () => void
}

export interface ProductForSelection {
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
	isCompatible?: boolean
	compatibilityNotes?: string[]
}

// Utility types para formularios
export interface QuotationRequestForm {
	title: string
	notes?: string
	userInfo: {
		name: string
		email: string
		phone?: string
	}
	urgency: 'normal' | 'urgent'
	deliveryPreference: 'pickup' | 'delivery'
	paymentPreference: 'cash' | 'transfer' | 'financing'
}

export interface QuotationFilters {
	priceRange: [number, number]
	brands: string[]
	onlyInStock: boolean
	onlyCompatible: boolean
	sortBy: 'price' | 'price_web' | 'name' | 'brand' | 'rating'
	sortOrder: 'asc' | 'desc'
}
