import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { NotesContext } from '../contexts/NotesContext';

export const NotesProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [notes, setNotes] = useState([]);

	const [userIsLoading, setUserIsLoading] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const cancelSubscription = onAuthStateChanged(getAuth(), user => {
			setUser(user);
			setUserIsLoading(false);
		});

		return cancelSubscription;
	}, []);

	useEffect(() => {
		const loadNotes = async () => {
			try {
				const response = await axios.get(`/users/${user.uid}/notes`);

				setNotes(response.data);
				console.log(response.data);
				setIsLoading(false);
			} catch(e) {
				setIsLoading(false);
			}
		}

		if(user) {
			loadNotes();
		}
	}, [user]);

	const createNote = async title => {
		if(!user) {
			return;
		}

		try {
			const response = await axios.post(`/users/${user.uid}/notes`, { title });
			
			const newNote = response.data;

			setNotes(notes.concat(newNote));
		} catch(e) {
			console.log(e);
		}
	}

	const updateNote = async (id, { title, content }) => {
		try {
			const response = await axios.put(`/notes/${id}`, { title, content });
			
			const updatedNote = response.data;

			setNotes(notes.map(note => note.id === id ? updatedNote : note));
		} catch(e) {
			console.log(e);
		}
	}
	
	const deleteNote = async id => {
		try {
			await axios.delete(`/notes/${id}`);
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
