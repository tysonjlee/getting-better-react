import NotesContainer from "@/components/notes/NotesContainer"
import SectionTitle from "@/components/layout/SectionTitle"
import { useNotes } from "@/contexts/NotesContext"

function Dashboard() {
	// Arrays for NotesContainer
	const { notesState } = useNotes()
	const pinned = notesState.byOrderPinned
	const active = notesState.byOrderActive

	return (
		<>
			<SectionTitle title="Dashboard" />
			<NotesContainer noteArrays={[pinned, active]} limit={4}/>
		</>
	)
}

export default Dashboard
