import express from 'express';
import { v4 as uuid } from 'uuid';
import { MongoClient } from 'mongodb';

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

const app = express();
app.use(express.json());

let notes = [{
	id: '123',
	title: 'My First Note',
	content: '*Hello my dear friends*'
}];


const start = async () => {
	const client = await MongoClient.connect(`${DATABASE_URL}`);
	const notesDb = client.db(`${DATABASE_NAME}`).collection('notes');

	app.get('/notes', (req, res) => {
		res.json(notes);
	});

	app.post('/notes', (req, res) => {
		const { title } = req.body;

		notes.push({
			id: uuid(),
			title,
			content: '',
		});

		res.json(notes);
	});

	app.put('/notes/:noteId', (req, res) => {
		const { noteId } = req.params;
		const { title, content } = req.body;

		notes = notes.map(note => note.id === noteId ? { id: noteId, title, content } : note);

		res.json(notes);
	});

	app.delete('/notes/:noteId', (req, res) => {
		const { noteId } = req.params;
		notes = notes.filter(note => note.id !== noteId);

		res.json(notes);
	});

	app.listen(8080, () => {
		console.log('Server is listening on port 8080');
	});
}

start();
