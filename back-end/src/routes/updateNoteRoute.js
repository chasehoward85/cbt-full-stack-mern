import { notesDb } from '../db';

import { userOwnsNote } from '../middleware/userOwnsNote';
import { verifyAuthToken } from '../middleware/verifyAuthToken';

export const updateNoteRoute = {
	path: '/notes/:noteId',
	method: 'put',
	middleware: [verifyAuthToken, userOwnsNote],
	handler: async (req, res) => {
		const { noteId } = req.params;
		const { title, content } = req.body;

		const updatedNote = await notesDb.findOneAndUpdate({ id: noteId }, {
			$set: { title, content },
		}, {
			returnDocument: 'after',
		});

		res.json(updatedNote);
	}
}