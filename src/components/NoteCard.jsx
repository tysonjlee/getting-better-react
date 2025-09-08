import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { useNotes } from "@/contexts/NotesContext"

function NoteCard({ id }) {
  const { notesState } = useNotes()
  const note = notesState.byId[id]  

  return (
    <Card className="flex flex-col items-center justify-center max-w-52 max-h-72 border-[3px] border-solid border-black rounded-lg bg-midnight-container transition-all duration-200 hover:scale-105">
      <CardContent className="text-foreground">
        {note.content}
      </CardContent>
    </Card>
  )
}

export default NoteCard
