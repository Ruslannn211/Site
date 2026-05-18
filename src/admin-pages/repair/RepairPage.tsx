import {type FC, useMemo, useState} from "react";
import styled from "styled-components";
import {
    CheckCircle2,
    Clock3,
    Search,
    Smartphone,
    Truck,
    Wrench,
    ChevronDown,
    ChevronUp,
    AlertTriangle,
} from "lucide-react";

type RepairStatus =
    | "new"
    | "diagnostic"
    | "repair"
    | "waiting"
    | "completed";

interface RepairService {
    id: number;
    title: string;
    price: number;
}

interface RepairOrder {
    id: number;
    customer: string;
    phone: string;
    device: string;
    createdAt: string;
    status: RepairStatus;
    comment: string;
    services: RepairService[];
}

const MOCK_REPAIRS: RepairOrder[] = [
    {
        id: 3021,
        customer: "Іван Петренко",
        phone: "+380 99 123 44 55",
        device: "iPhone 14 Pro Max",
        createdAt: "18.05.2026 12:32",
        status: "new",
        comment:
            "Не працює дисплей після падіння.",
        services: [
            {
                id: 1,
                title: "Заміна дисплея",
                price: 3200,
            },
        ],
    },

    {
        id: 3020,
        customer: "Марина Шевченко",
        phone: "+380 97 654 22 11",
        device: "Samsung Galaxy S24 Ultra",
        createdAt: "18.05.2026 10:12",
        status: "repair",
        comment:
            "Телефон швидко розряджається.",
        services: [
            {
                id: 2,
                title: "Заміна акумулятора",
                price: 1800,
            },

            {
                id: 3,
                title: "Чистка системи",
                price: 600,
            },
        ],
    },

    {
        id: 3019,
        customer: "Олександр Коваль",
        phone: "+380 66 321 88 44",
        device: "MacBook Air M2",
        createdAt: "17.05.2026 19:22",
        status: "waiting",
        comment:
            "Очікування нової матриці.",
        services: [
            {
                id: 4,
                title: "Заміна дисплея",
                price: 8400,
            },
        ],
    },
];

const RepairsPage: FC = () => {
    const [repairs, setRepairs] =
        useState(MOCK_REPAIRS);

    const [opened, setOpened] =
        useState<number[]>([]);

    const toggleRepair = (id: number) => {
        setOpened(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const updateStatus = (
        repairId: number,
        status: RepairStatus
    ) => {
        setRepairs(prev =>
            prev.map(repair =>
                repair.id === repairId
                    ? {...repair, status}
                    : repair
            )
        );
    };

    const totalIncome = useMemo(() => {
        return repairs.reduce((acc, repair) => {
            return (
                acc +
                repair.services.reduce(
                    (sum, service) =>
                        sum + service.price,
                    0
                )
            );
        }, 0);
    }, [repairs]);

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
                <StatCard>
                    <StatIcon>
                        <Wrench size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            {repairs.length}
                        </StatValue>

                        <StatLabel>
                            Всього ремонтів
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
                                repairs.filter(
                                    r =>
                                        r.status ===
                                        "new"
                                ).length
                            }
                        </StatValue>

                        <StatLabel>
                            Нові заявки
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
                                repairs.filter(
                                    r =>
                                        r.status ===
                                        "repair"
                                ).length
                            }
                        </StatValue>

                        <StatLabel>
                            В ремонті
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
                            Дохід ремонту
                        </StatLabel>
                    </StatInfo>
                </StatCard>
            </StatsGrid>

            <RepairsList>
                {repairs.map(repair => {
                    const expanded =
                        opened.includes(repair.id);

                    const total =
                        repair.services.reduce(
                            (acc, service) =>
                                acc + service.price,
                            0
                        );

                    return (
                        <RepairCard key={repair.id}>
                            <RepairTop>
                                <RepairMain>
                                    <RepairId>
                                        #{repair.id}
                                    </RepairId>

                                    <RepairCustomer>
                                        {repair.customer}
                                    </RepairCustomer>

                                    <RepairMeta>
                                        {repair.phone}
                                    </RepairMeta>
                                </RepairMain>

                                <RepairDevice>
                                    <DeviceIcon>
                                        <Smartphone size={16} />
                                    </DeviceIcon>

                                    <DeviceInfo>
                                        <DeviceTitle>
                                            {
                                                repair.device
                                            }
                                        </DeviceTitle>

                                        <DeviceDate>
                                            {
                                                repair.createdAt
                                            }
                                        </DeviceDate>
                                    </DeviceInfo>
                                </RepairDevice>

                                <RepairPrice>
                                    {total.toLocaleString()} ₴
                                </RepairPrice>

                                <RepairActions>
                                    <StatusSelect
                                        value={
                                            repair.status
                                        }
                                        onChange={e =>
                                            updateStatus(
                                                repair.id,
                                                e.target
                                                    .value as RepairStatus
                                            )
                                        }
                                    >
                                        <option value="new">
                                            Нова заявка
                                        </option>

                                        <option value="diagnostic">
                                            Діагностика
                                        </option>

                                        <option value="repair">
                                            В ремонті
                                        </option>

                                        <option value="waiting">
                                            Очікує деталі
                                        </option>

                                        <option value="completed">
                                            Завершено
                                        </option>
                                    </StatusSelect>

                                    <ExpandButton
                                        onClick={() =>
                                            toggleRepair(
                                                repair.id
                                            )
                                        }
                                    >
                                        {expanded
                                            ? <ChevronUp size={18} />
                                            : <ChevronDown size={18} />
                                        }
                                    </ExpandButton>
                                </RepairActions>
                            </RepairTop>

                            <ExpandWrapper
                                open={expanded}
                            >
                                <ExpandContent>
                                    <CommentBlock>
                                        <CommentHeader>
                                            <AlertTriangle size={16} />

                                            Опис проблеми
                                        </CommentHeader>

                                        <CommentText>
                                            {
                                                repair.comment
                                            }
                                        </CommentText>
                                    </CommentBlock>

                                    <ServicesBlock>
                                        <ServicesTitle>
                                            Послуги ремонту
                                        </ServicesTitle>

                                        <ServicesList>
                                            {repair.services.map(
                                                service => (
                                                    <ServiceCard
                                                        key={
                                                            service.id
                                                        }
                                                    >
                                                        <ServiceLeft>
                                                            <ServiceIcon>
                                                                <Wrench size={15} />
                                                            </ServiceIcon>

                                                            <ServiceName>
                                                                {
                                                                    service.title
                                                                }
                                                            </ServiceName>
                                                        </ServiceLeft>

                                                        <ServicePrice>
                                                            {service.price.toLocaleString()} ₴
                                                        </ServicePrice>
                                                    </ServiceCard>
                                                )
                                            )}
                                        </ServicesList>
                                    </ServicesBlock>
                                </ExpandContent>
                            </ExpandWrapper>
                        </RepairCard>
                    );
                })}
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

const RepairsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

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