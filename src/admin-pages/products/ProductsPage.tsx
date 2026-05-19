import {type FC, useMemo, useState} from "react";
import styled from "styled-components";
import {
    Package,
    Plus,
    Search,
    ShoppingCart,
    Star,
    TrendingUp,
} from "lucide-react";
import ProductModal from "@admin-pages/products/product-modal/ProductModal.tsx";

interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    oldPrice?: number;
    orders: number;
    rating: number;
    reviews: number;
    stock: number;
}

const MOCK_PRODUCTS: Product[] = [
    {
        id: 1,
        title: "iPhone 15 Pro Max 256GB Natural Titanium",
        image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
        price: 62999,
        oldPrice: 68999,
        orders: 182,
        rating: 4.9,
        reviews: 284,
        stock: 12,
    },

    {
        id: 2,
        title: "MacBook Air M3 16GB 512GB",
        image:
            "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
        price: 78499,
        orders: 48,
        rating: 4.8,
        reviews: 74,
        stock: 4,
    },

    {
        id: 3,
        title: "AirPods Pro 2 USB-C",
        image:
            "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1200&auto=format&fit=crop",
        price: 10999,
        oldPrice: 12499,
        orders: 324,
        rating: 4.9,
        reviews: 611,
        stock: 28,
    },

    {
        id: 4,
        title: "Samsung Galaxy S24 Ultra",
        image:
            "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop",
        price: 54999,
        orders: 96,
        rating: 4.7,
        reviews: 128,
        stock: 9,
    },
];

const ProductsPage: FC = () => {
    const [productOpen, setProductOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter(product =>
            product.title
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search]);

    const totalOrders = useMemo(() => {
        return MOCK_PRODUCTS.reduce(
            (acc, product) =>
                acc + product.orders,
            0
        );
    }, []);

    return (
        <Container>
            <TopBar>
                <TopLeft>
                    <PageTitle>
                        Товари
                    </PageTitle>

                    <PageDescription>
                        Управління товарами магазину
                    </PageDescription>
                </TopLeft>

                <TopRight>
                    <SearchBlock>
                        <Search size={16} />

                        <SearchInput
                            value={search}
                            onChange={e =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder={
                                "Пошук товарів..."
                            }
                        />
                    </SearchBlock>

                    <AddButton>
                        <Plus size={18} />

                        Додати товар
                    </AddButton>
                </TopRight>
            </TopBar>

            <StatsGrid>
                <StatCard>
                    <StatIcon>
                        <Package size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            {MOCK_PRODUCTS.length}
                        </StatValue>

                        <StatLabel>
                            Всього товарів
                        </StatLabel>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <StatIcon>
                        <ShoppingCart size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            {totalOrders}
                        </StatValue>

                        <StatLabel>
                            Замовлень
                        </StatLabel>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <StatIcon>
                        <TrendingUp size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            94%
                        </StatValue>

                        <StatLabel>
                            Конверсія
                        </StatLabel>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <StatIcon>
                        <Star size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            4.8
                        </StatValue>

                        <StatLabel>
                            Середній рейтинг
                        </StatLabel>
                    </StatInfo>
                </StatCard>
            </StatsGrid>

            <ProductsList>
                {filteredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        onClick={() => setProductOpen(true)}
                    >
                        <ProductLeft>
                            <ProductImage
                                src={product.image}
                                alt={product.title}
                            />

                            <ProductInfo>
                                <ProductTitle>
                                    {product.title}
                                </ProductTitle>

                                <ProductMeta>
                                    ID: #{product.id}
                                </ProductMeta>

                                <ProductStats>
                                    <ProductStat>
                                        <Star
                                            size={14}
                                        />

                                        {
                                            product.rating
                                        } (
                                        {
                                            product.reviews
                                        }
                                        )
                                    </ProductStat>

                                    <ProductStat>
                                        <ShoppingCart
                                            size={14}
                                        />

                                        {
                                            product.orders
                                        }{" "}
                                        замовлень
                                    </ProductStat>
                                </ProductStats>
                            </ProductInfo>
                        </ProductLeft>

                        <ProductCenter>
                            <StockBadge
                                low={
                                    product.stock <
                                    10
                                }
                            >
                                В наявності:{" "}
                                {product.stock}
                            </StockBadge>
                        </ProductCenter>

                        <ProductRight>
                            {!!product.oldPrice && (
                                <OldPrice>
                                    {product.oldPrice.toLocaleString()} ₴
                                </OldPrice>
                            )}

                            <Price>
                                {product.price.toLocaleString()} ₴
                            </Price>
                        </ProductRight>
                    </ProductCard>
                ))}
            </ProductsList>
            <ProductModal open={productOpen} onClose={() => setProductOpen(false)} />
        </Container>
    );
};

export default ProductsPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;

const TopLeft = styled.div`
    display: flex;
    flex-direction: column;
`;

const PageTitle = styled.div`
    font-size: 34px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #0f172a;
`;

const PageDescription = styled.div`
    margin-top: 8px;

    font-size: 14px;

    color: #64748b;
`;

const TopRight = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`;

const SearchBlock = styled.div`
    width: 320px;
    height: 46px;

    border-radius: 14px;

    background: white;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    gap: 10px;

    padding: 0 14px;

    color: #94a3b8;

    box-sizing: border-box;
`;

const SearchInput = styled.input`
    flex: 1;

    border: none;
    outline: none;

    background: transparent;

    font-size: 14px;
`;

const AddButton = styled.button`
    height: 46px;

    padding: 0 18px;

    border: none;
    border-radius: 14px;

    background:
            linear-gradient(
                    135deg,
                    #16a34a 0%,
                    #22c55e 100%
            );

    color: white;

    display: flex;
    align-items: center;
    gap: 10px;

    font-size: 14px;
    font-weight: 800;

    cursor: pointer;

    box-shadow:
            0 12px 24px rgba(34,197,94,0.20);

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-1px);
    }
`;

const StatsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 16px;
`;

const StatCard = styled.div`
    min-height: 110px;

    padding: 18px;

    border-radius: 20px;

    background: white;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    gap: 16px;

    box-shadow:
            0 10px 24px rgba(15,23,42,0.04);

    box-sizing: border-box;
`;

const StatIcon = styled.div`
    width: 52px;
    height: 52px;

    border-radius: 16px;

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
`;

const StatInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const StatValue = styled.div`
    font-size: 28px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #0f172a;
`;

const StatLabel = styled.div`
    margin-top: 4px;

    font-size: 13px;
    font-weight: 600;

    color: #64748b;
`;

const ProductsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

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