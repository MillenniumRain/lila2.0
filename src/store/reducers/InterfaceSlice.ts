import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInterface {
	historyPopup: boolean;
	thoughtsPopup: boolean;
	activeCard: number | null;
	pickedIdThought: number | null;
	loginPopup: boolean;
	playerName: string;
}
interface ThoughtsPayload {
	visible: boolean;
	activeCard?: number;
	pickedIdThought?: number;
}
interface HistoryPayload {
	visible: boolean;
}
const initialState: IInterface = {
	historyPopup: false,
	thoughtsPopup: false,
	loginPopup: true,
	activeCard: null,
	pickedIdThought: null,
	playerName: '',
};
export const interfaceSlice = createSlice({
	name: 'interface',
	initialState,
	reducers: {
		setActiveId: (state, action: PayloadAction<number>) => {
			state.activeCard = action.payload;
		},
		setHistoryPopup: (state, action: PayloadAction<HistoryPayload>) => {
			state.historyPopup = action.payload.visible;
		},

		setLoginPopup: (state, action: PayloadAction<HistoryPayload>) => {
			state.loginPopup = action.payload.visible;
		},
		setThoughtsPopup: (state, action: PayloadAction<ThoughtsPayload>) => {
			state.thoughtsPopup = action.payload.visible;
			console.log(action.payload.activeCard);

			if (action.payload.activeCard && action.payload.activeCard >= 0) {
				state.activeCard = action.payload.activeCard;
			}
			if (action.payload.pickedIdThought) {
				state.pickedIdThought = action.payload.pickedIdThought;
			}
		},
	},
});

export default interfaceSlice.reducer;
