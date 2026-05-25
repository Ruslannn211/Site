import { useState } from "react";
import type {UserType} from "@types-lib";
import api from "@api";
import {authLoggedIn} from "@store/thunks/global/user/slice.ts";
import {useAppDispatch} from "@store";

type DataType = {
    phone_number: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string | null;
    patronymic: string | null;
}

const useRegistry = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    async function handle(data: DataType) {
        setLoading(true);
        const response = await api.post<UserType>('/registry', data);
        setLoading(false);

        if (response) {
            dispatch(authLoggedIn({user: response}));
        }

        return response;
    }

    return {loading, handle};
};

export default useRegistry;
