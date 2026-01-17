import { useState, useContext } from 'react';

import { NotesList } from '../components/NotesList';
import { Modal } from '../components/Modal';

import { NotesContext } from '../contexts/NotesContext';

export const NotesPage = () => {
	const { notes } = useContext(NotesContext);

	const [newNoteModalIsOpen, setNewNoteModalIsOpen] = useState(false);

	return (
		<>
		<Modal isOpen={newNoteModalIsOpen} onRequestClose={() => setNewNoteModalIsOpen(false)}>
			<h1>Create Note</h1>
		</Modal>
		<h1>My Notes</h1>
		<NotesList notes={notes}/>
		<button onClick={() => setNewNoteModalIsOpen(true)}>+ Add a New Note</button>
		</>
	);
}
