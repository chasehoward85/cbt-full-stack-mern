import { loadAuthUserFromTokenMiddleware } from '../sockets-middleware/loadAuthUserFromToken';
import { userEmailIsVerifiedMiddleware } from '../sockets-middleware/userEmailIsVerifiedMiddleware';

import { handleAllNotesConnection } from '../socket-event-handlers/handleAllNotesConnection';

export const allNotesConnection = {
	name: 'allNotes',
	onConnect: handleAllNotesConnection,
	middleware: [loadAuthUserFromTokenMiddleware, userEmailIsVerifiedMiddleware],
	eventHandlers: [],
}
