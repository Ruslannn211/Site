import {createSlice} from "@reduxjs/toolkit";

export interface UserState {
    //view_type: "products" | "repair";
}

const initialState: UserState = {
    //view_type: "products"
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        /*updateViewType: (state, action: PayloadAction<UserState['view_type']>) => {
            state.view_type = action.payload;
        },*/
    },
});

export default slice.reducer;
export const {} = slice.actions;