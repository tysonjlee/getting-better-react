import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Textarea } from "@/components/ui/Textarea"
import { Button } from "@/components/ui/Button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import NoteCardHeader from "@/components/notes/NoteCardHeader"
import NoteCardFooter from "@/components/notes/NoteCardFooter" 
import { useNotes } from "@/contexts/NotesContext"
import { useState } from "react"

function NoteCard({ id }) {
  const { notesState, setNotesState } = useNotes()
  const note = notesState.byId[id] 
  const [textareaContent, setTextareaContent] = useState(note.content)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [showSimilarityAlert, setShowSimilarityAlert] = useState(false)

  function renderSimilarityAlert() {
    if (!showSimilarityAlert) return null 
    else return (
      <Alert variant="destructive">
        <AlertTitle className="font-bold">Warning</AlertTitle>
        <AlertDescription>
          The message is the same.
        </AlertDescription>
      </Alert>
    )
  }

  function handleSaveNote() {
    // Render similarity alert & don't save if message is the same 
    if (textareaContent.trim() === note.content) {
      setShowSimilarityAlert(true)
      return 
    } 

    // Save new note information 
    const now = Date.now()
    const newNote = {
      ...note,
      content: textareaContent, 
      wasUpdated: true,   
      updatedAt: now, 
      lastChangeAt: now, 
    }

    // Set notesState
    setNotesState(prev => ({
      ...prev, 
      byId: { ...prev.byId, [id]: newNote }, 
      byOrderActive: [id, ...prev.byOrderActive.filter(noteId => noteId !== id)]
    }))
    
    // Reset states
    setTextareaContent("")
    setDialogOpen(false)
    setShowSimilarityAlert(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={(isOpen) => {
      setDialogOpen(isOpen)
      if (!isOpen) setShowSimilarityAlert(false)
    }}>
      {/* Displayed Note Card */}
      <DialogTrigger>
        <Card className="flex flex-col items-center justify-center min-w-52 min-h-72 border-[3px] border-solid border-black rounded-lg bg-midnight-container transition-all duration-200 hover:scale-105">
          <NoteCardHeader isPinned={note.pinned} isDeleted={note.isDeleted}/>
          <CardContent className="text-foreground">
            {note.content}
          </CardContent>
        </Card>
      </DialogTrigger>

      {/* Note Modal */}
      <DialogContent className="flex flex-col items-center justify-center max-w-[80%] max-h-[60%] w-full h-full">
        <DialogHeader className="flex flex-col justify-center max-w-[60%] max-h-[40%] w-full h-full">
          <DialogTitle>Edit Note</DialogTitle>
          {renderSimilarityAlert()}
          <DialogDescription className="grid w-full gap-2">
            <Textarea value={textareaContent} onChange={(event) => {
              setTextareaContent(event.target.value)
              if (showSimilarityAlert) setShowSimilarityAlert(false)
            }} className="flex w-full h-full resize-none text-foreground"></Textarea>
            <Button variant="outline" onClick={handleSaveNote} className="bg-foreground text-background">Save Note</Button>
          </DialogDescription>
        </DialogHeader>
        <NoteCardFooter isDeleted={note.isDeleted} id={id} setDialogOpen={setDialogOpen}/>
      </DialogContent>
    </Dialog>
  )
}

export default NoteCard
