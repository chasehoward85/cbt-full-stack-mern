import { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import socketIoClient from 'socket.io-client';

import { NoteNotFoundPage } from './NoteNotFoundPage';

import { NotesContext } from '../contexts/NotesContext';

export const NoteDetailPage = ({ isOwner }) => {
	const { isLoading } = useContext(NotesContext);
	
	const { noteId } = useParams();

	const history = useHistory();

	const [socket, setSocket] = useState(null);

	const [isEditing, setIsEditing] = useState(false);
	const [updatedTitle, setUpdatedTitle] = useState('');
	const [updatedContent, setUpdatedContent] = useState('');
	const [role, setRole] = useState('');
	const [isNotFound, setIsNotFound] = useState(false);

	const canEdit = role === 'edit';
	
	useEffect(() => {
		const socket = socketIoClient('http://127.0.0.1:8080', { query: { noteId } });
		socket.on('initialNoteData', (note) => {
			if(note) {
				setUpdatedTitle(note.title);
				setUpdatedContent(note.content);
				setRole(note.role);
			}
			else {
				setIsNotFound(true);
			}
		});

		socket.on('noteUpdated', (updatedNote) => {
			setUpdatedTitle(updatedNote.title);
			setUpdatedContent(updatedNote.content);
			setRole(updatedNote.role);
		});

		setSocket(socket);

		return () => socket.disconnect();
	}, [noteId]);

	useEffect(() => {
		if(isEditing && socket) {
			socket.emit('updateNote', {
				title: updatedTitle,
				content: updatedContent,
			});
		}
	}, [isEditing, socket, updatedTitle, updatedContent]);

	if(isLoading) {
		return <p>Loading</p>
	}

	if(isNotFound) {
		return <NoteNotFoundPage />
	}
	
	if(isEditing) {
		return (
			<>
			<input
				className="full-width space-below"
				placeholder="Enter a title"
				value={updatedTitle}
				onChange={e => setUpdatedTitle(e.target.value)} />

			<textarea
				className="full-width space-below"
				placeholder="Type your note here"
				value={updatedContent}
				onChange={e => setUpdatedContent(e.target.value)} />

			<button onClick={() => setIsEditing(false)}>Done</button>
			</>
		)
	}

	return (
		<>
		<h1>{updatedTitle}</h1>
		{updatedContent ? <ReactMarkdown>{updatedContent}</ReactMarkdown> : <p className="weak">This note currently has no content</p>}
		<div className="evenly-spaced">
			{isOwner && <button onClick={() => history.push(`/sharing-settings/${noteId}`)}>Share</button>}
			{(isOwner || canEdit) && <button onClick={() => setIsEditing(true)}>Edit</button>}
		</div>
		</>
	);
}
