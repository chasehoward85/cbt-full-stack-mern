import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { NoteNotFoundPage } from './NoteNotFoundPage';

import { NotesContext } from '../contexts/NotesContext';

export const NoteDetailPageLinkSharing = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [note, setNote] = useState();

	const { getLinkSharedNote } = useContext(NotesContext);
	const { linkSharingHash } = useParams();

	useEffect(() => {
		const loadNote = async() => {
			const note = await getLinkSharedNote(linkSharingHash);
			
			setNote(note);
			setIsLoading(false);
		}

		loadNote();
	}, [getLinkSharedNote, linkSharingHash]);

	if(isLoading) {
		return <p>Loading</p>
	}

	if(!note) {
		return <NoteNotFoundPage />
	}

	return (
		<>
		<h1>{note.title}</h1>
		{note.content ? <ReactMarkdown>{note.content}</ReactMarkdown> : <p className="weak">This note currently has no content</p>}
		</>
	);
}
