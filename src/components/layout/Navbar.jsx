import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cva } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import CreateNoteDialog from '@/components/notes/CreateNoteDialog'
import AvatarDropdownMenu from '@/components/layout/AvatarDropdownMenu'

const navigationMenuItems = [
	{ title: 'Home', to: '/home' },
	{ title: 'Notes Manager', to: '/manager' }
]

function Navbar() {
	return (
		<nav className="flex flex-row items-center justify-between h-16 px-5 bg-slate-950 border-b-4 border-black">
			{/* Logo & Title */}
			<Link className="flex-none focus:outline-hidden" to="/home" aria-label="Getting Better">
				<span className="inline-flex items-center gap-x-2 text-2xl font-medium text-foreground transition-all duration-200 hover:scale-110">
					<img className="w-10 h-auto" src="/brand-logo.png" alt="Logo" />
					Getting Better
				</span>
			</Link>
			{/* Items */}
			<div className="flex flex-row justify-end">
				<CreateNoteDialog className={navigationMenuTriggerStyle()} />
				<NavigationMenu>
					<NavigationMenuList className="pr-4">
						{navigationMenuItems.map((item) => (
							<NavigationMenuItem key={item.title} className="text-foreground">
								<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
									<Link to={item.to}>{item.title}</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
					{/* Avatar Dropdown Menu*/}
					<AvatarDropdownMenu />
				</NavigationMenu>
			</div>
		</nav>
	)
}

const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => (
	<NavigationMenuPrimitive.Root
		ref={ref}
		className={cn('relative z-10 flex flex-row max-w-max flex-1 items-center justify-center', className)}
		{...props}
	>
		{children}
		<NavigationMenuViewport />
	</NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.List
		ref={ref}
		className={cn('group flex flex-1 list-none items-center justify-center space-x-1', className)}
		{...props}
	/>
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
	'group inline-flex h-10 w-max items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent'
)

const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
	<NavigationMenuPrimitive.Trigger
		ref={ref}
		className={cn(navigationMenuTriggerStyle(), 'group', className)}
		{...props}
	>
		{children}{' '}
		<ChevronDown
			className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
			aria-hidden="true"
		/>
	</NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.Content
		ref={ref}
		className={cn(
			'left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ',
			className
		)}
		{...props}
	/>
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => (
	<div className={cn('absolute left-0 top-full flex justify-center')}>
		<NavigationMenuPrimitive.Viewport
			className={cn(
				'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
				className
			)}
			ref={ref}
			{...props}
		/>
	</div>
))
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.Indicator
		ref={ref}
		className={cn(
			'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
			className
		)}
		{...props}
	>
		<div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
	</NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName

export default Navbar
