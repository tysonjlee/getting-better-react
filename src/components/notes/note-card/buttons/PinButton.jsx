import { Button } from "@/components/ui/button";
import { RiPushpin2Fill } from "react-icons/ri";
import { useNotes } from "@/contexts/NotesContext";

function PinButton({ id }) {
  const { togglePin } = useNotes()

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button className="rounded-full" size="icon" onClick={() => togglePin(id)}>
        <RiPushpin2Fill />
      </Button>
    </div>
  )
}

export default PinButton;
