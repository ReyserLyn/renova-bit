'use client'

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { navOptions } from '@/lib/constants'
import { cn, textToSlug } from '@/lib/utils'
import Link from 'next/link'
import type * as React from 'react'
import { Button } from '../ui/button'

export default function Navbar({ className }: { className?: string }) {
	return (
		<div className={cn('container z-50', className)}>
			<div className="flex w-full items-center justify-between py-2">
				<NavigationMenu className="flex-1 justify-start" viewport={false}>
					<NavigationMenuList className="flex-nowrap gap-1">
						<NavigationMenuItem>
							<NavigationMenuTrigger>Productos</NavigationMenuTrigger>
							<NavigationMenuContent className="p-4">
								<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4 md:w-[600px] lg:w-[800px] ">
									{navOptions.navMain.slice(0, 4).map((component) => (
										<div className="px-2" key={component.title}>
											<h6 className="font-semibold uppercase text-sm text-muted-foreground">
												{component.title}
											</h6>
											<ul className="mt-2.5 grid gap-3">
												{component.items?.map((item) => (
													<ListItem
														key={item.title}
														title={item.title}
														href={`/categoria/${textToSlug(item.title)}`}
													/>
												))}
											</ul>
										</div>
									))}
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Marcas</NavigationMenuTrigger>
							<NavigationMenuContent className="p-4">
								<div className="pl-4">
									<h6 className="pl-2.5 font-semibold uppercase text-sm text-muted-foreground">
										Marcas
									</h6>
									<ul className="mt-2.5 grid w-[200px] gap-3 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
										{navOptions.navMain[4].items?.map((item) => (
											<ListItem
												key={item.title}
												title={item.title}
												href={`/marca/${textToSlug(item.title)}`}
											/>
										))}
									</ul>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Laptops</NavigationMenuTrigger>
							<NavigationMenuContent className="p-4">
								<div>
									<h6 className="font-semibold uppercase text-sm text-muted-foreground">
										Laptops
									</h6>
									<ul className="mt-2.5 grid w-[170px] gap-1">
										{navOptions.navMain[5].items?.map((item) => (
											<ListItem
												key={item.title}
												title={item.title}
												href={`/categoria/laptops/${item.url ? item.url : textToSlug(item.title)}`}
											/>
										))}
									</ul>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<NavigationMenu viewport={false} className="flex-1 justify-end">
					<NavigationMenuList className="flex items-center gap-5">
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Button asChild className="hover:bg-green-200">
									<Link href="/proforma">Proformas</Link>
								</Button>
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Button asChild className="hover:bg-amber-200">
									<Link href="/ofertas">Ofertas!</Link>
								</Button>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</div>
	)
}

function ListItem({
	className,
	title,
	href,
	...props
}: React.ComponentPropsWithoutRef<'a'> & { href: string }) {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					href={href}
					className={cn(
						'block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className,
					)}
					{...props}
				>
					<div className="tracking-tight leading-none flex items-center gap-2">
						{title}
					</div>
				</Link>
			</NavigationMenuLink>
		</li>
	)
}
