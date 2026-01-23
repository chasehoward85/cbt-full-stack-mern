import * as admin from 'firebase-admin';

import { usersDb, notesDb } from '../db';

export const listNotesRoute = {
	path: '/users/:userId/notes',
	method: 'get',
	handler: async(req, res) => {
		try {
			const { authtoken } = req.headers;
			const authUser = await admin.auth().verifyIdToken(authtoken);

			const { userId } = req.params;

			if(authUser.uid !== userId) {
				return res.sendStatus(403);
			}

			const user = await usersDb.findOne({ id: userId });
			
			const notes = await Promise.all(user.notes.map(id => notesDb.findOne({ id })));

			res.json(notes);
		} catch(e) {
			res.sendStatus(401);
		}
	}
}
