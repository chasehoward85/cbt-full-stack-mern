import express from 'express';

import { initializeDbConnection } from './db';
import { routes } from './routes';

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
