import { notesDb } from '../db';

export const userOwnsNote = async (userId, noteId) => {
	const note = await notesDb.findOne({ id: noteId });
	
	return note.createdBy === userId;
}
