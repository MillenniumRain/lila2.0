import { figures } from './../../data/figures';
import { websocketAPI } from './../../lib/websocketAPI';
import { getMap } from '../../lib/index';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export interface IPLayer {
	id?: string;
	name: string;
	color: string;
	position: number;
	figure: number;
	turn: boolean;
	dice: number | null;
	disconnected: boolean;
}
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
	dice: number;
	id: string;
	gameMap: ICard[];
	players: IPLayer[];
	history: IHistory;
	figure: number;
	sessionId: string;
	socket: WebSocket | null;
}
interface IPlayerSocket {
	id: string;
	players: IPLayer[];
}
interface MovePayload {
	cardId: number;
	playerId?: string;
}
const initialState: GameState = {
	id: '',
	name: '',
	figure: 0,
	dice: 0,
	gameMap: getMap(),
	socket: null,
	sessionId: '',
	history: {
		lastId: 6,
		list: [],
	},
	players: [],
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

		move: (state, action: PayloadAction<MovePayload>) => {
			const cardId = action.payload.cardId;
			const id = action.payload.playerId || state.id;
			const index = state.players.findIndex((player) => player.id === id) || 0;

			if (state.players[index].position === cardId) return;
			if (!state.players[index].turn) return;

			state.socket?.send(
				JSON.stringify({
					method: 'setposition',
					sessionId: state.sessionId,
					playerId: id,
					position: cardId,
				})
			);

			if (!action.payload.playerId) {
				const lastId = state.history.lastId;
				state.history.list.push({ id: lastId + 1, cardId: cardId });
				state.history.lastId = lastId + 1;
			}
		},
		setThought: (state, action: PayloadAction<IHistoryList>) => {
			const id = action.payload.id ? action.payload.id : state.history.lastId;
			const index = state.history.list.findIndex((thought) => thought.id === id);

			if (index > -1) {
				state.history.list[index].thoughtId = action.payload.thoughtId;
			}
		},
		setDice: (state, action: PayloadAction<number>) => {
			const index = state.players.findIndex((player) => player.id === state.id);
			state.socket?.send(
				JSON.stringify({
					method: 'setdice',
					sessionId: state.sessionId,
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
					sessionId: state.sessionId,
					playerId: state.id,
				})
			);
		},
		setTurn: (state, action: PayloadAction<string>) => {
			state.socket?.send(
				JSON.stringify({
					method: 'setturn',
					sessionId: state.sessionId,
					playerId: action.payload,
				})
			);
		},
		setFigure: (state, action: PayloadAction<number>) => {
			state.figure = action.payload;
		},
		setPLayerName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
	},
});

export default gameSlice.reducer;
