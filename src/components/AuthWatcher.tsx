import { useEffect } from "react";
import {useAppDispatch, useStore} from "@store";
import {authThunk} from "@store/thunks/global/user/thunks.ts";

export const AuthWatcher = () => {
    const {user, loading} = useStore(s => s.global.user)
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("user", user)
        if (!loading && user) {
            //wsClient.connect(); // или startWSManager()
        }
    }, [user, loading]);

    useEffect(() => {
        dispatch(authThunk());
        console.log("authThunk init")
    }, []);

    return null;
};
