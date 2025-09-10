import { DialogFooter } from "@/components/ui/Dialog"
import DeleteButton from "./buttons/DeleteButton"
import PinButton from "./buttons/PinButton"
import RecoverButton from "./buttons/RecoverButton"

function NoteCardFooter({ isDeleted, id }) {
  // If the note is deleted, return recover button 
  if (isDeleted) {
    return (
      <DialogFooter className="grid grid-cols-1">
        <RecoverButton id={id}/>
      </DialogFooter>    
    )
  }

  // Otherwise if the note is active, return delete & pin buttons
  else {
    return (
      <DialogFooter className="grid grid-cols-2 gap-2">
        <PinButton id={id}/>
        <DeleteButton id={id}/>
      </DialogFooter>
    )
  }
}

export default NoteCardFooter
