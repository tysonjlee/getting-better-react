import { CardHeader } from "@/components/ui/Card" 
import { BsFillPinAngleFill } from "react-icons/bs";
import { CiTrash } from "react-icons/ci";

function NoteCardDisplayHeader({ isPinned, isDeleted}) {

  function determineIcon() {
    // If pinned, show the pin icon 
    if (isPinned) return <BsFillPinAngleFill color="red" />
    
    // If deleted, show the deleted icon 
    else if (isDeleted) return <CiTrash color="red" />

    // Otherwise, show no icon 
    else return 
  }

  // Return the display card header 
  return (
    <CardHeader className="absolute top-[-15px] right-[-17px]">
      {determineIcon()}
    </CardHeader>
  )
}

export default NoteCardDisplayHeader
