import {type FC, useMemo, useState} from "react";
import styled from "styled-components";
import {
    ChevronDown,
    ChevronUp,
    Package,
    Truck,
    CheckCircle2,
    Clock3,
    Search,
} from "lucide-react";

type OrderStatus =
    | "new"
    | "processing"
    | "delivery"
    | "completed";

interface OrderProduct {
    id: number;
    title: string;
    image: string;
    price: number;
    count: number;
}

interface Order {
    id: number;
    customer: string;
    phone: string;
    city: string;
    createdAt: string;
    status: OrderStatus;
    total: number;
    products: OrderProduct[];
}

const MOCK_ORDERS: Order[] = [
    {
        id: 10492,
        customer: "Іван Петренко",
        phone: "+380 99 123 44 55",
        city: "Запоріжжя",
        createdAt: "18.05.2026 14:32",
        status: "new",
        total: 62999,
        products: [
            {
                id: 1,
                title: "iPhone 15 Pro Max 256GB",
                image:
                    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
                price: 62999,
                count: 1,
            },
        ],
    },

    {
        id: 10491,
        customer: "Олександр Коваль",
        phone: "+380 97 654 11 22",
        city: "Київ",
        createdAt: "18.05.2026 13:10",
        status: "processing",
        total: 89499,
        products: [
            {
                id: 2,
                title: "MacBook Air M3 16GB",
                image:
                    "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
                price: 78499,
                count: 1,
            },

            {
                id: 3,
                title: "Magic Mouse",
                image:
                    "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop",
                price: 11000,
                count: 1,
            },
        ],
    },

    {
        id: 10490,
        customer: "Марина Шевченко",
        phone: "+380 66 111 88 77",
        city: "Дніпро",
        createdAt: "17.05.2026 19:42",
        status: "delivery",
        total: 10999,
        products: [
            {
                id: 4,
                title: "AirPods Pro 2",
                image:
                    "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1200&auto=format&fit=crop",
                price: 10999,
                count: 1,
            },
        ],
    },
];

const OrdersPage: FC = () => {
    const [openedOrders, setOpenedOrders] =
        useState<number[]>([]);

    const [orders, setOrders] =
        useState(MOCK_ORDERS);

    const toggleOrder = (id: number) => {
        setOpenedOrders(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const changeStatus = (
        orderId: number,
        status: OrderStatus
    ) => {
        setOrders(prev =>
            prev.map(order =>
                order.id === orderId
                    ? {...order, status}
                    : order
            )
        );
    };

    const totalIncome = useMemo(() => {
        return orders.reduce(
            (acc, order) => acc + order.total,
            0
        );
    }, [orders]);

    return (
        <Container>
            <TopBar>
                <TopLeft>
                    <PageTitle>
                        Замовлення
                    </PageTitle>

                    <PageDescription>
                        Управління замовленнями магазину
                    </PageDescription>
                </TopLeft>

                <TopRight>
                    <SearchBlock>
                        <Search size={16} />

                        <SearchInput
                            placeholder={
                                "Пошук замовлення..."
                            }
                        />
                    </SearchBlock>
                </TopRight>
            </TopBar>

            <StatsGrid>
                <StatCard>
                    <StatIcon>
                        <Package size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            {orders.length}
                        </StatValue>

                        <StatLabel>
                            Всього замовлень
                        </StatLabel>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <StatIcon>
                        <Clock3 size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            {
                                orders.filter(
                                    o =>
                                        o.status === "new"
                                ).length
                            }
                        </StatValue>

                        <StatLabel>
                            Нові
                        </StatLabel>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <StatIcon>
                        <Truck size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            {
                                orders.filter(
                                    o =>
                                        o.status ===
                                        "delivery"
                                ).length
                            }
                        </StatValue>

                        <StatLabel>
                            Доставка
                        </StatLabel>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <StatIcon>
                        <CheckCircle2 size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            {totalIncome.toLocaleString()} ₴
                        </StatValue>

                        <StatLabel>
                            Загальний дохід
                        </StatLabel>
                    </StatInfo>
                </StatCard>
            </StatsGrid>

            <OrdersList>
                {orders.map(order => {
                    const opened =
                        openedOrders.includes(order.id);

                    return (
                        <OrderCard key={order.id}>
                            <OrderTop>
                                <OrderMain>
                                    <OrderId>
                                        #{order.id}
                                    </OrderId>

                                    <OrderCustomer>
                                        {order.customer}
                                    </OrderCustomer>

                                    <OrderMeta>
                                        {order.phone} •{" "}
                                        {order.city}
                                    </OrderMeta>
                                </OrderMain>

                                <OrderCenter>
                                    <OrderDate>
                                        {order.createdAt}
                                    </OrderDate>

                                    <OrderPrice>
                                        {order.total.toLocaleString()} ₴
                                    </OrderPrice>
                                </OrderCenter>

                                <OrderActions>
                                    <StatusSelect
                                        value={order.status}
                                        onChange={e =>
                                            changeStatus(
                                                order.id,
                                                e.target
                                                    .value as OrderStatus
                                            )
                                        }
                                    >
                                        <option value="new">
                                            Нове
                                        </option>

                                        <option value="processing">
                                            В обробці
                                        </option>

                                        <option value="delivery">
                                            Доставка
                                        </option>

                                        <option value="completed">
                                            Завершено
                                        </option>
                                    </StatusSelect>

                                    <ExpandButton
                                        onClick={() =>
                                            toggleOrder(
                                                order.id
                                            )
                                        }
                                    >
                                        {opened
                                            ? <ChevronUp size={18} />
                                            : <ChevronDown size={18} />
                                        }
                                    </ExpandButton>
                                </OrderActions>
                            </OrderTop>

                            <ProductsWrapper
                                open={opened}
                            >
                                <Products>
                                    {order.products.map(
                                        product => (
                                            <ProductCard
                                                key={
                                                    product.id
                                                }
                                            >
                                                <ProductImage
                                                    src={
                                                        product.image
                                                    }
                                                    alt={
                                                        product.title
                                                    }
                                                />

                                                <ProductInfo>
                                                    <ProductTitle>
                                                        {
                                                            product.title
                                                        }
                                                    </ProductTitle>

                                                    <ProductMeta>
                                                        Кількість:{" "}
                                                        {
                                                            product.count
                                                        }
                                                    </ProductMeta>
                                                </ProductInfo>

                                                <ProductPrice>
                                                    {product.price.toLocaleString()} ₴
                                                </ProductPrice>
                                            </ProductCard>
                                        )
                                    )}
                                </Products>
                            </ProductsWrapper>
                        </OrderCard>
                    );
                })}
            </OrdersList>
        </Container>
    );
};

export default OrdersPage;

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

    color: #0f172a;
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

    box-shadow:
            0 12px 24px rgba(34,197,94,0.20);
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

const OrdersList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const OrderCard = styled.div`
    border-radius: 22px;

    background: white;

    border: 1px solid #e2e8f0;

    overflow: hidden;

    box-shadow:
            0 10px 24px rgba(15,23,42,0.04);
`;

const OrderTop = styled.div`
    min-height: 96px;

    padding: 18px 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    box-sizing: border-box;
`;

const OrderMain = styled.div`
    display: flex;
    flex-direction: column;
`;

const OrderId = styled.div`
    font-size: 14px;
    font-weight: 900;

    color: #16a34a;
`;

const OrderCustomer = styled.div`
    margin-top: 6px;

    font-size: 18px;
    font-weight: 800;

    color: #0f172a;
`;

const OrderMeta = styled.div`
    margin-top: 6px;

    font-size: 13px;

    color: #64748b;
`;

const OrderCenter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const OrderDate = styled.div`
    font-size: 13px;

    color: #64748b;
`;

const OrderPrice = styled.div`
    margin-top: 8px;

    font-size: 24px;
    font-weight: 900;

    letter-spacing: -0.04em;

    color: #0f172a;
`;

const OrderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const StatusSelect = styled.select`
    height: 42px;

    padding: 0 14px;

    border-radius: 12px;

    border: 1px solid #dbe4ee;

    background: #f8fafc;

    font-size: 14px;
    font-weight: 700;

    color: #0f172a;

    outline: none;

    cursor: pointer;
`;

const ExpandButton = styled.button`
    width: 42px;
    height: 42px;

    border-radius: 12px;

    border: 1px solid #e2e8f0;

    background: white;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const ProductsWrapper = styled.div<{ open: boolean }>`
    display: grid;

    grid-template-rows: ${({ open }) =>
    open ? "1fr" : "0fr"};

    transition: 0.22s ease;
`;

const Products = styled.div`
    overflow: hidden;

    padding: 0 20px 20px 20px;

    display: flex;
    flex-direction: column;
    gap: 12px;
`;

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