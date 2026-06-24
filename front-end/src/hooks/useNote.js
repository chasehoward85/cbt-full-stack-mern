import { useState, useEffect } from 'react';
import socketIoClient from 'socket.io-client';

import { useUser } from './useUser';

export const useNote = (noteId) => {
	const [socket, setSocket] = useState(null);

	const { user } = useUser();

	const [isLoading, setIsLoading] = useState(true);
	const [note, setNote] = useState();
	const [isNotFound, setIsNotFound] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		const connectToSocket = async() => {
			const socket = socketIoClient('http://127.0.0.1:8080', {
				query: {
					name: 'noteDetail',
					noteId,
					token: await user.getIdToken(),
				}
			});

			socket.on('initialNoteData', (note) => {
				if(note) {
					setNote(note);
					setIsLoading(false);
				}
				else {
					setIsNotFound(true);
				}
			});

			socket.on('noteUpdated', (updatedNote) => {
				setNote(updatedNote);
			});

			socket.on('error', errorMessage => {
				setError(errorMessage);
			});

			setSocket(socket);
		}

		if(user) {
			connectToSocket();
		}
	}, [user, noteId]);

	useEffect(() => {
		if(socket) {
			return () => socket.disconnect();
		}
	}, [socket]);

	const updateTitle = title => {
		socket.emit('updateNote', {
			title,
			content: note.content,
		});
	}

	const updateContent = content => {
		socket.emit('updateNote', {
			title: note.title,
			content,
		});
	}

	return { note, isLoading, isNotFound, error, updateTitle, updateContent }
}
