import { usersDb } from '../db';
import { verifyAuthToken } from '../middleware/verifyAuthToken';

export const createUserRoute = {
	path: '/users',
	method: 'post',
	middleware: [verifyAuthToken],
	handler: async (req, res) => {
		const authUser = req.user;
		
		const existingUser = await usersDb.findOne({ email: authUser.email });
		if(existingUser) {
			return res.sendStatus(409);
		}

		const newUser = {
			id: authUser.uid,
			email: authUser.email,
			notes: [],
		};

		const result = await usersDb.insertOne(newUser);

		res.json({
			...newUser,
			_id: result.insertedId,
		});
	}
}