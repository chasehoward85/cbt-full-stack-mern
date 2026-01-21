export const listNotesRoute = {
	path: '/notes',
	method: 'get',
	handler: async(req, res) => {
		res.json({ message: "It works!" });
		// const notes = await notesDb.find({}).toArray();

		// res.json(notes);
	}
}
