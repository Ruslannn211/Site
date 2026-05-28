import { useState } from "react";
import api from "@api";
import type {OrderListType} from "@types-lib";

const useUserAdmin = (userId?: number | null) => {
    const [loading, setLoading] = useState(false);

    async function handle(isAdmin: boolean) {
        if (!userId) return;
        setLoading(true);
        const data = await api.post<OrderListType>('/admin/users/edit/', {id: userId, key: 'isAdmin', value: isAdmin});
        setLoading(false);
        return data;
    }

    return {handle, loading};
};

export default useUserAdmin;
