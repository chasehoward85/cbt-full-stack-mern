import { notesDb } from '../db';

export const userCanEditNote = async (req, res, next) => {
	const authUser = req.user;
	const { noteId } = req.params;

	const note = await notesDb.findOne({ id: noteId });

	const isOwner = note.createdBy !== authUser.uid;
	const userPermission = note.sharedWith && note.sharedWith.find(setting => setting.id === authUser.uid);
	const hasEditAccess = userPermission && userPermission.role === 'edit';

	if(!isOwner && !hasEditAccess) {
		return res.sendStatus(403);
	}

	req.note = note;

	next();
}
