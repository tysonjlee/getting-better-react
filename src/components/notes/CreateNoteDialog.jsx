import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/Dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { IoMdCreate } from 'react-icons/io'
import { useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import supabase from '@/lib/supabaseClient'

function CreateNoteDialog() {
	const [textareaContent, setTextareaContent] = useState('') // Textarea's content
	const [dialogOpen, setDialogOpen] = useState(false) // For tracking if the dialog is opened or closed
	const [showEmptyAlert, setShowEmptyAlert] = useState(false) // For tracking if the no message alert should show or not

	const session = useSession()
	const userId = session.user.id

	function renderEmptyAlert() {
		if (!showEmptyAlert) return null
		else
			return (
				<Alert variant="destructive">
					<AlertTitle className="font-bold">Warning</AlertTitle>
					<AlertDescription>You cannot save an empty message.</AlertDescription>
				</Alert>
			)
	}

	const handleSaveNote = async () => {
		// Show empty alert if textarea is empty
		if (!textareaContent.trim()) {
			setShowEmptyAlert(true)
			return
		}

		// TODO: Implement tag saving 
		// Save note to Supabase table 
		const now = new Date().toISOString()
		const { error } = await supabase
			.from('user_notes')
			.insert(
				{
					note_id: crypto.randomUUID(),
					user_id: userId,
					content: textareaContent,
					created_at: now,
					was_updated: false,
					updated_at: null,
					last_change_at: now,
					is_deleted: false,
					deleted_at: null,
					pinned: false,
				}
			);
		if (error) console.error(error)
		

		// Reset states
		setTextareaContent('')
		setDialogOpen(false)
		setShowEmptyAlert(false)
	}

	return (
		<Dialog
			open={dialogOpen}
			onOpenChange={(isOpen) => {
				setDialogOpen(isOpen)
				if (!isOpen) setShowEmptyAlert(false)
			}}
		>
			<DialogTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent">
				<IoMdCreate className="w-5 h-5 pr-1" /> Create a Note
			</DialogTrigger>
			<DialogContent className="flex items-center justify-center max-w-[80%] max-h-[60%] w-full h-full">
				<DialogHeader className="flex flex-col justify-center max-w-[60%] max-h-[80%] w-full h-full">
					<DialogTitle>Create a Note</DialogTitle>
					{renderEmptyAlert()}
					<DialogDescription className="grid w-full gap-2">
						<Textarea
							placeholder="Write your note here..."
							value={textareaContent}
							onChange={(event) => {
								setTextareaContent(event.target.value)
								if (showEmptyAlert) setShowEmptyAlert(false)
							}}
							className="flex w-full h-full resize-none text-foreground"
						/>
						<Button variant="outline" onClick={handleSaveNote} className="bg-foreground text-background">
							Save Note
						</Button>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default CreateNoteDialog
