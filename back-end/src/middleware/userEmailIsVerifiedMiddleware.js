export const userEmailIsVerifiedMiddleware = async (req, res, next) => {
	if(req.user && req.user.email_verified) {
		next();
	}
	else {
		res.sendStatus(403);
	}
}
