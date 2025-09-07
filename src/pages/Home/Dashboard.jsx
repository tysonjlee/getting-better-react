import NoteCard from "@/components/NoteCard"
import { useNotes } from "@/contexts/NotesContext"

function Dashboard() {
	const { notesState } = useNotes()
	
	return (
		<div className="flex flex-row justify-evenly content-center items-center flex-wrap max-w-[90%] max-h-[90%] w-full h-full border-4 border-yellow-500"> {/* Notes Container */}
			{notesState.byOrderActive.map((id) => (
				<NoteCard key={id} id={id}/>
			))}
		</div>
	)
}

export default Dashboard
