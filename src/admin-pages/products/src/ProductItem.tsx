import {type FC} from "react";
import styled from "styled-components";
import {ShoppingCart, Star,} from "lucide-react";
import type {ProductListType} from "@types-lib";
import useProductImage from "@hooks/useProductImage.tsx";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";
import {buildProductPrice} from "@helpers/buildProductPrice.ts";

interface Props {
    product: ProductListType;
    openProduct: () => void;
}

const ProductItem: FC<Props> = (props) => {
    const {product, openProduct} = props;
    const image = useProductImage(product.previewImage);

    return (
        <ProductCard onClick={() => openProduct()}>
            <ProductLeft>
                <ProductImage src={image} alt={product.name} />
                <ProductInfo>
                    <ProductTitle>{product.name}</ProductTitle>
                    <ProductMeta>
                        Код: {product.code}
                    </ProductMeta>

                    <ProductStats>
                        <ProductStat>
                            <Star size={14} />
                            {/*{product.rating} ({product.reviews})*/}
                        </ProductStat>
                        <ProductStat>
                            <ShoppingCart size={14} />
                            {product.orders}{" "}замовлень
                        </ProductStat>
                    </ProductStats>
                </ProductInfo>
            </ProductLeft>

            <ProductCenter>
                <StockBadge low={product.count < 10} >
                    В наявності:{" "}
                    {product.count}
                </StockBadge>
            </ProductCenter>

            <ProductRight>
                {(product.discount ?? 0) > 0 && (
                    <OldPrice>
                        {buildNumberFormat(product.price)} ₴
                    </OldPrice>
                )}

                <Price>
                    {buildNumberFormat(buildProductPrice(product))} ₴
                </Price>
            </ProductRight>
        </ProductCard>
    );
};

export default ProductItem;

const ProductCard = styled.div`
    min-height: 108px;

    padding: 18px;

    border-radius: 22px;

    background: white;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    box-shadow:
            0 10px 24px rgba(15,23,42,0.04);

    box-sizing: border-box;

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-1px);

        box-shadow:
                0 16px 30px rgba(15,23,42,0.06);
    }
`;

const ProductLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    flex: 1;

    min-width: 0;
`;

const ProductImage = styled.img`
    width: 72px;
    height: 72px;

    border-radius: 16px;

    object-fit: cover;

    background: #f8fafc;

    border: 1px solid #edf2f7;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;

    min-width: 0;
`;

const ProductTitle = styled.div`
    font-size: 15px;
    font-weight: 800;

    color: #0f172a;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ProductMeta = styled.div`
    margin-top: 6px;

    font-size: 12px;

    color: #64748b;
`;

const ProductStats = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;

    margin-top: 10px;
`;

const ProductStat = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    font-size: 12px;
    font-weight: 700;

    color: #64748b;
`;

const ProductCenter = styled.div`
    display: flex;
    align-items: center;
`;

const StockBadge = styled.div<{ low?: boolean }>`
    height: 34px;

    padding: 0 14px;

    border-radius: 999px;

    background: ${({ low }) =>
    low
        ? "rgba(245,158,11,0.10)"
        : "rgba(34,197,94,0.10)"};

    color: ${({ low }) =>
    low
        ? "#f59e0b"
        : "#16a34a"};

    display: flex;
    align-items: center;

    font-size: 12px;
    font-weight: 800;
`;

const ProductRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const OldPrice = styled.div`
    font-size: 13px;

    color: #94a3b8;

    text-decoration: line-through;
`;

const Price = styled.div`
    margin-top: 4px;

    font-size: 26px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #16a34a;
`;