import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import * as admin from 'firebase-admin';

import { initializeDbConnection, notesDb } from './db';
import { routes } from './routes';
import { socketConnections } from './socket-connections';

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
	for(let connection of socketConnections) {
		await connection.onConnect(socket);
		connection.eventHandlers.forEach(eventHandler => {
			socket.on(eventHandler.eventName, data => {
				eventHandler.handler(data, socket, io);
			});
		});
	}
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
