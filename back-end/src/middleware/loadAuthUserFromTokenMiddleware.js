import { loadAuthUserFromToken } from '../util/loadAuthUserFromToken';

export const loadAuthUserFromTokenMiddleware = async (req, res, next) => {
	const { authtoken } = req.headers;
	const user = await loadAuthUserFromToken(authtoken);

	if(user) {
		req.user = user;
		next();
	}
	else {
		res.sendStatus(401);
	}
}
