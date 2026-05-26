import { useState } from "react";
import api from "@api";
import type {OrderListType} from "@types-lib";

const useOrderEditStatus = (orderId?: number | null) => {
    const [loading, setLoading] = useState(false);

    async function handle(status: OrderListType['status']) {
        if (!orderId) return;
        setLoading(true);
        const data = await api.post<OrderListType>('/admin/orders/edit-status/', {status, id: orderId});
        setLoading(false);
        return data;
    }

    return {handle, loading};
};

export default useOrderEditStatus;
