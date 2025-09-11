import { CardHeader } from "@/components/ui/Card" 
import { BsFillPinAngleFill } from "react-icons/bs";
import { CiTrash } from "react-icons/ci";

function NoteCardDisplayHeader({ isPinned, isDeleted}) {
  // If pinned, show the pin icon 
  if (isPinned) {
    return (
      <CardHeader>
        <BsFillPinAngleFill color="red"/>
      </CardHeader>
    )
  }

  // If deleted, show the deleted icon 
  else if (isDeleted) {
    return (
      <CardHeader>
        <CiTrash color="red"/>
      </CardHeader>
    )
  }  

  // Otherwise, show no icon
  else {
    return <CardHeader />
  }
  
}

export default NoteCardDisplayHeader
