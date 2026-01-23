import { MongoClient } from 'mongodb';

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

let client = null;

export let notesDb = null;
export let usersDb = null;

export const initializeDbConnection = async () => {
	client = await MongoClient.connect(DATABASE_URL);

	const db = client.db(DATABASE_NAME)
	notesDb = db.collection('notes');
	usersDb = db.collection('users');
}
