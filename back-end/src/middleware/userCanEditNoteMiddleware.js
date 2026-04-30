import { notesDb } from '../db';

import { userCanEditNote } from '../util/userCanEditNote';

export const userCanEditNoteMiddleware = async (req, res, next) => {
	const authUser = req.user;
	const { noteId } = req.params;


	const canEdit = await userCanEditNote(authUser.uid, noteId);

	if(canEdit) {
		const note = await notesDb.findOne({ id: noteId });
		req.note = note;

		next();
	}
	else {
		res.sendStatus(403);
	}
}
