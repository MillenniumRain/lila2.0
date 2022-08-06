import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameState {
	value: number;
}

const initialState: GameState = {
	value: 0,
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		increment: (state) => {},
	},
});

export default gameSlice.reducer;
