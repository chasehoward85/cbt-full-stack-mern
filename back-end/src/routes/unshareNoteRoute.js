import { notesDb, usersDb } from '../db';
import { io } from '../io';

import { userOwnsNoteMiddleware } from '../middleware/userOwnsNoteMiddleware';
import { loadAuthUserFromTokenMiddleware } from '../middleware/loadAuthUserFromTokenMiddleware';
import { userEmailIsVerifiedMiddleware } from '../middleware/userEmailIsVerifiedMiddleware';

export const unshareNoteRoute = {
	path: '/notes/:noteId/shared-emails/:email',
	method: 'delete',
	middleware: [loadAuthUserFromTokenMiddleware, userEmailIsVerifiedMiddleware, userOwnsNoteMiddleware],
	handler: async (req, res) => {
		const { noteId, email } = req.params

		const userWithEmail = await usersDb.findOne({ email });

		const result = await notesDb.findOneAndUpdate({ id: noteId }, {
			$pull: { sharedWith: { email } }
		}, {
			returnDocument: 'after',
		});

		io.sockets.sockets.forEach(targetSocket => {
			if(targetSocket.user?.uid === userWithEmail.id) {
				targetSocket.emit('noteUnshared', result.id);
			}
		});

		res.json(result.sharedWith);
	}
}
