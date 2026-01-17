import { useState } from 'react';

export const NewNoteForm = ({ onSubmit = () => {} }) => {
	const [title, setTitle] = useState('');

	return (
		<>
		<h3>Add a New Note</h3>
		<input
			placeholder="Enter a Title"
			value={title}
			onChange={e => setTitle(e.target.value)} />

		<button onClick={() => onSubmit(title)}>Create</button>
		</>
	);
}