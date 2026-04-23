export const formatSharedNote = (note, user) => {
	const matchingSetting = note.sharedWith && note.sharedWith.find(setting => setting.email === user.email);
	
	return {
		...note,
		role: matchingSetting && matchingSetting.role,
	};
}
