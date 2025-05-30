'use client'

import { SignOutButton, useAuth } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'

export default function LogoutButton() {
	const { sessionId } = useAuth()

	if (!sessionId) {
		return
	}

	return (
		<SignOutButton signOutOptions={{ sessionId }}>
			<Button className="w-full flex items-center gap-2 hover:cursor-pointer">
				<LogOut
					className="text-muted-foreground"
					size={20}
					aria-hidden="true"
				/>
				<span className="whitespace-nowrap">Cerrar sesión</span>
			</Button>
		</SignOutButton>
	)
}
