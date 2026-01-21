import { notesDb } from '../db';

export const listNotesRoute = {
	path: '/notes',
	method: 'get',
	handler: async(req, res) => {
		const notes = await notesDb.find({}).toArray();

		res.json(notes);
	}
}
