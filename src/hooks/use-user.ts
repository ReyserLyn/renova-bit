'use client'

import { useUser as useClerkUser } from '@clerk/nextjs'

export function useUser() {
	const { user: clerkUser, isLoaded, isSignedIn } = useClerkUser()

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
