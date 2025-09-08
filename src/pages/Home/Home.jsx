import Dashboard from './Dashboard'
import SearchQuery from './SearchQuery'

function Home() {
	return (
		<div className="flex flex-col justify-center items-center py-8">
			<Dashboard />
			<SearchQuery />
		</div>
	)
}

export default Home
