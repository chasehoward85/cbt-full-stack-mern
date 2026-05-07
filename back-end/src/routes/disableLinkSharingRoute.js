import { notesDb } from '../db';

import { loadAuthUserFromTokenMiddleware } from '../middleware/loadAuthUserFromTokenMiddleware';
import { userEmailIsVerifiedMiddleware } from '../middleware/userEmailIsVerifiedMiddleware';
import { userOwnsNoteMiddleware } from '../middleware/userOwnsNoteMiddleware';

export const disableLinkSharingRoute = {
	path: '/notes/:noteId/disable-link-sharing',
	method: 'put',
	middleware: [loadAuthUserFromTokenMiddleware, userEmailIsVerifiedMiddleware, userOwnsNoteMiddleware],
	handler: async (req, res) => {
		const { noteId } = req.params;

		const result = await notesDb.findOneAndUpdate({ id: noteId }, {
			$set: {
				linkSharingEnabled: false,
			},
			$unset: {
				linkSharingHash: ''
			}
		}, {
			returnDocument: 'after'
		});

		res.json(result);
	}
}
