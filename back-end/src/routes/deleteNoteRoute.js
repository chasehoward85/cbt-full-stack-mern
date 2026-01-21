import { notesDb } from "../db";

export const deleteNoteRoute = {
	path: '/notes/:noteId',
	method: 'delete',
	handler: async (req, res) => {
		const { noteId } = req.params;

		await notesDb.deleteOne({ id: noteId });
		
		const updatedNotes = await notesDb.find({}).toArray();

		res.json(updatedNotes);
	}
}
