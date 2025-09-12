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
	 * 		"tags": array of strings 
	 *   }
	 *   ...
	 * }
	 */
	byOrderActive: [], // Descending by timestamp created/edited
	byOrderPinned: [], // Descending by timestamp pinned
	byOrderDeleted: [] // Descending by timestamp deleted
}

export const NotesContext = createContext(null)

export function NotesProvider({ children }) {
	// Get notesState from localStorage or initialize if no localStorage
	const [notesState, setNotesState] = useState(() => {
		const stored = localStorage.getItem('notesState')
		if (stored) return JSON.parse(stored)
		else return initialNotesState
	})

	// Update localStorage whenever notesState changes
	useEffect(() => {
		localStorage.setItem('notesState', JSON.stringify(notesState))
	}, [notesState])

	// Define delete, pin, & recover functions
	function deleteNote(id) {
		// If the note is already deleted, exit
		if (notesState.byId[id].isDeleted) return

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
		setNotesState((prev) => ({
			...prev,
			byId: { ...prev.byId, [id]: newNote },
			byOrderActive: prev.byOrderActive.filter((noteId) => noteId !== id),
			byOrderPinned: prev.byOrderPinned.filter((noteId) => noteId !== id),
			byOrderDeleted: [id, ...prev.byOrderDeleted.filter((noteId) => noteId !== id)]
		}))
	}

	function togglePin(id) {
		// If the note is unpinned, pin it
		if (!notesState.byId[id].pinned) pinNote(id)
		// Otherwise if the note is pinned, unpin it
		else unpinNote(id)
	}

	function pinNote(id) {
		// If the note is deleted or already pinned, exit
		if (notesState.byId[id].isDeleted || notesState.byId[id].pinned) return

		// Get note
		const note = notesState.byId[id]

		// Save new note information
		const newNote = {
			...note,
			pinned: true
		}

		// Set notesState
		setNotesState((prev) => ({
			...prev,
			byId: { ...prev.byId, [id]: newNote },
			byOrderPinned: [id, ...prev.byOrderPinned.filter((noteId) => noteId !== id)]
		}))
	}

	function unpinNote(id) {
		// If the note is deleted or already unpinned, exit
		if (notesState.byId[id].isDeleted || !notesState.byId[id].pinned) return

		// Get note
		const note = notesState.byId[id]

		// Save new note information
		const newNote = {
			...note,
			pinned: false
		}

		// Set notesState
		setNotesState((prev) => ({
			...prev,
			byId: { ...prev.byId, [id]: newNote },
			byOrderPinned: prev.byOrderPinned.filter((noteId) => noteId !== id)
		}))
	}

	function recoverNote(id) {
		// If the note isn't deleted, exit
		if (!notesState.byId[id].isDeleted) return

		// Get note
		const note = notesState.byId[id]

		// Save new note information
		const newNote = {
			...note,
			isDeleted: false,
			deletedAt: null
		}

		// Set notesState
		const insertIndex = findInsertIndex(id) // id's proper index into byOrderActive
		setNotesState((prev) => ({
			...prev,
			byId: { ...prev.byId, [id]: newNote },
			byOrderActive: [...prev.byOrderActive.slice(0, insertIndex), id, ...prev.byOrderActive.slice(insertIndex)],
			byOrderDeleted: prev.byOrderDeleted.filter((noteId) => noteId !== id)
		}))
	}

	function findInsertIndex(id) {
		/**
		 * @brief Finds the proper placement of id in byOrderActive
		 * @note helper for recoverNote()
		 * @note Same problem as Leetcode's Search Insert Position (https://leetcode.com/problems/search-insert-position/description/)
		 * @note Used GeeksForGeeks solution (https://www.geeksforgeeks.org/dsa/search-insert-position-of-k-in-a-sorted-array/)
		 * @param id The unique id of the note to recover
		 * @return the correct index to insert into
		 */

		// Edge case: If byOrderActive is empty, return 0
		if (notesState.byOrderActive.length === 0) return 0

		// Get note to recover's timestamp
		const noteToRecover = notesState.byId[id]
		const noteToRecoverTimestamp = noteToRecover.lastChangeAt

		// Use binary search to find index
		/** @note Remember that byOrderActive is by timestamp DESCENDING! */
		let lo = 0
		let hi = notesState.byOrderActive.length - 1
		while (lo < hi) {
			// Get middle object's timestamp
			let mid = Math.floor(lo + (hi - lo) / 2)
			let midNote = notesState.byId[notesState.byOrderActive[mid]]
			let midTimestamp = midNote.lastChangeAt

			// If mid is less than our timestamp, adjust window left
			if (midTimestamp <= noteToRecoverTimestamp) hi = mid
			// Otherwise, adjust window right
			else lo = mid + 1
		}

		// arr[lo] is the first element <= ourTimestamp
		if (notesState.byId[notesState.byOrderActive[lo]].lastChangeAt > noteToRecoverTimestamp) return lo + 1
		else return lo
	}

	// Return NotesContext provider
	return (
		<NotesContext.Provider
			value={{ notesState, setNotesState, deleteNote, togglePin, pinNote, unpinNote, recoverNote }}
		>
			{children}
		</NotesContext.Provider>
	)
}

export function useNotes() {
	const context = useContext(NotesContext)
	if (!context) throw new Error('useNotes must be used within a <NotesProvider>')
	return context
}
