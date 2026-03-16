import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import * as admin from 'firebase-admin';

import { initializeDbConnection, notesDb } from './db';
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

io.on('connection', async (socket) => {
	console.log('A new client just connected!');

	const { noteId } = socket.handshake.query;
	const note = await notesDb.findOne({ id: noteId });

	socket.emit('initialNoteData', note)

	socket.on('updateNote', async ({ title, content }) => {
		console.log(`The note has been updated to ${title}: ${content}`);
		await notesDb.updateOne({ id: noteId }, {
			$set: { title, content },
		});
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
