import { useEffect, useState } from "react";
import api from "@api";

const useCategoriesList = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<string[]>([]);

    async function handle() {
        setLoading(true);
        const data = await api.get<string[]>('/user/categories');
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

export default useCategoriesList;
