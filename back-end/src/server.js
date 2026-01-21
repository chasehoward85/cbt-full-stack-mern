import express from 'express';
import { v4 as uuid } from 'uuid';
import { MongoClient } from 'mongodb';

import { routes } from './routes';

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

const app = express();
app.use(express.json());

const start = async () => {
	const client = await MongoClient.connect(DATABASE_URL);
	const notesDb = client.db(DATABASE_NAME).collection('notes');

	routes.forEach(route => {
		app[route.method](route.path, route.handler);
	});

	// app.get('/notes', async (req, res) => {
	// 	const notes = await notesDb.find({}).toArray();

	// 	res.json(notes);
	// });

	app.post('/notes', async (req, res) => {
		const { title } = req.body;

		await notesDb.insertOne({
			id: uuid(),
			title,
			content: '',
		});

		const updatedNotes = await notesDb.find({}).toArray();

		res.json(updatedNotes);
	});

	app.put('/notes/:noteId', async (req, res) => {
		const { noteId } = req.params;
		const { title, content } = req.body;

		await notesDb.updateOne({ id: noteId }, {
			$set: { title, content },
		});

		const updatedNotes = await notesDb.find({}).toArray();

		res.json(updatedNotes);
	});

	app.delete('/notes/:noteId', async (req, res) => {
		const { noteId } = req.params;

		await notesDb.deleteOne({ id: noteId });
		
		const updatedNotes = await notesDb.find({}).toArray();

		res.json(updatedNotes);
	});

	app.listen(8080, () => {
		console.log('Server is listening on port 8080');
	});
}

start();
