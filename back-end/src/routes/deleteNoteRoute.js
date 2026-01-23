import { notesDb, usersDb } from '../db';

import { userOwnsNote } from '../middleware/userOwnsNote';
import { verifyAuthToken } from '../middleware/verifyAuthToken';

export const deleteNoteRoute = {
	path: '/notes/:noteId',
	method: 'delete',
	middleware: [verifyAuthToken, userOwnsNote],
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
