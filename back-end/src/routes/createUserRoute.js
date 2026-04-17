import * as admin from 'firebase-admin';
import { v4 as uuid } from 'uuid';

import { usersDb } from '../db';


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

		res.json(newUser);
	}
}