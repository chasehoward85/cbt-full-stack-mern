import { userEmailIsVerified } from '../util/userEmailIsVerified';

export const userEmailIsVerifiedMiddleware = async (socket) => {
	if(socket.user && await userEmailIsVerified(socket.user)) {
		return true;
	}
	else {
		socket.emit('error', 'User email not verified');
		
		return false;
	}
}
