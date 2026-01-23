import * as admin from 'firebase-admin';

export const verifyAuthToken = async (req, res, next) => {
	try {
		const { authtoken } = req.headers;
		const authUser = await admin.auth().verifyIdToken(authtoken);

		req.user = authUser;

		next();
	} catch(e) {
		res.sendStatus(401);
	}
}
