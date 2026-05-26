import { useState } from "react";
import api from "@api";

const useRepairOrder = () => {
    const [loading, setLoading] = useState(false);

    async function handle(form: any) {
        setLoading(true);
        const data = await api.post<boolean>('/user/repairs/order-create/', form);
        setLoading(false);
        return data;
    }

    return {handle, loading};
};

export default useRepairOrder;
