import express from 'express';
import * as admin from 'firebase-admin';

import { initializeDbConnection } from './db';
import { routes } from './routes';
// import credentials from '../credentials.json';		// Without env ecret

// admin.initializeApp({ credential: admin.credential.cert(credentials) });		// Without env secret

admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS)) });

const app = express();
app.use(express.json());

const start = async () => {
	await initializeDbConnection();

	routes.forEach(route => {
		app[route.method](route.path, route.handler);
	});

	app.listen(8080, () => {
		console.log('Server is listening on port 8080');
	});
}

start();
