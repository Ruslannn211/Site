import {type FC, useMemo, useState} from "react";
import styled from "styled-components";
import {
    Check,
    Smartphone,
    Wrench,
    ShieldCheck,
    X,
} from "lucide-react";

interface RepairOption {
    id: number;
    title: string;
    description: string;
    price: number;
}

const REPAIR_OPTIONS: RepairOption[] = [
    {
        id: 1,
        title: "Заміна дисплея",
        description: "Повна заміна екрану та сенсора",
        price: 3200,
    },
    {
        id: 2,
        title: "Заміна акумулятора",
        description: "Встановлення нового акумулятора",
        price: 1400,
    },
    {
        id: 3,
        title: "Заміна заднього скла",
        description: "Ремонт або заміна корпусного скла",
        price: 1800,
    },
    {
        id: 4,
        title: "Чистка після води",
        description: "Діагностика та чистка плати",
        price: 2200,
    },
    {
        id: 5,
        title: "Ремонт розʼєму зарядки",
        description: "Заміна Type-C / Lightning",
        price: 1200,
    },
    {
        id: 6,
        title: "Ремонт Face ID / камери",
        description: "Відновлення модулів камери",
        price: 2800,
    },
];

const RepairPage: FC = () => {
    const [opened, setOpened] = useState(false);

    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

    const totalPrice = useMemo(() => {
        return REPAIR_OPTIONS
            .filter(option =>
                selectedOptions.includes(option.id)
            )
            .reduce((acc, option) =>
                acc + option.price, 0);
    }, [selectedOptions]);

    const toggleOption = (id: number) => {
        setSelectedOptions(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    return (
        <>
            <Container>
                <Hero>
                    <HeroContent>
                        <HeroIcon>
                            <Wrench size={28} />
                        </HeroIcon>

                        <HeroText>
                            <HeroTitle>
                                Ремонт смартфонів та техніки
                            </HeroTitle>

                            <HeroDescription>
                                Швидкий та якісний ремонт телефонів,
                                планшетів, ноутбуків та іншої техніки
                                з гарантією на виконані роботи.
                            </HeroDescription>
                        </HeroText>

                        <HeroButton
                            onClick={() => setOpened(true)}
                        >
                            Замовити ремонт
                        </HeroButton>
                    </HeroContent>
                </Hero>

                <PriceList>
                    <SectionTitle>
                        Прайс-лист ремонту
                    </SectionTitle>

                    <RepairGrid>
                        {REPAIR_OPTIONS.map(option => (
                            <RepairCard key={option.id}>
                                <RepairTop>
                                    <RepairIcon>
                                        <Smartphone size={18} />
                                    </RepairIcon>

                                    <RepairPrice>
                                        від {option.price.toLocaleString()} ₴
                                    </RepairPrice>
                                </RepairTop>

                                <RepairTitle>
                                    {option.title}
                                </RepairTitle>

                                <RepairDescription>
                                    {option.description}
                                </RepairDescription>

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

            <Overlay open={opened}>
                <Modal>
                    <ModalHeader>
                        <ModalTitle>
                            Замовлення ремонту
                        </ModalTitle>

                        <CloseButton
                            onClick={() => setOpened(false)}
                        >
                            <X size={18} />
                        </CloseButton>
                    </ModalHeader>

                    <Form>
                        <Block>
                            <BlockTitle>
                                Оберіть послуги ремонту
                            </BlockTitle>

                            <OptionsGrid>
                                {REPAIR_OPTIONS.map(option => {
                                    const active =
                                        selectedOptions.includes(
                                            option.id
                                        );

                                    return (
                                        <OptionCard
                                            key={option.id}
                                            active={active}
                                            onClick={() =>
                                                toggleOption(option.id)
                                            }
                                        >
                                            <OptionCheck active={active}>
                                                <Check size={12} />
                                            </OptionCheck>

                                            <OptionInfo>
                                                <OptionTitle>
                                                    {option.title}
                                                </OptionTitle>

                                                <OptionPrice>
                                                    {option.price.toLocaleString()} ₴
                                                </OptionPrice>
                                            </OptionInfo>
                                        </OptionCard>
                                    );
                                })}
                            </OptionsGrid>
                        </Block>

                        <InputsGrid>
                            <InputBlock>
                                <Label>
                                    ПІБ
                                </Label>

                                <Input
                                    placeholder={"Ваше ім’я"}
                                />
                            </InputBlock>

                            <InputBlock>
                                <Label>
                                    Номер телефону
                                </Label>

                                <Input
                                    placeholder={"+380"}
                                />
                            </InputBlock>

                            <InputBlock full>
                                <Label>
                                    Модель телефону
                                </Label>

                                <Input
                                    placeholder={"Наприклад iPhone 15 Pro Max"}
                                />
                            </InputBlock>

                            <InputBlock full>
                                <Label>
                                    Опис поломки
                                </Label>

                                <Textarea
                                    placeholder={
                                        "Опишіть проблему або симптоми..."
                                    }
                                />
                            </InputBlock>
                        </InputsGrid>

                        <Summary>
                            <SummaryLeft>
                                <SummaryLabel>
                                    Загальна вартість ремонту
                                </SummaryLabel>

                                <SummaryDescription>
                                    Без урахування доставки та
                                    додаткової діагностики
                                </SummaryDescription>
                            </SummaryLeft>

                            <SummaryPrice>
                                {totalPrice.toLocaleString()} ₴
                            </SummaryPrice>
                        </Summary>

                        <SubmitButton>
                            Підтвердити замовлення ремонту
                        </SubmitButton>

                        <BottomText>
                            Після відправки заявки менеджер
                            звʼяжеться з вами для уточнення
                            деталей ремонту.
                        </BottomText>
                    </Form>
                </Modal>
            </Overlay>
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

const Overlay = styled.div<{ open: boolean }>`
    position: fixed;

    inset: 0;

    z-index: 200;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 24px;

    background: rgba(15,23,42,0.38);

    backdrop-filter: blur(6px);

    opacity: ${({ open }) => open ? 1 : 0};

    pointer-events: ${({ open }) =>
    open ? "all" : "none"};

    transition: 0.18s ease;
`;

const Modal = styled.div`
    width: 100%;
    max-width: 860px;

    max-height: calc(100vh - 48px);

    display: flex;
    flex-direction: column;
    overflow: hidden;

    border-radius: 24px;

    background: white;

    border: 1px solid #e2e8f0;

    box-shadow:
            0 30px 60px rgba(15,23,42,0.20);

    box-sizing: border-box;
`;

const ModalHeader = styled.div`
    position: sticky;
    top: 0;

    z-index: 2;

    padding: 10px 24px;

    background: rgba(255,255,255,0.94);

    backdrop-filter: blur(12px);

    border-bottom: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
`;

const ModalTitle = styled.div`
    font-size: 26px;
    font-weight: 900;

    color: #0f172a;
`;

const CloseButton = styled.button`
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

const Form = styled.div`
    flex: 1;

    overflow-y: auto;

    padding: 24px;

    box-sizing: border-box;

    min-height: 0;
`;

const Block = styled.div`
    margin-bottom: 28px;
`;

const BlockTitle = styled.div`
    font-size: 18px;
    font-weight: 800;

    color: #0f172a;

    margin-bottom: 14px;
`;

const OptionsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 12px;
`;

const OptionCard = styled.button<{ active: boolean }>`
    min-height: 84px;

    padding: 14px;

    border-radius: 16px;

    border: 1px solid ${({ active }) =>
    active ? "#22c55e" : "#e2e8f0"};

    background: ${({ active }) =>
    active
        ? "rgba(34,197,94,0.06)"
        : "white"};

    display: flex;
    align-items: flex-start;
    gap: 12px;

    cursor: pointer;

    transition: 0.16s ease;

    box-sizing: border-box;
`;

const OptionCheck = styled.div<{ active: boolean }>`
    width: 20px;
    height: 20px;

    min-width: 20px;

    border-radius: 6px;

    border: 1px solid ${({ active }) =>
    active ? "#22c55e" : "#cbd5e1"};

    background: ${({ active }) =>
    active ? "#22c55e" : "white"};

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const OptionInfo = styled.div`
    flex: 1;
`;

const OptionTitle = styled.div`
    font-size: 14px;
    font-weight: 700;

    color: #0f172a;
`;

const OptionPrice = styled.div`
    margin-top: 6px;

    font-size: 13px;
    font-weight: 800;

    color: #16a34a;
`;

const InputsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 16px;
`;

const InputBlock = styled.div<{ full?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 8px;

    grid-column: ${({ full }) =>
    full ? "1 / -1" : "auto"};
`;

const Label = styled.div`
    font-size: 13px;
    font-weight: 700;

    color: #0f172a;
`;

const Input = styled.input`
    width: 100%;

    height: 50px;

    padding: 0 16px;

    border-radius: 14px;

    border: 1px solid #dbe4ee;
    font-family: var(--font-ui);

    outline: none;

    background: #f8fafc;

    font-size: 14px;

    transition: 0.16s ease;

    box-sizing: border-box;

    &:focus {
        border-color: #94a3b8;
        background: white;
    }
`;

const Textarea = styled.textarea`
    width: 100%;

    min-height: 120px;

    resize: vertical;
    font-family: var(--font-ui);

    padding: 14px 16px;

    border-radius: 14px;

    border: 1px solid #dbe4ee;

    outline: none;

    background: #f8fafc;

    font-size: 14px;
    line-height: 1.7;

    transition: 0.16s ease;

    box-sizing: border-box;

    &:focus {
        border-color: #94a3b8;
        background: white;
    }
`;

const Summary = styled.div`
    margin-top: 28px;

    padding: 20px;

    border-radius: 18px;

    background: #f8fafc;

    border: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;

const SummaryLeft = styled.div`
    flex: 1;
`;

const SummaryLabel = styled.div`
    font-size: 18px;
    font-weight: 800;

    color: #0f172a;
`;

const SummaryDescription = styled.div`
    margin-top: 6px;

    font-size: 13px;
    line-height: 1.6;

    color: #64748b;
`;

const SummaryPrice = styled.div`
    font-size: 38px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #16a34a;
`;

const SubmitButton = styled.button`
    width: 100%;

    height: 58px;

    margin-top: 22px;

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

    box-shadow:
            0 14px 28px rgba(34,197,94,0.22);

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-1px);
    }
`;

const BottomText = styled.div`
    margin-top: 14px;

    text-align: center;

    font-size: 13px;
    line-height: 1.7;

    color: #64748b;
`;