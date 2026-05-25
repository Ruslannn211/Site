import { useState } from "react";
import api from "@api";

const useCreateOrder = () => {
    const [loading, setLoading] = useState(false);

    async function handle(form: any) {
        setLoading(true);
        const data = await api.post<boolean>('/user/orders/create/', form);
        setLoading(false);
        return data;
    }

    return {handle, loading};
};

export default useCreateOrder;
