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
    <Card>
      <CardContent>
        <p>{note.content}</p>
      </CardContent>
    </Card>
  )
}

export default NoteCard
