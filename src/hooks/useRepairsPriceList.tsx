import { useEffect, useState } from "react";
import api from "@api";
import type {RepairPriceType} from "@types-lib";

const useRepairsPriceList = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<RepairPriceType[]>([]);

    async function handle() {
        setLoading(true);
        const data = await api.get<RepairPriceType[]>('/user/repairs/price');
        setLoading(false);

        if (data) {
            setList(data);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        handle();
    }, []);

    return {list, loading};
};

export default useRepairsPriceList;
