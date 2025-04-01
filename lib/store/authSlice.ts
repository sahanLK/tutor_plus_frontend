import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
}


const authSlice = createSlice({
    name: 'loggedIn',
    initialState,
    reducers : {
        setLoggedIn: (state) => {
            state.loggedIn = true;
        },
        setLoggedOut: (state) => {
            state.loggedIn = false;
        }
    }
});

export const {setLoggedIn, setLoggedOut} = authSlice.actions;
export default authSlice.reducer;