import express from 'express';
import { v4 as uuid } from 'uuid';

const app = express();
app.use(express.json());

let notes = [{
	id: '123',
	title: 'My First Note',
	content: '*Hello my dear friends*'
}];

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

app.listen(8080, () => {
	console.log('Server is listening on port 8080');
});
