import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { NoteNotFoundPage } from './NoteNotFoundPage';

import { NotesContext } from '../contexts/NotesContext';

export const NoteSharingSettingsPage = () => {
	const { notes, isLoading } = useContext(NotesContext);
	
	const { noteId } = useParams();
	const note = notes.find(n => n.id === noteId);

	if(isLoading) {
		return <p>Loading</p>
	}

	if(!note) {
		return <NoteNotFoundPage />
	}

	return (
		<>
		<h1>Share "{note.title}"</h1>
		<div>This is the shared emails list</div>
		<div>This is the email sharing form</div>
		</>
	);
}
