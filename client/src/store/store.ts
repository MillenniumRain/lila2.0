import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import gameReducer from './reducers/GameSlice';
import interfaceReducer from './reducers/InterfaceSlice';

export const store = configureStore({
	reducer: {
		game: gameReducer,
		interface: interfaceReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['game/setSocket'],
				ignoredPaths: ['game.socket'],
			},
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
