import { notesDb, usersDb } from '../db';

import { formatSharedNote } from '../util/formatSharedNote';

export const handleAllNotesConnection = async (socket) => {
	const authUser = socket.user;

	const user = await usersDb.findOne({ id: authUser.uid });
	const ownedNotes = await Promise.all(user.notes.map(id => notesDb.findOne({ id })));

	const sharedWithUserNotes = await notesDb.find({
		sharedWith: {
			$elemMatch: { email: authUser.email },
		}
	}).toArray();

	socket.emit('initialNotes', {
		owned: ownedNotes,
		shared: sharedWithUserNotes.map(note => formatSharedNote(note, user)),
	});
}
