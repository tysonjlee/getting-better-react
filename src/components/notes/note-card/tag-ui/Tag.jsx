import { Badge } from "@/components/ui/Badge"
import { XIcon } from "lucide-react"
import { FiPlus } from "react-icons/fi";

function Tag({ tag, icon }) {
  function handleTagAdd() {
    // TODO: Implement
  }

  function handleTagDelete() {
    // TODO: Implement
  }    


  function determineIcon() {
    if (icon === "delete") return <XIcon size={15} />
    else if (icon === "add") return <FiPlus size={15}/>
  }

  return (
    <Badge variant="outline" className="relative min-w-20 min-h-5 group pr-2 rounded-full hover:pr-6 transition-all">
      <span>{tag}</span>
      <button onClick={handleTagDelete} className="absolute right-1 opacity-0 group-hover:opacity-100 text-xs transition-opacity">
        {determineIcon()}
      </button>
    </Badge>
  )
}

export default Tag
