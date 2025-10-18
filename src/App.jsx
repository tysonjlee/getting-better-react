import './App.css'
import Navbar from '@/components/layout/Navbar'
import AppRoutes from './routes'
import { useSession } from '@supabase/auth-helpers-react'
import { Landing } from './pages/Landing'

function App() {
	// Get user's current session
	const session = useSession()

	// If no session (user not logged in), show the User Authentication page
	if (!session) return <Landing />
	// Otherwise show the app
	else
		return (
			<>
				<Navbar />
				<AppRoutes />
			</>
		)
}

export default App
