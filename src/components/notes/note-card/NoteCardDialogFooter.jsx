import { DialogFooter } from '@/components/ui/Dialog'
import DeleteButton from '@/components/notes/note-card/buttons/DeleteButton'
import PinButton from '@/components/notes/note-card/buttons/PinButton'
import RecoverButton from '@/components/notes/note-card/buttons/RecoverButton'

function NoteCardDialogFooter({ isDeleted, id, setDialogOpen, setShowSaveButton }) {
	// If the note is deleted, return recover button
	if (isDeleted) {
		return (
			<DialogFooter className="grid grid-cols-1">
				<RecoverButton id={id} setDialogOpen={setDialogOpen} setShowSaveButton={setShowSaveButton}/>
			</DialogFooter>
		)
	}

	// Otherwise if the note is active, return delete & pin buttons
	else {
		return (
			<DialogFooter className="grid grid-cols-2 gap-2">
				<PinButton id={id} />
				<DeleteButton id={id} setDialogOpen={setDialogOpen} setShowSaveButton={setShowSaveButton}/>
			</DialogFooter>
		)
	}
}

export default NoteCardDialogFooter
