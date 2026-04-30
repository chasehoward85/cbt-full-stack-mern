import { notesDb } from '../db';

export const userCanEditNote = async (userId, noteId) => {
	const note = await notesDb.findOne({ id: noteId });

	const isOwner = note.createdBy === userId;
	const userPermission = note.sharedWith && note.sharedWith.find(setting => setting.id === userId);
	const hasEditAccess = userPermission && userPermission.role === 'edit';

	return isOwner || hasEditAccess
}
