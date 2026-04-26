import { notesDb } from '../db';

import { v4 as uuid } from 'uuid';

import { loadAuthUserFromTokenMiddleware } from '../middleware/loadAuthUserFromTokenMiddleware';
import { userEmailIsVerifiedMiddleware } from '../middleware/userEmailIsVerifiedMiddleware';
import { userOwnsNoteMiddleware } from '../middleware/userOwnsNoteMiddleware';

export const enableLinkSharingRoute = {
	path: '/notes/:noteId/enable-link-sharing',
	method: 'put',
	middleware: [loadAuthUserFromTokenMiddleware, userEmailIsVerifiedMiddleware, userOwnsNoteMiddleware],
	handler: async (req, res) => {
		const { noteId } = req.params;
		const linkSharingHash = uuid();

		const result = await notesDb.findOneAndUpdate({ id: noteId }, {
			$set: {
				linkSharingEnabled: true,
				linkSharingHash,
			}
		}, {
			returnDocument: 'after'
		});

		res.json(result);
	}
}
