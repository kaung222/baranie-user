import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type MiniUser = {
    username: string;
    email: string;
    phone: string;
    gender: string;
    profilePicture: string;
}

const initialState: MiniUser = {
    email: "",
    username: '',
    phone: '',
    gender: '',
    profilePicture: ''
};

export const userSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        storeUser: (state, action: PayloadAction<MiniUser>) => {
            state = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { storeUser } = userSlice.actions;

export default userSlice.reducer;
