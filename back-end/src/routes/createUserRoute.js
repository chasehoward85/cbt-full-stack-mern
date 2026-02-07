import * as admin from 'firebase-admin';
import sendgrid from '@sendgrid/mail';

import { usersDb } from '../db';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const createUserRoute = {
	path: '/users',
	method: 'post',
	middleware: [],
	handler: async (req, res) => {
		const { email, password } = req.body;

		const existingUser = await usersDb.findOne({ email });
		if(existingUser) {
			return res.sendStatus(409);
		}

		const user = await admin.auth().createUser({
			email,
			password,
			emailVerified: false,
		});

		const newUser = {
			id: user.uid,
			email: email,
			notes: [],
		};

		await usersDb.insertOne(newUser);

		const messageData = {
			to: email,
			from: 'chasehoward85@gmail.com',
			subject: 'Email Verification',
			text: 'Hello! You\'ve created an account. That is all'
		};

		await sendgrid.send(messageData);

		res.sendStatus(200);
	}
}