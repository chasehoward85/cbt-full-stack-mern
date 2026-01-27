import { useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { NoteNotFoundPage } from './NoteNotFoundPage';

import { NotesContext } from '../contexts/NotesContext';

export const NotesDetailPage = () => {
	const { notes, sharedNotes, isLoading, updateNote } = useContext(NotesContext);
	
	const { noteId } = useParams();
	const note = [...notes, ...sharedNotes].find(n => n.id === noteId);

	const history = useHistory();

	const [isEditing, setIsEditing] = useState(false);
	const [updatedTitle, setUpdatedTitle] = useState((note && note.title) || '');
	const [updatedContent, setUpdatedContent] = useState((note && note.content) || '');

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
			<button onClick={() => history.push(`/sharing-settings/${note.id}`)}>Share</button>
			<button onClick={() => setIsEditing(true)}>Edit</button>
		</div>
		</>
	);
}
