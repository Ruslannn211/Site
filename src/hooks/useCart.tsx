import { useMemo } from "react";
import {useLocalStorageState} from "@hooks/useLocalStorageState.tsx";

export interface CartItem {
    productId: number;
    count: number;
}

const useCart = () => {
    const [cart, setCart] = useLocalStorageState<CartItem[]>(
        "cart",
        []
    );

    const addToCart = (
        productId: number,
        count: number = 1
    ) => {
        setCart(prev => {
            const exists = prev.find(
                item => item.productId === productId
            );

            if (exists) {
                return prev.map(item =>
                    item.productId === productId
                        ? {
                            ...item,
                            count: item.count + count
                        }
                        : item
                );
            }

            return [
                ...prev,
                {
                    productId,
                    count,
                },
            ];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prev =>
            prev.filter(
                item => item.productId !== productId
            )
        );
    };

    const updateCartCount = (
        productId: number,
        count: number
    ) => {
        // если 0 или меньше — удаляем
        if (count <= 0) {
            removeFromCart(productId);
            return;
        }

        setCart(prev =>
            prev.map(item =>
                item.productId === productId
                    ? {
                        ...item,
                        count,
                    }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (productId: number) => {
        return cart.some(
            item => item.productId === productId
        );
    };

    const getCartItem = (productId: number) => {
        return cart.find(
            item => item.productId === productId
        );
    };

    const getCartCount = (productId: number) => {
        return (
            cart.find(
                item => item.productId === productId
            )?.count || 0
        );
    };

    const totalItems = useMemo(() => {
        return cart.reduce(
            (acc, item) => acc + item.count,
            0
        );
    }, [cart]);

    const cartIds = useMemo(
        () => cart.map(i => i.productId),
        [cart]
    );

    return {
        cart,

        addToCart,
        removeFromCart,
        updateCartCount,
        clearCart,

        isInCart,
        getCartItem,
        getCartCount,

        totalItems,
        cartIds,
    };
};

export default useCart;