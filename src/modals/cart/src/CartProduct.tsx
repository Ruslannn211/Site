import {type FC, useMemo} from "react";
import styled from "styled-components";
import {
    Minus,
    Plus,
    Trash2,
} from "lucide-react";
import type {ProductListType} from "@types-lib";
import useProductImage from "@hooks/useProductImage.tsx";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";
import {buildProductPrice} from "@helpers/buildProductPrice.ts";
import useCart from "@hooks/useCart.tsx";

interface Props {
    product: ProductListType;
}

const CartProduct: FC<Props> = (props) => {
    const {product} = props;
    const image = useProductImage(product.previewImage);
    const cart = useCart();
    const count = useMemo(() => cart.getCartCount(product.id), [cart.cart]);

    function updateCount(func: "plus" | "minus") {
        if (func === "minus" && count > 1) {
            cart.updateCartCount(product.id, count - 1);
        } else if (func === "plus") {
            cart.updateCartCount(product.id, count + 1);
        }
    }

    return (
        <ProductCard
            key={product.id}
        >
            <ProductImage
                src={image}
                alt={product.name}
            />

            <ProductInfo>
                <ProductTitle>
                    {product.name}
                </ProductTitle>

                <Controls>
                    <FlexContainer>
                        <CountControls>
                            <CountButton onClick={() => updateCount('minus')}>
                                <Minus size={14} />
                            </CountButton>

                            <Count>{count}</Count>

                            <CountButton onClick={() => updateCount('plus')}>
                                <Plus size={14} />
                            </CountButton>
                        </CountControls>
                        <ProductPrice>
                            {buildNumberFormat(buildProductPrice(product))} ₴
                        </ProductPrice>
                    </FlexContainer>

                    <DeleteButton onClick={() => cart.removeFromCart(product.id)}>
                        <Trash2 size={15} />
                    </DeleteButton>
                </Controls>
            </ProductInfo>
        </ProductCard>
    );
};

export default CartProduct;

const ProductCard = styled.div`
    display: flex;
    gap: 16px;

    padding: 14px;

    border-radius: 8px;

    background: #f8fafc;

    border: 1px solid #edf2f7;
`;

const ProductImage = styled.img`
    width: 70px;
    height: 70px;

    border-radius: 18px;

    object-fit: cover;

    background: white;
`;

const ProductInfo = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
`;

const ProductTitle = styled.div`
    font-size: 15px;
    font-weight: 800;

    line-height: 1.5;

    color: #0f172a;
`;

const ProductPrice = styled.div`

    font-size: 24px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #16a34a;
`;

const Controls = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const CountControls = styled.div`
    height: 42px;

    padding: 0 10px;

    border-radius: 14px;

    background: white;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    gap: 12px;
`;

const CountButton = styled.button`
    width: 26px;
    height: 26px;

    border-radius: 8px;

    border: none;

    background: #f1f5f9;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const Count = styled.div`
    min-width: 24px;

    text-align: center;

    font-size: 14px;
    font-weight: 800;

    color: #0f172a;
`;

const DeleteButton = styled.button`
    width: 42px;
    height: 42px;

    border-radius: 14px;

    border: none;

    background: rgba(239,68,68,0.10);

    color: #ef4444;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;