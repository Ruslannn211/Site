import {type FC, useMemo} from "react";
import styled from "styled-components";
import {
    CheckCircle2, Clock3, Search, Truck, Wrench,
} from "lucide-react";
import OrderItem from "@admin-pages/repair/src/OrderItem.tsx";
import useRepairsOrdersList from "@hooks/useRepairsOrdersList.tsx";
import StatCardAdmin from "@components/ui/StatCardAdmin.tsx";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";

const RepairsPage: FC = () => {
    const {list: orders, setList: setOrders} = useRepairsOrdersList();

    const totalPrice = useMemo(() => {
        return orders.reduce((acc, order) => (
            acc + (order.price_list.reduce((acc, price) => acc + price.price, 0))
        ), 0);
    }, [orders]);

    const changeStatus = (id: number, status: any) => {
        setOrders(prev => prev.map(o => o.id === id ? ({...o, status}) : o));
    }

    return (
        <Container>
            <TopBar>
                <TopLeft>
                    <PageTitle>
                        Ремонти
                    </PageTitle>

                    <PageDescription>
                        Управління заявками ремонту
                    </PageDescription>
                </TopLeft>

                <SearchBlock>
                    <Search size={16} />

                    <SearchInput
                        placeholder={
                            "Пошук ремонту..."
                        }
                    />
                </SearchBlock>
            </TopBar>

            <StatsGrid>
                <StatCardAdmin icon={<Wrench size={18} />} label={"Всього ремонтів"} value={buildNumberFormat(orders.length)} />
                <StatCardAdmin icon={<Clock3 size={18} />} label={"Нові заявки"} value={buildNumberFormat(
                    orders.filter(o => o.status === "new").length
                )} />
                <StatCardAdmin icon={<Truck size={18} />} label={"В ремонті"} value={buildNumberFormat(
                    orders.filter(o => o.status === "under-repair").length
                )} />
                <StatCardAdmin icon={<CheckCircle2 size={18} />} label={"Дохід ремонту"} value={buildNumberFormat(totalPrice)} />
            </StatsGrid>

            <RepairsList>
                {orders.map(order => (
                    <OrderItem key={order.id} order={order} onChangeStatus={changeStatus} />
                ))}
            </RepairsList>
        </Container>
    );
};

export default RepairsPage;

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

const StatsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 16px;
`;

const RepairsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;