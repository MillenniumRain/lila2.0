import React, { ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { gameSlice } from '../store/reducers/GameSlice';

interface WSocketsProp {
	children?: ReactNode;
}

const WSockets = ({ children }: WSocketsProp) => {
	const dispatch = useAppDispatch();
	const name = useAppSelector((state) => state.game.name);
	const figure = useAppSelector((state) => state.game.figure);

	const params = useParams();
	const sessionId = params.id || '';

	const initialPLayer = {
		name,
		color: '#fff',
		position: 0,
		figure,
		turn: false,
		dice: null,
		disconnected: false,
	};
	useEffect(() => {
		if (!name) return;

		const socket = new WebSocket('ws://46.48.112.137:5000');
		dispatch(gameSlice.actions.setSocket(socket));
		dispatch(gameSlice.actions.setSessionId(sessionId));

		socket.onopen = () => {
			const lastGamePlayer = JSON.parse(localStorage.getItem(sessionId) || '{}');
			socket.send(
				JSON.stringify({
					sessionId,
					method: 'connect',
					lastGamePlayer,
					initialPLayer,
				})
			);
		};
		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			switch (data.method) {
				case 'connected': {
					console.log(data);

					dispatch(gameSlice.actions.setPlayers({ id: data.playerId, players: data.players }));
					break;
				}
				case 'update': {
					console.log(data);
					dispatch(gameSlice.actions.updatePlayers({ id: data.playerId, players: data.players }));
					break;
				}
			}
		};
	}, [name]);
	return <>{children}</>;
};

export default WSockets;
