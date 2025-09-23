import './App.css'
import Navbar from '@/components/layout/Navbar'
import AppRoutes from './routes'
import { useSession } from '@supabase/auth-helpers-react'
import { LoginSignup } from '@/pages/LoginSignup'

function App() {
	// Get user's current session 
	const session = useSession()

	// If no session (user not logged in), show the login page 
	if (!session) return <LoginSignup />

	// Otherwise show the app 
	else return (
		<>
			<Navbar />
			<AppRoutes />
		</>
	)
}

export default App
