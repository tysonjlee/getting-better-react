import { useNotes } from '@/contexts/NotesContext'
import { FaRegTrashAlt } from 'react-icons/fa'
import { BsPinAngle } from 'react-icons/bs'

function NoteCardDialogStatus({ id }) {
	const { notesState } = useNotes()
	const note = notesState.byId[id]

	// Determine icon
	function determineIcon() {
		if (note.pinned) return <BsPinAngle color="red" />
		else if (note.isDeleted) return <FaRegTrashAlt color="red" />
		else return <></>
	}

	const icon = determineIcon()

	return <div className="pt-4">{icon}</div>
}

export default NoteCardDialogStatus
