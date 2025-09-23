import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NotesProvider } from '@/contexts/NotesContext'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import supabase from '@/lib/supabaseClient'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<SessionContextProvider supabaseClient={supabase}>
			<BrowserRouter>
				<NotesProvider>
					<App />
				</NotesProvider>
			</BrowserRouter>
		</SessionContextProvider>
	</StrictMode>
)
