import {type FC, useMemo} from "react";
import styled from "styled-components";
import useProductImage from "@hooks/useProductImage.tsx";
import type {ProductListType} from "@types-lib";
import useCart from "@hooks/useCart.tsx";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";
import {buildProductPrice} from "@helpers/buildProductPrice.ts";

interface Props {
    product: ProductListType;
}

const ProductItem: FC<Props> = (props) => {
    const {product} = props;
    const image = useProductImage(product.previewImage)
    const {getCartCount} = useCart();
    const count = useMemo(() => getCartCount(product.id), [product, getCartCount]);

    return (
        <ProductCard>
            <ProductImage src={image} alt={product.name} />

            <ProductInfo>
                <ProductTitle>{product.name}</ProductTitle>

                <ProductMeta>
                    {count}{" "}×{" "}
                    {buildNumberFormat(buildProductPrice(product))} ₴
                </ProductMeta>
            </ProductInfo>

            <ProductPrice>
                {buildNumberFormat((buildProductPrice(product) * count))} ₴
            </ProductPrice>
        </ProductCard>
    );
};

export default ProductItem;

const ProductCard = styled.div`
    display: flex;
    gap: 14px;
`;

const ProductImage = styled.img`
    width: 82px;
    height: 82px;

    border-radius: 18px;

    object-fit: cover;

    background: #f8fafc;

    border: 1px solid #edf2f7;
`;

const ProductInfo = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
`;

const ProductTitle = styled.div`
    font-size: 14px;
    font-weight: 800;

    line-height: 1.6;

    color: #0f172a;
`;

const ProductMeta = styled.div`
    margin-top: 8px;

    font-size: 12px;

    color: #64748b;
`;

const ProductPrice = styled.div`
    font-size: 16px;
    font-weight: 900;

    color: #16a34a;
`;