import {type FC, useState} from "react";
import styled from "styled-components";
import {Smartphone, Wrench, ShieldCheck,} from "lucide-react";
import useRepairsPriceList from "@hooks/useRepairsPriceList.tsx";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";
import RepairModal from "@pages/repair/repair-modal/RepairModal.tsx";

const RepairPage: FC = () => {
    const [opened, setOpened] = useState(false);
    const {list: repairsPrice} = useRepairsPriceList();

    return (
        <>
            <Container>
                <Hero>
                    <HeroContent>
                        <HeroIcon>
                            <Wrench size={28} />
                        </HeroIcon>

                        <HeroText>
                            <HeroTitle>Ремонт смартфонів та техніки</HeroTitle>
                            <HeroDescription>
                                Швидкий та якісний ремонт телефонів, планшетів, ноутбуків та іншої техніки з гарантією на виконані роботи.
                            </HeroDescription>
                        </HeroText>

                        <HeroButton onClick={() => setOpened(true)}>
                            Замовити ремонт
                        </HeroButton>
                    </HeroContent>
                </Hero>

                <PriceList>
                    <SectionTitle>Прайс-лист ремонту</SectionTitle>
                    <RepairGrid>
                        {repairsPrice.map(option => (
                            <RepairCard key={option.id}>
                                <RepairTop>
                                    <RepairIcon>
                                        <Smartphone size={18} />
                                    </RepairIcon>
                                    <RepairPrice>від {buildNumberFormat(option.price)} ₴</RepairPrice>
                                </RepairTop>
                                <RepairTitle>{option.name}</RepairTitle>
                                <RepairDescription>{option.description}</RepairDescription>
                                <RepairBottom>
                                    <RepairBadge>
                                        <ShieldCheck size={14} />
                                        Гарантія
                                    </RepairBadge>
                                </RepairBottom>
                            </RepairCard>
                        ))}
                    </RepairGrid>
                </PriceList>
            </Container>

            <RepairModal open={opened} onClose={() => setOpened(false)} price={repairsPrice} />
        </>
    );
};

export default RepairPage;

const Container = styled.div`
    width: 100%;

    padding: 18px;

    box-sizing: border-box;
`;

const Hero = styled.div`
    border-radius: 22px;

    overflow: hidden;

    background:
            linear-gradient(
                    135deg,
                    #111827 0%,
                    #1f2937 100%
            );

    box-shadow:
            0 18px 40px rgba(15,23,42,0.14);
`;

const HeroContent = styled.div`
    min-height: 220px;

    padding: 34px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    box-sizing: border-box;
`;

const HeroIcon = styled.div`
    width: 74px;
    height: 74px;

    min-width: 74px;

    border-radius: 20px;

    background: rgba(255,255,255,0.10);

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const HeroText = styled.div`
    flex: 1;
`;

const HeroTitle = styled.div`
    font-size: 42px;
    font-weight: 900;

    line-height: 1.05;

    letter-spacing: -0.05em;

    color: white;
`;

const HeroDescription = styled.div`
    max-width: 720px;

    margin-top: 14px;

    font-size: 16px;
    line-height: 1.7;

    color: rgba(255,255,255,0.74);
`;

const HeroButton = styled.button`
    height: 56px;

    padding: 0 28px;

    border: none;
    border-radius: 16px;

    background:
            linear-gradient(
                    135deg,
                    #16a34a 0%,
                    #22c55e 100%
            );

    color: white;

    font-size: 15px;
    font-weight: 800;

    cursor: pointer;

    transition: 0.16s ease;

    box-shadow:
            0 12px 26px rgba(34,197,94,0.24);

    &:hover {
        transform: translateY(-1px);
    }
`;

const PriceList = styled.div`
    margin-top: 24px;
`;

const SectionTitle = styled.div`
    font-size: 28px;
    font-weight: 900;

    letter-spacing: -0.04em;

    color: #0f172a;
`;

const RepairGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

    gap: 16px;

    margin-top: 18px;
`;

const RepairCard = styled.div`
    padding: 20px;

    border-radius: 18px;

    background: white;

    border: 1px solid #e2e8f0;

    box-shadow:
            0 8px 24px rgba(15,23,42,0.04);

    transition: 0.18s ease;

    &:hover {
        transform: translateY(-2px);

        box-shadow:
                0 16px 30px rgba(15,23,42,0.08);
    }
`;

const RepairTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const RepairIcon = styled.div`
    width: 42px;
    height: 42px;

    border-radius: 12px;

    background: #f8fafc;

    border: 1px solid #e2e8f0;

    color: #0f172a;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const RepairPrice = styled.div`
    font-size: 20px;
    font-weight: 900;

    color: #16a34a;
`;

const RepairTitle = styled.div`
    margin-top: 18px;

    font-size: 18px;
    font-weight: 800;

    color: #0f172a;
`;

const RepairDescription = styled.div`
    margin-top: 8px;

    font-size: 14px;
    line-height: 1.7;

    color: #64748b;
`;

const RepairBottom = styled.div`
    margin-top: 18px;
`;

const RepairBadge = styled.div`
    width: fit-content;

    height: 32px;

    padding: 0 12px;

    border-radius: 999px;

    background: rgba(34,197,94,0.10);

    color: #16a34a;

    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 13px;
    font-weight: 800;
`;