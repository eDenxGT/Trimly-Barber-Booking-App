import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Barber {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
}

interface BarberState {
	barber: Barber | null;
}

const initialState: BarberState = {
	barber: null,
};

const barberSlice = createSlice({
	name: "barber",
	initialState,
	reducers: {
		barberLogin: (state, action: PayloadAction<Barber>) => {
			state.barber = action.payload;
		},
		barberLogout: (state) => {
			state.barber = null;
		},
	},
});

export const { barberLogin, barberLogout } = barberSlice.actions;
export default barberSlice.reducer;
