import {type FC} from "react";
import styled from "styled-components";
import type {OrderProductType} from "@types-lib";
import useProductImage from "@hooks/useProductImage.tsx";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";

interface Props {
    product: OrderProductType;
}

const OrdersPage: FC<Props> = ({product}) => {
    const image = useProductImage(product.previewImage);

    return (
        <ProductCard key={product.id}>
            <ProductImage src={image} alt={product.name} />

            <ProductInfo>
                <ProductTitle>{product.name}</ProductTitle>
                <ProductMeta>
                    Кількість: {product.count}
                </ProductMeta>
            </ProductInfo>

            <ProductPrice>
                {buildNumberFormat(product.price)} ₴
            </ProductPrice>
        </ProductCard>
    );
};

export default OrdersPage;

const ProductCard = styled.div`
    min-height: 88px;

    padding: 12px;

    border-radius: 16px;

    background: #f8fafc;

    border: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    gap: 14px;

    box-sizing: border-box;
`;

const ProductImage = styled.img`
    width: 64px;
    height: 64px;

    border-radius: 12px;

    object-fit: cover;

    background: white;
`;

const ProductInfo = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
`;

const ProductTitle = styled.div`
    font-size: 14px;
    font-weight: 800;

    color: #0f172a;
`;

const ProductMeta = styled.div`
    margin-top: 6px;

    font-size: 12px;

    color: #64748b;
`;

const ProductPrice = styled.div`
    font-size: 18px;
    font-weight: 900;

    color: #16a34a;
`;