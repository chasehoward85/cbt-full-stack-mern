import { notesDb } from '../db';

export const updateNoteRoute = {
	path: '/notes/:noteId',
	method: 'put',
	handler: async (req, res) => {
		const { noteId } = req.params;
		const { title, content } = req.body;

		const result = await notesDb.findOneAndUpdate({ id: noteId }, {
			$set: { title, content },
		}, {
			returnDocument: 'after',
		});

		const updatedNote = result;

		res.json(updatedNote);
	}
}