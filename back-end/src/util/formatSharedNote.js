export const formatSharedNote = (note, user) => {
	return {
		...note,
		role: note.sharedWith.find(setting => setting.email === user.email).role,
	};
}