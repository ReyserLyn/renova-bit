import type { ComponentStep } from '@/types/quotation'

export const QUOTATION_STEPS: ComponentStep[] = [
	{
		id: 'cpu',
		name: 'Procesador (CPU)',
		description:
			'El cerebro de tu computadora. Define el rendimiento general del sistema.',
		order: 1,
		isOptional: true,
		icon: '🔥',
		categoryFilters: ['procesadores'],
	},
	{
		id: 'motherboard',
		name: 'Placa Madre',
		description:
			'Conecta todos los componentes. Debe ser compatible con tu procesador.',
		order: 2,
		isOptional: true,
		icon: '🔧',
		categoryFilters: ['placas-madre'],
	},
	{
		id: 'ram1',
		name: '1. Memoria RAM Principal',
		description: 'Memoria principal del sistema. Mínimo 8GB recomendado.',
		order: 3,
		isOptional: true,
		icon: '💾',
		categoryFilters: ['memorias-ram'],
	},
	{
		id: 'ram2',
		name: '2. Memoria RAM Adicional',
		description: 'Memoria adicional para más rendimiento (opcional).',
		order: 4,
		isOptional: true,
		icon: '💾',
		categoryFilters: ['memorias-ram'],
	},
	{
		id: 'storage1',
		name: 'Almacenamiento Principal',
		description: 'SSD o HDD principal para el sistema operativo y programas.',
		order: 5,
		isOptional: true,
		icon: '💿',
		categoryFilters: ['almacenamiento'],
	},
	{
		id: 'storage2',
		name: 'Almacenamiento Adicional',
		description: 'Almacenamiento extra para archivos y juegos (opcional).',
		order: 6,
		isOptional: true,
		icon: '💿',
		categoryFilters: ['almacenamiento'],
	},
	{
		id: 'case',
		name: 'Case/Gabinete',
		description: 'Protege y organiza todos los componentes internos.',
		order: 7,
		isOptional: true,
		icon: '🏠',
		categoryFilters: ['cases'],
	},
	{
		id: 'psu',
		name: 'Fuente de Poder',
		description: 'Suministra energía a todos los componentes del sistema.',
		order: 8,
		isOptional: true,
		icon: '⚡',
		categoryFilters: ['fuentes-de-poder'],
	},
	{
		id: 'cooling',
		name: 'Sistema de Refrigeración',
		description: 'Mantiene temperaturas óptimas del procesador.',
		order: 9,
		isOptional: true,
		icon: '❄️',
		categoryFilters: ['refrigeración-líquida', 'refrigeración-aire'],
	},
	{
		id: 'mouse',
		name: 'Mouse',
		description: 'Dispositivo de entrada para navegación y control.',
		order: 10,
		isOptional: true,
		icon: '🖱️',
		categoryFilters: ['mouses'],
	},
	{
		id: 'keyboard',
		name: 'Teclado',
		description: 'Dispositivo de entrada principal para escritura.',
		order: 11,
		isOptional: true,
		icon: '⌨️',
		categoryFilters: ['teclados'],
	},
	{
		id: 'audio',
		name: 'Audio (Audífonos/Parlantes)',
		description: 'Sistema de audio para entretenimiento y comunicación.',
		order: 12,
		isOptional: true,
		icon: '🎧',
		categoryFilters: ['audífonos', 'parlantes'],
	},
	{
		id: 'monitor',
		name: 'Monitor',
		description: 'Pantalla para visualizar el contenido de tu computadora.',
		order: 13,
		isOptional: true,
		icon: '🖥️',
		categoryFilters: ['monitores'],
	},
]

export const getStepByOrder = (order: number): ComponentStep | undefined => {
	return QUOTATION_STEPS.find((step) => step.order === order)
}

export const getStepById = (id: string): ComponentStep | undefined => {
	return QUOTATION_STEPS.find((step) => step.id === id)
}

export const getRequiredSteps = (): ComponentStep[] => {
	return QUOTATION_STEPS.filter((step) => !step.isOptional)
}

export const getOptionalSteps = (): ComponentStep[] => {
	return QUOTATION_STEPS.filter((step) => step.isOptional)
}

export const getTotalSteps = (): number => {
	return QUOTATION_STEPS.length
}

export const getStepProgress = (currentStep: number): number => {
	return Math.round((currentStep / getTotalSteps()) * 100)
}

// Mapeo de categorías de productos a tipos de componentes
export const CATEGORY_TO_COMPONENT_MAP: Record<string, string[]> = {
	procesadores: ['cpu'],
	'placas-madre': ['motherboard'],
	'memorias-ram': ['ram1', 'ram2'],
	almacenamiento: ['storage1', 'storage2'],
	cases: ['case'],
	'fuentes-de-poder': ['psu'],
	'refrigeración-líquida': ['cooling'],
	'refrigeración-aire': ['cooling'],
	mouses: ['mouse'],
	teclados: ['keyboard'],
	audífonos: ['audio'],
	parlantes: ['audio'],
	monitores: ['monitor'],
}

// Colores para cada tipo de componente (para UI)
export const COMPONENT_COLORS: Record<string, string> = {
	cpu: 'bg-red-500',
	motherboard: 'bg-blue-500',
	ram1: 'bg-green-500',
	ram2: 'bg-green-400',
	storage1: 'bg-purple-500',
	storage2: 'bg-purple-400',
	case: 'bg-gray-500',
	psu: 'bg-yellow-500',
	cooling: 'bg-cyan-500',
	mouse: 'bg-pink-500',
	keyboard: 'bg-indigo-500',
	audio: 'bg-orange-500',
	monitor: 'bg-teal-500',
}
