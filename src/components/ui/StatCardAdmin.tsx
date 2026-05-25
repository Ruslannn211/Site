import {type FC, type ReactNode} from "react";
import styled from "styled-components";

interface Props {
    icon: ReactNode;
    value: string;
    label: string;
}

const StatCardAdmin: FC<Props> = (props) => {
    return (
        <StatCard>
            <StatIcon>{props.icon}</StatIcon>
            <StatInfo>
                <StatValue>{props.value}</StatValue>
                <StatLabel>{props.label}</StatLabel>
            </StatInfo>
        </StatCard>
    );
};

export default StatCardAdmin;

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