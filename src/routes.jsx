import { Routes, Route, Navigate } from 'react-router-dom'
import { Landing } from '@/pages/Landing'
import { Home } from '@/pages/Home'
import { Manager } from '@/pages/Manager'

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/home" element={<Home />} />
			<Route path="/manager" element={<Manager />} />
		</Routes>
	)
}

export default AppRoutes
