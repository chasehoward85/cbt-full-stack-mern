import * as admin from 'firebase-admin';
import sendgrid from '@sendgrid/mail';
import { v4 as uuid } from 'uuid';

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

		const verificationCode = uuid();

		const newUser = {
			id: user.uid,
			email: email,
			notes: [],
			verificationCode,
		};

		await usersDb.insertOne(newUser);

		const messageData = {
			to: email,
			from: 'chasehoward85@gmail.com',
			subject: 'Email Verification',
			text: `
				Hello! You just signed up for our website.
				Please click this link to verify your email: http://localhost:3000/verify/${verificationCode}
			`
		};

		await sendgrid.send(messageData);

		res.sendStatus(200);
	}
}