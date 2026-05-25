import {type FC} from "react";
import styled from "styled-components";
import type {ProductListType} from "@types-lib";
import useProductImage from "@hooks/useProductImage.tsx";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";
import {buildProductPrice} from "@helpers/buildProductPrice.ts";

interface Props {
    product: ProductListType;
}

const FavoriteProduct: FC<Props> = (props) => {
    const {product} = props;
    const image = useProductImage(product.previewImage);

    return (
        <ProductCard>
            <ProductImage
                src={image}
                alt={product.name}
            />

            <ProductInfo>
                <ProductTitle>
                    {product.name}
                </ProductTitle>
                <ProductPrice>
                    {buildNumberFormat(buildProductPrice(product))} ₴
                </ProductPrice>
            </ProductInfo>
        </ProductCard>
    );
};

export default FavoriteProduct;

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
    gap: 5px;
`;

const ProductTitle = styled.div`
    font-size: 17px;
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