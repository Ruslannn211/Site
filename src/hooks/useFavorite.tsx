import { useMemo } from "react";
import {useLocalStorageState} from "@hooks/useLocalStorageState.tsx";

const useFavorite = () => {
    const [favorite, setFavorite] = useLocalStorageState<number[]>("favorite", []);

    const addToFavorite = (productId: number,) => {
        setFavorite(prev => {
            const exists = prev.find(
                item => item === productId
            );

            if (exists) {
                return prev;
            }

            return [...prev, productId];
        });
    };

    const toggleFavorite = (productId: number,) => {
        setFavorite(prev => {
            const exists = prev.find(
                item => item === productId
            );

            if (exists) {
                return prev.filter(item => item !== productId);
            }

            return [...prev, productId];
        });
    };

    const removeFromFavorite = (productId: number) => {
        setFavorite(prev => prev.filter(item => item !== productId));
    };

    const clearCart = () => {
        setFavorite([]);
    };

    const isInFavorite = (productId: number) => {
        return favorite.some(item => item === productId);
    };

    const favoriteIds = useMemo(() => favorite.map(i => i), [favorite]);

    return {
        favorite,

        toggleFavorite,
        addToFavorite,
        removeFromFavorite,
        clearCart,

        isInFavorite,
        favoriteIds,
    };
};

export default useFavorite;