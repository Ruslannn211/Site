import { useEffect, useState } from "react";
import type {ProductListType} from "@types-lib";
import api, {buildUrl} from "@api";

export type ProductsFiltersType = {
    search?: string | null;
    ids?: number[];
    start_price?: number | null;
    end_price?: number | null;
    categories?: string[];
}

const useProductsList = (filters?: ProductsFiltersType) => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<ProductListType[]>([]);

    async function handle() {
        setLoading(true);
        const data = await api.get<ProductListType[]>(buildUrl(
            '/user/products/list', filters ?? {}
        ));
        setLoading(false);

        if (data) {
            setList(data);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        handle();
    }, [filters]);

    return {list, loading};
};

export default useProductsList;
