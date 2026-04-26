import { notesDb } from '../db';

import { userOwnsNoteMiddleware } from '../middleware/userOwnsNoteMiddleware';
import { loadAuthUserFromTokenMiddleware } from '../middleware/loadAuthUserFromTokenMiddleware';
import { userEmailIsVerifiedMiddleware } from '../middleware/userEmailIsVerifiedMiddleware';

export const unshareNoteRoute = {
	path: '/notes/:noteId/shared-emails/:email',
	method: 'delete',
	middleware: [loadAuthUserFromTokenMiddleware, userEmailIsVerifiedMiddleware, userOwnsNoteMiddleware],
	handler: async (req, res) => {
		const { noteId, email } = req.params

		const result = await notesDb.findOneAndUpdate({ id: noteId }, {
			$pull: { sharedWith: { email } }
		}, {
			returnDocument: 'after',
		});

		res.json(result.sharedWith);
	}
}
