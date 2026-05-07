import { userOwnsNote } from '../util/userOwnsNote';

export const userOwnsNoteMiddleware = async (socket) => {
	const authUser = socket.user;
	const { noteId } = socket.params
	const isOwner = await userOwnsNote(authUser.uid, noteId);
	
	if(isOwner) {
		return true;
	}
	else {
		socket.emit('error', 'User does not own note');

		return false;
	}
}
