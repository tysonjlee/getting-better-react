import { Landing } from '@/pages/Landing'
import { UserAuthentication } from './pages/UserAuthentication'
import { Home } from '@/pages/Home'
import { Manager } from '@/pages/Manager'
import Navbar from '@/components/layout/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSession } from '@supabase/auth-helpers-react'

function AppRoutes() {
	const session = useSession()
	const isLoggedIn = !!session // '!!' forces a boolean value 

	return (
		<>
			{/* Show Navbar only for logged-in users */}
			{isLoggedIn && <Navbar />}

			{/* App Routes */}
			<Routes>
				{/* 404 Handling (user can type any invalid url and it'll redirect to this) */}
				<Route path="*" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />

				{/* Public Routes (for anyone) */}
				<Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Landing />} />
				<Route path="/auth" element={isLoggedIn ? <Navigate to="/home" /> : <UserAuthentication />} />

				{/* Protected Routes (only for logged-in users) */}
				<Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
				<Route path="/manager" element={isLoggedIn ? <Manager /> : <Navigate to="/" />} />
			</Routes>
		</>
	)
}

export default AppRoutes
