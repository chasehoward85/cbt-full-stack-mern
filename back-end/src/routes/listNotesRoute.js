import { usersDb, notesDb } from '../db';

import { verifyAuthToken } from '../middleware/verifyAuthToken';

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
		
		const notes = await Promise.all(user.notes.map(id => notesDb.findOne({ id })));

		res.json(notes);
	}
}
