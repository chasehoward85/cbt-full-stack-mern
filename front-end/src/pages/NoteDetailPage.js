import { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import socketIoClient from 'socket.io-client';

import { NoteNotFoundPage } from './NoteNotFoundPage';

import { NotesContext } from '../contexts/NotesContext';

export const NoteDetailPage = ({ isOwner }) => {
	const { notes, sharedNotes, isLoading, updateNote } = useContext(NotesContext);
	
	const { noteId } = useParams();
	const note = [...notes, ...sharedNotes].find(n => n.id === noteId);
	const { role } = note || {};
	const canEdit = role === 'edit';

	const history = useHistory();

	const [socket, setSocket] = useState(null);

	const [isEditing, setIsEditing] = useState(false);
	const [updatedTitle, setUpdatedTitle] = useState((note && note.title) || '');
	const [updatedContent, setUpdatedContent] = useState((note && note.content) || '');

	useEffect(() => {
		const socket = socketIoClient('http://127.0.0.1:8080');

		setSocket(socket);

		return () => socket.disconnect();
	}, []);

	useEffect(() => {
		if(note) {
			setUpdatedTitle(note.title);
			setUpdatedContent(note.content);
		}
	}, [note]);

	const saveChanges = async () => {
		await updateNote(noteId, { title: updatedTitle, content: updatedContent });
		console.log(note);
		setIsEditing(false);
	}

	if(isLoading) {
		return <p>Loading</p>
	}

	if(!note) {
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

			<div className="evenly-spaced">
				<button onClick={() => {
					setUpdatedTitle(note.title);
					setUpdatedContent(note.content);
					setIsEditing(false);
				}}>Cancel</button>
				<button onClick={saveChanges}>Save Changes</button>
			</div>
			</>
		)
	}

	return (
		<>
		<h1>{note.title}</h1>
		{note.content ? <ReactMarkdown>{note.content}</ReactMarkdown> : <p className="weak">This note currently has no content</p>}
		<div className="evenly-spaced">
			{isOwner && <button onClick={() => history.push(`/sharing-settings/${note.id}`)}>Share</button>}
			{(isOwner || canEdit) && <button onClick={() => setIsEditing(true)}>Edit</button>}
		</div>
		</>
	);
}
