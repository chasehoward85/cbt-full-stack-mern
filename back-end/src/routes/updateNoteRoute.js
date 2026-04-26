import { notesDb } from '../db';

import { userCanEditNoteMiddleware } from '../middleware/userCanEditNoteMiddleware';
import { loadAuthUserFromTokenMiddleware } from '../middleware/loadAuthUserFromTokenMiddleware';
import { userEmailIsVerifiedMiddleware } from '../middleware/userEmailIsVerifiedMiddleware';

import { formatSharedNote } from '../util/formatSharedNote';

export const updateNoteRoute = {
	path: '/notes/:noteId',
	method: 'put',
	middleware: [loadAuthUserFromTokenMiddleware, userEmailIsVerifiedMiddleware, userCanEditNoteMiddleware],
	handler: async (req, res) => {
		const { noteId } = req.params;
		const { title, content } = req.body;

		const updatedNote = await notesDb.findOneAndUpdate({ id: noteId }, {
			$set: { title, content },
		}, {
			returnDocument: 'after',
		});

		res.json(formatSharedNote(updatedNote, req.user));
	}
}
