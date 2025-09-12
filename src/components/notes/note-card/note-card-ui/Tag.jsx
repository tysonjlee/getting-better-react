import { Badge } from "@/components/ui/Badge"
import { XIcon } from "lucide-react"

function Tag({ tag }) {
  function handleTagDelete() {
    // TODO: Implement
  }    

  return (
    <Badge variant="outline" className="relative min-w-20 min-h-5 group pr-2 rounded-full hover:pr-6 transition-all">
      <span>{tag}</span>
      <button onClick={handleTagDelete} className="absolute right-1 opacity-0 group-hover:opacity-100 text-xs transition-opacity">
        <XIcon size={15} />
      </button>
    </Badge>
  )
}

export default Tag
