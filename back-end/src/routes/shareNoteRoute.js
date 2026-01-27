import { notesDb, usersDb } from '../db';

import { verifyAuthToken } from '../middleware/verifyAuthToken';
import { userOwnsNote } from '../middleware/userOwnsNote';

export const shareNoteRoute = {
	path: '/notes/:noteId/shared-emails',
	method: 'post',
	middleware: [verifyAuthToken, userOwnsNote],
	handler: async (req, res) => {
		const { noteId } = req.params;
		const { email } = req.body;

		const userWithEmail = await usersDb.findOne({ email });

		if(!userWithEmail) {
			await res.status(404).json({ message: 'A user with that email does not exist' });
		}

		const result = await notesDb.findOneAndUpdate({ id: noteId }, {
			$addToSet: { sharedWith: email },
		});

		res.json(result.sharedWith);
	}
}
