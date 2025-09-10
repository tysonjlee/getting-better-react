import NoteCard from "@/components/NoteCard"
import { useNotes } from "@/contexts/NotesContext"

function NotesContainer({ numNotes }) {
  const { notesState } = useNotes()
	const notesToDisplay = notesState.byOrderActive.slice(0, numNotes)

  return (
		<div className="flex flex-row justify-center content-center items-center flex-wrap max-w-[90%] max-h-[90%] w-full h-full py-5 gap-5"> {/* Notes Container */}
			{notesToDisplay.map((id) => (
				<NoteCard key={id} id={id}/>
			))}
		</div>
	)
}

export default NotesContainer