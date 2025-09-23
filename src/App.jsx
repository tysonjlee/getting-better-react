import './App.css'
import Navbar from '@/components/layout/Navbar'
import AppRoutes from './routes'
import { useSession } from '@supabase/auth-helpers-react'
import { UserAuthentication } from '@/pages/UserAuthentication'

function App() {
	// Get user's current session 
	const session = useSession()

	// If no session (user not logged in), show the User Authentication page
	if (!session) return <UserAuthentication />

	// Otherwise show the app 
	else return (
		<>
			<Navbar />
			<AppRoutes />
		</>
	)
}

export default App
