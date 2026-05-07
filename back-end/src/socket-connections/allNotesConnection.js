import { loadAuthUserFromTokenMiddleware } from '../sockets-middleware/loadAuthUserFromToken';
import { userEmailIsVerifiedMiddleware } from '../sockets-middleware/userEmailIsVerifiedMiddleware';

export const allNotesConnection = {
	name: 'allNotes',
	onConnect: () => {},
	middleware: [loadAuthUserFromTokenMiddleware, userEmailIsVerifiedMiddleware],
	eventHandlers: [],
}
