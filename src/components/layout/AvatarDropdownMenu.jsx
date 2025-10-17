import supabase from '@/lib/supabaseClient'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { LogOut, Settings, User } from 'lucide-react'

function AvatarDropdownMenu() {
	const handleLogout = async () => {
		const { error } = supabase.auth.signOut()
		if (error) console.log(error.message)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full">
				<div className="bg-gradient-to-b from-red-500 to-blue-500 rounded-full p-1">
					<Avatar className="ring-2 ring-background w-7 h-7">
						<AvatarImage
							src="https://wallpapers.com/images/hd/default-avatar-placeholder-672pawlg85u1erwp.jpg"
							alt="@defaultavatar"
							className="bg-stone-900"
						/>
						<AvatarFallback>User</AvatarFallback>
					</Avatar>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>User Name</DropdownMenuLabel> {/* TODO: Implement user name */}
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<User className="h-4 w-4" /> Profile
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Settings className="h-4 w-4" /> Settings
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleLogout} className="text-destructive">
					<LogOut className="h-4 w-4" /> Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default AvatarDropdownMenu
