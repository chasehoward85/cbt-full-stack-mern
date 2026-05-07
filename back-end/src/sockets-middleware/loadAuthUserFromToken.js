import { loadAuthUserFromToken } from '../util/loadAuthUserFromToken';

export const loadAuthUserFromTokenMiddleware = async (socket) => {
	if(!socket.handshake.query || !socket.handshake.query.token) {
		socket.emit('error', 'You need to include an auth token');
		
		return false;
	}

	const user = await loadAuthUserFromToken(socket.handshake.query.token);

	if(user) {
		socket.user = user;
		
		return true;
	}
	else {
		socket.emit('error', 'Invalid auth token');

		return false;
	}
}
