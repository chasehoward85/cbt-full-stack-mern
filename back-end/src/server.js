import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import * as admin from 'firebase-admin';

import { initializeDbConnection, notesDb } from './db';
import { routes } from './routes';

import { formatSharedNote } from './util/formatSharedNote';

// import credentials from '../credentials.json';		// With env secret

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

io.use(async (socket, next) => {
	if(!socket.handshake.query || !socket.handshake.query.token) {
		return socket.emit('error', 'You need to include an auth token');
	}

	try {
		const user = await admin.auth().verifyIdToken(socket.handshake.query.token);
		socket.user = user;

		if(user && user.email_verified) {
			next();
		}
		else {
			socket.emit('error', 'User email not verified');
		}
	} catch(e) {
		socket.emit('error', 'Invalid auth token');
	}
});

io.on('connection', async (socket) => {
	console.log('A new client just connected!');

	const { noteId } = socket.handshake.query;
	const note = await notesDb.findOne({ id: noteId });

	const isOwner = note.createdBy === socket.user.uid;
	const userPermission = note.sharedWith && note.sharedWith.find(setting => setting.id === socket.user.uid);

	if(!isOwner && !userPermission) {
		return socket.emit('error', 'User does not have read permission');
	}

	socket.join(noteId);
	socket.emit('initialNoteData', formatSharedNote(note, socket.user));

	socket.on('updateNote', async ({ title, content }) => {
		const note = await notesDb.findOne({ id: noteId });

		const isOwner = note.createdBy === socket.user.uid;
		const userPermission = note.sharedWith && note.sharedWith.find(setting => setting.id === socket.user.uid);
		const hasEditAccess = userPermission && userPermission.role === 'edit';

		if(!isOwner && !hasEditAccess) {
			return socket.emit('error', 'User does not have edit permission');
		}

		console.log(`The note has been updated to ${title}: ${content}`);
		const updatedNote = await notesDb.findOneAndUpdate({ id: noteId }, {
			$set: { title, content },
		}, {
			returnDocument: 'after',
		});

		const socketIds = await io.in(noteId).allSockets();

		socketIds.forEach(id => {
			const targetSocket = io.sockets.sockets.get(id);
			targetSocket.emit('noteUpdated', formatSharedNote(updatedNote, targetSocket.user));
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
