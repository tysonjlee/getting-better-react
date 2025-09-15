import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/Command"
import { tagNames } from "@/contexts/NotesContext"
import Tag from "@/components/notes/note-card/tag-ui/Tag"

function TagAddMenu({ id }) {


  return (
    <Command className="bg-slate-950">
      <CommandInput placeholder="Search for a tag..." className="text-foreground"/>
      <CommandList>
        <CommandGroup heading="Tags">
          {tagNames.map((tag) => (
            <Tag key={tag} tag={tag} mode="add" id={id}/>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export default TagAddMenu
