import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { Manager } from '@/pages/Manager'

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/home" element={<Navigate to="/" />} />
			<Route path="/manager" element={<Manager />} />
		</Routes>
	)
}

export default AppRoutes
