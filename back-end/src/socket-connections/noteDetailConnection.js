import { updateNoteHandler } from '../socket-event-handlers/updateNoteHandler';
import { handleNoteDetailConnection } from '../socket-event-handlers/handleNoteDetailConnection';

import { loadAuthUserFromTokenMiddleware } from '../sockets-middleware/loadAuthUserFromToken';

export const noteDetailConnection = {
	name: 'noteDetail',
	onConnect: handleNoteDetailConnection,
	middleware: [loadAuthUserFromTokenMiddleware],
	eventHandlers: [
		updateNoteHandler,
	],
}
