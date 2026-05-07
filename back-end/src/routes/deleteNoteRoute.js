import { notesDb, usersDb } from '../db';

import { userOwnsNoteMiddleware } from '../middleware/userOwnsNoteMiddleware';
import { loadAuthUserFromTokenMiddleware } from '../middleware/loadAuthUserFromTokenMiddleware';
import { userEmailIsVerifiedMiddleware } from '../middleware/userEmailIsVerifiedMiddleware';

export const deleteNoteRoute = {
	path: '/notes/:noteId',
	method: 'delete',
	middleware: [loadAuthUserFromTokenMiddleware, userEmailIsVerifiedMiddleware, userOwnsNoteMiddleware],
	handler: async (req, res) => {
		const { noteId } = req.params;

		const note = req.note;

		await notesDb.deleteOne({ id: noteId });

		await usersDb.updateOne({ id: note.createdBy }, {
			$pull: { notes: note.id },
		});
		
		res.sendStatus(200);
	}
}
