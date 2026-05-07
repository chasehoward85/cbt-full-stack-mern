import { notesDb, usersDb } from '../db';

import { loadAuthUserFromTokenMiddleware } from '../middleware/loadAuthUserFromTokenMiddleware';
import { userOwnsNoteMiddleware } from '../middleware/userOwnsNoteMiddleware';
import { userEmailIsVerifiedMiddleware } from '../middleware/userEmailIsVerifiedMiddleware';

export const shareNoteRoute = {
	path: '/notes/:noteId/shared-emails',
	method: 'post',
	middleware: [loadAuthUserFromTokenMiddleware, userEmailIsVerifiedMiddleware, userOwnsNoteMiddleware],
	handler: async (req, res) => {
		const authUser = req.user;
		const { noteId } = req.params;
		const { email, role } = req.body;

		if(authUser.email === email) {
			return res.sendStatus(409);
		}

		const userWithEmail = await usersDb.findOne({ email });

		if(!userWithEmail) {
			return res.status(404).json({ message: 'A user with that email does not exist' });
		}

		const result = await notesDb.findOneAndUpdate({ id: noteId }, {
			$push: { sharedWith: { id: userWithEmail.id, email, role: role } },
		}, {
			returnDocument: 'after',
		});

		res.json(result.sharedWith);
	}
}
