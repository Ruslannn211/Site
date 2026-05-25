import {type FC, useMemo, useState} from "react";
import styled from "styled-components";
import {ChevronDown, ChevronUp,} from "lucide-react";
import type {OrderListType} from "@types-lib";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";
import OrderProductItem from "@admin-pages/orders/src/OrderProductItem.tsx";

interface Props {
    order: OrderListType;
}

const OrdersPage: FC<Props> = ({order}) => {
    const [opened, setOpened] = useState(false);

    function toggleOpened() {
        setOpened(prevState => !prevState);
    }

    const changeStatus = (status: OrderListType['status']) => {

    };

    const totalPrice = useMemo(() => {
        return order.products.reduce((acc, product) => acc + product.price * product.count, 0);
    }, [order.products]);

    return (
        <OrderCard key={order.id}>
            <OrderTop>
                <OrderMain>
                    <OrderId>
                        #{order.id}
                    </OrderId>

                    <OrderCustomer>
                        {order.client_name}
                    </OrderCustomer>

                    <OrderMeta>
                        {order.phone_number} •{" "}{order.email} •{" "}{order.post_city}
                    </OrderMeta>
                </OrderMain>

                <OrderCenter>
                    <OrderDate>
                        {order.createdAt}
                    </OrderDate>

                    <OrderPrice>
                        {buildNumberFormat(totalPrice)} ₴
                    </OrderPrice>
                </OrderCenter>

                <OrderActions>
                    <StatusSelect
                        value={order.status}
                        onChange={e =>
                            changeStatus(e.target.value as OrderListType['status'])
                        }
                    >
                        <option value="new">
                            Нове
                        </option>

                        <option value="in-processing">
                            В обробці
                        </option>

                        <option value="delivered">
                            Доставка
                        </option>

                        <option value="completed">
                            Завершено
                        </option>
                    </StatusSelect>

                    <ExpandButton onClick={toggleOpened}>
                        {opened ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </ExpandButton>
                </OrderActions>
            </OrderTop>

            <ProductsWrapper open={opened}>
                <Products>
                    {order.products.map(product => (
                        <OrderProductItem key={product.id} product={product} />
                    ))}
                </Products>
            </ProductsWrapper>
        </OrderCard>
    );
};

export default OrdersPage;

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