import { notesDb } from '../db';

import { userOwnsNote } from '../middleware/userOwnsNote';
import { verifyAuthToken } from '../middleware/verifyAuthToken';

export const unshareNoteRoute = {
	path: '/notes/:noteId/shared-emails/:email',
	method: 'delete',
	middleware: [verifyAuthToken, userOwnsNote],
	handler: async (req, res) => {
		const { noteId, email } = req.params

		const result = await notesDb.findOneAndUpdate({ id: noteId }, {
			$pull: { sharedWith: email }
		}, {
			returnDocument: 'after',
		});

		res.json(result.sharedWith);
	}
}
