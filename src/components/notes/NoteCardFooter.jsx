import { DialogFooter } from "@/components/ui/Dialog"
import DeleteButton from "./buttons/DeleteButton"
import PinButton from "./buttons/PinButton"
import RecoverButton from "./buttons/RecoverButton"
import { useNotes } from "@/contexts/NotesContext"

function NoteCardFooter({ isDeleted, id }) {
  const { recoverNote, togglePin, deleteNote } = useNotes()

  // If the note is deleted, return recover button 
  if (isDeleted) {
    return (
      <DialogFooter className="grid grid-cols-1">
        <RecoverButton onClick={() => recoverNote(id)}/>
      </DialogFooter>    
    )
  }

  // Otherwise if the note is active, return delete & pin buttons
  else {
    return (
      <DialogFooter className="grid grid-cols-2 gap-2">
        <PinButton onClick={() => togglePin(id)}/>
        <DeleteButton onClick={() => deleteNote(id)}/>
      </DialogFooter>
    )
  }
}

export default NoteCardFooter
