import NoteCardDialogTimestamp from "@/components/notes/note-card/NoteCardDialogTimestamp"
import NoteCardDialogStatus from "@/components/notes/note-card/NoteCardDialogStatus"

function NoteCardDialogMeta({ id }) {
  return (
    <div className="flex flex-col absolute left-[15px] top-[0px] min-w-60 min-h-44">
      <NoteCardDialogTimestamp id={id}/> {/* Timestamp */}
      <NoteCardDialogStatus id={id}/>    {/* Status Icon */}
    </div>
  )
}

export default NoteCardDialogMeta