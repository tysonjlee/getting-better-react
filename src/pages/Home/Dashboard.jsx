import NotesContainer from "@/components/notes/NotesContainer"
import SectionTitle from "@/components/layout/SectionTitle"

function Dashboard() {
	return (
		<>
			<SectionTitle title="Dashboard" />
			<NotesContainer numNotes={4}/>
		</>
	)
}

export default Dashboard
