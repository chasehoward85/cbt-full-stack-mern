import { Link } from 'react-router-dom'

const getWordCount = str => {
	if(!str) return 0;

	return str.split(' ').length;
}

export const NotesList = ({ notes, onRequestDelete }) => {
	return (
		<>
		{notes.map(notes => (
			<div key={notes.id}>
				<h3>{notes.title}</h3>
				<p>{getWordCount(notes.content)} word(s)</p>

				<div style={{ paddingBottom: '8px'}} className="evenly-spaced">
					<button onClick={() => onRequestDelete(notes.id)}>Delete</button>
					<Link to={`/notes/${notes.id}`}>
						<button className="full-width">View</button>
					</Link>
				</div>
			</div>
		))}
		</>
	);
}
