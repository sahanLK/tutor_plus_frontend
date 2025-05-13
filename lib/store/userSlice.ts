// Info about the logged-In user
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


type userSliceType = { firstName: string | null, lastName: string | null, email: string | null, notifications: string[] }
const initialState:userSliceType  = {
    firstName: null, lastName: null, email: null, notifications: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ firstName: string, lastName: string, email: string, notifications: string[] }>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.notifications = action.payload.notifications;
        },
        removeUser: (state) => {
            state.firstName = null;
            state.lastName = null;
            state.email = null;
            state.notifications = [];
        }
    }
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
