import * as admin from 'firebase-admin';

import { usersDb } from '../db';

export const verifyEmailRoute = {
	path: '/email-verification',
	method: 'put',
	middleware: [],
	handler: async (req, res) => {
		const { verificationCode } = req.body;

		const user = await usersDb.findOne({ verificationCode });

		if(!user) {
			return res.sendStatus(404);
		}

		await admin.auth().updateUser(user.id, { emailVerified: true });

		res.sendStatus(200);
	}
}
