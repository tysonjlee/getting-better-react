import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/Textarea"
import { Button } from "@/components/ui/Button"
import { IoMdCreate } from 'react-icons/io'
import { useNotes } from '@/contexts/NotesContext' 
import { useState } from 'react'

function CreateNoteDialog () {
  const { setNotesState } = useNotes() // Get setNotesState from useContext(NotesContext)
  const [textareaContent, setTextareaContent] = useState("") // Textarea's content
  const [dialogOpen, setDialogOpen] = useState(false) // For tracking if the dialog is opened or closed
  const [showEmptyAlert, setShowEmptyAlert] = useState(false) // For tracking if the no message alert should show or not

  function renderEmptyAlert() {
    console.log(showEmptyAlert)
    if (!showEmptyAlert) return null
    else return (
      <Alert variant="destructive">
        <AlertTitle className="font-bold">Warning</AlertTitle>
        <AlertDescription>
          You cannot save an empty message.
        </AlertDescription>
      </Alert>
    )
  }

  function handleSaveNote() {
    // Show empty alert if textarea is empty
    if (!textareaContent.trim()) {
      setShowEmptyAlert(true)
      return 
    } 

    // Create new note information
    const newId = crypto.randomUUID()
    const now = Date.now()
    const newNote = {
      id: newId,
      content: textareaContent,
      createdAt: now,
      wasUpdated: false,   
      updatedAt: null, 
      lastChangeAt: now, 
      isDeleted: false, 
      deletedAt: null, 
      pinned: false
    } 

    // Set notesState
    setNotesState(prev => ({
      ...prev, 
      byId: { ...prev.byId, [newId]: newNote }, 
      byOrderActive: [newId, ...prev.byOrderActive] 
    }))
    
    // Reset states
    setTextareaContent("") 
    setDialogOpen(false)
    setShowEmptyAlert(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={(isOpen) => {
      setDialogOpen(isOpen)
      if (!isOpen) setShowEmptyAlert(false)
    }}>
      <DialogTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent">
        <IoMdCreate className="w-5 h-5 pr-1"/> Create a Note
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center max-w-[80%] max-h-[60%] w-full h-full">
        <DialogHeader>
          <DialogTitle>Create a Note</DialogTitle>
          {renderEmptyAlert()}
          <DialogDescription className="grid w-full gap-2">
            <Textarea placeholder="Write your note here..." value={textareaContent} onChange={(event) => {
              setTextareaContent(event.target.value)
              if (showEmptyAlert) setShowEmptyAlert(false)
            }} className="flex max-w-[100%] max-h-[100%] w-full h-full resize-none text-foreground"/>
            <Button variant="outline" onClick={handleSaveNote} className="bg-foreground text-background">Save Note</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog