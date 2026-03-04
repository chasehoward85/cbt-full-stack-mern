import { notesDb } from '../db';

import { verifyAuthToken } from '../middleware/verifyAuthToken';
import { userEmailIsVerified } from '../middleware/userEmailIsVerified';
import { userOwnsNote } from '../middleware/userOwnsNote';

export const disableLinkSharingRoute = {
	path: '/notes/:noteId/disable-link-sharing',
	method: 'put',
	middleware: [verifyAuthToken, userEmailIsVerified, userOwnsNote],
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
