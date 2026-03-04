import { notesDb } from '../db';

export const getNoteByLinkSharingHashRoute = {
	path: '/link-sharing/:linkSharingHash',
	method: 'get',
	middleware: [],
	handler: async (req, res) => {
		const { linkSharingHash } = req.params;

		const note = await notesDb.findOne({ linkSharingHash });

		if(!note) {
			return res.sendStatus(404);
		}

		res.json(note);
	}
}
