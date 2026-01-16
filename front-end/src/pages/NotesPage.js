import { NotesList } from '../components/NotesList';

export const NotesPage = ({ notes }) => {
	return (
		<>
		<h1>My Notes</h1>
		<NotesList notes={notes}/>
		
		<h1>Shared With Me</h1>
		<NotesList notes={notes} />
		</>
	);
}
