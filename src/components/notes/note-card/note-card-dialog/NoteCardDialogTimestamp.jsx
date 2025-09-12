import { useNotes } from '@/contexts/NotesContext'

function NoteCardDialogTimestamp({ id }) {
	const { notesState } = useNotes()
	const note = notesState.byId[id]

	// Determine timestamp string
	function convertTimestamp(epochMS) {
		/** @note Formatted as month/day/full_year AM/PM */

		const epochDate = new Date(epochMS)
		return epochDate.toLocaleString('en-US')
	}

	function determineTimestamp() {
		if (note.isDeleted)
			return 'Deleted ' + convertTimestamp(note.deletedAt) // If deleted
		else if (note.wasUpdated)
			return 'Edited ' + convertTimestamp(note.updatedAt) // If edited
		else return 'Created ' + convertTimestamp(note.createdAt) // If just created
	}

	const timestampStr = determineTimestamp()

	return (
		<blockquote className="mt-6 border-l-2 pl-2 border-l-foreground text-foreground italic">{timestampStr}</blockquote>
	)
}

export default NoteCardDialogTimestamp
