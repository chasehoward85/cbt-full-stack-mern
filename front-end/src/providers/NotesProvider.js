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

	const createNote = async title => {
		try {
			const response = await axios.post('/notes', { title });

			setNotes(response.data);
		} catch(e) {
			console.log(e);
		}
	}

	const updateNote = async (id, { title, content }) => {
		try {
			const response = await axios.put(`/notes/${id}`, { title, content });

			setNotes(response.data);
		} catch(e) {
			console.log(e);
		}
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
