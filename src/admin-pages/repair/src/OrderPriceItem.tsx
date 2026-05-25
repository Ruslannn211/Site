import {type FC} from "react";
import styled from "styled-components";
import type {RepairOrderPriceType} from "@types-lib";
import {Wrench} from "lucide-react";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";

interface Props {
    price: RepairOrderPriceType;
}

const OrderPriceItem: FC<Props> = ({price}) => {
    return (
        <ServiceCard key={price.id}>
            <ServiceLeft>
                <ServiceIcon>
                    <Wrench size={15} />
                </ServiceIcon>

                <ServiceName>{price.name}</ServiceName>
            </ServiceLeft>

            <ServicePrice>
                {buildNumberFormat(price.price)} ₴
            </ServicePrice>
        </ServiceCard>
    );
};

export default OrderPriceItem;

const ServiceCard = styled.div`
    min-height: 74px;

    padding: 14px 16px;

    border-radius: 16px;

    background: #f8fafc;

    border: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
`;

const ServiceLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const ServiceIcon = styled.div`
    width: 36px;
    height: 36px;

    border-radius: 12px;

    background: white;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const ServiceName = styled.div`
    font-size: 14px;
    font-weight: 700;

    color: #0f172a;
`;

const ServicePrice = styled.div`
    font-size: 18px;
    font-weight: 900;

    color: #16a34a;
`;