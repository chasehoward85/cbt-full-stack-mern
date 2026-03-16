import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import * as admin from 'firebase-admin';

import { initializeDbConnection } from './db';
import { routes } from './routes';

// import credentials from '../credentials.json';		// Without env ecret

// admin.initializeApp({ credential: admin.credential.cert(credentials) });		// Without env secret

admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS)) });

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: '*',
		methods: '*',
	}
});

io.on('connection', (socket) => {
	console.log('A new client just connected!');

	socket.on('updateNote', ({ title, content }) => {
		console.log(`The note has been updated to ${title}: ${content}`);
	});
});

const start = async () => {
	await initializeDbConnection();

	routes.forEach(route => {
		app[route.method](route.path, ...route.middleware, route.handler);
	});

	server.listen(8080, () => {
		console.log('Server is listening on port 8080');
	});
}

start();
