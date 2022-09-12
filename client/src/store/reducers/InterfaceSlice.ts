import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInterface {
	historyPopup: boolean;
	thoughtsPopup: boolean;
	synchronizationPopup: boolean;
	activeCard: number | null;
	pickedIdThought: number | null;
	loginPopup: boolean;
	activePlayerId: string;
	playerName: string;
	rollingDice: boolean;
	instructionsPopup: boolean;
	wrongPasswordMessage: string;
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
	activePlayerId: '',
	historyPopup: false,
	thoughtsPopup: false,
	instructionsPopup: false,
	synchronizationPopup: false,
	loginPopup: true,
	activeCard: null,
	pickedIdThought: null,
	playerName: '',
	rollingDice: false,
	wrongPasswordMessage: '',
};
export const interfaceSlice = createSlice({
	name: 'interface',
	initialState,
	reducers: {
		setActivePlayerId: (state, action: PayloadAction<string>) => {
			state.activePlayerId = action.payload;
		},
		setRollingDice: (state, action: PayloadAction<boolean>) => {
			state.rollingDice = action.payload;
		},
		setActiveCardId: (state, action: PayloadAction<number>) => {
			state.activeCard = action.payload;
		},
		setHistoryPopup: (state, action: PayloadAction<HistoryPayload>) => {
			state.historyPopup = action.payload.visible;
			if (!action.payload.visible) {
				state.activePlayerId = '';
			}
		},

		setWrongPassword: (state, action: PayloadAction<string>) => {
			state.wrongPasswordMessage = action.payload;
		},
		setLoginPopup: (state, action: PayloadAction<boolean>) => {
			state.loginPopup = action.payload;
		},
		setInstructionsPopup: (state, action: PayloadAction<boolean>) => {
			state.instructionsPopup = action.payload;
		},
		setSynchronizationPopup: (state, action: PayloadAction<boolean>) => {
			state.synchronizationPopup = action.payload;
		},
		setThoughtsPopup: (state, action: PayloadAction<ThoughtsPayload>) => {
			state.thoughtsPopup = action.payload.visible;

			if (typeof action.payload.activeCard === 'number' && action.payload.activeCard >= 0) {
				state.activeCard = action.payload.activeCard;
			}
			if (action.payload.pickedIdThought) {
				state.pickedIdThought = action.payload.pickedIdThought;
			}
		},
	},
});

export default interfaceSlice.reducer;
