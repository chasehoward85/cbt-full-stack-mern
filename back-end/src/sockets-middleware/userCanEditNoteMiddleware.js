import { notesDb } from '../db';

import { userCanEditNote } from '../util/userCanEditNote';

export const userCanEditNoteMiddleware = async (socket) => {
	const authUser = socket.user;
	const { noteId } = socket.handshake.query;


	const canEdit = await userCanEditNote(authUser.uid, noteId);
	
	return canEdit;
}
