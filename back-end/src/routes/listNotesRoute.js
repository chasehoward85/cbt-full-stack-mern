import { usersDb, notesDb } from '../db';

export const listNotesRoute = {
	path: '/users/:userId/notes',
	method: 'get',
	handler: async(req, res) => {
		const { userId } = req.params;

		const user = await usersDb.findOne({ id: userId });
		
		const notes = await Promise.all(user.notes.map(id => notesDb.findOne({ id })));

		res.json(notes);
	}
}
