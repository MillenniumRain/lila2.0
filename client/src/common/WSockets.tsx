import React, { ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { gameSlice, getInitialPLayer } from '../store/reducers/GameSlice';
import { interfaceSlice } from '../store/reducers/InterfaceSlice';

interface WSocketsProp {
	children?: ReactNode;
}

const WSockets = ({ children }: WSocketsProp) => {
	const dispatch = useAppDispatch();
	const name = useAppSelector((state) => state.game.name);
	const password = useAppSelector((state) => state.game.password);
	const figure = useAppSelector((state) => state.game.figure);

	const params = useParams();
	const sessionId = params.id || '';

	const initialPLayer = getInitialPLayer({ name, figure });

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
					password,
				})
			);
		};
		socket.onclose = () => {};
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
				case 'authasmaster': {
					if (data.correct) {
						dispatch(gameSlice.actions.authMaster(true));
						dispatch(interfaceSlice.actions.setLoginPopup(false));
					} else {
						dispatch(interfaceSlice.actions.setWrongPassword(data.message));
					}
					break;
				}
			}
		};
	}, [name, password]);
	return <div>{children}</div>;
};

export default WSockets;
