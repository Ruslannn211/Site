import {type FC} from "react";
import styled from "styled-components";
import {
    Heart,
    MessageCircle,
    ShoppingCart,
    Star,
} from "lucide-react";
import {useNavigate} from "react-router-dom";
import type {ProductListType} from "@types-lib";
import useProductImage from "@hooks/useProductImage.tsx";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";
import {buildProductPrice} from "@helpers/buildProductPrice.ts";
import useCart from "@hooks/useCart.tsx";
import useFavorite from "@hooks/useFavorite.tsx";

interface Props {
    product: ProductListType;
}

const ProductItem: FC<Props> = (props) => {
    const {product} = props;
    const navigate = useNavigate();

    const image = useProductImage(product.previewImage);
    const cart = useCart();

    const favorite = useFavorite();
    const inFavorite = product ? favorite.isInFavorite(product.id) : false;

    return (
        <ProductCard key={product.id} onClick={() => navigate(`/products/` + String(product.id))}>
            <CardTop>
                {product.badge && (
                    <Badge type={product.badge}>
                        {product.badge}
                    </Badge>
                )}

                <WishlistButton onClick={(e) => {
                    e.stopPropagation();
                    favorite.toggleFavorite(product.id);
                }}>
                    <Heart size={16} fill={inFavorite ? "currentColor" : "transparent"} />
                </WishlistButton>
            </CardTop>

            <ImageWrapper>
                <ProductImage
                    src={image}
                    alt={product.name}
                />
            </ImageWrapper>

            <ProductInfo>
                <Category>
                    {product.category}
                </Category>

                <ProductTitle>
                    {product.name}
                </ProductTitle>

                <RatingRow>
                    <Stars>
                        <StarFill />
                        <RatingValue>
                            {product.rating}
                        </RatingValue>
                    </Stars>
                </RatingRow>

                <PriceBlock>
                    <PriceRow>
                        <CurrentPrice $discount={!!product.discount && product.discount > 0}>
                            {buildNumberFormat(buildProductPrice(product))} ₴
                        </CurrentPrice>

                        <CartButton $disabled={cart.isInCart(product.id)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        cart.addToCart(product.id);
                                    }}
                        >
                            <ShoppingCart size={16} />
                        </CartButton>
                    </PriceRow>

                    {(product.discount ?? 0) > 0 && (
                        <OldPrice>
                            {buildNumberFormat(product.price)} ₴
                        </OldPrice>
                    )}
                </PriceBlock>

                {product.delivery === "free" && (
                    <DeliveryContainer>
                        <Delivery>
                            Безкоштовна доставка
                        </Delivery>
                    </DeliveryContainer>
                )}
            </ProductInfo>
        </ProductCard>
    );
};

export default ProductItem;

const ProductCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    background: white;

    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;

    transition: 0.18s ease;

    box-shadow:
            0 4px 14px rgba(15,23,42,0.04);

    &:hover {
        transform: translateY(-2px);

        border-color: #d6dee8;

        box-shadow:
                0 12px 24px rgba(15,23,42,0.08);
    }
`;

const CardTop = styled.div`
    position: absolute;

    top: 10px;
    left: 10px;
    right: 10px;

    z-index: 5;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Badge = styled.div<{ type: string }>`
    height: 24px;

    padding: 0 10px;

    border-radius: 999px;

    background: ${({type}) => {
    switch (type) {
        case "АКЦІЯ":
            return "#ef4444";
        case "ТОП":
            return "#f59e0b";
        case "NEW":
            return "#7c3aed";
        default:
            return "#111827";
    }
}};

    color: white;

    display: flex;
    align-items: center;

    font-size: 11px;
    font-weight: 800;

    letter-spacing: 0.02em;
`;

const WishlistButton = styled.button`
    width: 30px;
    height: 30px;

    border: none;
    border-radius: 999px;

    background: rgba(255,255,255,0.96);

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    color: #f59e0b;

    box-shadow:
            0 4px 10px rgba(15,23,42,0.08);

    transition: 0.16s ease;

    &:hover {
        transform: scale(1.06);
    }
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 160px;

    background: #f8fafc;

    overflow: hidden;

    border-bottom: 1px solid #edf2f7;
`;

const ProductImage = styled.img`
    width: 100%;
    height: 100%;

    object-fit: contain;

    box-sizing: border-box;

    transition: 0.22s ease;

    ${ProductCard}:hover & {
        transform: scale(1.04);
    }
`;

const ProductInfo = styled.div`
    padding: 14px;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const Category = styled.div`
    font-size: 11px;
    font-weight: 700;

    color: #64748b;

    text-transform: uppercase;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    overflow: hidden;
    text-overflow: ellipsis;

    letter-spacing: 0.04em;
`;

const ProductTitle = styled.div`
    font-size: 14px;
    font-weight: 700;

    color: #0f172a;

    line-height: 1.42;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    
    min-height: 39px;

    overflow: hidden;
    text-overflow: ellipsis;
`;

const RatingRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

`;

const Stars = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const StarFill = styled(Star)`
    width: 14px;
    height: 14px;

    fill: #f59e0b;
    color: #f59e0b;
`;

const RatingValue = styled.div`
    font-size: 12px;
    font-weight: 700;

    color: #0f172a;
`;

const Reviews = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    font-size: 12px;
    font-weight: 600;

    color: #64748b;
`;

const PriceBlock = styled.div`
`;

const OldPrice = styled.div`
    font-size: 13px;
    font-weight: 600;

    color: #94a3b8;

    text-decoration: line-through;
`;

const PriceRow = styled.div`
    margin-top: 2px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

const CurrentPrice = styled.div<{ $discount: boolean }>`
    font-size: 28px;
    font-weight: 900;

    letter-spacing: -0.04em;

    color: ${({$discount}) =>
    $discount ? "#ef4444" : "#0f172a"};
`;

const CartButton = styled.button<{$disabled?: boolean}>`
    width: 40px;
    height: 40px;

    min-width: 40px;

    border: none;
    border-radius: 12px;

    background:
            linear-gradient(
                    135deg,
                    #16a34a 0%,
                    #22c55e 100%
            );

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition: 0.16s ease;

    box-shadow:
            0 6px 14px rgba(34,197,94,0.24);

    &:hover {
        transform: translateY(-1px);
    }

    ${p => p.$disabled && `
        box-shadow: 0 10px 22px rgba(166, 208, 181, 0.22);
        background: linear-gradient(
            135deg,
            #909893 0%,
            #bfc9c4 100%
        );
        
        cursor: default;
        &:hover {
            transform: none;
        }
    `}
`;

const DeliveryContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: end;
`;

const Delivery = styled.div`
    font-size: 12px;
    font-weight: 700;

    color: #16a34a;
`;