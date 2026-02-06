import { useState, useEffect } from 'react';

import { useUser } from '../hooks/useUser';
import { useAuthedRequest } from '../hooks/useAuthedRequest';

import { NotesContext } from '../contexts/NotesContext';

export const NotesProvider = ({ children }) => {
	const { isReady, get, post, put, del} = useAuthedRequest();

	const [isLoading, setIsLoading] = useState(true);
	const [notes, setNotes] = useState([]);
	const [sharedNotes, setSharedNotes] = useState([]);
	
	const { user } = useUser();

	useEffect(() => {
		const loadNotes = async () => {
			try {
				const {owned, shared } = await get(`/users/${user.uid}/notes`);

				setNotes(owned);
				setSharedNotes(shared);
				
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

	const shareNote = async (noteId, email, role) => {
		try {
			const updatedEmails = await post(`/notes/${noteId}/shared-emails`, { email, role });
			setNotes(notes.map(note => note.id === noteId
				? { ...note, sharedWith: updatedEmails }
				: note));
		} catch(e) {
			console.log(e);
		}
	}

	const unshareNote = async (noteId, email) => {
		try {
			const updatedEmails = await del(`/notes/${noteId}/shared-emails/${email}`);

			setNotes(notes.map(note => note.id === noteId
				? { ...note, sharedWith: updatedEmails }
				: note));
		} catch(e) {
			console.log(e);
		}
	}
	
	return (
		<NotesContext.Provider value={{ notes, sharedNotes, isLoading, createNote, deleteNote, updateNote, shareNote, unshareNote }}>
			{children}
		</NotesContext.Provider>
	)
}
