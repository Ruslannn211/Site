import {type FC, useMemo, useState} from "react";
import styled from "styled-components";
import {
    Smartphone,
    ChevronDown,
    ChevronUp,
    AlertTriangle,
} from "lucide-react";
import type {RepairOrderListType} from "@types-lib";
import OrderPriceItem from "@admin-pages/repair/src/OrderPriceItem.tsx";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";

interface Props {
    order: RepairOrderListType;
}

const OrderItem: FC<Props> = ({order}) => {
    const [opened, setOpened] = useState(false);

    function toggleOpened() {
        setOpened(prevState => !prevState);
    }

    const changeStatus = (status: RepairOrderListType['status']) => {

    };

    const totalPrice = useMemo(() => {
        return order.price_list.reduce((acc, product) => acc + product.price, 0);
    }, [order.price_list]);

    return (
        <RepairCard key={order.id}>
            <RepairTop>
                <RepairMain>
                    <RepairId>#{order.id}</RepairId>
                    <RepairCustomer>
                        {order.client_name}
                    </RepairCustomer>
                    <RepairMeta>
                        {order.phone_number}
                    </RepairMeta>
                </RepairMain>

                <RepairDevice>
                    <DeviceIcon>
                        <Smartphone size={16} />
                    </DeviceIcon>

                    <DeviceInfo>
                        <DeviceTitle>
                            {order.phone_model}
                        </DeviceTitle>
                        <DeviceDate>
                            {order.createdAt}
                        </DeviceDate>
                    </DeviceInfo>
                </RepairDevice>

                <RepairPrice>
                    {buildNumberFormat(totalPrice)} ₴
                </RepairPrice>

                <RepairActions>
                    <StatusSelect
                        value={order.status}
                        onChange={e =>
                            changeStatus(e.target.value as RepairOrderListType['status'])
                        }
                    >
                        <option value="new">Нова заявка</option>
                        <option value="diagnostics">Діагностика</option>
                        <option value="under-repair">В ремонті</option>
                        <option value="awaiting-details">Очікує деталі</option>
                        <option value="completed">Завершено</option>
                    </StatusSelect>

                    <ExpandButton onClick={toggleOpened}>
                        {opened ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </ExpandButton>
                </RepairActions>
            </RepairTop>

            <ExpandWrapper
                open={opened}
            >
                <ExpandContent>
                    {order.description && (
                        <CommentBlock>
                            <CommentHeader>
                                <AlertTriangle size={16} />
                                Опис проблеми
                            </CommentHeader>
                            <CommentText>{order.description}</CommentText>
                        </CommentBlock>
                    )}

                    <ServicesBlock>
                        <ServicesTitle>
                            Послуги ремонту
                        </ServicesTitle>

                        <ServicesList>
                            {order.price_list.map(price => (
                                <OrderPriceItem key={price.id} price={price} />
                            ))}
                        </ServicesList>
                    </ServicesBlock>
                </ExpandContent>
            </ExpandWrapper>
        </RepairCard>
    );
};

export default OrderItem;

const RepairCard = styled.div`
    border-radius: 22px;

    background: white;

    border: 1px solid #e2e8f0;

    overflow: hidden;

    box-shadow:
            0 10px 24px rgba(15,23,42,0.04);
`;

const RepairTop = styled.div`
    min-height: 96px;

    padding: 18px 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    box-sizing: border-box;
`;

const RepairMain = styled.div`
    display: flex;
    flex-direction: column;
`;

const RepairId = styled.div`
    font-size: 14px;
    font-weight: 900;

    color: #16a34a;
`;

const RepairCustomer = styled.div`
    margin-top: 6px;

    font-size: 18px;
    font-weight: 800;

    color: #0f172a;
`;

const RepairMeta = styled.div`
    margin-top: 6px;

    font-size: 13px;

    color: #64748b;
`;

const RepairDevice = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const DeviceIcon = styled.div`
    width: 42px;
    height: 42px;

    border-radius: 14px;

    background: #f8fafc;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const DeviceInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const DeviceTitle = styled.div`
    font-size: 14px;
    font-weight: 800;

    color: #0f172a;
`;

const DeviceDate = styled.div`
    margin-top: 4px;

    font-size: 12px;

    color: #64748b;
`;

const RepairPrice = styled.div`
    font-size: 26px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #16a34a;
`;

const RepairActions = styled.div`
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

const ExpandWrapper = styled.div<{ open: boolean }>`
    display: grid;

    grid-template-rows: ${({ open }) =>
    open ? "1fr" : "0fr"};

    transition: 0.22s ease;
`;

const ExpandContent = styled.div`
    overflow: hidden;

    padding: 0 20px 20px 20px;

    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const CommentBlock = styled.div`
    padding: 18px;

    border-radius: 18px;

    background: #f8fafc;

    border: 1px solid #edf2f7;
`;

const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 14px;
    font-weight: 800;

    color: #0f172a;
`;

const CommentText = styled.div`
    margin-top: 12px;

    font-size: 14px;
    line-height: 1.8;

    color: #475569;
`;

const ServicesBlock = styled.div`
    display: flex;
    flex-direction: column;
`;

const ServicesTitle = styled.div`
    font-size: 16px;
    font-weight: 800;

    color: #0f172a;
`;

const ServicesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    margin-top: 14px;
`;