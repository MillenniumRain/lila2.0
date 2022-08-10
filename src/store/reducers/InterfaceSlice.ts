import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInterface {
	historyPopup: boolean;
	thoughtsPopup: boolean;
	activeCard: number | null;
	pickedIdThought: number | null;
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
	activeCard: null,
	pickedIdThought: null,
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
		setThoughtsPopup: (state, action: PayloadAction<ThoughtsPayload>) => {
			state.thoughtsPopup = action.payload.visible;
			if (action.payload.activeCard) {
				state.activeCard = action.payload.activeCard;
			}
			if (action.payload.pickedIdThought) {
				state.pickedIdThought = action.payload.pickedIdThought;
			}
		},
	},
});

export default interfaceSlice.reducer;
