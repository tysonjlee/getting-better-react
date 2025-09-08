import NoteCard from "@/components/NoteCard"
import { useNotes } from "@/contexts/NotesContext"

function NotesContainer() {
  const { notesState } = useNotes()

  return (
		<div className="flex flex-row justify-evenly content-center items-center flex-wrap max-w-[90%] max-h-[90%] w-full h-full py-5"> {/* Notes Container */}
			{notesState.byOrderActive.map((id) => (
				<NoteCard key={id} id={id}/>
			))}
		</div>
	)
}

export default NotesContainer