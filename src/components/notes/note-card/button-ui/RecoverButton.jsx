import { Button } from '@/components/ui/button'
import { CiUndo } from 'react-icons/ci'
import { useNotes } from '@/contexts/NotesContext'

function RecoverButton({ id, setDialogOpen, setShowSaveButton }) {
	const { recoverNote } = useNotes()

	return (
		<div className="flex items-center gap-2 flex-wrap">
			<Button
				className="rounded-full"
				size="icon"
				onClick={() => {
					recoverNote(id)
					setDialogOpen(false)
					setShowSaveButton(true)
				}}
			>
				<CiUndo />
			</Button>
		</div>
	)
}

export default RecoverButton
