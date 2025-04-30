import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: {token: string | null} = {
    token: null,
}


const authSlice = createSlice({
    name: 'loggedIn',
    initialState,
    reducers : {
        setLoggedIn: (state, action: PayloadAction<{access_token: string}>) => {
            state.token = action.payload.access_token;
        },
        setLoggedOut: (state) => {
            state.token = null;
        }
    }
});

export const {setLoggedIn, setLoggedOut} = authSlice.actions;
export default authSlice.reducer;