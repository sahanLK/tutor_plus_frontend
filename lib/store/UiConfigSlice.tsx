import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    activeRole: "teacher"
};

const UIConfigSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setActiveRole: (state, action: PayloadAction<{activeRole: "teacher" | "student"}>) => {
            state.activeRole = action.payload.activeRole;
        }
    }
});

export const {setActiveRole} = UIConfigSlice.actions;
export default UIConfigSlice.reducer;
