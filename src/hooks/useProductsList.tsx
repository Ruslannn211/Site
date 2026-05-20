import { useEffect, useState } from "react";
import type {ProductListType} from "@types-lib";
import api from "@api";

const useProductsList = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<ProductListType[]>([]);

    async function handle() {
        setLoading(true);
        const data = await api.get<ProductListType[]>('/user/products/list');
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

export default useProductsList;
