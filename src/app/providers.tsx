'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
	// Crear una instancia de QueryClient para cada usuario
	// para evitar compartir datos entre diferentes usuarios
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// Configuración global para queries
						staleTime: 60 * 1000, // 1 minuto
						refetchOnWindowFocus: false,
					},
					mutations: {
						// Configuración global para mutaciones
						retry: 1,
					},
				},
			}),
	)

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{/* DevTools solo en desarrollo */}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
