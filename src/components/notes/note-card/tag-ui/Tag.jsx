import { Badge } from "@/components/ui/Badge"
import { XIcon } from "lucide-react"
import { FiPlus } from "react-icons/fi";

function Tag({ tag, icon }) {
  function determineIcon() {
    if (icon === "delete") return <XIcon size={15} />
    else if (icon === "add") return <FiPlus size={15}/>
  }

  function determineTagAction() {
    if (icon === "delete") return handleTagDelete
    else if (icon === "add") return handleTagAdd
  }

  function handleTagAdd() {
    /** @note For the Tag Add Menu */

    
  }

  function handleTagDelete() {
    /** @note For the note dialog tags */
  }    

  return (
    <Badge variant="outline" className="relative min-w-20 min-h-5 group pr-2 rounded-full hover:pr-6 transition-all">
      <span>{tag}</span>
      <button onClick={determineTagAction()} className="absolute right-1 opacity-0 group-hover:opacity-100 text-xs transition-opacity">
        {determineIcon()}
      </button>
    </Badge>
  )
}

export default Tag
