import { useEffect, useState } from "react";
import type {OrderListType} from "@types-lib";
import api from "@api";

const useOrdersList = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<OrderListType[]>([]);

    async function handle() {
        setLoading(true);
        const data = await api.get<OrderListType[]>('/admin/orders/list');
        setLoading(false);

        if (data) {
            setList(data);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        handle();
    }, []);

    return {list, loading, setList};
};

export default useOrdersList;
