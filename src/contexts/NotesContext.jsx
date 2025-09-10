import { useState, useEffect, createContext, useContext } from 'react'

export const initialNotesState = {
  byId: {}, // Single truth source 
  /**
   * byId = {
   *  "uniqueId1": {
   *    "id": uniqueId1
   *    "content": string
   *    "createdAt": int (epoch)
   *    "wasUpdated": boolean
   *    "updatedAt": int (epoch) || null if not updated 
   *    "lastChangeAt": int (epoch) [greatest of createdAt & updatedAt times]
   *    "isDeleted": boolean
   *    "deletedAt": int (epoch) || null if not deleted
   *    "pinned": boolean
   *   }
   *   ...
   * }
   */
  byOrderActive: [],  // Descending by timestamp created/edited
  byOrderPinned: [],  // Descending by timestamp pinned
  byOrderDeleted: [], // Descending by timestamp deleted
}

export const NotesContext = createContext(null)

export function NotesProvider({ children }) {
  // Get notesState from localStorage or initialize if no localStorage
  const [notesState, setNotesState] = useState(() => {
    const stored = localStorage.getItem("notesState")
    if (stored) return JSON.parse(stored)
    else return initialNotesState
  })

  // Update localStorage whenever notesState changes
  useEffect(() => {
    localStorage.setItem("notesState", JSON.stringify(notesState))
  }, [notesState])

  // Define delete, pin, & recover functions 
  function deleteNote(id) {
    // Get note 
    const note = notesState.byId[id]

    // Save new note information 
    const newNote = {
      ...note,
      isDeleted: true, 
      deletedAt: Date.now(), 
      pinned: false
    }

    // Set notesState
    setNotesState(prev => ({
      ...prev, 
      byId: { ...prev.byId, [id]: newNote }, 
      byOrderActive: prev.byOrderActive.filter(noteId => noteId !== id), 
      byOrderPinned: prev.byOrderPinned.filter(noteId => noteId !== id),
      byOrderDeleted: [id, ...prev.byOrderDeleted.filter(noteId => noteId !== id)]
    }))
  }

  function pinNote(id) {
    // Get note 
    const note = notesState.byId[id]

    // Save new note information 
    const newNote = {
      ...note,
      pinned: true
    }

    // Set notesState
    setNotesState(prev => ({
      ...prev, 
      byId: { ...prev.byId, [id]: newNote }, 
      byOrderPinned: [id, ...prev.byOrderPinned.filter(noteId => noteId !== id)],
    }))
  }

  function recoverNote(id) {
    // Get note 
    const note = notesState.byId[id]

    // Save new note information 
    const newNote = {
      ...note,
      isDeleted: false, 
      deletedAt: null, 
    }

    // Set notesState
    setNotesState(prev => ({
      ...prev, 
      byId: { ...prev.byId, [id]: newNote }, 
      byOrderActive: prev.byOrderActive.filter(noteId => noteId !== id), 
      byOrderPinned: prev.byOrderPinned.filter(noteId => noteId !== id),
      byOrderDeleted: [id, ...prev.byOrderDeleted.filter(noteId => noteId !== id)]
    }))
  }

  // Return NotesContext provider
  return (
    <NotesContext.Provider value={{ notesState, setNotesState, deleteNote, pinNote, recoverNote }}>
      {children}
    </NotesContext.Provider>
  ); 
}

export function useNotes() {
  const context = useContext(NotesContext)
  if (!context) throw new Error("useNotes must be used within a <NotesProvider>")
  return context
}
