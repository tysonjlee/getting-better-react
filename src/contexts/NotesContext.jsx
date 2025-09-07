import { useState, createContext, useContext } from 'react'

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
  const [notesState, setNotesState] = useState(initialNotesState)
  const providerValue = { notesState, setNotesState }
  return (
    <NotesContext.Provider value={providerValue}>
      {children}
    </NotesContext.Provider>
  ); 
}

export function useNotes() {
  const context = useContext(NotesContext)
  if (!context) throw new Error("useNotes must be used within a <NotesProvider>")
  return context
}