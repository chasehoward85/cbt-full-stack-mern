import { notesDb, usersDb } from '../db';

import { verifyAuthToken } from '../middleware/verifyAuthToken';
import { userOwnsNote } from '../middleware/userOwnsNote';

export const shareNoteRoute = {
	path: '/notes/:noteId/shared-emails',
	method: 'post',
	middleware: [verifyAuthToken, userOwnsNote],
	handler: async (req, res) => {
		const authUser = req.user;
		const { noteId } = req.params;
		const { email } = req.body;

		if(authUser.email === email) {
			return res.sendStatus(409);
		}

		const userWithEmail = await usersDb.findOne({ email });

		if(!userWithEmail) {
			await res.status(404).json({ message: 'A user with that email does not exist' });
		}

		const result = await notesDb.findOneAndUpdate({ id: noteId }, {
			$push: { sharedWith: { id: userWithEmail.id, email, role: 'view' } },
		}, {
			returnDocument: 'after',
		});

		res.json(result.sharedWith);
	}
}
