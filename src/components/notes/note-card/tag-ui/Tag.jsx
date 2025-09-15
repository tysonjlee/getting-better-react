import { Badge } from "@/components/ui/Badge"
import { XIcon } from "lucide-react"
import { FiPlus } from "react-icons/fi";
import { useNotes } from "@/contexts/NotesContext";

function Tag({ tag, mode, id }) {
  const { notesState } = useNotes()
  const note = notesState.byId[id]

  function determineIcon() {
    if (mode === "delete") return <XIcon size={15} />
    else if (mode === "add") return <FiPlus size={15}/>
  }

  function determineTagAction(tag, id) {
    if (mode === "delete") return handleTagDelete(tag, id)
    else if (mode === "add") return handleTagAdd(tag, id)
  }

  function handleTagAdd(tag, id) {
    /** @note For the Tag Add Menu */
    
    // If the tag is already on the note, throw a warning & exit
    if (note.tags.includes(tag)) {
      console.log("WARNING: TAG IS ALREADY ON NOTE")
      return 
    }

    // Add the tag to the note 
    note.tags.unshift(tag)
    
  }

  function handleTagDelete(tag) {
    /** @note For the note dialog tags */
    
  }    

  return (
    <Badge variant="outline" className="relative min-w-20 min-h-5 group pr-2 rounded-full hover:pr-6 transition-all">
      <span>{tag}</span>
      <button onClick={() => determineTagAction(tag, id)} className="absolute right-1 opacity-0 group-hover:opacity-100 text-xs transition-opacity">
        {determineIcon()}
      </button>
    </Badge>
  )
}

export default Tag
