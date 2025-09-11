import { Button } from "@/components/ui/button";
import { MdDeleteOutline } from "react-icons/md";
import { useNotes } from "@/contexts/NotesContext";

function DeleteButton({ id }) {
  const { deleteNote } = useNotes()

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button className="rounded-full" size="icon" onClick={() => deleteNote(id)}>
        <MdDeleteOutline />
      </Button>
    </div>
  )
}

export default DeleteButton;
