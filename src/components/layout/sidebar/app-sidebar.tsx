'use client'

import type * as React from 'react'

import AuthButton from '@/components/auth/auth-button'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar'

import { navOptions } from '@/lib/constants'
import { SidebarNavMain } from './sidebar-nav-main'
import { SidebarNavSecondary } from './sidebar-nav-secondary'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<h1 className="text-2xl font-bold px-4 py-2">RenovaBit</h1>
				<hr className="border-t border-border mx-2 -mt-px" />
			</SidebarHeader>

			<SidebarContent>
				<SidebarNavMain items={navOptions.navMain} />
				<SidebarNavSecondary items={navOptions.navSecondary} />
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<AuthButton />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
