import { useNotes } from "@/contexts/NotesContext"
import Tag from "@/components/notes/note-card/note-card-ui/Tag"
import { LuCircleFadingPlus } from "react-icons/lu";

function NoteCardDialogTags({ id }) {
  const { notesState } = useNotes()
  const note = notesState.byId[id]
  const tags = note.tags

  return (
    <div className="flex flex-row items-center flex-wrap gap-3">
      {/* Individual Tags */}
      {tags.map((tag) => (
        <Tag key={tag} tag={tag}/>
      ))}      

      {/* Add Tag */}
      <button>
        <LuCircleFadingPlus size={18}/>
      </button>
    </div>
  )
}

export default NoteCardDialogTags
