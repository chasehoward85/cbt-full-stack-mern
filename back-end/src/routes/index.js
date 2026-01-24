import { listNotesRoute } from './listNotesRoute';
import { createNoteRoute } from './createNoteRoute';
import { updateNoteRoute } from './updateNoteRoute';
import { deleteNoteRoute } from './deleteNoteRoute';

import { createUserRoute } from './createUserRoute';

export const routes = [
	listNotesRoute,
	createNoteRoute,
	updateNoteRoute,
	deleteNoteRoute,

	createUserRoute,
]
