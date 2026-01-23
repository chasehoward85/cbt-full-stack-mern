import { notesDb } from '../db';

import { verifyAuthToken } from '../middleware/verifyAuthToken';

export const updateNoteRoute = {
	path: '/notes/:noteId',
	method: 'put',
	middleware: [verifyAuthToken],
	handler: async (req, res) => {
		const authuser = req.user;

		const { noteId } = req.params;
		const { title, content } = req.body;

		const note = await notesDb.findOne({ id: noteId });
		
		if(note.createdBy !== authuser.uid) {
			return res.sendStatus(403);
		}

		const updatedNote = await notesDb.findOneAndUpdate({ id: noteId }, {
			$set: { title, content },
		}, {
			returnDocument: 'after',
		});

		res.json(updatedNote);
	}
}