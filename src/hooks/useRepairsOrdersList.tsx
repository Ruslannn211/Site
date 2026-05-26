import { useEffect, useState } from "react";
import type {RepairOrderListType} from "@types-lib";
import api from "@api";

const useRepairsOrdersList = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<RepairOrderListType[]>([]);

    async function handle() {
        setLoading(true);
        const data = await api.get<RepairOrderListType[]>('/admin/orders-repairs/list');
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

export default useRepairsOrdersList;
