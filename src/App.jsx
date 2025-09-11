import './App.css'
import Navbar from '@/components/layout/Navbar'
import { NotesProvider } from '@/contexts/NotesContext'
import AppRoutes from './routes'

function App() {
	return (
		<NotesProvider>
			<Navbar />
			<AppRoutes />
		</NotesProvider>
	)
}

export default App
