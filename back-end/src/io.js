import socketIo from 'socket.io';

export let io = null;

export const initializeIo = server => {
	io = socketIo(server, {
		cors: {
			origin: '*',
			methods: '*',
		},
	});
}
