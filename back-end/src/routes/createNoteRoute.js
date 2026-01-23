import { v4 as uuid } from 'uuid';

import { usersDb, notesDb } from '../db';
import { verifyAuthToken } from '../middleware/verifyAuthToken';

export const createNoteRoute = {
	path: '/users/:userId/notes',
	method: 'post',
	middleware: [verifyAuthToken],
	handler: async (req, res) => {
		const authUser = req.user;
		const { userId } = req.params;
		
		if(authUser.uid !== userId) {
			return res.sendStatus(403);
		}

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
