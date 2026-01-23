import { v4 as uuid } from 'uuid';

import { usersDb, notesDb } from '../db';

export const createNoteRoute = {
	path: '/users/:userId/notes',
	method: 'post',
	handler: async (req, res) => {
		const { userId } = req.params;
		const { title } = req.body;

		const newNoteId = uuid();

		const newNote = {
			id: newNoteId,
			title,
			content: '',
			createdBy: userId,
		}

		const result = await notesDb.insertOne(newNote);

		await usersDb.updateOne({ id: userId }, {
			$push: { notes: newNoteId },
		});

		const mongoId = result.insertedId;

		res.json({
			...newNote,
			_id: mongoId,
		});
	}
}
