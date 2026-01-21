import { MongoClient } from 'mongodb';

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

let client = null;
let notesDb = null;

export const initializeDbConnection = async () => {
	client = await MongoClient.connect(DATABASE_URL);

	notesDb = client.db(DATABASE_NAME).collection('notes');
}

export { notesDb };
