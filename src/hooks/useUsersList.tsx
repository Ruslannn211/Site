import { useEffect, useState } from "react";
import type {UserListType} from "@types-lib";
import api from "@api";

const useUsersList = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<UserListType[]>([]);

    async function handle() {
        setLoading(true);
        const data = await api.get<UserListType[]>('/admin/users/list');
        setLoading(false);

        if (data) {
            setList(data);
        }
    }

    function changeAdmin(id: number, isAdmin: boolean) {
        setList(prev => prev.map(user => user.id === id ? ({...user, isAdmin}) : user));
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        handle();
    }, []);

    return {list, loading, setList, changeAdmin};
};

export default useUsersList;
