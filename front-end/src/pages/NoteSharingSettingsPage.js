import { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { NoteNotFoundPage } from './NoteNotFoundPage';
import { SharedEmails } from '../components/SharedEmails';

import { NotesContext } from '../contexts/NotesContext';

export const NoteSharingSettingsPage = () => {
	const { notes, isLoading } = useContext(NotesContext);
	const history = useHistory();
	
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
		<button className="inverse-button" onClick={() => history.push(`/notes/${noteId}`)}>Back</button>

		<h1>Share "{note.title}"</h1>
		<SharedEmails
			emails={['chase2@gmail.com', 'foo@gmail.com', 'bar@gmail.com']}
			onAdd={email => alert(`Sharing with ${email}`)}
			onDelete={email=> alert(`Removing sharing with ${email}`)} />
		</>
	);
}
