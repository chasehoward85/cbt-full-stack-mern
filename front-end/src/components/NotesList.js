import { Link } from 'react-router-dom'

const getWordCount = str => {
	if(!str) return 0;

	return str.split(' ').length;
}

export const NotesList = ({ notes }) => {
	return (
		<>
		{notes.map(notes => (
			<div key={notes.id}>
				<h3>{notes.title}</h3>
				<p>{getWordCount(notes.content)} word(s)</p>
				<Link to={`/notes/${notes.id}`}>
					<button>View</button>
				</Link>
			</div>
		))}
		</>
	)
}