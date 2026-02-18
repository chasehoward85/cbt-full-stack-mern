export const userEmailIsVerified = async (req, res, next) => {
	if(req.user && req.user.email_verified) {
		next();
	}
	else {
		res.sendStatus(403);
	}
}
