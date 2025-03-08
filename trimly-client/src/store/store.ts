import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import clientReducer from "./slices/client.slice";
import barberReducer from "./slices/barber.slice";
import { persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";

const clientPersistConfig = {
	key: "client",
	storage,
};

const barberPersistConfig = {
	key: "barber",
	storage,
};

const rootReducer = combineReducers({
	client: persistReducer(clientPersistConfig, clientReducer),
	barber: persistReducer(barberPersistConfig, barberReducer),
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
