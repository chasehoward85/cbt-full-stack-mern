import { v4 as uuid } from 'uuid';

import { notesDb } from '../db';

export const createNoteRoute = {
	path: '/notes',
	method: 'post',
	handler: async (req, res) => {
		const { title } = req.body;

		const newNote = {
			id: uuid(),
			title,
			content: '',
		}

		const result = await notesDb.insertOne(newNote);

		const mongoId = result.insertedId;

		res.json({
			...newNote,
			_id: mongoId,
		});
	}
}
