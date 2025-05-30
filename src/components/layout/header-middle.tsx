import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs'
import { LogIn, User } from 'lucide-react'
import Link from 'next/link'
import { FaCartShopping } from 'react-icons/fa6'
import { Button } from '../ui/button'
import InputSearch from './input-search'

export default function HeaderMiddle() {
	return (
		<nav className="py-5">
			<div className="container">
				<div className="flex items-center justify-between gap-4">
					<Link href="/">
						<h1 className="text-2xl font-bold">RenovaBit</h1>
					</Link>

					<InputSearch className="hidden md:block max-w-[60%]" />

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
								<Button
									asChild
									variant="ghost"
									size="icon"
									className="flex-shrink-0"
								>
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

						{/* Carrito */}
						<div className="flex-shrink-0">
							<Link
								href="/cart"
								className="flex flex-col items-center hover:cursor-pointer"
							>
								<div className="relative">
									<FaCartShopping size={20} className="flex-shrink-0" />
									<span className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
										0
									</span>
								</div>
								<span className="text-sm font-medium whitespace-nowrap">
									Su carrito
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}
