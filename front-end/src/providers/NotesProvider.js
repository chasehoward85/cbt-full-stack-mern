import { useState, useEffect } from 'react';
import socketIoClient from 'socket.io-client';

import { useUser } from '../hooks/useUser';
import { useAuthedRequest } from '../hooks/useAuthedRequest';

import { NotesContext } from '../contexts/NotesContext';

export const NotesProvider = ({ children }) => {
	const {get, post, put, del} = useAuthedRequest();

	const [isLoading, setIsLoading] = useState(true);
	const [notes, setNotes] = useState([]);
	const [sharedNotes, setSharedNotes] = useState([]);
	const [socket, setSocket] = useState(null);
	
	const { isLoading: isLoadingUser, user } = useUser();

	useEffect(() => {
		const connectToSocket = async () => {
			const socket = socketIoClient('http://127.0.0.1:8080', {
				query: {
					name: 'allNotes',
					token: await user.getIdToken(),
				}
			});
		
			setSocket(socket);
		}

		if(!isLoadingUser && user) {
			connectToSocket();
		}
	}, [user, isLoadingUser]);

	useEffect(() => {
		if(socket) {
			socket.on('initialNotes', ({ owned, shared }) => {
				setNotes(owned);
				setSharedNotes(shared);

				setIsLoading(false);
			});

			socket.on('noteShared', newSharedNote => {
				setSharedNotes(sharedNotes.concat(newSharedNote));
			});

			socket.on('noteUnshared', id => {
				setSharedNotes(sharedNotes.filter(note => note.id !== id));
			});

			socket.on('error', (errorMessage) => {
				console.log(errorMessage);
			});
		}
	}, [socket, sharedNotes]);

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
			setSharedNotes(sharedNotes.map(note => note.id === id ? updatedNote : note));
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

	const enableLinkSharing = async (noteId) => {
		try {
			const updatedNote = await put(`/notes/${noteId}/enable-link-sharing`);

			setNotes(notes.map(note => note.id === noteId
				? updatedNote
				: note));
		} catch(e) {
			console.log(e);
		}
	}

	const disableLinkSharing = async (noteId) => {
		try {
			const updatedNote = await put(`/notes/${noteId}/disable-link-sharing`);

			setNotes(notes.map(note => note.id === noteId
				? updatedNote
				: note));
		} catch(e) {
			console.log(e);
		}
	}

	const getLinkSharedNote = async (linkSharingHash) => {
		try {
			const note = await get(`/link-sharing/${linkSharingHash}`);

			return note;
		} catch(e) {
			return undefined;
		}
	}
	
	return (
		<NotesContext.Provider value={{
			notes,
			sharedNotes,
			isLoading,
			createNote,
			deleteNote,
			updateNote,
			shareNote,
			unshareNote,
			enableLinkSharing,
			disableLinkSharing,
			getLinkSharedNote
		}}>
			{children}
		</NotesContext.Provider>
	)
}
