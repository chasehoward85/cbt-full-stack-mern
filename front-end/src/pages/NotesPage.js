import { useContext } from 'react';

import { NotesList } from '../components/NotesList';

import { NotesContext } from '../contexts/NotesContext';

export const NotesPage = () => {
	const { notes } = useContext(NotesContext);
	
	return (
		<>
		<h1>My Notes</h1>
		<NotesList notes={notes}/>
		
		<h1>Shared With Me</h1>
		<NotesList notes={notes} />
		</>
	);
}
