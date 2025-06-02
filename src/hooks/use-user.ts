'use client'

import { useUser as useClerkUser } from '@clerk/nextjs'

/**
 * Hook personalizado para obtener la información del usuario actual
 * SIN sincronización automática del carrito
 */
export function useUser() {
	const { user: clerkUser, isLoaded, isSignedIn } = useClerkUser()

	// Transformar el usuario de Clerk a un formato más simple
	const user = clerkUser
		? {
				id: clerkUser.id,
				email: clerkUser.emailAddresses[0]?.emailAddress || '',
				firstName: clerkUser.firstName || '',
				lastName: clerkUser.lastName || '',
				fullName: clerkUser.fullName || '',
				imageUrl: clerkUser.imageUrl,
			}
		: null

	return {
		user,
		isLoaded,
		isSignedIn,
		// Helpers útiles
		isGuest: !isSignedIn,
		userId: user?.id || null,
	}
}
