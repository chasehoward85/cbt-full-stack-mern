import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { NotesList } from '../components/NotesList';
import { NewNoteForm } from '../components/NewNoteForm';
import { ConfirmDeleteNoteForm } from '../components/ConfirmDeleteNoteForm';
import { Modal } from '../components/Modal';

import { NotesContext } from '../contexts/NotesContext';

export const NotesPage = () => {
	const { isLoading, notes, createNote, deleteNote } = useContext(NotesContext);
	const history = useHistory();

	const [newNoteModalIsOpen, setNewNoteModalIsOpen] = useState(false);
	const [currentlyDeleteingNoteId, setCurrentlyDeletingNoteId] = useState('');

	if(isLoading) {
		return <p>Loading...</p>
	}

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
		{notes.length === 0 && <p className="weak">There are currently no notes, add one!</p>}
		<NotesList notes={notes} onRequestDelete={id => setCurrentlyDeletingNoteId(id)} onClickItem={id => history.push(`/notes/${id}`)}/>
		<button className="full-width" onClick={() => setNewNoteModalIsOpen(true)}>+ Add a New Note</button>
		</>
	);
}
