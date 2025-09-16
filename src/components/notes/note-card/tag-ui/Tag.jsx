import { Badge } from "@/components/ui/Badge"
import { XIcon } from "lucide-react"
import { FiPlus } from "react-icons/fi";
import { useNotes } from "@/contexts/NotesContext";

function Tag({ tag, mode, id }) {
  const { notesState, setNotesState } = useNotes()
  const note = notesState.byId[id]

  function determineIcon() {
    if (mode === "delete") return <XIcon size={15} />
    else if (mode === "add") return <FiPlus size={15}/>
  }

  function determineTagAction(tag) {
    if (mode === "delete") return handleTagDelete(tag)
    else if (mode === "add") return handleTagAdd(tag)
  }

  function handleTagAdd(tag) {
    /** @note For the Tag Add Menu */
    
    // If the tag is already on the note, throw a warning & exit
    if (note.tags.includes(tag)) {
      console.log("WARNING: TAG IS ALREADY ON NOTE")
      return 
    }

    // Create new note w/ new tag
    const newNote = {
      ...note, 
      tags: [...note.tags, tag]
    }

    // Set notesState 
    setNotesState((prev) => ({
      ...prev, 
      byId: {...prev.byId, [id]: newNote}
    }))
  }

  function handleTagDelete(tag) {
    /** @note For the note dialog tags */

    // Create new note w/o tag 
    const newNote = {
      ...note, 
      tags: note.tags.toSpliced(note.tags.indexOf(tag), 1)
    }

    // Set notesState
    setNotesState((prev) => ({
      ...prev, 
      byId: {...prev.byId, [id]: newNote}
    }))
  }    

  return (
    <Badge variant="outline" className="relative min-w-20 min-h-5 group pr-2 rounded-full hover:pr-6 transition-all">
      <span>{tag}</span>
      <button onClick={() => determineTagAction(tag)} className="absolute right-1 opacity-0 group-hover:opacity-100 text-xs transition-opacity">
        {determineIcon()}
      </button>
    </Badge>
  )
}

export default Tag
