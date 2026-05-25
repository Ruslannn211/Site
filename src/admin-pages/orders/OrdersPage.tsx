import {type FC, useMemo} from "react";
import styled from "styled-components";
import {
    Package, Truck, CheckCircle2, Clock3, Search,
} from "lucide-react";
import OrderItem from "@admin-pages/orders/src/OrderItem.tsx";
import useOrdersList from "@hooks/useOrdersList.tsx";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";
import StatCardAdmin from "@components/ui/StatCardAdmin.tsx";

const OrdersPage: FC = () => {
    const {list: orders} = useOrdersList();

    const totalPrice = useMemo(() => {
        return orders.reduce((acc, order) => (
            acc + (order.products.reduce((acc, product) => acc + product.price * product.count, 0))
        ), 0);
    }, [orders]);

    return (
        <Container>
            <TopBar>
                <TopLeft>
                    <PageTitle>Замовлення</PageTitle>
                    <PageDescription>Управління замовленнями магазину</PageDescription>
                </TopLeft>
                <TopRight>
                    <SearchBlock>
                        <Search size={16} />
                        <SearchInput placeholder={"Пошук замовлення..."} />
                    </SearchBlock>
                </TopRight>
            </TopBar>

            <StatsGrid>
                <StatCardAdmin icon={<Package size={18} />} label={"Всього замовлень"} value={buildNumberFormat(orders.length)} />
                <StatCardAdmin icon={<Clock3 size={18} />} label={"Нові"} value={buildNumberFormat(
                    orders.filter(o => o.status === "new").length
                )} />
                <StatCardAdmin icon={<Truck size={18} />} label={"Доставка"} value={buildNumberFormat(
                    orders.filter(o => o.status === "delivered").length
                )} />
                <StatCardAdmin icon={<CheckCircle2 size={18} />} label={"Загальний дохід"} value={buildNumberFormat(totalPrice)} />
            </StatsGrid>

            <OrdersList>
                {orders.map(order => (
                    <OrderItem key={order.id} order={order} />
                ))}
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

const OrdersList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;