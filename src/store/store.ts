import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from './reducers/gameSlice';

export const store = configureStore({
	reducer: {
		counter: gameReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
