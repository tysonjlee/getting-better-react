import { Button } from "@/components/ui/button";
import { CiUndo } from "react-icons/ci";
import { useNotes } from "@/contexts/NotesContext";

function RecoverButton ({ id, setDialogOpen }) {
  const { recoverNote } = useNotes()

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button className="rounded-full" size="icon" onClick={() => {
        recoverNote(id)
        setDialogOpen(false)
      }}>
        <CiUndo />
      </Button>
    </div>
  )
}

export default RecoverButton;
