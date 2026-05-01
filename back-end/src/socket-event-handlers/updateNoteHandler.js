import { notesDb } from '../db';

import { userCanEditNoteMiddleware } from '../sockets-middleware/userCanEditNoteMiddleware';

import { formatSharedNote } from '../util/formatSharedNote';

export const updateNoteHandler = {
	eventName: 'updateNote',
	middleware: [userCanEditNoteMiddleware],
	handler: async (data, socket, io) => {
		const { noteId } = socket.handshake.query;
		const { title, content } = data;
		const note = await notesDb.findOne({ id: noteId });

		const isOwner = note.createdBy === socket.user.uid;
		const userPermission = note.sharedWith && note.sharedWith.find(setting => setting.id === socket.user.uid);
		const hasEditAccess = userPermission && userPermission.role === 'edit';

		if(!isOwner && !hasEditAccess) {
			return socket.emit('error', 'User does not have edit permission');
		}

		console.log(`The note has been updated to ${title}: ${content}`);
		const updatedNote = await notesDb.findOneAndUpdate({ id: noteId }, {
			$set: { title, content },
		}, {
			returnDocument: 'after',
		});

		const socketIds = await io.in(noteId).allSockets();

		socketIds.forEach(id => {
			const targetSocket = io.sockets.sockets.get(id);
			targetSocket.emit('noteUpdated', formatSharedNote(updatedNote, targetSocket.user));
		});
	}
}
