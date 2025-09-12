import { useNotes } from "@/contexts/NotesContext"
import Tag from "@/components/notes/note-card/tag-ui/Tag"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LuCircleFadingPlus } from "react-icons/lu";

function NoteCardDialogTags({ id }) {
  const { notesState } = useNotes()
  const note = notesState.byId[id]
  const tags = note.tags

  return (
    <div className="flex flex-row items-center flex-wrap min-w-[60%] gap-3">
      {/* Individual Tags */}
      {tags.map((tag) => (
        <Tag key={tag} tag={tag}/>
      ))}      

      {/* Add Tag */}
      <Popover>
        <PopoverTrigger asChild>
          <button>
            <LuCircleFadingPlus size={18} />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <p>This is a test</p>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default NoteCardDialogTags
