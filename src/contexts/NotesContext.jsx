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


  // Return NotesContext provider
  return (
    <NotesContext.Provider value={{ notesState, setNotesState }}>
      {children}
    </NotesContext.Provider>
  ); 
}

export function useNotes() {
  const context = useContext(NotesContext)
  if (!context) throw new Error("useNotes must be used within a <NotesProvider>")
  return context
}