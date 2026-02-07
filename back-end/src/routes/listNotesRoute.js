import { usersDb, notesDb } from '../db';

import { verifyAuthToken } from '../middleware/verifyAuthToken';
import { formatSharedNote } from '../util/formatSharedNote';

export const listNotesRoute = {
	path: '/users/:userId/notes',
	method: 'get',
	middleware: [verifyAuthToken],
	handler: async(req, res) => {
		const authUser = req.user;

		const { userId } = req.params;

		if(authUser.uid !== userId) {
			return res.sendStatus(403);
		}

		const user = await usersDb.findOne({ id: userId });
		
		const ownedNotes = await Promise.all(user.notes.map(id => notesDb.findOne({ id })));

		const sharedWithUserNotes = await notesDb.find({
			sharedWith: {
				$elemMatch: { email: authUser.email }
			}
		}).toArray();

		const sharedWithUserNotesFormatted = sharedWithUserNotes.map(note => formatSharedNote(note, user));

		res.json({ owned: ownedNotes, shared: sharedWithUserNotesFormatted });
	}
}
