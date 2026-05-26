import { useEffect, useState } from "react";
import type {ProductRatingType, ProductType} from "@types-lib";
import api from "@api";

const useProductOne = (productId?: number | null) => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<ProductType | null>(null);

    async function handle() {
        if (!productId) return;
        setProduct(null);
        setLoading(true);
        const data = await api.get<ProductType>('/user/products/product/' + String(productId));
        setLoading(false);

        if (data) {
            setProduct(data);
        }
    }

    function addRating(rating: ProductRatingType) {
        if (!product) return;
        setProduct(({...product, ratings: [...product.ratings, rating]}));
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        handle();
    }, [productId]);

    return {product, loading, addRating};
};

export default useProductOne;
