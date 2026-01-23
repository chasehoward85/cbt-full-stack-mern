import { useState, useEffect } from 'react';

import { useUser } from '../hooks/useUser';
import { useAuthedRequest } from '../hooks/useAuthedRequest';

import { NotesContext } from '../contexts/NotesContext';

export const NotesProvider = ({ children }) => {
	const { isReady, get, post, put, del} = useAuthedRequest();

	const [isLoading, setIsLoading] = useState(true);
	const [notes, setNotes] = useState([]);
	
	const { user } = useUser();

	useEffect(() => {
		const loadNotes = async () => {
			try {
				const notes = await get(`/users/${user.uid}/notes`);

				setNotes(notes);
				setIsLoading(false);
			} catch(e) {
				setIsLoading(false);
			}
		}

		if(user && isReady) {
			loadNotes();
		}
	}, [user, get, isReady]);

	const createNote = async title => {
		if(!user) {
			return;
		}

		try {
			const newNote = await post(`/users/${user.uid}/notes`, { title });

			setNotes(notes.concat(newNote));
		} catch(e) {
			console.log(e);
		}
	}

	const updateNote = async (id, { title, content }) => {
		try {
			const updatedNote = await put(`/notes/${id}`, { title, content });

			setNotes(notes.map(note => note.id === id ? updatedNote : note));
		} catch(e) {
			console.log(e);
		}
	}
	
	const deleteNote = async id => {
		try {
			await del(`/notes/${id}`);
			setNotes(notes.filter(note => note.id !== id));
		} catch(e) {
			console.log(e);
		}
	}
	
	return (
		<NotesContext.Provider value={{ notes, isLoading, createNote, deleteNote, updateNote }}>
			{children}
		</NotesContext.Provider>
	)
}
