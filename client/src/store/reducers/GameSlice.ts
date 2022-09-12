import { getMap } from '../../lib/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import MD5 from 'crypto-js/md5';

export interface IDescription {
	id: number;
	list: string;
}
export interface ICard {
	id: number;
	name: string;
	hexagram: string[];
	description: IDescription[];
	color: string;
	bg: string;
	number_color: string;
	hexagram_color: string;
}

export interface IPlayerParams {
	name: string;
	color: string;
	position: number;
	figure: number;
	turn: boolean;
	dice: number | null;
	disconnected: boolean;
	history: IHistory;
	winner: boolean;
	disappointments: number;
	ignored: boolean;
	purpose: string;
	master: string;
}
export interface IPlayer extends IPlayerParams {
	id: string;
}
export const getInitialPLayer = (newParams: {}) => {
	return {
		name: '',
		color: '#fff',
		position: 0,
		figure: 0,
		turn: false,
		dice: null,
		disconnected: false,
		winner: false,
		ignored: false,
		disappointments: 0,
		master: false,
		purpose: '',
		history: {
			lastId: 0,
			list: [],
		},
		...newParams,
	};
};
interface IHistory {
	lastId: number;
	list: IHistoryList[];
}
export interface IHistoryList {
	id?: number;
	cardId: number;
	thoughtId?: number;
}
interface GameState {
	name: string;
	password: string;
	dice: number;
	id: string;
	gameMap: ICard[];
	players: IPlayer[];
	figure: number;
	sessionId: string;
	socket: WebSocket | null;
	master: boolean;
	masterMoveId: string;
}
interface IPlayerSocket {
	id: string;
	players: IPlayer[];
}
interface MovePayload {
	cardId: number;
	playerId?: string;
}
interface masterSetNamePayload {
	playerId: string;
	name: string;
}
interface masterSetIgnorePayload {
	playerId: string;
	ignored: boolean;
}
interface masterSetDisappointmentsPayload {
	playerId: string;
	disappointments: number;
}

interface masterDeleteThoughtPayload {
	playerId: string;
	thoughtId: number | undefined;
}

interface loginPayload {
	name: string;
	password?: string;
	figure: number;
}
const initialState: GameState = {
	id: '',
	name: '',
	password: '',
	figure: 0,
	dice: 0,
	gameMap: getMap(),
	socket: null,
	sessionId: '',
	master: false,
	players: [],
	masterMoveId: '',
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setSessionId: (state, action: PayloadAction<string>) => {
			state.sessionId = action.payload;
		},
		setSocket: (state, action: PayloadAction<WebSocket>) => {
			state.socket = action.payload;
		},
		updatePlayers: (state, action: PayloadAction<IPlayerSocket>) => {
			state.players = action.payload.players;
			state.id = action.payload.id;
			const index = state.players.findIndex((player) => player.id === action.payload.id);
			index && localStorage.setItem(state.sessionId, JSON.stringify(action.payload.players[index]));
		},
		disconnected: (state) => {
			state.socket?.send(
				JSON.stringify({
					method: 'disconnected',
					sessionId: state.sessionId,
					playerId: state.id,
				})
			);
		},

		//******************************/
		setMasterMovePlayer: (state, action: PayloadAction<string>) => {
			state.masterMoveId = action.payload;
		},
		move: (state, action: PayloadAction<MovePayload>) => {
			const cardId = action.payload.cardId;
			const id = state.masterMoveId || action.payload.playerId || state.id;
			const index = state.players.findIndex((player) => player.id === id);

			if (state.players[index].position === cardId) return;
			if (!state.players[index].turn && !state.master) return;
			if (!state.players[index].turn && state.master && !state.masterMoveId) return;

			state.socket?.send(
				JSON.stringify({
					method: 'setposition_history',
					sessionId: state.sessionId,
					playerId: action.payload.playerId || id,
					position: cardId,
					history: { cardId },
				})
			);
		},

		login: (state, action: PayloadAction<loginPayload>) => {
			state.name = action.payload.name;
			state.figure = action.payload.figure;
			state.password = action.payload.password ? MD5(action.payload.password || '').toString() : '';
		},
		authMaster: (state, action: PayloadAction<boolean>) => {
			if (action.payload) {
				state.master = true;
			}
		},
		setThought: (state, action: PayloadAction<IHistoryList>) => {
			state.socket?.send(
				JSON.stringify({
					method: 'setthought',
					playerId: state.id,
					history: {
						id: action.payload.id,
						thoughtId: action.payload.thoughtId,
					},
				})
			);
		},
		masterDeleteThought: (state, action: PayloadAction<masterDeleteThoughtPayload>) => {
			state.socket?.send(
				JSON.stringify({
					method: 'masterdeletethought',
					sessionId: state.sessionId,
					playerId: action.payload.playerId,
					thoughtId: action.payload.thoughtId,
				})
			);
		},
		setDice: (state, action: PayloadAction<number>) => {
			state.socket?.send(
				JSON.stringify({
					method: 'setdice',
					playerId: state.id,
					dice: action.payload,
				})
			);
			state.dice = action.payload;
		},
		setPlayers: (state, action: PayloadAction<IPlayerSocket>) => {
			const players = action.payload.players;
			state.id = action.payload.id;

			const index = players.findIndex((player) => player.id === action.payload.id);
			if (index > -1) {
				localStorage.setItem(state.sessionId, JSON.stringify(players[index]));
			}
			state.players = players;
		},
		completeTheTurn: (state) => {
			state.socket?.send(
				JSON.stringify({
					method: 'completemove',
					playerId: state.id,
				})
			);
		},
		setTurn: (state, action: PayloadAction<string>) => {
			state.socket?.send(
				JSON.stringify({
					method: 'setturn',
					playerId: action.payload,
				})
			);
		},

		setFigure: (state, action: PayloadAction<number>) => {
			state.figure = action.payload;
		},
		setPurpose: (state, action: PayloadAction<string>) => {
			state.socket?.send(
				JSON.stringify({
					method: 'setpurpose',
					playerId: state.id,
					purpose: action.payload,
				})
			);
		},
		setPLayerName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		masterSetName: (state, action: PayloadAction<masterSetNamePayload>) => {
			state.socket?.send(
				JSON.stringify({
					method: 'mastersetname',
					playerId: action.payload.playerId,
					name: action.payload.name,
				})
			);
		},
		masterSetIgnore: (state, action: PayloadAction<masterSetIgnorePayload>) => {
			state.socket?.send(
				JSON.stringify({
					method: 'mastersetignore',
					playerId: action.payload.playerId,
					ignored: action.payload.ignored,
				})
			);
		},
		masterSetDisappointments: (state, action: PayloadAction<masterSetDisappointmentsPayload>) => {
			state.socket?.send(
				JSON.stringify({
					method: 'mastersetdisappointments',
					playerId: action.payload.playerId,
					disappointments: action.payload.disappointments,
				})
			);
		},
		masterSetNewGame: (state, action: PayloadAction<string>) => {
			state.socket?.send(
				JSON.stringify({
					method: 'mastersetnewgame',
					playerId: action.payload,
				})
			);
		},
	},
});

export default gameSlice.reducer;
