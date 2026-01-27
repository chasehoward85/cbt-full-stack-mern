import { listNotesRoute } from './listNotesRoute';
import { createNoteRoute } from './createNoteRoute';
import { updateNoteRoute } from './updateNoteRoute';
import { deleteNoteRoute } from './deleteNoteRoute';

import { shareNoteRoute } from './shareNoteRoute';
import { unshareNoteRoute } from './unshareNoteRoute';

import { createUserRoute } from './createUserRoute';

export const routes = [
	listNotesRoute,
	createNoteRoute,
	updateNoteRoute,
	deleteNoteRoute,

	shareNoteRoute,
	unshareNoteRoute,

	createUserRoute,
]
