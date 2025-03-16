import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Client {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	phoneNumber: string;
	profileImage: string;
	location: {
		name: string;
		latitude: number;
		longitude: number;
		detail: Record<string, string>;
	};
}

interface ClientState {
	client: Client | null;
}

const initialState: ClientState = {
	client: null,
};

const clientSlice = createSlice({
	name: "client",
	initialState,
	reducers: {
		clientLogin: (state, action: PayloadAction<Client>) => {
			state.client = action.payload;
		},
		clientLogout: (state) => {
			state.client = null;
		},
	},
});

export const { clientLogin, clientLogout } = clientSlice.actions;
export default clientSlice.reducer;
