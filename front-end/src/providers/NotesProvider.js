import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { NotesContext } from '../contexts/NotesContext';

const fakeNotes = [{
	id: '123',
	title: 'My First Note',
	content: '*Hello my dear friends*'
}];

export const NotesProvider = ({ children }) => {
	const [notes, setNotes] = useState(fakeNotes);

	const createNote = title => {
		setNotes(notes.concat({ id: uuid(), title, content: ''}))
	}

	const updateNote = (id, { title, content }) => {
		setNotes(notes.map(note => note.id === id ? { id, title, content } : note));
	}
	
	const deleteNote = id => {
		setNotes(notes.filter(note => note.id !== id));
	}
	
	return (
		<NotesContext.Provider value={{ notes, createNote, deleteNote, updateNote }}>
			{children}
		</NotesContext.Provider>
	)
}
