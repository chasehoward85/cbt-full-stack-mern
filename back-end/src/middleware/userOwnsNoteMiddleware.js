import { notesDb } from '../db';
import { userOwnsNote } from '../util/userOwnsNote';

export const userOwnsNoteMiddleware = async (req, res, next) => {
	const authUser = req.user;
	const { noteId } = req.params
	const isOwner = await userOwnsNote(authUser.uid, noteId);
	
	if(!isOwner) {
		return res.sendStatus(403);
	}

	const note = await notesDb.findOne({ id: noteId });
	req.note = note;

	next();
}
