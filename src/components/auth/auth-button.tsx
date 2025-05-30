'use client'

import { useSidebar } from '@/components/ui/sidebar'
import { SignInButton, SignOutButton, useAuth } from '@clerk/nextjs'
import { LogIn, LogOut } from 'lucide-react'
import { Button } from '../ui/button'

export default function AuthButton() {
	const { sessionId } = useAuth()
	const { setOpenMobile } = useSidebar()

	if (!sessionId) {
		return (
			<SignInButton mode="modal">
				<Button
					className="w-full flex items-center gap-2 hover:cursor-pointer"
					onClick={() => setOpenMobile(false)}
				>
					<LogIn className="text-muted-foreground" size={20} />
					<span className="whitespace-nowrap">Iniciar sesión</span>
				</Button>
			</SignInButton>
		)
	}

	return (
		<SignOutButton signOutOptions={{ sessionId }}>
			<Button
				className="w-full flex items-center gap-2 hover:cursor-pointer"
				onClick={() => setOpenMobile(false)}
			>
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
