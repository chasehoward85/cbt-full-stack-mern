import { notesDb } from '../db';

import { userCanEditNote } from '../util/userCanEditNote';

export const userCanEditNoteMiddleware = async (socket) => {
	const authUser = socket.user;
	const { noteId } = socket.handshake.query;


	const canEdit = await userCanEditNote(authUser.uid, noteId);
	
	if(canEdit) {
		return true;
	}
	else {
		socket.emit('error', 'User does not have edit permission');

		return false;
	}
}
