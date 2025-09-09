import NotesContainer from "@/components/NotesContainer"
import SectionTitle from "@/components/SectionTitle"

function Dashboard() {
	return (
		<>
			<SectionTitle title="Dashboard" />
			<NotesContainer numNotes={4}/>
		</>
	)
}

export default Dashboard
