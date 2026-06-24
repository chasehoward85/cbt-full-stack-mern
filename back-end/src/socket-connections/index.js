import { allNotesConnection } from './allNotesConnection';
import { noteDetailConnection } from './noteDetailConnection';

export const socketConnections = [
	allNotesConnection,
	noteDetailConnection,
]
