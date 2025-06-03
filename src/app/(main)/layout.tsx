'use client'

import Footer from '@/components/layout/footer'
import HeaderMiddle from '@/components/layout/header-middle'
import HeaderTop from '@/components/layout/header-top'
import InputSearch from '@/components/layout/input-search'
import Navbar from '@/components/layout/navbar'
import { AppSidebar } from '@/components/layout/sidebar/app-sidebar'
import { Button } from '@/components/ui/button'
import { PageLoader } from '@/components/ui/page-loader'
import { Separator } from '@/components/ui/separator'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import { useCartSync } from '@/hooks/use-cart-sync'
import { useCategories } from '@/hooks/use-categories'
import { LoadingProvider, useLoading } from '@/hooks/use-global-loading'
import Link from 'next/link'
import { Toaster } from 'react-hot-toast'

function GlobalLoader() {
	const { isLoading, loadingText } = useLoading()

	if (!isLoading) return null

	return <PageLoader text={loadingText} fullScreen />
}

export function MainLayoutContent({ children }: { children: React.ReactNode }) {
	useCartSync()
	const { categories } = useCategories()

	return (
		<LoadingProvider>
			<SidebarProvider open={false}>
				<AppSidebar />
				<SidebarInset className="min-h-screen flex flex-col">
					<HeaderTop />

					<HeaderMiddle categories={categories}>
						<SidebarTrigger className="md:hidden hover:cursor-pointer" />
					</HeaderMiddle>

					<div className="container flex md:hidden items-center gap-3 ">
						<InputSearch
							className="max-w-full py-1"
							showCategories={false}
							categories={categories}
						/>
						<Button asChild>
							<Link href="/ofertas">Ofertas!</Link>
						</Button>
					</div>

					<Separator className="container my-2" />
					<Navbar className="hidden md:block" />
					<Separator className="container my-2 hidden md:block" />

					<main className="flex-1">{children}</main>

					<Footer />
				</SidebarInset>
				<Toaster position="bottom-right" />
				<GlobalLoader />
			</SidebarProvider>
		</LoadingProvider>
	)
}

export default function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <MainLayoutContent>{children}</MainLayoutContent>
}
