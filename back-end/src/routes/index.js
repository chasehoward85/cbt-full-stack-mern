import { listNotesRoute } from './listNotesRoute';
import { createNoteRoute } from './createNoteRoute';
import { updateNoteRoute } from './updateNoteRoute';
import { deleteNoteRoute } from './deleteNoteRoute';

import { enableLinkSharingRoute } from './enableLinkSharingRoute';
import { disableLinkSharingRoute } from './disableLinkSharingRoute';
import { getNoteByLinkSharingHashRoute } from './getNoteByLinkSharingHashRoute';

import { shareNoteRoute } from './shareNoteRoute';
import { unshareNoteRoute } from './unshareNoteRoute';

import { createUserRoute } from './createUserRoute';
import { verifyEmailRoute } from './verifyEmailRoute';

export const routes = [
	listNotesRoute,
	createNoteRoute,
	updateNoteRoute,
	deleteNoteRoute,

	enableLinkSharingRoute,
	disableLinkSharingRoute,
	getNoteByLinkSharingHashRoute,

	shareNoteRoute,
	unshareNoteRoute,

	createUserRoute,
	verifyEmailRoute,
]
