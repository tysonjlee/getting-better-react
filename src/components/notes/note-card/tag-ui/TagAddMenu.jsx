import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut
} from '@/components/ui/Command'
import { tagNames } from '@/contexts/NotesContext'
import Tag from '@/components/notes/note-card/tag-ui/Tag'
import { useNotes } from '@/contexts/NotesContext'

function TagAddMenu({ id }) {
	const { notesState } = useNotes()
	const noteTags = notesState.byId[id].tags
	const uniqueTagNames = tagNames.filter((tag) => !noteTags.includes(tag))

	return (
		<Command className="bg-slate-950">
			<CommandInput placeholder="Search for a tag..." className="text-foreground" />
			<CommandList>
				<CommandGroup heading="Tags" className="px-2 pb-44">
					{uniqueTagNames.map((tag) => (
						<Tag key={tag} tag={tag} mode="add" id={id} />
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	)
}

export default TagAddMenu
