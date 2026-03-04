import { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { NoteNotFoundPage } from './NoteNotFoundPage';
import { SharedEmails } from '../components/SharedEmails';

import { NotesContext } from '../contexts/NotesContext';

export const NoteSharingSettingsPage = () => {
	const { notes, isLoading, shareNote, unshareNote, enableLinkSharing, disableLinkSharing } = useContext(NotesContext);
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

	const onEnableLinkSharing = async () => {
		await enableLinkSharing(noteId);
	}

	const onDisableLinkSharing = async () => {
		await disableLinkSharing(noteId);
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
			<p>{linkSharingEnabled ? `http://localhost:3000/link-sharing/${linkSharingHash}` : 'Link sharing is disabled'}</p>

			{!linkSharingEnabled && <button onClick={onEnableLinkSharing}>Enable Link Sharing</button>}
			{linkSharingEnabled && <button onClick={onDisableLinkSharing}>Disable Link Sharing</button>}
		</div>
		</>
	);
}
