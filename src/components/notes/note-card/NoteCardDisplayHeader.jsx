import { CardHeader } from "@/components/ui/Card" 
import { BsPinAngle } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

function NoteCardDisplayHeader({ isPinned, isDeleted}) {

  function determineIcon() {
    // If pinned, show the pin icon 
    if (isPinned) return <BsPinAngle color="red" />
    
    // If deleted, show the deleted icon 
    else if (isDeleted) return <FaRegTrashAlt color="red" />

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
