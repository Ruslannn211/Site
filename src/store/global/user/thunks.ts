import {createAsyncThunk} from "@reduxjs/toolkit";
import type {UserType} from "@types-lib";
import api from "@api";

export const authThunk = createAsyncThunk(
    "auth/auth",
    async () => {
        return api.get<UserType>("/auth");
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async () => {
        return await api.delete("/logout");
    }
);