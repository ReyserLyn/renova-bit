'use client'

import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs'
import { LogIn, User } from 'lucide-react'
import Link from 'next/link'
import { CartButton } from '../cart/cart-button'
import { Button } from '../ui/button'
import InputSearch from './input-search'

export default function HeaderMiddle({
	children,
	categories = [],
}: {
	children: React.ReactNode
	categories?: Array<{ id: string; name: string; slug: string }>
}) {
	return (
		<nav className="py-5">
			<div className="container">
				<div className="flex items-center justify-between gap-4">
					{children}

					<Link href="/">
						<h1 className="text-2xl font-bold">RenovaBit</h1>
					</Link>

					<InputSearch
						className="hidden md:block max-w-[60%]"
						showCategories={true}
						categories={categories}
					/>

					<div className="flex items-center gap-4">
						<div className="flex items-center gap-4">
							<SignedOut>
								<div className="flex-shrink-0 border-r border-black/50 pr-4 hover:cursor-pointer hidden lg:flex">
									<SignInButton mode="modal">
										<span className="whitespace-nowrap flex items-center gap-2">
											<LogIn size={20} className="flex-shrink-0" />
											Iniciar sesión
										</span>
									</SignInButton>
								</div>

								<div className="flex-shrink-0 border-r border-black/50 pr-4 hover:cursor-pointer hidden lg:flex">
									<SignUpButton mode="modal">
										<span className="whitespace-nowrap flex items-center gap-2">
											<User size={20} className="flex-shrink-0" />
											Registrarse
										</span>
									</SignUpButton>
								</div>

								<div className="flex lg:hidden border-r border-black/50 pr-4 hover:cursor-pointer">
									<SignUpButton mode="modal">
										<span className="text-sm font-medium whitespace-nowrap flex flex-col items-center">
											<User size={20} className="flex-shrink-0 " />
											Acceso
										</span>
									</SignUpButton>
								</div>
							</SignedOut>

							<SignedIn>
								<Button asChild className="flex-shrink-0">
									<UserButton
										appearance={{
											elements: {
												userButtonAvatarBox: {
													width: '2.5rem',
													height: '2.5rem',
												},
											},
										}}
									/>
								</Button>
							</SignedIn>
						</div>

						<div className="flex-shrink-0">
							<CartButton />
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}
