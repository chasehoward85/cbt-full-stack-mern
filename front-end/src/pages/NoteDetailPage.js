import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { NoteNotFoundPage } from './NoteNotFoundPage';

import { useNote } from '../hooks/useNote';

export const NoteDetailPage = ({ isOwner }) => {
	const { noteId } = useParams();

	const history = useHistory();

	const { note = {}, isNotFound, error, isLoading, updateTitle, updateContent } = useNote(noteId);
	const { title = '', content = '', role = '' } = note;

	const [isEditing, setIsEditing] = useState(false);

	const canEdit = role === 'edit';

	if(isLoading) {
		return <p>Loading</p>
	}

	if(isNotFound) {
		return <NoteNotFoundPage />
	}

	if(error) {
		return <p className="error">ERROR: {error}</p>
	}
	
	if(isEditing) {
		return (
			<>
			<input
				className="full-width space-below"
				placeholder="Enter a title"
				value={title}
				onChange={e => { updateTitle(e.target.value) }} />

			<textarea
				className="full-width space-below"
				placeholder="Type your note here"
				value={content}
				onChange={e => { updateContent(e.target.value) }} />

			<button onClick={() => setIsEditing(false)}>Done</button>
			</>
		)
	}

	return (
		<>
		<h1>{title}</h1>
		{content ? <ReactMarkdown>{content}</ReactMarkdown> : <p className="weak">This note currently has no content</p>}
		<div className="evenly-spaced">
			{isOwner && <button onClick={() => history.push(`/sharing-settings/${noteId}`)}>Share</button>}
			{(isOwner || canEdit) && <button onClick={() => setIsEditing(true)}>Edit</button>}
		</div>
		</>
	);
}
