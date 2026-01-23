import * as admin from 'firebase-admin';

import { notesDb, usersDb } from "../db";

export const deleteNoteRoute = {
	path: '/notes/:noteId',
	method: 'delete',
	handler: async (req, res) => {
		try {
			const { authtoken } = req.headers;
			const authUser = await admin.auth().verifyIdToken(authtoken);

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
		} catch(e) {
			res.sendStatus(401);
		}
	}
}
