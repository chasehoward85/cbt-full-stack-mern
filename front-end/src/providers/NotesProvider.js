import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

import { NotesContext } from '../contexts/NotesContext';

export const NotesProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		const loadNotes = async () => {
			try {
				const response = await axios.get('/notes');

				setNotes(response.data);
				console.log(response.data);
				setIsLoading(false);
			} catch(e) {
				setIsLoading(false);
			}
		}

		loadNotes();
	}, []);

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
		<NotesContext.Provider value={{ notes, isLoading, createNote, deleteNote, updateNote }}>
			{children}
		</NotesContext.Provider>
	)
}
