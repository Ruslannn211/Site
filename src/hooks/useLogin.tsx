import { useState } from "react";
import type {UserType} from "@types-lib";
import api from "@api";
import {useAppDispatch} from "@store";
import {authLoggedIn} from "@store/thunks/global/user/slice.ts";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    async function handle(data: {phone_number: string, password: string}) {
        setLoading(true);
        const response = await api.post<UserType>('/login', data);
        setLoading(false);

        if (response) {
            dispatch(authLoggedIn({user: response}));
        }

        return response;
    }

    return {loading, handle};
};

export default useLogin;
