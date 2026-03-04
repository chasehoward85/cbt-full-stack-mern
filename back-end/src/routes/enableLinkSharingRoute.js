import { notesDb } from '../db';

import { v4 as uuid } from 'uuid';

import { verifyAuthToken } from '../middleware/verifyAuthToken';
import { userEmailIsVerified } from '../middleware/userEmailIsVerified';
import { userOwnsNote } from '../middleware/userOwnsNote';

export const enableLinkSharingRoute = {
	path: '/notes/:noteId/enable-link-sharing',
	method: 'put',
	middleware: [verifyAuthToken, userEmailIsVerified, userOwnsNote],
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
