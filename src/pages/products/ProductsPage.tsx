import {type FC} from "react";
import styled from "styled-components";
import {
    ChevronLeft,
    ChevronRight,
    Heart,
    MessageCircle,
    ShoppingCart,
    Star,
} from "lucide-react";
import CatalogFilters from "./src/CatalogFilters.tsx";
import {useNavigate} from "react-router-dom";
import ProductModal from "./product-modal/ProductModal.tsx";

interface ProductType {
    id: string;
    title: string;
    image: string;
    category: string;
    rating: number;
    reviews: number;
    price: number;
    oldPrice?: number;
    badge?: string;
}

const PRODUCTS: ProductType[] = [
    {
        id: "apple-iphone-15-pro-max-256gb-natural-titanium",
        title: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop",
        category: "Смартфони",
        rating: 4.9,
        reviews: 284,
        price: 54999,
        oldPrice: 61999,
        badge: "АКЦІЯ",
    },
    {
        id: "sony-wh-1000xm5-black",
        title: "Sony WH-1000XM5 Black",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop",
        category: "Навушники",
        rating: 4.8,
        reviews: 142,
        price: 13999,
        badge: "ТОП",
    },
    {
        id: "macbook-air-m3-13-512gb",
        title: "MacBook Air M3 13” 512GB",
        image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
        category: "Ноутбуки",
        rating: 5,
        reviews: 91,
        price: 62999,
        oldPrice: 68999,
        badge: "NEW",
    },
    {
        id: "playstation-5-slim-digital-edition",
        title: "PlayStation 5 Slim Digital Edition",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200&auto=format&fit=crop",
        category: "Ігрові консолі",
        rating: 4.9,
        reviews: 501,
        price: 23999,
    },
    {
        id: "apple-watch-series-9-midnight",
        title: "Apple Watch Series 9 Midnight",
        image: "https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?q=80&w=1200&auto=format&fit=crop",
        category: "Смарт-годинники",
        rating: 4.7,
        reviews: 86,
        price: 18999,
        oldPrice: 20999,
        badge: "АКЦІЯ",
    },
    {
        id: "samsung-odyssey-g5-27-165hz",
        title: "Samsung Odyssey G5 27” 165Hz",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop",
        category: "Монітори",
        rating: 4.6,
        reviews: 67,
        price: 12999,
    },
];

const ProductsPage: FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <CatalogFilters />

            <Content>
                <TopBlock>
                    <BlockTitle>
                        Товари спеціально для вас
                    </BlockTitle>

                    <BlockDescription>
                        Популярні товари та найкращі пропозиції магазину
                    </BlockDescription>
                </TopBlock>

                <ProductsGrid>
                    {PRODUCTS.map(product => (
                        <ProductCard key={product.id} onClick={() => navigate(product.id)}>
                            <CardTop>
                                {product.badge && (
                                    <Badge type={product.badge}>
                                        {product.badge}
                                    </Badge>
                                )}

                                <WishlistButton>
                                    <Heart size={16} />
                                </WishlistButton>
                            </CardTop>

                            <ImageWrapper>
                                <ProductImage
                                    src={product.image}
                                    alt={product.title}
                                />
                            </ImageWrapper>

                            <ProductInfo>
                                <Category>
                                    {product.category}
                                </Category>

                                <ProductTitle>
                                    {product.title}
                                </ProductTitle>

                                <RatingRow>
                                    <Stars>
                                        <StarFill />
                                        <RatingValue>
                                            {product.rating}
                                        </RatingValue>
                                    </Stars>

                                    <Reviews>
                                        <MessageCircle size={12} />

                                        {product.reviews}
                                    </Reviews>
                                </RatingRow>

                                <PriceBlock>
                                    <PriceRow>
                                        <CurrentPrice
                                            discount={!!product.oldPrice}
                                        >
                                            {product.price.toLocaleString()} ₴
                                        </CurrentPrice>

                                        <CartButton>
                                            <ShoppingCart size={16} />
                                        </CartButton>
                                    </PriceRow>

                                    {product.oldPrice && (
                                        <OldPrice>
                                            {product.oldPrice.toLocaleString()} ₴
                                        </OldPrice>
                                    )}
                                </PriceBlock>

                                <DeliveryContainer>
                                    <Delivery>
                                        Безкоштовна доставка
                                    </Delivery>
                                </DeliveryContainer>
                            </ProductInfo>
                        </ProductCard>
                    ))}
                </ProductsGrid>

                <Pagination>
                    <PaginationButton disabled>
                        <ChevronLeft size={18} />
                    </PaginationButton>

                    {Array.from({length: 2}).map((_, index) => (
                        <PageButton
                            key={index}
                            active={1 === index + 1}
                        >
                            {index + 1}
                        </PageButton>
                    ))}

                    <PaginationButton>
                        <ChevronRight size={18} />
                    </PaginationButton>
                </Pagination>
            </Content>
            <ProductModal />
        </Container>
    );
};

export default ProductsPage;

const Container = styled.div`
    position: relative;
    width: 100%;

    display: flex;
    gap: 18px;

    padding: 18px;

    box-sizing: border-box;

    background: #f8fafc;

    min-height: calc(100vh - 78px);

    overflow: hidden;
`;

const Content = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;

    overflow-y: auto;
`;

const TopBlock = styled.div`
    margin-bottom: 18px;
    margin-top: 4px;
`;

const BlockTitle = styled.div`
    font-size: 28px;
    font-weight: 900;

    letter-spacing: -0.04em;

    color: #0f172a;
`;

const BlockDescription = styled.div`
    margin-top: 4px;

    color: #64748b;

    font-size: 14px;
`;

const ProductsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));

    gap: 8px;
`;

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

const CurrentPrice = styled.div<{ discount: boolean }>`
    font-size: 28px;
    font-weight: 900;

    letter-spacing: -0.04em;

    color: ${({discount}) =>
            discount ? "#ef4444" : "#0f172a"};
`;

const CartButton = styled.button`
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

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    margin-top: 26px;
`;

const PaginationButton = styled.button`
    width: 38px;
    height: 38px;

    border-radius: 10px;

    border: 1px solid #e2e8f0;

    background: white;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const PageButton = styled.button<{ active: boolean }>`
    width: 38px;
    height: 38px;

    border-radius: 10px;

    border: 1px solid ${({active}) =>
    active ? "#111827" : "#e2e8f0"};

    background: ${({active}) =>
    active ? "#111827" : "white"};

    color: ${({active}) =>
    active ? "white" : "#0f172a"};

    font-size: 13px;
    font-weight: 700;

    cursor: pointer;
`;