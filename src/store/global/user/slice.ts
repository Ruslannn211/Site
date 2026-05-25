import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {UserType} from "@types-lib";
import {authThunk, logoutThunk} from "@store/thunks/global/user/thunks.ts";
import {setAccessToken} from "@tokens";

export interface UserState {
    user: UserType | null;
    loading: boolean;
}

const initialState: UserState = {
    user: null,
    loading: true,
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<{ user: UserType; accessToken: string }>) => {
            if (state.user && state.user.id === action.payload.user.id) {
                state.user = action.payload.user;
            }
        },
        authLoggedIn: (state, action: PayloadAction<{ user: UserType; }>) => {
            state.user = action.payload.user;
        },
        authLoggedOut: (state) => {
            state.user = null;
            setAccessToken(null);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authThunk.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                }
                state.loading = false;
            })
            .addCase(authThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(authThunk.rejected, (state) => {
                state.user = null;
                state.loading = false;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.user = null;
                setAccessToken(null);
            });
    },
});

export default slice.reducer;
export const {updateUser, authLoggedIn, authLoggedOut} = slice.actions;