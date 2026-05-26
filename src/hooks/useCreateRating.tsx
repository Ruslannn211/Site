import { useState } from "react";
import api from "@api";
import type {ProductRatingType} from "@types-lib";

const useCreateRating = (productId?: number | null) => {
    const [loading, setLoading] = useState(false);

    async function handle(rating: 1|2|3|4|5, comment?: string | null) {
        if (!productId) return;
        setLoading(true);
        const data = await api.post<ProductRatingType>('/user/products/rating/create', {rating, comment, productId});
        setLoading(false);
        return data;
    }

    return {handle, loading};
};

export default useCreateRating;
