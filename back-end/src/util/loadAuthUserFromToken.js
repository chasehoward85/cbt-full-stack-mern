import * as admin from 'firebase-admin';

export const loadAuthUserFromToken = async (authtoken) => {
	try {
		const authUser = await admin.auth().verifyIdToken(authtoken);

		return authUser;
	} catch(e) {
		return null;
	}
}
