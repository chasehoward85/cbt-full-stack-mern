import { notesDb } from '../db';

import { formatSharedNote } from '../util/formatSharedNote';

export const handleNoteDetailConnection = async (socket) => {
	console.log('A new client just connected!');

	const { noteId } = socket.handshake.query;
	const note = await notesDb.findOne({ id: noteId });

	const isOwner = note.createdBy === socket.user.uid;
	const userPermission = note.sharedWith && note.sharedWith.find(setting => setting.id === socket.user.uid);

	if(!isOwner && !userPermission) {
		socket.emit('error', 'User does not have read permission');
		return false;
	}

	socket.join(noteId);
	socket.emit('initialNoteData', formatSharedNote(note, socket.user));

	return true;
}
