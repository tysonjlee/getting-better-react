import { useState, useEffect, createContext, useContext } from 'react'
import supabase from '@/lib/supabaseClient';

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

export const tagNames = [
  "Anxiety",
  "Depression",
  "Stress",
  "Burnout",
  "PTSD",
  "OCD",
  "Bipolar Disorder",
  "ADHD",
  "Insomnia",
  "Grief",
  "Anger",
  "Self-Esteem",
  "Loneliness",
  "Mood Swings",
  "Panic Attacks",
  "Social Anxiety",
  "Suicidal Thoughts",
  "Self-Harm",
  "Dissociation",
  "Eating Disorder",
  "Body Image",
  "Perfectionism",
  "Addiction",
  "Substance Use",
  "Intrusive Thoughts",
  "Guilt",
  "Shame",
  "Hopelessness",
  "Overthinking",
  "Rumination",
  "Relationship Issues",
  "Fear of Failure",
  "Motivation",
  "Concentration Issues",
  "Irritability",
  "Trust Issues",
  "Negative Self-Talk",
  "Avoidance",
  "Chronic Fatigue",
  "Emotional Numbness",
  "Work Stress",
  "School Stress",
  "Financial Stress",
  "Life Transitions",
  "Identity",
  "Crisis",
  "Mental Exhaustion",
  "Overwhelm",
  "Compulsive Behavior"
];

export const NotesContext = createContext(null)

export function NotesProvider({ children }) {
	// Initialize notesState as empty
	const [notesState, setNotesState] = useState(() => {
		return initialNotesState
	})

	// Populate notesState from Supabase backend IF user has any notes
	useEffect(() => {
		fetchNotes()
	})

	// Define note functions 
	async function fetchNotes() {
		// If the user isn't logged in, don't do anything 
		const { data: { user } } = await supabase.auth.getUser()
		if (user === null) return

		// Otherwise, populate notesState with the user's backend notes
		const { data, error } = await supabase.from('user_notes').select().eq('user_id', user.id)
		if (error) console.error(error.message)
		else populateNotesState(data)
	}

	function populateNotesState(data) {
		// Create placeholder arrays
		const byId = {}
		const byOrderActive = []
		const byOrderPinned = []
		const byOrderDeleted = []
		
		// Populate notesState for each note
		for (const note of data) {
			// Make new note structure 
			const createdAt = new Date(note.created_at).getTime()
			const updatedAt = note.updated_at ? new Date(note.updated_at).getTime() : null
			const deletedAt = note.deleted_at ? new Date(note.deleted_at).getTime() : null
			const lastChangeAt = Math.max(createdAt, updatedAt || 0)

			const newNote = {
				id: note.note_id,
				content: note.content,
				createdAt,
				updatedAt,
				lastChangeAt,
				isDeleted: note.is_deleted,
				deletedAt,
				pinned: note.pinned,
				tags: note.tags || [],
				wasUpdated: !!updatedAt
			}

			// Save into placeholder arrays
			byId[note.note_id] = newNote
			if (newNote.isDeleted) byOrderDeleted.push(note.note_id)
			else if (newNote.pinned) {
				byOrderPinned.push(note.note_id)
				byOrderActive.push(note.note_id)
			}
			else byOrderActive.push(note.note_id)
		}

		// Sort byOrderActive, byOrderPinned, & byOrderDeleted
		const sortDesc = (a, b) => byId[b].lastChangeAt - byId[a].lastChangeAt
		byOrderActive.sort(sortDesc)
		byOrderPinned.sort(sortDesc)
		byOrderDeleted.sort((a, b) => byId[b].deletedAt - byId[a].deletedAt)

		// Set notesState w/ placeholder arrays
		setNotesState({
			byId,
			byOrderActive,
			byOrderPinned,
			byOrderDeleted
		})
	}

	async function deleteNote(id) {
		// If the note is already deleted, exit
		if (notesState.byId[id].isDeleted) return

		// Update Supabase backend 
		const { error } = await supabase
			.from('user_notes')
			.update({ 
				is_deleted: true, 
				deleted_at: new Date().toISOString(), 
				pinned: false
			})
			.eq('note_id', id)
		if (error) console.error(error)

		// Call fetchNotes() to refresh 
		await fetchNotes()
	}

	function togglePin(id) {
		// If the note is unpinned, pin it
		if (!notesState.byId[id].pinned) pinNote(id)
		// Otherwise if the note is pinned, unpin it
		else unpinNote(id)
	}

	async function pinNote(id) {
		// If the note is deleted or already pinned, exit
		if (notesState.byId[id].isDeleted || notesState.byId[id].pinned) return

		// Update Supabase backend 
		const { error } = await supabase
			.from('user_notes')
			.update({ pinned: true })
			.eq('note_id', id)
		if (error) console.error(error)

		// Call fetchNotes() to refresh 
		await fetchNotes()
	}

	async function unpinNote(id) {
		// If the note is deleted or already unpinned, exit
		if (notesState.byId[id].isDeleted || !notesState.byId[id].pinned) return

		// Update Supabase backend 
		const { error } = await supabase
			.from('user_notes')
			.update({ pinned: false })
			.eq('note_id', id)
		if (error) console.error(error)

		// Call fetchNotes() to refresh 
		await fetchNotes()
	}

	async function recoverNote(id) {
		// If the note isn't deleted, exit
		if (!notesState.byId[id].isDeleted) return

		// Update Supabase backend 
		const { error } = await supabase
			.from('user_notes')
			.update({ 
				is_deleted: false, 
				deleted_at: null
			})
			.eq('note_id', id)
		if (error) console.error(error)

		// Call fetchNotes() to refresh 
		await fetchNotes()
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
