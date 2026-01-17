import { useState, useContext } from 'react';

import { NotesList } from '../components/NotesList';
import { NewNoteForm } from '../components/NewNoteForm';
import { ConfirmDeleteNoteForm } from '../components/ConfirmDeleteNoteForm';
import { Modal } from '../components/Modal';

import { NotesContext } from '../contexts/NotesContext';

export const NotesPage = () => {
	const { notes, createNote, deleteNote } = useContext(NotesContext);

	const [newNoteModalIsOpen, setNewNoteModalIsOpen] = useState(false);
	const [currentlyDeleteingNoteId, setCurrentlyDeletingNoteId] = useState('');

	return (
		<>
		<Modal isOpen={newNoteModalIsOpen} onRequestClose={() => setNewNoteModalIsOpen(false)}>
			<NewNoteForm onSubmit={title => {
				createNote(title)
				setNewNoteModalIsOpen(false)
			}} />
		</Modal>

		<Modal isOpen={!!currentlyDeleteingNoteId} onRequestClose={() => setCurrentlyDeletingNoteId('')}>
			<ConfirmDeleteNoteForm
				onConfirm={() => {
					deleteNote(currentlyDeleteingNoteId);
					setCurrentlyDeletingNoteId('');
				}}
				onDeny={() => {
					setCurrentlyDeletingNoteId('')
				}} />
		</Modal>

		<h1>My Notes</h1>
		<NotesList notes={notes} onRequestDelete={id => setCurrentlyDeletingNoteId(id)}/>
		<button onClick={() => setNewNoteModalIsOpen(true)}>+ Add a New Note</button>
		</>
	);
}
