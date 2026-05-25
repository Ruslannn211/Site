import {type FC} from "react";
import styled from "styled-components";
import {
    ArrowDownRight,
    ArrowUpRight,
    BadgeDollarSign,
    Box,
    ShoppingCart,
    Smartphone,
    Users,
    Wrench,
} from "lucide-react";

const DashboardPage: FC = () => {
    return (
        <Container>
            <TopSection>
                <WelcomeBlock>
                    <WelcomeContent>
                        <WelcomeLabel>
                            TechPanda Admin
                        </WelcomeLabel>

                        <WelcomeTitle>
                            Статистика магазину
                        </WelcomeTitle>

                        <WelcomeDescription>
                            Аналітика продажів, ремонтів,
                            користувачів та загального доходу
                            магазину за поточний період.
                        </WelcomeDescription>
                    </WelcomeContent>
                </WelcomeBlock>

                <QuickStats>
                    <QuickCard>
                        <QuickTop>
                            <QuickIcon>
                                <BadgeDollarSign size={20} />
                            </QuickIcon>

                            <QuickGrowth positive>
                                <ArrowUpRight size={14} />
                                +12.4%
                            </QuickGrowth>
                        </QuickTop>

                        <QuickValue>
                            284 920 ₴
                        </QuickValue>

                        <QuickLabel>
                            Загальний дохід
                        </QuickLabel>
                    </QuickCard>

                    <QuickCard>
                        <QuickTop>
                            <QuickIcon>
                                <ShoppingCart size={20} />
                            </QuickIcon>

                            <QuickGrowth positive>
                                <ArrowUpRight size={14} />
                                +8.1%
                            </QuickGrowth>
                        </QuickTop>

                        <QuickValue>
                            184
                        </QuickValue>

                        <QuickLabel>
                            Замовлення
                        </QuickLabel>
                    </QuickCard>

                    <QuickCard>
                        <QuickTop>
                            <QuickIcon>
                                <Wrench size={20} />
                            </QuickIcon>

                            <QuickGrowth negative>
                                <ArrowDownRight size={14} />
                                -2.1%
                            </QuickGrowth>
                        </QuickTop>

                        <QuickValue>
                            46
                        </QuickValue>

                        <QuickLabel>
                            Ремонтів
                        </QuickLabel>
                    </QuickCard>

                    <QuickCard>
                        <QuickTop>
                            <QuickIcon>
                                <Users size={20} />
                            </QuickIcon>

                            <QuickGrowth positive>
                                <ArrowUpRight size={14} />
                                +18.7%
                            </QuickGrowth>
                        </QuickTop>

                        <QuickValue>
                            2 814
                        </QuickValue>

                        <QuickLabel>
                            Користувачів
                        </QuickLabel>
                    </QuickCard>
                </QuickStats>
            </TopSection>

            <Grid>
                <MediumCard>
                    <CardHeader>
                        <CardTitle>
                            Категорії товарів
                        </CardTitle>
                    </CardHeader>

                    <CategoryList>
                        <CategoryItem>
                            <CategoryLeft>
                                <CategoryIcon>
                                    <Smartphone size={16} />
                                </CategoryIcon>

                                <CategoryInfo>
                                    <CategoryName>
                                        Смартфони
                                    </CategoryName>

                                    <CategoryCount>
                                        182 товари
                                    </CategoryCount>
                                </CategoryInfo>
                            </CategoryLeft>

                            <CategoryPercent>
                                42%
                            </CategoryPercent>
                        </CategoryItem>

                        <CategoryItem>
                            <CategoryLeft>
                                <CategoryIcon>
                                    <Box size={16} />
                                </CategoryIcon>

                                <CategoryInfo>
                                    <CategoryName>
                                        Ноутбуки
                                    </CategoryName>

                                    <CategoryCount>
                                        94 товари
                                    </CategoryCount>
                                </CategoryInfo>
                            </CategoryLeft>

                            <CategoryPercent>
                                28%
                            </CategoryPercent>
                        </CategoryItem>

                        <CategoryItem>
                            <CategoryLeft>
                                <CategoryIcon>
                                    <Wrench size={16} />
                                </CategoryIcon>

                                <CategoryInfo>
                                    <CategoryName>
                                        Комплектуючі
                                    </CategoryName>

                                    <CategoryCount>
                                        326 товарів
                                    </CategoryCount>
                                </CategoryInfo>
                            </CategoryLeft>

                            <CategoryPercent>
                                17%
                            </CategoryPercent>
                        </CategoryItem>
                    </CategoryList>
                </MediumCard>

                <MediumCard>
                    <CardHeader>
                        <CardTitle>
                            Статистика ремонту
                        </CardTitle>
                    </CardHeader>

                    <RepairStats>
                        <RepairItem>
                            <RepairLabel>
                                Виконано сьогодні
                            </RepairLabel>

                            <RepairValue>
                                14
                            </RepairValue>
                        </RepairItem>

                        <RepairItem>
                            <RepairLabel>
                                В процесі
                            </RepairLabel>

                            <RepairValue>
                                8
                            </RepairValue>
                        </RepairItem>

                        <RepairItem>
                            <RepairLabel>
                                Очікують деталі
                            </RepairLabel>

                            <RepairValue>
                                3
                            </RepairValue>
                        </RepairItem>

                        <RepairItem>
                            <RepairLabel>
                                Завершено за місяць
                            </RepairLabel>

                            <RepairValue>
                                248
                            </RepairValue>
                        </RepairItem>
                    </RepairStats>
                </MediumCard>

                <MediumCard>
                    <CardHeader>
                        <CardTitle>
                            Конверсія
                        </CardTitle>
                    </CardHeader>

                    <ConversionBlock>
                        <ConversionCircle>
                            68%
                        </ConversionCircle>

                        <ConversionText>
                            Конверсія покупок
                            за останній місяць
                        </ConversionText>
                    </ConversionBlock>
                </MediumCard>
            </Grid>
        </Container>
    );
};

export default DashboardPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 22px;
`;

const TopSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const WelcomeBlock = styled.div`
    border-radius: 24px;

    overflow: hidden;

    background:
            linear-gradient(
                    135deg,
                    #111827 0%,
                    #1f2937 100%
            );

    box-shadow:
            0 20px 40px rgba(15,23,42,0.14);
`;

const WelcomeContent = styled.div`
    padding: 34px;
`;

const WelcomeLabel = styled.div`
    width: fit-content;

    height: 32px;

    padding: 0 14px;

    border-radius: 999px;

    background: rgba(255,255,255,0.08);

    color: rgba(255,255,255,0.84);

    display: flex;
    align-items: center;

    font-size: 12px;
    font-weight: 800;

    letter-spacing: 0.06em;
    text-transform: uppercase;
`;

const WelcomeTitle = styled.div`
    margin-top: 18px;

    font-size: 44px;
    font-weight: 900;

    line-height: 1;

    letter-spacing: -0.06em;

    color: white;
`;

const WelcomeDescription = styled.div`
    max-width: 760px;

    margin-top: 14px;

    font-size: 16px;
    line-height: 1.8;

    color: rgba(255,255,255,0.68);
`;

const QuickStats = styled.div`
    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 18px;
`;

const QuickCard = styled.div`
    padding: 22px;

    border-radius: 20px;

    background: white;

    border: 1px solid #e2e8f0;

    box-shadow:
            0 10px 24px rgba(15,23,42,0.04);
`;

const QuickTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const QuickIcon = styled.div`
    width: 46px;
    height: 46px;

    border-radius: 14px;

    background: #f8fafc;

    border: 1px solid #e2e8f0;

    color: #0f172a;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const QuickGrowth = styled.div<{ positive?: boolean; negative?: boolean }>`
    height: 30px;

    padding: 0 10px;

    border-radius: 999px;

    background: ${({ positive, negative }) =>
    positive
        ? "rgba(34,197,94,0.10)"
        : negative
            ? "rgba(239,68,68,0.10)"
            : "#f8fafc"};

    color: ${({ positive, negative }) =>
    positive
        ? "#16a34a"
        : negative
            ? "#ef4444"
            : "#0f172a"};

    display: flex;
    align-items: center;
    gap: 4px;

    font-size: 12px;
    font-weight: 800;
`;

const QuickValue = styled.div`
    margin-top: 18px;

    font-size: 36px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #0f172a;
`;

const QuickLabel = styled.div`
    margin-top: 6px;

    font-size: 14px;
    font-weight: 600;

    color: #64748b;
`;

const Grid = styled.div`
    display: grid;

    grid-template-columns: 1fr 1fr 1fr;

    gap: 18px;
`;

const LargeCard = styled.div`
    padding: 22px;
    box-sizing: border-box;

    border-radius: 22px;

    background: white;

    border: 1px solid #e2e8f0;

    box-shadow:
            0 10px 24px rgba(15,23,42,0.04);
`;

const MediumCard = styled.div`
    padding: 22px;

    border-radius: 22px;

    background: white;

    border: 1px solid #e2e8f0;

    box-shadow:
            0 10px 24px rgba(15,23,42,0.04);
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CardTitle = styled.div`
    font-size: 18px;
    font-weight: 800;

    color: #0f172a;
`;

const CardAction = styled.button`
    height: 34px;

    padding: 0 14px;

    border-radius: 10px;

    border: 1px solid #e2e8f0;

    background: #f8fafc;

    color: #64748b;

    font-size: 13px;
    font-weight: 700;

    cursor: pointer;
`;

const ChartWrapper = styled.div`
    margin-top: 30px;
    rotate: 180deg
`;

const ChartBars = styled.div`
    height: 220px;

    display: flex;
    align-items: flex-end;
    gap: 12px;
`;

const ChartBar = styled.div<{ height: number }>`
    flex: 1;

    height: ${({ height }) => `${height}%`};

    border-radius: 14px 14px 6px 6px;

    background:
            linear-gradient(
                    180deg,
                    #22c55e 0%,
                    #16a34a 100%
            );

    min-height: 24px;
`;

const CategoryList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;

    margin-top: 22px;
`;

const CategoryItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CategoryLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const CategoryIcon = styled.div`
    width: 42px;
    height: 42px;

    border-radius: 12px;

    background: #f8fafc;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const CategoryInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const CategoryName = styled.div`
    font-size: 14px;
    font-weight: 800;

    color: #0f172a;
`;

const CategoryCount = styled.div`
    margin-top: 4px;

    font-size: 12px;

    color: #64748b;
`;

const CategoryPercent = styled.div`
    font-size: 16px;
    font-weight: 900;

    color: #16a34a;
`;

const RepairStats = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;

    margin-top: 22px;
`;

const RepairItem = styled.div`
    min-height: 74px;

    padding: 16px;

    border-radius: 16px;

    background: #f8fafc;

    border: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
`;

const RepairLabel = styled.div`
    font-size: 14px;
    font-weight: 700;

    color: #0f172a;
`;

const RepairValue = styled.div`
    font-size: 28px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #16a34a;
`;

const OrdersTable = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;

    margin-top: 22px;
`;

const OrderRow = styled.div`
    min-height: 78px;

    padding: 16px 18px;

    border-radius: 16px;

    background: #f8fafc;

    border: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    box-sizing: border-box;
`;

const OrderInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const OrderTitle = styled.div`
    font-size: 14px;
    font-weight: 800;

    color: #0f172a;
`;

const OrderSubtitle = styled.div`
    margin-top: 4px;

    font-size: 12px;

    color: #64748b;
`;

const OrderStatus = styled.div<{
    success?: boolean;
    warning?: boolean;
    progress?: boolean;
}>`
    height: 32px;

    padding: 0 12px;

    border-radius: 999px;

    background: ${({ success, warning, progress }) =>
    success
        ? "rgba(34,197,94,0.10)"
        : warning
            ? "rgba(245,158,11,0.10)"
            : progress
                ? "rgba(59,130,246,0.10)"
                : "#f8fafc"};

    color: ${({ success, warning, progress }) =>
    success
        ? "#16a34a"
        : warning
            ? "#f59e0b"
            : progress
                ? "#3b82f6"
                : "#0f172a"};

    display: flex;
    align-items: center;

    font-size: 12px;
    font-weight: 800;
`;

const OrderPrice = styled.div`
    font-size: 16px;
    font-weight: 900;

    color: #0f172a;
`;

const ConversionBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-top: 24px;
`;

const ConversionCircle = styled.div`
    width: 180px;
    height: 180px;

    border-radius: 999px;

    background:
            radial-gradient(
                    circle at center,
                    white 58%,
                    transparent 59%
            ),
            conic-gradient(
                    #22c55e 0 68%,
                    #e2e8f0 68% 100%
            );

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 34px;
    font-weight: 900;

    color: #0f172a;
`;

const ConversionText = styled.div`
    margin-top: 18px;

    max-width: 240px;

    text-align: center;

    font-size: 14px;
    line-height: 1.7;

    color: #64748b;
`;