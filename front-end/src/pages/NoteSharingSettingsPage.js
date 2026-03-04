import { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { NoteNotFoundPage } from './NoteNotFoundPage';
import { SharedEmails } from '../components/SharedEmails';

import { NotesContext } from '../contexts/NotesContext';

export const NoteSharingSettingsPage = () => {
	const { notes, isLoading, shareNote, unshareNote } = useContext(NotesContext);
	const history = useHistory();
	
	const { noteId } = useParams();
	const note = notes.find(n => n.id === noteId);

	if(isLoading) {
		return <p>Loading</p>
	}

	if(!note) {
		return <NoteNotFoundPage />
	}

	const {linkSharingEnabled, linkSharingHash } = note;

	const enableLinkSharing = async () => {
		alert('Enabling link sharing');
	}

	const disableLinkSharing = async () => {
		alert('Disabling link sharing');
	}

	return (
		<>
		<button className="inverse-button" onClick={() => history.push(`/notes/${noteId}`)}>Back</button>

		<h1>Share "{note.title}"</h1>
		<p className="weak">This note is not currently shared with anyone</p>
		
		<SharedEmails
			sharingSettings={note.sharedWith || []}
			onAdd={({ email, role }) => shareNote(noteId, email, role)}
			onDelete={email=> unshareNote(noteId, email)} />

		<div>
			<p>{linkSharingEnabled ? `http://localhost:8080/link-sharing/${linkSharingHash}` : 'Link sharing is disabled'}</p>

			{!linkSharingEnabled && <button onClick={enableLinkSharing}>Enable Link Sharing</button>}
			{linkSharingEnabled && <button onClick={disableLinkSharing}>Disable Link Sharing</button>}
		</div>
		</>
	);
}
