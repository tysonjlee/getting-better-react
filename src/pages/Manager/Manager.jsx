import NotesContainer from "@/components/NotesContainer"
import SectionTitle from "@/components/SectionTitle"
import { useNotes } from "@/contexts/NotesContext"

function Manager() {
	const { notesState } = useNotes()

	return (
		<div className="flex flex-col justify-center items-center py-8">
			<SectionTitle title="Notes Manager" />
			<NotesContainer numNotes={notesState.byOrderActive.length}/>
		</div>
	)
}

export default Manager
