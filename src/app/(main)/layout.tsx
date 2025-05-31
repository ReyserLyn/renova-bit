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

export default function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SidebarProvider open={false}>
			<AppSidebar />
			<SidebarInset>
				<HeaderTop />

				<HeaderMiddle>
					<SidebarTrigger className="md:hidden hover:cursor-pointer" />
				</HeaderMiddle>

				<div className="container flex md:hidden items-center gap-3 ">
					<InputSearch className=" max-w-full py-1" />
					<Button asChild>
						<Link href="/ofertas">Ofertas!</Link>
					</Button>
				</div>

				<Separator className="container my-2" />
				<Navbar className="hidden md:block" />
				<Separator className="container my-2 hidden md:block" />

				{children}
			</SidebarInset>
		</SidebarProvider>
	)
}
