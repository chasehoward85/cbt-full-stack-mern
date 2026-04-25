import { updateNoteHandler } from '../socket-event-handlers/updateNoteHandler';
import { handleNoteDetailConnection } from '../socket-event-handlers/handleNoteDetailConnection';

export const noteDetailConnection = {
	name: 'noteDetail',
	onConnect: handleNoteDetailConnection,
	middleware: [],
	eventHandlers: [
		updateNoteHandler,
	],
}
