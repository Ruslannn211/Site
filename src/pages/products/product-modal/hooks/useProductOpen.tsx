import {useParams} from "react-router-dom";

const useProductOpen = () => {
    const { product } = useParams<{ product: string }>();

    return {
        product: product ? Number(product) : null
    };
};

export default useProductOpen;