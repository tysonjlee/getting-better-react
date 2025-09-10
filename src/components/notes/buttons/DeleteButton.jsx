import { Button } from "@/components/ui/button";
import { MdDeleteOutline } from "react-icons/md";

function DeleteButton({ id }) {
  function handleDeleteNote() {
    // Set notesState 


    // Reset states
    
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button className="rounded-full" size="icon" onClick={handleDeleteNote}>
        <MdDeleteOutline />
      </Button>
    </div>
  )
}

export default DeleteButton;
