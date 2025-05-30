'use client'

import HeaderMiddle from '@/components/layout/header-middle'
import HeaderTop from '@/components/layout/header-top'
import InputSearch from '@/components/layout/input-search'
import Navbar from '@/components/layout/navbar'
import { AppSidebar } from '@/components/layout/sidebar/app-sidebar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import Link from 'next/link'

export default function Home() {
	return (
		<SidebarProvider open={false}>
			<AppSidebar />
			<SidebarInset>
				<HeaderTop />

				<HeaderMiddle>
					<SidebarTrigger className="md:hidden hover:cursor-pointer" />
				</HeaderMiddle>

				<div className="container flex items-center gap-3">
					<InputSearch className="block md:hidden max-w-full py-1" />
					<Button asChild>
						<Link href="/ofertas">Ofertas!</Link>
					</Button>
				</div>

				<Separator className="my-3" />
				<Navbar className="hidden md:block" />
				<Separator className="my-2 hidden md:block" />

				<main className="container h-full">
					<h1 className="hidden">RenovaBit</h1>

					<section className="flex justify-end items-center p-4 gap-4 h-16">
						<div className="flex items-center gap-4">
							<Link href="/">Home</Link>
							<Link href="/about">About</Link>
							<Link href="/contact">Contact</Link>
						</div>
					</section>
				</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
