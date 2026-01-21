import { notesDb } from '../db';

export const updateNoteRoute = {
	path: '/notes/:noteId',
	method: 'put',
	handler: async (req, res) => {
		const { noteId } = req.params;
		const { title, content } = req.body;

		await notesDb.updateOne({ id: noteId }, {
			$set: { title, content },
		});

		const updatedNotes = await notesDb.find({}).toArray();

		res.json(updatedNotes);
	}
}