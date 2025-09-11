import NoteCard from '@/components/notes/note-card/NoteCard'
import PropTypes from 'prop-types'

function NotesContainer({ noteArrays, limit }) {
	let uniqueIds = [...new Set(noteArrays.flat())]
	if (limit !== undefined) {
		uniqueIds = uniqueIds.slice(0, limit)
	}

	return (
		<div className="flex flex-row justify-center content-center items-center flex-wrap max-w-[90%] max-h-[90%] w-full h-full py-5 gap-5">
			{' '}
			{/* Notes Container */}
			{uniqueIds.map((id) => (
				<NoteCard key={id} id={id} />
			))}
		</div>
	)
}

NotesContainer.propTypes = {
	limit: PropTypes.number.isRequired,
	noteArrays: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
}

export default NotesContainer
