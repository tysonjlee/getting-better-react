import { useNotes } from "@/contexts/NotesContext"
import Tag from "@/components/notes/note-card/tag-ui/Tag"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { LuCircleFadingPlus } from "react-icons/lu";
import TagAddMenu from "@/components/notes/note-card/tag-ui/TagAddMenu";

function NoteCardDialogTags({ id }) {
  const { notesState } = useNotes()
  const note = notesState.byId[id]
  const tags = note.tags

  return (
    <div className="flex flex-row items-center flex-wrap min-w-[60%] gap-3">
      {/* Individual Tags */}
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} icon="delete"/>
      ))}      

      {/* Add Tag Button */}
      <Popover>
        <PopoverTrigger asChild>
          <button>
            <LuCircleFadingPlus size={18} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="flex max-h-44 resize-none overflow-y-auto mt-3 bg-slate-950">
          <TagAddMenu />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default NoteCardDialogTags
