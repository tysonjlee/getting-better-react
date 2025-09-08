import NotesContainer from "@/components/NotesContainer"
import SectionTitle from "@/components/SectionTitle"

function Manager() {
	return (
		<div className="flex flex-col justify-center items-center py-8">
			<SectionTitle title="Notes Manager" />
			<NotesContainer />
		</div>
	)
}

export default Manager
