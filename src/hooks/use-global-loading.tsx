'use client'

import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

export function useGlobalLoading() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	useEffect(() => {
		let timeoutId: NodeJS.Timeout

		// Interceptar navegación para mostrar loading
		const originalPush = router.push
		const originalReplace = router.replace

		router.push = (...args) => {
			setIsLoading(true)
			// Auto-hide después de 5 segundos por seguridad
			timeoutId = setTimeout(() => setIsLoading(false), 5000)
			return originalPush.apply(router, args)
		}

		router.replace = (...args) => {
			setIsLoading(true)
			timeoutId = setTimeout(() => setIsLoading(false), 5000)
			return originalReplace.apply(router, args)
		}

		// Limpiar loading al cambiar de página
		const handleRouteChange = () => {
			clearTimeout(timeoutId)
			setIsLoading(false)
		}

		// Escuchar eventos de navegación
		window.addEventListener('beforeunload', handleRouteChange)

		return () => {
			clearTimeout(timeoutId)
			window.removeEventListener('beforeunload', handleRouteChange)
			// Restaurar métodos originales
			router.push = originalPush
			router.replace = originalReplace
		}
	}, [router])

	const startLoading = (text?: string) => {
		setIsLoading(true)
	}

	const stopLoading = () => {
		setIsLoading(false)
	}

	return {
		isLoading,
		startLoading,
		stopLoading,
	}
}

interface LoadingContextValue {
	isLoading: boolean
	startLoading: (text?: string) => void
	stopLoading: () => void
	loadingText: string
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState(false)
	const [loadingText, setLoadingText] = useState('Cargando...')

	const startLoading = (text = 'Cargando...') => {
		setLoadingText(text)
		setIsLoading(true)
	}

	const stopLoading = () => {
		setIsLoading(false)
		setLoadingText('Cargando...')
	}

	return (
		<LoadingContext.Provider
			value={{ isLoading, startLoading, stopLoading, loadingText }}
		>
			{children}
		</LoadingContext.Provider>
	)
}

export function useLoading() {
	const context = useContext(LoadingContext)
	if (context === undefined) {
		throw new Error('useLoading debe ser usado dentro de LoadingProvider')
	}
	return context
}
