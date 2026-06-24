import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import * as admin from 'firebase-admin';

import { initializeDbConnection } from './db';
import { initializeIo, io } from './io';
import { routes } from './routes';
import { socketConnections } from './socket-connections';

// import credentials from '../credentials.json';		// With env secret

// admin.initializeApp({ credential: admin.credential.cert(credentials) });		// Without env secret

admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS)) });

const app = express();
app.use(express.json());

const server = http.createServer(app);
initializeIo(server);

io.use(async (socket, next) => {
	const connection = await socketConnections.find(connection => connection.name === socket.handshake.query.name);
	for(let middlewareFn of (connection.middleware || [])) {
		const isSuccess = await middlewareFn(socket);

		if(!isSuccess) return;
	}

	next();
});

io.on('connection', async (socket) => {
	const connection = socketConnections.find(connection => connection.name === socket.handshake.query.name);

	const isSuccess = await connection.onConnect(socket);
	if(isSuccess) {
		for(let eventHandler of (connection.eventHandlers || [])) {
			for(let middlewareFn of (eventHandler.middleware || [])) {
				const isSuccess = await middlewareFn(socket);
				if(!isSuccess) return;
			}

			socket.on(eventHandler.eventName, data => {
				eventHandler.handler(data, socket, io);
			});
		};
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
