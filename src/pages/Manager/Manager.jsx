import NotesContainer from "@/components/notes/NotesContainer"
import SectionTitle from "@/components/layout/SectionTitle"
import { useNotes } from "@/contexts/NotesContext"

function Manager() {
	// Arrays for NotesContainer
	const { notesState } = useNotes()
	const pinned = notesState.byOrderPinned
	const active = notesState.byOrderActive

	return (
		<div className="flex flex-col justify-center items-center py-8">
			<SectionTitle title="Notes Manager" />
			<NotesContainer noteArrays={[pinned, active]}/>
		</div>
	)
}

export default Manager
