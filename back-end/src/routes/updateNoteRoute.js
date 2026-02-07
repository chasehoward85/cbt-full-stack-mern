import { notesDb } from '../db';

import { userCanEditNote } from '../middleware/userCanEditNote';
import { verifyAuthToken } from '../middleware/verifyAuthToken';

import { formatSharedNote } from '../util/formatSharedNote';

export const updateNoteRoute = {
	path: '/notes/:noteId',
	method: 'put',
	middleware: [verifyAuthToken, userCanEditNote],
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