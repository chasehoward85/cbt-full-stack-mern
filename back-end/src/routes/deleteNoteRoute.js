import { notesDb, usersDb } from '../db';

import { verifyAuthToken } from '../middleware/verifyAuthToken';

export const deleteNoteRoute = {
	path: '/notes/:noteId',
	method: 'delete',
	middleware: [verifyAuthToken],
	handler: async (req, res) => {
		const authUser = req.user;

		const { noteId } = req.params;

		const note = await notesDb.findOne({ id: noteId });

		if(note.createdBy !== authUser.uid) {
			return res.sendStatus(403);
		}

		await notesDb.deleteOne({ id: noteId });

		await usersDb.updateOne({ id: note.createdBy }, {
			$pull: { notes: note.id },
		});
		
		res.sendStatus(200);
	}
}
