import { notesDb, usersDb } from "../db";

export const deleteNoteRoute = {
	path: '/notes/:noteId',
	method: 'delete',
	handler: async (req, res) => {
		const { noteId } = req.params;

		const result = await notesDb.findOneAndDelete({ id: noteId });

		await usersDb.updateOne({ id: result.createdBy }, {
			$pull: { notes: result.id },
		});
		
		res.sendStatus(200);
	}
}
