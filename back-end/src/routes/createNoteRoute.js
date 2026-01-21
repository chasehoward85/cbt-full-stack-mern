import { v4 as uuid } from 'uuid';

import { notesDb } from '../db';

export const createNoteRoute = {
	path: '/notes',
	method: 'post',
	handler: async (req, res) => {
		const { title } = req.body;

		await notesDb.insertOne({
			id: uuid(),
			title,
			content: '',
		});

		const updatedNotes = await notesDb.find({}).toArray();

		res.json(updatedNotes);
	}
}
