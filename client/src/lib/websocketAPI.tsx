export const websocketAPI = {
	connect: (id: number) => {
		const socket = new WebSocket('ws://localhost:5000');
		socket.onopen = () => {
			socket.send(JSON.stringify({ id }));
		};
		socket.onmessage = (event) => {
			console.log(event);
		};
	},
};
