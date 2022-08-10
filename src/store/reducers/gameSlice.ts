import { getMap } from '../../lib/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface IPLayer {
	id: number;
	name: string;
	color: string;
	bg: string;
	position: number;
	figure: number;
	turn: boolean;
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
	id: number;
	gameMap: ICard[];
	players: IPLayer[];
	history: IHistory;
}
const initialState: GameState = {
	id: 3,
	gameMap: getMap(),
	history: {
		lastId: 6,
		list: [
			{ id: 1, cardId: 3, thoughtId: 2 },
			{ id: 2, cardId: 4, thoughtId: 1 },
			{ id: 3, cardId: 34, thoughtId: 4 },
			{ id: 4, cardId: 16, thoughtId: 4 },
			{ id: 5, cardId: 34, thoughtId: 4 },
			{ id: 6, cardId: 16, thoughtId: 4 },
		],
	},
	players: [
		{
			id: 1,
			name: 'Игрок 1',
			color: '#fff',
			bg: '#000',
			position: 2,
			figure: 1,
			turn: false,
		},
		{
			id: 2,
			name: 'Анастасия',
			color: '#000',
			bg: '#fff',
			position: 3,
			figure: 2,
			turn: false,
		},
		{
			id: 3,
			name: 'Никита',
			color: '#ff00ff',
			bg: '#cac',
			position: 2,
			figure: 2,
			turn: true,
		},
	],
};
console.log(initialState.gameMap);
export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		move: (state, action: PayloadAction<number>) => {
			const index = state.players.findIndex((player) => player.id === state.id) || 0;
			state.players[index].position = action.payload;

			const id = state.history.lastId;
			state.history.list.push({ id: id + 1, cardId: action.payload });
			state.history.lastId = id + 1;
		},
		setThought: (state, action: PayloadAction<IHistoryList>) => {
			console.log(action.payload);

			const id = action.payload.id ? action.payload.id : state.history.lastId;
			const index = state.history.list.findIndex((thought) => thought.id === id) || 0;

			if (index > -1) {
				state.history.list[index].thoughtId = action.payload.thoughtId;
			}
		},
	},
});

export default gameSlice.reducer;
