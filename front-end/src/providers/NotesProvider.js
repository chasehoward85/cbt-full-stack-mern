import { useState } from 'react';

import { NotesContext } from '../contexts/NotesContext';

const fakeNotes = [{
	id: '123',
	title: 'My First Note',
	content: '*Hello my dear friends*'
}];

export const NotesProvider = ({ children }) => {
	const [notes, setNotes] = useState(fakeNotes);
	
	return (
		<NotesContext.Provider value={{ notes }}>
			{children}
		</NotesContext.Provider>
	)
}
