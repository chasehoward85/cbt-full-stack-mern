import { userEmailIsVerified } from '../util/userEmailIsVerified';

export const userEmailIsVerifiedMiddleware = async (req, res, next) => {
	if(req.user && await userEmailIsVerified(req.user)) {
		next();
	}
	else {
		res.sendStatus(403);
	}
}
