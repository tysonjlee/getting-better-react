import './App.css'
import Navbar from '@/components/Navbar'
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
