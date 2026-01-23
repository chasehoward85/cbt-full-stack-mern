import * as admin from 'firebase-admin';

import { notesDb } from '../db';

export const updateNoteRoute = {
	path: '/notes/:noteId',
	method: 'put',
	handler: async (req, res) => {
		try {
			const { authtoken } = req.headers;
			const authuser = await admin.auth().verifyIdToken(authtoken);

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
		} catch(e) {
			res.sendStatus(401);
		}
	}
}