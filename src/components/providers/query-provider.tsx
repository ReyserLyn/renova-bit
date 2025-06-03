'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 5 * 60 * 1000,
				gcTime: 10 * 60 * 1000,
				refetchOnWindowFocus: false,
				refetchOnReconnect: 'always',
				retry: (failureCount, error) => {
					if (failureCount < 3 && error instanceof Error) {
						return true
					}
					return false
				},
				networkMode: 'online',
			},
			mutations: {
				retry: false,
				networkMode: 'online',
			},
		},
	})
}

interface QueryProviderProps {
	children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
	const [queryClient] = useState(createQueryClient)

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{process.env.NODE_ENV === 'development' && (
				<ReactQueryDevtools
					initialIsOpen={false}
					buttonPosition="bottom-right"
				/>
			)}
		</QueryClientProvider>
	)
}
