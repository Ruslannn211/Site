import { useState } from "react";
import api from "@api";
import type {RepairOrderListType} from "@types-lib";

const useRepairOrderEditStatus = (orderId?: number | null) => {
    const [loading, setLoading] = useState(false);

    async function handle(status: RepairOrderListType['status']) {
        if (!orderId) return;
        setLoading(true);
        const data = await api.post<RepairOrderListType>('/admin/orders-repairs/edit-status/', {status, id: orderId});
        setLoading(false);
        return data;
    }

    return {handle, loading};
};

export default useRepairOrderEditStatus;
