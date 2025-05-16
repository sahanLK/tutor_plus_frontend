import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type activeRoleType = {
    activeRole: "teacher" | "student" | "unknown"
}
const initialState: activeRoleType = {
    activeRole: "teacher"
};

const UIConfigSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setActiveRole: (state, action: PayloadAction<activeRoleType>) => {
            state.activeRole = action.payload.activeRole;
        }
    }
});

export const {setActiveRole} = UIConfigSlice.actions;
export default UIConfigSlice.reducer;
